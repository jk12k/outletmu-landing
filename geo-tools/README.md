# geo-tools — Outletmu GEO (Generative Engine Optimization)

Kumpulan tool mandiri untuk membantu Outletmu muncul di AI search
(ChatGPT, Claude, Gemini, Perplexity). **Tidak bagian dari build Next.js** —
dijalankan manual sesuai kebutuhan.

## Isi

| Folder | Fungsi |
|--------|--------|
| `threads-autopost/` | Auto-post Threads (Phase 3) — engine-agnostic + fallback clipboard |
| `geo-tracker/` | Tracker 16 prompt AI + dashboard + on-site self-audit (Phase 4) |

## Cara pakai singkat

### Audit GEO on-site (paling cepat)
```bash
cd geo-tracker
node audit.js https://outletmu.store
# atau lokal: node audit.js http://localhost:3009
```
Output: status llms.txt, robots AI crawler, sitemap, dan schema halaman kunci.

### Track posisi di AI
```bash
cd geo-tracker
node tracker.js list        # 16 prompt target
node tracker.js run         # sesi manual (tanya ke ChatGPT/Perplexity, catat hasil)
node tracker.js dashboard   # dashboard HTML
```

### Auto-post Threads
```bash
cd threads-autopost
cp config.example.json config.json   # isi bila mau engine unofficial
node engine.js dry 1                 # test tanpa posting
node engine.js now 1                 # posting (default: clipboard = aman)
node engine.js status
```

## ⚠️ Keamanan

- File `config.json`, `config-multi.json`, `threads-token.json`, log, dan
  `pending-posts/` berisi kredensial/state → **sudah di-`.gitignore`, jangan commit.**
- Mulai dari engine `clipboard` (tanpa kredensial). Engine `unofficial` berisiko
  suspend — hindari akun utama.
