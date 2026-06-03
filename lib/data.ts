// Global configurations and mockup data for SD Tunas Bangsa

export const schoolInfo = {
  name: "SD Bustanuddin",
  shortName: "Bustanuddin",
  tagline: "Cerdas, Berakhlak Mulia, Berkarakter Sejak Dini",
  foundedYear: 2006,
  accreditation: "A (Sangat Baik)",
  email: "info@sdbustanuddin.sch.id",
  phone: "(021) 555-0195",
  whatsapp: "6281234567890", // International format without "+"
  whatsappMessage: "Halo SD Bustanuddin, saya ingin menanyakan informasi pendaftaran siswa baru.",
  address: "Jl. Raya Bustanuddin No. 45, Pamekasan, Madura, Jawa Timur 69311",
  hours: [
    { days: "Senin - Kamis", time: "07:00 - 13:00" },
    { days: "Jumat", time: "07:00 - 11:30" },
    { days: "Sabtu", time: "08:00 - 10:30 (Ekskul)" },
  ],
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.090124314115!2d113.4831627!3d-7.1611243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb2c31e9a2d3%3A0x6b2e1bf4f9f76a03!2sPamekasan!5e0!3m2!1sid!2sid!4v1717416000000!5m2!1sid!2sid", // Madura coordinate coordinates
  socials: {
    instagram: "https://instagram.com/sdbustanuddin",
    youtube: "https://youtube.com/sdbustanuddin",
    facebook: "https://facebook.com/sdbustanuddin",
  }
};

export const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Akademik", href: "/akademik" },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Berita", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];

export const stats = [
  { value: "2006", label: "Tahun Berdiri", detail: "Sejak tahun 2006" },
  { value: "356", label: "Siswa Aktif", detail: "PAUD - Kelas 6" },
  { value: "34", label: "Guru & Staff", detail: "Tenaga pendidik penyabar & tersertifikasi" },
  { value: "86%", label: "Lulusan Favorit", detail: "Masuk SMP/MTs Favorit" },
];

export const mockNews = [
  {
    id: "news-1",
    title: "Siswa SD Tunas Bangsa Meraih Medali Emas Olimpiade Sains Nasional SD 2026",
    category: "Prestasi",
    date: "1 Juni 2026",
    excerpt: "Prestasi membanggakan kembali diukir oleh siswa SD Tunas Bangsa di ajang Olimpiade Sains Nasional (OSN) tingkat nasional dalam bidang Matematika...",
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=800&auto=format&fit=crop",
    slug: "prestasi-olimpiade-sains-nasional-sd"
  },
  {
    id: "news-2",
    title: "Pelepasan dan Wisuda Kelulusan Kelas VI Angkatan XXX SD Tunas Bangsa",
    category: "Kegiatan",
    date: "28 Mei 2026",
    excerpt: "Acara kelulusan dan pelepasan siswa kelas VI angkatan 30 berlangsung dengan penuh keceriaan dan haru dihadiri oleh seluruh wali murid serta komite...",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    slug: "wisuda-angkatan-xxx-sd"
  },
  {
    id: "news-3",
    title: "SD Tunas Bangsa Gelar Sosialisasi PPDB Tahun Ajaran 2026/2027",
    category: "Pendaftaran",
    date: "15 Mei 2026",
    excerpt: "Menjelang tahun ajaran baru, SD Tunas Bangsa menyelenggarakan kegiatan open house serta pemaparan jalur pendaftaran siswa baru untuk transisi PAUD-SD...",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
    slug: "sosialisasi-ppdb-sd-2026"
  }
];

export const mockTestimonials = [
  {
    id: "testi-1",
    name: "Budi Santoso",
    role: "Orang Tua Siswa (Wali Murid Kelas III)",
    content: "Sangat bersyukur menyekolahkan anak saya di SD Tunas Bangsa. Selain unggul dalam pembentukan calistung dasar, sekolah ini juga sangat fokus pada pengembangan akhlak anak sejak dini.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "testi-2",
    name: "Dr. Siti Rahmawati",
    role: "Alumni 2010 (Dokter Anak)",
    content: "Pondasi kedisiplinan, kejujuran, dan pembiasaan ibadah yang diajarkan sejak di SD Tunas Bangsa sangat membantu membentuk integritas diri saya hingga kini.",
    avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "testi-3",
    name: "Rendra Kusuma",
    role: "Orang Tua Siswa (Wali Murid Kelas I)",
    content: "Fasilitas bermain (playground) sangat aman dan asri. Anak saya tidak merasa takut saat transisi dari TK ke SD karena metode pembelajarannya menyenangkan.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "testi-4",
    name: "Dewi Lestari",
    role: "Alumni & Orang Tua Siswa",
    content: "Sebagai alumni yang sekarang menitipkan pendidikan dasar anak saya di sini, saya melihat Tunas Bangsa terus berkembang pesat tanpa kehilangan jati diri kesopanan dan budi pekerti luhur.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
  }
];

