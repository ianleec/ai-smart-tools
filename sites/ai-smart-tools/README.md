# AI Smart Tools — site

> An independent review site for AI productivity & workflow tools. Built for GEO (Generative Engine Optimization) + affiliate revenue.

## Stack

- **Astro 5** (static-first, islands architecture)
- **Tailwind CSS** + `@tailwindcss/typography`
- **MDX** + **Content Collections** (typed schema)
- **Cloudflare Pages** for hosting (zero-config deploy on push to `main`)

## Local dev

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # ./dist/
```

## GEO configuration

This site is tuned for AI citation. The crucial files are:

- `public/robots.txt` — explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, etc.)
- `public/llms.txt` — structured site map for LLMs (Markdown format following the proposed standard)
- `public/llms-full.txt` — full corpus for OpenAI's deep research / Anthropic-style crawlers
- `src/components/schema/*.astro` — JSON-LD generators (Article, Review, Product, FAQ, BreadcrumbList)

## Content

Add a new review:

```
src/content/reviews/<slug>.mdx
```

with frontmatter that matches the schema in `src/content/config.ts`. Required fields:

- `title`, `description`, `pubDate`, `updatedDate`, `author`, `category`
- `products` (array of slugs from `src/content/products/`)
- `verdict` (winner + reason)
- `rating` (0–5)
- `faqs` (array of `{q, a}`)
- `affiliate` (array of `{product, url, cta}`)

## Deploy

Push to `main` → Cloudflare Pages auto-builds via `.github/workflows/deploy.yml`.

Set the following Cloudflare Pages project env vars:

| Variable | Value |
|---|---|
| `NODE_VERSION` | `22` |
| `SITE_URL` | `https://aismarttools.com` |

## Affiliate disclosure

See `src/pages/disclosure.astro`. All reviews disclose affiliate relationships (FTC compliance).
