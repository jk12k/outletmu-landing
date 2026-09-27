#!/usr/bin/env node
/**
 * OUTLETMU — SENDER: CLIPBOARD FALLBACK (SAFE MODE)
 * =================================================
 * Pengirim paling aman. Tidak menyentuh API sama sekali.
 *  - Menulis post ke file di ./pending-posts/
 *  - Menyalin teks ke clipboard (Linux: xclip/xsel/wl-copy, best-effort)
 *  - Menampilkan instruksi untuk paste manual ke Threads
 *
 * Dipakai sebagai fallback otomatis kalau engine unofficial gagal,
 * atau sengaja dipakai sebagai mode utama (paling aman).
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function copyToClipboard(text) {
  const candidates = [
    { cmd: "wl-copy", args: [] },
    { cmd: "xclip", args: ["-selection", "clipboard"] },
    { cmd: "xsel", args: ["--clipboard", "--input"] },
    { cmd: "pbcopy", args: [] },
  ];

  for (const { cmd, args } of candidates) {
    try {
      execSync([cmd, ...args].join(" "), { input: text, stdio: ["pipe", "ignore", "ignore"] });
      return cmd;
    } catch {
      // coba kandidat berikutnya
    }
  }

  return null;
}

module.exports = {
  name: "clipboard",
  available: true,

  async send(text, cfg, fb = {}) {
    const outDir = fb.outputDir || "./pending-posts";
    const abs = path.isAbsolute(outDir) ? outDir : path.join(process.cwd(), outDir);
    if (!fs.existsSync(abs)) fs.mkdirSync(abs, { recursive: true });

    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const file = path.join(abs, `post-${stamp}.txt`);
    fs.writeFileSync(file, text, "utf8");

    const used = copyToClipboard(text);
    if (used) {
      console.log(`  📋 Teks sudah dicopy ke clipboard (${used}).`);
    } else {
      console.log("  ⚠️  Clipboard tool tidak tersedia, tapi file tersimpan.");
    }

    console.log(`  📄 Disimpan: ${file}`);
    console.log("  👉 Buka https://threads.net, paste, lalu Posting.");

    return { ok: true, id: null, fallback: true, file };
  },
};
