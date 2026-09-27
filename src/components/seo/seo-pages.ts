export type SeoPageKey =
  | "websiteKasirOtomatis"
  | "posKasirCafe"
  | "qrOrderMeja"
  | "menuDigitalCafe"
  | "aplikasiKasirRestoran"
  | "sistemKasirUmkm"
  | "softwareKasirFnb"
  | "sistemKasirCoffeeShop"
  | "laporanWhatsapp"
  | "stokCafe"
  | "kitchenDisplay"
  | "saldoMember"
  | "aplikasiKasirVsCatatanManual";

export type SeoPageContent = {
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  lead: string;
  primaryCta: string;
  intent: string;
  highlights: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
  workflow: string[];
  audience: string[];
  related: SeoPageKey[];
  guideLinks?: Array<{
    href: string;
    label: string;
    description: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
};

export { siteUrl } from "@/lib/site";

export const whatsappLink =
  "https://wa.me/6281291960227?text=Halo%20Outletmu%2C%20saya%20mau%20konsultasi%20sistem%20kasir%20untuk%20outlet%20saya";

export const seoPages: Record<SeoPageKey, SeoPageContent> = {
  websiteKasirOtomatis: {
    path: "/website-kasir-otomatis",
    title: "Website Kasir Otomatis untuk Cafe, Restoran & UMKM | Outletmu",
    description:
      "Outletmu adalah website kasir otomatis dengan POS kasir, QR order meja, menu digital, dashboard order, inventory, kitchen display, dan laporan penjualan untuk cafe, restoran, minimarket, dan UMKM.",
    h1: "Website Kasir Otomatis untuk Cafe dan Restoran",
    eyebrow: "Website kasir berbasis web",
    lead: "Outletmu membantu outlet punya sistem kasir berbasis web yang lebih rapi untuk menerima order, memproses transaksi, mengatur menu, dan membaca laporan penjualan tanpa harus membangun sistem sendiri dari nol.",
    primaryCta: "Konsultasi Website Kasir",
    intent:
      "Cocok untuk pemilik cafe, restoran, minimarket, dan UMKM yang ingin mulai memakai sistem kasir digital dengan bantuan setup dan layanan bulanan.",
    highlights: [
      "POS kasir untuk transaksi harian",
      "QR order meja dan menu digital",
      "Dashboard order untuk kasir",
      "Kitchen display untuk alur dapur",
      "Stok dan inventory basic",
      "Laporan penjualan untuk owner",
    ],
    sections: [
      {
        title: "Operasional kasir lebih terpusat",
        body: "Kasir bisa melihat order masuk, memproses pembayaran, dan mengecek riwayat transaksi dari satu dashboard. Alur ini membantu tim mengurangi catatan manual yang mudah tercecer saat jam ramai.",
      },
      {
        title: "Order dari meja langsung masuk dashboard",
        body: "Customer dapat scan QR, melihat menu digital, memilih pesanan, lalu order masuk dengan konteks meja. Tim kasir dan kitchen bisa membaca pesanan lebih cepat sebelum lanjut diproses.",
      },
      {
        title: "Layanan bulanan yang dibantu setup",
        body: "Outletmu bukan sekadar template. Tim dibantu dari setup awal, penyesuaian menu, QR, sampai pilihan paket bulanan yang sesuai skala outlet.",
      },
    ],
    workflow: [
      "Menu dan produk disiapkan di dashboard",
      "QR meja dipasang di outlet",
      "Customer scan dan pilih pesanan",
      "Order masuk ke dashboard kasir atau kitchen",
      "Kasir menyelesaikan transaksi",
      "Owner membaca stok dan laporan penjualan",
    ],
    audience: ["Cafe", "Restoran", "Minimarket", "Kedai kecil", "UMKM makanan dan minuman", "Toko lokal"],
    related: ["posKasirCafe", "qrOrderMeja", "menuDigitalCafe"],
  },
  posKasirCafe: {
    path: "/pos-kasir-cafe",
    title: "Aplikasi Kasir Cafe Bulanan dengan QR Order | Outletmu",
    description:
      "Outletmu menyediakan aplikasi kasir cafe, QR order meja, menu digital, dashboard kasir, inventory, dan laporan penjualan dalam layanan bulanan yang dibantu setup.",
    h1: "Aplikasi Kasir Cafe Bulanan dengan QR Order dan Menu Digital",
    eyebrow: "Aplikasi kasir untuk cafe",
    lead: "Outletmu membantu cafe mengelola transaksi, order meja, menu digital, stok basic, dan laporan penjualan dalam sistem kasir berbasis web yang bisa dipakai harian oleh kasir dan owner.",
    primaryCta: "Konsultasi POS Cafe",
    intent:
      "Untuk cafe yang ingin mengurangi catatan manual, membuat order meja lebih rapi, dan mulai memakai POS bulanan tanpa ribet teknis.",
    highlights: [
      "Dashboard kasir untuk order aktif",
      "Menu digital untuk customer",
      "QR meja untuk dine-in",
      "Inventory basic untuk stok penting",
      "Laporan harian untuk owner",
      "Setup awal dibantu tim Outletmu",
    ],
    sections: [
      {
        title: "Kasir cafe bisa bekerja dari dashboard",
        body: "Order aktif, meja, item pesanan, dan pembayaran dibuat lebih mudah dibaca. Ini membantu kasir cafe tetap fokus pada transaksi tanpa bolak-balik mencatat pesanan secara manual.",
      },
      {
        title: "QR order membantu saat jam ramai",
        body: "Customer dapat membuka menu dari HP, memilih item, dan mengirim order. Tim tetap bisa mengecek pesanan sebelum diproses agar alur pelayanan tetap terkendali.",
      },
      {
        title: "Paket bulanan dengan pendampingan",
        body: "Outletmu cocok untuk cafe yang butuh sistem siap dipakai, hosting, maintenance, dan support WhatsApp tanpa harus mengurus server sendiri.",
      },
    ],
    workflow: [
      "Produk cafe dibuat di menu digital",
      "QR ditempel di meja atau area kasir",
      "Order baru masuk ke dashboard",
      "Kasir konfirmasi dan proses pembayaran",
      "Kitchen melihat pesanan yang perlu disiapkan",
      "Owner cek laporan dan produk terlaris",
    ],
    audience: ["Coffee shop", "Kedai kopi", "Cafe kecil", "Cafe dine-in", "Cafe takeaway", "Outlet minuman"],
    related: ["qrOrderMeja", "menuDigitalCafe", "sistemKasirCoffeeShop"],
    guideLinks: [
      {
        href: "/panduan/memilih-aplikasi-kasir-cafe",
        label: "Panduan memilih aplikasi kasir",
        description: "Cek hal yang perlu dibandingkan sebelum cafe memilih POS, QR order, dan laporan.",
      },
      {
        href: "/panduan/laporan-penjualan-cafe",
        label: "Laporan penjualan cafe",
        description: "Pelajari laporan harian yang sebaiknya dibaca owner setelah transaksi masuk.",
      },
    ],
  },
  qrOrderMeja: {
    path: "/qr-order-meja",
    title: "QR Order Meja untuk Cafe dan Restoran | Outletmu",
    description:
      "QR order meja Outletmu membantu customer scan QR, lihat menu digital, pilih pesanan, checkout, dan order masuk ke dashboard kasir atau kitchen.",
    h1: "QR Order Meja untuk Cafe dan Restoran",
    eyebrow: "QR order dine-in",
    lead: "QR order meja Outletmu membantu customer memesan dari meja tanpa menunggu menu fisik. Pesanan masuk ke dashboard sehingga kasir dan kitchen bisa melihat order dengan konteks meja yang jelas.",
    primaryCta: "Konsultasi QR Order Meja",
    intent:
      "Untuk outlet dine-in yang ingin mempercepat pemesanan, mengurangi antrean, dan membuat order meja lebih mudah dilacak.",
    highlights: [
      "QR unik untuk meja outlet",
      "Menu digital mobile-first",
      "Order masuk dengan nomor meja",
      "Checkout dari HP customer",
      "Dashboard kasir dan kitchen",
      "Cocok untuk dine-in dan takeaway",
    ],
    sections: [
      {
        title: "Customer scan, pilih, lalu kirim order",
        body: "Setiap meja bisa memiliki QR yang membawa customer ke menu digital. Setelah memilih item, pesanan masuk ke dashboard dengan informasi meja agar tim tidak salah antar.",
      },
      {
        title: "Kasir tetap memegang kontrol",
        body: "QR order bukan berarti semua otomatis tanpa pengecekan. Kasir tetap bisa membaca order, mengonfirmasi, dan menyelesaikan transaksi sesuai alur outlet.",
      },
      {
        title: "Bisa dipakai bertahap",
        body: "Outlet bisa mulai dari menu digital dan QR meja, lalu naik ke POS kasir, kitchen display, inventory, dan laporan saat operasional makin membutuhkan sistem yang lebih lengkap.",
      },
    ],
    workflow: [
      "QR meja dibuat untuk area dine-in",
      "Customer scan QR dari HP",
      "Menu digital tampil dengan kategori produk",
      "Customer memilih item dan catatan pesanan",
      "Order masuk ke dashboard kasir atau kitchen",
      "Status pesanan dipantau sampai selesai",
    ],
    audience: ["Cafe dine-in", "Restoran keluarga", "Kedai makan", "Food court", "Resto kecil", "Outlet ramai meja"],
    related: ["menuDigitalCafe", "posKasirCafe", "softwareKasirFnb"],
    guideLinks: [
      {
        href: "/panduan/qr-order-meja-cafe",
        label: "QR order meja cafe",
        description: "Baca checklist sebelum QR ditempel di meja dan dipakai customer dine-in.",
      },
      {
        href: "/panduan/menu-digital-cafe",
        label: "Menu digital cafe",
        description: "Rapikan struktur menu online sebelum order dari HP customer masuk ke dashboard.",
      },
    ],
  },
  menuDigitalCafe: {
    path: "/menu-digital-cafe",
    title: "Menu Digital Cafe dengan QR Code dan Dashboard Order | Outletmu",
    description:
      "Menu digital Outletmu memudahkan cafe dan restoran menampilkan menu online, menerima order dari customer, dan mengelola pesanan dari dashboard.",
    h1: "Menu Digital Cafe dengan QR Code dan Dashboard Order",
    eyebrow: "Menu online untuk cafe",
    lead: "Menu digital Outletmu membuat daftar menu cafe lebih mudah dibuka dari HP customer, lengkap dengan kategori, harga, status produk, dan alur order yang bisa diteruskan ke dashboard.",
    primaryCta: "Konsultasi Menu Digital",
    intent:
      "Untuk cafe dan restoran yang ingin memperbarui menu lebih cepat, mengurangi menu cetak, dan mulai menerima order dari customer secara digital.",
    highlights: [
      "Menu online mudah dibuka dari QR",
      "Kategori produk lebih rapi",
      "Harga dan status produk bisa diperbarui",
      "Order customer masuk dashboard",
      "Cocok untuk cafe dan restoran",
      "Bisa lanjut ke POS dan laporan",
    ],
    sections: [
      {
        title: "Menu lebih mudah diperbarui",
        body: "Saat harga berubah atau produk habis, menu digital membantu tim memperbarui informasi tanpa mencetak ulang daftar menu. Customer melihat menu yang lebih relevan dari HP.",
      },
      {
        title: "Bukan cuma katalog menu",
        body: "Menu digital Outletmu dapat terhubung dengan alur order sehingga pesanan customer tidak berhenti di tampilan menu saja, tetapi bisa masuk ke dashboard kasir.",
      },
      {
        title: "Siap berkembang sesuai kebutuhan outlet",
        body: "Outlet bisa mulai sederhana dari menu online dan QR code, lalu menambah POS kasir, kitchen display, stok, dan laporan penjualan ketika operasional sudah siap.",
      },
    ],
    workflow: [
      "Data menu disiapkan dan dikelompokkan",
      "QR menu ditempel di meja atau kasir",
      "Customer membuka menu dari browser HP",
      "Customer memilih produk dan catatan",
      "Order masuk ke dashboard",
      "Kasir atau kitchen memproses pesanan",
    ],
    audience: ["Cafe", "Coffee shop", "Restoran", "Kedai minuman", "Bakery", "Outlet makanan ringan"],
    related: ["qrOrderMeja", "posKasirCafe", "websiteKasirOtomatis"],
    guideLinks: [
      {
        href: "/panduan/menu-digital-cafe",
        label: "Panduan menu digital cafe",
        description: "Susun kategori, harga, status produk, dan alur order agar mudah dibaca dari HP.",
      },
      {
        href: "/panduan/qr-order-meja-cafe",
        label: "QR order meja",
        description: "Lihat kapan menu digital perlu ditingkatkan menjadi order langsung dari meja.",
      },
    ],
  },
  aplikasiKasirRestoran: {
    path: "/aplikasi-kasir-restoran",
    title: "Aplikasi Kasir Restoran Berbasis Web | Outletmu",
    description:
      "Outletmu adalah aplikasi kasir restoran berbasis web untuk mengelola transaksi, QR order, kitchen display, inventory, dan laporan penjualan.",
    h1: "Aplikasi Kasir Restoran Berbasis Web",
    eyebrow: "Kasir restoran web-based",
    lead: "Outletmu membantu restoran mengelola transaksi, pesanan meja, kitchen flow, stok basic, dan laporan penjualan dari sistem berbasis web yang bisa diakses dari perangkat operasional.",
    primaryCta: "Konsultasi Kasir Restoran",
    intent:
      "Untuk restoran yang ingin order dan pembayaran lebih rapi tanpa harus memasang sistem yang berat sejak awal.",
    highlights: [
      "POS kasir restoran",
      "QR order meja",
      "Kitchen display untuk dapur",
      "Dashboard order masuk",
      "Inventory basic",
      "Laporan penjualan",
    ],
    sections: [
      {
        title: "Order meja dan dapur lebih mudah dipantau",
        body: "Pesanan dine-in dapat membawa informasi meja, item, dan catatan customer. Kitchen display membantu tim dapur melihat pesanan yang perlu disiapkan dengan urutan yang lebih jelas.",
      },
      {
        title: "Transaksi tetap rapi di kasir",
        body: "Kasir bisa menyelesaikan pembayaran, melihat riwayat transaksi, dan membaca laporan harian. Owner mendapat gambaran penjualan tanpa harus menyusun laporan manual dari awal.",
      },
      {
        title: "Berbasis web dan dibantu setup",
        body: "Outletmu cocok untuk restoran yang ingin mulai dari sistem web ringan, dibantu setup, dan bisa berkembang ke workflow yang lebih lengkap saat kebutuhan bertambah.",
      },
    ],
    workflow: [
      "Menu restoran dimasukkan ke dashboard",
      "QR meja disiapkan untuk customer",
      "Pesanan masuk ke dashboard kasir",
      "Kitchen display membaca order yang perlu dibuat",
      "Kasir menyelesaikan pembayaran",
      "Owner memantau laporan penjualan",
    ],
    audience: ["Restoran dine-in", "Rumah makan", "Kedai makan", "Restoran keluarga", "Cafe resto", "Outlet kuliner"],
    related: ["qrOrderMeja", "softwareKasirFnb", "kitchenDisplay"],
    guideLinks: [
      {
        href: "/panduan/qr-order-meja-cafe",
        label: "Panduan QR order meja",
        description: "Pahami alur order dari meja ke kasir atau kitchen sebelum dipakai restoran.",
      },
      {
        href: "/panduan/laporan-penjualan-cafe",
        label: "Laporan penjualan cafe",
        description: "Gunakan laporan transaksi dan produk terlaris sebagai dasar kontrol operasional.",
      },
    ],
  },
  sistemKasirUmkm: {
    path: "/sistem-kasir-umkm",
    title: "Sistem Kasir UMKM Bulanan untuk Toko, Warung & Retail | Outletmu",
    description:
      "Sistem kasir UMKM bulanan untuk toko, warung, minimarket, dan retail kecil. POS, stok, dan laporan dalam satu sistem. Mulai Rp249.000.",
    h1: "Sistem Kasir UMKM untuk Toko, Warung, dan Retail",
    eyebrow: "Sistem kasir untuk bisnis kecil",
    lead: "Outletmu membantu UMKM mulai memakai sistem kasir digital dengan POS, menu digital, QR order, stok basic, dan laporan penjualan dalam layanan bulanan yang lebih mudah dijalankan.",
    primaryCta: "Konsultasi Sistem Kasir UMKM",
    intent:
      "Untuk bisnis kecil yang ingin operasional lebih rapi tanpa harus memikirkan server, maintenance, dan setup teknis sendiri.",
    highlights: [
      "POS untuk transaksi harian",
      "Menu digital untuk produk",
      "QR order jika butuh dine-in",
      "Stok basic untuk produk penting",
      "Laporan penjualan sederhana",
      "Support dan setup dibantu",
    ],
    sections: [
      {
        title: "Mulai digital tanpa sistem yang terlalu berat",
        body: "Banyak UMKM butuh sistem yang praktis, bukan fitur enterprise yang rumit. Outletmu membantu bisnis kecil mulai dari kebutuhan paling penting: transaksi, menu, stok, dan laporan.",
      },
      {
        title: "Cocok untuk outlet yang sedang bertumbuh",
        body: "Saat order mulai ramai, catatan manual sering membuat data penjualan tidak rapi. Sistem kasir membantu owner membaca transaksi dan produk yang berjalan dari dashboard.",
      },
      {
        title: "Layanan bulanan dengan bantuan setup",
        body: "Tim Outletmu membantu setup awal agar UMKM tidak perlu mengurus teknis sendiri. Paket bisa dipilih sesuai kebutuhan outlet, dari menu digital sampai POS yang lebih lengkap.",
      },
    ],
    workflow: [
      "Pilih paket sesuai kebutuhan outlet",
      "Menu dan produk disiapkan",
      "Kasir mulai mencatat transaksi dari POS",
      "QR order dipakai jika ada meja dine-in",
      "Stok basic dan laporan dipantau",
      "Sistem bisa ditingkatkan saat bisnis berkembang",
    ],
    audience: ["UMKM kuliner", "Toko kecil", "Warung", "Minimarket lokal", "Retail kecil", "Outlet minuman"],
    related: ["websiteKasirOtomatis", "posKasirCafe", "stokCafe"],
    guideLinks: [
      {
        href: "/panduan/memilih-aplikasi-kasir-cafe",
        label: "Cara memilih aplikasi kasir cafe",
        description: "Mulai dari kebutuhan dasar sebelum menambah fitur operasional lain.",
      },
      {
        href: "/panduan/stok-cafe",
        label: "Stok cafe",
        description: "Buat kontrol stok sederhana yang realistis untuk outlet kecil.",
      },
    ],
  },
  softwareKasirFnb: {
    path: "/software-kasir-fnb",
    title: "Software Kasir F&B Bulanan untuk Restoran & Bisnis Kuliner | Outletmu",
    description:
      "Software kasir F&B bulanan untuk restoran, cloud kitchen, dan bisnis kuliner. POS, QR order, kitchen display, stok, dan laporan dalam satu sistem. Mulai Rp249.000.",
    h1: "Software Kasir F&B untuk Restoran dan Bisnis Kuliner",
    eyebrow: "Software kasir F&B",
    lead: "Outletmu membantu bisnis kuliner punya sistem operasional yang lebih rapi: POS kasir, QR order meja, menu digital, kitchen display, stok basic, laporan penjualan, dan bantuan setup dalam satu layanan bulanan.",
    primaryCta: "Konsultasi Software F&B",
    intent:
      "Untuk owner F&B yang sedang membandingkan sistem kasir cafe, restoran, QR order, dan laporan sebelum memilih paket yang paling cocok.",
    highlights: [
      "POS kasir untuk transaksi outlet",
      "QR order meja untuk dine-in",
      "Menu digital yang mudah diperbarui",
      "Kitchen display untuk dapur",
      "Stok basic dan produk terlaris",
      "Laporan owner via dashboard dan WhatsApp",
    ],
    sections: [
      {
        title: "Satu alur dari meja sampai laporan",
        body: "Order dari kasir dan QR meja masuk ke dashboard yang sama. Tim bisa melihat item, meja, status dapur, pembayaran, dan riwayat transaksi tanpa memecah data ke banyak catatan.",
      },
      {
        title: "Dibuat untuk kebutuhan F&B harian",
        body: "Cafe dan restoran butuh menu yang cepat berubah, order saat jam ramai, stok produk penting, dan laporan yang mudah dibaca owner. Outletmu fokus pada kebutuhan operasional itu.",
      },
      {
        title: "Setup dibantu, bukan POS DIY lepas tangan",
        body: "Tim Outletmu membantu setup awal, data menu, QR, dan arahan paket agar outlet tidak perlu mengurus teknis server sendiri.",
      },
    ],
    workflow: [
      "Pilih paket sesuai kebutuhan outlet",
      "Menu, produk, dan QR meja disiapkan",
      "Kasir menerima order dari POS atau QR",
      "Kitchen membaca order yang perlu diproses",
      "Transaksi selesai dan stok ikut dipantau",
      "Owner membaca laporan penjualan",
    ],
    audience: ["Restoran", "Cloud kitchen", "Bisnis kuliner", "Kedai makan", "Outlet minuman", "UMKM F&B"],
    related: ["posKasirCafe", "aplikasiKasirRestoran", "qrOrderMeja"],
    guideLinks: [
      {
        href: "/panduan/memilih-aplikasi-kasir-cafe",
        label: "Panduan memilih aplikasi kasir",
        description: "Bandingkan POS, QR order, menu digital, stok, laporan, dan support dengan lebih praktis.",
      },
      {
        href: "/panduan/stok-cafe",
        label: "Cara mengelola stok cafe",
        description: "Hubungkan stok prioritas dengan transaksi dan laporan penjualan.",
      },
    ],
  },
  sistemKasirCoffeeShop: {
    path: "/sistem-kasir-coffee-shop",
    title: "Sistem Kasir Coffee Shop dengan QR Order | Outletmu",
    description:
      "Sistem kasir coffee shop Outletmu membantu transaksi, QR order meja, menu minuman, stok, kitchen/bar flow, dan laporan penjualan dengan setup dibantu.",
    h1: "Sistem Kasir Coffee Shop untuk Order yang Lebih Rapi",
    eyebrow: "Sistem kasir coffee shop",
    lead: "Outletmu membantu coffee shop mengelola rush hour, order meja, menu minuman, stok basic, dan laporan harian dari sistem kasir berbasis web yang bisa dipakai kasir dan owner.",
    primaryCta: "Konsultasi Sistem Coffee Shop",
    intent:
      "Untuk coffee shop yang ingin mengurangi salah catat, mempercepat order meja, dan memantau menu terlaris tanpa rekap manual.",
    highlights: [
      "POS kasir coffee shop",
      "QR order meja",
      "Menu minuman digital",
      "Status order untuk bar/kitchen",
      "Stok produk penting",
      "Laporan omzet dan produk terlaris",
    ],
    sections: [
      {
        title: "Rush hour lebih mudah dipantau",
        body: "Saat order ramai, kasir bisa melihat pesanan aktif, detail item, dan status pembayaran dari dashboard. Order dari QR meja tidak tercecer di chat atau catatan manual.",
      },
      {
        title: "Menu minuman bisa berubah cepat",
        body: "Harga, kategori, dan status produk bisa diperbarui dari sistem sehingga menu digital tetap relevan untuk customer.",
      },
      {
        title: "Owner bisa membaca performa harian",
        body: "Laporan omzet, transaksi, produk terlaris, dan stok menipis membantu owner mengecek kondisi outlet tanpa menunggu rekap akhir hari.",
      },
    ],
    workflow: [
      "Menu kopi dan non-kopi dibuat di dashboard",
      "QR meja atau area kasir dipasang",
      "Order masuk ke POS atau dashboard order",
      "Bar/kitchen melihat pesanan",
      "Kasir menyelesaikan pembayaran",
      "Owner membaca laporan harian",
    ],
    audience: ["Coffee shop", "Kedai kopi", "Cafe kecil", "Outlet minuman", "Kopi takeaway", "Cafe dine-in"],
    related: ["posKasirCafe", "menuDigitalCafe", "stokCafe"],
    guideLinks: [
      {
        href: "/panduan/memilih-aplikasi-kasir-cafe",
        label: "Panduan memilih aplikasi kasir",
        description: "Cek kebutuhan coffee shop sebelum menentukan sistem kasir dan fitur awal.",
      },
      {
        href: "/panduan/qr-order-meja-cafe",
        label: "QR order meja cafe",
        description: "Lihat cara menyiapkan QR meja untuk dine-in dan rush hour.",
      },
    ],
  },
  laporanWhatsapp: {
    path: "/fitur/laporan-whatsapp",
    title: "Aplikasi Kasir dengan Laporan WhatsApp | Outletmu",
    description:
      "Outletmu membantu owner mengecek omzet, transaksi, produk terlaris, stok menipis, dan absensi lewat WhatsApp dari sistem kasir yang terhubung.",
    h1: "Laporan WhatsApp untuk Owner Cafe dan Restoran",
    eyebrow: "Laporan via WhatsApp",
    lead: "Outletmu membantu owner menanyakan laporan penting lewat WhatsApp, seperti omzet hari ini, transaksi, produk terlaris, stok menipis, dan absensi tanpa membuka dashboard setiap saat.",
    primaryCta: "Konsultasi Laporan WhatsApp",
    intent:
      "Untuk owner yang ingin memantau outlet dari jauh dengan format laporan singkat yang mudah dibaca.",
    highlights: [
      "Omzet hari ini via WhatsApp",
      "Transaksi 7 dan 30 hari",
      "Produk terlaris",
      "Stok menipis",
      "Absensi staff",
      "Terhubung ke data kasir",
    ],
    sections: [
      {
        title: "Owner tidak harus selalu membuka dashboard",
        body: "Pertanyaan laporan yang sering muncul bisa dijawab dari WhatsApp dengan data dari sistem kasir, bukan rekap manual.",
      },
      {
        title: "Fokus pada laporan yang benar-benar dipakai",
        body: "Omzet, transaksi, produk terlaris, stok menipis, dan absensi adalah data harian yang membantu owner mengambil keputusan cepat.",
      },
      {
        title: "Cocok untuk outlet yang dikelola tim",
        body: "Saat owner tidak selalu berada di outlet, laporan WhatsApp membantu menjaga visibilitas tanpa mengganggu operasional kasir.",
      },
    ],
    workflow: [
      "Transaksi dicatat di POS",
      "Data produk dan stok ikut tersimpan",
      "Owner mengirim pertanyaan laporan",
      "Sistem membaca data yang relevan",
      "Ringkasan dikirim lewat WhatsApp",
      "Owner bisa tindak lanjuti ke tim",
    ],
    audience: ["Owner cafe", "Owner restoran", "Multi-outlet kecil", "UMKM F&B", "Supervisor outlet", "Tim operasional"],
    related: ["softwareKasirFnb", "stokCafe", "posKasirCafe"],
    guideLinks: [
      {
        href: "/panduan/laporan-penjualan-cafe",
        label: "Panduan laporan penjualan cafe",
        description: "Tentukan metrik harian yang perlu dibaca owner sebelum memakai ringkasan WhatsApp.",
      },
      {
        href: "/panduan/stok-cafe",
        label: "Stok cafe",
        description: "Pelajari bagaimana stok menipis bisa dibaca dari data operasional.",
      },
    ],
    faqs: [
      {
        question: "Apakah laporan WhatsApp menggantikan dashboard?",
        answer:
          "Tidak. Dashboard tetap menjadi pusat data, sementara laporan WhatsApp membantu owner membaca ringkasan penting tanpa membuka dashboard setiap saat.",
      },
      {
        question: "Data apa yang bisa ditanyakan lewat WhatsApp?",
        answer:
          "Fokus awalnya adalah omzet, transaksi, produk terlaris, stok menipis, dan absensi staff yang datanya berasal dari sistem kasir.",
      },
    ],
  },
  stokCafe: {
    path: "/fitur/stok-cafe",
    title: "Aplikasi Stok dan Kasir Cafe | Outletmu",
    description:
      "Aplikasi stok dan kasir cafe Outletmu membantu mengelola produk, inventory basic, stok menipis, transaksi, dan laporan penjualan dalam satu alur.",
    h1: "Aplikasi Stok dan Kasir Cafe untuk Operasional Harian",
    eyebrow: "Stok dan kasir cafe",
    lead: "Outletmu membantu cafe memantau produk, stok basic, transaksi, dan laporan agar tim lebih cepat tahu item yang mulai menipis atau paling sering terjual.",
    primaryCta: "Konsultasi Stok Cafe",
    intent:
      "Untuk cafe yang butuh POS kasir sekaligus kontrol stok sederhana agar operasional harian tidak bergantung pada catatan terpisah.",
    highlights: [
      "Produk dan kategori menu",
      "Inventory basic",
      "Stok menipis",
      "Riwayat transaksi",
      "Produk terlaris",
      "Laporan penjualan",
    ],
    sections: [
      {
        title: "Produk dan stok ada di alur kasir",
        body: "Data produk, harga, kategori, dan stok penting dapat dikelola dari dashboard yang sama dengan transaksi harian.",
      },
      {
        title: "Stok menipis lebih cepat terlihat",
        body: "Owner dan tim bisa mengecek produk yang perlu restock lebih awal sehingga risiko item kosong saat jam ramai berkurang.",
      },
      {
        title: "Laporan membantu keputusan restock",
        body: "Produk terlaris dan transaksi harian membantu owner membaca item yang bergerak, bukan hanya melihat angka stok mentah.",
      },
    ],
    workflow: [
      "Produk dan stok awal dimasukkan",
      "Kasir memproses transaksi",
      "Stok produk ikut dipantau",
      "Produk menipis muncul di laporan",
      "Owner melihat produk terlaris",
      "Tim menyiapkan restock",
    ],
    audience: ["Cafe", "Coffee shop", "Kedai minuman", "Bakery", "UMKM kuliner", "Toko kecil"],
    related: ["posKasirCafe", "laporanWhatsapp", "sistemKasirCoffeeShop"],
    guideLinks: [
      {
        href: "/panduan/stok-cafe",
        label: "Cara mengelola stok cafe",
        description: "Mulai dari stok prioritas, batas minimum, dan SOP update per shift.",
      },
      {
        href: "/panduan/laporan-penjualan-cafe",
        label: "Laporan penjualan cafe",
        description: "Gunakan data produk terlaris dan transaksi untuk keputusan restock.",
      },
    ],
    faqs: [
      {
        question: "Apakah fitur stok ini cocok untuk bahan baku detail?",
        answer:
          "Fokus awalnya inventory basic untuk produk dan item penting. Kebutuhan stok bahan baku yang lebih kompleks bisa dibahas sebagai workflow custom.",
      },
      {
        question: "Apakah stok terhubung dengan transaksi kasir?",
        answer:
          "Ya, stok dan laporan dibuat sebagai bagian dari alur POS agar owner tidak perlu mencatat data penjualan dan stok di tempat terpisah.",
      },
    ],
  },
  kitchenDisplay: {
    path: "/fitur/kitchen-display",
    title: "Kitchen Display Restoran dan Cafe | Outletmu",
    description:
      "Kitchen display Outletmu membantu pesanan dari kasir dan QR order masuk ke dapur dengan status yang mudah dipantau sampai siap disajikan.",
    h1: "Kitchen Display untuk Restoran dan Cafe",
    eyebrow: "Kitchen display",
    lead: "Outletmu membantu dapur melihat pesanan masuk dari POS kasir dan QR order meja, memantau status pesanan, dan menjaga alur kasir-kitchen lebih jelas.",
    primaryCta: "Konsultasi Kitchen Display",
    intent:
      "Untuk restoran dan cafe dine-in yang ingin mengurangi order tercecer antara kasir, meja, dan dapur.",
    highlights: [
      "Order masuk dari POS",
      "Order masuk dari QR meja",
      "Status pesanan",
      "Konteks meja",
      "Alur kasir-kitchen",
      "Cocok untuk dine-in",
    ],
    sections: [
      {
        title: "Dapur melihat order yang perlu dibuat",
        body: "Pesanan dari kasir dan QR meja masuk ke tampilan kitchen agar tim dapur tidak perlu menunggu catatan manual berpindah tangan.",
      },
      {
        title: "Status membantu kasir membaca progres",
        body: "Saat status pesanan diperbarui, kasir bisa melihat mana yang baru, diproses, atau siap sehingga komunikasi outlet lebih rapi.",
      },
      {
        title: "Terhubung dengan POS dan QR order",
        body: "Kitchen display menjadi bagian dari alur operasional Outletmu, bukan layar terpisah yang datanya harus diinput ulang.",
      },
    ],
    workflow: [
      "Pesanan dibuat dari POS atau QR meja",
      "Order masuk ke kitchen display",
      "Kitchen melihat item dan catatan",
      "Status pesanan diperbarui",
      "Kasir memantau progres",
      "Pesanan disajikan dan transaksi selesai",
    ],
    audience: ["Restoran", "Cafe dine-in", "Rumah makan", "Kedai ramai", "Food court", "Cafe resto"],
    related: ["aplikasiKasirRestoran", "qrOrderMeja", "softwareKasirFnb"],
    guideLinks: [
      {
        href: "/panduan/qr-order-meja-cafe",
        label: "QR order meja",
        description: "Pastikan order dari meja membawa informasi yang cukup untuk kitchen.",
      },
      {
        href: "/panduan/menu-digital-cafe",
        label: "Menu digital cafe",
        description: "Rapikan menu dan catatan item sebelum order diteruskan ke dapur.",
      },
    ],
    faqs: [
      {
        question: "Apakah kitchen display bisa menerima order dari QR meja?",
        answer:
          "Bisa. Pesanan dari QR meja dan POS kasir dapat masuk ke alur order sehingga kitchen melihat item yang perlu disiapkan.",
      },
      {
        question: "Apakah kitchen display wajib untuk semua cafe?",
        answer:
          "Tidak selalu. Cafe kecil bisa mulai dari POS dan QR order dulu, lalu menambah kitchen display saat order dine-in atau dapur mulai lebih ramai.",
      },
    ],
  },
  saldoMember: {
    path: "/fitur/saldo-member",
    title: "Saldo Member Cafe dan Restoran | Outletmu",
    description:
      "Fitur saldo member Outletmu membantu outlet mengelola member, top up saldo, riwayat transaksi, dan pembayaran member untuk cafe atau restoran.",
    h1: "Saldo Member untuk Cafe dan Restoran",
    eyebrow: "Saldo member",
    lead: "Outletmu membantu outlet yang ingin memberi pengalaman member lebih rapi lewat login member, saldo, riwayat transaksi, dan alur top up yang terhubung dengan sistem kasir.",
    primaryCta: "Konsultasi Saldo Member",
    intent:
      "Untuk cafe atau restoran yang ingin membangun pembelian berulang dan membuat data pelanggan lebih mudah dipantau.",
    highlights: [
      "Login member",
      "Saldo member",
      "Top up saldo",
      "Riwayat transaksi",
      "Data pelanggan",
      "Terhubung ke POS",
    ],
    sections: [
      {
        title: "Member bisa punya saldo outlet",
        body: "Fitur saldo membantu outlet membuat alur prepaid sederhana untuk pelanggan yang sering datang atau komunitas internal.",
      },
      {
        title: "Riwayat transaksi lebih mudah dibaca",
        body: "Transaksi member tersimpan sehingga tim bisa melihat aktivitas pembelian tanpa mencatat manual.",
      },
      {
        title: "Bagian dari paket operasional",
        body: "Saldo member terhubung dengan POS dan data pelanggan, sehingga tidak berdiri sebagai sistem yang terpisah dari kasir.",
      },
    ],
    workflow: [
      "Member login dari menu pelanggan",
      "Saldo ditambahkan sesuai alur outlet",
      "Member melakukan transaksi",
      "Pembayaran tercatat di POS",
      "Riwayat transaksi tersimpan",
      "Owner membaca data pelanggan",
    ],
    audience: ["Cafe komunitas", "Restoran langganan", "Kantin", "Coffee shop", "Outlet membership", "UMKM F&B"],
    related: ["posKasirCafe", "softwareKasirFnb", "laporanWhatsapp"],
    guideLinks: [
      {
        href: "/panduan/memilih-aplikasi-kasir-cafe",
        label: "Panduan memilih aplikasi kasir",
        description: "Pilih sistem kasir yang bisa berkembang ke member, laporan, dan kebutuhan outlet lain.",
      },
      {
        href: "/panduan/laporan-penjualan-cafe",
        label: "Laporan penjualan cafe",
        description: "Baca data transaksi sebelum menambah program member atau saldo internal outlet.",
      },
    ],
    faqs: [
      {
        question: "Apakah saldo member sama dengan dompet digital umum?",
        answer:
          "Tidak. Saldo Member dibuat sebagai saldo internal outlet untuk pelanggan atau komunitas yang bertransaksi di outlet tersebut.",
      },
      {
        question: "Apakah riwayat transaksi member tersimpan?",
        answer:
          "Ya, transaksi dan mutasi saldo member disimpan agar outlet bisa melihat aktivitas member dengan lebih rapi.",
      },
    ],
  },
  aplikasiKasirVsCatatanManual: {
    path: "/bandingkan/aplikasi-kasir-vs-catatan-manual",
    title: "Aplikasi Kasir vs Catatan Manual untuk Cafe | Outletmu",
    description:
      "Perbandingan aplikasi kasir dan catatan manual untuk cafe, restoran, dan UMKM F&B: transaksi, stok, laporan, QR order, dan kesiapan operasional.",
    h1: "Aplikasi Kasir vs Catatan Manual untuk Outlet F&B",
    eyebrow: "Perbandingan sistem kasir",
    lead: "Catatan manual bisa cukup saat outlet masih kecil, tetapi mulai berat ketika order ramai, stok berubah cepat, dan owner butuh laporan yang bisa dipercaya. Outletmu membantu transisi ke aplikasi kasir yang lebih rapi.",
    primaryCta: "Konsultasi Transisi Kasir",
    intent:
      "Untuk owner yang masih memakai catatan manual dan sedang mempertimbangkan kapan perlu pindah ke sistem kasir.",
    highlights: [
      "Transaksi lebih rapi",
      "Order meja lebih mudah dilacak",
      "Stok tidak terpisah dari kasir",
      "Laporan lebih cepat dibaca",
      "QR order bisa ditambahkan",
      "Setup dibantu bertahap",
    ],
    sections: [
      {
        title: "Catatan manual cepat murah, tapi mudah tercecer",
        body: "Saat order masih sedikit, buku atau spreadsheet bisa membantu. Masalah mulai terasa ketika transaksi ramai, banyak shift, atau owner perlu melihat laporan tanpa menunggu rekap.",
      },
      {
        title: "Aplikasi kasir menyatukan data operasional",
        body: "POS, QR order, produk, stok, transaksi, dan laporan berada di satu alur sehingga tim tidak perlu menyusun ulang data dari banyak sumber.",
      },
      {
        title: "Pindah bisa dimulai dari kebutuhan paling penting",
        body: "Outlet tidak harus langsung memakai semua fitur. Bisa mulai dari POS kasir dan QR order, lalu menambah stok, laporan WhatsApp, kitchen display, atau member saat dibutuhkan.",
      },
    ],
    workflow: [
      "Audit masalah catatan manual",
      "Pilih fitur awal yang paling dibutuhkan",
      "Input menu dan produk utama",
      "Kasir mulai mencatat transaksi di POS",
      "QR order atau stok ditambahkan bertahap",
      "Owner membaca laporan dari sistem",
    ],
    audience: ["Cafe baru", "Restoran kecil", "UMKM F&B", "Kedai makan", "Outlet minuman", "Owner operasional"],
    related: ["posKasirCafe", "stokCafe", "laporanWhatsapp"],
  },
};

export const seoPageEntries = Object.values(seoPages);

export function getSeoPageByPath(path: string) {
  return seoPageEntries.find((page) => page.path === path);
}
