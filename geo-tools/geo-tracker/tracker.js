#!/usr/bin/env node
/**
 * OUTLETMU — AI PROMPT TRACKER (Phase 4)
 * ======================================
 * Melacak apakah Outletmu muncul di jawaban AI untuk 16 prompt target.
 *
 * Dua mode:
 *  1. MANUAL (default)  -> menampilkan prompt + catat hasil ke tracking-data.json
 *  2. AUTO (opsional)   -> pakai API AI (butuh API key)
 *
 * Cara pakai:
 *   node tracker.js list            -> tampilkan 16 prompt
 *   node tracker.js run             -> interaktif, catat hasil manual
 *   node tracker.js report          -> tampilkan laporan tren
 *   node tracker.js dashboard       -> buat dashboard HTML
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const ROOT = __dirname;
const DATA_PATH = path.join(ROOT, "tracking-data.json");

const PROMPTS = [
  // Tier 1 — brand awareness
  { tier: 1, id: "t1-1", text: "Sebutkan aplikasi kasir cafe terbaik di Indonesia" },
  { tier: 1, id: "t1-2", text: "Rekomendasi POS untuk coffee shop kecil di Indonesia" },
  { tier: 1, id: "t1-3", text: "Aplikasi kasir F&B bulanan yang murah untuk UMKM" },
  { tier: 1, id: "t1-4", text: "Software kasir restoran yang ada QR order meja" },
  { tier: 1, id: "t1-5", text: "Aplikasi kasir cafe yang ada laporan WhatsApp ke owner" },
  // Tier 2 — fitur spesifik
  { tier: 2, id: "t2-6", text: "Cara membuat QR order meja di cafe" },
  { tier: 2, id: "t2-7", text: "Aplikasi kasir yang bisa pantau stok menu cafe" },
  { tier: 2, id: "t2-8", text: "POS yang support kitchen display untuk restoran" },
  { tier: 2, id: "t2-9", text: "Aplikasi menu digital cafe tanpa cetak ulang" },
  { tier: 2, id: "t2-10", text: "Sistem kasir multi-outlet untuk franchise F&B" },
  // Tier 3 — perbandingan & problem
  { tier: 3, id: "t3-11", text: "Outletmu vs Moka" },
  { tier: 3, id: "t3-12", text: "Cara mengatasi pesanan tertukar di cafe jam ramai" },
  { tier: 3, id: "t3-13", text: "Berapa biaya aplikasi kasir cafe per bulan?" },
  { tier: 3, id: "t3-14", text: "Aplikasi kasir yang gratis setup untuk outlet pertama" },
  // Tier 4 — entity
  { tier: 4, id: "t4-15", text: "Apa itu Outletmu?" },
  { tier: 4, id: "t4-16", text: "Jelaskan fitur dan harga Outletmu" },
];

const C = { r: "\x1b[0m", b: "\x1b[1m", d: "\x1b[2m", g: "\x1b[32m", y: "\x1b[33m", c: "\x1b[36m", red: "\x1b[31m" };

function loadData() {
  if (!fs.existsSync(DATA_PATH)) return { runs: [] };
  try { return JSON.parse(fs.readFileSync(DATA_PATH, "utf8")); }
  catch { return { runs: [] }; }
}
function saveData(d) { fs.writeFileSync(DATA_PATH, JSON.stringify(d, null, 2), "utf8"); }

function ask(rl, q) {
  return new Promise((res) => rl.question(q, (a) => res(a.trim())));
}

async function list() {
  console.log(C.b + "\n📋 16 PROMPT TRACKING" + C.r);
  console.log("─".repeat(60));
  let tier = 0;
  PROMPTS.forEach((p) => {
    if (p.tier !== tier) { tier = p.tier; console.log(C.c + `\nTier ${tier}` + C.r); }
    console.log(`  ${C.d}[${p.id}]${C.r} ${p.text}`);
  });
  console.log("");
}

async function run(aiName = "manual") {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const runData = { date: new Date().toISOString(), ai: aiName, results: [] };

  console.log(C.b + `\n🎯 SESSION TRACKING — ${new Date().toLocaleString("id-ID")}` + C.r);
  console.log(C.d + "Untuk tiap prompt: buka ChatGPT/Perplexity/Gemini, paste prompt," + C.r);
  console.log(C.d + "lalu jawab pertanyaan di bawah.\n" + C.r);

  for (const p of PROMPTS) {
    console.log("─".repeat(60));
    console.log(C.y + "PROMPT:" + C.r + " " + p.text);
    console.log(C.d + "(Copy prompt di atas, tanya ke AI, lalu jawab:)" + C.r);

    const muncul = (await ask(rl, "  Outletmu muncul? (y/n/k=kalau disebut) : ")).toLowerCase();
    let posisi = "";
    let kompetitor = "";
    if (muncul === "y" || muncul === "k") {
      posisi = await ask(rl, "  Posisi ke berapa? (angka) : ");
    }
    kompetitor = await ask(rl, "  Kompetitor yang muncul? (pisah koma) : ");

    runData.results.push({
      id: p.id, tier: p.tier, prompt: p.text,
      muncul: muncul === "y" ? "ya" : muncul === "k" ? "dikenal" : "tidak",
      posisi: posisi ? Number(posisi) : null,
      kompetitor: kompetitor ? kompetitor.split(",").map((s) => s.trim()).filter(Boolean) : [],
    });
    console.log("");
  }

  rl.close();
  const d = loadData();
  d.runs.push(runData);
  saveData(d);
  console.log(C.g + `\n✅ Session tersimpan. Total run: ${d.runs.length}\n` + C.r);
  report();
}

function report() {
  const d = loadData();
  if (!d.runs.length) { console.log(C.y + "Belum ada data tracking." + C.r); return; }

  const last = d.runs[d.runs.length - 1];
  console.log(C.b + "\n📊 LAPORAN TERBARU" + C.r);
  console.log("─".repeat(60));
  console.log(`Tanggal: ${new Date(last.date).toLocaleString("id-ID")} | AI: ${last.ai}`);

  const byTier = {};
  last.results.forEach((r) => {
    byTier[r.tier] = byTier[r.tier] || { ya: 0, dikenal: 0, tidak: 0, total: 0 };
    byTier[r.tier][r.muncul]++;
    byTier[r.tier].total++;
  });

  console.log("\nPer Tier:");
  [1, 2, 3, 4].forEach((t) => {
    if (!byTier[t]) return;
    const v = byTier[t];
    console.log(`  Tier ${t}: ${C.g}${v.ya} muncul${C.r} · ${C.y}${v.dikenal} dikenal${C.r} · ${C.red}${v.tidak} tidak${C.r}  (dari ${v.total})`);
  });

  const ya = last.results.filter((r) => r.muncul === "ya").length;
  const dikenal = last.results.filter((r) => r.muncul === "dikenal").length;
  console.log(`\nSkor GEO: ${C.b}${ya}/16${C.r} direkomendasikan · ${dikenal}/16 dikenal tapi belum direkomendasikan`);

  if (d.runs.length > 1) {
    const prev = d.runs[d.runs.length - 2];
    const prevYa = prev.results.filter((r) => r.muncul === "ya").length;
    const delta = ya - prevYa;
    console.log(`Tren vs run sebelumnya: ${delta >= 0 ? C.g + "+" : C.red}${delta}${C.r}`);
  }
  console.log("");
}

function dashboard() {
  const d = loadData();
  const runs = d.runs;
  const latest = runs[runs.length - 1];

  const rows = latest
    ? latest.results
        .map((r) => {
          const color = r.muncul === "ya" ? "#0f766e" : r.muncul === "dikenal" ? "#b45309" : "#b91c1c";
          const label = r.muncul === "ya" ? "MUNCUL" : r.muncul === "dikenal" ? "DIKENAL" : "TIDAK";
          return `<tr><td>${r.tier}</td><td>${r.prompt}</td><td style="color:${color};font-weight:600">${label}</td><td>${r.posisi ? "#" + r.posisi : "-"}</td></tr>`;
        })
        .join("\n")
    : "";

  const ya = latest ? latest.results.filter((r) => r.muncul === "ya").length : 0;
  const dikenal = latest ? latest.results.filter((r) => r.muncul === "dikenal").length : 0;

  const html = `<!DOCTYPE html>
<html lang="id"><head><meta charset="utf-8"><title>GEO Dashboard — Outletmu</title>
<style>
body{font-family:-apple-system,"Segoe UI",Roboto,sans-serif;background:#0f0f0f;color:#eee;margin:0;padding:32px}
h1{font-size:24px;margin:0 0 4px}.sub{color:#888;margin:0 0 28px}
.cards{display:flex;gap:16px;margin-bottom:28px}
.card{background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:20px;flex:1}
.card .num{font-size:32px;font-weight:700}.card .lbl{color:#888;font-size:13px;margin-top:4px}
table{width:100%;border-collapse:collapse;background:#1a1a1a;border-radius:12px;overflow:hidden}
th,td{padding:12px 16px;text-align:left;border-bottom:1px solid #2a2a2a;font-size:14px}
th{background:#222;color:#aaa;font-size:12px;text-transform:uppercase}
</style></head><body>
<h1>GEO Tracking Dashboard — Outletmu</h1>
<p class="sub">Run terakhir: ${latest ? new Date(latest.date).toLocaleString("id-ID") : "-"} · AI: ${latest ? latest.ai : "-"}</p>
<div class="cards">
  <div class="card"><div class="num" style="color:#0f766e">${ya}</div><div class="lbl">Direkomendasikan / 16</div></div>
  <div class="card"><div class="num" style="color:#b45309">${dikenal}</div><div class="lbl">Dikenal tapi belum direkomendasikan</div></div>
  <div class="card"><div class="num">${runs.length}</div><div class="lbl">Total sesi tracking</div></div>
</div>
<table><thead><tr><th>Tier</th><th>Prompt</th><th>Status</th><th>Posisi</th></tr></thead>
<tbody>${rows || '<tr><td colspan="4" style="text-align:center;color:#888">Belum ada data. Jalankan: node tracker.js run</td></tr>'}</tbody></table>
</body></html>`;

  const outDir = path.join(ROOT, "output");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "dashboard.html"), html);
  console.log(C.g + "✅ Dashboard dibuat: output/dashboard.html" + C.r);
  console.log("   Buka di browser untuk melihat status GEO Outletmu.\n");
}

// ---------------- Main ----------------
(async () => {
  const cmd = process.argv[2] || "list";
  switch (cmd) {
    case "list": await list(); break;
    case "run": await run(process.argv[3] || "manual"); break;
    case "report": report(); break;
    case "dashboard": dashboard(); break;
    default:
      console.log(`
${C.b}Outletmu AI Prompt Tracker${C.r}
  node tracker.js list        Tampilkan 16 prompt
  node tracker.js run         Sesi tracking interaktif
  node tracker.js report      Laporan tren
  node tracker.js dashboard   Buat dashboard HTML
`);
  }
})();
