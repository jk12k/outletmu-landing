"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  ChefHat,
  Check,
  ChevronDown,
  CircleAlert,
  ClipboardList,
  CreditCard,
  Globe2,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  ListChecks,
  MessageCircle,
  MonitorCheck,
  Package,
  Printer,
  QrCode,
  ReceiptText,
  ScanLine,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Store,
  Table2,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import landingStyles from "@/styles/landing.module.scss";
import pricingStyles from "@/styles/pricingDeck.module.scss";
import { GlobalNavbar } from "@/components/global-navbar";

const whatsappLink =
  "https://wa.me/6281291960227?text=Halo%20Outletmu%2C%20saya%20mau%20tanya%20tentang%20POS%20kasir%20dan%20QR%20order";
const customerMenuDemoLink = "https://kasir.outletmu.store/scan/K7F9A2P9";

const navItems = [
  { label: "Solusi", href: "#solutions" },
  { label: "Staff", href: "#staff" },
  { label: "Pembeli", href: "#customer" },
  { label: "Alur", href: "#flow" },
  { label: "Harga", href: "/harga" },
] as const;
void navItems;

const footerSeoLinks = [
  { label: "Aplikasi Kasir Cafe", href: "/pos-kasir-cafe" },
  { label: "QR Order Meja", href: "/qr-order-meja" },
  { label: "Menu Digital Cafe", href: "/menu-digital-cafe" },
  { label: "Harga", href: "/harga" },
  { label: "Software Kasir F&B", href: "/software-kasir-fnb" },
  { label: "Sistem Kasir Coffee Shop", href: "/sistem-kasir-coffee-shop" },
  { label: "Aplikasi Kasir Restoran", href: "/aplikasi-kasir-restoran" },
  { label: "Laporan WhatsApp", href: "/fitur/laporan-whatsapp" },
  { label: "Kitchen Display", href: "/fitur/kitchen-display" },
  { label: "Panduan Memilih Aplikasi Kasir", href: "/panduan/memilih-aplikasi-kasir-cafe" },
  { label: "Panduan QR Order Meja", href: "/panduan/qr-order-meja-cafe" },
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
      src: "/branding/outletmu-full-light.png",
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
      src: "/branding/outletmu-wordmark-light.png",
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
      src: "/branding/outletmu-icon-light.png",
      width: 925,
      height: 925,
      alt: "Outletmu icon",
    },
  },
};

const landingImages = {
  deviceShowcase: {
    src: "/images/landing/outletmu-device-showcase.png",
    width: 1122,
    height: 1402,
    alt: "Outletmu dashboard dan perangkat POS",
  },
  cafeDashboard: {
    src: "/images/landing/outletmu-cafe-dashboard-hero.png",
    alt: "Outletmu dashboard operasional cafe",
  },
  cafeTabletQr: {
    src: "/images/landing/outletmu-cafe-tablet-qr-hero.png",
    alt: "Outletmu QR menu dan dashboard cafe",
  },
} as const;

const businessSolutionCards: Array<{
  title: string;
  copy: string;
  icon: LucideIcon;
}> = [
  {
    title: "Rapikan order masuk",
    copy: "Order dari kasir dan QR order meja masuk ke alur yang sama.",
    icon: QrCode,
  },
  {
    title: "Kurangi salah catat",
    copy: "Detail meja, item, catatan, dan status pesanan lebih mudah dipantau.",
    icon: ClipboardList,
  },
  {
    title: "Pantau omzet harian",
    copy: "Owner bisa melihat omzet harian, transaksi, dan produk terlaris dengan format rupiah penuh.",
    icon: BarChart3,
  },
  {
    title: "Menu digital mudah diperbarui",
    copy: "Harga, kategori, dan status menu digital cafe bisa diubah tanpa cetak ulang.",
    icon: Store,
  },
  {
    title: "Stok lebih terkontrol",
    copy: "Stok basic membantu tim mengurangi risiko produk habis terlambat diketahui.",
    icon: MonitorCheck,
  },
  {
    title: "Siap berkembang",
    copy: "Mulai dari satu outlet, lalu naik ke POS kasir restoran dan multi-outlet saat kebutuhan bertambah.",
    icon: ShieldCheck,
  },
];

