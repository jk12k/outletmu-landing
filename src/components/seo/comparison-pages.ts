export type ComparisonRow = {
  aspect: string;
  outletmu: string;
  competitor: string;
};

export type ComparisonPageContent = {
  slug: string;
  competitor: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  summary: string;
  tableRows: ComparisonRow[];
  chooseOutletmu: string[];
  chooseCompetitor: string[];
  verdict: string;
  faqs: Array<{ question: string; answer: string }>;
};

// Reusable di beberapa halaman (isi identik): daftar pilih-Outletmu untuk
// kompetitor yang bukan pemimpin pasar F&B, dan FAQ QR order yang sama.
const chooseOutletmuFnb = [
  "Kamu fokus pada operasional F&B (cafe/resto/kedai)",
  "Butuh QR order meja + kitchen display + laporan WhatsApp",
  "Ingin setup dibantu, bukan mandiri",
];

const qrOrderFaq = {
  question: "Apakah Outletmu punya QR order meja?",
  answer:
    "Ya. Pelanggan scan QR, memilih menu dari HP, dan pesanan masuk ke dashboard kasir serta kitchen dalam satu antrean.",
};

export const comparisonPages: ComparisonPageContent[] = [
  {
    slug: "outletmu-vs-moka",
    competitor: "Moka",
    title: "Outletmu vs Moka: Perbandingan Aplikasi Kasir Cafe | Outletmu",
    description:
      "Perbandingan jujur Outletmu vs Moka untuk cafe: fitur, QR order meja, kitchen, laporan WhatsApp, harga, dan cocok untuk siapa.",
    h1: "Outletmu vs Moka: Perbandingan Aplikasi Kasir Cafe 2026",
    lead: "Memilih aplikasi kasir cafe itu soal mencocokkan kebutuhan outlet dengan sistemnya — bukan sekadar memilih yang paling terkenal. Berikut perbandingan Outletmu vs Moka secara jujur: fitur, harga, dan untuk siapa masing-masing paling pas.",
    summary:
      "Moka adalah aplikasi kasir (POS) F&B yang mapan di Indonesia, dengan fitur luas dan banyak dipakai cafe besar maupun jaringan. Outletmu adalah sistem POS bulanan yang menekankan setup dibantu dari awal, dengan harga mulai Rp249.000/bulan, QR order meja, dan laporan WhatsApp untuk owner.",
    tableRows: [
      { aspect: "Jenis", outletmu: "Aplikasi kasir + QR order meja (POS bulanan)", competitor: "Aplikasi kasir (POS) F&B" },
      { aspect: "Fokus", outletmu: "Cafe, coffee shop, restoran, UMKM F&B", competitor: "Cafe, restoran, jaringan F&B" },
      { aspect: "QR order meja", outletmu: "Ya — pelanggan scan, order masuk ke kasir + kitchen", competitor: "Ada (sesuai paket)" },
      { aspect: "Kitchen display", outletmu: "Ya (paket POS Basic ke atas)", competitor: "Ada" },
      { aspect: "Laporan WhatsApp", outletmu: "Ya — cek omzet/stok lewat chat", competitor: "Perlu dicek per paket" },
      { aspect: "Model harga", outletmu: "Bulanan, mulai Rp249.000", competitor: "Bervariasi per paket" },
      { aspect: "Setup", outletmu: "Dibantu dari awal oleh tim", competitor: "Umumnya self-service" },
    ],
    chooseOutletmu: [
      "Kamu punya cafe/kedai/restoran kecil dan tidak mau mengurus setup teknis sendiri",
      "Kamu ingin QR order meja yang langsung terhubung ke kasir dan kitchen",
      "Kamu ingin laporan omzet bisa dicek lewat WhatsApp tanpa buka dashboard",
      "Kamu ingin mulai dengan biaya bulanan yang transparan (mulai Rp249.000)",
    ],
    chooseCompetitor: [
      "Bisnismu sudah besar dengan kebutuhan fitur enterprise yang kompleks",
      "Kamu butuh ekosistem fitur yang lebih luas dan sudah mapan",
      "Kamu tidak keberatan dengan setup yang lebih mandiri",
    ],
    verdict:
      "Keduanya aplikasi kasir yang sah untuk cafe — bedanya di pendekatan. Moka unggul untuk kebutuhan enterprise yang luas; Outletmu unggul untuk outlet yang ingin sistem rapi dengan setup dibantu dan harga bulanan yang jelas.",
    faqs: [
      {
        question: "Apa perbedaan utama Outletmu dan Moka?",
        answer:
          "Moka adalah aplikasi kasir F&B yang mapan dengan fitur luas. Outletmu menekankan setup dibantu dari awal, dengan harga mulai Rp249.000/bulan dan QR order meja yang langsung terhubung ke kasir serta kitchen. Outletmu cocok untuk cafe/UMKM yang tidak mau mengurus teknis sendiri.",
      },
      {
        question: "Mana yang lebih murah?",
        answer:
          "Outletmu memulai dari Rp249.000/bulan. Harga Moka bervariasi per paket dan kebutuhan. Bandingkan fitur per paket sebelum memutuskan.",
      },
      qrOrderFaq,
      {
        question: "Outletmu atau Moka untuk cafe kecil?",
        answer:
          "Untuk cafe kecil yang ingin sistem rapi tanpa ribet teknis, Outletmu dibuat khusus dengan setup dibantu. Untuk kebutuhan enterprise yang kompleks, Moka punya penawaran lebih luas.",
      },
    ],
  },
  {
    slug: "outletmu-vs-pawoon",
    competitor: "Pawoon",
    title: "Outletmu vs Pawoon: Perbandingan POS Cafe | Outletmu",
    description:
      "Perbandingan jujur Outletmu vs Pawoon untuk cafe: fitur, QR order meja, kitchen, laporan WhatsApp, harga, dan cocok untuk siapa.",
    h1: "Outletmu vs Pawoon: Perbandingan POS Cafe 2026",
    lead: "Dua aplikasi kasir yang sering dipertimbangkan owner cafe Indonesia. Berikut perbandingan Outletmu vs Pawoon: fitur, QR order, harga, dan untuk siapa masing-masing paling pas.",
    summary:
      "Pawoon dikenal sebagai aplikasi kasir yang simpel dengan transaksi cepat. Outletmu adalah sistem POS bulanan dengan penekanan pada setup dibantu, QR order meja yang menyatu dengan kasir & kitchen, serta laporan WhatsApp untuk owner. Outletmu mulai Rp249.000/bulan.",
    tableRows: [
      { aspect: "Jenis", outletmu: "POS bulanan + QR order meja", competitor: "Aplikasi kasir (POS)" },
      { aspect: "Fokus", outletmu: "Cafe, coffee shop, restoran, UMKM F&B", competitor: "Cafe & bisnis retail/F&B" },
      { aspect: "QR order meja", outletmu: "Ya — terhubung ke kasir + kitchen", competitor: "Perlu dicek per paket" },
      { aspect: "Kitchen display", outletmu: "Ya (POS Basic ke atas)", competitor: "Ada" },
      { aspect: "Laporan WhatsApp", outletmu: "Ya", competitor: "Perlu dicek per paket" },
      { aspect: "Harga mulai", outletmu: "Rp249.000/bulan", competitor: "Bervariasi per paket" },
      { aspect: "Setup", outletmu: "Dibantu dari awal", competitor: "Umumnya self-service" },
    ],
    chooseOutletmu: [
      "Kamu ingin QR order meja yang langsung masuk ke kasir & kitchen",
      "Kamu ingin setup dibantu, bukan mengurus sendiri dari nol",
      "Kamu ingin laporan omzet via WhatsApp",
      "Kamu mau harga bulanan yang transparan mulai Rp249.000",
    ],
    chooseCompetitor: [
      "Kamu ingin aplikasi kasir simpel dengan transaksi cepat",
      "Kebutuhanmu standar dan tidak butuh setup dibantu",
    ],
    verdict:
      "Untuk alur order rapi + QR order + setup dibantu, Outletmu cocok. Untuk kasir simpel, Pawoon pilihan yang dikenal. Verifikasi fitur & harga terbaru masing-masing sebelum memutuskan.",
    faqs: [
      {
        question: "Apa beda Outletmu dan Pawoon?",
        answer:
          "Pawoon fokus pada transaksi cepat dan simpel. Outletmu menekankan setup dibantu, QR order meja terhubung kasir & kitchen, dan laporan WhatsApp. Outletmu mulai Rp249.000/bulan.",
      },
      {
        question: "Apakah Outletmu punya QR order seperti Pawoon?",
        answer:
          "Ya — pelanggan scan QR, pesan dari HP, order masuk ke satu antrean kasir + kitchen.",
      },
      {
        question: "Mana yang lebih cocok untuk cafe kecil?",
        answer:
          "Untuk cafe kecil yang ingin sistem rapi tanpa ribet teknis, Outletmu dibuat dengan setup dibantu. Keduanya layak — pilih sesuai kebutuhan alur order, QR, dan laporan.",
      },
    ],
  },
  {
    slug: "outletmu-vs-majoo",
    competitor: "Majoo",
    title: "Outletmu vs Majoo: Perbandingan Aplikasi Kasir | Outletmu",
    description:
      "Perbandingan jujur Outletmu vs Majoo: Outletmu fokus F&B dengan setup dibantu, Majoo all-in-one lintas usaha. Fitur, harga, cocok untuk siapa.",
    h1: "Outletmu vs Majoo: Perbandingan Aplikasi Kasir 2026",
    lead: "Majoo adalah platform all-in-one untuk banyak jenis usaha (POS, stok, karyawan, CRM, multi-outlet). Outletmu fokus ke operasional F&B dengan setup dibantu. Berikut perbandingan jujur: fitur, harga, dan untuk siapa masing-masing paling pas.",
    summary:
      "Majoo unggul untuk all-in-one lintas jenis usaha, modul karyawan/CRM. Outletmu adalah sistem POS bulanan khusus F&B dengan QR order meja yang menyatu ke kasir & kitchen, kitchen display, dan laporan WhatsApp. Mulai Rp249.000/bulan.",
    tableRows: [
      { aspect: "Cakupan", outletmu: "Fokus F&B: kasir, QR order, kitchen, stok, laporan", competitor: "All-in-one: POS, stok, karyawan, CRM, multi-outlet" },
      { aspect: "QR order meja", outletmu: "Ya — terhubung kasir + kitchen", competitor: "Perlu dicek per paket" },
      { aspect: "Kitchen display", outletmu: "Ya (POS Basic ke atas)", competitor: "Ada (F&B)" },
      { aspect: "Laporan WhatsApp", outletmu: "Ya", competitor: "Perlu dicek" },
      { aspect: "Harga mulai", outletmu: "Rp249.000/bulan", competitor: "Bervariasi per paket" },
      { aspect: "Setup", outletmu: "Dibantu dari awal", competitor: "Umumnya self-service" },
    ],
    chooseOutletmu: chooseOutletmuFnb,
    chooseCompetitor: [
      "Kamu butuh all-in-one lintas jenis usaha, modul karyawan/CRM",
      "Tidak masalah dengan setup mandiri",
    ],
    verdict:
      "Untuk operasional F&B spesifik dengan setup dibantu, Outletmu cocok. Untuk all-in-one lintas jenis usaha, modul karyawan/CRM, Majoo lebih tepat. Verifikasi fitur & harga terbaru masing-masing sebelum memutuskan.",
    faqs: [
      {
        question: "Apa beda Outletmu dan Majoo?",
        answer:
          "Majoo adalah platform all-in-one untuk banyak jenis usaha (POS, stok, karyawan, CRM, multi-outlet). Outletmu adalah sistem POS bulanan khusus F&B dengan penekanan pada setup dibantu, QR order meja, kitchen display, dan laporan WhatsApp — mulai Rp249.000/bulan.",
      },
      {
        question: "Mana yang lebih cocok untuk cafe F&B?",
        answer:
          "Jika kamu ingin sistem yang khusus dirancang untuk alur cafe (QR order meja, kitchen display, laporan WhatsApp) dengan setup dibantu, Outletmu cocok. Majoo unggul untuk all-in-one lintas jenis usaha, modul karyawan/CRM.",
      },
      qrOrderFaq,
    ],
  },
  {
    slug: "outletmu-vs-olsera",
    competitor: "Olsera",
    title: "Outletmu vs Olsera: Perbandingan Aplikasi Kasir | Outletmu",
    description:
      "Perbandingan jujur Outletmu vs Olsera: Outletmu fokus F&B dengan setup dibantu, Olsera fokus omni-channel. Fitur, harga, cocok untuk siapa.",
    h1: "Outletmu vs Olsera: Perbandingan Aplikasi Kasir 2026",
    lead: "Olsera adalah POS dengan fokus omni-channel (toko online + offline, multi-channel). Outletmu fokus ke operasional F&B dengan setup dibantu. Berikut perbandingan jujur: fitur, harga, dan untuk siapa masing-masing paling pas.",
    summary:
      "Olsera unggul untuk penjualan online & multi-channel (marketplace, toko online). Outletmu adalah sistem POS bulanan khusus F&B dengan QR order meja yang menyatu ke kasir & kitchen, kitchen display, dan laporan WhatsApp. Mulai Rp249.000/bulan.",
    tableRows: [
      { aspect: "Cakupan", outletmu: "Fokus F&B: kasir, QR order, kitchen, stok, laporan", competitor: "POS + toko online + multi-channel" },
      { aspect: "QR order meja", outletmu: "Ya — terhubung kasir + kitchen", competitor: "Perlu dicek" },
      { aspect: "Kitchen display", outletmu: "Ya (POS Basic ke atas)", competitor: "Fokus retail" },
      { aspect: "Laporan WhatsApp", outletmu: "Ya", competitor: "Perlu dicek" },
      { aspect: "Harga mulai", outletmu: "Rp249.000/bulan", competitor: "Bervariasi per paket" },
      { aspect: "Setup", outletmu: "Dibantu dari awal", competitor: "Umumnya self-service" },
    ],
    chooseOutletmu: chooseOutletmuFnb,
    chooseCompetitor: [
      "Kamu butuh penjualan online & multi-channel (marketplace, toko online)",
      "Tidak masalah dengan setup mandiri",
    ],
    verdict:
      "Untuk operasional F&B spesifik dengan setup dibantu, Outletmu cocok. Untuk penjualan online & multi-channel (marketplace, toko online), Olsera lebih tepat. Verifikasi fitur & harga terbaru masing-masing sebelum memutuskan.",
    faqs: [
      {
        question: "Apa beda Outletmu dan Olsera?",
        answer:
          "Olsera adalah POS dengan fokus omni-channel (toko online + offline, multi-channel). Outletmu adalah sistem POS bulanan khusus F&B dengan penekanan pada setup dibantu, QR order meja, kitchen display, dan laporan WhatsApp — mulai Rp249.000/bulan.",
      },
      {
        question: "Mana yang lebih cocok untuk cafe F&B?",
        answer:
          "Jika kamu ingin sistem yang khusus dirancang untuk alur cafe (QR order meja, kitchen display, laporan WhatsApp) dengan setup dibantu, Outletmu cocok. Olsera unggul untuk penjualan online & multi-channel (marketplace, toko online).",
      },
      qrOrderFaq,
    ],
  },
  {
    slug: "outletmu-vs-qasir",
    competitor: "Qasir",
    title: "Outletmu vs Qasir: Perbandingan Aplikasi Kasir | Outletmu",
    description:
      "Perbandingan jujur Outletmu vs Qasir: Outletmu fokus F&B dengan setup dibantu, Qasir simpel untuk usaha kecil. Fitur, harga, cocok untuk siapa.",
    h1: "Outletmu vs Qasir: Perbandingan Aplikasi Kasir 2026",
    lead: "Qasir adalah aplikasi kasir sederhana dengan biaya relatif rendah, populer untuk usaha kecil. Outletmu fokus ke operasional F&B dengan setup dibantu. Berikut perbandingan jujur: fitur, harga, dan untuk siapa masing-masing paling pas.",
    summary:
      "Qasir unggul untuk usaha kecil yang baru mulai dengan budget minim. Outletmu adalah sistem POS bulanan khusus F&B dengan QR order meja yang menyatu ke kasir & kitchen, kitchen display, dan laporan WhatsApp. Mulai Rp249.000/bulan.",
    tableRows: [
      { aspect: "Cakupan", outletmu: "Fokus F&B: kasir, QR order, kitchen, stok, laporan", competitor: "POS simpel untuk usaha kecil" },
      { aspect: "QR order meja", outletmu: "Ya — terhubung kasir + kitchen", competitor: "Perlu dicek per paket" },
      { aspect: "Kitchen display", outletmu: "Ya (POS Basic ke atas)", competitor: "Terbatas" },
      { aspect: "Laporan WhatsApp", outletmu: "Ya", competitor: "Perlu dicek" },
      { aspect: "Harga mulai", outletmu: "Rp249.000/bulan", competitor: "Relatif rendah" },
      { aspect: "Setup", outletmu: "Dibantu dari awal", competitor: "Umumnya self-service" },
    ],
    chooseOutletmu: chooseOutletmuFnb,
    chooseCompetitor: [
      "Kamu butuh usaha kecil yang baru mulai dengan budget minim",
      "Tidak masalah dengan setup mandiri",
    ],
    verdict:
      "Untuk operasional F&B spesifik dengan setup dibantu, Outletmu cocok. Untuk usaha kecil yang baru mulai dengan budget minim, Qasir lebih tepat. Verifikasi fitur & harga terbaru masing-masing sebelum memutuskan.",
    faqs: [
      {
        question: "Apa beda Outletmu dan Qasir?",
        answer:
          "Qasir adalah aplikasi kasir sederhana dengan biaya relatif rendah, populer untuk usaha kecil. Outletmu adalah sistem POS bulanan khusus F&B dengan penekanan pada setup dibantu, QR order meja, kitchen display, dan laporan WhatsApp — mulai Rp249.000/bulan.",
      },
      {
        question: "Mana yang lebih cocok untuk cafe F&B?",
        answer:
          "Jika kamu ingin sistem yang khusus dirancang untuk alur cafe (QR order meja, kitchen display, laporan WhatsApp) dengan setup dibantu, Outletmu cocok. Qasir unggul untuk usaha kecil yang baru mulai dengan budget minim.",
      },
      qrOrderFaq,
    ],
  },
];

export const comparisonPageBySlug = Object.fromEntries(
  comparisonPages.map((page) => [page.slug, page]),
);

export function getComparisonPageBySlug(slug: string) {
  return comparisonPageBySlug[slug];
}