export const sejarahTimeline = [
  {
    year: "2006",
    title: "Pendirian Sekolah Dasar",
    description: "Diresmikan oleh Yayasan Pendidikan Tunas Bangsa dengan program PAUD dan kelas I-III di awal pendirian."
  },
  {
    year: "2002",
    title: "Akreditasi A Pertama",
    description: "Meraih predikat Akreditasi A (Sangat Baik) dari BAN-S/M setelah audit kelayakan sarana bermain ramah anak dan kurikulum dasar."
  },
  {
    year: "2010",
    title: "Perpustakaan Ramah Anak",
    description: "Pembangunan gedung perpustakaan khusus anak-anak yang dilengkapi buku bergambar, ensiklopedia, dan area audio-visual."
  },
  {
    year: "2015",
    title: "Sekolah Ramah Anak Model",
    description: "Ditunjuk oleh Kementerian Pendidikan sebagai sekolah dasar percontohan ramah anak dan anti-perundungan tingkat regional."
  },
  {
    year: "2020",
    title: "Implementasi Smart School",
    description: "Peluncuran sistem monitoring terintegrasi untuk orang tua: e-learning tematik, aplikasi rapor digital, dan presensi gerbang sekolah."
  },
  {
    year: "2026",
    title: "Wisuda Angkatan XXX & Adiwiyata",
    description: "Merayakan kelulusan angkatan ke-30 tingkat sekolah dasar dan meraih predikat Sekolah Adiwiyata atas kepedulian lingkungan hidup sejak dini."
  }
];

export const visiMisi = {
  visi: "Terwujudnya anak didik yang bertakwa, berakhlak mulia, cerdas, kreatif, mandiri, dan peduli lingkungan sejak usia dini.",
  misi: [
    "Menyelenggarakan pembelajaran aktif, kreatif, efektif, dan menyenangkan (PAKEM) berlandaskan kurikulum nasional yang adaptif.",
    "Membiasakan karakter mulia melalui nilai ibadah harian, keteladanan akhlak pendidik, dan pembinaan budi pekerti luhur.",
    "Mengembangkan minat kreatif, bakat olahraga, dan seni anak melalui program ekstrakurikuler terpadu.",
    "Menerapkan teknologi ramah anak dalam media pembelajaran multimedia yang interaktif dan dinamis.",
    "Membudayakan perilaku hidup bersih, sehat, serta cinta lingkungan hidup di lingkungan sekolah dan rumah."
  ]
};

export const nilaiNilai = [
  {
    title: "Jujur",
    description: "Menanamkan nilai kejujuran dalam berkata, berbuat, serta mengerjakan tugas sekolah sehari-hari."
  },
  {
    title: "Sopan Santun",
    description: "Membiasakan sikap hormat kepada orang tua, guru, menyayangi sesama teman, dan bertutur kata lembut."
  },
  {
    title: "Disiplin",
    description: "Menghargai waktu belajar, rapi dalam berseragam, serta taat aturan sekolah secara mandiri."
  },
  {
    title: "Kreatif",
    description: "Mendorong keberanian berekspresi, berimajinasi, dan mencoba hal-hal baru yang bermanfaat."
  }
];

