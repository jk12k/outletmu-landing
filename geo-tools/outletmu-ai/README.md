# Outletmu AI — Chatbot dinamis (anti-bypass)

Asisten AI di outletmu.store yang **HANYA** menjawab pertanyaan seputar Outletmu.

## Arsitektur (kenapa aman)

```
Browser (outletmu.store)
  └─> Vercel /api/chat                (landing, tanpa API key AI)
        └─> https://ai.outletmu.store (tunnel Cloudflare + shared secret)
              └─> AI Proxy (server lokal, port 20201)   <-- guardrail di sini
                    └─> 9Router (127.0.0.1:20128, localhost)
                          └─> DeepSeek 4.1 Flash (cbai/deepseek-v4.1-flash)
```

- **API key 9Router tidak pernah keluar** ke Vercel/internet — hanya ada di server lokal.
- **Guardrail di server lokal**, bukan di klien → tidak bisa di-bypass dari browser.
- Landing hanya relay, dilindungi shared secret.

## Guardrail multi-layer

1. **Shared secret** (`x-outletmu-ai-secret`) — hanya landing yang boleh panggil proxy.
2. **Rate limit** per IP di landing dan di proxy.
3. **Input screening**:
   - Deteksi prompt injection / jailbreak (abaikan instruksi, ganti peran, bocorkan prompt, dll).
   - Deteksi off-topic (harus ada kata kunci seputar Outletmu).
4. **Output screening**: buang jawaban yang bocorkan prompt atau mengaku tidak tahu Outletmu.
5. **Knowledge-locked prompt**: instruksi + knowledge ditempel di pesan user (bukan
   `role: system`) untuk meng-override persona bawaan model (CodeBuddy).

## Knowledge base

Sumber jawaban: `../../knowledge-outletmu.md` (root repo). AI TIDAK boleh mengarang
di luar file itu.

## Menjalankan

```bash
cd geo-tools/outletmu-ai
OUTLETMU_AI_SECRET="<secret>" node server.mjs
```

Service systemd (user): `outletmu-ai-proxy.service`
- `systemctl --user status outletmu-ai-proxy`
- `systemctl --user restart outletmu-ai-proxy`

## Env

| Env | Default | Keterangan |
|-----|---------|------------|
| `OUTLETMU_AI_SECRET` | — | shared secret (wajib, samakan dengan landing) |
| `NINEROUTER_URL` | `http://127.0.0.1:20128/v1` | endpoint 9Router |
| `NINEROUTER_KEY` | — | API key 9Router (server-lokal only) |
| `OUTLETMU_AI_MODEL` | `cbai/deepseek-v4.1-flash` | model |
| `OUTLETMU_AI_PORT` | `20201` | port proxy |

## Uji cepat

```bash
curl -s https://ai.outletmu.store/health
curl -s -X POST https://ai.outletmu.store/chat \
  -H "content-type: application/json" \
  -H "x-outletmu-ai-secret: <secret>" \
  -d '{"message":"Berapa harga paket Outletmu?"}'
```