const flowSteps: Array<{ title: string; icon: LucideIcon; copy: string }> = [
  {
    title: "Pembeli scan QR meja",
    icon: ScanLine,
    copy: "Setiap meja bisa punya QR sendiri agar konteks dine-in lebih jelas.",
  },
  {
    title: "Pilih menu dari HP",
    icon: Smartphone,
    copy: "Pembeli membuka menu digital, memilih item, catatan, dan jumlah pesanan.",
  },
  {
    title: "Pesanan masuk dashboard",
    icon: LayoutDashboard,
    copy: "Order dari QR dan POS kasir restoran masuk ke satu tempat yang mudah dipantau.",
  },
  {
    title: "Kitchen memproses order",
    icon: ChefHat,
    copy: "Dapur melihat pesanan masuk dan mengubah status sampai siap disajikan.",
  },
  {
    title: "Kasir selesaikan pembayaran",
    icon: CreditCard,
    copy: "Kasir menyelesaikan pembayaran dan transaksi tercatat rapi di sistem.",
  },
  {
    title: "Owner melihat laporan",
    icon: LineChart,
    copy: "Owner melihat omzet, transaksi, dan produk terlaris dengan format rupiah penuh.",
  },
];

const staffFeatureCards: Array<{
  title: string;
  copy: string;
  icon: LucideIcon;
}> = [
  {
    title: "POS Kasir",
    copy: "Input pesanan cepat untuk transaksi langsung di outlet.",
    icon: WalletCards,
  },
  {
    title: "Dashboard Order",
    copy: "Pesanan dari kasir dan QR masuk ke satu tempat yang mudah dipantau.",
    icon: LayoutDashboard,
  },
  {
    title: "Kitchen Display",
    copy: "Kitchen melihat order masuk dan mengubah status sampai siap disajikan.",
    icon: ChefHat,
  },
  {
    title: "Produk & Stok",
    copy: "Kelola menu, harga, kategori, dan stok basic dari dashboard.",
    icon: Package,
  },
  {
    title: "Laporan",
    copy: "Owner bisa melihat omzet Rp1.250.000, transaksi, dan produk terlaris.",
    icon: BarChart3,
  },
];

const customerFeatureCards: Array<{
  title: string;
  copy: string;
  icon: LucideIcon;
}> = [
  {
    title: "Scan QR meja",
    copy: "Pembeli membuka menu dari QR meja langsung dari browser HP.",
    icon: Table2,
  },
  {
    title: "Pilih menu dari HP",
    copy: "Menu dibuat nyaman untuk dine-in tanpa aplikasi tambahan.",
    icon: ShoppingCart,
  },
  {
    title: "Catatan pesanan",
    copy: "Pembeli bisa menambahkan jumlah item dan catatan sebelum checkout.",
    icon: ListChecks,
  },
  {
    title: "Masuk ke staff",
    copy: "Pesanan masuk ke dashboard order atau kitchen dengan konteks meja.",
    icon: LayoutDashboard,
  },
  {
    title: "Tanpa download aplikasi",
    copy: "Pembeli cukup scan, pilih menu, lalu kirim pesanan.",
    icon: Smartphone,
  },
];

const manualProblems: Array<{ title: string; copy: string; icon: LucideIcon }> = [
  {
    title: "Pesanan tertukar",
    copy: "Nomor meja dan detail item sering tercecer saat outlet sedang ramai.",
    icon: CircleAlert,
  },
  {
    title: "Staff bolak-balik catat order",
    copy: "Kasir, waiter, dan kitchen mengulang catatan yang sama di beberapa tempat.",
    icon: ClipboardList,
  },
  {
    title: "Owner sulit cek omzet harian",
    copy: "Rekap penjualan baru terlihat setelah tutup toko atau setelah data dirapikan manual.",
    icon: BarChart3,
  },
  {
    title: "Stok tidak sinkron",
    copy: "Produk habis terlambat diketahui karena menu, kasir, dan stok tidak dibaca dari alur yang sama.",
    icon: Package,
  },
  {
    title: "Menu cetak cepat usang",
    copy: "Harga dan produk berubah, tetapi daftar menu fisik harus dicetak ulang.",
    icon: ReceiptText,
  },
  {
    title: "Order dari meja tidak rapi",
    copy: "Pesanan dine-in sulit dilacak ketika meja, catatan, dan status dapur tidak terhubung.",
    icon: Table2,
  },
];

