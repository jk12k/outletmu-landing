"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  ClipboardList,
  CreditCard,
  Globe2,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  MessageCircle,
  Moon,
  Package,
  Printer,
  QrCode,
  ReceiptText,
  ScanLine,
  Search,
  ShoppingCart,
  Sparkles,
  Store,
  Sun,
  Table2,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import landingStyles from "@/styles/landing.module.scss";
import heroStyles from "@/styles/heroDeck.module.scss";
import pricingStyles from "@/styles/pricingDeck.module.scss";

const whatsappLink =
  "https://wa.me/6281291960227?text=Halo%20Outletmu%2C%20saya%20mau%20konsultasi%20paket%20POS%20untuk%20outlet%20saya";

const navItems = [
  { label: "Flow", href: "#flow" },
  { label: "Fitur", href: "#features" },
  { label: "Preview", href: "#preview" },
  { label: "WhatsApp", href: "#whatsapp" },
  { label: "Harga", href: "#pricing" },
];

type ThemeMode = "light" | "dark";
type BrandLogoVariant = "full" | "wordmark" | "icon";
type BrandLogoSize = "sm" | "md" | "lg";

const themeStorageKey = "outletmu-theme";

const brandLogoAssets: Record<
  BrandLogoVariant,
  Record<ThemeMode, { src: string; width: number; height: number; alt: string }>
> = {
  full: {
    light: {
      src: "/branding/outletmu-full-light.png",
      width: 2002,
      height: 451,
      alt: "Outletmu",
    },
    dark: {
      src: "/branding/outletmu-full-dark.png",
      width: 2002,
      height: 451,
      alt: "Outletmu",
    },
  },
  wordmark: {
    light: {
      src: "/branding/outletmu-wordmark-light.png",
      width: 2002,
      height: 451,
      alt: "Outletmu",
    },
    dark: {
      src: "/branding/outletmu-wordmark-dark.png",
      width: 2002,
      height: 451,
      alt: "Outletmu",
    },
  },
  icon: {
    light: {
      src: "/branding/outletmu-icon-light.png",
      width: 925,
      height: 925,
      alt: "Outletmu icon",
    },
    dark: {
      src: "/branding/outletmu-icon-dark.png",
      width: 925,
      height: 925,
      alt: "Outletmu icon",
    },
  },
};

const heroSlides = [
  {
    eyebrow: "OUTLETMU",
    title: "Complete Business Flow",
    copy: "Satu layar untuk memperlihatkan alur menu, order, kasir, stok, laporan, dan automation.",
    items: [
      "Website Menu",
      "QR Order",
      "POS Kasir",
      "Stok & Restock",
      "Laporan",
      "WhatsApp Automation",
    ],
    stats: [
      { label: "Order aktif", value: "7" },
      { label: "Omzet hari ini", value: "Rp1.250.000" },
    ],
  },
  {
    eyebrow: "ORDER FLOW",
    title: "Order & Kasir Flow",
    copy: "Pesanan meja masuk rapi, status jelas, dan kasir bisa lanjutkan transaksi tanpa catatan manual.",
    items: [
      "Pesanan Masuk",
      "Status Pesanan",
      "Meja Otomatis",
      "Dashboard Kasir",
      "Riwayat Transaksi",
    ],
    stats: [
      { label: "Meja aktif", value: "12" },
      { label: "Order baru", value: "5" },
    ],
  },
  {
    eyebrow: "OWNER VIEW",
    title: "Owner Monitoring",
    copy: "Owner tetap bisa membaca performa bisnis dari ringkasan penjualan, stok, dan insight WhatsApp.",
    items: [
      "Omzet Hari Ini",
      "Produk Terlaris",
      "Stok Menipis",
      "Ringkasan Penjualan",
      "WhatsApp Insight",
    ],
    stats: [
      { label: "Produk terlaris", value: "Kopi Susu" },
      { label: "Stok menipis", value: "3 item" },
    ],
  },
];

const productFlowBenefits = [
  "Order dari QR langsung membawa konteks meja dan item.",
  "Kasir melihat status pesanan tanpa menunggu catatan manual.",
  "Owner bisa memantau omzet dan stok dari ringkasan yang sama.",
];

const productFlowCards: Array<{
  label: string;
  value: string;
  icon: LucideIcon;
}> = [
  { label: "Meja A3", value: "Dine-in aktif", icon: Table2 },
  { label: "Pesanan baru masuk", value: "2 item menunggu", icon: ClipboardList },
  { label: "2 item diproses", value: "Kopi Susu + Croissant", icon: ShoppingCart },
  { label: "Omzet hari ini", value: "Rp1.250.000", icon: BarChart3 },
  { label: "Stok Fresh Milk", value: "Menipis: 2 tersisa", icon: Package },
];

const flowSteps: Array<{ title: string; icon: LucideIcon; copy: string }> = [
  {
    title: "Scan QR",
    icon: ScanLine,
    copy: "Pelanggan buka menu dari meja atau QR umum.",
  },
  {
    title: "Pilih menu",
    icon: ShoppingCart,
    copy: "Produk, catatan, dan jumlah masuk ke cart.",
  },
  {
    title: "Order masuk",
    icon: LayoutDashboard,
    copy: "Kasir melihat pesanan, meja, dan status.",
  },
  {
    title: "Kasir proses",
    icon: CreditCard,
    copy: "Pesanan diproses sampai pembayaran tercatat.",
  },
  {
    title: "Stok terpantau",
    icon: Package,
    copy: "Produk dan restock lebih mudah dikontrol.",
  },
  {
    title: "Laporan otomatis",
    icon: LineChart,
    copy: "Owner membaca omzet dan performa penjualan.",
  },
  {
    title: "Notifikasi WhatsApp",
    icon: MessageCircle,
    copy: "Info penting bisa diterima tanpa buka banyak aplikasi.",
  },
];

const features: Array<{
  title: string;
  copy: string;
  icon: LucideIcon;
  tone: "primary" | "light" | "dark";
}> = [
  {
    title: "Website Menu Digital",
    copy: "Menu online dengan kategori, foto, harga, deskripsi, dan status produk yang mudah diperbarui.",
    icon: Store,
    tone: "dark",
  },
  {
    title: "QR Order",
    copy: "Pelanggan scan QR, pilih menu dari HP, lalu pesanan diteruskan ke alur kasir.",
    icon: QrCode,
    tone: "primary",
  },
  {
    title: "QR Table",
    copy: "Nomor meja otomatis terbaca agar pesanan dine-in tidak tertukar.",
    icon: Table2,
    tone: "light",
  },
  {
    title: "POS Basic",
    copy: "Transaksi, order, dan riwayat penjualan dalam tampilan yang mudah dipakai kasir.",
    icon: WalletCards,
    tone: "light",
  },
  {
    title: "E-Struk Digital",
    copy: "Setiap transaksi memiliki struk digital yang bisa dibuka ulang dan dicetak dari browser.",
    icon: ReceiptText,
    tone: "primary",
  },
  {
    title: "Stok & Restock",
    copy: "Pantau stok, restock manual, dan siapkan stok otomatis saat bisnis naik level.",
    icon: Package,
    tone: "light",
  },
  {
    title: "Laporan Penjualan",
    copy: "Omzet, jumlah transaksi, dan produk terlaris bisa dibaca cepat oleh owner.",
    icon: BarChart3,
    tone: "light",
  },
  {
    title: "WhatsApp Automation",
    copy: "Owner dapat cek omzet, cek stok, dan menerima notifikasi lewat WhatsApp.",
    icon: MessageCircle,
    tone: "primary",
  },
];

