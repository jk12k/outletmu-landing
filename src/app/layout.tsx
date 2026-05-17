import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://outletmu.store"),
  title: {
    default: "Aplikasi Kasir Cafe & QR Order Meja | Outletmu",
    template: "%s",
  },
  description:
    "Outletmu membantu cafe, restoran, dan UMKM F&B memakai POS kasir, QR order meja, menu digital, stok, kitchen, laporan, dan WhatsApp report dengan setup dibantu.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aplikasi Kasir Cafe & QR Order Meja | Outletmu",
    description:
      "Outletmu membantu cafe, restoran, dan UMKM F&B memakai POS kasir, QR order meja, menu digital, stok, kitchen, laporan, dan WhatsApp report dengan setup dibantu.",
    url: "https://outletmu.store/",
    siteName: "Outletmu",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aplikasi Kasir Cafe & QR Order Meja | Outletmu",
    description:
      "Outletmu membantu cafe, restoran, dan UMKM F&B memakai POS kasir, QR order meja, menu digital, stok, kitchen, laporan, dan WhatsApp report dengan setup dibantu.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: "/branding/outletmu-favicon-light-32.png", sizes: "32x32", type: "image/png" },
      { url: "/branding/outletmu-favicon-light-192.png", sizes: "192x192", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: "/branding/outletmu-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <Script
          id="google-ads-tag"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18169772232"
          strategy="afterInteractive"
        />
        <Script id="google-ads-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18169772232');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
