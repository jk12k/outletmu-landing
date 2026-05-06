export type SeoPageKey =
  | "websiteKasirOtomatis"
  | "posKasirCafe"
  | "qrOrderMeja"
  | "menuDigitalCafe"
  | "aplikasiKasirRestoran"
  | "sistemKasirUmkm";

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
};

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
    title: "POS Kasir Cafe Bulanan dengan QR Order & Menu Digital | Outletmu",
    description:
      "Outletmu menyediakan POS kasir cafe, QR order meja, menu digital, dashboard kasir, inventory, dan laporan penjualan dalam layanan bulanan yang dibantu setup.",
    h1: "POS Kasir Cafe Bulanan dengan QR Order dan Menu Digital",
    eyebrow: "POS kasir untuk cafe",
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
    related: ["websiteKasirOtomatis", "qrOrderMeja", "menuDigitalCafe"],
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
    related: ["menuDigitalCafe", "posKasirCafe", "aplikasiKasirRestoran"],
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
    related: ["qrOrderMeja", "websiteKasirOtomatis", "sistemKasirUmkm"],
  },
  sistemKasirUmkm: {
    path: "/sistem-kasir-umkm",
    title: "Sistem Kasir UMKM Bulanan untuk Cafe, Resto & Toko | Outletmu",
    description:
      "Sistem kasir UMKM Outletmu membantu bisnis kecil mengelola POS, menu digital, QR order, stok, dan laporan penjualan tanpa ribet teknis.",
    h1: "Sistem Kasir UMKM Bulanan untuk Cafe, Resto dan Toko",
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
    audience: ["UMKM kuliner", "Toko kecil", "Minimarket lokal", "Cafe kecil", "Kedai makan", "Outlet minuman"],
    related: ["websiteKasirOtomatis", "posKasirCafe", "aplikasiKasirRestoran"],
  },
};

export const seoPageEntries = Object.values(seoPages);