const previews = [
  {
    title: "Customer Menu",
    eyebrow: "QR menu",
    metric: "38 item aktif",
    rows: ["Kopi Susu Gula Aren", "Croissant Butter", "Nasi Ayam Sambal"],
    copy: "Menu mobile-first yang terasa ringan untuk pelanggan.",
  },
  {
    title: "Dashboard Kasir",
    eyebrow: "Order masuk",
    metric: "7 order aktif",
    rows: ["Meja A3 - Baru", "Meja B1 - Diproses", "Takeaway - Siap"],
    copy: "Kasir fokus pada order, status, dan transaksi harian.",
  },
  {
    title: "Owner Report",
    eyebrow: "Laporan",
    metric: "Rp1.250.000 hari ini",
    rows: ["38 transaksi selesai", "Produk terlaris: Kopi Susu", "Omzet naik 12%"],
    copy: "Ringkasan bisnis untuk owner tanpa buka spreadsheet.",
  },
  {
    title: "Stok",
    eyebrow: "Inventori",
    metric: "5 stok menipis",
    rows: ["Susu UHT: 8 tersisa", "Cup 16oz: perlu restock", "Export laporan"],
    copy: "Stok dan restock dibuat lebih rapi dari dashboard.",
  },
  {
    title: "WhatsApp",
    eyebrow: "Automation",
    metric: "Balas dalam detik",
    rows: ["Omzet hari ini?", "Stok Kopi Susu?", "Produk terlaris?"],
    copy: "Owner bisa tanya data bisnis dari WhatsApp.",
  },
  {
    title: "E-Struk Digital",
    eyebrow: "Struk transaksi",
    metric: "TRX-20260427-0018",
    rows: ["Kopi Susu Gula Aren x2", "Croissant Butter x1", "Total Rp78.000"],
    copy: "Setiap transaksi punya struk digital yang bisa dibuka ulang dan dicetak dari browser.",
    kind: "receipt",
  },
];

const whatsappCommands = [
  {
    label: "Omzet hari ini",
    user: "Omzet hari ini",
    bot: [
      "Omzet hari ini Rp1.250.000 dari 38 transaksi.",
      "Produk terlaris: Kopi Susu Gula Aren.",
    ],
    time: "10:24",
  },
  {
    label: "Cek stok",
    user: "Stok Kopi Susu",
    bot: ["Stok Kopi Susu saat ini 12.", "Status: aman."],
    time: "10:26",
  },
  {
    label: "Stok menipis",
    user: "Produk yang stoknya menipis?",
    bot: [
      "Ada 3 produk dengan stok menipis:",
      "Espresso Beans: 4 | Fresh Milk: 2 | Gula Aren: 3",
    ],
    time: "10:27",
  },
  {
    label: "Produk terlaris",
    user: "Produk terlaris hari ini",
    bot: [
      "Produk terlaris hari ini: Kopi Susu Gula Aren.",
      "Terjual 22 porsi dengan omzet Rp440.000.",
    ],
    time: "10:28",
  },
  {
    label: "Laporan minggu ini",
    user: "Laporan minggu ini",
    bot: [
      "Penjualan minggu ini Rp8.420.000.",
      "Naik 12% dibanding minggu lalu.",
    ],
    time: "10:29",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "Rp299.000",
    suffix: "/bulan",
    setup: "Untuk outlet kecil yang butuh sistem ringan dan laporan sederhana.",
    label: "Awal digital",
    cta: "Konsultasi Paket Starter",
    audience:
      "Untuk outlet kecil yang butuh website menu ringan, QR order biasa, POS basic, laporan sederhana, dan stok/restock basic.",
    features: [
      "Website menu digital",
      "QR menu/order",
      "POS basic",
      "Input transaksi sederhana",
      "Laporan penjualan basic",
      "Stok/restock basic via dashboard",
    ],
  },
  {
    name: "POS Basic",
    price: "Rp699.000",
    suffix: "/bulan",
    setup: "Paket utama untuk cafe/resto aktif yang butuh POS, QR meja, dan landing page outlet.",
    label: "Paling Direkomendasikan",
    cta: "Konsultasi Paket POS Basic",
    audience:
      "Untuk cafe/resto yang butuh POS kasir, QR meja, order dashboard, product management, daily report, dan custom landing page outlet.",
    featured: true,
    features: [
      "Semua fitur Starter",
      "QR Table / QR per meja",
      "Table auto-detection",
      "POS kasir lebih rapi",
      "Dashboard order masuk",
      "Product/menu management",
      "Daily report",
      "Backup berkala",
      "Custom outlet/cafe landing page",
    ],
  },
  {
    name: "Pro Automation",
    price: "Rp1.299.000",
    suffix: "/bulan",
    setup: "Untuk outlet yang butuh automation operasional lebih lengkap.",
    label: "Automation lengkap",
    cta: "Konsultasi Paket Pro",
    audience: "Untuk outlet yang butuh automation lebih lengkap.",
    features: [
      "Semua fitur POS Basic",
      "POS lebih lengkap",
      "Auto stock",
      "Laporan harian/mingguan/bulanan",
      "Best-seller product",
      "Role staff",
      "WhatsApp revenue query",
      "Stock notification",
      "Priority support",
    ],
  },
  {
    name: "Business Custom",
    price: "Mulai Rp1.999.000",
    suffix: "/bulan",
    setup: "Untuk kebutuhan workflow custom dan multi-outlet ringan/menengah.",
    label: "Custom Workflow",
    cta: "Diskusikan Kebutuhan",
    audience: "Untuk kebutuhan workflow custom dan multi-outlet ringan/menengah.",
    features: [
      "Semua fitur Pro",
      "Multi-outlet",
      "Advanced QR Table",
      "Kitchen display",
      "Custom reports",
      "Custom domain",
      "Workflow disesuaikan",
      "Support prioritas",
    ],
  },
  {
    name: "Enterprise",
    price: "Konsultasi",
    suffix: "",
    setup: "Untuk dedicated/managed server, SLA, integrasi khusus, dan advanced multi-outlet.",
    label: "Managed enterprise",
    cta: "Chat WhatsApp Outletmu",
    audience: "Untuk dedicated/managed server, SLA, integrasi khusus, dan advanced multi-outlet.",
    features: [
      "Dedicated/managed server",
      "Advanced multi-outlet",
      "Integrasi khusus",
      "SLA",
      "Onboarding serius",
      "Support prioritas/custom",
    ],
  },
];

