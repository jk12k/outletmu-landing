import Link from "next/link";
import { Check, X } from "lucide-react";
import { JsonLd } from "./json-ld";
import type { ComparisonPageContent } from "./comparison-pages";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  graphSchema,
  organizationSchema,
  websiteSchema,
} from "./schema";
import { siteUrl } from "@/lib/site";
import { GlobalNavbar } from "@/components/global-navbar";
import { globalLeadFormLink } from "@/components/global-navbar/nav-config";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import styles from "@/styles/seoLanding.module.scss";

type ComparisonPageProps = {
  page: ComparisonPageContent;
};

const publishedDate = "2026-09-27";

export function ComparisonPage({ page }: ComparisonPageProps) {
  const path = `/bandingkan/${page.slug}`;

  return (
    <main className={styles.page}>
      <JsonLd
        data={graphSchema([
          organizationSchema,
          websiteSchema,
          articleSchema({
            path,
            headline: page.h1,
            description: page.description,
            datePublished: publishedDate,
            dateModified: publishedDate,
          }),
          faqPageSchema(page.faqs),
          breadcrumbSchema([
            { name: "Outletmu", path: "/" },
            { name: "Perbandingan", path: "/bandingkan" },
            { name: page.h1, path },
          ]),
        ])}
      />

      <GlobalNavbar />

      <ScrollReveal>
        <section className={styles.hero}>
          <div className={styles.heroCopy} data-reveal>
            <p className={styles.eyebrow}>Perbandingan</p>
            <h1>{page.h1}</h1>
            <p className={styles.lead}>{page.lead}</p>
            <div className={styles.heroActions}>
              <Link href={globalLeadFormLink} className={styles.primaryCta}>
                Coba Gratis
              </Link>
              <Link href="/harga" className={styles.secondaryCta}>
                Cek Paket Outletmu
              </Link>
            </div>
          </div>

          <aside className={styles.intentPanel} aria-label={`Ringkasan ${page.competitor}`} data-reveal>
            <span>Ringkasan singkat</span>
            <p>{page.summary}</p>
          </aside>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader} data-reveal>
            <span>Tabel perbandingan</span>
            <h2>Outletmu vs {page.competitor}</h2>
          </div>
          <div className={styles.comparisonTableWrap} data-reveal>
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th>Aspek</th>
                  <th>Outletmu</th>
                  <th>{page.competitor}</th>
                </tr>
              </thead>
              <tbody>
                {page.tableRows.map((row) => (
                  <tr key={row.aspect}>
                    <th scope="row">{row.aspect}</th>
                    <td>{row.outletmu}</td>
                    <td>{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader} data-reveal>
            <span>Cocok untuk siapa</span>
            <h2>Pilih yang sesuai kebutuhan outlet kamu</h2>
          </div>
          <div className={styles.comparisonChooseGrid}>
            <article className={styles.comparisonChooseCard} data-reveal>
              <h3>
                <Check className="h-4 w-4" aria-hidden="true" /> Pilih Outletmu jika
              </h3>
              <ul>
                {page.chooseOutletmu.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className={styles.comparisonChooseCard} data-reveal>
              <h3>
                <X className="h-4 w-4" aria-hidden="true" /> Pertimbangkan {page.competitor} jika
              </h3>
              <ul>
                {page.chooseCompetitor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className={styles.comparisonVerdict} data-reveal>
            <strong>Kesimpulan:</strong> {page.verdict}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader} data-reveal>
            <span>FAQ</span>
            <h2>Pertanyaan yang sering muncul</h2>
          </div>
          <div className={styles.storyGrid}>
            {page.faqs.map((faq) => (
              <article key={faq.question} className={styles.storyBlock} data-reveal>
                <div className={styles.storyCopy}>
                  <h2>{faq.question}</h2>
                  <p>{faq.answer}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.ctaBand} data-reveal>
            <div>
              <span>Outletmu</span>
              <h2>Diskusikan kebutuhan outlet kamu</h2>
              <p>
                Ceritakan jenis outlet, jumlah meja, kebutuhan QR order, dan laporan. Tim Outletmu
                akan bantu arahkan paket yang paling masuk akal.
              </p>
            </div>
            <Link href={globalLeadFormLink} className={styles.primaryCta}>
              Coba Gratis
            </Link>
          </div>
        </section>

        <section className={styles.relatedSection}>
          <div className={styles.sectionHeader} data-reveal>
            <span>Perbandingan lain</span>
            <h2>Bandingkan dengan aplikasi kasir lain</h2>
          </div>
          <div className={styles.relatedLinks}>
            <Link href="/bandingkan" data-reveal>
              <strong>Semua perbandingan</strong>
              <small>Lihat seluruh perbandingan Outletmu dengan aplikasi kasir lain.</small>
            </Link>
            <Link href="/harga" data-reveal>
              <strong>Harga Outletmu</strong>
              <small>Paket bulanan mulai Rp249.000 dengan setup dibantu.</small>
            </Link>
            <Link href="/tentang" data-reveal>
              <strong>Tentang Outletmu</strong>
              <small>Profil, misi, dan yang membuat Outletmu berbeda.</small>
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
