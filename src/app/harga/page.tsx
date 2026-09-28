import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  faqPageSchema,
  graphSchema,
  organizationSchema,
  productOfferSchema,
  softwareApplicationSchema,
  websiteSchema,
} from "@/components/seo/schema";
import { seoPages, siteUrl } from "@/components/seo/seo-pages";
import { GlobalNavbar } from "@/components/global-navbar";
import { globalLeadFormLink } from "@/components/global-navbar/nav-config";
import { cn } from "@/lib/utils";
import styles from "@/styles/seoLanding.module.scss";

const title = "Harga Paket Aplikasi Kasir & POS Outletmu | Mulai Rp249.000";
const description =
  "Daftar harga aplikasi kasir dan POS Outletmu: Starter Rp249.000, POS Basic Rp499.000, Pro Automation Rp799.000 per bulan. Setup dibantu, gratis setup 100 outlet pertama.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/harga",
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/harga`,
    siteName: "Outletmu",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const pricingPlans = [
  {
    name: "Starter",
    price: "Rp249.000",
    suffix: "/ bulan",
    description: "Untuk outlet kecil yang mulai merapikan kasir dan menu digital.",
    button: "Mulai Starter",
    features: ["POS Kasir", "QR Menu", "Order Center", "Produk & kategori", "Laporan dasar", "1 outlet"],
  },
  {
    name: "POS Basic",
    price: "Rp499.000",
    suffix: "/ bulan",
    badge: "Paling Direkomendasikan",
    highlighted: true,
    description: "Paket inti untuk kasir, QR order, kitchen, inventory, dan laporan outlet.",
    button: "Pilih POS Basic",
    features: [
      "Semua fitur Starter",
      "Kitchen Display",
      "Inventory & stok menipis",
      "QR Table / QR Meja",
      "Laporan omzet, transaksi, dan produk terlaris",
      "Support setup awal",
    ],
  },
  {
    name: "Pro Automation",
    price: "Rp799.000",
    suffix: "/ bulan",
    description: "Untuk outlet yang ingin operasional lebih otomatis dan terpantau.",
    button: "Pilih Pro Automation",
    features: [
      "Semua fitur POS Basic",
      "Multi outlet ringan",
      "Role staff",
      "Audit log",
      "Absensi staff",
      "Automasi laporan dan workflow operasional",
    ],
  },
  {
    name: "Enterprise",
    price: "Konsultasi",
    suffix: "",
    description: "Untuk kebutuhan khusus, outlet ramai, atau penyesuaian alur bisnis.",
    button: "Konsultasi",
    features: [
      "Custom workflow",
      "Setup multi outlet",
      "Onboarding khusus",
      "Prioritas support",
      "Integrasi sesuai kebutuhan",
      "Penyesuaian performa traffic tinggi",
    ],
  },
];

const faqs = [
  {
    question: "Berapa harga aplikasi kasir cafe Outletmu?",
    answer:
      "Paket Outletmu mulai dari Rp249.000 per bulan untuk Starter. Paket lain tersedia untuk POS Basic, Pro Automation, dan Enterprise sesuai kebutuhan outlet.",
  },
  {
    question: "Apakah harga sudah termasuk setup?",
    answer:
      "Ya, paket bulanan sudah mencakup bantuan setup awal, hosting, maintenance, dan arahan penggunaan agar outlet bisa mulai lebih cepat.",
  },
  {
    question: "Paket mana yang cocok untuk cafe kecil?",
    answer:
      "Cafe kecil biasanya bisa mulai dari Starter. Jika butuh kitchen display, inventory, QR meja, dan laporan lebih lengkap, POS Basic menjadi paket yang paling direkomendasikan.",
  },
  {
    question: "Apakah bisa konsultasi sebelum memilih paket?",
    answer:
      "Bisa. Tim Outletmu bisa bantu memetakan kebutuhan POS, QR menu, kitchen, inventory, laporan, dan workflow sebelum outlet memilih paket.",
  },
];

const priceComparisonRows: Array<{
  feature: string;
  starter: string;
  posBasic: string;
  pro: string;
}> = [
  { feature: "POS Kasir", starter: "✓", posBasic: "✓", pro: "✓" },
  { feature: "QR Menu & Order Center", starter: "✓", posBasic: "✓", pro: "✓" },
  { feature: "Laporan dasar", starter: "✓", posBasic: "✓", pro: "✓" },
  { feature: "Kitchen Display", starter: "—", posBasic: "✓", pro: "✓" },
  { feature: "Inventory & stok menipis", starter: "—", posBasic: "✓", pro: "✓" },
  { feature: "QR Meja", starter: "—", posBasic: "✓", pro: "✓" },
  { feature: "Laporan lengkap", starter: "—", posBasic: "✓", pro: "✓" },
  { feature: "Multi outlet", starter: "—", posBasic: "—", pro: "✓" },
  { feature: "Role staff & audit log", starter: "—", posBasic: "—", pro: "✓" },
  { feature: "Absensi staff", starter: "—", posBasic: "—", pro: "✓" },
  { feature: "Automasi laporan & workflow", starter: "—", posBasic: "—", pro: "✓" },
  { feature: "Setup dibantu & support", starter: "✓", posBasic: "✓", pro: "✓" },
];

const guideLinks = [
  {
    href: "/panduan/memilih-aplikasi-kasir-cafe",
    label: "Panduan memilih aplikasi kasir",
    description: "Cek kebutuhan POS, QR order, menu digital, stok, laporan, dan support sebelum memilih paket.",
  },
  {
    href: "/panduan/qr-order-meja-cafe",
    label: "QR order meja",
    description: "Pahami kapan QR order cocok dipakai dan apa yang perlu disiapkan sebelum rollout.",
  },
  {
    href: "/panduan/stok-cafe",
    label: "Stok cafe",
    description: "Lihat cara membuat kontrol stok sederhana sebelum menambah workflow lebih lengkap.",
  },
];

const productSchema = productOfferSchema({
  id: `${siteUrl}/harga#product`,
  name: "Outletmu",
  description,
  offers: pricingPlans
    .filter((plan) => plan.price.startsWith("Rp"))
    .map((plan) => ({
      name: plan.name,
      price: plan.price.replace(/\D/g, ""),
      url: `${siteUrl}/harga`,
    })),
});

