import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kasirflow | Kasir & QR Order untuk Bisnis Harian",
  description:
    "Kasirflow membantu cafe, restoran, minimarket, dan UMKM punya website menu digital, QR order, POS, stok, laporan, dan WhatsApp automation dalam satu sistem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
