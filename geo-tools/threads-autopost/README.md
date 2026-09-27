# Outletmu — Threads Autopost (GEO Engine)

Engine auto-post Threads untuk Outletmu. Prinsipnya **engine-agnostic**: logika
inti (scheduler, rate-limit, logging, fallback) terpisah dari pengirim.

> ⚠️ **Keamanan:** file `config.json` dan `config-multi.json` berisi kredensial
> dan **tidak boleh di-commit** (sudah masuk `.gitignore`). Selalu mulai dari
> file `*.example.json`.

## Mode pengirim

| Engine | File | Risiko | Butuh kredensial |
|--------|------|--------|------------------|
| `clipboard` | `senders/sender-clipboard.js` | Paling aman | Tidak |
| `official` | `senders/sender-official.js` | Aman (Meta resmi) | Token Meta |
| `unofficial` | `senders/sender-unofficial.js` | ⚠️ Risiko suspend | Username + password |

Rekomendasi: mulai dari **`clipboard`** (fallback manual), naik ke `official`
kalau punya token Meta. Hindari `unofficial` untuk akun utama.

## Setup

```bash
cd geo-tools/threads-autopost
cp config.example.json config.json     # lalu isi bila perlu
npm install                            # opsional, hanya untuk engine unofficial
```

## Perintah

```bash
node engine.js dry 1        # test tanpa posting (lihat isi post hari 1)
node engine.js now 1        # posting konten hari 1 (sesuai engine di config)
node engine.js status       # lihat kuota harian & 5 log terakhir
node engine.js reset        # reset kuota harian
node multi-post.js dry      # test multi-akun (butuh config-multi.json)
node multi-post.js now      # posting multi-akun
```

## Keamanan operasional (anti-suspend)

- `maxPostsPerDay: 1` — jangan spam.
- Delay + jitter acak antar post.
- Fallback otomatis ke clipboard bila engine utama gagal.
- Log tersimpan di `posted-log.json`, kuota di `daily-quota.json`.

## Catatan risiko Threads API unofficial

`threads-api` (junhoyeo) bersifat reverse-engineered dan telah diarsipkan;
Meta pernah menegur proyek ini. Endpoint publik masih berjalan (2026), tetapi
login/publish bisa berubah sewaktu-waktu. Selalu aktifkan fallback dan
jangan pakai akun utama.