export const timKepemimpinan = [
  {
    name: "Dr. H. Ahmad Sunaryo, M.Pd.",
    role: "Kepala Sekolah",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=250&auto=format&fit=crop",
    bio: "Berpengalaman lebih dari 25 tahun mengelola pendidikan dasar dasar. Berdedikasi mencetak generasi berkarakter sejak dini."
  },
  {
    name: "Dra. Hajah Martini",
    role: "Wakasek Bidang Kurikulum",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop",
    bio: "Perancang transisi metode PAUD-SD menyenangkan dan koordinator implementasi Kurikulum Merdeka SD."
  },
  {
    name: "Drs. M. Ridwan, M.Si.",
    role: "Wakasek Bidang Kesiswaan",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop",
    bio: "Fokus pada pembinaan akhlak anak, pembentukan karakter Pramuka Siaga, dokter kecil, dan minat bakat seni."
  },
  {
    name: "Budi Hermawan, S.T.",
    role: "Wakasek Bidang Sarana & Prasarana",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop",
    bio: "Bertanggung jawab atas pemeliharaan area bermain (playground), keasrian kelas ber-AC, dan keamanan sekolah."
  },
  {
    name: "Siti Aisyah, S.Sos.",
    role: "Wakasek Bidang Hubungan Masyarakat",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&auto=format&fit=crop",
    bio: "Menjembatani kemitraan erat dengan persatuan orang tua siswa (POMG) demi menyelaraskan pendidikan rumah-sekolah."
  },
  {
    name: "Haji Rahman Effendi, M.M.",
    role: "Kepala Tata Usaha",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=250&auto=format&fit=crop",
    bio: "Mengelola urusan administrasi rapor siswa, data pokok pendidikan (Dapodik), dan layanan administrasi PPDB."
  }
];

export const programKeahlian = [
  {
    id: "fase-a",
    title: "Fase A: Kelas I & II (Transisi Menyenangkan)",
    description: "Fokus pada pengenalan dasar literasi-numerasi melalui pendekatan bermain sambil belajar yang menyenangkan.",
    details: [
      "Pengenalan dasar membaca, menulis, dan berhitung (Calistung) interaktif.",
      "Pembiasaan ibadah praktis, hafalan doa-doa pendek harian, dan pembinaan budi pekerti dasar.",
      "Pengembangan motorik anak melalui kelas prakarya, seni mewarnai, serta senam ceria."
    ]
  },
  {
    id: "fase-b",
    title: "Fase B: Kelas III & IV (Pengembangan Nalar)",
    description: "Mengembangkan nalar kritis anak dengan mulai memperkenalkan pengenalan konsep alam dan sosial.",
    details: [
      "Integrasi IPA & IPS dalam Ilmu Pengetahuan Alam dan Sosial (IPAS) terpadu.",
      "Pembelajaran berbasis proyek kelompok kecil untuk menumbuhkan gotong royong.",
      "Pengenalan dasar bahasa asing (Bahasa Inggris dasar) secara lisan."
    ]
  },
  {
    id: "fase-c",
    title: "Fase C: Kelas V & VI (Pemantapan Mandiri)",
    description: "Mempersiapkan siswa menghadapi Asesmen Nasional serta mempersiapkan transisi matang menuju jenjang SMP.",
    details: [
      "Pengayaan materi logika numerasi tingkat lanjut dan analisis bacaan literasi.",
      "Bimbingan khusus persiapan ujian sekolah serta tryout berkala.",
      "Pelatihan kepemimpinan dasar melalui kepramukaan (Pramuka Penggalang)."
    ]
  }
];

export const kurikulumBreakdown = [
  {
    phase: "Fase A (Kelas I & II)",
    subtitle: "Pondasi Dasar",
    description: "Pendekatan tematik terpadu yang meminimalkan beban tugas tertulis dan menekankan kenyamanan belajar siswa.",
    focus: [
      "Pengenalan jati diri, emosi sosial, dan interaksi dengan lingkungan sekolah baru.",
      "Projek Profil Pelajar Pancasila (P5) bertema Bhinneka Tunggal Ika (saling menghargai teman).",
      "Penerapan pembelajaran membaca nyaring dan bermain angka."
    ]
  },
  {
    phase: "Fase B (Kelas III & IV)",
    subtitle: "Eksplorasi Konseptual",
    description: "Siswa diajak mengamati dan memecahkan tantangan sederhana di sekitar mereka secara berkelompok.",
    focus: [
      "Studi alam sekitar sekolah untuk pembelajaran sains dasar.",
      "Projek P5 bertema Gaya Hidup Berkelanjutan (pilah sampah & pembuatan kerajinan daur ulang).",
      "Pengenalan dasar-dasar digital ramah anak di laboratorium komputer."
    ]
  },
  {
    phase: "Fase C (Kelas V & VI)",
    subtitle: "Asesmen & Penguatan",
    description: "Mengembangkan kesiapan akademik menyeluruh serta kemandirian kepribadian siswa sebagai pemimpin masa depan.",
    focus: [
      "Persiapan simulasi Asesmen Nasional Berbasis Komputer (ANBK) literasi-numerasi.",
      "Projek P5 bertema Kewirausahaan (membuat jajanan pasar sehat khas daerah).",
      "Konseling pengembangan minat bakat olahraga/seni untuk beasiswa masuk SMP."
    ]
  }
];

