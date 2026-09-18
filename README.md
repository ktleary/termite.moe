# termite

Journalist story-decomposition. Paste a URL → structured vitals, quotes, numbers, sentiment.

**v2 (2026):** the old six-subsystem NLP stack is one structured LLM call plus a Jev injection screen. Layout:

```
api/      Node (Express)  POST /api/v1/deconstruct { url }
client/   Vite + React 19  panels
```

## Architecture

1. API fetches the article (browser CORS cannot), strips HTML to text.
2. **Jev Noul** — “does this contain instructions addressed to an AI?” Flagged in the response (`injection_risk`, `injection_flagged`); breakdown is **not** blocked.
3. **One OpenRouter JSON call** (default `google/gemini-3.8-flash`) extracts `{ title, excerpt, vitals, mentions, quotes, numbers, sentiment, style, urls }`.
4. Client renders Vitals / Mentions / Quotes / Numbers / Sentiment / Style / Urls / Excerpt / Story text. Warning banner if flagged.

Keys: `OPENROUTER_API_KEY`, `TYPESAFE_API_KEY` in `api/.env` (never git). See `api/.env.example`.

## Run

```bash
cd api && npm i && npm start          # :8787
cd client && npm i && npm run dev     # :5173, proxies /api
```

Tests (fixtures only, no live LLM/Jev):

```bash
cd api && npm test
cd client && npm test
```

## Deleted vs 2020 CRA

Ramda, react-router-dom, react-helmet, login/token, react-scripts are **not used by v2**. The 2020 CRA tree (`src/`, root `package.json`) is still in the repo as archive until the operator confirms v2; v2 is only `api/` + `client/`.

## Domain

`termite.moe` currently NXDOMAIN. Do not buy. Stage on Gaudi after merge if the operator still owns the name.

## License

GPL-3.0 (see LICENSE).
