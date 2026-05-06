import Link from "next/link";
import { seoPages, type SeoPageContent, whatsappLink } from "./seo-pages";
import styles from "@/styles/seoLanding.module.scss";

type SeoLandingPageProps = {
  page: SeoPageContent;
};

export function SeoLandingPage({ page }: SeoLandingPageProps) {
  return (
    <main className={styles.page}>
      <nav className={styles.navbar} aria-label="Navigasi halaman SEO Outletmu">
        <Link href="/" className={styles.brand}>
          <span className={styles.brandMark}>O</span>
          <span>Outletmu</span>
        </Link>
        <div className={styles.navActions}>
          <Link href="/#pricing">Lihat Paket</Link>
          <a href={whatsappLink}>WhatsApp</a>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{page.eyebrow}</p>
          <h1>{page.h1}</h1>
          <p className={styles.lead}>{page.lead}</p>

          <div className={styles.heroActions}>
            <a href={whatsappLink} className={styles.primaryCta}>
              {page.primaryCta}
            </a>
            <Link href="/#pricing" className={styles.secondaryCta}>
              Cek Paket Bulanan
            </Link>
          </div>
        </div>

        <aside className={styles.intentPanel} aria-label="Ringkasan kebutuhan outlet">
          <span>Untuk siapa</span>
          <p>{page.intent}</p>
          <div className={styles.intentTags}>
            {page.audience.slice(0, 4).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>Fitur utama</span>
          <h2>Yang dibantu Outletmu untuk operasional outlet</h2>
        </div>
        <div className={styles.featureGrid}>
          {page.highlights.map((item) => (
            <article key={item} className={styles.featureCard}>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.storyGrid}>
          {page.sections.map((section) => (
            <article key={section.title} className={styles.storyBlock}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.workflowSection}>
        <div className={styles.sectionHeader}>
          <span>Alur kerja</span>
          <h2>Dari menu sampai laporan penjualan</h2>
        </div>
        <ol className={styles.workflowList}>
          {page.workflow.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <div className={styles.ctaBand}>
          <div>
            <span>Outletmu</span>
            <h2>Diskusikan kebutuhan sistem kasir outlet kamu</h2>
            <p>
              Ceritakan jenis outlet, jumlah meja, kebutuhan QR order, menu digital, POS, stok,
              kitchen, dan laporan. Tim Outletmu akan bantu arahkan paket yang paling masuk akal.
            </p>
          </div>
          <a href={whatsappLink} className={styles.primaryCta}>
            Chat WhatsApp Outletmu
          </a>
        </div>
      </section>

      <section className={styles.relatedSection}>
        <div className={styles.sectionHeader}>
          <span>Halaman terkait</span>
          <h2>Topik Outletmu lainnya</h2>
        </div>
        <div className={styles.relatedLinks}>
          <Link href="/">Homepage Outletmu</Link>
          {page.related.map((key) => (
            <Link key={key} href={seoPages[key].path}>
              {seoPages[key].h1}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
