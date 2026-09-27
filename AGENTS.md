# AGENTS.md — Outletmu Landing

Panduan untuk AI coding agent (Codex / Claude Code / OpenCode / Cursor) yang
bekerja di repo ini.

## Ringkasan proyek

Landing page Outletmu — Next.js 15 (App Router) + TypeScript + SCSS modules.
Situs live: https://outletmu.store (Cloudflare Tunnel → localhost:3001).

## Struktur penting

- `src/app/` — route App Router (halaman SEO landing, panduan, fitur, bandingkan)
- `src/components/seo/` — konten & komponen SEO/GEO
  - `seo-pages.ts` — data halaman solusi/produk (termasuk faqs)
  - `guide-pages.ts` — data halaman panduan
  - `comparison-pages.ts` — data halaman perbandingan (vs Moka/Pawoon/dll)
  - `index-pages.ts` — data halaman indeks (/panduan /fitur /solusi /bandingkan)
  - `schema.ts` / `json-ld.tsx` — JSON-LD (Organization, FAQ, Article, Breadcrumb)
- `src/lib/site.ts` — `siteUrl` (single source of truth, env `NEXT_PUBLIC_SITE_URL`)
- `public/llms.txt`, `public/llms-full.txt` — discovery untuk AI search
- `geo-tools/` — engine GEO mandiri (bukan bagian build Next.js)

## Konvensi

- **Commit per perubahan logis** dengan Conventional Commits (`feat:`, `fix:`).
- **Jangan commit kredensial.** `geo-tools/**/config.json`, `*-token.json`,
  log, dan `pending-posts/` sudah di-`.gitignore`.
- Jaga kualitas: hindari kode "AI slop" (comment naratif berlebih, dead code,
  unused import, error ditelan). Bisa dicek: `npx aislop@latest scan`.
- Konten SEO/GEO berbahasa Indonesia; keyword owner tiap halaman harus unik
  (hindari cannibalization — lihat pemetaan di `seo-pages.ts`).

## Perintah

```bash
npm install          # install dependency
npm run dev          # dev server
npm run build        # build produksi (verifikasi sebelum commit)
npm run lint         # eslint
```

## GEO (Generative Engine Optimization)

Repo ini dioptimasi agar direkomendasikan AI search (ChatGPT/Claude/Gemini/
Perplexity). Artefak:
- `/llms.txt`, `/llms-full.txt`
- robots.txt mengizinkan AI crawler (PerplexityBot, GPTBot, ClaudeBot, dll)
- FAQPage schema yang match pola prompt pengguna
- Halaman perbandingan "X vs Y"
- Organization schema + `/tentang` (E-E-A-T)

Verifikasi cepat: `node geo-tools/geo-tracker/audit.js https://outletmu.store`

## Deploy

Situs di-serve dari `/home/Jaki/Kasirflow-Page1` via systemd
`outletmu-landing.service` (Cloudflare Tunnel). Lihat catatan server sebelum
mengubah service.
