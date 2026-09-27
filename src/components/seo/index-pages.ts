import { guidePageEntries } from "./guide-pages";
import { seoPages, seoPageEntries } from "./seo-pages";

export type IndexCard = {
  href: string;
  title: string;
  description: string;
};

export type IndexPageKey = "panduan" | "fitur" | "solusi" | "bandingkan";

export type IndexPageContent = {
  key: IndexPageKey;
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string;
  cards: IndexCard[];
};

function seoCards(keys: Array<keyof typeof seoPages>): IndexCard[] {
  return keys.map((key) => {
    const page = seoPages[key];
    return { href: page.path, title: page.h1, description: page.description };
  });
}

export const indexPages: Record<IndexPageKey, IndexPageContent> = {
  panduan: {
    key: "panduan",
    path: "/panduan",
    title: "Panduan Outletmu | Outletmu",
    description:
      "Kumpulan panduan praktis untuk memilih dan memakai sistem kasir, QR order meja, menu digital, stok, dan laporan untuk cafe, restoran, serta UMKM F&B.",
    h1: "Panduan sistem kasir dan operasional outlet",
    eyebrow: "Panduan",
    intro:
      "Panduan praktis untuk owner dan tim outlet: cara memilih sistem kasir, menyiapkan QR order meja, merapikan menu digital, membaca laporan penjualan, sampai mengelola stok.",
    cards: guidePageEntries.map((entry) => ({
      href: entry.path,
      title: entry.h1,
      description: entry.description,
    })),
  },
  fitur: {
    key: "fitur",
    path: "/fitur",
    title: "Fitur Outletmu | Outletmu",
    description:
      "Fitur Outletmu untuk operasional outlet F&B: laporan WhatsApp, kitchen display, stok cafe, dan saldo member dalam satu sistem kasir bulanan.",
    h1: "Fitur yang membantu operasional outlet",
    eyebrow: "Fitur",
    intro:
      "Fitur Outletmu dirancang mengikuti alur harian outlet: order masuk, pemrosesan, kontrol stok, sampai laporan yang mudah dibaca owner.",
    cards: seoCards(["laporanWhatsapp", "kitchenDisplay", "stokCafe", "saldoMember"]),
  },
  solusi: {
    key: "solusi",
    path: "/solusi",
    title: "Solusi Outletmu | Outletmu",
    description:
      "Solusi kasir dan order digital untuk cafe, restoran, coffee shop, dan UMKM F&B: QR order meja dan menu digital.",
    h1: "Solusi kasir dan order digital untuk outlet F&B",
    eyebrow: "Solusi",
    intro:
      "Outletmu menyediakan solusi untuk alur order, kasir, menu, stok, dan laporan yang lebih tertata bagi cafe, restoran, coffee shop, dan UMKM F&B.",
    cards: seoCards(["qrOrderMeja", "menuDigitalCafe"]),
  },
  bandingkan: {
    key: "bandingkan",
    path: "/bandingkan",
    title: "Perbandingan Outletmu | Outletmu",
    description:
      "Perbandingan Outletmu dengan aplikasi kasir lain: Moka, Pawoon, Majoo, Olsera, Qasir. Fitur, harga, dan cocok untuk siapa.",
    h1: "Perbandingan Outletmu dengan aplikasi kasir lain",
    eyebrow: "Perbandingan",
    intro:
      "Sebelum memilih aplikasi kasir, penting membandingkan fitur, harga, dan kecocokan dengan outlet kamu. Berikut perbandingan Outletmu dengan beberapa aplikasi kasir populer di Indonesia.",
    cards: seoPageEntries
      .filter((entry) => entry.path.startsWith("/bandingkan/"))
      .map((entry) => ({
        href: entry.path,
        title: entry.h1,
        description: entry.description,
      })),
  },
};

export const indexPageEntries = Object.values(indexPages);

