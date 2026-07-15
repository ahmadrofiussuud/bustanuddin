"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  BookOpen,
  Trophy,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Quote,
  Play,
  Phone,
  Mail,
  MapPin,
  Clock,
  GraduationCap,
  Presentation,
  Library,
  Coins,
  School
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { schoolInfo, mockNews, mockTestimonials, timKepemimpinan, galeriItems, visiMisi } from "@/lib/data";

// -------------------------------------------------------------
// MAIN HOME COMPONENT
// -------------------------------------------------------------

export default function Home() {
  // Client Mount State
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Testimonials Carousel State
  const [currentTesti, setCurrentTesti] = useState(0);
  const testiTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Hero Slider Images State (Simulated slider)
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const heroSlides = [
    {
      badge: "WELCOME TO BUSTANUDDIN!",
      title: "Mulai Masa Depan Indah & Cerah Anda",
      text: "Kami berkomitmen menghadirkan pendidikan holistik untuk menciptakan generasi cerdas, berakhlak mulia, dan berkarakter sejak usia dini.",
      bg: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1600&auto=format&fit=crop"
    },
    {
      badge: "PENDIDIKAN BERKARAKTER LUHUR",
      title: "Membentuk Karakter & Akhlak Mulia",
      text: "Fokus kami tidak hanya pada keunggulan akademik, tetapi juga penanaman nilai budi pekerti dan pembiasaan ibadah harian.",
      bg: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop"
    }
  ];

  // Auto transition for Hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Testimonials Auto-Slide
  const startTestiTimer = () => {
    stopTestiTimer();
    testiTimerRef.current = setInterval(() => {
      setCurrentTesti((prev) => (prev + 1) % mockTestimonials.length);
    }, 5000);
  };

  const stopTestiTimer = () => {
    if (testiTimerRef.current) {
      clearInterval(testiTimerRef.current);
    }
  };

  useEffect(() => {
    startTestiTimer();
    return () => stopTestiTimer();
  }, []);

  const handleNextTesti = () => {
    stopTestiTimer();
    setCurrentTesti((prev) => (prev + 1) % mockTestimonials.length);
    startTestiTimer();
  };

  const handlePrevTesti = () => {
    stopTestiTimer();
    setCurrentTesti((prev) => (prev - 1 + mockTestimonials.length) % mockTestimonials.length);
    startTestiTimer();
  };

  // Mocked Event List
  const mockEvents = [
    {
      id: "ev-1",
      day: "20",
      month: "JUL",
      title: "Hari Pertama Masuk Sekolah & MPLS",
      time: "07:00 - 11:00 WIB",
      loc: "Aula Utama SD Bustanuddin",
      desc: "Menyambut siswa baru dengan metode transisi PAUD-SD menyenangkan."
    },
    {
      id: "ev-2",
      day: "17",
      month: "AGT",
      title: "Peringatan HUT Kemerdekaan RI ke-81",
      time: "07:00 - 12:00 WIB",
      loc: "Lapangan Olahraga Sekolah",
      desc: "Upacara bendera dan aneka perlombaan ketangkasan anak."
    },
    {
      id: "ev-3",
      day: "15",
      month: "SEP",
      title: "Pelaksanaan ANBK Gelombang I Kelas V",
      time: "07:30 - 12:30 WIB",
      loc: "Laboratorium Komputer",
      desc: "Asesmen Nasional Berbasis Komputer literasi-numerasi."
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-bgLight">
      
      {/* ==========================================
          1. HERO SECTION & CONTROLS
          ========================================== */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-primary-dark overflow-hidden">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0">
          {mounted ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHeroSlide}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <Image
                  src={heroSlides[currentHeroSlide].bg}
                  alt="Bustanuddin Slider"
                  fill
                  priority
                  className="object-cover object-center select-none brightness-95"
                />
                {/* High-contrast bright teal gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/70 to-primary-dark/30 z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-dark/10 to-primary-dark/60 z-10" />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="absolute inset-0">
              <Image
                src={heroSlides[0].bg}
                alt="Bustanuddin Slider"
                fill
                priority
                className="object-cover object-center select-none brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/70 to-primary-dark/30 z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-dark/10 to-primary-dark/60 z-10" />
            </div>
          )}
        </div>

        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-44 flex flex-col items-center lg:items-start text-center lg:text-left text-white w-full">
          {mounted ? (
            <>
              {/* Badge */}
              <motion.div
                key={`badge-${currentHeroSlide}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/40 px-4 py-1.5 text-xs sm:text-sm font-bold text-accent mb-6"
              >
                <Award className="h-4 w-4" /> {heroSlides[currentHeroSlide].badge}
              </motion.div>

              {/* Heading */}
              <motion.h1
                key={`title-${currentHeroSlide}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="max-w-4xl text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-balance leading-tight"
              >
                {heroSlides[currentHeroSlide].title.split(" & ").map((part, i) => (
                  <span key={i}>
                    {i > 0 && " & "}
                    {i === 1 ? <span className="text-accent">{part}</span> : part}
                  </span>
                ))}
              </motion.h1>

              {/* Paragraph */}
              <motion.p
                key={`text-${currentHeroSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-6 max-w-xl text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed font-light"
              >
                {heroSlides[currentHeroSlide].text}
              </motion.p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/40 px-4 py-1.5 text-xs sm:text-sm font-bold text-accent mb-6">
                <Award className="h-4 w-4" /> {heroSlides[0].badge}
              </div>
              <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-balance leading-tight">
                {heroSlides[0].title}
              </h1>
              <p className="mt-6 max-w-xl text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed font-light">
                {heroSlides[0].text}
              </p>
            </>
          )}

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
            <Link
              href="/tentang"
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-accent/20 hover:bg-accent-dark transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto gap-2 group"
            >
              TENTANG KAMI
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/ppdb"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/50 bg-white/5 backdrop-blur-sm px-8 py-3.5 text-sm font-bold text-white hover:bg-white/10 hover:border-white transition-all duration-200 w-full sm:w-auto gap-2"
            >
              PPDB ONLINE
            </Link>
          </div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={() => setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-11 w-11 hidden md:flex items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-accent hover:border-accent transition-colors"
          aria-label="Slide Sebelumnya"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-11 w-11 hidden md:flex items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-accent hover:border-accent transition-colors"
          aria-label="Slide Berikutnya"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </section>

      {/* ==========================================
          2. OVERLAPPING FEATURE CARDS
          ========================================== */}
      <section className="relative z-30 -mt-24 lg:-mt-28 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory pb-6 gap-6 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Card 1 */}
          <div className="shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100/50 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div className="h-12 w-12 rounded-2xl bg-lightAccent text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-3xl font-extrabold text-primary/15 tracking-tight">01</span>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-extrabold text-primary group-hover:text-accent transition-colors duration-200">
                Fasilitas Beasiswa
              </h3>
              <p className="mt-2.5 text-sm text-textLight/80 leading-relaxed">
                Pemberian dukungan beasiswa bagi siswa yang berprestasi baik di bidang akademik maupun keagamaan (tahfidz).
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100/50 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div className="h-12 w-12 rounded-2xl bg-lightAccent text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <Presentation className="h-6 w-6" />
              </div>
              <span className="text-3xl font-extrabold text-primary/15 tracking-tight">02</span>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-extrabold text-primary group-hover:text-accent transition-colors duration-200">
                Guru Profesional
              </h3>
              <p className="mt-2.5 text-sm text-textLight/80 leading-relaxed">
                Tenaga pendidik tersertifikasi nasional yang ramah, penyabar, serta berdedikasi membina potensi bakat anak.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100/50 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div className="h-12 w-12 rounded-2xl bg-lightAccent text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <Library className="h-6 w-6" />
              </div>
              <span className="text-3xl font-extrabold text-primary/15 tracking-tight">03</span>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-extrabold text-primary group-hover:text-accent transition-colors duration-200">
                Perpustakaan Lengkap
              </h3>
              <p className="mt-2.5 text-sm text-textLight/80 leading-relaxed">
                Ribuan koleksi buku cerita bergambar, ensiklopedia sains, dan area audio-visual ramah anak ber-AC.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100/50 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div className="h-12 w-12 rounded-2xl bg-lightAccent text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <Coins className="h-6 w-6" />
              </div>
              <span className="text-3xl font-extrabold text-primary/15 tracking-tight">04</span>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-extrabold text-primary group-hover:text-accent transition-colors duration-200">
                Biaya Terjangkau
              </h3>
              <p className="mt-2.5 text-sm text-textLight/80 leading-relaxed">
                Komitmen menghadirkan fasilitas sekolah unggulan berstandar tinggi dengan skema pembiayaan yang bersahabat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. ABOUT US SECTION
          ========================================== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side: 2-Column Image Frame Grid (Direct match to screenshot) */}
            <div className="grid grid-cols-2 gap-6 items-start w-full">
              {/* Column 1 (Left) */}
              <div className="space-y-6">
                {/* Image 1: Arched Top */}
                <div className="w-full aspect-[4/5] rounded-t-full rounded-b-3xl overflow-hidden border-4 border-white shadow-xl relative">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop"
                    alt="Siswa SD Bustanuddin"
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Yellow Badge */}
                <div className="bg-accent text-white p-5 rounded-[24px] shadow-lg flex items-center gap-4 border-2 border-white hover:scale-[1.02] transition-transform duration-300">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">Terakreditasi Baik</span>
                    <span className="text-sm font-extrabold leading-tight">20 Tahun Pengalaman</span>
                  </div>
                </div>
              </div>

              {/* Column 2 (Right) */}
              <div className="space-y-6">
                {/* Image 2: Dotted Circle */}
                <div className="w-[85%] mx-auto aspect-square rounded-full border-2 border-dashed border-accent p-1.5 flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop"
                      alt="Kegiatan Siswa"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                {/* Image 3: Inverted Arched Bottom */}
                <div className="w-full aspect-[4/5] rounded-b-full rounded-t-3xl overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop"
                    alt="Kelas Bustanuddin"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Text & Info (Matching template layout) */}
            <div className="space-y-6 lg:pl-4">
              <div className="flex items-center gap-2">
                <div className="h-[2px] w-6 bg-accent rounded-full"></div>
                <span className="text-xs font-bold text-accent uppercase tracking-widest flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" /> Tentang Kami
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight leading-tight">
                Our Edukation System <span className="text-accent">Inspires</span> You More.
              </h2>
              <p className="text-sm sm:text-base text-textLight/70 leading-relaxed font-light">
                Didirikan sejak tahun 2006, {schoolInfo.name} berdedikasi mengiringi tumbuh kembang anak didik secara holistik. Kami menggabungkan kurikulum akademis nasional terakreditasi dengan program pendidikan moral keagamaan.
              </p>

              {/* Grid for Bullet Points & Testimonial rating card */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-2">
                {/* Bullet Points (Left 7 Columns) */}
                <div className="md:col-span-7 space-y-5">
                  <div className="flex gap-4 items-start">
                    <div className="h-10 w-10 rounded-full bg-accent text-white flex items-center justify-center shrink-0 shadow-md">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-primary">Edukation Services</h4>
                      <p className="text-xs text-textLight/60 mt-1 leading-relaxed">Layanan kurikulum dasar & lanjutan terintegrasi ramah anak.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="h-10 w-10 rounded-full bg-accent text-white flex items-center justify-center shrink-0 shadow-md">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-primary">International Hubs</h4>
                      <p className="text-xs text-textLight/60 mt-1 leading-relaxed font-light">Bimbingan intensif bahasa asing dan ekstrakurikuler terpadu.</p>
                    </div>
                  </div>
                </div>

                {/* Rating Card (Right 5 Columns) */}
                <div className="md:col-span-5">
                  <div className="bg-lightAccent/45 p-5 rounded-[24px] relative min-h-[140px] flex flex-col justify-between border border-primary/5 shadow-inner hover:shadow-md transition-shadow">
                    <p className="text-xs text-textLight/70 leading-relaxed font-light italic">
                      &ldquo;Pondasi budi pekerti luhur dan pengenalan calistung dasar terbukti efektif mencetak lulusan berprestasi.&rdquo;
                    </p>
                    <span className="text-5xl font-black text-primary/10 absolute right-4 bottom-2 select-none">
                      99
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Row */}
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between border-t border-gray-100 pt-8 mt-6">
                <Link
                  href="/tentang"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-accent/20 hover:bg-accent-dark transition-all duration-200 hover:-translate-y-0.5 gap-2"
                >
                  DISCOVER MORE
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${schoolInfo.phone}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-lightAccent text-primary hover:bg-accent hover:text-white transition-all duration-200 shadow-sm"
                    aria-label="Telepon"
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-textLight/40 font-bold uppercase tracking-wider">Telepon Kami</span>
                    <span className="text-sm font-extrabold text-primary">{schoolInfo.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3.5. VISI & MISI SECTION (Arched Cards Layout)
          ========================================== */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50/55 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Vision Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-accent uppercase tracking-widest inline-block bg-accent/10 px-4 py-1.5 rounded-full">
              VISI SEKOLAH
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Visi Kami
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-primary font-medium italic leading-relaxed max-w-2xl mx-auto text-balance">
              &ldquo;{visiMisi.visi}&rdquo;
            </p>
          </div>

          {/* Mission Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-accent uppercase tracking-widest inline-block bg-accent/10 px-4 py-1.5 rounded-full">
              MISI SEKOLAH
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Misi Kami
            </h2>
          </div>

          {/* Arched Mission Cards Row Container */}
          <div className="relative pt-10 pb-6">
            {/* Background Decorative Sagging Rope Line (Visible on desktop) */}
            <div className="absolute left-0 right-0 top-10 hidden lg:block z-0 pointer-events-none">
              <svg className="w-full h-[150px]" viewBox="0 0 1200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M-50,44 Q600,92 1250,44" 
                  stroke="#ff9100" 
                  strokeWidth="4" 
                  strokeDasharray="12 12" 
                  fill="none"
                  className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10 items-start">
              {/* Card 1 */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center space-y-4 hover:shadow-xl transition-all duration-300 lg:-rotate-[8deg] lg:-translate-y-6 hover:scale-105 hover:lg:-translate-y-8 z-10">
                <div className="h-14 w-14 rounded-full bg-lightAccent text-primary flex items-center justify-center shadow-inner border-2 border-accent/20 z-20 relative">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-base font-extrabold text-primary">PAKEM</h3>
                <p className="text-xs text-textLight/70 leading-relaxed font-light">
                  Menyelenggarakan pembelajaran aktif, kreatif, efektif, dan menyenangkan berlandaskan kurikulum nasional.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center space-y-4 hover:shadow-xl transition-all duration-300 lg:-rotate-[3deg] lg:translate-y-0 hover:scale-105 hover:lg:-translate-y-2 z-10">
                <div className="h-14 w-14 rounded-full bg-lightAccent text-primary flex items-center justify-center shadow-inner border-2 border-accent/20 z-20 relative">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-base font-extrabold text-primary">Akhlak Mulia</h3>
                <p className="text-xs text-textLight/70 leading-relaxed font-light">
                  Membiasakan karakter mulia melalui nilai ibadah harian dan keteladanan akhlak pendidik.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center space-y-4 hover:shadow-xl transition-all duration-300 lg:rotate-0 lg:translate-y-6 hover:scale-105 hover:lg:translate-y-4 z-10">
                <div className="h-14 w-14 rounded-full bg-lightAccent text-primary flex items-center justify-center shadow-inner border-2 border-accent/20 z-20 relative">
                  <Trophy className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-base font-extrabold text-primary">Minat & Bakat</h3>
                <p className="text-xs text-textLight/70 leading-relaxed font-light">
                  Mengembangkan minat kreatif, bakat olahraga, dan seni anak melalui program ekstrakurikuler terpadu.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center space-y-4 hover:shadow-xl transition-all duration-300 lg:rotate-[3deg] lg:translate-y-0 hover:scale-105 hover:lg:-translate-y-2 z-10">
                <div className="h-14 w-14 rounded-full bg-lightAccent text-primary flex items-center justify-center shadow-inner border-2 border-accent/20 z-20 relative">
                  <School className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-base font-extrabold text-primary">Smart School</h3>
                <p className="text-xs text-textLight/70 leading-relaxed font-light">
                  Menerapkan teknologi ramah anak dalam media pembelajaran multimedia yang interaktif.
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center space-y-4 hover:shadow-xl transition-all duration-300 lg:rotate-[8deg] lg:-translate-y-6 hover:scale-105 hover:lg:-translate-y-8 z-10">
                <div className="h-14 w-14 rounded-full bg-lightAccent text-primary flex items-center justify-center shadow-inner border-2 border-accent/20 z-20 relative">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-base font-extrabold text-primary">Cinta Lingkungan</h3>
                <p className="text-xs text-textLight/70 leading-relaxed font-light">
                  Membudayakan perilaku hidup bersih, sehat, serta cinta lingkungan hidup di lingkungan sekolah dan rumah.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. GREEN STATS BANNER WITH IMAGE BG
          ========================================== */}
      <section className="relative py-20 text-white overflow-hidden bg-primary-dark">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1200&auto=format&fit=crop"
            alt="Students Hallway"
            className="w-full h-full object-cover select-none"
          />
          {/* Green/teal overlay matching the screenshot */}
          <div className="absolute inset-0 bg-primary/85 z-10 mix-blend-multiply"></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative h-20 w-20 flex items-center justify-center mb-5 group">
                {/* Decorative border line wrapping around it */}
                <div className="absolute inset-0 border border-white/20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-300"></div>
                {/* Asymmetrical Orange Shield/Leaf Shape */}
                <div className="h-16 w-16 bg-accent rounded-tl-[24px] rounded-br-[24px] rounded-tr-[8px] rounded-bl-[8px] flex items-center justify-center z-10 border border-white/30 shadow-md">
                  <BookOpen className="h-7 w-7 text-white" />
                </div>
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">500</span>
              <span className="text-[11px] font-bold text-white/80 tracking-wider uppercase mt-2">+ Total Courses</span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative h-20 w-20 flex items-center justify-center mb-5 group">
                <div className="absolute inset-0 border border-white/20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-300"></div>
                <div className="h-16 w-16 bg-accent rounded-tl-[24px] rounded-br-[24px] rounded-tr-[8px] rounded-bl-[8px] flex items-center justify-center z-10 border border-white/30 shadow-md">
                  <Users className="h-7 w-7 text-white" />
                </div>
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">1900</span>
              <span className="text-[11px] font-bold text-white/80 tracking-wider uppercase mt-2">+ Our Students</span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative h-20 w-20 flex items-center justify-center mb-5 group">
                <div className="absolute inset-0 border border-white/20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-300"></div>
                <div className="h-16 w-16 bg-accent rounded-tl-[24px] rounded-br-[24px] rounded-tr-[8px] rounded-bl-[8px] flex items-center justify-center z-10 border border-white/30 shadow-md">
                  <Presentation className="h-7 w-7 text-white" />
                </div>
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">750</span>
              <span className="text-[11px] font-bold text-white/80 tracking-wider uppercase mt-2">+ Skilled Lecturers</span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative h-20 w-20 flex items-center justify-center mb-5 group">
                <div className="absolute inset-0 border border-white/20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-300"></div>
                <div className="h-16 w-16 bg-accent rounded-tl-[24px] rounded-br-[24px] rounded-tr-[8px] rounded-bl-[8px] flex items-center justify-center z-10 border border-white/30 shadow-md">
                  <Trophy className="h-7 w-7 text-white" />
                </div>
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">30</span>
              <span className="text-[11px] font-bold text-white/80 tracking-wider uppercase mt-2">+ Win Awards</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. PROGRAM / COURSES SECTION
          ========================================== */}
      <section className="py-24 lg:py-32 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-accent uppercase tracking-widest inline-block bg-accent/10 px-4 py-1.5 rounded-full">
              PROGRAM UNGGULAN
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Fase Belajar & Kurikulum
            </h2>
            <p className="text-sm sm:text-base text-textLight/60 leading-relaxed font-light">
              Kami menyusun fase belajar anak usia dini dengan konsep transisi bermain sambil belajar yang menyenangkan hingga pemantapan materi ANBK yang kokoh.
            </p>
          </div>

          {/* Cards Grid with Diagonal Cut layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Fase A */}
            <div className="filter drop-shadow-md hover:drop-shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div 
                className="bg-white min-h-[440px] flex flex-col justify-between relative overflow-hidden rounded-[24px]"
                style={{ clipPath: 'polygon(3rem 0, 100% 0, 100% 100%, 0 100%, 0 3rem)' }}
              >
                {/* Top Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop"
                    alt="Fase A"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Category Tag overlay */}
                  <span className="absolute top-4 right-4 bg-accent text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md z-10">
                    Fase A
                  </span>
                  {/* Overlapping Icon Circle */}
                  <div className="absolute left-6 bottom-0 translate-y-1/2 z-20 h-14 w-14 rounded-full bg-primary flex items-center justify-center border-4 border-white text-white shadow-md group-hover:bg-accent transition-colors duration-300">
                    <School className="h-6 w-6" />
                  </div>
                </div>

                {/* Content body */}
                <div className="pt-10 px-6 pb-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-lg font-extrabold text-primary leading-snug group-hover:text-accent transition-colors">
                      Fase A: Kelas I & II (Transisi Menyenangkan)
                    </h3>
                    <p className="text-xs text-textLight/60 leading-relaxed font-light">
                      Fokus pada pengenalan dasar baca-tulis-hitung (Calistung) interaktif tanpa membebani mental belajar anak.
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-primary group-hover:text-accent transition-colors flex items-center gap-1 cursor-pointer">
                      Learn More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>

                {/* Accent bottom hover border wrapper */}
                <div className="h-[4px] w-full bg-transparent group-hover:bg-accent transition-colors absolute bottom-0 left-0 z-20"></div>
              </div>
            </div>

            {/* Card 2: Fase B */}
            <div className="filter drop-shadow-md hover:drop-shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div 
                className="bg-white min-h-[440px] flex flex-col justify-between relative overflow-hidden rounded-[24px]"
                style={{ clipPath: 'polygon(3rem 0, 100% 0, 100% 100%, 0 100%, 0 3rem)' }}
              >
                {/* Top Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop"
                    alt="Fase B"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute top-4 right-4 bg-primary text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md z-10">
                    Fase B
                  </span>
                  <div className="absolute left-6 bottom-0 translate-y-1/2 z-20 h-14 w-14 rounded-full bg-primary flex items-center justify-center border-4 border-white text-white shadow-md group-hover:bg-accent transition-colors duration-300">
                    <BookOpen className="h-6 w-6" />
                  </div>
                </div>

                {/* Content body */}
                <div className="pt-10 px-6 pb-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-lg font-extrabold text-primary leading-snug group-hover:text-accent transition-colors">
                      Fase B: Kelas III & IV (Pengembangan Nalar)
                    </h3>
                    <p className="text-xs text-textLight/60 leading-relaxed font-light">
                      Mengembangkan nalar kritis anak dengan mulai memperkenalkan pengenalan IPAS dan kerja kelompok sederhana.
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-primary group-hover:text-accent transition-colors flex items-center gap-1 cursor-pointer">
                      Learn More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>

                <div className="h-[4px] w-full bg-transparent group-hover:bg-accent transition-colors absolute bottom-0 left-0 z-20"></div>
              </div>
            </div>

            {/* Card 3: Fase C */}
            <div className="filter drop-shadow-md hover:drop-shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div 
                className="bg-white min-h-[440px] flex flex-col justify-between relative overflow-hidden rounded-[24px]"
                style={{ clipPath: 'polygon(3rem 0, 100% 0, 100% 100%, 0 100%, 0 3rem)' }}
              >
                {/* Top Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop"
                    alt="Fase C"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute top-4 right-4 bg-accent text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md z-10">
                    Fase C
                  </span>
                  <div className="absolute left-6 bottom-0 translate-y-1/2 z-20 h-14 w-14 rounded-full bg-primary flex items-center justify-center border-4 border-white text-white shadow-md group-hover:bg-accent transition-colors duration-300">
                    <Trophy className="h-6 w-6" />
                  </div>
                </div>

                {/* Content body */}
                <div className="pt-10 px-6 pb-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-lg font-extrabold text-primary leading-snug group-hover:text-accent transition-colors">
                      Fase C: Kelas V & VI (Pemantapan Mandiri)
                    </h3>
                    <p className="text-xs text-textLight/60 leading-relaxed font-light">
                      Mempersiapkan siswa menghadapi ANBK komputer nasional secara matang serta pembiasaan kemandirian transisi SMP.
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-primary group-hover:text-accent transition-colors flex items-center gap-1 cursor-pointer">
                      Learn More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>

                <div className="h-[4px] w-full bg-transparent group-hover:bg-accent transition-colors absolute bottom-0 left-0 z-20"></div>
              </div>
            </div>
          </div>

          {/* Under-Grid Action Button (Direct match to screenshot) */}
          <div className="flex justify-center items-center gap-3 mt-16">
            <Link
              href="/akademik"
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-accent/20 hover:bg-accent-dark transition-all duration-200 hover:-translate-y-0.5"
            >
              View All Services
            </Link>
            <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-md shadow-primary/10">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. VIDEO BANNER SECTION
          ========================================== */}
      <section className="relative py-32 sm:py-48 flex items-center justify-center bg-primary-dark overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1200&auto=format&fit=crop"
            alt="Profil Video Background"
            className="h-full w-full object-cover select-none brightness-50"
          />
          <div className="absolute inset-0 bg-primary-dark/70 z-10" />
        </div>

        <div className="relative z-20 mx-auto max-w-4xl px-4 text-center text-white space-y-6">
          {/* Pulsing Play Button */}
          <div className="flex justify-center">
            <button
              onClick={() => alert("Memutar Video Profil Sekolah...")}
              className="relative h-20 w-20 rounded-full bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/30 hover:scale-110 active:scale-95 transition-all duration-300 group"
              aria-label="Putar Video"
            >
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-25 group-hover:opacity-40"></div>
              <Play className="h-8 w-8 fill-current ml-1" />
            </button>
          </div>
          <span className="text-xs font-extrabold text-accent uppercase tracking-widest">VIDEO PROFIL</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Lihat Kegiatan Belajar Sekolah Kami
          </h2>
          <p className="text-sm max-w-lg mx-auto text-white/80 font-light leading-relaxed">
            Saksikan profil lengkap sarana prasarana sekolah dasar, taman bermain, laboratorium komputer, dan suasana belajar interaktif anak-anak kami.
          </p>
        </div>
      </section>

      {/* ==========================================
          7. TEACHERS SECTION
          ========================================== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-accent uppercase tracking-widest inline-block bg-accent/10 px-4 py-1.5 rounded-full">
              PENGURUS SEKOLAH
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Guru & Staff Pengajar
            </h2>
            <p className="text-sm sm:text-base text-textLight/60 leading-relaxed font-light">
              Tenaga pendidik profesional berpengalaman lulusan universitas ternama yang bersertifikasi dan berdedikasi tinggi membina akhlak mulia siswa.
            </p>
          </div>

          {/* Teachers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {timKepemimpinan.slice(0, 4).map((teacher, index) => (
              <div key={index} className="group bg-gray-50 rounded-3xl overflow-hidden border border-gray-100/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay background color with social media icons */}
                  <div className="absolute inset-0 bg-primary-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <span className="text-white text-xs font-bold bg-accent py-2 px-4 rounded-full shadow-md">
                      Lihat Bio
                    </span>
                  </div>
                </div>
                <div className="p-5 text-center flex-grow flex flex-col justify-center bg-white border-t border-gray-50">
                  <h3 className="font-extrabold text-primary group-hover:text-accent transition-colors duration-200 text-base">
                    {teacher.name}
                  </h3>
                  <p className="text-[11px] text-textLight/50 uppercase tracking-wider font-bold mt-1">
                    {teacher.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          8. EVENTS & GALLERY SECTION
          ========================================== */}
      <section className="py-24 lg:py-32 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left: Upcoming Events */}
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-extrabold text-primary tracking-tight">
                  Agenda & Kegiatan Terdekat
                </h2>
                <Link href="/berita" className="text-xs font-bold text-accent hover:text-accent-dark transition-colors flex items-center gap-1">
                  Lihat Semua Agenda <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="space-y-6">
                {mockEvents.map((ev) => (
                  <div key={ev.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
                    {/* Date Block */}
                    <div className="h-16 w-16 rounded-xl bg-lightAccent text-primary shrink-0 flex flex-col items-center justify-center border border-primary/5">
                      <span className="text-xl font-black leading-none">{ev.day}</span>
                      <span className="text-[9px] font-bold tracking-widest uppercase mt-1 text-accent">{ev.month}</span>
                    </div>
                    {/* Text Details */}
                    <div className="space-y-1 flex-grow">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-textLight/40 font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-accent" /> {ev.time}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-accent" /> {ev.loc}</span>
                      </div>
                      <h3 className="text-base font-extrabold text-primary hover:text-accent transition-colors cursor-pointer pt-1">
                        {ev.title}
                      </h3>
                      <p className="text-xs text-textLight/60 leading-relaxed font-light pt-0.5">{ev.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Photo Gallery */}
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-extrabold text-primary tracking-tight">
                  Galeri Foto Sekolah
                </h2>
                <Link href="/galeri" className="text-xs font-bold text-accent hover:text-accent-dark transition-colors flex items-center gap-1">
                  Lihat Semua Galeri <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {galeriItems.slice(0, 6).map((item) => (
                  <div key={item.id} className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 text-center">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider line-clamp-2">
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          9. CONTACT FORM & QUERY SECTION
          ========================================== */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-lightAccent/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-primary rounded-[40px] shadow-2xl overflow-hidden border border-white/10 grid grid-cols-1 lg:grid-cols-12">
            {/* Left Content (Grid: 5 columns) */}
            <div className="p-8 sm:p-12 lg:col-span-5 flex flex-col justify-between text-white bg-secondary/30 relative">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest block">HUBUNGI KAMI</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Kirimkan Pertanyaan Anda</h2>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  Apakah Anda memiliki pertanyaan seputar tata cara PPDB, administrasi pendaftaran, kurikulum, atau fasilitas bermain? Tim kami siap melayani Anda.
                </p>
              </div>

              <div className="space-y-4 mt-8 pt-8 border-t border-white/10 text-xs">
                <div className="flex gap-3 items-center">
                  <Phone className="h-4 w-4 text-accent shrink-0" />
                  <span>{schoolInfo.phone}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Mail className="h-4 w-4 text-accent shrink-0" />
                  <span>{schoolInfo.email}</span>
                </div>
                <div className="flex gap-3 items-start">
                  <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>Galis, Pamekasan, Jatim</span>
                </div>
              </div>
            </div>

            {/* Right Form (Grid: 7 columns) */}
            <div className="p-8 sm:p-12 lg:col-span-7 bg-white">
              <form onSubmit={(e) => { e.preventDefault(); alert("Formulir terkirim! Terima kasih."); }} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-wider block">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama Anda"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-accent bg-gray-50/50 text-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-wider block">Alamat Email</label>
                    <input
                      type="email"
                      required
                      placeholder="Masukkan email Anda"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-accent bg-gray-50/50 text-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-wider block">Subjek Pertanyaan</label>
                  <input
                    type="text"
                    required
                    placeholder="Pendaftaran PPDB / Informasi Sekolah"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-accent bg-gray-50/50 text-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-wider block">Isi Pesan Anda</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan pertanyaan detail Anda di sini..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-accent bg-gray-50/50 text-primary resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-accent py-3 text-xs font-extrabold text-white shadow-lg shadow-accent/20 hover:bg-accent-dark hover:-translate-y-0.5 active:translate-y-0 transition-all uppercase tracking-wider"
                >
                  Kirim Pesan Sekarang
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          10. TESTIMONIALS SECTION
          ========================================== */}
      <section className="py-24 lg:py-32 bg-gray-50/50 relative overflow-hidden">
        <div className="absolute top-10 right-10 text-accent/5 pointer-events-none">
          <Quote className="h-48 w-48 transform rotate-180" />
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold text-accent uppercase tracking-widest inline-block bg-accent/10 px-4 py-1.5 rounded-full">
              KATA WALI MURID
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Testimoni & Suara Alumni
            </h2>
          </div>

          {/* Slider Container */}
          <div className="relative bg-white rounded-[32px] p-6 sm:p-12 shadow-xl border border-gray-100 flex flex-col justify-between min-h-[300px]">
            <div className="absolute top-6 left-6 text-accent/15">
              <Quote className="h-8 w-8" />
            </div>

            <div className="flex-grow flex items-center justify-center py-4">
              {mounted ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTesti}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full text-center space-y-6"
                  >
                    <p className="text-sm sm:text-base italic text-textLight/70 leading-relaxed max-w-2xl mx-auto px-4 font-light">
                      &ldquo;{mockTestimonials[currentTesti].content}&rdquo;
                    </p>
                    
                    {/* User Profile */}
                    <div className="flex flex-col items-center">
                      <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-accent shadow-md">
                        <img
                          src={mockTestimonials[currentTesti].avatar}
                          alt={mockTestimonials[currentTesti].name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h4 className="mt-3 text-base font-extrabold text-primary">
                        {mockTestimonials[currentTesti].name}
                      </h4>
                      <p className="text-[10px] text-accent font-bold uppercase tracking-wider mt-0.5">
                        {mockTestimonials[currentTesti].role}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="w-full text-center space-y-6">
                  <p className="text-sm sm:text-base italic text-textLight/70 leading-relaxed max-w-2xl mx-auto px-4 font-light">
                    &ldquo;{mockTestimonials[0].content}&rdquo;
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-accent shadow-md">
                      <img
                        src={mockTestimonials[0].avatar}
                        alt={mockTestimonials[0].name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h4 className="mt-3 text-base font-extrabold text-primary">
                      {mockTestimonials[0].name}
                    </h4>
                    <p className="text-[10px] text-accent font-bold uppercase tracking-wider mt-0.5">
                      {mockTestimonials[0].role}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex items-center justify-between mt-8 border-t border-gray-100 pt-6">
              <button
                onClick={handlePrevTesti}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-lightAccent text-primary hover:bg-accent hover:text-white transition-all shadow-sm"
                aria-label="Testimoni Sebelumnya"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {mockTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      stopTestiTimer();
                      setCurrentTesti(idx);
                      startTestiTimer();
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentTesti === idx ? "w-6 bg-accent" : "w-2 bg-gray-200"
                    }`}
                    aria-label={`Ke slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextTesti}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-lightAccent text-primary hover:bg-accent hover:text-white transition-all shadow-sm"
                aria-label="Testimoni Berikutnya"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          11. LATEST NEWS & BLOG
          ========================================== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4 border-b border-gray-100 pb-6">
            <div>
              <span className="text-xs font-bold text-accent uppercase tracking-widest inline-block bg-accent/10 px-4 py-1.5 rounded-full mb-3">
                KABAR TERBARU
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                Berita & Informasi Kegiatan
              </h2>
            </div>
            <Link
              href="/berita"
              className="inline-flex items-center gap-1 text-sm font-bold text-accent hover:text-accent-dark group transition-colors shrink-0"
            >
              Lihat Semua Berita
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockNews.slice(0, 3).map((news) => (
              <article key={news.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                {/* Image & Category Tag */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-accent text-white text-[9px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
                    {news.category}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center text-[10px] text-textLight/40 font-bold uppercase tracking-wider gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-accent" />
                      <span>{news.date}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2">
                      <Link href={`/berita/${news.slug}`}>{news.title}</Link>
                    </h3>
                    <p className="text-xs text-textLight/60 font-light leading-relaxed line-clamp-3">
                      {news.excerpt}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link
                      href={`/berita/${news.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-accent transition-colors"
                    >
                      Baca Selengkapnya <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
