#!/usr/bin/env node
/**
 * OUTLETMU — SENDER: UNOFFICIAL THREADS API (junhoyeo/threads-api)
 * =================================================================
 * Engine pengirim menggunakan package "threads-api" (unofficial).
 *
 * ⚠️ CATATAN RISIKO (baca sebelum pakai):
 *  - Package ini unofficial + diarsipkan sejak 2023.
 *  - Meta menegur proyek ini. Penggunaan = risiko akun kena limit/suspend.
 *  - Sudah diverifikasi: endpoint publik masih jalan (2026).
 *    Endpoint login/publish bergantung pada akun & perubahan Meta.
 *  - SELALU aktifkan fallback (clipboard) untuk jaga-jaga.
 *
 * Modul ini mengekspor: send(text, cfg) -> { ok, id?, error? }
 */

let ThreadsAPI = null;
try {
  ({ ThreadsAPI } = require("threads-api"));
} catch (e) {
  ThreadsAPI = null;
}

const sender = {
  name: "unofficial",
  available: !!ThreadsAPI,

  /**
   * @param {string} text - isi post
   * @param {object} cfg  - config.threads
   * @returns {Promise<{ok:boolean, id?:string, error?:string}>}
   */
  async send(text, cfg) {
    if (!ThreadsAPI) {
      return { ok: false, error: "package threads-api tidak tersedia. Jalankan: npm install" };
    }
    try {
      const api = new ThreadsAPI({
        username: cfg.username,
        password: cfg.password,
        deviceID: cfg.deviceID,
        verbose: false,
      });

      // Login (butuh kredensial asli)
      await api.login();

      const post = await api.publish({ text });

      // publish mengembalikan string seperti "POSTID_USERID"
      let id = null;
      if (typeof post === "string") {
        id = post;
      } else if (post) {
        id = post?.media?.id || post?.id || null;
      }
      return { ok: true, id };
    } catch (err) {
      return { ok: false, error: err.message || String(err) };
    }
  },
};

module.exports = sender;
