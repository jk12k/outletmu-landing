// Guardrail multi-layer untuk AI Outletmu.
// Tujuan: AI HANYA menjawab seputar Outletmu, menolak prompt injection /
// jailbreak / off-topic, dan tidak bisa disuruh keluar dari perannya.

export const REFUSAL_OFFTOPIC =
  "Maaf, saya hanya bisa membantu pertanyaan seputar Outletmu (aplikasi kasir & QR order untuk F&B). " +
  "Untuk hal lain, silakan hubungi WhatsApp 081291960227.";

export const REFUSAL_INJECTION =
  "Maaf, saya tidak bisa memproses permintaan itu. Saya hanya menjawab pertanyaan seputar Outletmu.";

// Frasa yang menandakan upaya jailbreak / override instruksi / ganti peran.
const INJECTION_PATTERNS = [
  /ignore (all|previous|above|prior)/i,
  /abaikan (semua|instruksi|aturan|perintah)/i,
  /lupakan (instruksi|aturan|peran|semua)/i,
  /system prompt/i,
  /reveal (your )?(prompt|instruction|system)/i,
  /(tampilkan|bocorkan|kirim|kasih|beri).{0,20}(prompt|instruksi|system|aturan)/i,
  /you are now|kamu sekarang adalah|act as|berperan sebagai|pretend to be/i,
  /jailbreak|developer mode|admin mode/i,
  /roleplay|role play|berpura-pura/i,
  /(write|buatkan|tulis).{0,20}(code|kode|script|program|puisi|cerita|essay)/i,
  /base64|rot13|decode this|terjemahkan ini ke/i,
  /\bdo anything now\b|mode dan|pura-pura jadi/i,
  /override|bypass|lewati (aturan|filter|guardrail)/i,
  /(balas|jawab).{0,15}(tanpa|abaikan).{0,15}(aturan|filter|batasan)/i,
];

// Kata kunci yang menandakan pertanyaan MASIH seputar Outletmu.
// Sengaja SPESIFIK (tanpa kata tanya generik seperti "siapa/apa/berapa" saja).
const TOPIC_KEYWORDS = [
  "outletmu", "kasir", "pos ", " pos", "point of sale", "qr order", "qr meja", "qr menu",
  "menu digital", "order center", "kitchen display", "inventory", "stok",
  "restoran", "resto", "cafe", "kafe", "coffee shop", "kopi", "kedai", "warung",
  "umkm", "umkm", "minimarket", "retail", "fnb", "f&b", "kuliner", "outlet",
  "aplikasi kasir", "sistem kasir", "software kasir", "website kasir", "pos kasir",
  "harga paket", "paket harga", "paket starter", "paket pos", "paket pro", "langganan",
  "biaya langganan", "promo", "gratis setup", "berlangganan",
  "fitur", "laporan penjualan", "laporan whatsapp", "omzet", "transaksi", "produk terlaris",
  "dapur", "member", "saldo member", "absensi", "staff", "karyawan",
  "struk", "printer", "qris", "pembayaran", "multi outlet", "multi-outlet", "cabang",
  "domain", "hosting", "coba gratis", "demo", "konsultasi", "daftar", "trial",
  "bandingkan", " vs ", "moka", "pawoon", "majoo", "olsera", "qasir",
  "qr code", "scan qr", "pelanggan scan", "dine-in", "takeaway", "meja", "pesanan",
  "apa itu outletmu", "outletmu itu", "produk outletmu", "layanan outletmu",
  "cara pakai outletmu", "setup outletmu", "outletmu bisa", "outletmu cocok",
  "testimoni", "kontak outletmu", "whatsapp outletmu", "tim outletmu",
  "harga", "biaya", "bayar", "paket", "langganan", "promo", "diskon",
  "fitur", "cara", "mulai", "daftar", "coba", "demo", "konsultasi",
];

/** Deteksi upaya prompt injection / jailbreak. */
export function detectInjection(text) {
  const normalized = text.toLowerCase().trim();
  if (!normalized) return false;
  return INJECTION_PATTERNS.some((re) => re.test(normalized));
}

/** Deteksi pertanyaan di luar topik Outletmu. */
export function isOffTopic(text) {
  const normalized = text.toLowerCase();
  // Pesan sangat pendek yang mengandung sapaan masih diizinkan (mis. "hai").
  const greetingOnly = /^(hai|hi|halo|hello|pagi|siang|sore|malam|terima kasih|makasih|thanks|thank you|oke|ok|baik)[!.? ]*$/i.test(
    normalized.trim(),
  );
  if (greetingOnly) return false;

  if (normalized.length < 4) return true;
  return !TOPIC_KEYWORDS.some((kw) => normalized.includes(kw));
}

/**
 * Validasi pertanyaan user. Mengembalikan { ok, reason, reply }.
 * reason: "injection" | "offtopic" | null
 */
export function screenUserMessage(text) {
  if (typeof text !== "string") {
    return { ok: false, reason: "injection", reply: REFUSAL_INJECTION };
  }
  const trimmed = text.trim();
  if (!trimmed) {
    return { ok: false, reason: "offtopic", reply: REFUSAL_OFFTOPIC };
  }
  if (trimmed.length > 600) {
    return {
      ok: false,
      reason: "injection",
      reply: "Pertanyaan terlalu panjang. Silakan ringkas pertanyaan seputar Outletmu.",
    };
  }
  if (detectInjection(trimmed)) {
    return { ok: false, reason: "injection", reply: REFUSAL_INJECTION };
  }
  if (isOffTopic(trimmed)) {
    return { ok: false, reason: "offtopic", reply: REFUSAL_OFFTOPIC };
  }
  return { ok: true, reason: null, reply: null };
}

// Frasa pada JAWABAN MODEL yang menandakan ia keluar dari peran / membocorkan prompt
// atau malah mengaku tidak tahu Outletmu (harusnya tidak terjadi).
const OUTPUT_LEAK_PATTERNS = [
  /system prompt/i,
  /instruksi sistem/i,
  /knowledge-outletmu/i,
  /as an ai|sebagai (ai|model bahasa)/i,
  /tidak punya akses ke informasi/i,
  /tidak tahu (konteks|tentang outletmu)/i,
  /sepertinya itu produk\/layanan dari brand tertentu/i,
  /cari di google|buka google/i,
];

/**
 * Validasi jawaban model. Jika mencurigakan/kosong, ganti dengan penolakan aman.
 */
export function screenAssistantReply(reply) {
  if (typeof reply !== "string" || reply.trim().length < 2) {
    return REFUSAL_OFFTOPIC;
  }
  if (OUTPUT_LEAK_PATTERNS.some((re) => re.test(reply))) {
    return REFUSAL_OFFTOPIC;
  }
  return reply.trim();
}
