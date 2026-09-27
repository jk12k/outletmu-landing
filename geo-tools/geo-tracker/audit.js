/**
 * OUTLETMU — ON-SITE GEO SELF-AUDIT (deterministik)
 * =================================================
 * Mengecek artefak GEO yang bisa diverifikasi otomatis tanpa LLM:
 *  - llms.txt & llms-full.txt (status + isi)
 *  - robots.txt (AI crawler diizinkan)
 *  - sitemap.xml (jumlah URL)
 *  - FAQPage / Organization / Article / CollectionPage schema di halaman kunci
 *
 * Cara pakai:
 *   node audit.js                 -> audit https://outletmu.store
 *   node audit.js http://localhost:3009
 */

const DEFAULT_BASE = process.env.GEO_BASE_URL || "https://outletmu.store";

const C = { r: "\x1b[0m", b: "\x1b[1m", d: "\x1b[2m", g: "\x1b[32m", y: "\x1b[33m", c: "\x1b[36m", red: "\x1b[31m" };

const AI_CRAWLERS = ["PerplexityBot", "GPTBot", "ClaudeBot", "Google-Extended", "ChatGPT-User"];

const SCHEMA_ROUTES = [
  { path: "/", expect: ["Organization", "WebSite", "FAQPage"] },
  { path: "/tentang", expect: ["Organization", "WebSite"] },
  { path: "/harga", expect: ["Product", "FAQPage"] },
  { path: "/pos-kasir-cafe", expect: ["SoftwareApplication", "FAQPage"] },
  { path: "/software-kasir-fnb", expect: ["SoftwareApplication", "FAQPage"] },
  { path: "/sistem-kasir-umkm", expect: ["SoftwareApplication", "FAQPage"] },
  { path: "/bandingkan/outletmu-vs-moka", expect: ["Article", "FAQPage"] },
  { path: "/solusi", expect: ["CollectionPage"] },
  { path: "/panduan", expect: ["CollectionPage"] },
];

async function fetchText(base, path) {
  try {
    const res = await fetch(base + path, { redirect: "follow" });
    const body = await res.text();
    return { ok: res.ok, status: res.status, body };
  } catch (err) {
    return { ok: false, status: 0, body: "", error: err.message };
  }
}

function mark(ok) {
  return ok ? `${C.g}✓${C.r}` : `${C.red}✗${C.r}`;
}

async function audit(base) {
  console.log(C.b + `\n🔍 GEO ON-SITE AUDIT — ${base}` + C.r);
  console.log("─".repeat(60));

  // 1. Discovery files
  const llms = await fetchText(base, "/llms.txt");
  console.log(`${mark(llms.ok)} /llms.txt (${llms.status}) · ${llms.body.split("\n").length} baris`);

  const llmsFull = await fetchText(base, "/llms-full.txt");
  console.log(`${mark(llmsFull.ok)} /llms-full.txt (${llmsFull.status}) · ${llmsFull.body.split("\n").length} baris`);

  const robots = await fetchText(base, "/robots.txt");
  const robotsOk = robots.ok && AI_CRAWLERS.every((bot) => robots.body.includes(bot));
  console.log(`${mark(robotsOk)} /robots.txt (${robots.status}) · AI crawler diizinkan: ${robotsOk ? "ya" : "TIDAK"}`);
  if (robots.ok) {
    const missing = AI_CRAWLERS.filter((bot) => !robots.body.includes(bot));
    if (missing.length) console.log(`   ${C.y}missing: ${missing.join(", ")}${C.r}`);
  }

  const sitemap = await fetchText(base, "/sitemap.xml");
  const urlCount = (sitemap.body.match(/<loc>/g) || []).length;
  console.log(`${mark(sitemap.ok && urlCount > 0)} /sitemap.xml (${sitemap.status}) · ${urlCount} URL`);

  // 2. Schema per halaman
  console.log("\n" + C.b + "Schema halaman kunci:" + C.r);
  let schemaPass = 0;
  for (const route of SCHEMA_ROUTES) {
    const res = await fetchText(base, route.path);
    const found = route.expect.filter((type) => res.body.includes(`"@type":"${type}"`));
    const ok = res.ok && found.length === route.expect.length;
    if (ok) schemaPass++;
    const missing = route.expect.filter((type) => !found.includes(type));
    const detail = missing.length ? ` ${C.y}missing: ${missing.join(",")}${C.r}` : "";
    console.log(`  ${mark(ok)} ${route.path}${detail}`);
  }

  console.log("─".repeat(60));
  const discoveryScore = [llms.ok, llmsFull.ok, robotsOk, sitemap.ok && urlCount > 0].filter(Boolean).length;
  console.log(`Discovery: ${C.b}${discoveryScore}/4${C.r} · Schema: ${C.b}${schemaPass}/${SCHEMA_ROUTES.length}${C.r} halaman`);
  console.log("");
}

(async () => {
  const base = (process.argv[2] || DEFAULT_BASE).replace(/\/$/, "");
  await audit(base);
})().catch((e) => {
  console.error(C.red + "Error:" + C.r, e.message);
  process.exit(1);
});