const outletmuSolutions = [
  "QR order meja terhubung ke dashboard kasir.",
  "Kitchen, kasir, dan owner membaca status yang sama.",
  "Menu digital cafe, stok, dan laporan bisa dikelola dalam layanan bulanan.",
];

const previews = [
  {
    title: "Menu Pembeli",
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
    title: "Laporan Owner",
    eyebrow: "Laporan",
    metric: "Rp1.250.000 hari ini",
    rows: ["38 transaksi selesai", "Produk terlaris: Kopi Susu", "Omzet naik 12%"],
    copy: "Ringkasan bisnis untuk owner tanpa buka spreadsheet.",
  },
  {
    title: "Stok",
    eyebrow: "Inventori",
    metric: "5 stok menipis",
    rows: ["Susu UHT: 8 tersisa", "Cup 16oz: perlu restock", "Unduh laporan"],
    copy: "Stok dan restock dibuat lebih rapi dari dashboard.",
  },
  {
    title: "WhatsApp",
    eyebrow: "Automasi",
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
    name: "Starter QR",
    price: "Rp249.000",
    suffix: "/bulan",
    label: "Paket awal",
    cta: "Mulai Starter",
    audience: "Untuk outlet yang ingin mulai pakai QR order meja, kasir, dan operasional dasar dalam satu alur.",
    features: [
      "Dashboard",
      "POS kasir",
      "Orders",
      "Kitchen",
      "Transaksi",
      "Produk",
      "Inventory",
      "Report",
      "QR order meja",
      "Staff",
      "Data pelanggan",
      "Riwayat transaksi",
    ],
  },
  {
    name: "POS Basic",
    price: "Rp499.000",
    suffix: "/bulan",
    label: "Rekomendasi",
    cta: "Konsultasi POS Basic",
    audience: "Untuk cafe/resto yang butuh operasional kasir lebih rapi, absensi staff, login member, dan saldo member.",
    featured: true,
    features: [
      "Semua fitur Starter",
      "Absensi staff",
      "Login member",
      "Saldo member",
    ],
  },
  {
    name: "Business",
    price: "Rp799.000",
    suffix: "/bulan",
    label: "Automation",
    cta: "Konsultasi Business",
    audience: "Untuk outlet yang butuh automation WhatsApp, laporan cepat via WA, dan support prioritas.",
    features: [
      "Semua fitur POS Basic",
      "WhatsApp automation",
      "Tanya laporan via WA",
      "Absen lewat WA",
      "Notifikasi stok",
      "Report otomatis",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Konsultasi",
    suffix: "",
    label: "Custom",
    cta: "Hubungi Outletmu",
    audience: "Untuk bisnis dengan kebutuhan integrasi, kontrol, dan pendampingan khusus.",
    features: [
      "Semua fitur Business",
      "Setup custom",
      "Multi-outlet advanced",
      "Integrasi khusus",
      "Custom workflow",
      "Dedicated support",
      "Onboarding khusus",
    ],
  },
];

const comparisonPlans = ["Starter QR", "POS Basic", "Business", "Enterprise"] as const;

type ComparisonPlanKey = (typeof comparisonPlans)[number];

const packageComparisonRows: Array<
  { feature: string } & Record<ComparisonPlanKey, string>
> = [
  {
    feature: "Dashboard",
    "Starter QR": "Ya",
    "POS Basic": "Ya",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "POS kasir",
    "Starter QR": "Ya",
    "POS Basic": "Ya",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "Orders",
    "Starter QR": "Ya",
    "POS Basic": "Ya",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "Kitchen",
    "Starter QR": "Ya",
    "POS Basic": "Ya",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "Transaksi",
    "Starter QR": "Ya",
    "POS Basic": "Ya",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "Produk",
    "Starter QR": "Ya",
    "POS Basic": "Ya",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "Inventory",
    "Starter QR": "Ya",
    "POS Basic": "Ya",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "Report",
    "Starter QR": "Ya",
    "POS Basic": "Ya",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "QR meja",
    "Starter QR": "Ya",
    "POS Basic": "Ya",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "Staff",
    "Starter QR": "Ya",
    "POS Basic": "Ya",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "Absensi staff",
    "Starter QR": "-",
    "POS Basic": "Ya",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "Login member",
    "Starter QR": "-",
    "POS Basic": "Ya",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "Data pelanggan",
    "Starter QR": "Ya",
    "POS Basic": "Ya",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "Saldo member",
    "Starter QR": "-",
    "POS Basic": "Ya",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "Riwayat transaksi",
    "Starter QR": "Ya",
    "POS Basic": "Ya",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "WhatsApp automation",
    "Starter QR": "-",
    "POS Basic": "-",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "Tanya laporan via WA",
    "Starter QR": "-",
    "POS Basic": "-",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "Absen lewat WA",
    "Starter QR": "-",
    "POS Basic": "-",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "Notifikasi stok",
    "Starter QR": "-",
    "POS Basic": "-",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "Report otomatis",
    "Starter QR": "-",
    "POS Basic": "-",
    Business: "Ya",
    Enterprise: "Ya",
  },
  {
    feature: "Priority support",
    "Starter QR": "-",
    "POS Basic": "-",
    Business: "Ya",
    Enterprise: "Dedicated",
  },
  {
    feature: "Setup custom",
    "Starter QR": "-",
    "POS Basic": "-",
    Business: "-",
    Enterprise: "Ya",
  },
  {
    feature: "Multi-outlet advanced",
    "Starter QR": "-",
    "POS Basic": "-",
    Business: "-",
    Enterprise: "Ya",
  },
  {
    feature: "Integrasi khusus",
    "Starter QR": "-",
    "POS Basic": "-",
    Business: "-",
    Enterprise: "Ya",
  },
  {
    feature: "Custom workflow",
    "Starter QR": "-",
    "POS Basic": "-",
    Business: "-",
    Enterprise: "Ya",
  },
  {
    feature: "Dedicated support",
    "Starter QR": "-",
    "POS Basic": "-",
    Business: "-",
    Enterprise: "Ya",
  },
  {
    feature: "Onboarding khusus",
    "Starter QR": "-",
    "POS Basic": "-",
    Business: "-",
    Enterprise: "Ya",
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
      { name: "Default link Outletmu", value: "Free" },
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
  "Default link Outletmu tersedia Free untuk outlet utama.",
  "Training onsite awal: Free 1x.",
  "Desain QR diberikan dalam format siap cetak.",
  "Add-ons bersifat opsional. Tim Outletmu akan bantu pilih yang benar-benar dibutuhkan outlet.",
];

const whyPoints = [
  "Setup dibantu dari awal",
  "Alur operasional bisa disesuaikan",
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
    answer:
      "Bisa. Starter QR sudah termasuk Dashboard, POS kasir, Orders, Kitchen, Transaksi, Produk, Inventory, Report, QR meja, Staff, Data pelanggan, dan Riwayat transaksi. Jika butuh absensi staff, login member, dan saldo member, naik ke POS Basic.",
  },
  {
    question: "Apakah sudah termasuk hosting?",
    answer: "Ya, semua paket sudah termasuk hosting, maintenance, dan bantuan setup awal.",
  },
  {
    question: "Apakah bisa custom fitur?",
    answer:
      "Bisa. Kebutuhan automation cocok di Business. Jika butuh setup custom, multi-outlet advanced, integrasi khusus, atau workflow khusus, lanjut ke Enterprise.",
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

function applyThemeMode(_: ThemeMode) {
  document.documentElement.classList.remove("dark");
  document.documentElement.dataset.theme = "light";
}

function useThemeMode() {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    setTheme("light");
    applyThemeMode("light");
    try {
      window.localStorage.setItem(themeStorageKey, "light");
    } catch (_) {}
  }, []);

  const toggleTheme = () => {
    // Dark mode dimatikan permanen, force light.
    applyThemeMode("light");
    setTheme("light");
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
        "inline-flex min-h-10 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold shadow-sm",
        tone === "light"
          ? "border border-[#2F8A68]/14 bg-white/86 text-[#2F8A68] dark:border-white/10 dark:bg-white/8 dark:text-[#B9F1DA]"
          : "border border-white/14 bg-white/10 text-white",
      )}
    >
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
      className={cn(
        "relative z-10 mx-auto max-w-4xl",
        align === "center" ? "text-center" : "text-center lg:text-left",
      )}
    >
      <Badge tone={tone}>{badge}</Badge>
      <h2
        className={cn(
          "mt-5 text-[clamp(2rem,4.2vw,3.2rem)] font-extrabold leading-[1.1]",
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

function HeaderLogo({ theme }: { theme: ThemeMode }) {
  const logo = brandLogoAssets.wordmark[theme];

  return (
    <span className={landingStyles.headerLogo}>
      <Image
        src={logo.src}
        alt="Outletmu"
        width={logo.width}
        height={logo.height}
        className={landingStyles.headerLogoImage}
        priority
        sizes="(max-width: 480px) 132px, (max-width: 768px) 148px, 168px"
      />
    </span>
  );
}
void HeaderLogo;


function Navbar() {
  return <GlobalNavbar theme="light" />;
}

function HeroCardDeck() {
  return (
    <motion.div
      data-reveal
      className={landingStyles.heroImageShowcase}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: "easeOut" }}
    >
      <Image
        src={landingImages.deviceShowcase.src}
        alt={landingImages.deviceShowcase.alt}
        width={landingImages.deviceShowcase.width}
        height={landingImages.deviceShowcase.height}
        className={landingStyles.heroShowcaseImage}
        priority
        sizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 560px"
      />
    </motion.div>
  );
}

function HeroSection() {
  return (
    <section className={cn(landingStyles.section, landingStyles.heroSection)}>
      <div className={landingStyles.ambientOne} data-float="ambient" />
      <div className={landingStyles.ambientTwo} data-float="ambient" />
      <div className={cn(landingStyles.container, landingStyles.heroLayout, "grid min-w-0 items-center gap-10 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]")}>
        <div data-reveal className={cn(landingStyles.heroCopy, "mx-auto min-w-0 max-w-2xl text-center xl:mx-0 xl:text-left")}>
          <Badge>Gratis setup untuk 100 outlet pertama</Badge>
          <h1 className={cn(landingStyles.heroTitle, "mt-6 text-[clamp(2.35rem,4.7vw,3.75rem)] font-extrabold leading-[1.08] text-[#14213D] dark:text-[#F8F3EA]")}>
            Aplikasi kasir cafe dan QR order untuk outlet F&B yang ingin lebih rapi
          </h1>
          <p className={cn(landingStyles.heroSubtitle, "mx-auto mt-6 max-w-xl text-base font-medium leading-8 text-[#14213D]/68 dark:text-[#F8F3EA]/70 md:text-lg xl:mx-0")}>
            Outletmu membantu cafe, restoran, dan UMKM F&B mengelola kasir, QR order meja, menu digital,
            stok, kitchen, dan laporan dalam satu sistem bulanan yang dibantu setup.
          </p>
          <div className={cn(landingStyles.heroActions, "mx-auto mt-9 grid max-w-md gap-3 sm:flex sm:max-w-none sm:justify-center xl:justify-start")}>
            <ButtonLink href={whatsappLink}>
              Konsultasi via WhatsApp
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/harga" variant="secondary">
              Lihat Harga
            </ButtonLink>
          </div>
          <p className={cn(landingStyles.heroFootnote, "mx-auto mt-7 max-w-xl text-sm font-medium leading-7 text-[#14213D]/58 dark:text-[#F8F3EA]/58 xl:mx-0")}>
            Cocok untuk cafe, restoran, coffee shop, UMKM F&B, dan minimarket kecil.
          </p>
        </div>
        <HeroCardDeck />
      </div>
    </section>
  );
}

function BusinessSolutionSection() {
  return (
    <PageSection id="solutions" className="bg-white dark:bg-[#08111F]">
      <SectionTitle
        badge="Solusi bisnis Outletmu"
        title="Solusi kasir dan order digital untuk bisnis yang ingin terlihat lebih rapi"
        subtitle="Outletmu membantu cafe, restoran, coffee shop, minimarket kecil, dan UMKM F&B menjalankan order, kasir, menu, stok, dan laporan dari alur yang lebih tertata."
      />
      <div data-reveal className={landingStyles.solutionLayout}>
        <div className={landingStyles.solutionIntroCard}>
          <span className={landingStyles.solutionIntroIcon}>
            <Store className="h-6 w-6" aria-hidden="true" />
          </span>
          <h3>Sistem bulanan yang dibantu setup</h3>
          <p>
            Outletmu cocok untuk bisnis yang ingin punya aplikasi kasir cafe, POS kasir restoran, QR order meja,
            dan laporan tanpa harus mengurus teknis sendiri dari awal.
          </p>
          <div className={landingStyles.solutionIntroStats}>
            <div>
              <strong>Rp1.250.000</strong>
              <span>contoh omzet harian terbaca penuh</span>
            </div>
            <div>
              <strong>38 transaksi</strong>
              <span>order kasir dan QR dalam satu pantauan</span>
            </div>
          </div>
        </div>
        <div className={landingStyles.solutionCardGrid}>
          {businessSolutionCards.map((item) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                className={landingStyles.solutionCard}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 190, damping: 20 }}
              >
                <span>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </PageSection>
  );
}

function StaffFeatureSection() {
  return (
    <PageSection id="staff" className={landingStyles.staffSection}>
      <SectionTitle
        badge="Untuk kasir & staff"
        title="Lebih mudah untuk kasir, kitchen, dan owner"
        subtitle="Operasional harian dibuat jelas dari pesanan masuk, proses kitchen, pembayaran, sampai laporan penjualan."
      />
      <div data-reveal className={landingStyles.dashboardVisualFrame}>
        <Image
          src={landingImages.cafeDashboard.src}
          alt={landingImages.cafeDashboard.alt}
          fill
          className={landingStyles.sectionVisualImage}
          sizes="(max-width: 768px) 92vw, (max-width: 1280px) 88vw, 1120px"
        />
      </div>
      <div data-reveal className={landingStyles.roleFeatureGrid}>
        {staffFeatureCards.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.article
              key={feature.title}
              className={cn(landingStyles.roleFeatureCard, index === 1 && landingStyles.roleFeatureCardWide)}
              whileHover={{ y: -7, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 190, damping: 20 }}
            >
              <div className={landingStyles.roleFeatureTopline}>
                <span>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <small>0{index + 1}</small>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </motion.article>
          );
        })}
      </div>
    </PageSection>
  );
}

