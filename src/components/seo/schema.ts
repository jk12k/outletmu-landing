import { type SeoPageContent, siteUrl } from "./seo-pages";

export type FaqItem = {
  question: string;
  answer: string;
};

export type OfferInput = {
  name: string;
  price: string;
  url: string;
};

export const organizationSchema = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Outletmu",
  url: siteUrl,
  logo: `${siteUrl}/branding/outletmu-full-light.png`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+6281291960227",
      availableLanguage: ["id"],
    },
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "Outletmu",
  url: siteUrl,
  inLanguage: "id-ID",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
};

export function softwareApplicationSchema(page: SeoPageContent) {
  return {
    "@type": "SoftwareApplication",
    "@id": `${siteUrl}/#software`,
    name: "Outletmu POS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: siteUrl,
    description: page.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: "249000",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/harga`,
    },
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
  };
}

export function productOfferSchema(input: {
  id: string;
  name: string;
  description: string;
  offers: OfferInput[];
}) {
  return {
    "@type": "Product",
    "@id": input.id,
    name: input.name,
    description: input.description,
    brand: {
      "@type": "Brand",
      name: "Outletmu",
    },
    offers: input.offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      priceCurrency: "IDR",
      price: offer.price,
      availability: "https://schema.org/InStock",
      url: offer.url,
    })),
  };
}

export function articleSchema(input: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
}) {
  const url = `${siteUrl}${input.path}`;

  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: input.headline,
    description: input.description,
    inLanguage: "id-ID",
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@id": `${siteUrl}/#organization`,
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function graphSchema(nodes: unknown[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
