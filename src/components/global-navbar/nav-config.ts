export type NavLeafItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  items: NavLeafItem[];
};

export type NavTopItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "group"; label: string; items: NavLeafItem[] };

export const globalWhatsappLink =
  "https://wa.me/6281291960227?text=Halo%20Outletmu%2C%20saya%20mau%20konsultasi%20sistem%20kasir%20untuk%20outlet%20saya";

export const globalLoginLink = "https://kasir.outletmu.store/login";

export const globalNavItems: NavTopItem[] = [
  {
    kind: "group",
    label: "Produk",
    items: [
      {
        label: "Aplikasi Kasir Cafe",
        href: "/pos-kasir-cafe",
        description: "POS bulanan untuk cafe & coffee shop",
      },
      {
        label: "Aplikasi Kasir Restoran",
        href: "/aplikasi-kasir-restoran",
        description: "Untuk restoran dengan dapur dan banyak meja",
      },
      {
        label: "Sistem Kasir Coffee Shop",
        href: "/sistem-kasir-coffee-shop",
        description: "Khusus kedai kopi dan small cafe",
      },
      {
        label: "Software Kasir F&B",
        href: "/software-kasir-fnb",
        description: "POS untuk segala bisnis F&B bulanan",
      },
      {
        label: "Sistem Kasir UMKM",
        href: "/sistem-kasir-umkm",
        description: "Toko, warung, dan UMKM",
      },
      {
        label: "Website Kasir Otomatis",
        href: "/website-kasir-otomatis",
        description: "POS berbasis web untuk semua outlet",
      },
    ],
  },
  {
    kind: "group",
    label: "Solusi",
    items: [
      {
        label: "QR Order Meja",
        href: "/qr-order-meja",
        description: "Customer scan, order, kasir terima otomatis",
      },
      {
        label: "Menu Digital Cafe",
        href: "/menu-digital-cafe",
        description: "Menu digital responsif tanpa cetak ulang",
      },
    ],
  },
  {
    kind: "group",
    label: "Fitur",
    items: [
      {
        label: "Laporan WhatsApp",
        href: "/fitur/laporan-whatsapp",
        description: "Laporan harian otomatis ke WhatsApp owner",
      },
      {
        label: "Kitchen Display",
        href: "/fitur/kitchen-display",
        description: "Tampilan order dapur per status",
      },
    ],
  },
  {
    kind: "group",
    label: "Panduan",
    items: [
      {
        label: "Panduan Memilih Aplikasi Kasir",
        href: "/panduan/memilih-aplikasi-kasir-cafe",
        description: "Cara memilih POS yang tepat",
      },
      {
        label: "Panduan QR Order Meja",
        href: "/panduan/qr-order-meja-cafe",
        description: "Setup QR order untuk dine-in",
      },
    ],
  },
  { kind: "link", label: "Harga", href: "/harga" },
];
