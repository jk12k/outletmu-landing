import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Outletmu | POS, QR Order & E-Struk untuk Bisnis Harian",
  description:
    "Outletmu membantu cafe, restoran, minimarket, retail kecil, dan UMKM menerima order lewat QR, mencatat transaksi, membuat e-struk, memantau stok, dan melihat laporan bisnis dengan lebih rapi.",
  icons: {
    icon: "/favicon.ico",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var storedTheme = localStorage.getItem("outletmu-theme");
                var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                var theme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : (prefersDark ? "dark" : "light");
                document.documentElement.classList.toggle("dark", theme === "dark");
                document.documentElement.dataset.theme = theme;
              } catch (_) {}
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
