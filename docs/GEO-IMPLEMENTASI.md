# Implementasi GEO — Outletmu

Dokumen ini merangkum implementasi Generative Engine Optimization (GEO) supaya
Outletmu direkomendasikan oleh AI search (ChatGPT, Claude, Gemini, Perplexity,
AI Overviews), bukan sekadar dikenali.

## Status

Self-audit deterministik (lokal): **Discovery 4/4 · Schema 9/9**.
Jalankan: `node geo-tools/geo-tracker/audit.js https://outletmu.store`

## Yang diimplementasikan

### 1. Discovery (agar AI crawler bisa menemukan & membaca)
- `public/llms.txt` — ringkasan brand & tautan penting (format llms.txt).
- `public/llms-full.txt` — versi lengkap untuk konteks AI.
- `src/app/robots.ts` — izin eksplisit: PerplexityBot, GPTBot, ChatGPT-User,
  ClaudeBot, Google-Extended, Applebot-Extended, cohere-ai; disallow Bytespider.
- `src/app/sitemap.ts` — semua URL (termasuk halaman indeks & perbandingan).

### 2. Structured data (schema JSON-LD)
- `Organization` + `WebSite` + `SoftwareApplication` di semua halaman produk.
- `FAQPage` yang menjawab pola prompt: "best X", "X vs Y", "how to choose X".
- `Article` untuk halaman panduan & perbandingan.
- `CollectionPage` + `ItemList` untuk halaman indeks.
- `BreadcrumbList` di seluruh halaman.

### 3. Konten yang match pola prompt AI
- **Perbandingan "X vs Y"**: `/bandingkan/outletmu-vs-{moka,pawoon,majoo,olsera,qasir}`.
- **Buyer's guide**: `/panduan/*` (5 panduan).
- **Fitur/use-case**: `/fitur/*`.
- **Entity**: `/tentang` (profil, misi, kenapa berbeda, Organization schema).

### 4. Anti-cannibalization
Setiap halaman punya owner keyword unik. Contoh perbaikan:
- `/software-kasir-fnb` → fokus "software kasir F&B" (tanpa "cafe" di title/H1).
- `/sistem-kasir-umkm` → fokus "sistem kasir UMKM" (toko/warung/retail).
- `/pos-kasir-cafe` → owner "aplikasi kasir cafe".

### 5. Off-site tooling (opsional, di `geo-tools/`)
- `threads-autopost/` — engine auto-post Threads (Phase 3).
- `geo-tracker/` — 16-prompt AI tracker + dashboard + self-audit (Phase 4).

## Verifikasi

```bash
# Build
npm run build

# Audit GEO (butuh server jalan, atau pakai domain live)
node geo-tools/geo-tracker/audit.js http://localhost:3000
node geo-tools/geo-tracker/audit.js https://outletmu.store

# Validasi schema
# https://validator.schema.org  (paste URL halaman)
```

## Langkah lanjutan (belum, butuh eksekusi kontinu)
- Submit sitemap ke Google Search Console.
- Audit multi-platform AI: `node geo-tools/geo-tracker/tracker.js run`.
- Kumpulkan konsensus eksternal (Google Business, G2, Reddit, Wikidata).
- Publish artikel riset + grafik (citation magnet).
- PR pitch ke media F&B/bisnis.