export default function HargaPage() {
  return (
    <main className={cn(styles.page, styles.pricingPage)}>
      <JsonLd
        data={graphSchema([
          organizationSchema,
          websiteSchema,
          softwareApplicationSchema(seoPages.posKasirCafe),
          productSchema,
          faqPageSchema(faqs),
          breadcrumbSchema([
            { name: "Outletmu", path: "/" },
            { name: "Harga", path: "/harga" },
          ]),
        ])}
      />

      <GlobalNavbar />

      <section className={cn(styles.hero, styles.pricingHero)}>
        <div className={styles.heroCopy} data-reveal>
          <h1>Harga paket aplikasi kasir & POS untuk cafe dan UMKM</h1>
          <p className={styles.lead}>
            Empat paket bulanan sesuai tahap outlet: mulai dari kasir dan QR menu,
            lalu naik ke kitchen, inventory, laporan, staff, dan otomasi.
          </p>
          <div className={styles.heroActions}>
            <Link href={globalLeadFormLink} className={styles.primaryCta}>
              Coba Gratis
            </Link>
            <Link href="/software-kasir-fnb" className={styles.secondaryCta}>
              Lihat Solusi F&B
            </Link>
          </div>
        </div>

        <aside className={styles.pricingHeroPanel} aria-label="Ringkasan paket Outletmu" data-reveal>
          <div className={styles.pricingHeroIcon}>
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2>POS Basic</h2>
          <p>
            Kasir, QR meja, kitchen display, inventory, dan laporan outlet dalam satu setup yang dibantu.
          </p>
          <div className={styles.pricingHeroStats}>
            <div>
              <strong>4 paket</strong>
              <small>untuk tahap outlet berbeda</small>
            </div>
            <div>
              <strong>Rp249.000</strong>
              <small>mulai per bulan</small>
            </div>
          </div>
        </aside>
      </section>

      <section id="harga" className={cn(styles.section, styles.pricingTableSection)}>
        <div className={styles.pricingHeader} data-reveal>
          <div>
            <h2>Harga paket sesuai kebutuhan outlet</h2>
          </div>
          <p>
            Setiap paket mencakup hosting, maintenance, dan bantuan setup awal.
            Pilih sesuai skala operasional, bisa ditingkatkan kapan saja.
          </p>
        </div>

        <div className={styles.pricingGrid21}>
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={cn(styles.pricingPlanCard, plan.highlighted && styles.pricingPlanCardFeatured)}
              data-reveal
            >
              <div className={styles.pricingPlanTop}>
                <h3>{plan.name}</h3>
                {plan.badge ? <span>{plan.badge}</span> : null}
              </div>
              <p>{plan.description}</p>
              <div className={styles.pricingAmount}>
                <strong>{plan.price}</strong>
                {plan.suffix ? <small>{plan.suffix}</small> : null}
              </div>
              <Link
                href={globalLeadFormLink}
                className={cn(styles.pricingButton, plan.highlighted ? styles.primaryCta : styles.secondaryCta)}
              >
                {plan.button}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <ul className={styles.pricingFeatureList}>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check className="h-4 w-4" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className={styles.pricingFooterBanner} data-reveal>
          <div>
            <h2>Butuh paket yang pas untuk operasional outletmu?</h2>
            <p>
              Tim Outletmu bisa bantu rekomendasikan setup POS, QR menu, kitchen, inventory,
              dan laporan sesuai kebutuhan bisnis.
            </p>
          </div>
          <Link href={globalLeadFormLink} className={styles.primaryCta}>
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Coba Gratis
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader} data-reveal>
          <h2>Tabel perbandingan harga & fitur</h2>
        </div>
        <div className={styles.comparisonTableWrap} data-reveal>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th>Fitur</th>
                <th>Starter<br />Rp249.000</th>
                <th>POS Basic<br />Rp499.000</th>
                <th>Pro Automation<br />Rp799.000</th>
              </tr>
            </thead>
            <tbody>
              {priceComparisonRows.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  <td>{row.starter}</td>
                  <td>{row.posBasic}</td>
                  <td>{row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader} data-reveal>
          <h2>Pertanyaan sebelum memilih paket</h2>
        </div>
        <div className={styles.pricingFaqGrid}>
          {faqs.map((faq) => (
            <article key={faq.question} className={styles.pricingFaqCard} data-reveal>
              <h2>{faq.question}</h2>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.relatedSection}>
        <div className={styles.sectionHeader} data-reveal>
          <h2>Baca dulu sebelum memilih paket</h2>
        </div>
        <div className={styles.relatedLinks}>
          {guideLinks.map((link) => (
            <Link key={link.href} href={link.href} data-reveal>
              <strong>{link.label}</strong>
              <small>{link.description}</small>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