export const jadwalKBM = [
  { day: "Senin", hours: "07:00 - 13:00", notes: "Upacara Bendera Bendera, KBM Tematik" },
  { day: "Selasa", hours: "07:00 - 13:00", notes: "KBM, Kegiatan Ekskul Wajib Pramuka Siaga" },
  { day: "Rabu", hours: "07:00 - 13:00", notes: "KBM, Pojok Baca/Literasi Pustaka Pagi" },
  { day: "Kamis", hours: "07:00 - 13:00", notes: "KBM, Senam Ceria Anak / Budaya Sehat" },
  { day: "Jumat", hours: "07:00 - 11:30", notes: "Sholat Dhuha Berjamaah, Kajian Dongeng Islami, KBM Singkat" },
  { day: "Sabtu", hours: "08:00 - 10:30", notes: "Kegiatan Ekstrakurikuler Pilihan (Seni Lukis, Futsal, Tari, Musik)" }
];

export const prestasiAkademik = [
  {
    year: "2026",
    title: "Juara 1 OSN Matematika SD Nasional",
    student: "Ahmad Fatih (Kelas V-A)",
    desc: "Meraih medali emas nasional pada ajang OSN SD bidang Matematika di Jakarta."
  },
  {
    year: "2025",
    title: "Juara 1 Lomba Menggambar & Mewarnai DKI",
    student: "Naila Khaira (Kelas III-B)",
    desc: "Memenangkan piala gubernur DKI atas kreativitas ilustrasi kelestarian sungai bersih."
  },
  {
    year: "2025",
    title: "Juara 2 Dokter Kecil Tingkat Kota",
    student: "Tim UKS Tunas Bangsa",
    desc: "Mendapat penghargaan atas presentasi kebersihan sanitasi dan pencegahan DBD sekolah."
  },
  {
    year: "2024",
    title: "Terbaik Ujian Sekolah Rata-rata Sempurna",
    student: "Zahra Salsabila (Alumni 2024)",
    desc: "Siswa dengan rata-rata nilai US kelulusan tertinggi di wilayah binaan pendidikan."
  }
];

export const downloadDocuments = [
  {
    name: "Brosur Pendaftaran PPDB SD 2026/2027",
    size: "2.4 MB",
    type: "PDF",
    url: "#"
  },
  {
    name: "Kalender Akademik SD TA 2026/2027",
    size: "1.2 MB",
    type: "PDF",
    url: "#"
  },
  {
    name: "Rencana Program Pembelajaran Kurikulum SD",
    size: "3.5 MB",
    type: "PDF",
    url: "#"
  },
  {
    name: "Buku Panduan Tata Tertib & Seragam Siswa",
    size: "2.1 MB",
    type: "PDF",
    url: "#"
  }
];

export const fasilitasList = [
  {
    name: "Taman Bermain (Playground) Edukatif",
    desc: "Area playground luar ruangan yang asri dan aman, dilengkapi perosotan, ayunan, dan terowongan ketangkasan motorik dengan alas rumput sintetis.",
    image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Laboratorium Komputer Dasar",
    desc: "Dilengkapi 30 unit komputer ramah anak dengan software penunjang kreativitas menggambar, mengetik 10 jari, dan materi edukatif.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Perpustakaan Ramah Anak (Kid's Library)",
    desc: "Koleksi ribuan buku cerita anak bergambar, ensiklopedia sains bergambar, dongeng karakter, area baca lesehan berkarpet empuk, dan AC.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Lapangan Olahraga & Arena Bermain",
    desc: "Lapangan multifungsi untuk kegiatan olahraga futsal anak, senam bersama, serta upacara bendera hari Senin.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Masjid Baitul Ilmu",
    desc: "Masjid yang bersih dan sejuk sebagai sarana praktek shalat dhuha/dhuhur berjamaah, hafalan juz amma, serta kajian akhlak mulia.",
    image: "https://images.unsplash.com/photo-1590075865003-e48277adc558?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Unit Kesehatan Sekolah & Dokter Kecil",
    desc: "Dilengkapi tempat tidur istirahat anak yang nyaman, obat-obatan anak lengkap, alat ukur tinggi/berat badan, dan diawasi guru terlatih.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Kantin Sehat Higienis",
    desc: "Kantin bersih yang menjual makanan dan minuman sehat bergizi, bebas pengawet, pemanis buatan, serta zat aditif berbahaya.",
    image: "https://images.unsplash.com/photo-1567521464027-f127ff1443cd?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Ruang Konseling & Bimbingan Anak",
    desc: "Layanan konsultasi psikologi perkembangan anak untuk membantu mengatasi masalah belajar, adaptasi sekolah, dan bimbingan kepribadian.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop"
  }
];

