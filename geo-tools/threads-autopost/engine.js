#!/usr/bin/env node
/**
 * OUTLETMU — GEO AUTOPOST ENGINE (MAIN)
 * =====================================
 * Engine-agnostic: logika inti terpisah dari pengirim (sender).
 * Kalau satu engine rusak, tinggal ganti config.engine.
 *
 * Fitur:
 *  - Rate-limit (max 1-2 post/hari) -> cegah suspend
 *  - Delay + jitter acak -> terlihat natural
 *  - Fallback otomatis ke clipboard kalau engine gagal
 *  - Logging ke posted-log.json
 *  - Mode dry-run (test tanpa posting)
 *
 * Cara pakai:
 *   node engine.js now        -> posting konten hari ini
 *   node engine.js now 1      -> posting konten hari ke-1
 *   node engine.js dry        -> test tanpa posting (lihat apa yg akan dikirim)
 *   node engine.js status     -> lihat log & kuota hari ini
 *   node engine.js reset      -> reset kuota harian
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const CONFIG_PATH = path.join(ROOT, "config.json");
const BANK_PATH = path.join(ROOT, "content-bank.json");
const LOG_PATH = path.join(ROOT, "posted-log.json");
const QUOTA_PATH = path.join(ROOT, "daily-quota.json");

const C = {
  r: "\x1b[0m", b: "\x1b[1m", d: "\x1b[2m",
  g: "\x1b[32m", y: "\x1b[33m", c: "\x1b[36m", red: "\x1b[31m",
};

// ---------------- IO helpers ----------------
function readJson(p, fallback) {
  if (!fs.existsSync(p)) return fallback;
  try { return JSON.parse(fs.readFileSync(p, "utf8")); }
  catch { return fallback; }
}
function writeJson(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf8");
}
function todayKey() {
  return new Date().toISOString().split("T")[0];
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ---------------- Config & quota ----------------
function loadConfig() {
  const cfgPath = fs.existsSync(CONFIG_PATH)
    ? CONFIG_PATH
    : path.join(ROOT, "config.example.json");
  if (!fs.existsSync(cfgPath)) {
    console.error(C.red + "config.json tidak ditemukan. Copy dari config.example.json" + C.r);
    process.exit(1);
  }
  return readJson(cfgPath, {});
}

function loadQuota(cfg) {
  const q = readJson(QUOTA_PATH, { date: todayKey(), count: 0 });
  if (q.date !== todayKey()) {
    q.date = todayKey();
    q.count = 0;
    writeJson(QUOTA_PATH, q);
  }
  return q;
}

// ---------------- Sender factory ----------------
function getSender(cfg) {
  const map = {
    unofficial: "./senders/sender-unofficial.js",
    official: "./senders/sender-official.js",
    clipboard: "./senders/sender-clipboard.js",
  };
  const rel = map[cfg.engine] || map.unofficial;
  return require(path.join(ROOT, rel));
}
function getFallbackSender() {
  return require(path.join(ROOT, "./senders/sender-clipboard.js"));
}

// ---------------- Content selection ----------------
function loadBank() {
  return readJson(BANK_PATH, { posts: [], threads_series: [] });
}

function selectPost(bank, day) {
  return bank.posts.filter((p) => p.day === day);
}

function formatPost(p) {
  const tags = (p.hashtags || []).map((t) => "#" + t.replace(/\s+/g, "")).join(" ");
  return `${p.text}${tags ? "\n\n" + tags : ""}`;
}

// ---------------- Send with retry ----------------
async function sendWithRetry(sender, text, cfg, isFallback = false) {
  const maxAttempts = cfg.safety?.retryAttempts ?? 2;
  let lastErr = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(C.d + `  → Attempt ${attempt}/${maxAttempts} (${sender.name})...` + C.r);
    const res = await sender.send(text, cfg.threads, cfg.fallback);
    if (res.ok) return res;
    lastErr = res.error;
    console.log(C.y + `    gagal: ${res.error}` + C.r);
    if (attempt < maxAttempts) {
      await sleep(cfg.safety?.retryDelayMs ?? 60000);
    }
  }
  return { ok: false, error: lastErr };
}

// ---------------- Commands ----------------
async function run(day, dry = false) {
  const cfg = loadConfig();
  const bank = loadBank();
  const quota = loadQuota(cfg);
  const posts = selectPost(bank, day);

  console.log(C.b + `\n🔧 OUTLETMU AUTOPOST — Hari ${day}` + C.r);
  console.log(C.d + `   Engine: ${cfg.engine} | Mode: ${dry ? "DRY-RUN" : "LIVE"}` + C.r);
  console.log("─".repeat(56));

  if (posts.length === 0) {
    console.log(C.y + `Tidak ada post terjadwal untuk hari ${day}.` + C.r);
    return;
  }

  const maxPerDay = cfg.safety?.maxPostsPerDay ?? 1;
  if (quota.count >= maxPerDay) {
    console.log(C.y + `⚠️  Kuota harian tercapai (${quota.count}/${maxPerDay}). Berhenti untuk hari ini.` + C.r);
    return;
  }

  for (const p of posts) {
    if (quota.count >= maxPerDay) {
      console.log(C.y + `\n⚠️  Kuota harian penuh, sisa post ditunda.` + C.r);
      break;
    }

    const text = formatPost(p);
    console.log(`\n${C.c}▶ ${p.id}${C.r} ${C.d}(${p.type})${C.r}`);
    console.log("─".repeat(56));
    console.log(text);
    console.log("─".repeat(56));

    if (dry) {
      console.log(C.y + "  [DRY-RUN] Tidak dikirim. ✅" + C.r);
      continue;
    }

    const sender = getSender(cfg);
    let res = { ok: false, error: "not sent" };

    if (!sender.available) {
      console.log(C.y + `  Engine "${sender.name}" tidak tersedia: ${sender.reason}` + C.r);
    } else {
      res = await sendWithRetry(sender, text, cfg);
    }

    // FALLBACK OTOMATIS
    if (!res.ok && cfg.fallback?.enabled) {
      console.log(C.y + `\n  ↪️  Engine utama gagal, beralih ke FALLBACK (clipboard)...` + C.r);
      const fbSender = getFallbackSender();
      res = await fbSender.send(text, cfg.threads, cfg.fallback);
    }

    // Log
    const log = readJson(LOG_PATH, []);
    log.push({
      id: p.id,
      text,
      engine: res.fallback ? "clipboard-fallback" : cfg.engine,
      ok: res.ok,
      postId: res.id || null,
      at: new Date().toISOString(),
      error: res.error || null,
    });
    writeJson(LOG_PATH, log);

    if (res.ok) {
      quota.count += 1;
      writeJson(QUOTA_PATH, quota);
      console.log(C.g + `\n  ✅ Sukses (${res.fallback ? "fallback" : "engine utama"}). Kuota: ${quota.count}/${maxPerDay}` + C.r);
    } else {
      console.log(C.red + `\n  ❌ Gagal total: ${res.error}` + C.r);
    }
  }

  console.log(C.d + "\nSelesai.\n" + C.r);
}

function status() {
  const cfg = loadConfig();
  const log = readJson(LOG_PATH, []);
  const quota = loadQuota(cfg);
  const todayLogs = log.filter((l) => l.at && l.at.startsWith(todayKey()));

  console.log(C.b + "\n📊 STATUS AUTOPOST" + C.r);
  console.log("─".repeat(56));
  console.log(`Engine          : ${cfg.engine}`);
  console.log(`Kuota hari ini  : ${quota.count}/${cfg.safety?.maxPostsPerDay ?? 1}`);
  console.log(`Suite total log : ${log.length}`);
  console.log(`Post hari ini   : ${todayLogs.length}`);
  console.log("─".repeat(56));
  if (log.length) {
    const last = log.slice(-5);
    console.log(C.d + "5 log terakhir:" + C.r);
    last.forEach((l) => {
      const mark = l.ok ? C.g + "OK " + C.r : C.red + "ERR" + C.r;
      console.log(`  [${mark}] ${l.at?.split("T")[0]} ${l.id} (${l.engine})`);
    });
  }
  console.log("");
}

function reset() {
  writeJson(QUOTA_PATH, { date: todayKey(), count: 0 });
  console.log(C.g + "✅ Kuota harian direset.\n" + C.r);
}

// ---------------- Main ----------------
(async () => {
  const cmd = process.argv[2] || "status";
  const day = Number(process.argv[3] || 1);

  switch (cmd) {
    case "now": await run(day, false); break;
    case "dry": await run(day, true); break;
    case "status": status(); break;
    case "reset": reset(); break;
    default:
      console.log(`
${C.b}Outletmu Autopost Engine${C.r}

  node engine.js now [hari]   Posting konten (default hari 1)
  node engine.js dry [hari]   Test tanpa posting
  node engine.js status       Lihat status & kuota
  node engine.js reset        Reset kuota harian
`);
  }
})().catch((e) => {
  console.error(C.red + "Error:" + C.r, e.message);
  process.exit(1);
});
