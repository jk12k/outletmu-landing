import Link from "next/link";
import { JsonLd } from "./json-ld";
import type { IndexPageContent } from "./index-pages";
import {
  breadcrumbSchema,
  graphSchema,
  organizationSchema,
  websiteSchema,
} from "./schema";
import { siteUrl } from "@/lib/site";
import { GlobalNavbar } from "@/components/global-navbar";
import { globalLeadFormLink } from "@/components/global-navbar/nav-config";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import styles from "@/styles/seoLanding.module.scss";

type IndexPageProps = {
  page: IndexPageContent;
};

function collectionPageSchema(page: IndexPageContent) {
  return {
    "@type": "CollectionPage",
    "@id": `${siteUrl}${page.path}#collection`,
    name: page.h1,
    description: page.description,
    url: `${siteUrl}${page.path}`,
    inLanguage: "id-ID",
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: page.cards.map((card, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: card.title,
        url: `${siteUrl}${card.href}`,
      })),
    },
  };
}

export function IndexPage({ page }: IndexPageProps) {
  return (
    <main className={styles.page}>
      <JsonLd
        data={graphSchema([
          organizationSchema,
          websiteSchema,
          collectionPageSchema(page),
          breadcrumbSchema([
            { name: "Outletmu", path: "/" },
            { name: page.h1, path: page.path },
          ]),
        ])}
      />

      <GlobalNavbar />

      <ScrollReveal>
        <section className={styles.hero}>
          <div className={styles.heroCopy} data-reveal>
            <p className={styles.eyebrow}>{page.eyebrow}</p>
            <h1>{page.h1}</h1>
            <p className={styles.lead}>{page.intro}</p>
            <div className={styles.heroActions}>
              <Link href={globalLeadFormLink} className={styles.primaryCta}>
                Coba Gratis
              </Link>
              <Link href="/harga" className={styles.secondaryCta}>
                Cek Paket Bulanan
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.relatedSection}>
          <div className={styles.relatedLinks}>
            {page.cards.map((card) => (
              <Link key={card.href} href={card.href} data-reveal>
                <strong>{card.title}</strong>
                <small>{card.description}</small>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
