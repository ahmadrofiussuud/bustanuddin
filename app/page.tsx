"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowDown,
  Award,
  BookOpen,
  Cpu,
  Trophy,
  Users,
  ShieldCheck,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { schoolInfo, mockNews, mockTestimonials } from "@/lib/data";

// -------------------------------------------------------------
// HELPER COMPONENTS FOR ANIMATIONS
// -------------------------------------------------------------

// Scroll Reveal Animation Wrapper
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

function Reveal({ children, delay = 0, direction = "up", duration = 0.6 }: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const getDirectionVariants = () => {
    switch (direction) {
      case "up":
        return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
      case "down":
        return { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } };
      case "left":
        return { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };
      case "right":
        return { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } };
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={getDirectionVariants()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

// Count Up Animation Component
interface CounterProps {
  value: string;
  label: string;
  detail: string;
}

function Counter({ value, label, detail }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Extract digits and suffix (e.g. "1200+" -> number: 1200, suffix: "+")
  const numericString = value.replace(/[^0-9]/g, "");
  const targetNum = parseInt(numericString, 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 35,
    stiffness: 80,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(targetNum);
    }
  }, [isInView, targetNum, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <span
        ref={ref}
        className="text-4xl sm:text-5xl font-extrabold text-accent leading-none"
      >
        0{suffix}
      </span>
      <span className="mt-2 text-sm sm:text-base font-semibold text-white/90">
        {label}
      </span>
      <span className="mt-1 text-xs text-white/60">
        {detail}
      </span>
    </div>
  );
}

// Countdown Clock Component (Safe for SSR hydration)
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Setting target date to July 15, 2026 (PPDB closing season in mid-July)
    const targetDate = new Date("2026-07-15T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex gap-4 items-center justify-center py-4">
        <div className="h-16 w-16 bg-white/10 rounded-lg animate-pulse"></div>
        <div className="h-16 w-16 bg-white/10 rounded-lg animate-pulse"></div>
        <div className="h-16 w-16 bg-white/10 rounded-lg animate-pulse"></div>
        <div className="h-16 w-16 bg-white/10 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  const timeBlocks = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap gap-3 sm:gap-4 items-center justify-center">
      {timeBlocks.map((block, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 min-w-[70px] sm:min-w-[85px] shadow-lg animate-fade-in"
        >
          <span className="text-xl sm:text-3xl font-extrabold text-accent">
            {block.value.toString().padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs font-medium text-white/70 uppercase tracking-wider mt-1">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// -------------------------------------------------------------
// MAIN HOME COMPONENT
// -------------------------------------------------------------

export default function Home() {
  // Testimonials state
  const [currentTesti, setCurrentTesti] = useState(0);
  const testiTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Stats constants
  const customStats = [
    { value: "356", label: "Siswa Aktif", detail: "PAUD - Kelas 6" },
    { value: "34", label: "Guru Profesional", detail: "Tersertifikasi Nasional" },
    { value: "20", label: "Tahun Berpengalaman", detail: "Sejak Tahun 2006" },
    { value: "86%", label: "Lulusan Favorit", detail: "Masuk SMP & MTs Favorit" },
  ];

  // Features List
  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-accent" />,
      title: "Kurikulum Nasional+",
      description: "Menggabungkan kurikulum nasional terakreditasi dengan program intensif bahasa asing, kepemimpinan, dan kewirausahaan.",
    },
    {
      icon: <Cpu className="h-6 w-6 text-accent" />,
      title: "Lab Modern",
      description: "Fasilitas penunjang praktikum biologi, fisika, kimia, komputer multimedia, dan laboratorium bahasa berstandar tinggi.",
    },
    {
      icon: <Trophy className="h-6 w-6 text-accent" />,
      title: "Ekstrakurikuler Lengkap",
      description: "Lebih dari 15 cabang ekskul mulai dari robotika, pramuka, olimpiade sains, olahraga prestasi, hingga musik dan teater.",
    },
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: "Guru Berpengalaman",
      description: "Tenaga pendidik lulusan universitas ternama yang tersertifikasi dan berdedikasi tinggi membimbing bakat anak.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-accent" />,
      title: "Lingkungan Kondusif",
      description: "Kampus yang asri, sejuk, bebas polusi suara, dilengkapi sistem keamanan CCTV 24 jam untuk ketenangan belajar.",
    },
    {
      icon: <Award className="h-6 w-6 text-accent" />,
      title: "Prestasi Nasional",
      description: "Setiap tahun secara konsisten menorehkan prestasi gemilang di tingkat kabupaten, provinsi, hingga olimpiade nasional.",
    },
  ];

  // Handle Testimonials Auto-Slide
  const startTestiTimer = () => {
    stopTestiTimer();
    testiTimerRef.current = setInterval(() => {
      setCurrentTesti((prev) => (prev + 1) % mockTestimonials.length);
    }, 4000);
  };

  const stopTestiTimer = () => {
    if (testiTimerRef.current) {
      clearInterval(testiTimerRef.current);
    }
  };

  useEffect(() => {
    startTestiTimer();
    return () => stopTestiTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-primary-dark overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="SD Tunas Bangsa Campus Building"
            fill
            priority
            className="object-cover object-center scale-105 select-none"
          />
          {/* Overlay color gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/85 to-primary/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-dark/20 to-primary-dark z-10" />
        </div>

        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center lg:items-start text-center lg:text-left text-white w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/40 px-4 py-1.5 text-xs sm:text-sm font-semibold text-accent mb-6"
          >
            <Award className="h-4 w-4" /> Terakreditasi {schoolInfo.accreditation}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-balance leading-tight"
          >
            Membentuk Generasi Unggul & <span className="text-accent">Berakhlak Mulia</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed font-light"
          >
            Selamat datang di {schoolInfo.name}. Kami berkomitmen menghadirkan pendidikan holistik untuk menciptakan insan {schoolInfo.tagline.toLowerCase()}.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto"
          >
            <Link
              href="/ppdb"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3.5 text-base font-bold text-white shadow-lg hover:bg-accent-dark transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto gap-2"
            >
              Daftar Sekarang <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#stats-bar"
              className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/5 backdrop-blur-sm px-6 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-all duration-200 w-full sm:w-auto"
            >
              Pelajari Lebih Lanjut
            </a>
          </motion.div>
        </div>

        {/* Bouncing scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <motion.a
            href="#stats-bar"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-accent hover:border-accent transition-colors"
            aria-label="Scroll Down"
          >
            <ArrowDown className="h-5 w-5" />
          </motion.a>
        </div>
      </section>

      {/* 2. STATS BAR SECTION */}
      <section id="stats-bar" className="bg-primary border-y border-white/5 py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {customStats.map((stat, idx) => (
              <Counter
                key={idx}
                value={stat.value}
                label={stat.label}
                detail={stat.detail}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. KEUNGGULAN SEKOLAH */}
      <section className="py-20 lg:py-28 bg-[#f8fdf9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="down">
              <h2 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">
                Mengapa Memilih Kami?
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Komitmen Kami untuk Pendidikan Terbaik
              </h3>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <p className="mt-4 text-sm sm:text-base text-textLight/70 leading-relaxed">
                Kami menyediakan ekosistem pendidikan yang lengkap untuk mendukung perkembangan potensi akademik dan bakat non-akademik siswa secara menyeluruh.
              </p>
            </Reveal>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, idx) => (
              <Reveal key={idx} delay={idx * 0.05} direction="up">
                <div className="group h-full bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-accent/40 dark:bg-zinc-900 dark:border-zinc-800">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lightAccent text-primary transition-colors duration-300 group-hover:bg-accent group-hover:text-white mb-6">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-bold text-primary dark:text-white transition-colors duration-300 group-hover:text-accent">
                    {feature.title}
                  </h4>
                  <p className="mt-3 text-sm text-textLight/70 leading-relaxed dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* 4. BERITA TERBARU */}
      <section className="py-20 lg:py-28 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-16 gap-4">
            <div>
              <Reveal direction="right">
                <h2 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">
                  Kabar & Informasi
                </h2>
              </Reveal>
              <Reveal direction="right" delay={0.1}>
                <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-primary dark:text-white sm:text-4xl">
                  Berita & Kegiatan Terbaru
                </h3>
              </Reveal>
            </div>
            <Reveal direction="left" delay={0.2}>
              <Link
                href="/berita"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary hover:text-accent group transition-colors"
              >
                Lihat Semua Berita
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          {/* News List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockNews.map((news, idx) => (
              <Reveal key={news.id} delay={idx * 0.1} direction="up">
                <article className="group flex flex-col h-full bg-bgLight rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-zinc-900/50 dark:border-zinc-800">
                  {/* Image Wrapper */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 z-10 rounded-md bg-accent px-2.5 py-1 text-xs font-bold text-white shadow-md">
                      {news.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-col flex-grow p-6">
                    <div className="flex items-center text-xs text-textLight/40 dark:text-zinc-500 mb-3 gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{news.date}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-primary dark:text-white leading-snug group-hover:text-accent transition-colors">
                      <Link href={`/berita/${news.slug}`}>{news.title}</Link>
                    </h4>
                    <p className="mt-3 text-xs sm:text-sm text-textLight/70 dark:text-zinc-400 line-clamp-3 leading-relaxed flex-grow">
                      {news.excerpt}
                    </p>
                    
                    <div className="mt-5 pt-4 border-t border-gray-200/50 dark:border-zinc-800">
                      <Link
                        href={`/berita/${news.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-secondary group-hover:text-accent transition-colors"
                      >
                        Baca Selengkapnya <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* 5. TESTIMONI (KATA MEREKA) */}
      <section className="py-20 lg:py-28 bg-[#f8fdf9] relative overflow-hidden">
        {/* Background visual graphics */}
        <div className="absolute top-20 right-20 text-lightAccent/30 scale-150 select-none pointer-events-none">
          <Quote className="h-40 w-40 transform rotate-180" />
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14">
            <Reveal direction="down">
              <h2 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">
                Kata Mereka
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Suara Orang Tua & Alumni
              </h3>
            </Reveal>
          </div>

          {/* Slider Container */}
          <div className="relative bg-white rounded-3xl p-6 sm:p-12 shadow-xl border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800 min-h-[320px] flex flex-col justify-between">
            
            {/* Big quote mark icon */}
            <div className="absolute top-6 left-6 text-accent/15 select-none">
              <Quote className="h-10 w-10" />
            </div>

            <div className="relative overflow-hidden flex-grow flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTesti}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full text-center"
                >
                  <p className="text-sm sm:text-base lg:text-lg italic text-textLight/80 dark:text-zinc-300 leading-relaxed px-4">
                    &ldquo;{mockTestimonials[currentTesti].content}&rdquo;
                  </p>
                  
                  {/* User Profile */}
                  <div className="mt-8 flex flex-col items-center">
                    <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-accent">
                      <Image
                        src={mockTestimonials[currentTesti].avatar}
                        alt={mockTestimonials[currentTesti].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="mt-3 text-base font-bold text-primary dark:text-white">
                      {mockTestimonials[currentTesti].name}
                    </h4>
                    <p className="text-xs text-textLight/50 dark:text-zinc-500 font-semibold uppercase tracking-wider mt-0.5">
                      {mockTestimonials[currentTesti].role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex items-center justify-between mt-8 border-t border-gray-100 dark:border-zinc-800 pt-6">
              {/* Prev Button */}
              <button
                onClick={handlePrevTesti}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-lightAccent text-primary hover:bg-accent hover:text-white transition-all shadow-sm"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Dots indicator */}
              <div className="flex gap-2">
                {mockTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      stopTestiTimer();
                      setCurrentTesti(idx);
                      startTestiTimer();
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentTesti === idx ? "w-6 bg-accent" : "w-2.5 bg-gray-200 dark:bg-zinc-800"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextTesti}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-lightAccent text-primary hover:bg-accent hover:text-white transition-all shadow-sm"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 6. CTA BANNER (PPDB COUNTDOWN) */}
      <section className="relative py-20 lg:py-24 bg-gradient-to-br from-primary via-secondary to-primary-dark text-white text-center overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute inset-0 z-0 opacity-15">
          <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-accent blur-3xl" />
          <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-lightAccent blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          
          <Reveal direction="down">
            <h2 className="text-accent font-bold uppercase tracking-widest text-xs sm:text-sm">
              Penerimaan Peserta Didik Baru (PPDB)
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h3 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight">
              Bergabunglah Bersama Kami di Tahun Ajaran 2026/2027
            </h3>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="mt-4 max-w-xl text-sm sm:text-base text-white/80 leading-relaxed">
              Jadilah bagian dari perjalanan menuju prestasi global. Kuota pendaftaran jalur beasiswa prestasi dan reguler terbatas!
            </p>
          </Reveal>

          {/* Countdown Clock */}
          <div className="mt-8 sm:mt-10">
            <Reveal direction="up" delay={0.3}>
              <h4 className="text-xs text-white/60 uppercase font-bold tracking-widest mb-3">
                Waktu Pendaftaran Tersisa:
              </h4>
              <CountdownTimer />
            </Reveal>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10">
            <Reveal direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Link
                  href="/ppdb"
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-accent-dark hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:w-auto"
                >
                  Daftar Sekarang (PPDB Online)
                </Link>
                <a
                  href={`https://wa.me/${schoolInfo.whatsapp}?text=${encodeURIComponent(
                    schoolInfo.whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/5 backdrop-blur-sm px-6 py-4 text-sm font-semibold text-white hover:bg-white/15 transition-all w-full sm:w-auto gap-2"
                >
                  Konsultasi PPDB (WhatsApp)
                </a>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

    </div>
  );
}