function CustomerFeatureSection() {
  return (
    <PageSection id="customer" className="bg-[#F8F3EA] dark:bg-[#07140F]">
      <div className={landingStyles.customerHeaderGrid}>
        <SectionTitle
          align="left"
          badge="Untuk pembeli"
          title="Pembeli bisa scan QR, pilih menu, dan kirim pesanan lebih cepat"
          subtitle="Pengalaman order dibuat ringan dari HP pelanggan, sehingga staff tidak perlu selalu membawa menu fisik atau mencatat order dari awal."
        />
        <div data-reveal className={landingStyles.customerMiniPanel}>
          <div>
            <QrCode className="h-5 w-5" aria-hidden="true" />
            <span>QR order meja</span>
          </div>
          <strong>Meja B4</strong>
          <p>Menu digital cafe terbuka dari browser HP, pesanan membawa informasi meja, dan order masuk ke dashboard.</p>
        </div>
      </div>
      <div data-reveal className={landingStyles.customerVisualFrame}>
        <Image
          src={landingImages.cafeTabletQr.src}
          alt={landingImages.cafeTabletQr.alt}
          fill
          className={landingStyles.sectionVisualImage}
          sizes="(max-width: 768px) 92vw, (max-width: 1280px) 88vw, 1120px"
        />
      </div>
      <div data-reveal className={landingStyles.customerFeatureGrid}>
        {customerFeatureCards.map((feature) => {
          const Icon = feature.icon;

          return (
            <motion.article
              key={feature.title}
              className={landingStyles.customerFeatureCard}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 190, damping: 20 }}
            >
              <span>
                <Icon className="h-5 w-5" aria-hidden="true" />
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

function FlowSection() {
  return (
    <PageSection id="flow" className="bg-[#F8F3EA] dark:bg-[#07140F]">
      <SectionTitle
        badge="Alur kerja"
        title="Dari QR order meja sampai laporan, alurnya dibuat mudah diikuti"
        subtitle="Pembeli, kasir, kitchen, dan owner punya peran yang jelas sehingga order tidak berhenti di catatan manual."
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

function ProblemSolutionSection() {
  return (
    <PageSection className="bg-white dark:bg-[#08111F]">
      <SectionTitle
        badge="Masalah yang diselesaikan"
        title="Masalah kecil di operasional bisa jadi besar kalau masih manual"
        subtitle="Outletmu membantu merapikan titik-titik yang sering membuat cafe, restoran, dan UMKM F&B kehilangan waktu saat jam ramai."
      />
      <div data-reveal className={landingStyles.problemGrid}>
        {manualProblems.map((problem) => {
          const Icon = problem.icon;

          return (
            <motion.article
              key={problem.title}
              className={landingStyles.problemCard}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 190, damping: 20 }}
            >
              <span>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3>{problem.title}</h3>
              <p>{problem.copy}</p>
            </motion.article>
          );
        })}
      </div>
      <div data-reveal className={landingStyles.solutionStrip}>
        <div>
          <Badge>Solusi Outletmu</Badge>
          <h3>Order, kasir, stok, dan laporan dibaca dari alur yang sama.</h3>
        </div>
        <ul>
          {outletmuSolutions.map((solution) => (
            <li key={solution}>
              <Check className="h-4 w-4" aria-hidden="true" />
              {solution}
            </li>
          ))}
        </ul>
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
        badge="Preview sistem"
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
          <Badge>WhatsApp owner</Badge>
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
              <span>online · automasi aktif</span>
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
  const compactFeatureLimit = allowExpand ? 6 : 4;
  const shownFeatures = shouldCompact ? plan.features.slice(0, compactFeatureLimit) : plan.features;
  const hiddenFeatureCount = shouldCompact ? plan.features.length - shownFeatures.length : 0;
  const planSetup = "setup" in plan && typeof plan.setup === "string" ? plan.setup : "";

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
        {planSetup ? <p>{planSetup}</p> : null}
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
  const mobilePlans = [pricingPlans[1], pricingPlans[0], pricingPlans[2], pricingPlans[3]];

  useEffect(() => {
    const layoutCards = () => {
      if (!deckRef.current || window.innerWidth < 1024) {
        return;
      }

      const spread = Math.min(Math.max(window.innerWidth * 0.2, 260), 340);

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
          y: offset === 0 ? 0 : isBack ? 68 : 38,
          rotate: offset === 0 || isBack ? 0 : side * -2,
          scale: offset === 0 ? 1 : isBack ? 0.68 : 0.76,
          autoAlpha: offset === 0 ? 1 : isBack ? 0.1 : 0.48,
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
              role="button"
              tabIndex={0}
              aria-label={`Pilih paket ${plan.name}`}
              aria-pressed={index === mobileActiveIndex}
              onClick={() => scrollMobileTo(index)}
              onKeyDown={(event) => {
                if ((event.target as HTMLElement).closest("a, button")) {
                  return;
                }

                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  scrollMobileTo(index);
                }
              }}
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

function ComparisonCell({ value }: { value: string }) {
  if (value === "-" || value.toLowerCase() === "tidak") {
    return <span className={landingStyles.comparisonDash}>-</span>;
  }

  if (value === "Ya") {
    return (
      <span className={landingStyles.comparisonCheck}>
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
        Ya
      </span>
    );
  }

  return <span className={landingStyles.comparisonValue}>{value}</span>;
}

function PackageComparisonSection() {
  return (
    <PageSection className={landingStyles.comparisonSection}>
      <SectionTitle
        badge="Perbandingan paket"
        title="Bandingkan paket Outletmu"
        subtitle="Pilih paket sesuai tahap operasional outlet Anda. Mulai dari QR order dan kasir, lalu naik ke member, automation, sampai kebutuhan custom."
      />
      <div className={landingStyles.comparisonShell}>
        <div
          className={landingStyles.comparisonScroller}
          role="region"
          aria-label="Tabel perbandingan paket Outletmu"
          tabIndex={0}
        >
          <table className={landingStyles.comparisonTable}>
            <thead>
              <tr>
                <th scope="col">Fitur</th>
                {comparisonPlans.map((plan) => (
                  <th
                    key={plan}
                    scope="col"
                    className={cn(plan === "POS Basic" && landingStyles.comparisonRecommended)}
                  >
                    <span>{plan}</span>
                    {plan === "POS Basic" ? <small>Rekomendasi</small> : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {packageComparisonRows.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  {comparisonPlans.map((plan) => (
                    <td
                      key={`${row.feature}-${plan}`}
                      className={cn(plan === "POS Basic" && landingStyles.comparisonRecommendedCell)}
                    >
                      <ComparisonCell value={row[plan]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={landingStyles.comparisonNote}>
          <Check className="h-4 w-4" aria-hidden="true" />
          <span>Starter QR cocok untuk mulai digital dengan kasir, order, kitchen, transaksi, report, QR meja, staff, data pelanggan, dan riwayat transaksi. POS Basic tetap rekomendasi untuk outlet yang butuh absensi staff, login member, dan saldo member.</span>
        </div>
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

function OperationsCTASection() {
  return (
    <PageSection className={landingStyles.midCtaSection}>
      <div data-reveal className={landingStyles.midCtaPanel}>
        <div className={landingStyles.midCtaCopy}>
          <Badge tone="dark">Gratis setup untuk 100 outlet pertama</Badge>
          <h2>Mulai rapikan order dan kasir outlet Anda</h2>
          <p>
            Outletmu bantu setup dari awal, cocok untuk bisnis yang ingin punya sistem kasir dan QR order tanpa
            ribet teknis.
          </p>
        </div>
        <div className={landingStyles.midCtaActions}>
          <ButtonLink href={whatsappLink} variant="light">
            Konsultasi via WhatsApp
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
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
              Mulai rapikan order dan kasir outlet Anda
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/70 md:text-lg lg:mx-0">
              Outletmu bantu setup dari awal, cocok untuk bisnis yang ingin punya sistem kasir dan QR order tanpa
              ribet teknis.
            </p>
          </div>
          <div className={landingStyles.finalMessage}>
            <div>
              <p>Pesan otomatis</p>
              <span>Halo Outletmu, saya mau tanya tentang POS kasir dan QR order</span>
              <ButtonLink href={whatsappLink} className="mt-5 w-full">
                Konsultasi via WhatsApp
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
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="flex min-w-0 flex-col items-start gap-4">
          <BrandLogo variant="full" theme={theme} size="md" />
          <p className="max-w-xl text-sm font-medium leading-7 text-[#14213D]/60 dark:text-[#F8F3EA]/64">
            POS kasir, QR order, menu digital, stok, dan laporan untuk outlet yang ingin operasional lebih rapi.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
          <ButtonLink href={whatsappLink} className="w-full sm:w-auto">
            Konsultasi via WhatsApp
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <a
            href={customerMenuDemoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#14213D]/10 bg-white px-6 py-3 text-center text-sm font-semibold text-[#14213D] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#2F8A68]/30 focus:outline-none focus:ring-4 focus:ring-[#2F8A68]/25 dark:border-white/14 dark:bg-white/8 dark:text-[#F8F3EA] dark:hover:border-[#2F8A68]/60 sm:w-auto"
          >
            Lihat Demo Menu Pelanggan
          </a>
        </div>
      </div>
      <nav
        className="mx-auto mt-8 flex max-w-7xl flex-wrap gap-x-5 gap-y-3 border-t border-[#14213D]/6 pt-6 text-sm font-semibold text-[#14213D]/60 dark:border-white/10 dark:text-[#F8F3EA]/60"
        aria-label="Halaman utama Outletmu"
      >
        {footerSeoLinks.map((item) => (
          <Link key={item.href} href={item.href} className="transition hover:text-[#2F8A68] dark:hover:text-white">
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-[#14213D]/6 pt-6 text-sm font-medium text-[#14213D]/50 dark:border-white/10 dark:text-[#F8F3EA]/52 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Outletmu. All rights reserved.</p>
        <a
          href={customerMenuDemoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2F8A68] transition hover:text-[#28795b] dark:text-[#B9F1DA] dark:hover:text-white"
        >
          Demo Menu Pelanggan
        </a>
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
      <Navbar />
      <HeroSection />
      <BusinessSolutionSection />
      <StaffFeatureSection />
      <CustomerFeatureSection />
      <FlowSection />
      <ProblemSolutionSection />
      <OperationsCTASection />
      <ProductPreviewSection />
      <WhatsAppBotSection />
      <PricingDeckSection />
      <PackageComparisonSection />
      <AddOnsSection />
      <WhyOutletmuSection />
      <FAQSection />
      <FinalCTASection />
      <Footer theme={theme} />
      <a href={whatsappLink} className={landingStyles.mobileStickyCta} aria-label="Konsultasi via WhatsApp Outletmu">
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Konsultasi via WhatsApp
      </a>
    </main>
  );
}