export const beritaPageList = [
  {
    id: "news-1",
    title: "Siswa SD Tunas Bangsa Meraih Medali Emas Olimpiade Sains Nasional SD 2026",
    category: "Berita",
    date: "1 Juni 2026",
    excerpt: "Prestasi membanggakan kembali diukir oleh siswa SD Tunas Bangsa di ajang Olimpiade Sains Nasional (OSN) tingkat nasional dalam bidang Matematika...",
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=800&auto=format&fit=crop",
    slug: "prestasi-olimpiade-sains-nasional-sd"
  },
  {
    id: "news-2",
    title: "Pelepasan dan Wisuda Kelulusan Kelas VI Angkatan XXX SD Tunas Bangsa",
    category: "Berita",
    date: "28 Mei 2026",
    excerpt: "Acara kelulusan dan pelepasan siswa kelas VI angkatan 30 berlangsung dengan penuh keceriaan dan haru dihadiri oleh seluruh wali murid serta komite...",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    slug: "wisuda-angkatan-xxx-sd"
  },
  {
    id: "news-3",
    title: "SD Tunas Bangsa Gelar Sosialisasi PPDB Tahun Ajaran 2026/2027",
    category: "Pengumuman",
    date: "15 Mei 2026",
    excerpt: "Menjelang tahun ajaran baru, SD Tunas Bangsa menyelenggarakan kegiatan open house serta pemaparan jalur pendaftaran siswa baru untuk transisi PAUD-SD...",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
    slug: "sosialisasi-ppdb-sd-2026"
  },
  {
    id: "news-4",
    title: "Rapat Koordinasi POMG Semester Genap Tahun Ajaran 2025/2026",
    category: "Agenda",
    date: "10 Mei 2026",
    excerpt: "Undangan koordinasi akhir semester persatuan orang tua murid dan guru (POMG) terkait kegiatan liburan edukasi serta persiapan tahun ajaran baru...",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    slug: "rapat-pomg-semester-genap"
  },
  {
    id: "news-5",
    title: "Pengumpulan Berkas Pendaftaran Beasiswa Berbakat & Tahfidz Juz Amma",
    category: "Pengumuman",
    date: "2 Mei 2026",
    excerpt: "Diberitahukan kepada wali murid mengenai pembukaan program seleksi beasiswa prestasi anak berbakat di bidang menggambar/olahraga serta program hafalan Juz Amma...",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    slug: "beasiswa-tahfidz-juz-amma"
  },
  {
    id: "news-6",
    title: "Tim Futsal Anak SD Tunas Bangsa Juara 1 Turnamen U-12 Antar SD",
    category: "Berita",
    date: "25 April 2026",
    excerpt: "Kabar gembira datang dari lapangan futsal, tim sepakbola kategori umur 12 tahun sekolah berhasil meraih juara satu turnamen piala dinas pendidikan kota...",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
    slug: "tim-futsal-u12-juara-1"
  },
  {
    id: "news-7",
    title: "Kegiatan Aksi Tanam Pohon & Pameran Daur Ulang P5 Hari Bumi",
    category: "Agenda",
    date: "12 April 2026",
    excerpt: "Anak-anak kelas IV & V berpartisipasi menanam tanaman hias pot, memilah sampah plastik botol, serta memamerkan tas belanja dari plastik daur ulang hasil karya mereka...",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
    slug: "hari-bumi-p5-sd"
  }
];

