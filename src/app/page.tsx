import { OutletmuLanding } from "@/components/landing/outletmu-landing";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  faqPageSchema,
  graphSchema,
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema,
} from "@/components/seo/schema";
import { seoPages } from "@/components/seo/seo-pages";

const homepageFaqs = [
  {
    question: "Apakah Outletmu cocok untuk bisnis kecil?",
    answer:
      "Ya. Outletmu dibuat untuk cafe, kedai, restoran kecil, minimarket, dan UMKM yang ingin mulai memakai sistem digital tanpa sistem enterprise yang rumit.",
  },
  {
    question: "Apakah harus install aplikasi?",
    answer:
      "Untuk MVP, sistem berjalan berbasis web sehingga bisa diakses dari browser di HP, tablet, atau laptop.",
  },
  {
    question: "Apakah bisa pakai QR per meja?",
    answer:
      "Bisa. Starter sudah termasuk POS Kasir, QR Menu, Order Center, produk dan kategori, laporan dasar, serta 1 outlet. Jika butuh kitchen display, inventory, QR meja, laporan lebih lengkap, dan support setup awal, naik ke POS Basic.",
  },
  {
    question: "Apakah sudah termasuk hosting?",
    answer: "Ya, semua paket sudah termasuk hosting, maintenance, dan bantuan setup awal.",
  },
  {
    question: "Apakah bisa custom fitur?",
    answer:
      "Bisa. Kebutuhan automation cocok di Pro Automation. Jika butuh custom workflow, setup multi outlet, integrasi, atau penyesuaian performa traffic tinggi, lanjut ke Enterprise.",
  },
  {
    question: "Apakah bisa integrasi QRIS?",
    answer:
      "Bisa dibahas saat konsultasi. Untuk tahap awal, QRIS manual dapat digunakan dulu agar sistem inti cepat berjalan.",
  },
  {
    question: "Apakah bisa cetak struk?",
    answer:
      "Integrasi printer struk tersedia untuk kebutuhan custom dan akan disesuaikan dengan perangkat yang dipakai bisnis.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          organizationSchema,
          websiteSchema,
          softwareApplicationSchema(seoPages.posKasirCafe),
          faqPageSchema(homepageFaqs),
          breadcrumbSchema([{ name: "Outletmu", path: "/" }]),
        ])}
      />
      <OutletmuLanding />
    </>
  );
}
