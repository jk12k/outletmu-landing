export type GuidePageKey =
  | "memilihAplikasiKasirCafe"
  | "qrOrderMejaCafe"
  | "menuDigitalCafeGuide"
  | "laporanPenjualanCafe"
  | "stokCafeGuide";

export type GuidePageContent = {
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string[];
  intent: string;
  takeaways: string[];
  sections: Array<{
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  checklist: {
    title: string;
    items: string[];
  };
  cta: {
    title: string;
    body: string;
    label: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  internalLinks: Array<{
    href: string;
    label: string;
    description: string;
  }>;
};

export const guidePublishedDate = "2026-05-16";

export const guidePages: Record<GuidePageKey, GuidePageContent> = {
  memilihAplikasiKasirCafe: {
    path: "/panduan/memilih-aplikasi-kasir-cafe",
    title: "Cara Memilih Aplikasi Kasir Cafe yang Tepat | Outletmu",
    description:
      "Panduan praktis cara memilih aplikasi kasir cafe untuk owner F&B: POS, QR order, menu digital, stok, laporan, support, dan biaya yang masuk akal.",
    h1: "Cara Memilih Aplikasi Kasir Cafe yang Tepat",
    eyebrow: "Panduan aplikasi kasir cafe",
    intro: [
      "Cara memilih aplikasi kasir cafe tidak cukup hanya melihat harga bulanan atau tampilan dashboard. Sistem kasir yang cocok harus membantu alur kerja harian: menerima order, memproses pembayaran, mengatur menu, membaca stok, dan memberi owner laporan yang bisa dipakai untuk mengambil keputusan.",
      "Untuk cafe kecil, kedai kopi, restoran rumahan, atau UMKM F&B yang baru mulai merapikan operasional, pilihan terbaik biasanya bukan sistem yang paling banyak fiturnya. Pilihan terbaik adalah sistem yang fiturnya dipakai sungguhan oleh kasir, owner, dan tim dapur tanpa membuat pekerjaan harian terasa lebih rumit.",
    ],
    intent:
      "Panduan ini membantu owner cafe membandingkan aplikasi kasir secara praktis sebelum memilih paket POS, QR order, menu digital, stok, dan laporan.",
    takeaways: [
      "Mulai dari masalah operasional yang paling sering terjadi, bukan dari daftar fitur panjang.",
      "Pastikan POS, menu, stok, dan laporan berada dalam alur yang sama.",
      "Cek support, setup, dan biaya lanjutan agar tidak berhenti di demo yang terlihat bagus.",
    ],
    sections: [
      {
        title: "Mulai dari workflow cafe kamu sendiri",
        paragraphs: [
          "Sebelum membandingkan aplikasi, tulis dulu alur order cafe kamu dari customer datang sampai transaksi selesai. Apakah order banyak dari meja, takeaway, kasir langsung, atau campuran semuanya? Apakah kasir harus meneruskan catatan ke bar, kitchen, atau owner? Jawaban ini menentukan fitur yang benar-benar dibutuhkan.",
          "Cafe dengan meja dine-in biasanya membutuhkan nomor meja yang jelas, catatan pesanan, dan status order. Cafe takeaway sering lebih butuh input order cepat, metode pembayaran rapi, dan laporan produk terlaris. Kedai yang baru buka bisa mulai sederhana, tetapi tetap perlu ruang untuk berkembang ketika order makin ramai.",
        ],
        bullets: [
          "Catat sumber order utama: meja, kasir, WhatsApp, atau takeaway.",
          "Tandai bagian yang sering salah: catatan item, nomor meja, harga, stok, atau pembayaran.",
          "Prioritaskan fitur yang mengurangi pekerjaan manual paling besar.",
        ],
      },
      {
        title: "POS harus cepat dipakai kasir saat jam ramai",
        paragraphs: [
          "POS cafe yang baik tidak hanya terlihat modern. Kasir harus bisa memilih produk, mengubah jumlah, menambah catatan, melihat total, dan menyelesaikan pembayaran tanpa banyak langkah yang membingungkan. Saat antrean mulai panjang, satu layar yang terlalu ramai bisa membuat transaksi melambat.",
          "Perhatikan juga bagaimana sistem menangani produk yang sering berubah seperti varian es/panas, ukuran cup, topping, atau paket menu. Jika semua variasi harus dibuat manual dengan cara yang kaku, tim akan kembali memakai catatan tambahan di luar sistem. Itu tanda aplikasi belum mengikuti ritme cafe.",
        ],
      },
      {
        title: "QR order dan menu digital perlu tetap dikontrol kasir",
        paragraphs: [
          "Banyak cafe tertarik dengan QR order karena customer bisa scan dari meja dan memilih menu sendiri. Fitur ini berguna, tetapi sebaiknya tetap masuk ke dashboard yang bisa dikontrol kasir. Kasir perlu melihat pesanan, memastikan meja, mengecek catatan, lalu meneruskan order sesuai alur outlet.",
          "Menu digital juga harus mudah diperbarui. Harga yang berubah, produk habis, menu musiman, dan kategori baru seharusnya bisa disesuaikan tanpa mencetak ulang menu. Untuk cafe yang ingin mulai dari QR dan menu, halaman seperti aplikasi kasir cafe atau paket harga bisa membantu melihat fitur awal yang relevan.",
        ],
      },
      {
        title: "Laporan harus menjawab pertanyaan owner",
        paragraphs: [
          "Owner cafe biasanya tidak butuh laporan yang terlalu rumit di awal. Pertanyaan paling penting adalah omzet hari ini berapa, transaksi berapa banyak, produk apa yang paling sering terjual, dan item mana yang mulai menipis. Aplikasi kasir yang baik membantu menjawab pertanyaan itu tanpa rekap manual panjang.",
          "Cek apakah laporan bisa dibaca harian dan mingguan. Laporan harian membantu kontrol shift, sedangkan laporan mingguan membantu membaca pola menu, jam ramai, dan kebutuhan restock. Hindari memilih sistem yang hanya menyimpan transaksi tetapi sulit memberi ringkasan yang bisa ditindaklanjuti.",
        ],
      },
      {
        title: "Stok tidak harus kompleks, tapi jangan terpisah",
        paragraphs: [
          "Untuk cafe kecil, stok awal bisa dibuat sederhana: produk penting, bahan yang cepat habis, atau item yang langsung dijual. Yang penting, data stok tidak berdiri sendiri jauh dari transaksi. Jika kasir mencatat penjualan di satu tempat dan stok dicatat di spreadsheet lain, owner tetap harus melakukan rekonsiliasi manual.",
          "Sistem yang terhubung membantu tim melihat produk menipis lebih cepat. Bukan berarti semua bahan baku harus langsung dibuat detail dari hari pertama. Mulai dari stok yang paling berdampak pada pelayanan, lalu tambah tingkat detail setelah tim terbiasa.",
        ],
      },
      {
        title: "Periksa setup, support, dan biaya total",
        paragraphs: [
          "Demo aplikasi sering terlihat lancar karena datanya sudah rapi. Dalam operasional nyata, kamu perlu memasukkan menu, membuat kategori, menyiapkan QR, melatih kasir, dan mengubah kebiasaan kerja. Karena itu, bantuan setup dan support lebih penting daripada sekadar daftar fitur.",
          "Tanyakan biaya bulanan, biaya domain, training tambahan, kebutuhan custom, dan apakah hosting atau maintenance sudah termasuk. Biaya murah bisa terasa mahal jika owner harus mengurus terlalu banyak teknis sendiri. Sebaliknya, paket yang sedikit lebih jelas bisa lebih masuk akal jika membantu outlet cepat jalan.",
        ],
      },
    ],
    checklist: {
      title: "Checklist sebelum memilih aplikasi kasir cafe",
      items: [
        "POS mudah dipakai kasir saat antrean ramai.",
        "Menu digital bisa diperbarui tanpa cetak ulang.",
        "QR order masuk ke dashboard, bukan tercecer di chat.",
        "Laporan omzet, transaksi, dan produk terlaris mudah dibaca.",
        "Stok basic bisa dipantau dari alur kasir.",
        "Ada bantuan setup, arahan penggunaan, dan support setelah sistem aktif.",
        "Harga bulanan dan add-ons dijelaskan dari awal.",
      ],
    },
    cta: {
      title: "Butuh sistem kasir cafe yang bisa mulai bertahap?",
      body: "Outletmu membantu cafe memilih alur yang paling masuk akal: mulai dari POS kasir, QR order meja, menu digital, stok basic, sampai laporan owner sesuai kebutuhan outlet.",
      label: "Konsultasi aplikasi kasir cafe",
    },
    faqs: [
      {
        question: "Apakah cafe kecil perlu langsung memakai aplikasi kasir lengkap?",
        answer:
          "Tidak selalu. Cafe kecil bisa mulai dari POS, menu digital, dan QR order jika itu masalah paling terasa. Fitur seperti laporan WhatsApp, member, atau workflow custom bisa ditambahkan saat operasional sudah membutuhkan.",
      },
      {
        question: "Apa fitur paling penting saat memilih aplikasi kasir cafe?",
        answer:
          "Fitur paling penting biasanya POS yang cepat, menu yang mudah diatur, laporan penjualan, dan alur order yang tidak membuat kasir mencatat ulang. Setelah itu baru cek stok, QR order, kitchen, dan fitur tambahan lain.",
      },
      {
        question: "Apakah harga murah selalu lebih baik untuk cafe baru?",
        answer:
          "Belum tentu. Harga perlu dibandingkan dengan setup, hosting, support, dan waktu yang dihemat. Sistem yang murah tetapi sulit dipakai bisa membuat tim kembali ke catatan manual.",
      },
    ],
    internalLinks: [
      {
        href: "/pos-kasir-cafe",
        label: "Aplikasi kasir cafe",
        description: "Lihat solusi POS kasir cafe, QR order, menu digital, stok, dan laporan dari Outletmu.",
      },
      {
        href: "/harga",
        label: "Harga Outletmu",
        description: "Bandingkan paket bulanan dan add-ons yang bisa dipilih sesuai tahap outlet.",
      },
    ],
  },
  qrOrderMejaCafe: {
    path: "/panduan/qr-order-meja-cafe",
    title: "QR Order Meja Cafe: Cara Kerja dan Checklist | Outletmu",
    description:
      "Panduan QR order meja cafe untuk dine-in: alur scan QR, menu digital, dashboard kasir, kitchen, pembayaran, dan checklist sebelum dipasang.",
    h1: "QR Order Meja Cafe: Cara Kerja dan Checklist Sebelum Dipasang",
    eyebrow: "Panduan QR order meja",
    intro: [
      "QR order meja cafe membantu customer membuka menu dari HP, memilih pesanan, dan mengirim order tanpa menunggu menu fisik. Untuk outlet dine-in yang mulai ramai, alur ini bisa mengurangi bolak-balik catatan antara customer, kasir, dan kitchen.",
      "Namun QR order bukan sekadar mencetak kode QR dan menempelkannya di meja. Agar benar-benar membantu, pesanan harus masuk ke dashboard yang jelas, nomor meja tidak tertukar, menu mudah diperbarui, dan kasir tetap punya kontrol atas transaksi.",
    ],
    intent:
      "Panduan ini menjelaskan kapan QR order meja cocok dipakai, apa yang harus disiapkan, dan bagaimana menghindari alur yang malah membingungkan tim cafe.",
    takeaways: [
      "QR order paling berguna untuk outlet dine-in yang sering melayani beberapa meja sekaligus.",
      "Nomor meja, status order, dan dashboard kasir harus jelas sebelum QR ditempel.",
      "Menu digital perlu rapi agar customer tidak bingung memilih dari layar kecil.",
    ],
    sections: [
      {
        title: "Kapan QR order meja mulai dibutuhkan?",
        paragraphs: [
          "QR order meja mulai terasa berguna ketika customer sering menunggu menu, staff bolak-balik mencatat pesanan, atau kasir harus mengetik ulang catatan dari kertas. Di cafe yang punya beberapa meja aktif, penghematan kecil di setiap order bisa membuat pelayanan terasa lebih rapi.",
          "Untuk outlet yang masih sangat kecil, QR order tetap bisa dipakai sebagai menu digital dulu. Customer scan untuk melihat menu, lalu order tetap dikonfirmasi kasir. Saat tim sudah siap, alur bisa ditingkatkan menjadi order dari meja yang masuk langsung ke dashboard.",
        ],
      },
      {
        title: "Alur ideal dari meja ke dashboard",
        paragraphs: [
          "Alur yang sehat dimulai dari QR unik di meja. Customer scan, melihat menu digital, memilih item, menambah catatan, lalu mengirim order. Sistem kemudian membawa pesanan ke dashboard kasir atau kitchen dengan informasi meja yang jelas.",
          "Kasir sebaiknya tetap bisa memeriksa order sebelum transaksi selesai. Ini penting untuk menghindari pesanan ganda, item kosong, atau catatan yang tidak jelas. QR order membantu mempercepat input, bukan menghilangkan tanggung jawab operasional kasir.",
        ],
        bullets: [
          "QR per meja lebih aman dibanding satu QR umum untuk semua meja dine-in.",
          "Order harus membawa nomor meja dan catatan item.",
          "Kasir perlu melihat status baru, diproses, dan selesai.",
        ],
      },
      {
        title: "Menu digital menentukan kualitas pengalaman customer",
        paragraphs: [
          "Customer melihat menu dari layar kecil, jadi kategori dan nama produk harus rapi. Pisahkan kopi, non-kopi, makanan, dessert, atau paket agar customer tidak harus scroll terlalu panjang. Foto tidak wajib untuk semua menu, tetapi deskripsi singkat bisa membantu untuk item yang mirip.",
          "Harga, status habis, dan variasi produk harus mudah diperbarui. Jika menu digital tidak sinkron dengan kondisi outlet, customer bisa memesan item yang sebenarnya tidak tersedia. Itu membuat QR order terlihat canggih di depan, tetapi merepotkan tim di belakang.",
        ],
      },
      {
        title: "Kitchen dan bar perlu menerima informasi yang cukup",
        paragraphs: [
          "Untuk cafe dengan bar atau dapur, order dari QR meja harus mudah dibaca oleh tim yang menyiapkan pesanan. Informasi seperti item, jumlah, catatan less ice, tanpa gula, atau nomor meja harus muncul jelas. Jika kitchen tetap menunggu kasir menulis ulang, manfaat QR order berkurang.",
          "Tidak semua outlet perlu kitchen display sejak awal. Cafe kecil bisa memulai dari dashboard kasir dulu, lalu menambah tampilan kitchen ketika order dine-in mulai padat. Yang penting, data order tidak tercecer di banyak tempat.",
        ],
      },
      {
        title: "Pembayaran tetap harus mengikuti kebijakan outlet",
        paragraphs: [
          "Ada cafe yang meminta customer bayar di kasir setelah makan, ada yang bayar dulu sebelum pesanan dibuat, dan ada yang memakai QRIS manual. QR order meja sebaiknya fleksibel mengikuti kebijakan itu. Jangan memaksakan alur pembayaran yang membuat staff harus menjelaskan ulang ke setiap customer.",
          "Tuliskan instruksi singkat di meja atau dalam menu digital: scan, pilih menu, kirim order, lalu tunggu konfirmasi staff atau lanjut bayar sesuai alur outlet. Instruksi yang jelas mengurangi pertanyaan berulang dari customer baru.",
        ],
      },
      {
        title: "Mulai dari area terbatas sebelum semua meja",
        paragraphs: [
          "Jika outlet belum pernah memakai QR order, jangan langsung mengubah semua alur di hari tersibuk. Mulai dari beberapa meja, uji menu, cek apakah order masuk sesuai meja, lalu minta kasir memberi catatan masalah yang muncul. Perbaikan kecil sebelum rollout penuh jauh lebih murah daripada membingungkan semua customer.",
          "Setelah stabil, QR bisa dipasang di seluruh meja dan diintegrasikan dengan halaman menu digital cafe atau fitur QR order meja yang lebih lengkap. Dengan cara bertahap, tim belajar memakai sistem tanpa merasa dipaksa berubah sekaligus.",
        ],
      },
    ],
    checklist: {
      title: "Checklist sebelum memasang QR order meja",
      items: [
        "Nomor meja sudah konsisten di layout outlet dan dashboard.",
        "Menu digital sudah dikelompokkan dengan kategori yang mudah dipahami.",
        "Produk kosong bisa ditandai sebelum customer memesan.",
        "Kasir tahu cara membaca dan mengonfirmasi order masuk.",
        "Tim bar atau kitchen tahu sumber order dari meja mana.",
        "Instruksi singkat tersedia di meja untuk customer.",
        "Uji coba dilakukan di beberapa meja sebelum rollout penuh.",
      ],
    },
    cta: {
      title: "Ingin QR order meja yang tetap mudah dikontrol kasir?",
      body: "Outletmu membantu cafe menyiapkan QR per meja, menu digital, dashboard order, dan alur kasir yang bisa dipakai bertahap sesuai kondisi outlet.",
      label: "Konsultasi QR order meja",
    },
    faqs: [
      {
        question: "Apakah QR order meja cocok untuk cafe kecil?",
        answer:
          "Cocok jika cafe punya meja dine-in atau ingin menu digital yang mudah dibuka customer. Untuk cafe sangat kecil, QR bisa dimulai sebagai menu digital dulu sebelum order otomatis diaktifkan penuh.",
      },
      {
        question: "Apakah customer harus membayar langsung dari QR order?",
        answer:
          "Tidak harus. Alur pembayaran bisa mengikuti kebijakan outlet, misalnya bayar di kasir, bayar setelah makan, atau konfirmasi staff terlebih dahulu.",
      },
      {
        question: "Apa risiko QR order jika tidak disiapkan dengan benar?",
        answer:
          "Risiko utamanya adalah nomor meja tertukar, produk habis masih bisa dipesan, atau kasir tidak sadar ada order baru. Karena itu dashboard, status order, dan SOP kasir perlu disiapkan sejak awal.",
      },
    ],
    internalLinks: [
      {
        href: "/qr-order-meja",
        label: "Fitur QR order meja",
        description: "Pelajari solusi QR meja Outletmu untuk customer dine-in, dashboard kasir, dan kitchen.",
      },
      {
        href: "/menu-digital-cafe",
        label: "Menu digital cafe",
        description: "Lihat bagaimana menu digital membantu customer memilih produk dari HP.",
      },
    ],
  },
  menuDigitalCafeGuide: {
    path: "/panduan/menu-digital-cafe",
    title: "Menu Digital Cafe: Panduan Membuat Menu Online | Outletmu",
    description:
      "Panduan menu digital cafe untuk owner F&B: struktur kategori, harga, produk habis, QR code, order dari HP, dan checklist sebelum dipakai customer.",
    h1: "Menu Digital Cafe: Panduan Membuat Menu Online yang Mudah Dipakai",
    eyebrow: "Panduan menu digital",
    intro: [
      "Menu digital cafe bukan hanya daftar menu yang dipindahkan ke halaman online. Menu yang baik harus mudah dibaca dari HP, cepat diperbarui, dan mendukung customer mengambil keputusan tanpa bertanya terlalu banyak ke staff.",
      "Untuk cafe dan restoran kecil, menu digital bisa menjadi langkah awal sebelum memakai QR order meja atau POS kasir yang lebih lengkap. Dengan struktur yang rapi, owner bisa mengurangi cetak ulang menu, menandai produk kosong, dan menjaga harga tetap konsisten.",
    ],
    intent:
      "Panduan ini membantu owner cafe menyusun menu digital yang praktis, jelas untuk customer, dan siap terhubung ke alur QR order atau POS.",
    takeaways: [
      "Menu digital harus mobile-first karena customer membukanya dari HP.",
      "Kategori, nama produk, harga, dan status habis lebih penting daripada efek visual berlebihan.",
      "Menu yang terhubung ke order dan POS mengurangi input ulang oleh kasir.",
    ],
    sections: [
      {
        title: "Susun kategori berdasarkan cara customer memilih",
        paragraphs: [
          "Kategori menu sebaiknya mengikuti cara customer membaca, bukan hanya struktur internal dapur. Untuk cafe, kategori seperti kopi, non-kopi, makanan ringan, makanan berat, dessert, dan promo biasanya lebih mudah dipahami daripada kategori bahan atau supplier.",
          "Jangan membuat kategori terlalu banyak jika jumlah menu belum besar. Terlalu banyak pilihan membuat customer harus berpikir lebih lama. Sebaliknya, kategori yang terlalu luas membuat menu panjang dan sulit discan. Tujuannya adalah membantu customer menemukan pilihan dalam beberapa detik.",
        ],
      },
      {
        title: "Nama produk dan harga harus konsisten",
        paragraphs: [
          "Menu digital sering menjadi sumber kebenaran untuk customer dan kasir. Karena itu nama produk, harga, dan varian harus konsisten dengan POS. Jika di menu tertulis satu harga tetapi di kasir berbeda, kepercayaan customer bisa turun dan staff harus menjelaskan berulang.",
          "Gunakan nama yang jelas sebelum nama kreatif. Jika ada minuman signature, tetap beri konteks singkat seperti kopi susu, mocktail, atau tea blend. Untuk item yang punya ukuran atau topping, buat opsi yang mudah dipahami supaya customer tidak menulis catatan bebas terlalu panjang.",
        ],
      },
      {
        title: "Status produk habis perlu mudah diperbarui",
        paragraphs: [
          "Salah satu manfaat terbesar menu digital adalah owner tidak perlu mencetak ulang menu saat stok berubah. Produk habis bisa ditandai, disembunyikan, atau diberi status sehingga customer tidak memesan item yang tidak tersedia.",
          "Pastikan tim tahu siapa yang bertanggung jawab memperbarui status itu. Jika hanya owner yang bisa mengubah menu, staff bisa kesulitan saat produk habis di tengah shift. Buat SOP sederhana: kapan produk ditandai habis, kapan diaktifkan lagi, dan siapa yang mengecek sebelum outlet buka.",
        ],
      },
      {
        title: "Desain menu harus membantu, bukan mengganggu",
        paragraphs: [
          "Menu digital tidak perlu terlalu ramai. Font harus terbaca, jarak antar item cukup, tombol jelas, dan kategori mudah ditemukan. Foto produk bisa membantu, tetapi foto yang terlalu gelap atau tidak konsisten justru membuat menu terlihat kurang rapi.",
          "Pakai visual secukupnya dan fokus pada informasi yang dibutuhkan customer: nama, deskripsi singkat, harga, pilihan varian, dan status tersedia. Untuk cafe dengan banyak item, fitur pencarian atau kategori yang sticky bisa membantu, tetapi jangan sampai memperlambat halaman.",
        ],
      },
      {
        title: "Hubungkan menu digital dengan QR order jika sudah siap",
        paragraphs: [
          "Menu digital bisa berdiri sebagai katalog, tetapi nilainya lebih besar ketika customer bisa langsung membuat order. Dengan QR order meja, customer scan QR, memilih menu, dan pesanan masuk ke dashboard dengan nomor meja.",
          "Jika tim belum siap menerima order dari meja, mulai dari menu digital terlebih dahulu. Setelah menu rapi dan staff terbiasa memperbarui status produk, barulah alur order bisa diaktifkan. Pendekatan bertahap ini menjaga perubahan tetap mudah diterima.",
        ],
      },
      {
        title: "Gunakan data menu untuk keputusan operasional",
        paragraphs: [
          "Menu digital yang terhubung ke sistem kasir bisa membantu owner membaca produk yang sering dipesan dan item yang jarang bergerak. Data ini lebih berguna daripada menebak dari ingatan staff, terutama saat menu mulai banyak atau ada promo musiman.",
          "Data menu juga membantu menentukan mana item yang perlu dipromosikan, disederhanakan, atau dihentikan. Untuk UMKM F&B, keputusan kecil seperti mengurangi menu yang jarang laku bisa menekan stok mati dan membuat operasional lebih fokus.",
          "Saat membuat perubahan menu, hindari mengubah terlalu banyak hal sekaligus. Ubah kategori, nama, harga, atau promo secara bertahap supaya owner bisa melihat dampaknya dari transaksi. Jika semua berubah bersamaan, tim sulit tahu apakah penjualan naik karena menu lebih jelas, harga baru, atau promo tertentu.",
        ],
      },
    ],
    checklist: {
      title: "Checklist menu digital cafe sebelum dipakai",
      items: [
        "Kategori menu sudah mengikuti cara customer memilih.",
        "Nama produk, harga, dan varian sama dengan data kasir.",
        "Produk habis bisa ditandai atau disembunyikan cepat.",
        "Tampilan nyaman dibaca dari layar HP.",
        "Instruksi order dan pembayaran jelas.",
        "QR menu sudah diuji dari beberapa perangkat.",
        "Staff tahu cara memperbarui item penting saat shift berjalan.",
      ],
    },
    cta: {
      title: "Mau menu digital yang bisa lanjut ke QR order?",
      body: "Outletmu membantu cafe menyiapkan menu digital, QR code, dan dashboard order supaya customer bisa melihat menu dari HP dan tim tetap memegang kontrol operasional.",
      label: "Konsultasi menu digital",
    },
    faqs: [
      {
        question: "Apakah menu digital harus punya foto semua produk?",
        answer:
          "Tidak wajib. Foto bisa membantu, tetapi informasi yang paling penting adalah kategori, nama produk, harga, varian, dan status tersedia. Foto sebaiknya dipakai jika kualitasnya rapi dan konsisten.",
      },
      {
        question: "Apa bedanya menu digital dan QR order?",
        answer:
          "Menu digital adalah tampilan menu online. QR order menambahkan alur pemesanan dari meja atau HP customer sehingga pesanan bisa masuk ke dashboard kasir atau kitchen.",
      },
      {
        question: "Apakah menu digital cocok untuk restoran selain cafe?",
        answer:
          "Cocok. Restoran, kedai makan, bakery, dan outlet minuman bisa memakai menu digital selama struktur menu dan alur order disesuaikan dengan operasional masing-masing.",
      },
    ],
    internalLinks: [
      {
        href: "/menu-digital-cafe",
        label: "Solusi menu digital cafe",
        description: "Lihat fitur menu digital Outletmu untuk cafe, restoran, dan outlet F&B.",
      },
      {
        href: "/qr-order-meja",
        label: "QR order meja",
        description: "Pelajari cara menu digital bisa terhubung dengan order dari meja customer.",
      },
    ],
  },
  laporanPenjualanCafe: {
    path: "/panduan/laporan-penjualan-cafe",
    title: "Laporan Penjualan Cafe yang Perlu Dicek Owner | Outletmu",
    description:
      "Panduan laporan penjualan cafe untuk owner F&B: omzet, transaksi, produk terlaris, jam ramai, stok menipis, shift kasir, dan laporan WhatsApp.",
    h1: "Laporan Penjualan Cafe yang Perlu Dicek Owner",
    eyebrow: "Panduan laporan penjualan",
    intro: [
      "Laporan penjualan cafe seharusnya membantu owner memahami kondisi outlet, bukan hanya mengumpulkan angka. Laporan yang berguna menjawab pertanyaan harian seperti omzet hari ini, menu apa yang paling laku, transaksi mana yang perlu dicek, dan stok apa yang mulai menipis.",
      "Banyak cafe masih membuat laporan dari catatan kasir, struk, spreadsheet, atau chat staff. Cara ini bisa berjalan saat transaksi sedikit, tetapi mulai berat ketika shift bertambah, produk makin banyak, atau owner tidak selalu berada di outlet.",
    ],
    intent:
      "Panduan ini membantu owner cafe menentukan laporan apa yang perlu dibaca rutin dan bagaimana sistem kasir bisa membuat data penjualan lebih mudah ditindaklanjuti.",
    takeaways: [
      "Laporan harian membantu kontrol kasir dan shift.",
      "Produk terlaris dan stok menipis membantu keputusan menu dan restock.",
      "Owner sebaiknya punya ringkasan yang bisa dibaca cepat, termasuk lewat WhatsApp jika sering mobile.",
    ],
    sections: [
      {
        title: "Mulai dari omzet dan jumlah transaksi",
        paragraphs: [
          "Omzet harian adalah angka pertama yang biasanya dicek owner, tetapi jangan berhenti di sana. Jumlah transaksi membantu membaca apakah omzet naik karena customer bertambah atau karena nilai belanja per transaksi lebih besar. Dua kondisi ini membutuhkan keputusan yang berbeda.",
          "Jika omzet naik tetapi transaksi turun, mungkin ada pembelian besar, event, atau perubahan harga. Jika transaksi naik tetapi omzet tidak bergerak, bisa jadi item murah lebih dominan. Sistem kasir yang baik memudahkan owner membaca hubungan antara omzet dan transaksi tanpa menghitung manual.",
        ],
      },
      {
        title: "Produk terlaris membantu keputusan menu",
        paragraphs: [
          "Produk terlaris bukan sekadar daftar menu favorit. Data ini membantu owner menentukan bahan yang perlu disiapkan, item yang layak dipromosikan, dan menu yang perlu dipertahankan. Untuk cafe, produk terlaris juga bisa berbeda antara weekday, weekend, pagi, atau malam.",
          "Sebaliknya, produk yang jarang laku perlu dievaluasi. Apakah namanya kurang jelas, margin kecil, bahan sering terbuang, atau memang tidak sesuai selera customer? Laporan penjualan memberi dasar diskusi yang lebih objektif daripada hanya mengandalkan feeling.",
        ],
      },
      {
        title: "Jam ramai dan pola shift perlu terlihat",
        paragraphs: [
          "Cafe sering punya jam ramai yang berulang. Misalnya pagi untuk coffee run, sore untuk nongkrong, atau malam untuk dine-in. Laporan yang menunjukkan pola transaksi membantu owner mengatur staff, bahan, dan promo dengan lebih tepat.",
          "Jika sistem mencatat transaksi per shift, owner juga bisa mengecek apakah ada perbedaan pola antara kasir pagi dan malam. Tujuannya bukan mencari kesalahan, tetapi menjaga proses tutup shift, pembayaran, dan rekap tetap konsisten.",
        ],
      },
      {
        title: "Stok menipis harus terhubung dengan penjualan",
        paragraphs: [
          "Laporan penjualan yang tidak terhubung dengan stok sering membuat owner terlambat restock. Produk terlihat laku, tetapi stok baru diketahui habis ketika customer sudah ingin membeli. Untuk cafe, item seperti cup, susu, topping, atau produk siap jual bisa berdampak langsung pada pelayanan.",
          "Tidak semua stok harus rumit dari awal. Mulai dari item yang paling sering mengganggu operasional jika habis. Ketika transaksi dan stok berada di alur yang sama, laporan menjadi lebih mudah dipakai untuk menyiapkan pembelian berikutnya.",
        ],
      },
      {
        title: "Ringkasan WhatsApp membantu owner yang mobile",
        paragraphs: [
          "Owner cafe tidak selalu duduk di depan dashboard. Ada yang mengurus supplier, cabang lain, promosi, atau pekerjaan utama lain. Ringkasan laporan via WhatsApp membantu owner mengecek omzet, transaksi, produk terlaris, dan stok menipis tanpa membuka sistem setiap saat.",
          "Laporan WhatsApp sebaiknya tetap berasal dari data kasir, bukan dari staff yang mengetik ulang angka. Dengan begitu, ringkasan cepat tetap punya sumber data yang lebih rapi. Halaman laporan WhatsApp Outletmu menjelaskan pendekatan ini untuk owner yang butuh kontrol ringan dari jarak jauh.",
        ],
      },
      {
        title: "Jangan terlalu banyak metrik di awal",
        paragraphs: [
          "Laporan yang terlalu banyak justru jarang dibaca. Untuk batch awal, owner cafe bisa fokus pada omzet, transaksi, produk terlaris, metode pembayaran, stok menipis, dan catatan shift. Setelah itu baru tambah analisis margin, promo, member, atau cabang jika memang sudah dibutuhkan.",
          "Kuncinya adalah membuat laporan menjadi kebiasaan. Baca harian untuk kontrol operasional, baca mingguan untuk pola menu dan stok, lalu baca bulanan untuk keputusan harga atau paket produk. Sistem kasir membantu menjaga datanya tetap terkumpul tanpa rekap ulang dari nol.",
          "Agar kebiasaan itu jalan, tentukan satu waktu membaca laporan. Misalnya setelah tutup kasir, sebelum belanja bahan, atau setiap Senin pagi. Jadwal yang konsisten membuat laporan lebih mungkin dipakai untuk keputusan nyata, bukan hanya dibuka ketika ada masalah.",
        ],
      },
    ],
    checklist: {
      title: "Checklist laporan penjualan cafe",
      items: [
        "Omzet harian dan jumlah transaksi mudah dibaca.",
        "Produk terlaris tampil jelas per periode.",
        "Metode pembayaran dan transaksi penting bisa dicek ulang.",
        "Stok menipis terlihat dari alur penjualan.",
        "Data per shift atau kasir bisa ditelusuri jika dibutuhkan.",
        "Owner punya ringkasan harian yang tidak perlu direkap manual.",
        "Laporan mingguan dipakai untuk keputusan menu dan restock.",
      ],
    },
    cta: {
      title: "Butuh laporan cafe yang lebih mudah dibaca owner?",
      body: "Outletmu membantu menghubungkan POS kasir, produk, stok, dan laporan agar owner bisa melihat kondisi outlet tanpa menyusun rekap manual setiap hari.",
      label: "Konsultasi laporan penjualan",
    },
    faqs: [
      {
        question: "Laporan apa yang paling penting untuk cafe kecil?",
        answer:
          "Mulai dari omzet harian, jumlah transaksi, produk terlaris, metode pembayaran, dan stok menipis. Metrik lanjutan bisa ditambahkan setelah data dasar sudah rapi.",
      },
      {
        question: "Apakah laporan WhatsApp menggantikan dashboard?",
        answer:
          "Tidak. Dashboard tetap menjadi pusat data. Laporan WhatsApp berguna sebagai ringkasan cepat untuk owner yang tidak selalu membuka dashboard.",
      },
      {
        question: "Seberapa sering owner perlu membaca laporan penjualan?",
        answer:
          "Laporan harian berguna untuk kontrol operasional, laporan mingguan untuk melihat pola menu dan stok, dan laporan bulanan untuk keputusan harga, promo, atau pengembangan outlet.",
      },
    ],
    internalLinks: [
      {
        href: "/fitur/laporan-whatsapp",
        label: "Laporan WhatsApp",
        description: "Pelajari ringkasan omzet, transaksi, produk terlaris, dan stok menipis via WhatsApp.",
      },
      {
        href: "/pos-kasir-cafe",
        label: "POS kasir cafe",
        description: "Lihat bagaimana transaksi cafe dicatat dari POS dan masuk ke laporan Outletmu.",
      },
    ],
  },
  stokCafeGuide: {
    path: "/panduan/stok-cafe",
    title: "Cara Mengelola Stok Cafe agar Tidak Sering Habis | Outletmu",
    description:
      "Panduan cara mengelola stok cafe untuk owner F&B: stok prioritas, restock, produk terlaris, stok menipis, SOP shift, dan sistem kasir.",
    h1: "Cara Mengelola Stok Cafe agar Tidak Sering Habis",
    eyebrow: "Panduan stok cafe",
    intro: [
      "Cara mengelola stok cafe yang baik dimulai dari item yang paling berdampak pada pelayanan. Tidak semua bahan harus langsung dicatat sangat detail, tetapi produk penting seperti cup, susu, kopi, topping, dessert, atau item siap jual perlu dipantau agar tidak habis saat jam ramai.",
      "Masalah stok cafe biasanya bukan karena owner tidak peduli, tetapi karena data tersebar: kasir mencatat transaksi, staff mencatat stok di kertas, supplier diingat lewat chat, dan owner baru tahu item habis setelah customer menanyakan. Sistem yang rapi membantu menghubungkan penjualan dengan keputusan restock.",
    ],
    intent:
      "Panduan ini membantu owner cafe membuat kontrol stok yang realistis untuk UMKM F&B, mulai dari stok prioritas sampai penggunaan laporan kasir untuk restock.",
    takeaways: [
      "Mulai dari stok prioritas yang paling sering membuat penjualan tertahan jika habis.",
      "Hubungkan stok dengan transaksi agar restock tidak hanya berdasarkan ingatan.",
      "Buat SOP shift sederhana supaya update stok tidak bergantung pada satu orang.",
    ],
    sections: [
      {
        title: "Tentukan stok prioritas sebelum mencatat semuanya",
        paragraphs: [
          "Cafe punya banyak item, tetapi tidak semuanya perlu dipantau dengan tingkat detail yang sama sejak awal. Pilih stok prioritas berdasarkan tiga hal: sering terjual, sering habis mendadak, dan berdampak besar jika tidak tersedia. Contohnya susu, cup, espresso beans, topping populer, atau makanan siap jual.",
          "Dengan memulai dari stok prioritas, tim tidak merasa terbebani. Setelah proses berjalan, item lain bisa ditambahkan. Pendekatan ini lebih realistis untuk UMKM F&B daripada langsung memaksa pencatatan bahan baku lengkap yang akhirnya tidak konsisten.",
        ],
      },
      {
        title: "Gunakan batas minimum yang sederhana",
        paragraphs: [
          "Setiap stok prioritas perlu punya batas minimum. Batas ini tidak harus rumit. Owner bisa menentukan dari pengalaman: jika susu tersisa sekian liter, topping tersisa sekian porsi, atau cup tersisa sekian sleeve, staff harus memberi tanda restock.",
          "Batas minimum membantu tim mengambil tindakan sebelum stok benar-benar habis. Untuk cafe yang sudah punya data transaksi, batas ini bisa diperbaiki dari pola penjualan. Misalnya item yang ramai di akhir pekan perlu batas minimum lebih tinggi menjelang Jumat atau Sabtu.",
        ],
      },
      {
        title: "Hubungkan produk terlaris dengan rencana restock",
        paragraphs: [
          "Produk terlaris sering menjadi petunjuk stok yang paling perlu dijaga. Jika kopi susu tertentu laku setiap hari, bahan pendukungnya harus lebih sering dicek. Jika dessert musiman tiba-tiba naik, owner bisa menyiapkan stok lebih cepat sebelum momentum hilang.",
          "Tanpa laporan penjualan, restock sering dilakukan berdasarkan ingatan. Ingatan staff bisa bias karena item yang merepotkan terasa lebih sering habis daripada item yang benar-benar paling laku. Data dari POS membantu owner melihat prioritas dengan lebih tenang.",
        ],
      },
      {
        title: "Buat SOP update stok per shift",
        paragraphs: [
          "Stok tidak akan rapi jika hanya owner yang memperbarui data. Buat SOP sederhana: siapa mengecek stok awal, siapa menandai stok habis, siapa mencatat barang datang, dan kapan owner melihat laporan. SOP ini tidak perlu panjang, tetapi harus jelas untuk shift pagi dan malam.",
          "Untuk outlet kecil, update bisa dilakukan pada item prioritas saja. Staff cukup memastikan item yang masuk dan keluar tercatat di tempat yang sama dengan data kasir. Semakin sedikit tempat pencatatan, semakin kecil kemungkinan data tertinggal.",
        ],
      },
      {
        title: "Pisahkan stok produk jual dan bahan baku detail",
        paragraphs: [
          "Cafe sering mencampur dua kebutuhan: stok produk yang dijual langsung dan stok bahan baku. Keduanya penting, tetapi tingkat detailnya berbeda. Produk siap jual seperti botol minuman, pastry, atau merchandise lebih mudah dihitung langsung. Bahan baku seperti gula, susu, atau beans bisa dimulai dari kontrol minimum.",
          "Jika bisnis sudah lebih besar, bahan baku bisa dibuat lebih detail dengan resep atau satuan pemakaian. Untuk tahap awal, jangan sampai pencatatan terlalu kompleks sehingga staff berhenti memperbarui. Lebih baik sederhana tetapi konsisten daripada detail tetapi kosong.",
        ],
      },
      {
        title: "Gunakan sistem kasir sebagai sumber data operasional",
        paragraphs: [
          "Sistem kasir membantu stok karena transaksi, produk, dan laporan berada dalam alur yang sama. Saat produk terjual, owner bisa melihat pergerakan item dan membaca stok menipis dari dashboard. Ini mengurangi kebutuhan menyatukan catatan dari banyak tempat.",
          "Outletmu menyediakan fitur stok cafe dan software kasir F&B yang bisa dipakai bertahap. Cafe bisa mulai dari produk dan stok basic, lalu menambah laporan, QR order, atau workflow custom jika operasional sudah membutuhkan kontrol yang lebih dalam.",
        ],
      },
    ],
    checklist: {
      title: "Checklist mengelola stok cafe",
      items: [
        "Daftar stok prioritas sudah dipilih dari item yang paling berdampak.",
        "Setiap stok prioritas punya batas minimum restock.",
        "Produk terlaris dicek bersama kebutuhan bahan pendukungnya.",
        "Barang masuk dan item habis dicatat dalam alur yang sama.",
        "Shift pagi dan malam punya tanggung jawab update stok yang jelas.",
        "Owner membaca stok menipis sebelum jam ramai atau akhir pekan.",
        "Pencatatan dibuat sederhana dulu, lalu ditingkatkan saat tim siap.",
      ],
    },
    cta: {
      title: "Ingin stok cafe lebih nyambung dengan kasir?",
      body: "Outletmu membantu cafe mengelola produk, stok basic, transaksi, dan laporan dalam satu alur supaya restock tidak hanya bergantung pada ingatan staff.",
      label: "Konsultasi stok cafe",
    },
    faqs: [
      {
        question: "Apakah stok cafe harus dicatat sampai bahan baku detail?",
        answer:
          "Tidak harus dari awal. Banyak cafe bisa mulai dari stok prioritas dan produk penting dulu. Bahan baku detail bisa ditambahkan setelah SOP dasar sudah konsisten.",
      },
      {
        question: "Bagaimana menentukan batas minimum stok?",
        answer:
          "Mulai dari pengalaman penjualan harian dan risiko item habis. Setelah data transaksi lebih rapi, batas minimum bisa disesuaikan dengan pola weekday, weekend, dan menu terlaris.",
      },
      {
        question: "Apa hubungan stok dengan aplikasi kasir?",
        answer:
          "Aplikasi kasir membantu menghubungkan transaksi dengan produk dan laporan. Dengan begitu owner bisa melihat item yang bergerak, produk terlaris, dan stok menipis tanpa menggabungkan banyak catatan manual.",
      },
    ],
    internalLinks: [
      {
        href: "/fitur/stok-cafe",
        label: "Fitur stok cafe",
        description: "Lihat cara Outletmu membantu memantau produk, inventory basic, stok menipis, dan laporan.",
      },
      {
        href: "/software-kasir-fnb",
        label: "Software kasir F&B",
        description: "Pelajari solusi kasir F&B untuk cafe, restoran, QR order, kitchen, stok, dan laporan.",
      },
    ],
  },
};

export const guidePageEntries = Object.values(guidePages);

export function getGuidePageByPath(path: string) {
  return guidePageEntries.find((page) => page.path === path);
}
