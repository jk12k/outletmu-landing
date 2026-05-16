import Link from "next/link";
import { JsonLd } from "./json-ld";
import { guidePublishedDate, type GuidePageContent } from "./guide-pages";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  graphSchema,
  organizationSchema,
  websiteSchema,
} from "./schema";
import { whatsappLink } from "./seo-pages";
import { GlobalNavbar } from "@/components/global-navbar";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import styles from "@/styles/seoLanding.module.scss";

type GuidePageProps = {
  page: GuidePageContent;
};

export function GuidePage({ page }: GuidePageProps) {
  return (
    <main className={styles.page}>
      <JsonLd
        data={graphSchema([
          organizationSchema,
          websiteSchema,
          articleSchema({
            path: page.path,
            headline: page.h1,
            description: page.description,
            datePublished: guidePublishedDate,
            dateModified: guidePublishedDate,
          }),
          faqPageSchema(page.faqs),
          breadcrumbSchema([
            { name: "Outletmu", path: "/" },
            { name: page.h1, path: page.path },
          ]),
        ])}
      />

      <GlobalNavbar />

      <ScrollReveal>
      <article>
        <header className={styles.hero}>
          <div className={styles.heroCopy} data-reveal>
            <p className={styles.eyebrow}>{page.eyebrow}</p>
            <h1>{page.h1}</h1>
            <p className={styles.lead}>{page.intro[0]}</p>

            <div className={styles.heroActions}>
              <a href={whatsappLink} className={styles.primaryCta}>
                {page.cta.label}
              </a>
              <Link href="/harga" className={styles.secondaryCta}>
                Cek Paket Outletmu
              </Link>
            </div>
          </div>

          <aside className={styles.intentPanel} aria-label="Ringkasan panduan" data-reveal>
            <span>Inti panduan</span>
            <p>{page.intent}</p>
            <div className={styles.intentTags}>
              {page.takeaways.slice(0, 3).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </aside>
        </header>

        <section className={styles.guideShell}>
          <div className={styles.guideBody}>
            <div className={styles.guideIntro} data-reveal>
              {page.intro.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {page.sections.map((section) => (
              <section key={section.title} className={styles.guideSection} data-reveal>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets?.length ? (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <section className={styles.guideChecklist} data-reveal>
              <h2>{page.checklist.title}</h2>
              <ul>
                {page.checklist.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className={styles.guideCta} data-reveal>
              <span>Outletmu</span>
              <h2>{page.cta.title}</h2>
              <p>{page.cta.body}</p>
              <a href={whatsappLink} className={styles.primaryCta}>
                {page.cta.label}
              </a>
            </section>

            <section className={styles.guideFaq}>
              <div className={styles.sectionHeader} data-reveal>
                <span>FAQ</span>
                <h2>Pertanyaan yang sering muncul</h2>
              </div>
              <div className={styles.guideFaqList}>
                {page.faqs.map((faq) => (
                  <article key={faq.question} data-reveal>
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className={styles.guideSidebar} aria-label="Link internal panduan" data-reveal>
            <span>Baca juga</span>
            <div className={styles.guideLinks}>
              {page.internalLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <strong>{link.label}</strong>
                  <small>{link.description}</small>
                </Link>
              ))}
            </div>
          </aside>
        </section>
      </article>
      </ScrollReveal>
    </main>
  );
}
