"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  LayoutDashboard,
  LineChart,
  MessageCircle,
  Package,
  QrCode,
  ScanLine,
  Search,
  ShoppingCart,
  Sparkles,
  Store,
  Table2,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import landingStyles from "@/styles/landing.module.scss";
import heroStyles from "@/styles/heroDeck.module.scss";
import pricingStyles from "@/styles/pricingDeck.module.scss";

const whatsappLink =
  "https://wa.me/6281291960227?text=Halo%20Kasirflow%2C%20saya%20mau%20konsultasi%20paket%20POS%20dan%20QR%20Order.";

const navItems = [
  { label: "Flow", href: "#flow" },
  { label: "Fitur", href: "#features" },
  { label: "Preview", href: "#preview" },
  { label: "WhatsApp", href: "#whatsapp" },
  { label: "Harga", href: "#pricing" },
];

const heroSlides = [
  {
    eyebrow: "KASIRFLOW",
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
      { label: "Omzet hari ini", value: "Rp1,25 jt" },
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
  { label: "Omzet hari ini", value: "Rp1,25 jt", icon: BarChart3 },
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

type PricingPlan = (typeof pricingPlans)[number];

function useLandingGsap(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const revealItems = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      revealItems.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.78,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: item,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

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
    }, rootRef);

    return () => ctx.revert();
  }, [rootRef]);
}

function Badge({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm",
        tone === "light"
          ? "border border-[#2F8A68]/14 bg-white/86 text-[#2F8A68]"
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
          "mt-5 text-[clamp(2.2rem,6vw,4.9rem)] font-semibold leading-[1.04]",
          tone === "dark" ? "text-white" : "text-[#14213D]",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mx-auto mt-5 max-w-2xl text-base leading-8 md:text-lg",
            align === "left" && "lg:mx-0",
            tone === "dark" ? "text-white/68" : "text-[#14213D]/65",
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
          "border border-[#14213D]/10 bg-white text-[#14213D] shadow-sm hover:-translate-y-0.5 hover:border-[#2F8A68]/30",
        variant === "light" && "bg-white text-[#103F31] shadow-[0_22px_55px_rgba(16,63,49,0.2)] hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </a>
  );
}

function Navbar() {
  return (
    <header className={landingStyles.navbar}>
      <div className={cn(landingStyles.container, "flex items-center justify-between gap-4 py-4")}>
        <a href="#" className="flex min-w-0 items-center gap-3" aria-label="Kasirflow">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#103F31] text-white shadow-[0_18px_40px_rgba(16,63,49,0.24)]">
            <QrCode className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="truncate text-xl font-bold text-[#14213D]">Kasirflow</span>
        </a>
        <nav className="hidden items-center gap-7 rounded-full border border-[#14213D]/5 bg-white/68 px-6 py-3 shadow-sm lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-semibold text-[#14213D]/68 transition hover:text-[#2F8A68]">
              {item.label}
            </a>
          ))}
        </nav>
        <ButtonLink href={whatsappLink} className="hidden lg:inline-flex">
          Konsultasi Gratis
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
        <a
          href={whatsappLink}
          aria-label="Konsultasi Gratis via WhatsApp"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#2F8A68] text-white shadow-lg lg:hidden"
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

  return (
    <div data-reveal className={heroStyles.deckWrap}>
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
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setIsDragging(false);

            if (info.offset.x < -64 || info.velocity.x < -420) {
              moveSlide(1);
            }

            if (info.offset.x > 64 || info.velocity.x > 420) {
              moveSlide(-1);
            }
          }}
          whileTap={{ scale: 0.992 }}
          className={cn(heroStyles.mainCard, isDragging && heroStyles.dragging)}
          aria-roledescription="carousel"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, x: 42 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -38 }}
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
      </div>
      <div className={heroStyles.controls} aria-label="Navigasi preview Kasirflow">
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
    </div>
  );
}

