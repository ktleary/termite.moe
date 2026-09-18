import "dotenv/config";
import express from "express";
import cors from "cors";
import {
  EXTRACTION_PROMPT,
  jevInjectionQuestion,
  normalizeBreakdown,
  stripHtml,
} from "./lib.mjs";

const PORT = Number(process.env.PORT) || 8787;
const MODEL = process.env.OPENROUTER_MODEL || "google/gemini-3.8-flash";
const OPENROUTER = "https://openrouter.ai/api/v1/chat/completions";
const JEV = "https://api.typesafe.ai/v1/systemone";

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: "512kb" }));

async function fetchArticle(url) {
  const u = new URL(url);
  if (!/^https?:$/.test(u.protocol)) throw new Error("url must be http(s)");
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 12000);
  try {
    const res = await fetch(u.href, {
      signal: ac.signal,
      headers: { "User-Agent": "termite.moe/2 (journalist deconstructor)" },
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`fetch ${res.status}`);
    const html = await res.text();
    const text = stripHtml(html);
    if (text.length < 80) throw new Error("article text too short");
    return { url: u.href, text: text.slice(0, 24000) };
  } finally {
    clearTimeout(t);
  }
}

async function injectionRisk(text) {
  const key = process.env.TYPESAFE_API_KEY || process.env.JEV_API_KEY;
  if (!key) return { injection_risk: 0, injection_flagged: false, injection_skipped: true };
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 3000);
  try {
    const res = await fetch(JEV, {
      method: "POST",
      signal: ac.signal,
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: text.slice(0, 8000),
        model: "jev-latest",
        questions: { inject: jevInjectionQuestion() },
      }),
    });
    if (!res.ok) throw new Error(`jev ${res.status}`);
    const json = await res.json();
    const noul = Number(json?.answers?.inject?.noul) || 0;
    return { injection_risk: noul, injection_flagged: noul >= 0.5, injection_skipped: false };
  } catch {
    return { injection_risk: 0, injection_flagged: false, injection_skipped: true };
  } finally {
    clearTimeout(t);
  }
}

async function extract(text) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("missing OPENROUTER_API_KEY");
  const res = await fetch(OPENROUTER, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://termite.moe",
      "X-Title": "termite",
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: EXTRACTION_PROMPT },
        { role: "user", content: text },
      ],
    }),
  });
  if (!res.ok) throw new Error(`llm ${res.status}`);
  const json = await res.json();
  const raw = json?.choices?.[0]?.message?.content;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("llm returned non-json");
  }
  return normalizeBreakdown(parsed);
}

app.post("/api/v1/deconstruct", async (req, res) => {
  const url = req.body?.url;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ msg: "url required" });
  }
  try {
    const { url: finalUrl, text } = await fetchArticle(url);
    const flag = await injectionRisk(text);
    const breakdown = await extract(text);
    return res.json({
      url: finalUrl,
      ...breakdown,
      ...flag,
      story_text: text.slice(0, 2000),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err.message || "deconstruct failed" });
  }
});

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`termite-api ${PORT}`));

export { app, fetchArticle, injectionRisk };