const addOnGroups: Array<{
  title: string;
  description?: string;
  note?: string;
  icon: LucideIcon;
  items: Array<{ name: string; value: string }>;
}> = [
  {
    title: "Domain & QR",
    icon: Globe2,
    description:
      "Alamat menu dan QR yang siap dipakai pelanggan, dengan opsi domain brand sendiri.",
    items: [
      { name: "Default Outletmu link", value: "Rp10.000/bulan" },
      { name: "Domain .com", value: "+Rp209.900/tahun" },
      { name: "Domain .id", value: "+Rp252.900/tahun" },
      { name: "Desain QR", value: "Rp25.000" },
    ],
  },
  {
    title: "Training & Setup",
    icon: GraduationCap,
    description: "Pendampingan awal agar tim outlet bisa langsung memakai sistem dengan rapi.",
    items: [
      { name: "Training onsite awal", value: "Free 1x" },
      { name: "Training online tambahan", value: "Rp50.000/sesi" },
      { name: "Training onsite tambahan", value: "Rp100.000/sesi" },
    ],
  },
  {
    title: "Bantuan Tambahan",
    icon: QrCode,
    description: "Bantuan operasional ringan untuk mempercepat outlet mulai berjalan.",
    items: [
      { name: "Input menu awal", value: "Free" },
      { name: "Input menu tambahan", value: "Free" },
      { name: "WhatsApp chatbot custom", value: "Sesuai kebutuhan" },
    ],
  },
];

const addOnNotes = [
  "Harga domain berlaku per tahun dan dapat berubah mengikuti provider domain.",
  "Default Outletmu link tersedia dengan biaya Rp10.000/bulan.",
  "Training onsite awal: Free 1x.",
  "Desain QR diberikan dalam format siap cetak.",
  "Add-ons bersifat opsional. Tim Outletmu akan bantu pilih yang benar-benar dibutuhkan outlet.",
];

const whyPoints = [
  "Setup dibantu dari awal",
  "Workflow disesuaikan",
  "Operasional lebih terpusat",
  "Bisa berkembang ke multi-outlet",
  "Ada opsi penyesuaian sistem",
  "Support prioritas untuk bisnis besar",
];

const faqs = [
  {
    question: "Apakah Outletmu cocok untuk bisnis kecil?",
    answer:
      "Ya. Outletmu dibuat untuk cafe, kedai, restoran kecil, minimarket, dan UMKM yang ingin mulai memakai sistem digital tanpa sistem enterprise yang rumit.",
  },
  {
    question: "Apakah harus install aplikasi?",
    answer:
      "Untuk MVP, sistem berjalan berbasis web sehingga bisa diakses dari browser di HP, tablet, atau laptop.",
  },
  {
    question: "Apakah bisa pakai QR per meja?",
    answer: "Bisa, fitur QR Table/per meja tersedia mulai dari paket POS Basic.",
  },
  {
    question: "Apakah sudah termasuk hosting?",
    answer: "Ya, semua paket sudah termasuk hosting, maintenance, dan bantuan setup awal.",
  },
  {
    question: "Apakah bisa custom fitur?",
    answer:
      "Bisa. Kebutuhan custom cocok dibahas lewat paket Business Custom, terutama untuk workflow khusus, multi-outlet, atau integrasi tambahan.",
  },
  {
    question: "Apakah bisa integrasi QRIS?",
    answer:
      "Bisa dibahas saat konsultasi. Untuk tahap awal, QRIS manual dapat digunakan dulu agar sistem inti cepat berjalan.",
  },
  {
    question: "Apakah bisa cetak struk?",
    answer:
      "Integrasi printer struk tersedia untuk kebutuhan custom dan akan disesuaikan dengan perangkat yang dipakai bisnis.",
  },
];

type PricingPlan = (typeof pricingPlans)[number];

function applyThemeMode(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.theme = theme;
}

function useThemeMode() {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(themeStorageKey);
    const preferredTheme: ThemeMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initialTheme: ThemeMode =
      storedTheme === "dark" || storedTheme === "light" ? storedTheme : preferredTheme;

    setTheme(initialTheme);
    applyThemeMode(initialTheme);
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme: ThemeMode = currentTheme === "dark" ? "light" : "dark";

      window.localStorage.setItem(themeStorageKey, nextTheme);
      applyThemeMode(nextTheme);

      return nextTheme;
    });
  };

  return { theme, toggleTheme };
}

