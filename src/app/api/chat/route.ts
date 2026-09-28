import { NextResponse } from "next/server";

// Route ini hanya meneruskan permintaan ke AI proxy lokal via ai.outletmu.store.
// Guardrail utama ada di server proxy (API key 9router tidak pernah sampai ke sini).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AI_ENDPOINT =
  process.env.OUTLETMU_AI_ENDPOINT || "https://ai.outletmu.store/chat";
const AI_SECRET = process.env.OUTLETMU_AI_SECRET || "";

const MAX_MESSAGE_LEN = 600;

// Rate limit per IP (in-memory; cukup untuk meredam spam dasar).
const buckets = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string, limit = 15, windowMs = 5 * 60 * 1000) {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (bucket.count >= limit) return true;
  bucket.count += 1;
  return false;
}

function getClientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",").pop()?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Terlalu banyak permintaan. Coba lagi nanti." },
      { status: 429 },
    );
  }

  let payload: { message?: unknown; history?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Permintaan tidak valid." }, { status: 400 });
  }

  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  if (!message) {
    return NextResponse.json({ ok: false, message: "Pesan kosong." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LEN) {
    return NextResponse.json(
      { ok: false, message: "Pesan terlalu panjang. Mohon ringkas pertanyaanmu." },
      { status: 400 },
    );
  }

  const history = Array.isArray(payload.history) ? payload.history.slice(-6) : [];

  try {
    const upstream = await fetch(AI_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(AI_SECRET ? { "x-outletmu-ai-secret": AI_SECRET } : {}),
      },
      body: JSON.stringify({ message, history }),
      cache: "no-store",
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, message: "Asisten sedang tidak tersedia. Coba lagi atau hubungi WhatsApp 081291960227." },
        { status: 502 },
      );
    }

    const data = (await upstream.json()) as { ok?: boolean; reply?: string };
    return NextResponse.json({
      ok: true,
      reply: typeof data.reply === "string" ? data.reply : "",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Asisten sedang tidak tersedia. Coba lagi atau hubungi WhatsApp 081291960227." },
      { status: 502 },
    );
  }
}
