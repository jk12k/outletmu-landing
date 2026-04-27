"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  ChevronDown,
  ChefHat,
  ClipboardList,
  Coffee,
  CreditCard,
  LayoutDashboard,
  LineChart,
  MessageCircle,
  Package,
  QrCode,
  ReceiptText,
  ScanLine,
  Search,
  ShoppingCart,
  Sparkles,
  Store,
  Table2,
  Utensils,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const whatsappLink =
  "https://wa.me/6281291960227?text=Halo%20Kasirflow%2C%20saya%20mau%20konsultasi%20paket%20POS%20dan%20QR%20Order.";

const navItems = [
  { label: "Flow", href: "#flow" },
  { label: "Fitur", href: "#features" },
  { label: "Preview", href: "#preview" },
  { label: "Harga", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const heroFeatures = [
  "Website Menu",
  "QR Order",
  "POS Kasir",
  "Stok & Restock",
  "Laporan",
  "WhatsApp Automation",
];

const problems = [
  "Order masih dicatat manual",
  "Menu harus dicetak ulang saat harga berubah",
  "Stok sering habis tanpa notifikasi",
  "Owner sulit cek omzet harian",
  "Pesanan meja sering tertukar",
  "Laporan harus dihitung ulang",
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
    title: "Transaksi",
    icon: CreditCard,
    copy: "Pembayaran dicatat dan riwayat tersimpan.",
  },
  {
    title: "Stok update",
    icon: Package,
    copy: "Stok dan restock lebih mudah dipantau.",
  },
  {
    title: "Laporan",
    icon: LineChart,
    copy: "Owner melihat omzet dan performa penjualan.",
  },
  {
    title: "WhatsApp",
    icon: MessageCircle,
    copy: "Automation bantu cek omzet dan stok lebih cepat.",
  },
];

const features: Array<{
  title: string;
  copy: string;
  icon: LucideIcon;
  highlight?: boolean;
}> = [
  {
    title: "Website Menu Digital",
    copy: "Menu online dengan kategori, foto, harga, deskripsi, dan status produk yang mudah diperbarui.",
    icon: Store,
    highlight: true,
  },
  {
    title: "QR Order",
    copy: "Pelanggan scan QR, pilih menu dari HP, lalu pesanan diteruskan ke alur kasir.",
    icon: QrCode,
    highlight: true,
  },
  {
    title: "QR Table",
    copy: "Nomor meja otomatis terbaca agar pesanan dine-in tidak tertukar.",
    icon: Table2,
    highlight: true,
  },
  {
    title: "POS Basic",
    copy: "Transaksi, order, dan riwayat penjualan dalam tampilan yang mudah dipakai kasir.",
    icon: WalletCards,
  },
  {
    title: "Stok & Restock",
    copy: "Pantau stok, restock manual, dan siapkan stok otomatis saat bisnis naik level.",
    icon: Package,
  },
  {
    title: "Laporan Penjualan",
    copy: "Omzet, jumlah transaksi, dan produk terlaris bisa dibaca cepat oleh owner.",
    icon: BarChart3,
  },
  {
    title: "WhatsApp Automation",
    copy: "Owner dapat cek omzet, cek stok, dan menerima notifikasi lewat WhatsApp.",
    icon: MessageCircle,
  },
];

const useCases: Array<{ title: string; icon: LucideIcon }> = [
  { title: "Cafe", icon: Coffee },
  { title: "Coffee shop", icon: Store },
  { title: "Restoran kecil", icon: Utensils },
  { title: "Kedai makanan/minuman", icon: ChefHat },
  { title: "Bakery", icon: Store },
  { title: "Minimarket kecil", icon: Building2 },
  { title: "UMKM retail", icon: ReceiptText },
  { title: "Bisnis dine-in", icon: Table2 },
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
    metric: "Rp1,25 jt hari ini",
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
];

const pricingPlans = [
  {
    name: "Menu Starter",
    price: "Rp199.000",
    suffix: "/bulan",
    setup: "Setup & onboarding Rp299.000",
    label: "Mulai Digital",
    cta: "Konsultasi Paket Starter",
    audience: "Untuk UMKM yang butuh menu digital, order, dan POS basic.",
    features: [
      "Website menu digital",
      "QR menu/order biasa",
      "POS basic",
      "Input transaksi sederhana",
      "Riwayat transaksi",
      "Dashboard admin/kasir",
      "Laporan penjualan basic",
      "Manajemen produk/menu",
      "Stok/restock basic",
      "Hosting & maintenance",
    ],
  },
  {
    name: "Table POS Basic",
    price: "Rp499.000",
    suffix: "/bulan",
    setup: "Setup & onboarding Rp599.000",
    label: "Paling Direkomendasikan",
    cta: "Konsultasi Paket Table POS",
    audience: "Untuk cafe/resto kecil yang butuh QR Table dan POS basic.",
    featured: true,
    features: [
      "Semua fitur Menu Starter",
      "QR Table/per meja",
      "Nomor meja otomatis terbaca",
      "Pesanan masuk ke dashboard kasir",
      "Status pesanan",
      "Laporan penjualan harian",
      "Backup database berkala",
      "Multi-user basic",
      "Role admin dan kasir",
    ],
  },
  {
    name: "Pro Automation",
    price: "Rp799.000",
    suffix: "/bulan",
    setup: "Setup & onboarding Rp999.000",
    label: "Lebih Otomatis",
    cta: "Konsultasi Paket Pro",
    audience: "Untuk owner yang ingin sistem lebih otomatis.",
    features: [
      "Semua fitur Table POS Basic",
      "POS lebih lengkap",
      "Stok otomatis",
      "Laporan harian, mingguan, bulanan",
      "Tanya omzet via WhatsApp",
      "Tanya stok via WhatsApp",
      "Notifikasi stok via WhatsApp",
      "WhatsApp automation",
      "Export laporan",
    ],
  },
  {
    name: "Business Custom",
    price: "Mulai Rp1.299.000",
    suffix: "/bulan",
    setup: "Setup & onboarding Rp1.500.000-Rp3.000.000",
    label: "Custom Workflow",
    cta: "Diskusikan Kebutuhan",
    audience: "Untuk resto/cafe serius, multi-outlet, atau sistem custom.",
    features: [
      "Semua fitur Pro Automation",
      "Multi-outlet",
      "QR Table advanced",
      "Kitchen display/dashboard dapur",
      "Laporan custom",
      "Custom domain",
      "Integrasi printer struk",
      "Custom workflow",
      "Setup khusus sesuai kebutuhan bisnis",
    ],
  },
];

const whyPoints = [
  "Bisa mulai dari paket kecil",
  "Sistem bisa dikembangkan bertahap",
  "Cocok untuk owner yang belum teknis",
  "Setup dibantu dari awal",
  "Bisa custom sesuai alur bisnis",
  "Support lebih personal",
];

const faqs = [
  {
    question: "Apakah Kasirflow cocok untuk bisnis kecil?",
    answer:
      "Ya. Kasirflow dibuat untuk cafe, kedai, restoran kecil, minimarket, dan UMKM yang ingin mulai memakai sistem digital tanpa sistem enterprise yang rumit.",
  },
  {
    question: "Apakah harus install aplikasi?",
    answer:
      "Untuk MVP, sistem berjalan berbasis web sehingga bisa diakses dari browser di HP, tablet, atau laptop.",
  },
  {
    question: "Apakah bisa pakai QR per meja?",
    answer: "Bisa, fitur QR Table/per meja tersedia mulai dari paket Table POS Basic.",
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

function FadeBlock({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Badge({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm",
        tone === "light"
          ? "border border-[#2F8A68]/15 bg-white/85 text-[#2F8A68]"
          : "border border-white/15 bg-white/10 text-white",
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
    <FadeBlock className={cn("relative z-10 mx-auto max-w-4xl", align === "center" ? "text-center" : "text-left")}>
      <Badge tone={tone}>{badge}</Badge>
      <h2
        className={cn(
          "mt-5 text-3xl font-semibold leading-[1.08] md:text-5xl lg:text-6xl",
          tone === "dark" ? "text-white" : "text-[#14213D]",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mx-auto mt-5 max-w-2xl text-base leading-8 md:text-lg",
            align === "left" && "mx-0",
            tone === "dark" ? "text-white/68" : "text-[#14213D]/65",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </FadeBlock>
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
    <section id={id} className={cn("relative overflow-hidden px-5 py-20 md:px-8 md:py-28", className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
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
          "border border-[#14213D]/10 bg-white/90 text-[#14213D] shadow-sm hover:-translate-y-0.5 hover:border-[#2F8A68]/30",
        variant === "light" &&
          "bg-white text-[#103F31] shadow-[0_22px_55px_rgba(16,63,49,0.2)] hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </a>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#14213D]/5 bg-[#F8F3EA]/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#" className="flex items-center gap-3" aria-label="Kasirflow">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#103F31] text-white shadow-[0_18px_40px_rgba(16,63,49,0.24)]">
            <QrCode className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-xl font-bold text-[#14213D]">Kasirflow</span>
        </a>
        <nav className="hidden items-center gap-8 rounded-full border border-[#14213D]/5 bg-white/55 px-6 py-3 shadow-sm md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-semibold text-[#14213D]/68 transition hover:text-[#2F8A68]">
              {item.label}
            </a>
          ))}
        </nav>
        <ButtonLink href={whatsappLink} className="hidden md:inline-flex">
          Konsultasi Gratis
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
        <a
          href={whatsappLink}
          aria-label="Konsultasi Gratis via WhatsApp"
          className="grid h-11 w-11 place-items-center rounded-full bg-[#2F8A68] text-white shadow-lg md:hidden"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}

function HeroCardDeck() {
  return (
    <FadeBlock className="relative mx-auto mt-12 min-h-[580px] w-full max-w-[350px] min-w-0 sm:max-w-[560px] lg:mt-0 lg:max-w-[640px]">
      <div className="absolute inset-x-0 top-8 text-center text-[6.5rem] font-black leading-none text-white/70 md:text-[9rem]">
        FLOW
      </div>
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2F8A68]/14 blur-3xl" />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[3%] top-20 h-[430px] w-[78%] rotate-[-9deg] rounded-[2.1rem] border border-white/70 bg-white/55 shadow-[0_35px_90px_rgba(20,33,61,0.12)] backdrop-blur"
      />
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[2%] top-24 h-[430px] w-[78%] rotate-[8deg] rounded-[2.1rem] bg-[#103F31]/88 shadow-[0_35px_90px_rgba(16,63,49,0.22)]"
      />

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 mx-auto w-full rounded-[2.25rem] border border-white/80 bg-white/88 p-4 shadow-[0_42px_100px_rgba(20,33,61,0.16)] backdrop-blur-xl sm:w-[92%] md:p-7"
      >
        <div className="rounded-[1.8rem] bg-[#103F31] p-5 text-white shadow-[0_28px_65px_rgba(16,63,49,0.26)] md:p-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/52">
                KASIRFLOW
              </p>
              <h3 className="mt-3 text-3xl font-semibold leading-tight">
                Complete Business Flow
              </h3>
            </div>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-[#103F31]">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>

          <div className="mt-7 grid gap-3">
            {heroFeatures.map((feature, index) => (
              <div
                key={feature}
                className={cn(
                  "flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3",
                  index === 1 && "sm:ml-5",
                  index === 3 && "sm:mr-6",
                )}
              >
                <span className="flex items-center gap-3 text-sm font-semibold">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[#103F31]">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {feature}
                </span>
                <span className="text-xs font-semibold text-white/48">Ready</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.4rem] bg-[#F8F3EA] p-5">
            <p className="text-sm font-semibold text-[#14213D]/55">Order aktif</p>
            <p className="mt-2 text-3xl font-semibold text-[#14213D]">7</p>
          </div>
          <div className="rounded-[1.4rem] bg-[#F8F3EA] p-5">
            <p className="text-sm font-semibold text-[#14213D]/55">Omzet hari ini</p>
            <p className="mt-2 text-3xl font-semibold text-[#14213D]">Rp1,25 jt</p>
          </div>
        </div>
      </motion.div>

      <div className="absolute -bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/65 px-2 py-1 shadow-sm backdrop-blur">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[#14213D] shadow-md">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="h-2 w-8 rounded-full bg-[#2F8A68]" />
        <span className="h-2 w-2 rounded-full bg-[#14213D]/20" />
        <span className="h-2 w-2 rounded-full bg-[#14213D]/20" />
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#103F31] text-white shadow-md">
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </FadeBlock>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-16 md:px-8 md:pb-32 md:pt-24">
      <div className="absolute left-0 top-16 h-72 w-72 rounded-full bg-white/80 blur-3xl" />
      <div className="absolute right-0 top-36 h-96 w-96 rounded-full bg-[#2F8A68]/10 blur-3xl" />
      <div className="mx-auto grid w-full max-w-7xl min-w-0 items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
        <FadeBlock className="min-w-0">
          <Badge>POS, QR Order & Website Menu</Badge>
          <h1 className="mt-6 max-w-4xl text-[2.55rem] font-semibold leading-[1.08] text-[#14213D] md:text-6xl lg:text-7xl">
            Kasir & QR Order, dibuat mudah untuk bisnis harian.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#14213D]/68 md:text-xl">
            Satu sistem untuk website menu digital, QR order, transaksi kasir,
            stok, laporan, dan WhatsApp automation.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={whatsappLink}>
              Konsultasi Gratis
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#pricing" variant="secondary">
              Lihat Paket
            </ButtonLink>
          </div>
          <p className="mt-7 max-w-xl text-sm leading-7 text-[#14213D]/58">
            Cocok untuk cafe, restoran kecil, kedai, bakery, minimarket, dan UMKM.
          </p>
        </FadeBlock>
        <HeroCardDeck />
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <PageSection className="bg-white">
      <SectionTitle
        badge="Masalah operasional"
        title="Operasional bisnis sering berantakan karena semuanya masih terpisah."
        subtitle="Menu, order, stok, dan laporan sering berjalan sendiri-sendiri. Kasirflow menyatukannya ke dalam satu alur yang lebih rapi."
      />
      <div className="mt-14 rounded-[2.3rem] bg-[#F8F3EA] p-4 shadow-[inset_0_0_0_1px_rgba(20,33,61,0.04)] md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <FadeBlock key={problem} delay={index * 0.04}>
              <motion.article
                whileHover={{ y: -6, scale: 1.01 }}
                className="h-full rounded-[1.7rem] border border-white/80 bg-white/76 p-6 shadow-[0_22px_50px_rgba(20,33,61,0.07)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#103F31] text-white">
                  <ClipboardList className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-7 text-xl font-semibold leading-7 text-[#14213D]">
                  {problem}
                </h3>
              </motion.article>
            </FadeBlock>
          ))}
        </div>
      </div>
    </PageSection>
  );
}

function FlowSection() {
  return (
    <PageSection id="flow">
      <SectionTitle
        badge="Solution flow"
        title="Dari scan QR sampai laporan, semuanya mengalir dalam satu sistem."
        subtitle="Alur dibuat sederhana untuk pelanggan, kasir, dan owner. Bukan sistem rumit yang memaksa bisnis berubah total."
      />
      <FadeBlock className="relative mt-14 rounded-[2.5rem] border border-white/80 bg-white/70 p-5 shadow-[0_35px_90px_rgba(20,33,61,0.1)] backdrop-blur md:p-7">
        <div className="absolute left-8 top-8 text-[5rem] font-black leading-none text-[#F8F3EA] md:text-[9rem]">
          FLOW
        </div>
        <div className="relative grid gap-4 md:grid-cols-7">
          {flowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                whileHover={{ y: -8 }}
                className={cn(
                  "rounded-[1.6rem] bg-white p-5 shadow-sm",
                  index === 0 || index === 6 ? "md:translate-y-8" : "",
                  index === 3 ? "bg-[#103F31] text-white" : "text-[#14213D]",
                )}
              >
                <span
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-2xl",
                    index === 3 ? "bg-white text-[#103F31]" : "bg-[#F8F3EA] text-[#2F8A68]",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-6 text-xs font-bold uppercase text-current/40">0{index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-current/62">{step.copy}</p>
              </motion.article>
            );
          })}
        </div>
      </FadeBlock>
    </PageSection>
  );
}

function FeatureShowcase() {
  return (
    <PageSection id="features" className="bg-[#103F31] text-white">
      <div className="absolute inset-x-0 top-0 h-56 bg-white/[0.03]" />
      <SectionTitle
        badge="Feature showcase"
        title="Fitur utama untuk operasional harian."
        subtitle="Tampilan dibuat benefit-first: owner paham manfaatnya, kasir paham alurnya, pelanggan paham cara order."
        tone="dark"
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const large = index < 3;
          return (
            <FadeBlock
              key={feature.title}
              delay={index * 0.04}
              className={cn(large ? "lg:col-span-2" : "lg:col-span-3")}
            >
              <motion.article
                whileHover={{ y: -8, scale: 1.01 }}
                className={cn(
                  "relative h-full overflow-hidden rounded-[2rem] border p-6 shadow-[0_28px_70px_rgba(0,0,0,0.16)]",
                  feature.highlight
                    ? "border-white/18 bg-white text-[#14213D]"
                    : "border-white/10 bg-white/[0.08] text-white",
                )}
              >
                <div className="absolute right-5 top-4 text-7xl font-black text-current opacity-[0.04]">
                  0{index + 1}
                </div>
                <span
                  className={cn(
                    "grid h-13 w-13 place-items-center rounded-2xl",
                    feature.highlight ? "bg-[#103F31] text-white" : "bg-white text-[#103F31]",
                  )}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-8 text-2xl font-semibold">{feature.title}</h3>
                <p className="mt-4 text-sm leading-7 text-current/68">{feature.copy}</p>
                {feature.highlight ? (
                  <div className="mt-8 rounded-2xl bg-[#F8F3EA] p-4 text-sm font-semibold text-[#2F8A68]">
                    Bagian utama dari flow Kasirflow
                  </div>
                ) : null}
              </motion.article>
            </FadeBlock>
          );
        })}
      </div>
    </PageSection>
  );
}

function UseCaseSection() {
  return (
    <PageSection className="bg-white">
      <SectionTitle
        badge="Jenis bisnis"
        title="Cocok untuk berbagai jenis bisnis."
        subtitle="Dari kedai kecil sampai minimarket, Kasirflow dibuat untuk owner yang ingin mulai digital tanpa sistem yang berat."
      />
      <FadeBlock className="mt-14 rounded-[2.4rem] bg-[#F8F3EA] p-5 md:p-7">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                className="flex min-h-28 items-center gap-4 rounded-[1.6rem] border border-white/80 bg-white/78 p-5 shadow-sm"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#103F31] text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="font-semibold text-[#14213D]">{item.title}</p>
              </motion.div>
            );
          })}
        </div>
      </FadeBlock>
    </PageSection>
  );
}

function ProductPreviewSection() {
  const [activePreview, setActivePreview] = useState(0);
  const preview = previews[activePreview];

  return (
    <PageSection id="preview">
      <SectionTitle
        badge="Product preview"
        title="Preview produk yang terasa simpel, bukan admin dashboard kaku."
        subtitle="Semua ini dummy mockup untuk landing page. Belum ada backend, database, auth, atau POS asli."
      />
      <FadeBlock className="mt-14 rounded-[2.6rem] border border-white/80 bg-white/72 p-5 shadow-[0_40px_100px_rgba(20,33,61,0.12)] backdrop-blur md:p-7">
        <div className="flex gap-3 overflow-x-auto pb-4 [scrollbar-width:none]">
          {previews.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActivePreview(index)}
              className={cn(
                "min-h-12 shrink-0 rounded-full px-5 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-[#2F8A68]/20",
                activePreview === index
                  ? "bg-[#103F31] text-white shadow-lg"
                  : "bg-[#F8F3EA] text-[#14213D]/62 hover:text-[#14213D]",
              )}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={preview.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.24 }}
              className="rounded-[2rem] bg-[#103F31] p-7 text-white shadow-[0_24px_70px_rgba(16,63,49,0.22)]"
            >
              <p className="text-sm font-semibold text-white/55">{preview.eyebrow}</p>
              <h3 className="mt-3 text-4xl font-semibold">{preview.title}</h3>
              <p className="mt-5 text-base leading-8 text-white/68">{preview.copy}</p>
              <div className="mt-9 rounded-[1.5rem] bg-white/10 p-5">
                <p className="text-sm text-white/56">Highlight</p>
                <p className="mt-2 text-4xl font-semibold">{preview.metric}</p>
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
              className="relative overflow-hidden rounded-[2rem] bg-[#F8F3EA] p-4 md:p-7"
            >
              <div className="absolute right-7 top-6 text-8xl font-black text-white/70">APP</div>
              <div className="relative rounded-[1.7rem] bg-white p-5 shadow-[0_25px_70px_rgba(20,33,61,0.08)]">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#2F8A68]">Kasirflow</p>
                    <h4 className="mt-1 text-2xl font-semibold text-[#14213D]">
                      {preview.title}
                    </h4>
                  </div>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#14213D]/38" />
                    <div className="rounded-full border border-[#14213D]/8 bg-[#F8F3EA] py-3 pl-11 pr-5 text-sm font-semibold text-[#14213D]/45">
                      Cari data
                    </div>
                  </div>
                </div>
                <div className="mt-7 grid gap-3">
                  {preview.rows.map((row, index) => (
                    <div
                      key={row}
                      className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-[#14213D]/6 bg-[#F8F3EA]/80 p-4"
                    >
                      <span className="flex items-center gap-3 text-sm font-semibold text-[#14213D]">
                        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-[#2F8A68]">
                          {index + 1}
                        </span>
                        {row}
                      </span>
                      <span className="hidden rounded-full bg-white px-3 py-1 text-xs font-bold text-[#2F8A68] sm:block">
                        Aktif
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-col gap-3 rounded-[1.4rem] bg-[#103F31] p-5 text-white sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-semibold">Flow siap diproses</span>
                  <span className="inline-flex items-center gap-2 text-sm text-white/68">
                    Lihat detail
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </FadeBlock>
    </PageSection>
  );
}

function PricingPlanCard({
  plan,
  active = false,
  compact = false,
}: {
  plan: (typeof pricingPlans)[number];
  active?: boolean;
  compact?: boolean;
}) {
  const isDark = active && plan.featured;
  const shownFeatures = compact ? plan.features.slice(0, 6) : plan.features;

  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-6 shadow-[0_35px_90px_rgba(20,33,61,0.12)] md:rounded-[2.2rem] md:p-7",
        isDark
          ? "border-[#2F8A68]/50 bg-[#103F31] text-white"
          : "border-white/80 bg-white text-[#14213D]",
      )}
    >
      <div
        className={cn(
          "absolute -right-6 -top-8 h-44 w-44 rounded-full blur-2xl",
          isDark ? "bg-[#2F8A68]/25" : "bg-[#2F8A68]/10",
        )}
      />
      <div className="relative z-10">
        <span
          className={cn(
            "inline-flex rounded-full px-4 py-2 text-xs font-bold",
            isDark ? "bg-white text-[#103F31]" : "bg-[#F8F3EA] text-[#2F8A68]",
          )}
        >
          {plan.label}
        </span>
        <h3 className="mt-5 text-3xl font-semibold leading-tight">{plan.name}</h3>
        <p className={cn("mt-3 text-sm leading-7", isDark ? "text-white/68" : "text-[#14213D]/62")}>
          {plan.audience}
        </p>
      </div>
      <div
        className={cn(
          "relative z-10 mt-6 rounded-[1.7rem] border p-5",
          isDark ? "border-white/12 bg-white/8" : "border-[#14213D]/8 bg-[#F8F3EA]/58",
        )}
      >
        <div className="flex flex-wrap items-end gap-2">
          <span className="text-4xl font-semibold leading-none md:text-[2.9rem]">{plan.price}</span>
          <span className={cn("text-sm font-bold", isDark ? "text-white/55" : "text-[#14213D]/45")}>
            {plan.suffix}
          </span>
        </div>
        <div
          className={cn(
            "mt-4 rounded-2xl px-4 py-3 text-sm font-bold leading-6",
            isDark ? "bg-white/10 text-white/82" : "bg-white text-[#14213D]/62",
          )}
        >
          {plan.setup}
        </div>
      </div>
      <ul className="relative z-10 mt-6 grid gap-2.5">
        {shownFeatures.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-6">
            <span
              className={cn(
                "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                isDark ? "bg-white text-[#103F31]" : "bg-[#E8F3EF] text-[#2F8A68]",
              )}
            >
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className={isDark ? "text-white/82" : "text-[#14213D]/66"}>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="relative z-10 mt-auto pt-6">
        <ButtonLink href={whatsappLink} variant={isDark ? "light" : "primary"} className="w-full">
          {plan.cta}
        </ButtonLink>
      </div>
    </article>
  );
}

function PricingDeckSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const mobileDeckRef = useRef<HTMLDivElement>(null);
  const mobilePlans = [pricingPlans[1], pricingPlans[0], pricingPlans[2], pricingPlans[3]];

  const go = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + pricingPlans.length) % pricingPlans.length);
  };

  const relativeOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > pricingPlans.length / 2) diff -= pricingPlans.length;
    if (diff < -pricingPlans.length / 2) diff += pricingPlans.length;
    return diff;
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

  return (
    <PageSection id="pricing" className="bg-white">
      <div className="absolute left-1/2 top-24 -translate-x-1/2 text-[7rem] font-black leading-none text-[#F8F3EA] md:text-[14rem]">
        PRICE
      </div>
      <SectionTitle
        badge="Harga bulanan"
        title="Pilih paket sesuai kebutuhan bisnismu."
        subtitle="Mulai dari menu digital dan POS basic, sampai QR Table, stok otomatis, laporan, dan WhatsApp automation."
      />
      <FadeBlock className="relative z-10 mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3">
        {["Hosting termasuk", "Maintenance termasuk", "Dibantu setup awal"].map((item) => (
          <span key={item} className="rounded-full bg-[#F8F3EA] px-4 py-2 text-sm font-semibold text-[#14213D]/62">
            {item}
          </span>
        ))}
      </FadeBlock>

      <div className="relative z-10 mt-14 hidden min-h-[860px] items-start justify-center md:flex">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Paket sebelumnya"
          className="absolute left-0 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-[#14213D] shadow-[0_18px_45px_rgba(20,33,61,0.14)] focus:outline-none focus:ring-4 focus:ring-[#2F8A68]/20"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Paket berikutnya"
          className="absolute right-0 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-[#103F31] text-white shadow-[0_18px_45px_rgba(16,63,49,0.22)] focus:outline-none focus:ring-4 focus:ring-[#2F8A68]/20"
        >
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="relative h-[830px] w-full max-w-6xl">
          {pricingPlans.map((plan, index) => {
            const offset = relativeOffset(index);
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            return (
              <motion.button
                key={plan.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="absolute left-1/2 top-0 block h-[805px] w-[470px] cursor-pointer text-left focus:outline-none focus:ring-4 focus:ring-[#2F8A68]/20"
                style={{ transformOrigin: "center top" }}
                animate={{
                  x: -235 + offset * 330,
                  y: isActive ? 0 : 42 + absOffset * 10,
                  scale: isActive ? 1 : 0.86 - Math.min(absOffset, 2) * 0.04,
                  rotate: isActive ? 0 : offset * -5,
                  opacity: absOffset > 1 ? 0.34 : isActive ? 1 : 0.62,
                  zIndex: isActive ? 20 : 10 - absOffset,
                }}
                transition={{ type: "spring", stiffness: 210, damping: 28 }}
              >
                <PricingPlanCard plan={plan} active={isActive} compact={!isActive} />
              </motion.button>
            );
          })}
        </div>
      </div>

      <div
        ref={mobileDeckRef}
        onScroll={syncMobileDot}
        className="relative z-10 mt-12 flex snap-x gap-5 overflow-x-auto pb-7 [scrollbar-width:none] md:hidden"
      >
        {mobilePlans.map((plan) => (
          <div key={plan.name} className="w-[86vw] shrink-0 snap-center">
            <PricingPlanCard plan={plan} active={plan.featured} />
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-1 flex justify-center gap-2 md:hidden">
        {mobilePlans.map((plan, index) => (
          <span
            key={plan.name}
            aria-label={`Paket ${plan.name}`}
            className={cn(
              "h-2.5 rounded-full transition",
              mobileActiveIndex === index ? "w-9 bg-[#2F8A68]" : "w-2.5 bg-[#14213D]/18",
            )}
          />
        ))}
      </div>

      <div className="relative z-10 mt-4 hidden justify-center gap-2 md:mt-0 md:flex">
        {pricingPlans.map((plan, index) => (
          <button
            key={plan.name}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Pilih ${plan.name}`}
            className={cn(
              "h-2.5 rounded-full transition",
              activeIndex === index ? "w-9 bg-[#2F8A68]" : "w-2.5 bg-[#14213D]/18",
            )}
          />
        ))}
      </div>
    </PageSection>
  );
}

function WhyKasirflowSection() {
  return (
    <PageSection>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionTitle
          align="left"
          badge="Kenapa Kasirflow"
          title="Bukan sekadar kasir. Ini flow operasional bisnis yang lebih rapi."
          subtitle="Kasirflow dibuat supaya owner bisa mulai dari kebutuhan paling penting, lalu berkembang bertahap sesuai alur bisnis."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {whyPoints.map((point, index) => (
            <FadeBlock key={point} delay={index * 0.04}>
              <motion.div
                whileHover={{ y: -6 }}
                className="flex min-h-28 items-start gap-4 rounded-[1.7rem] border border-white/80 bg-white/72 p-6 shadow-[0_22px_60px_rgba(20,33,61,0.08)]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#2F8A68] text-white">
                  <Check className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="font-semibold leading-7 text-[#14213D]">{point}</p>
              </motion.div>
            </FadeBlock>
          ))}
        </div>
      </div>
    </PageSection>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <PageSection id="faq" className="bg-white">
      <SectionTitle badge="FAQ" title="Pertanyaan yang sering muncul." />
      <div className="mx-auto mt-12 grid max-w-4xl gap-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <FadeBlock key={faq.question} delay={index * 0.03}>
              <div className="overflow-hidden rounded-[1.5rem] border border-[#14213D]/8 bg-[#F8F3EA]/62">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex min-h-16 w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-[#14213D] focus:outline-none focus:ring-4 focus:ring-[#2F8A68]/20"
                  aria-expanded={isOpen}
                >
                  {faq.question}
                  <ChevronDown className={cn("h-5 w-5 shrink-0 transition", isOpen && "rotate-180")} aria-hidden="true" />
                </button>
                {isOpen ? <div className="px-6 pb-6 text-sm leading-7 text-[#14213D]/65">{faq.answer}</div> : null}
              </div>
            </FadeBlock>
          );
        })}
      </div>
    </PageSection>
  );
}

function FinalCTASection() {
  return (
    <PageSection>
      <FadeBlock className="relative overflow-hidden rounded-[2.7rem] bg-[#103F31] p-8 text-white shadow-[0_45px_100px_rgba(16,63,49,0.25)] md:p-12">
        <div className="absolute right-8 top-4 text-[6rem] font-black leading-none text-white/[0.04] md:text-[12rem]">
          FLOW
        </div>
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Badge tone="dark">Konsultasi via WhatsApp</Badge>
            <h2 className="mt-6 text-3xl font-semibold leading-tight md:text-5xl">
              Siap bikin operasional bisnis lebih rapi?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
              Konsultasikan kebutuhan cafe, restoran, minimarket, atau UMKM kamu.
              Tim Kasirflow akan bantu rekomendasikan paket yang paling cocok.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5">
            <div className="rounded-[1.6rem] bg-white p-5 text-[#14213D]">
              <p className="text-sm font-semibold text-[#14213D]/55">Pesan otomatis</p>
              <p className="mt-3 rounded-2xl bg-[#F8F3EA] p-4 text-sm font-semibold leading-7">
                Halo Kasirflow, saya mau konsultasi paket POS dan QR Order.
              </p>
              <ButtonLink href={whatsappLink} className="mt-5 w-full">
                Konsultasi Gratis via WhatsApp
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </FadeBlock>
    </PageSection>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#14213D]/6 bg-white px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#103F31] text-white">
            <QrCode className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-bold text-[#14213D]">Kasirflow</span>
        </div>
        <p className="text-sm leading-7 text-[#14213D]/55">
          Kasir & QR Order, dibuat mudah untuk bisnis harian.
        </p>
      </div>
    </footer>
  );
}

export function KasirflowLanding() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F3EA]">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <FlowSection />
      <FeatureShowcase />
      <UseCaseSection />
      <ProductPreviewSection />
      <PricingDeckSection />
      <WhyKasirflowSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