function HeroSection() {
  return (
    <section className={cn(landingStyles.section, landingStyles.heroSection)}>
      <div className={landingStyles.ambientOne} data-float="ambient" />
      <div className={landingStyles.ambientTwo} data-float="ambient" />
      <div className={cn(landingStyles.container, "grid min-w-0 items-center gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]")}>
        <div data-reveal className="mx-auto min-w-0 max-w-3xl text-center xl:mx-0 xl:text-left">
      <Badge>POS, QR Order & Website Menu</Badge>
          <h1 className="mt-6 text-[clamp(2.25rem,9.6vw,4.95rem)] font-semibold leading-[1.04] text-[#14213D]">
            Kasir & QR Order, dibuat mudah untuk bisnis harian.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#14213D]/68 md:text-xl xl:mx-0">
            Satu sistem untuk website menu digital, QR order, transaksi kasir,
            stok, laporan, dan WhatsApp automation.
          </p>
          <div className="mx-auto mt-9 grid max-w-md gap-3 sm:flex sm:max-w-none sm:justify-center xl:justify-start">
            <ButtonLink href={whatsappLink}>
              Konsultasi Gratis
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#pricing" variant="secondary">
              Lihat Paket
            </ButtonLink>
          </div>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#14213D]/58 xl:mx-0">
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
    <PageSection className="bg-white">
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
    <PageSection id="flow" className="bg-[#F8F3EA]">
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
    <PageSection id="preview" className="bg-[#F8F3EA]">
      <div data-preview-section>
        <SectionTitle
          badge="Product preview"
          title="Dibuat simpel untuk kasir, owner, dan pelanggan."
          subtitle="Semua ini dummy mockup untuk landing page. Belum ada backend, database, auth, atau POS asli."
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
                <div className={landingStyles.mockupHeader}>
                  <div>
                    <p>Kasirflow</p>
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
    <PageSection id="whatsapp" className="bg-white">
      <div data-reveal className={landingStyles.whatsappGrid}>
        <div className={landingStyles.whatsappCopy}>
          <Badge>WhatsApp automation</Badge>
          <h2>Tanya omzet dan stok langsung dari WhatsApp.</h2>
          <p>
            Kasirflow membantu owner memantau bisnis lewat percakapan yang sederhana.
            Pilih command cepat di bawah untuk melihat simulasi balasan bot.
          </p>
        </div>

        <div className={landingStyles.chatFrame}>
          <div className={landingStyles.chatHeader}>
            <div className={landingStyles.botAvatar}>
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <strong>Kasirflow Bot</strong>
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
                    <span className={landingStyles.chatAvatar}>K</span>
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
                  <span className={landingStyles.chatAvatar}>K</span>
                  <div className={landingStyles.typingBubble} aria-label="Kasirflow Bot sedang mengetik">
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
}: {
  plan: PricingPlan;
  active?: boolean;
  compact?: boolean;
}) {
  const isDark = active && plan.featured;
  const shownFeatures = compact ? plan.features.slice(0, 6) : plan.features;

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
          <strong>{plan.price}</strong>
          <small>{plan.suffix}</small>
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
      </ul>
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

      const spread = Math.min(Math.max(window.innerWidth * 0.22, 240), 340);

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
          y: offset === 0 ? 0 : isBack ? 76 : 42,
          rotate: offset === 0 || isBack ? 0 : side * -6,
          scale: offset === 0 ? 1 : isBack ? 0.76 : 0.86,
          autoAlpha: offset === 0 ? 1 : isBack ? 0.2 : 0.54,
          zIndex: offset === 0 ? 30 : isBack ? 4 : 16,
          duration: 0.68,
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

  return (
    <PageSection id="pricing" className="bg-white">
      <div className={pricingStyles.backgroundWord}>PAKET</div>
      <SectionTitle
        badge="Harga bulanan"
        title="Pilih paket sesuai kebutuhan bisnismu."
        subtitle="Mulai dari menu digital dan POS basic, sampai QR Table, stok otomatis, laporan, dan WhatsApp automation."
      />
      <div data-reveal className={pricingStyles.microPills}>
        {["Hosting termasuk", "Maintenance termasuk", "Dibantu setup awal"].map((item) => (
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

      <div data-reveal className={pricingStyles.mobileDeck} ref={mobileDeckRef} onScroll={syncMobileDot}>
        {mobilePlans.map((plan, index) => (
          <div
            key={plan.name}
            ref={(element) => {
              mobileCardRefs.current[index] = element;
            }}
            className={pricingStyles.mobileCard}
          >
            <PricingPlanCard plan={plan} active={plan.featured} />
          </div>
        ))}
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

function WhyKasirflowSection() {
  return (
    <PageSection>
      <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <SectionTitle
          align="left"
          badge="Kenapa Kasirflow"
          title="Bukan sekadar kasir. Ini flow operasional bisnis yang lebih rapi."
          subtitle="Kasirflow dibuat supaya owner bisa mulai dari kebutuhan paling penting, lalu berkembang bertahap sesuai alur bisnis."
        />
        <div data-reveal className="grid min-w-0 gap-4 sm:grid-cols-2">
          {whyPoints.map((point) => (
            <motion.div
              key={point}
              whileHover={{ y: -6 }}
              className="flex min-h-28 items-start gap-4 rounded-[1.7rem] border border-white/80 bg-white/72 p-6 shadow-[0_22px_60px_rgba(20,33,61,0.08)]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#2F8A68] text-white">
                <Check className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="font-semibold leading-7 text-[#14213D]">{point}</p>
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
    <PageSection id="faq" className="bg-white">
      <SectionTitle badge="FAQ" title="Pertanyaan yang sering muncul." />
      <div data-reveal className="mx-auto mt-12 grid max-w-4xl gap-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={faq.question} className="overflow-hidden rounded-[1.5rem] border border-[#14213D]/8 bg-[#F8F3EA]/62">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex min-h-16 w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-[#14213D] focus:outline-none focus:ring-4 focus:ring-[#2F8A68]/20"
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
                    <div className="px-6 pb-6 text-sm leading-7 text-[#14213D]/65">{faq.answer}</div>
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
            <h2 className="mt-6 text-[clamp(2.2rem,5vw,4.4rem)] font-semibold leading-tight text-white">
              Siap bikin operasional bisnis lebih rapi?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/70 md:text-lg lg:mx-0">
              Konsultasikan kebutuhan cafe, restoran, minimarket, atau UMKM kamu.
              Tim Kasirflow akan bantu rekomendasikan paket yang paling cocok.
            </p>
          </div>
          <div className={landingStyles.finalMessage}>
            <div>
              <p>Pesan otomatis</p>
              <span>Halo Kasirflow, saya mau konsultasi paket POS dan QR Order.</span>
              <ButtonLink href={whatsappLink} className="mt-5 w-full">
                Konsultasi Gratis via WhatsApp
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
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
        <p className="text-sm leading-7 text-[#14213D]/55">Kasir & QR Order, dibuat mudah untuk bisnis harian.</p>
      </div>
    </footer>
  );
}

export function KasirflowLanding() {
  const rootRef = useRef<HTMLElement | null>(null);

  useLandingGsap(rootRef);

  return (
    <main ref={rootRef} className={landingStyles.page}>
      <Navbar />
      <HeroSection />
      <ProductFlowShowcaseSection />
      <FlowSection />
      <FeatureShowcase />
      <ProductPreviewSection />
      <WhatsAppBotSection />
      <PricingDeckSection />
      <WhyKasirflowSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
