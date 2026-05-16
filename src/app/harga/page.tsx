import type { Metadata } from "next";
import Link from "next/link";
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
import { seoPages, siteUrl, whatsappLink } from "@/components/seo/seo-pages";
import { GlobalNavbar } from "@/components/global-navbar";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import styles from "@/styles/seoLanding.module.scss";

const title = "Harga Aplikasi Kasir Cafe dan QR Order | Outletmu";
const description =
  "Lihat paket harga Outletmu untuk aplikasi kasir cafe, QR order meja, menu digital, stok, kitchen, laporan, WhatsApp report, dan setup dibantu.";

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

const plans = [
  {
    name: "Starter QR",
    price: "Rp249.000",
    suffix: "/bulan",
    label: "Paket awal",
    description: "Untuk outlet yang ingin mulai pakai QR order meja, POS kasir, dan operasional dasar.",
    features: ["Dashboard", "POS kasir", "QR order meja", "Menu digital", "Kitchen", "Inventory", "Report"],
  },
  {
    name: "POS Basic",
    price: "Rp499.000",
    suffix: "/bulan",
    label: "Rekomendasi",
    description: "Untuk cafe/resto yang butuh kasir lebih rapi, absensi staff, login member, dan saldo member.",
    features: ["Semua fitur Starter", "Absensi staff", "Login member", "Saldo member", "Riwayat transaksi"],
  },
  {
    name: "Business",
    price: "Rp799.000",
    suffix: "/bulan",
    label: "Automation",
    description: "Untuk outlet yang butuh laporan WhatsApp, notifikasi stok, dan support prioritas.",
    features: ["Semua fitur POS Basic", "WhatsApp automation", "Tanya laporan via WA", "Notifikasi stok", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "Konsultasi",
    suffix: "",
    label: "Custom",
    description: "Untuk bisnis dengan kebutuhan integrasi, multi-outlet advanced, dan workflow khusus.",
    features: ["Semua fitur Business", "Setup custom", "Multi-outlet advanced", "Integrasi khusus", "Dedicated support"],
  },
];

const faqs = [
  {
    question: "Berapa harga aplikasi kasir cafe Outletmu?",
    answer:
      "Paket Outletmu mulai dari Rp249.000 per bulan untuk Starter QR. Paket lain tersedia untuk kebutuhan POS Basic, automation WhatsApp, dan custom workflow.",
  },
  {
    question: "Apakah harga sudah termasuk setup?",
    answer:
      "Ya, paket bulanan sudah mencakup bantuan setup awal, hosting, maintenance, dan arahan penggunaan agar outlet bisa mulai lebih cepat.",
  },
  {
    question: "Paket mana yang cocok untuk cafe kecil?",
    answer:
      "Cafe kecil biasanya bisa mulai dari Starter QR atau POS Basic. Starter cocok untuk QR order dan POS dasar, sedangkan POS Basic cocok jika butuh absensi staff, login member, dan saldo member.",
  },
  {
    question: "Apakah ada biaya tambahan?",
    answer:
      "Add-ons seperti domain brand sendiri, desain QR, training tambahan, atau kebutuhan custom dibahas terpisah sesuai kebutuhan outlet.",
  },
];

const addOns = [
  { name: "Default link Outletmu", value: "Free" },
  { name: "Domain .com", value: "+Rp209.900/tahun" },
  { name: "Domain .id", value: "+Rp252.900/tahun" },
  { name: "Desain QR", value: "Rp25.000" },
  { name: "Training onsite awal", value: "Free 1x" },
  { name: "Training online tambahan", value: "Rp50.000/sesi" },
  { name: "Training onsite tambahan", value: "Rp100.000/sesi" },
  { name: "Branding ringan", value: "Mulai Rp50.000" },
  { name: "Workflow custom", value: "Mulai Rp250.000" },
  { name: "Template WhatsApp custom", value: "Mulai Rp75.000" },
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
  offers: plans
    .filter((plan) => plan.price.startsWith("Rp"))
    .map((plan) => ({
      name: plan.name,
      price: plan.price.replace(/\D/g, ""),
      url: `${siteUrl}/harga`,
    })),
});

export default function HargaPage() {
  return (
    <main className={styles.page}>
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

      <ScrollReveal>
      <section className={styles.hero}>
        <div className={styles.heroCopy} data-reveal>
          <p className={styles.eyebrow}>Harga aplikasi kasir cafe</p>
          <h1>Paket harga Outletmu untuk POS kasir dan QR order</h1>
          <p className={styles.lead}>
            Pilih paket bulanan sesuai tahap outlet: mulai dari QR order meja dan POS kasir,
            lalu naik ke member, laporan WhatsApp, stok, kitchen display, dan kebutuhan custom.
          </p>
          <div className={styles.heroActions}>
            <a href={whatsappLink} className={styles.primaryCta}>
              Konsultasi Paket
            </a>
            <Link href="/software-kasir-fnb" className={styles.secondaryCta}>
              Lihat Solusi F&B
            </Link>
          </div>
        </div>

        <aside className={styles.intentPanel} aria-label="Ringkasan harga Outletmu" data-reveal>
          <span>Mulai dari</span>
          <p>
            Rp249.000/bulan untuk outlet yang ingin memakai QR order meja, menu digital,
            POS kasir, dan laporan dengan setup dibantu.
          </p>
          <div className={styles.intentTags}>
            <span>Setup dibantu</span>
            <span>Hosting termasuk</span>
            <span>Support WhatsApp</span>
          </div>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader} data-reveal>
          <span>Paket bulanan</span>
          <h2>Harga untuk kebutuhan outlet yang berbeda</h2>
        </div>
        <div className={styles.priceGrid}>
          {plans.map((plan) => (
            <article key={plan.name} className={styles.priceCard} data-reveal>
              <span>{plan.label}</span>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <div className={styles.priceValue}>
                <strong>{plan.price}</strong>
                <small>{plan.suffix}</small>
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a href={whatsappLink} className={styles.secondaryCta}>
                Tanya Paket
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.workflowSection}>
        <div className={styles.sectionHeader} data-reveal>
          <span>Add-ons</span>
          <h2>Tambahan hanya dipakai kalau outlet memang butuh</h2>
        </div>
        <div className={styles.featureGrid}>
          {addOns.map((item) => (
            <article key={item.name} className={styles.featureCard} data-reveal>
              <h3>{item.name}</h3>
              <p>{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.relatedSection}>
        <div className={styles.sectionHeader} data-reveal>
          <span>Panduan terkait</span>
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

      <section className={styles.section}>
        <div className={styles.storyGrid}>
          {faqs.map((faq) => (
            <article key={faq.question} className={styles.storyBlock} data-reveal>
              <h2>{faq.question}</h2>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.ctaBand} data-reveal>
          <div>
            <span>Outletmu</span>
            <h2>Belum yakin paket mana yang paling masuk akal?</h2>
            <p>
              Ceritakan jenis outlet, jumlah meja, fitur yang dibutuhkan, dan alur operasional
              sekarang. Tim Outletmu akan bantu pilih paket tanpa memaksakan fitur yang belum perlu.
            </p>
          </div>
          <a href={whatsappLink} className={styles.primaryCta}>
            Chat WhatsApp Outletmu
          </a>
        </div>
      </section>
      </ScrollReveal>
    </main>
  );
}
