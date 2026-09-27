#!/usr/bin/env node
/**
 * OUTLETMU — SENDER: OFFICIAL THREADS API (Meta)
 * ==============================================
 * Cadangan resmi. Kalau kamu punya token dari Meta for Developers,
 * ini cara paling stabil & aman.
 *
 * Butuh: threads-token.json berisi { accessToken, userId }
 * Docs: https://developers.facebook.com/docs/threads
 */

const fs = require("fs");
const path = require("path");

const TOKEN_PATH = path.join(process.cwd(), "threads-token.json");
const BASE = "https://graph.threads.net/v1.0";

module.exports = {
  name: "official",
  available: true,

  async send(text, cfg) {
    if (!fs.existsSync(TOKEN_PATH)) {
      return { ok: false, error: "threads-token.json tidak ada" };
    }
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
    if (!token.accessToken || !token.userId) {
      return { ok: false, error: "token tidak lengkap" };
    }
    try {
      const createRes = await fetch(
        `${BASE}/${token.userId}/threads?media_type=TEXT&text=${encodeURIComponent(text)}&access_token=${token.accessToken}`,
        { method: "POST" }
      );
      const createData = await createRes.json();
      if (!createData.id) return { ok: false, error: JSON.stringify(createData) };

      const pubRes = await fetch(
        `${BASE}/${token.userId}/threads_publish?creation_id=${createData.id}&access_token=${token.accessToken}`,
        { method: "POST" }
      );
      const pubData = await pubRes.json();
      return pubData.id ? { ok: true, id: pubData.id } : { ok: false, error: JSON.stringify(pubData) };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },
};
