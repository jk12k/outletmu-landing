import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Outletmu | POS & Workflow Kasir Premium untuk Outlet",
  description:
    "Outletmu membantu cafe, restoran, minimarket, dan UMKM mengelola POS kasir, QR order, menu digital, stok, laporan, kitchen workflow, dan WhatsApp automation dalam satu sistem bulanan yang dikelola.",
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