function useLandingGsap(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const reveal = (distance: number) => {
        const revealItems = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-reveal]"));

        revealItems.forEach((item) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: distance },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.62,
              ease: "power3.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
                once: true,
              },
            },
          );
        });
      };

      mm.add("(max-width: 767px)", () => {
        reveal(18);
      });

      mm.add("(min-width: 768px)", () => {
        reveal(34);

        gsap.to("[data-float='hero-main']", {
          y: -13,
          rotate: 0.45,
          duration: 3.7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to("[data-float='hero-back-left']", {
          y: 12,
          rotate: -8,
          duration: 4.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to("[data-float='hero-back-right']", {
          y: -10,
          rotate: 8,
          duration: 4.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to("[data-float='ambient']", {
          xPercent: 8,
          yPercent: -6,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2,
        });

        gsap.to("[data-float-card]", {
          y: -10,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.18,
        });

        gsap.to("[data-parallax='preview']", {
          yPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-preview-section]",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      });
    }, rootRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [rootRef]);
}

function Badge({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm",
        tone === "light"
          ? "border border-[#2F8A68]/14 bg-white/86 text-[#2F8A68] dark:border-white/10 dark:bg-white/8 dark:text-[#B9F1DA]"
          : "border border-white/14 bg-white/10 text-white",
      )}
    >
      <Sparkles className="h-4 w-4" aria-hidden="true" />
      {children}
    </span>
  );
}

function SectionTitle({
  badge,
  title,
  subtitle,
  align = "center",
  tone = "light",
}: {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <div
      data-reveal
      className={cn(
        "relative z-10 mx-auto max-w-4xl",
        align === "center" ? "text-center" : "text-center lg:text-left",
      )}
    >
      <Badge tone={tone}>{badge}</Badge>
      <h2
        className={cn(
          "mt-5 text-[clamp(2.2rem,6vw,4.9rem)] font-extrabold leading-[1.04]",
          tone === "dark" ? "text-white" : "text-[#14213D] dark:text-[#F8F3EA]",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mx-auto mt-5 max-w-2xl text-base leading-8 md:text-lg",
            align === "left" && "lg:mx-0",
            tone === "dark" ? "text-white/68" : "text-[#14213D]/65 dark:text-[#F8F3EA]/68",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function PageSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn(landingStyles.section, className)}>
      <div className={landingStyles.container}>{children}</div>
    </section>
  );
}

function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-semibold transition duration-200 focus:outline-none focus:ring-4 focus:ring-[#2F8A68]/25",
        variant === "primary" &&
          "bg-[#2F8A68] text-white shadow-[0_22px_55px_rgba(47,138,104,0.28)] hover:-translate-y-0.5 hover:bg-[#28795b]",
        variant === "secondary" &&
          "border border-[#14213D]/10 bg-white text-[#14213D] shadow-sm hover:-translate-y-0.5 hover:border-[#2F8A68]/30 dark:border-white/14 dark:bg-white/8 dark:text-[#F8F3EA] dark:hover:border-[#2F8A68]/60",
        variant === "light" && "bg-white text-[#103F31] shadow-[0_22px_55px_rgba(16,63,49,0.2)] hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </a>
  );
}

function BrandLogo({
  variant,
  theme,
  size,
}: {
  variant: BrandLogoVariant;
  theme: ThemeMode;
  size: BrandLogoSize;
}) {
  const logo = brandLogoAssets[variant][theme];
  const sizeClass = {
    sm: landingStyles.brandLogoSm,
    md: landingStyles.brandLogoMd,
    lg: landingStyles.brandLogoLg,
  }[size];
  const variantClass = {
    full: landingStyles.brandLogoFull,
    wordmark: landingStyles.brandLogoWordmark,
    icon: landingStyles.brandLogoIcon,
  }[variant];

  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      className={cn(landingStyles.brandLogo, sizeClass, variantClass)}
      priority={variant !== "icon"}
      sizes={
        size === "lg"
          ? "(max-width: 768px) 220px, 280px"
          : size === "md"
            ? "(max-width: 768px) 156px, 184px"
            : "128px"
      }
    />
  );
}

function Navbar({ theme, onToggleTheme }: { theme: ThemeMode; onToggleTheme: () => void }) {
  return (
    <header className={landingStyles.navbar}>
      <div className={cn(landingStyles.container, "flex items-center justify-between gap-4 py-4")}>
        <a href="#" className="flex min-w-0 items-center" aria-label="Outletmu">
          <BrandLogo variant="full" theme={theme} size="md" />
        </a>
        <nav className="hidden items-center gap-7 rounded-full border border-[#14213D]/5 bg-white/68 px-6 py-3 shadow-sm dark:border-white/10 dark:bg-white/8 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-semibold text-[#14213D]/68 transition hover:text-[#2F8A68] dark:text-[#F8F3EA]/70 dark:hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Aktifkan ${theme === "dark" ? "light" : "dark"} mode`}
            className={landingStyles.themeToggle}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <ButtonLink href={whatsappLink} className="hidden lg:inline-flex">
            Konsultasi via WhatsApp
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
        <a
          href={whatsappLink}
          aria-label="Konsultasi via WhatsApp"
          className={cn(landingStyles.mobileNavCta, "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#2F8A68] text-white shadow-lg lg:hidden")}
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}

function HeroCardDeck() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const slide = heroSlides[activeSlide];
  const previousSlide = heroSlides[(activeSlide - 1 + heroSlides.length) % heroSlides.length];
  const nextSlide = heroSlides[(activeSlide + 1) % heroSlides.length];

  const goToSlide = (index: number) => {
    setActiveSlide((index + heroSlides.length) % heroSlides.length);
  };

  const moveSlide = (direction: 1 | -1) => {
    setActiveSlide((current) => (current + direction + heroSlides.length) % heroSlides.length);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);

    if (info.offset.x < -64 || info.velocity.x < -420) {
      moveSlide(1);
    }

    if (info.offset.x > 64 || info.velocity.x > 420) {
      moveSlide(-1);
    }
  };

  const card = (mobile = false) => (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.16}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.992 }}
      className={cn(heroStyles.mainCard, mobile && heroStyles.mobileMainCard, isDragging && heroStyles.dragging)}
      aria-roledescription="carousel"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.title}
          initial={{ opacity: 0, x: mobile ? 24 : 42 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: mobile ? -22 : -38 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className={heroStyles.innerPanel}>
            <div className="flex items-start justify-between gap-5">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/52">{slide.eyebrow}</p>
                <h3 className="mt-3 text-[clamp(1.95rem,5vw,3rem)] font-semibold leading-tight text-white">
                  {slide.title}
                </h3>
                <span className={heroStyles.slideCopy}>{slide.copy}</span>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-[#103F31]">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className={heroStyles.featureStack}>
              {slide.items.map((feature) => (
                <div key={feature} className={heroStyles.featureRow}>
                  <span className="flex min-w-0 items-center gap-3 text-sm font-semibold text-white">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-[#103F31]">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="truncate">{feature}</span>
                  </span>
                  <span className="shrink-0 text-xs font-semibold text-white/48">Ready</span>
                </div>
              ))}
            </div>
          </div>
          <div className={heroStyles.stats}>
            {slide.stats.map((stat) => (
              <div key={stat.label}>
                <p>{stat.label}</p>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );

  const controls = (mobile = false) => (
    <div className={cn(heroStyles.controls, mobile && heroStyles.mobileControls)} aria-label="Navigasi preview Outletmu">
        <button type="button" aria-label="Slide sebelumnya" onClick={() => moveSlide(-1)}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        {heroSlides.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Lihat ${item.title}`}
            aria-current={activeSlide === index}
            onClick={() => goToSlide(index)}
            className={cn(heroStyles.dot, activeSlide === index && heroStyles.dotActive)}
          />
        ))}
        <button type="button" aria-label="Slide berikutnya" onClick={() => moveSlide(1)}>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
  );

  return (
    <div data-reveal className={heroStyles.deckWrap}>
      <div className={heroStyles.desktopDeckVisual}>
        <div className={heroStyles.flowText}>FLOW</div>
        <div className={heroStyles.glow} data-float="ambient" />
        <div className={cn(heroStyles.backCard, heroStyles.backLeft)} data-float="hero-back-left">
          <span>{previousSlide.eyebrow}</span>
          <strong>{previousSlide.title}</strong>
        </div>
        <div className={cn(heroStyles.backCard, heroStyles.backRight)} data-float="hero-back-right">
          <span>{nextSlide.eyebrow}</span>
          <strong>{nextSlide.title}</strong>
        </div>
        <div className={heroStyles.mainFloatLayer} data-float="hero-main">
          {card()}
        </div>
        {controls()}
      </div>
      <div className={heroStyles.mobileDeckVisual}>
        {card(true)}
        {controls(true)}
      </div>
    </div>
  );
}

function HeroSection({ theme }: { theme: ThemeMode }) {
  return (
    <section className={cn(landingStyles.section, landingStyles.heroSection)}>
      <div className={landingStyles.ambientOne} data-float="ambient" />
      <div className={landingStyles.ambientTwo} data-float="ambient" />
      <div className={cn(landingStyles.container, landingStyles.heroLayout, "grid min-w-0 items-center gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]")}>
        <div data-reveal className={cn(landingStyles.heroCopy, "mx-auto min-w-0 max-w-3xl text-center xl:mx-0 xl:text-left")}>
          <div className={landingStyles.heroLogoWrap}>
            <BrandLogo variant="full" theme={theme} size="lg" />
          </div>
          <Badge>Gratis setup untuk 100 outlet pertama</Badge>
          <h1 className={cn(landingStyles.heroTitle, "mt-6 text-[clamp(2.25rem,9.6vw,4.95rem)] font-extrabold leading-[1.04] text-[#14213D] dark:text-[#F8F3EA]")}>
            POS & workflow kasir premium untuk outlet yang mau terlihat lebih profesional
          </h1>
          <p className={cn(landingStyles.heroSubtitle, "mx-auto mt-6 max-w-2xl text-base font-medium leading-8 text-[#14213D]/68 dark:text-[#F8F3EA]/70 md:text-xl xl:mx-0")}>
            Outletmu membantu cafe, restoran, minimarket, dan UMKM mengelola POS
            kasir, QR order, menu digital, stok, laporan, kitchen workflow, dan
            WhatsApp automation dalam satu sistem bulanan yang dikelola.
          </p>
          <div className={cn(landingStyles.heroActions, "mx-auto mt-9 grid max-w-md gap-3 sm:flex sm:max-w-none sm:justify-center xl:justify-start")}>
            <ButtonLink href={whatsappLink}>
              Konsultasi via WhatsApp
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#pricing" variant="secondary">
              Lihat Paket
            </ButtonLink>
          </div>
          <p className={cn(landingStyles.heroFootnote, "mx-auto mt-7 max-w-xl text-sm font-medium leading-7 text-[#14213D]/58 dark:text-[#F8F3EA]/58 xl:mx-0")}>
            Cocok untuk cafe, restoran kecil, kedai, bakery, minimarket, dan UMKM.
          </p>
        </div>
        <HeroCardDeck />
      </div>
    </section>
  );
}

function ProductFlowShowcaseSection() {
  return (
    <PageSection className="bg-white dark:bg-[#08111F]">
      <div data-reveal className={landingStyles.productFlowGrid}>
        <div className={landingStyles.flowNarrative}>
          <Badge>Product flow showcase</Badge>
          <h2>Dari scan QR sampai transaksi, semuanya lebih rapi.</h2>
          <p>
            Pelanggan scan QR, pilih menu, pesanan masuk ke kasir, dan owner bisa
            memantau bisnis tanpa membuka banyak aplikasi.
          </p>
          <div className={landingStyles.flowBenefits}>
            {productFlowBenefits.map((benefit) => (
              <motion.div key={benefit} whileHover={{ x: 4 }}>
                <span>
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                {benefit}
              </motion.div>
            ))}
          </div>
          <div className={landingStyles.flowNarrativeFooter}>
            <strong>01</strong>
            <span>QR order, dashboard kasir, stok, dan laporan bergerak dalam satu alur.</span>
          </div>
        </div>

        <div className={landingStyles.productFlowShowcase}>
          <div className={landingStyles.showcaseWord}>ORDER</div>
          <motion.div
            className={landingStyles.flowDevice}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          >
            <div className={landingStyles.flowDeviceHeader}>
              <div>
                <p>Dashboard Kasir</p>
                <h3>Order masuk</h3>
              </div>
              <span>Live</span>
            </div>
            <div className={landingStyles.flowDeviceBody}>
              <div className={landingStyles.orderSummary}>
                <span>Meja A3</span>
                <strong>Rp78.000</strong>
                <small>2 item sedang diproses</small>
              </div>
              <div className={landingStyles.orderRows}>
                {["Kopi Susu Gula Aren", "Croissant Butter", "Catatan: less ice"].map((row, index) => (
                  <div key={row}>
                    <span>{index + 1}</span>
                    <strong>{row}</strong>
                    <em>{index === 2 ? "Note" : "Ready"}</em>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className={landingStyles.floatingCards}>
            {productFlowCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.label}
                  data-float-card
                  className={cn(landingStyles.floatingCard, landingStyles[`floatingCard${index + 1}`])}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <span>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <strong>{card.label}</strong>
                    <p>{card.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function FlowSection() {
  return (
    <PageSection id="flow" className="bg-[#F8F3EA] dark:bg-[#07140F]">
      <SectionTitle
        badge="Solution flow"
        title="Dari scan QR sampai laporan, semuanya mengalir dalam satu sistem."
        subtitle="Alur dibuat sederhana untuk pelanggan, kasir, dan owner. Bukan sistem rumit yang memaksa bisnis berubah total."
      />
      <div data-reveal className={cn(landingStyles.builderShell, "relative")}>
        <div className={landingStyles.backgroundWord}>FLOW</div>
        <div className={landingStyles.flowScroller}>
          {flowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                whileHover={{ y: -8 }}
                className={cn(landingStyles.flowCard, index === 3 && landingStyles.flowCardActive)}
              >
                <span>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p>0{index + 1}</p>
                <h3>{step.title}</h3>
                <small>{step.copy}</small>
              </motion.article>
            );
          })}
        </div>
      </div>
    </PageSection>
  );
}

function FeatureShowcase() {
  return (
    <PageSection id="features" className={landingStyles.darkSection}>
      <SectionTitle
        badge="Feature showcase"
        title="Fitur utama untuk operasional harian."
        subtitle="Tampilan dibuat benefit-first: owner paham manfaatnya, kasir paham alurnya, pelanggan paham cara order."
        tone="dark"
      />
      <div data-reveal className={landingStyles.featureGrid}>
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.article
              key={feature.title}
              whileHover={{ y: -8, scale: 1.01 }}
              className={cn(
                landingStyles.featureCard,
                index < 3 && landingStyles.featureCardLarge,
                feature.tone === "dark" && landingStyles.featureCardDark,
                feature.tone === "primary" && landingStyles.featureCardPrimary,
              )}
            >
              <div className={landingStyles.featureNumber}>0{index + 1}</div>
              <span className={landingStyles.featureIcon}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </motion.article>
          );
        })}
      </div>
    </PageSection>
  );
}

function ProductPreviewSection() {
  const [activePreview, setActivePreview] = useState(0);
  const preview = previews[activePreview];

  return (
    <PageSection id="preview" className="bg-[#F8F3EA] dark:bg-[#07140F]">
      <div data-preview-section>
        <SectionTitle
          badge="Product preview"
          title="Dibuat simpel untuk kasir, owner, dan pelanggan."
          subtitle="Preview tampilan agar calon pembeli bisa membayangkan alur POS, QR order, stok, dan laporan sebelum konsultasi."
        />
        <div data-reveal data-parallax="preview" className={landingStyles.previewShell}>
          <div className={landingStyles.previewTabs}>
            {previews.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActivePreview(index)}
                className={cn(activePreview === index && landingStyles.previewTabActive)}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className={landingStyles.previewGrid}>
            <AnimatePresence mode="wait">
              <motion.div
                key={preview.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.24 }}
                className={landingStyles.previewFocus}
              >
                <p>{preview.eyebrow}</p>
                <h3>{preview.title}</h3>
                <span>{preview.copy}</span>
                <div>
                  <small>Highlight</small>
                  <strong>{preview.metric}</strong>
                </div>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${preview.title}-mockup`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.24 }}
                className={landingStyles.previewMockup}
              >
                {preview.kind === "receipt" ? (
                    <div className={landingStyles.receiptMockup}>
                      <div className={landingStyles.receiptToolbar}>
                      <BrandLogo variant="wordmark" theme="dark" size="sm" />
                      <small>Siap cetak browser</small>
                    </div>
                    <div className={landingStyles.receiptPaper}>
                      <div className={landingStyles.receiptHeader}>
                        <span>Nomor transaksi</span>
                        <strong>TRX-20260427-0018</strong>
                      </div>
                      <div className={landingStyles.receiptStore}>
                        <strong>Kedai Kopi Senja</strong>
                        <span>Tanggal transaksi: 27 Apr 2026, 10:24</span>
                      </div>
                      <div className={landingStyles.receiptItems}>
                        {[
                          ["Kopi Susu Gula Aren", "2 x Rp22.000", "Rp44.000"],
                          ["Croissant Butter", "1 x Rp24.000", "Rp24.000"],
                          ["Es Teh Manis", "1 x Rp10.000", "Rp10.000"],
                        ].map(([name, qty, total]) => (
                          <div key={name}>
                            <span>
                              <strong>{name}</strong>
                              <small>{qty}</small>
                            </span>
                            <em>{total}</em>
                          </div>
                        ))}
                      </div>
                      <div className={landingStyles.receiptTotal}>
                        <span>Total pembayaran</span>
                        <strong>Rp78.000</strong>
                      </div>
                      <button type="button" className={landingStyles.receiptPrintButton}>
                        <Printer className="h-4 w-4" aria-hidden="true" />
                        Cetak Struk
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={landingStyles.mockupHeader}>
                      <div>
                        <p>Outletmu</p>
                        <h4>{preview.title}</h4>
                      </div>
                      <div>
                        <Search className="h-4 w-4" aria-hidden="true" />
                        <span>Cari data</span>
                      </div>
                    </div>
                    <div className={landingStyles.mockupRows}>
                      {preview.rows.map((row, index) => (
                        <div key={row}>
                          <span>{index + 1}</span>
                          <strong>{row}</strong>
                          <em>Aktif</em>
                        </div>
                      ))}
                    </div>
                    <div className={landingStyles.mockupCta}>
                      <strong>Flow siap diproses</strong>
                      <span>
                        Lihat detail <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageSection>
  );
}

type ChatMessage = {
  id: string;
  role: "user" | "bot";
  lines: string[];
  time: string;
};

function WhatsAppBotSection() {
  const [activeCommand, setActiveCommand] = useState(0);
  const [typing, setTyping] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "initial-user",
      role: "user",
      lines: [whatsappCommands[0].user],
      time: whatsappCommands[0].time,
    },
    {
      id: "initial-bot",
      role: "bot",
      lines: whatsappCommands[0].bot,
      time: whatsappCommands[0].time,
    },
  ]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const runCommand = (index: number) => {
    const command = whatsappCommands[index];

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setActiveCommand(index);
    setTyping(true);
    setMessages([
      {
        id: `user-${index}-${Date.now()}`,
        role: "user",
        lines: [command.user],
        time: "baru saja",
      },
    ]);

    timeoutRef.current = window.setTimeout(() => {
      setTyping(false);
      setMessages((current) => [
        ...current,
        {
          id: `bot-${index}-${Date.now()}`,
          role: "bot",
          lines: command.bot,
          time: command.time,
        },
      ]);
    }, 620);
  };

  return (
    <PageSection id="whatsapp" className="bg-white dark:bg-[#08111F]">
      <div data-reveal className={landingStyles.whatsappGrid}>
        <div className={landingStyles.whatsappCopy}>
          <Badge>WhatsApp automation</Badge>
          <h2>Tanya omzet dan stok langsung dari WhatsApp.</h2>
          <p>
            Outletmu membantu owner memantau bisnis lewat percakapan yang sederhana.
            Pilih command cepat di bawah untuk melihat simulasi balasan bot.
          </p>
        </div>

        <div className={landingStyles.chatFrame}>
          <div className={landingStyles.chatHeader}>
            <div className={landingStyles.botAvatar}>
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <strong>Outletmu Bot</strong>
              <span>online · automation aktif</span>
            </div>
          </div>
          <div className={landingStyles.chatBody}>
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.22 }}
                  className={cn(
                    landingStyles.chatRow,
                    message.role === "user" && landingStyles.chatRowUser,
                  )}
                >
                  {message.role === "bot" ? (
                    <span className={landingStyles.chatAvatar}>O</span>
                  ) : null}
                  <div
                    className={cn(
                      landingStyles.chatBubble,
                      message.role === "user" ? landingStyles.userBubble : landingStyles.botBubble,
                    )}
                  >
                    {message.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                    <time>{message.time}</time>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <AnimatePresence>
              {typing ? (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className={landingStyles.typingRow}
                >
                  <span className={landingStyles.chatAvatar}>O</span>
                  <div className={landingStyles.typingBubble} aria-label="Outletmu Bot sedang mengetik">
                    <i />
                    <i />
                    <i />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <div className={landingStyles.chatInput}>
            <span>{whatsappCommands[activeCommand].user}</span>
            <button type="button" onClick={() => runCommand(activeCommand)} aria-label="Kirim command simulasi">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className={landingStyles.quickCommandsPanel}>
          <div className={landingStyles.quickCommands}>
            {whatsappCommands.map((command, index) => (
              <button
                key={command.label}
                type="button"
                onClick={() => runCommand(index)}
                className={cn(activeCommand === index && landingStyles.quickCommandActive)}
              >
                {command.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function PricingPlanCard({
  plan,
  active = false,
  compact = false,
  allowExpand = false,
}: {
  plan: PricingPlan;
  active?: boolean;
  compact?: boolean;
  allowExpand?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const isDark = active && plan.featured;
  const shouldCompact = compact && !expanded;
  const compactFeatureLimit = allowExpand ? 5 : 6;
  const shownFeatures = shouldCompact ? plan.features.slice(0, compactFeatureLimit) : plan.features;
  const hiddenFeatureCount = shouldCompact ? plan.features.length - shownFeatures.length : 0;

  return (
    <article className={cn(pricingStyles.planCard, isDark && pricingStyles.planCardFeatured)}>
      <div className={pricingStyles.cardGlow} />
      <div className={pricingStyles.planHeader}>
        <span>{plan.label}</span>
        <h3>{plan.name}</h3>
        <p>{plan.audience}</p>
      </div>
      <div className={pricingStyles.priceBox}>
        <div>
          <strong className={cn(plan.price.length > 13 && pricingStyles.priceLong)}>{plan.price}</strong>
          {plan.suffix ? <small>{plan.suffix}</small> : null}
        </div>
        <p>{plan.setup}</p>
      </div>
      <ul className={pricingStyles.featureList}>
        {shownFeatures.map((feature) => (
          <li key={feature}>
            <span>
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            {feature}
          </li>
        ))}
        {hiddenFeatureCount > 0 && !allowExpand && (
          <li className={pricingStyles.moreFeature}>
            <span>+</span>
            {hiddenFeatureCount} fitur lain tersedia di paket ini
          </li>
        )}
      </ul>
      {hiddenFeatureCount > 0 && allowExpand ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className={pricingStyles.expandFeatures}
          aria-label={`Lihat semua fitur ${plan.name}`}
        >
          Lihat semua fitur
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : null}
      <ButtonLink href={whatsappLink} variant={isDark ? "light" : "primary"} className={pricingStyles.planCta}>
        {plan.cta}
      </ButtonLink>
    </article>
  );
}

function getCircularOffset(index: number, activeIndex: number) {
  let diff = index - activeIndex;

  if (diff > pricingPlans.length / 2) {
    diff -= pricingPlans.length;
  }

  if (diff < -pricingPlans.length / 2) {
    diff += pricingPlans.length;
  }

  return diff;
}

function PricingDeckSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [isPricingDragging, setIsPricingDragging] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const mobileDeckRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pricingDragRef = useRef({ startX: 0, hasMoved: false });
  const suppressPricingClickRef = useRef(false);
  const mobilePlans = [pricingPlans[1], pricingPlans[0], pricingPlans[2], pricingPlans[3], pricingPlans[4]];

  useEffect(() => {
    const layoutCards = () => {
      if (!deckRef.current || window.innerWidth < 1024) {
        return;
      }

      const spread = Math.min(Math.max(window.innerWidth * 0.18, 210), 300);

      cardRefs.current.forEach((card, index) => {
        if (!card) {
          return;
        }

        const offset = getCircularOffset(index, activeIndex);
        const distance = Math.abs(offset);
        const side = offset === 0 ? 0 : offset > 0 ? 1 : -1;
        const isBack = distance > 1;

        gsap.to(card, {
          xPercent: -50,
          x: isBack ? 0 : side * spread,
          y: offset === 0 ? 0 : isBack ? 52 : 28,
          rotate: offset === 0 || isBack ? 0 : side * -3,
          scale: offset === 0 ? 1 : isBack ? 0.78 : 0.9,
          autoAlpha: offset === 0 ? 1 : isBack ? 0.18 : 0.66,
          zIndex: offset === 0 ? 30 : isBack ? 4 : 16,
          duration: 0.58,
          ease: "power3.out",
        });
      });
    };

    layoutCards();
    window.addEventListener("resize", layoutCards);

    return () => window.removeEventListener("resize", layoutCards);
  }, [activeIndex]);

  const go = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + pricingPlans.length) % pricingPlans.length);
  };

  const handlePricingMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a, button")) {
      return;
    }

    pricingDragRef.current = { startX: event.clientX, hasMoved: false };
    setIsPricingDragging(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - pricingDragRef.current.startX;

      if (Math.abs(delta) > 8) {
        pricingDragRef.current.hasMoved = true;
        suppressPricingClickRef.current = true;
      }
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      const delta = upEvent.clientX - pricingDragRef.current.startX;

      if (Math.abs(delta) > 54) {
        suppressPricingClickRef.current = true;
        go(delta < 0 ? 1 : -1);
      }

      setIsPricingDragging(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.setTimeout(() => {
        pricingDragRef.current.hasMoved = false;
        suppressPricingClickRef.current = false;
      }, 220);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const syncMobileDot = () => {
    const deck = mobileDeckRef.current;

    if (!deck) {
      return;
    }

    const center = deck.scrollLeft + deck.clientWidth / 2;
    const cards = Array.from(deck.children) as HTMLElement[];
    const closestIndex = cards.reduce(
      (closest, card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(center - cardCenter);

        return distance < closest.distance ? { index, distance } : closest;
      },
      { index: mobileActiveIndex, distance: Number.POSITIVE_INFINITY },
    ).index;

    if (closestIndex !== mobileActiveIndex) {
      setMobileActiveIndex(closestIndex);
    }
  };

  const scrollMobileTo = (index: number) => {
    setMobileActiveIndex(index);
    mobileCardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const goMobile = (direction: 1 | -1) => {
    const nextIndex = (mobileActiveIndex + direction + mobilePlans.length) % mobilePlans.length;
    scrollMobileTo(nextIndex);
  };

  return (
    <PageSection id="pricing" className="bg-white dark:bg-[#08111F]">
      <div className={pricingStyles.backgroundWord}>PAKET</div>
      <SectionTitle
        badge="Harga bulanan"
        title="Pilih paket sesuai kebutuhan bisnismu."
        subtitle="Paket bulanan untuk outlet yang ingin POS, QR order, stok, laporan, dan operasional harian lebih rapi."
      />
      <div data-reveal className={pricingStyles.microPills}>
        {["Gratis setup untuk 100 outlet pertama", "QR order siap pakai", "Pendampingan awal"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div data-reveal className={pricingStyles.desktopDeck} ref={deckRef}>
        <button type="button" onClick={() => go(-1)} aria-label="Paket sebelumnya" className={pricingStyles.arrowPrev}>
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Paket berikutnya" className={pricingStyles.arrowNext}>
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>

        <motion.div
          className={cn(pricingStyles.cardStage, isPricingDragging && pricingStyles.isDragging)}
          onMouseDown={handlePricingMouseDown}
        >
          {pricingPlans.map((plan, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={plan.name}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (!suppressPricingClickRef.current) {
                    setActiveIndex(index);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setActiveIndex(index);
                  }
                }}
                className={pricingStyles.deckCard}
                aria-label={`Pilih paket ${plan.name}`}
              >
                <motion.div whileHover={{ y: isActive ? -4 : -2 }} className="h-full">
                  <PricingPlanCard plan={plan} active={isActive} compact={!isActive} />
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        <div className={pricingStyles.desktopDots}>
          {pricingPlans.map((plan, index) => (
            <button
              key={plan.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Pilih ${plan.name}`}
              className={cn(activeIndex === index && pricingStyles.dotActive)}
            />
          ))}
        </div>
      </div>

      <div data-reveal className={pricingStyles.mobileCarouselWrap}>
        <button
          type="button"
          onClick={() => goMobile(-1)}
          aria-label="Paket sebelumnya"
          aria-controls="pricing-mobile-deck"
          className={cn(pricingStyles.mobileArrow, pricingStyles.mobileArrowPrev)}
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <div id="pricing-mobile-deck" className={pricingStyles.mobileDeck} ref={mobileDeckRef} onScroll={syncMobileDot}>
          {mobilePlans.map((plan, index) => (
            <div
              key={plan.name}
              ref={(element) => {
                mobileCardRefs.current[index] = element;
              }}
              className={pricingStyles.mobileCard}
            >
              <PricingPlanCard plan={plan} active={plan.featured} compact allowExpand />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => goMobile(1)}
          aria-label="Paket berikutnya"
          aria-controls="pricing-mobile-deck"
          className={cn(pricingStyles.mobileArrow, pricingStyles.mobileArrowNext)}
        >
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className={pricingStyles.mobileDots}>
        {mobilePlans.map((plan, index) => (
          <button
            key={plan.name}
            type="button"
            onClick={() => scrollMobileTo(index)}
            aria-label={`Lihat ${plan.name}`}
            className={cn(mobileActiveIndex === index && pricingStyles.dotActive)}
          />
        ))}
      </div>
    </PageSection>
  );
}

function AddOnsSection() {
  return (
    <PageSection id="addons" className="bg-[#F8F3EA] dark:bg-[#07140F]">
      <div className={landingStyles.addOnsHeader}>
        <SectionTitle
          badge="Tambahan opsional"
          title={"Tambahan Opsional /\nAdd-ons"}
          subtitle="Paket bulanan Outletmu sudah mencakup sistem utama. Add-ons hanya dipakai jika outlet membutuhkan domain, desain QR, training tambahan, atau bantuan khusus."
        />
        <p data-reveal>
          Pilih tambahan seperlunya. Tim Outletmu akan bantu rekomendasikan yang paling relevan untuk outlet.
        </p>
      </div>

      <div data-reveal className={landingStyles.addOnsGrid}>
        {addOnGroups.map((group) => {
          const Icon = group.icon;

          return (
            <motion.article
              key={group.title}
              className={landingStyles.addOnCard}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 190, damping: 20 }}
            >
              <div className={landingStyles.addOnCardHeader}>
                <span>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3>{group.title}</h3>
              </div>
              {group.description ? <p className={landingStyles.addOnDescription}>{group.description}</p> : null}
              <div className={landingStyles.addOnItems}>
                {group.items.map((item) => (
                  <div key={`${group.title}-${item.name}`} className={landingStyles.addOnItem}>
                    <span>{item.name}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
              {group.note ? <small>{group.note}</small> : null}
            </motion.article>
          );
        })}
      </div>

      <div data-reveal className={landingStyles.addOnsNoteBox}>
        <div>
          <span>
            <Check className="h-5 w-5" aria-hidden="true" />
          </span>
          <strong>Catatan add-ons</strong>
        </div>
        <ul>
          {addOnNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </PageSection>
  );
}

function WhyOutletmuSection() {
  return (
    <PageSection>
      <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <SectionTitle
          align="left"
          badge="Kenapa Outletmu"
          title="Bukan sekadar aplikasi kasir murah. Outletmu dikelola seperti sistem operasional."
          subtitle="Outletmu adalah sistem POS bulanan yang setup-nya dibantu, alurnya bisa disesuaikan, dan siap berkembang ketika outlet bertambah."
        />
        <div data-reveal className="grid min-w-0 gap-4 sm:grid-cols-2">
          {whyPoints.map((point) => (
            <motion.div
              key={point}
              whileHover={{ y: -6 }}
              className="flex min-h-28 items-start gap-4 rounded-[1.7rem] border border-white/80 bg-white/72 p-6 shadow-[0_22px_60px_rgba(20,33,61,0.08)] dark:border-white/10 dark:bg-white/8 dark:shadow-[0_24px_70px_rgba(0,0,0,0.22)]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#2F8A68] text-white">
                <Check className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="font-semibold leading-7 text-[#14213D] dark:text-[#F8F3EA]">{point}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </PageSection>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <PageSection id="faq" className="bg-white dark:bg-[#08111F]">
      <SectionTitle badge="FAQ" title="Pertanyaan yang sering muncul." />
      <div data-reveal className="mx-auto mt-12 grid max-w-4xl gap-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={faq.question} className="overflow-hidden rounded-[1.5rem] border border-[#14213D]/8 bg-[#F8F3EA]/62 dark:border-white/10 dark:bg-white/7">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex min-h-16 w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-[#14213D] focus:outline-none focus:ring-4 focus:ring-[#2F8A68]/20 dark:text-[#F8F3EA]"
                aria-expanded={isOpen}
              >
                {faq.question}
                <ChevronDown className={cn("h-5 w-5 shrink-0 transition", isOpen && "rotate-180")} aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm leading-7 text-[#14213D]/65 dark:text-[#F8F3EA]/68">{faq.answer}</div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </PageSection>
  );
}

function FinalCTASection() {
  return (
    <PageSection>
      <div data-reveal className={landingStyles.finalCta}>
        <div className={landingStyles.finalWord}>FLOW</div>
        <div className="relative grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <div className="text-center lg:text-left">
            <Badge tone="dark">Konsultasi via WhatsApp</Badge>
            <h2 className="mt-6 text-[clamp(2.2rem,5vw,4.4rem)] font-extrabold leading-tight text-white">
              Siap bikin operasional bisnis lebih rapi?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/70 md:text-lg lg:mx-0">
              Konsultasikan kebutuhan cafe, restoran, minimarket, atau UMKM kamu.
              Tim Outletmu akan bantu rekomendasikan paket POS dan workflow yang paling cocok.
            </p>
          </div>
          <div className={landingStyles.finalMessage}>
            <div>
              <p>Pesan otomatis</p>
              <span>Halo Outletmu, saya mau konsultasi paket POS untuk outlet saya</span>
              <ButtonLink href={whatsappLink} className="mt-5 w-full">
                Chat WhatsApp Outletmu
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function Footer({ theme }: { theme: ThemeMode }) {
  return (
    <footer className="border-t border-[#14213D]/6 bg-white px-5 py-10 dark:border-white/10 dark:bg-[#07140F] md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <BrandLogo variant="full" theme={theme} size="md" />
        <p className="text-sm font-medium leading-7 text-[#14213D]/55 dark:text-[#F8F3EA]/58">
          POS, QR Order, E-Struk, stok, laporan, dan WhatsApp automation untuk outlet harian.
        </p>
      </div>
    </footer>
  );
}

export function OutletmuLanding() {
  const rootRef = useRef<HTMLElement | null>(null);
  const { theme, toggleTheme } = useThemeMode();

  useLandingGsap(rootRef);

  return (
    <main ref={rootRef} className={landingStyles.page}>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <HeroSection theme={theme} />
      <ProductFlowShowcaseSection />
      <FlowSection />
      <FeatureShowcase />
      <ProductPreviewSection />
      <WhatsAppBotSection />
      <PricingDeckSection />
      <AddOnsSection />
      <WhyOutletmuSection />
      <FAQSection />
      <FinalCTASection />
      <Footer theme={theme} />
      <a href={whatsappLink} className={landingStyles.mobileStickyCta} aria-label="Chat WhatsApp Outletmu">
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Chat WhatsApp
      </a>
    </main>
  );
}
