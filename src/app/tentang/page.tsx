import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  graphSchema,
  organizationSchema,
  websiteSchema,
} from "@/components/seo/schema";
import { siteUrl } from "@/lib/site";
import { GlobalNavbar } from "@/components/global-navbar";
import { globalLeadFormLink, globalWhatsappLink } from "@/components/global-navbar/nav-config";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import styles from "@/styles/seoLanding.module.scss";

const title = "Tentang Outletmu | Aplikasi Kasir F&B Indonesia";
const description =
  "Outletmu adalah aplikasi kasir (POS) berbasis web untuk cafe, coffee shop, restoran, kedai, dan UMKM F&B di Indonesia. Menyatukan kasir, QR order meja, menu digital, kitchen display, stok, dan laporan.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tentang" },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/tentang`,
    siteName: "Outletmu",
    locale: "id_ID",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

const aboutOrganizationSchema = {
  ...organizationSchema,
  alternateName: "Outletmu POS",
  description,
  foundingDate: "2026-07-27",
  foundingLocation: "Indonesia",
  areaServed: { "@type": "Country", name: "Indonesia" },
  sameAs: [siteUrl],
  knowsAbout: [
    "aplikasi kasir cafe",
    "POS restoran",
    "QR order meja",
    "menu digital cafe",
    "kitchen display system",
    "manajemen stok cafe",
    "laporan penjualan F&B",
  ],
  brand: { "@type": "Brand", name: "Outletmu" },
};

const differentiators = [
  {
    title: "Setup dibantu dari awal",
    body: "Tim Outletmu membantu input menu dan menyiapkan sistem, bukan sekadar menjual software lalu ditinggal.",
  },
  {
    title: "Satu alur untuk semua",
    body: "Kasir, QR order meja, kitchen, stok, dan laporan dibaca dari sumber yang sama, sehingga status pesanan tidak terputus.",
  },
  {
    title: "Harga rupiah yang transparan",
    body: "Paket bulanan mulai Rp249.000, tanpa biaya tersembunyi. Gratis setup untuk 100 outlet pertama.",
  },
  {
    title: "Bisa berkembang",
    body: "Mulai dari satu outlet, lalu naik ke multi-outlet, role staff, dan automasi saat kebutuhan bertambah.",
  },
  {
    title: "Laporan via WhatsApp",
    body: "Owner bisa mengecek omzet, transaksi, produk terlaris, dan stok langsung dari chat.",
  },
];

export default function TentangPage() {
  return (
    <main className={styles.page}>
      <JsonLd
        data={graphSchema([
          aboutOrganizationSchema,
          websiteSchema,
          breadcrumbSchema([
            { name: "Outletmu", path: "/" },
            { name: "Tentang", path: "/tentang" },
          ]),
        ])}
      />

      <GlobalNavbar />

      <ScrollReveal>
        <section className={styles.hero}>
          <div className={styles.heroCopy} data-reveal>
            <h1>Tentang Outletmu</h1>
            <p className={styles.lead}>
              Outletmu adalah aplikasi kasir (POS) berbasis web untuk bisnis F&B di Indonesia — cafe,
              coffee shop, restoran, kedai, dan UMKM. Outletmu menyatukan kasir, QR order meja, menu
              digital, kitchen display, stok, dan laporan dalam satu sistem bulanan yang setup-nya
              dibantu tim Outletmu.
            </p>
            <div className={styles.heroActions}>
              <Link href={globalLeadFormLink} className={styles.primaryCta}>
                Coba Gratis
              </Link>
              <Link href="/harga" className={styles.secondaryCta}>
                Cek Paket Bulanan
              </Link>
            </div>
          </div>

          <aside className={styles.intentPanel} aria-label="Ringkasan Outletmu" data-reveal>
            <p>
              Berdiri sejak 27 Juli 2026, fokus pada cafe, coffee shop, restoran, dan UMKM F&B di
              Indonesia. Model langganan bulanan mulai Rp249.000 dengan setup dibantu.
            </p>
          </aside>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader} data-reveal>
            <h2>Siapa kami dan misi kami</h2>
          </div>
          <div className={styles.storyGrid}>
            <article className={styles.storyBlock} data-reveal>
              <div className={styles.storyCopy}>
                <h2>Siapa kami</h2>
                <p>
                  Outletmu didirikan pada 27 Juli 2026 dan melayani outlet F&B di seluruh Indonesia.
                  Tim Outletmu menangani produk, implementasi setup, dan support operasional outlet.
                </p>
              </div>
            </article>
            <article className={`${styles.storyBlock} ${styles.storyBlockReverse}`} data-reveal>
              <div className={styles.storyCopy}>
                <h2>Misi kami</h2>
                <p>
                  Membantu cafe, kedai, restoran, dan UMKM F&B di Indonesia menjalankan operasional
                  harian — dari order masuk, kitchen, pembayaran, sampai laporan — dari satu alur yang
                  mudah dipahami owner maupun staff.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader} data-reveal>
            <h2>Yang membuat Outletmu berbeda</h2>
          </div>
          <div className={styles.storyGrid}>
            {differentiators.map((item) => (
              <article key={item.title} className={styles.storyBlock} data-reveal>
                <div className={styles.storyCopy}>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.ctaBand} data-reveal>
            <div>
              <h2>Diskusikan kebutuhan outlet kamu</h2>
              <p>
                WhatsApp 081291960227 · Email ap648616@gmail.com. Tim Outletmu siap membantu
                memetakan kebutuhan POS, QR order, menu digital, stok, dan laporan.
              </p>
            </div>
            <Link href={globalWhatsappLink} className={styles.primaryCta}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Hubungi Kami
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
