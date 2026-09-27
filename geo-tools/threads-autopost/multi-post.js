#!/usr/bin/env node
/**
 * OUTLETMU — MULTI-ACCOUNT THREADS POSTER
 * =======================================
 * Post ke BANYAK akun Threads sekaligus (berurutan, jeda aman).
 *
 * ⚠️ Risiko: masing-masing akun pakai API unofficial -> risiko suspend.
 *    Gunakan jeda (delayBetweenAccountsMs) & max 1-2 post/akun/hari.
 *
 * Cara pakai:
 *   node multi-post.js <file-konten.json> [id-opsional]
 *
 * Contoh:
 *   node multi-post.js promo-outletmu.json
 *   node multi-post.js promo-outletmu.json promo-outletmu-01
 *
 * File konten: JSON dengan { posts: [ { id, text, hashtags } ] }
 * Config akun : config-multi.json
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const CONFIG = path.join(ROOT, "config-multi.json");
const LOG = path.join(ROOT, "posted-log-multi.json");

const C = { r:"\x1b[0m", b:"\x1b[1m", d:"\x1b[2m", g:"\x1b[32m", y:"\x1b[33m", c:"\x1b[36m", red:"\x1b[31m" };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function log(m, color="r") {
  const t = { b:C.b, d:C.d, g:C.g, y:C.y, c:C.c, red:C.red, r:C.r };
  console.log(`${t[color]||""}${m}${C.r}`);
}

function loadJson(p, fb) {
  if (!fs.existsSync(p)) return fb;
  try { return JSON.parse(fs.readFileSync(p, "utf8")); }
  catch (e) { console.error(`JSON invalid: ${p}`, e.message); process.exit(1); }
}

function fmt(post) {
  const tags = (post.hashtags || []).map((t) => "#" + t.replace(/\s+/g, "")).join(" ");
  return post.text + (tags ? "\n\n" + tags : "");
}

async function getSender(mode) {
  const map = {
    unofficial: "./senders/sender-unofficial.js",
    official: "./senders/sender-official.js",
    clipboard: "./senders/sender-clipboard.js",
  };
  return require(path.join(ROOT, map[mode] || map.unofficial));
}

async function main() {
  const contentFile = process.argv[2];
  const onlyId = process.argv[3] || null;

  if (!contentFile) {
    log("Pakai: node multi-post.js <file-konten.json> [id-opsional]", "y");
    process.exit(1);
  }

  const cfg = loadJson(CONFIG, null);
  if (!cfg) { log("config-multi.json tidak ditemukan.", "red"); process.exit(1); }

  const content = loadJson(path.join(ROOT, contentFile), null);
  if (!content) { log(`File konten ${contentFile} tidak ditemukan.`, "red"); process.exit(1); }

  let posts = content.posts || [];
  if (onlyId) posts = posts.filter((p) => p.id === onlyId);
  if (!posts.length) { log("Tidak ada post untuk dikirim.", "y"); process.exit(1); }

  const accounts = cfg.accounts || [];
  log(`\n${C.b}MULTI-ACCOUNT POST${C.r}`);
  log(`  Akun  : ${accounts.length}`);
  log(`  Post  : ${posts.length} (${posts.map((p)=>p.id).join(", ")})`);
  log(`  Engine: ${cfg.engine}`);
  log("─".repeat(56));

  const sender = await getSender(cfg.engine);
  const delay = cfg.safety?.delayBetweenAccountsMs ?? 120000;
  const results = [];

  for (let a = 0; a < accounts.length; a++) {
    const acc = accounts[a];
    log(`\n${C.c}══ AKUN ${a + 1}/${accounts.length}: ${acc.label} (@${acc.username}) ══${C.r}`);

    if (!acc.username || acc.username.startsWith("ISI_")) {
      log(`  ⏭  Akun belum diisi kredensialnya. Dilewati.`, "y");
      results.push({ account: acc.label, skipped: true });
      continue;
    }

    for (const post of posts) {
      const text = fmt(post);
      log(`\n  ${C.c}▶ ${post.id}${C.r}`);
      log(`${C.d}${text.slice(0, 200)}${text.length>200?"...":""}${C.r}`);

      let res = { ok: false, error: "not sent" };
      if (sender.available) {
        for (let attempt = 1; attempt <= (cfg.safety?.retryAttempts ?? 2); attempt++) {
          log(`    → attempt ${attempt}...`, "d");
          res = await sender.send(text, acc);
          if (res.ok) break;
          log(`      gagal: ${res.error}`, "y");
          if (attempt < (cfg.safety?.retryAttempts ?? 2)) await sleep(cfg.safety?.retryDelayMs ?? 120000);
        }
      } else {
        log(`    engine tidak tersedia: ${sender.reason}`, "y");
      }

      // fallback clipboard
      if (!res.ok && cfg.fallback?.enabled) {
        log(`    ↪️  fallback clipboard...`, "y");
        const fb = require(path.join(ROOT, "./senders/sender-clipboard.js"));
        res = await fb.send(text, acc, cfg.fallback);
      }

      const entry = {
        account: acc.label,
        username: acc.username,
        postId: post.id,
        ok: res.ok,
        threadsId: res.id || null,
        at: new Date().toISOString(),
        error: res.error || null,
      };
      results.push(entry);

      // log
      const logData = loadJson(LOG, []);
      logData.push(entry);
      fs.writeFileSync(LOG, JSON.stringify(logData, null, 2), "utf8");

      log(res.ok ? `    ✅ OK (id: ${res.id})` : `    ❌ GAGAL: ${res.error}`, res.ok ? "g" : "red");
      await sleep(8000 + Math.random() * 7000);
    }

    // jeda antar akun
    if (a < accounts.length - 1) {
      log(`\n  ⏳ Jeda ${Math.round(delay/1000)}s sebelum akun berikutnya...`, "d");
      await sleep(delay);
    }
  }

  // ringkasan
  log(`\n${C.b}RINGKASAN${C.r}`);
  log("─".repeat(56));
  const okCount = results.filter((r) => r.ok).length;
  results.forEach((r) => {
    const mark = r.skipped ? "⏭" : r.ok ? "✅" : "❌";
    log(`  ${mark} ${r.account || "-"} ${r.username ? "(@" + r.username + ")" : ""} ${r.postId ? "- " + r.postId : ""}`);
  });
  log(`\nTotal sukses: ${okCount}/${results.filter(r=>!r.skipped).length}`);
}

main().catch((e) => { console.error(C.red + "Error:" + C.r, e); process.exit(1); });