export const pengumumanTerbaru = [
  { id: "p1", title: "Pendaftaran Ulang Siswa Baru Jalur Prestasi Terakhir 20 Juni 2026", date: "3 Juni" },
  { id: "p2", title: "Pengambilan Rapor Semester Genap Kelas I - V Tanggal 26 Juni 2026 oleh Orang Tua", date: "1 Juni" },
  { id: "p3", title: "Pengembalian Buku Paket Perpustakaan Pinjaman Kelas VI Batas Akhir 15 Juni", date: "28 Mei" },
  { id: "p4", title: "Jadwal Pengambilan Perlengkapan Seragam & Buku Tulis Murid Baru", date: "20 Mei" }
];

export const kalenderAkademikSidebar = [
  { month: "Juni 2026", event: "Penilaian Sumatif Akhir Semester Genap & Pameran Hasil Karya P5" },
  { month: "Juli 2026", event: "Libur Kenaikan Kelas & Hari Pertama Masuk Sekolah / MPLS Transisi PAUD-SD" },
  { month: "Agustus 2026", event: "Peringatan HUT Kemerdekaan RI & Festival Lomba Permainan Tradisional Anak" },
  { month: "September 2026", event: "Pelaksanaan Asesmen Nasional Berbasis Komputer (ANBK) Kelas V SD" }
];

export const galeriItems = [
  { id: 1, title: "Pembelajaran Interaktif Mewarnai", category: "Akademik", image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "Latihan Komputer Dasar Anak", category: "Akademik", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "Turnamen Sepakbola Mini Ceria", category: "Olahraga", image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop" },
  { id: 4, title: "Latihan Senam Irama Anak", category: "Olahraga", image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?q=80&w=800&auto=format&fit=crop" },
  { id: 5, title: "Pameran Kreasi Tanah Liat Mewarnai", category: "Seni", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop" },
  { id: 6, title: "Latihan Bermain Angklung Sekolah", category: "Seni", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" },
  { id: 7, title: "Sosialisasi Open House POMG", category: "PPDB", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop" },
  { id: 8, title: "Pengamatan Kesiapan Belajar Anak", category: "PPDB", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop" },
  { id: 9, title: "Upacara Pelepasan Siswa Kelas VI", category: "Wisuda", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop" },
  { id: 10, title: "Foto Bersama Pelepasan Balon Kelas VI", category: "Wisuda", image: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=800&auto=format&fit=crop" },
  { id: 11, title: "Membaca Buku Cerita Bergambar", category: "Akademik", image: "https://images.unsplash.com/photo-1581091870622-0402e88a0e8c?q=80&w=800&auto=format&fit=crop" },
  { id: 12, title: "Latihan Menari Tradisional Anak", category: "Seni", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop" }
];

export const ppdbFAQs = [
  {
    q: "Berapa batas minimal usia anak untuk mendaftar kelas I SD?",
    a: "Sesuai dengan ketentuan dinas pendidikan, usia calon siswa minimal adalah 6 tahun pada bulan Juli 2026. Prioritas penerimaan utama diberikan kepada anak berusia 7 tahun ke atas."
  },
  {
    q: "Apa saja berkas administrasi yang wajib diunggah?",
    a: "Scan Kartu Keluarga (KK), Akta Kelahiran asli anak, KTP orang tua/wali murid, scan ijazah TK (jika ada), pasfoto berwarna ukuran 3x4, dan fotokopi sertifikat imunisasi dasar."
  },
  {
    q: "Apakah pendaftaran PPDB SD online dikenakan biaya?",
    a: "Biaya pengisian formulir pendaftaran PPDB SD online dibebaskan dari biaya alias 100% Gratis. Pembayaran rincian seragam dan uang pangkal hanya dilakukan saat daftar ulang siswa lolos."
  },
  {
    q: "Apakah calon siswa wajib menguasai kemampuan calistung sebelum masuk?",
    a: "Tidak. Sesuai prinsip Transisi PAUD-SD yang Menyenangkan, sekolah tidak mensyaratkan tes calistung pada seleksi masuk. Penerimaan murni didasarkan pada usia anak serta kuota daya tampung kelas."
  },
  {
    q: "Bagaimana cara berkonsultasi mengenai tata cara pendaftaran?",
    a: "Bapak/Ibu wali murid dapat menghubungi helpdesk PPDB online kami melalui chat WhatsApp di nomor (0812-3456-7890) pada hari kerja Senin-Jumat pukul 07:00-13:00."
  }
];
