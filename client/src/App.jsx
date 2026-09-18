import { useState } from "react";

const endpoint = () =>
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "/api/v1/deconstruct"
    : "/api/v1/deconstruct";

function List({ items }) {
  if (!items?.length) return <p className="empty">—</p>;
  return (
    <ul>
      {items.map((x, i) => (
        <li key={i}>{x}</li>
      ))}
    </ul>
  );
}

function KV({ rows, a, b }) {
  if (!rows?.length) return <p className="empty">—</p>;
  return (
    <ul>
      {rows.map((r, i) => (
        <li key={i}>
          <strong>{r[a]}</strong>
          {r[b] ? ` — ${r[b]}` : ""}
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [data, setData] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setData(null);
    setLoading(true);
    try {
      const res = await fetch(endpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.msg || res.statusText);
      setData(json);
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="wrap">
      <header>
        <h1>termite</h1>
        <p className="tag">story deconstruction — paste a URL</p>
      </header>
      <form onSubmit={submit}>
        <input
          type="url"
          required
          placeholder="https://…"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "working…" : "deconstruct"}
        </button>
      </form>
      {err && <p className="err">{err}</p>}
      {data?.injection_flagged && (
        <div className="banner">
          Injection risk {data.injection_risk.toFixed(2)} — article may contain
          instructions aimed at an AI. Breakdown still shown.
        </div>
      )}
      {data && (
        <main>
          <h2>{data.title || "Untitled"}</h2>
          <section>
            <h3>Excerpt</h3>
            <p>{data.excerpt || "—"}</p>
          </section>
          <section>
            <h3>Vitals</h3>
            <div className="grid4">
              <div>
                <h4>WHO</h4>
                <List items={data.vitals?.who} />
              </div>
              <div>
                <h4>WHAT</h4>
                <List items={data.vitals?.what} />
              </div>
              <div>
                <h4>WHERE</h4>
                <List items={data.vitals?.where} />
              </div>
              <div>
                <h4>WHEN</h4>
                <List items={data.vitals?.when} />
              </div>
            </div>
          </section>
          <section>
            <h3>Mentions</h3>
            <KV rows={data.mentions} a="name" b="context" />
          </section>
          <section>
            <h3>Quotes</h3>
            <KV rows={data.quotes} a="text" b="attribution" />
          </section>
          <section>
            <h3>Numbers</h3>
            <KV rows={data.numbers} a="value" b="context" />
          </section>
          <section>
            <h3>Sentiment</h3>
            <p>
              <strong>{data.sentiment?.score}</strong>{" "}
              {data.sentiment?.rationale}
            </p>
          </section>
          <section>
            <h3>Style</h3>
            <p>{data.style || "—"}</p>
          </section>
          <section>
            <h3>Urls</h3>
            <List items={data.urls} />
          </section>
          <section>
            <h3>Story text</h3>
            <p className="story">{data.story_text || "—"}</p>
          </section>
        </main>
      )}
    </div>
  );
}
