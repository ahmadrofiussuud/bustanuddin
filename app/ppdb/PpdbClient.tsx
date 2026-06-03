"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ChevronRight,
  User,
  FileCheck,
  ClipboardList,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Plus,
  Minus,
  MessageCircle,
  Loader2,
  FileText,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { schoolInfo, ppdbFAQs } from "@/lib/data";

// -------------------------------------------------------------
// 1. ZOD REGISTRATION SCHEMA
// -------------------------------------------------------------
const ppdbSchema = z.object({
  fullName: z.string().min(3, { message: "Nama lengkap minimal 3 karakter" }),
  originSchool: z.string().min(3, { message: "Asal sekolah (TK/PAUD) minimal 3 karakter" }),
  candidateAge: z.number({ message: "Usia calon siswa wajib diisi" })
    .min(6, { message: "Usia minimal pendaftaran adalah 6 tahun" })
    .max(12, { message: "Usia maksimal pendaftaran adalah 12 tahun" }),
  birthDate: z.string().min(1, { message: "Tanggal lahir wajib diisi" }),
  address: z.string().min(10, { message: "Alamat minimal 10 karakter" }),
  phoneNumber: z
    .string()
    .min(9, { message: "Nomor HP minimal 9 digit" })
    .max(15, { message: "Nomor HP maksimal 15 digit" })
    .regex(/^[0-9]+$/, { message: "Nomor HP hanya boleh berisi angka" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  programChoice: z.string().min(1, { message: "Jalur PPDB wajib dipilih" }),
  acceptTerms: z.literal(true, {
    message: "Anda harus menyetujui kebenaran data",
  }),
});

type PpdbFormData = z.infer<typeof ppdbSchema>;

// Scroll Reveal component
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

function Reveal({ children, delay = 0, direction = "up", duration = 0.6 }: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const getDirectionVariants = () => {
    switch (direction) {
      case "up":
        return { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
      case "down":
        return { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } };
      case "left":
        return { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } };
      case "right":
        return { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } };
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

// -------------------------------------------------------------
// TIMER BLOCK COMPONENT
// -------------------------------------------------------------
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) {
    return <div className="h-10 w-48 bg-white/10 rounded animate-pulse"></div>;
  }

  return (
    <div className="flex gap-2.5 items-center justify-center bg-black/35 px-4 py-2 rounded-xl border border-white/15">
      <span className="text-xs uppercase font-extrabold text-accent">Tersisa:</span>
      <span className="text-sm sm:text-base font-mono font-bold">
        {timeLeft.days}h : {timeLeft.hours}j : {timeLeft.minutes}m : {timeLeft.seconds}s
      </span>
    </div>
  );
}

// -------------------------------------------------------------
// MAIN PPDB CLIENT COMPONENT
// -------------------------------------------------------------

export default function PpdbClient() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeReq, setActiveReq] = useState<number | null>(0);
  const [submitData, setSubmitData] = useState<PpdbFormData | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Steps
  const alurSteps = [
    { title: "Daftar Online", desc: "Isi data formulir registrasi online", icon: <User className="h-5 w-5" /> },
    { title: "Upload Dokumen", desc: "Upload berkas Akta Lahir & KK", icon: <FileText className="h-5 w-5" /> },
    { title: "Verifikasi Berkas", desc: "Tim memeriksa validitas data", icon: <FileCheck className="h-5 w-5" /> },
    { title: "Observasi Siswa", desc: "Kesiapan belajar & wawancara wali", icon: <ClipboardList className="h-5 w-5" /> },
    { title: "Pengumuman", desc: "Pengumuman kelulusan di portal", icon: <CheckCircle className="h-5 w-5" /> },
  ];

  // Requirements checklist accordion data
  const persyaratanGroups = [
    {
      title: "Berkas Utama Pendaftaran",
      items: [
        "Scan fotokopi Rapor TK/PAUD (jika ada, Format PDF, maksimal 2MB).",
        "Scan Akta Kelahiran asli calon siswa (Format PDF/JPG, maksimal 1MB).",
        "Scan Kartu Keluarga (KK) terbaru (Format PDF/JPG, maksimal 1MB).",
        "Scan Surat Keterangan Lulus TK / Surat keterangan aktif PAUD dari sekolah asal.",
        "Pasfoto berwarna ukuran 3x4 dengan latar belakang merah (Format JPG, maksimal 500KB).",
      ],
    },
    {
      title: "Berkas Tambahan Jalur Beasiswa",
      items: [
        "Sertifikat/Piagam Kejuaraan Menggambar/Olahraga Anak minimal tingkat Kecamatan (Jalur Prestasi).",
        "Surat Keterangan Tahfidz Quran minimal hafal Juz Amma (Jalur Tahfidz).",
        "Surat Keterangan Tidak Mampu (SKTM) & KIP/KKS asli (Jalur Afirmasi).",
      ],
    },
  ];

  // PPDB Milestones / Schedule
  const jadwalPpdb = [
    { date: "1 Maret - 20 Juni 2026", event: "Pendaftaran Online Jalur Beasiswa & Prestasi" },
    { date: "1 April - 14 Juli 2026", event: "Pendaftaran Online Jalur Reguler" },
    { date: "22 Juni 2026", event: "Pengumuman Hasil Seleksi Jalur Prestasi" },
    { date: "16 - 17 Juli 2026", event: "Ujian Seleksi Tertulis & Wawancara Jalur Reguler" },
    { date: "20 Juli 2026", event: "Pengumuman Kelulusan Utama Jalur Reguler" },
    { date: "21 - 25 Juli 2026", event: "Daftar Ulang Siswa Baru & Pengambilan Seragam" },
  ];

  // Pricing
  const rincianBiaya = [
    { category: "Biaya Pendaftaran", cost: "Gratis", note: "Simulasi formulir Rp 0" },
    { category: "Uang Pangkal / Gedung", cost: "Rp 8.500.000", note: "Dibayar 1x di awal (bisa diangsur 2x)" },
    { category: "Uang Kegiatan Tahunan", cost: "Rp 2.200.000", note: "Termasuk kegiatan pramuka, study tour, OSIS" },
    { category: "Paket Seragam Sekolah (5 Set)", cost: "Rp 1.800.000", note: "Batik, Jas Almamater, Pramuka, Putih Abu, Olahraga" },
    { category: "SPP Bulanan (Jalur Reguler)", cost: "Rp 750.000", note: "Jalur beasiswa diskon SPP 50% - 100%" },
  ];

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PpdbFormData>({
    resolver: zodResolver(ppdbSchema),
  });

  const onSubmit = (data: PpdbFormData) => {
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitData(data);
      setShowSuccessModal(true);
    }, 1500);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setSubmitData(null);
    reset(); // reset form fields
  };

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. HERO SECTION & COUNTDOWN */}
      <section className="relative bg-gradient-to-r from-primary via-primary-dark to-secondary text-white py-16 sm:py-24 overflow-hidden">
        {/* Abstract patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d8f3dc_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <Reveal direction="down">
              <span className="inline-block bg-accent/20 border border-accent/40 px-3.5 py-1 rounded-full text-xs font-bold text-accent mb-3">
                Tahun Ajaran 2026/2027
              </span>
            </Reveal>
            <Reveal direction="down" delay={0.05}>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">PPDB Online</h1>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <div className="mt-3 flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-white/70">
                <Link href="/" className="hover:text-accent transition-colors">Beranda</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white font-medium">Pendaftaran Online</span>
              </div>
            </Reveal>
          </div>

          <Reveal direction="up" delay={0.15}>
            <div className="flex flex-col items-center sm:items-end">
              <span className="text-xs uppercase text-white/55 font-bold tracking-wider mb-2">Penutupan Jalur Reguler:</span>
              <CountdownTimer />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. ALUR PENDAFTARAN STEPPER */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Reveal direction="down">
              <h2 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">Prosedur Registrasi</h2>
            </Reveal>
            <Reveal direction="up" delay={0.05}>
              <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-primary dark:text-white">5 Langkah Mudah Mendaftar</h3>
            </Reveal>
          </div>

          {/* Stepper Grid wrapper */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative mt-6">
            {alurSteps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.05} direction="up">
                <div className="bg-bgLight p-6 rounded-2xl border border-gray-150/40 text-center flex flex-col items-center h-full relative dark:bg-zinc-900 dark:border-zinc-800">
                  {/* Step bubble badge */}
                  <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                    {idx + 1}
                  </div>
                  
                  {/* Visual Circle Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lightAccent text-primary mb-4 shadow-inner">
                    {step.icon}
                  </div>
                  
                  <h4 className="text-sm sm:text-base font-bold text-primary dark:text-white leading-snug">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-xs text-textLight/60 dark:text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* 3. PERSYARATAN & 4. JADWAL PPDB */}
      <section className="py-16 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Accordion checklist requirements (7 cols on desktop) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Reveal direction="right">
                <h3 className="text-xl sm:text-2xl font-extrabold text-primary dark:text-white mb-4">
                  Berkas Persyaratan yang Diperlukan
                </h3>
              </Reveal>

              <div className="flex flex-col gap-4">
                {persyaratanGroups.map((group, idx) => {
                  const isOpen = activeReq === idx;
                  return (
                    <Reveal key={idx} delay={idx * 0.05} direction="right">
                      <div className="bg-white rounded-2xl border border-gray-150/50 shadow-sm overflow-hidden dark:bg-zinc-900 dark:border-zinc-800">
                        <button
                          onClick={() => setActiveReq(isOpen ? null : idx)}
                          className="flex w-full items-center justify-between px-6 py-4.5 text-left font-bold text-sm sm:text-base text-primary dark:text-white bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 transition-colors hover:bg-gray-50"
                        >
                          {group.title}
                          <ChevronDown className={`h-4.5 w-4.5 text-textLight/40 transition-transform ${isOpen ? "transform rotate-180 text-accent" : ""}`} />
                        </button>
                        
                        <div
                          className={`transition-all duration-300 ${
                            isOpen ? "max-h-[350px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                          }`}
                        >
                          <ul className="p-6 space-y-3.5 text-xs sm:text-sm">
                            {group.items.map((item, keyIdx) => (
                              <li key={keyIdx} className="flex gap-3 items-start">
                                <CheckCircle className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                                <span className="text-textLight/85 leading-relaxed dark:text-zinc-300">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            {/* PPDB Timeline Card (5 cols on desktop) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <Reveal direction="left">
                <h3 className="text-xl sm:text-2xl font-extrabold text-primary dark:text-white mb-4">
                  Jadwal Penting Pelaksanaan
                </h3>
              </Reveal>

              <Reveal direction="left" delay={0.05}>
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-150/55 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
                  <div className="flex flex-col gap-6">
                    {jadwalPpdb.map((row, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        {/* Circle node index */}
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-lightAccent text-primary font-bold text-xs shrink-0 shadow-inner mt-0.5">
                          {idx + 1}
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-accent font-mono block leading-none">
                            {row.date}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-primary dark:text-white leading-relaxed block mt-1">
                            {row.event}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* 5. BIAYA PENDIDIKAN PRICING */}
      <section className="py-16 bg-white dark:bg-zinc-950 border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <Reveal direction="down">
              <h2 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">Rincian Investasi Pendidikan</h2>
            </Reveal>
            <Reveal direction="up" delay={0.05}>
              <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-primary dark:text-white">Estimasi Biaya Pendidikan</h3>
            </Reveal>
          </div>

          {/* Pricing table block */}
          <Reveal direction="up" delay={0.1}>
            <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-150/50 dark:bg-zinc-900 dark:border-zinc-800">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-primary text-white border-b border-primary-dark">
                      <th className="px-6 py-4.5 text-sm sm:text-base font-bold">Komponen Pembiayaan</th>
                      <th className="px-6 py-4.5 text-sm sm:text-base font-bold">Rincian Estimasi</th>
                      <th className="px-6 py-4.5 text-sm sm:text-base font-bold">Keterangan Tambahan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150/40 text-xs sm:text-sm">
                    {rincianBiaya.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`hover:bg-lightAccent/20 dark:hover:bg-zinc-800 transition-colors ${
                          idx % 2 === 0 ? "bg-white dark:bg-zinc-900" : "bg-bgLight dark:bg-zinc-900/50"
                        }`}
                      >
                        <td className="px-6 py-4 font-bold text-primary dark:text-accent">{row.category}</td>
                        <td className="px-6 py-4 font-extrabold text-secondary dark:text-white">{row.cost}</td>
                        <td className="px-6 py-4 text-textLight/70 dark:text-zinc-400">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* 6. FORMULIR PENDAFTARAN PPDB */}
      <section id="ppdb-form" className="py-20 bg-bgLight">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <Reveal direction="down">
              <h2 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">Registrasi Mandiri</h2>
            </Reveal>
            <Reveal direction="up" delay={0.05}>
              <h3 className="mt-1 text-2xl sm:text-4xl font-extrabold tracking-tight text-primary dark:text-white">Formulir Pendaftaran PPDB</h3>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <p className="mt-3 text-xs sm:text-sm text-textLight/60 dark:text-zinc-400 max-w-md mx-auto">
                Silakan isi data formulir di bawah ini dengan lengkap dan benar sesuai dokumen kependudukan Anda.
              </p>
            </Reveal>
          </div>

          <Reveal direction="up" delay={0.15}>
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-gray-150/50 dark:bg-zinc-900 dark:border-zinc-800">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Form Row 1: Nama Lengkap */}
                <div>
                  <label htmlFor="fullName" className="block text-xs uppercase font-extrabold tracking-wide text-primary dark:text-white mb-2">
                    Nama Lengkap Calon Siswa *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    {...register("fullName")}
                    placeholder="Contoh: Muhammad Rian Hidayat"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-bgLight dark:bg-zinc-850 dark:text-white outline-none transition-all ${
                      errors.fullName ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-accent"
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1.5 font-medium">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.fullName.message}
                    </span>
                  )}
                </div>

                {/* Grid Row 2: Asal Sekolah & Rata-Rata UN */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="originSchool" className="block text-xs uppercase font-extrabold tracking-wide text-primary dark:text-white mb-2">
                      Sekolah Asal (TK/PAUD) *
                    </label>
                    <input
                      id="originSchool"
                      type="text"
                      {...register("originSchool")}
                      placeholder="Contoh: TK Bustanuddin 1"
                      className={`w-full px-4 py-3 text-sm rounded-xl border bg-bgLight dark:bg-zinc-850 dark:text-white outline-none transition-all ${
                        errors.originSchool ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-accent"
                      }`}
                    />
                    {errors.originSchool && (
                      <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1.5 font-medium">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.originSchool.message}
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="candidateAge" className="block text-xs uppercase font-extrabold tracking-wide text-primary dark:text-white mb-2">
                      Usia Calon Siswa (Tahun) *
                    </label>
                    <input
                      id="candidateAge"
                      type="number"
                      {...register("candidateAge", { valueAsNumber: true })}
                      placeholder="Contoh: 7"
                      className={`w-full px-4 py-3 text-sm rounded-xl border bg-bgLight dark:bg-zinc-850 dark:text-white outline-none transition-all ${
                        errors.candidateAge ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-accent"
                      }`}
                    />
                    {errors.candidateAge && (
                      <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1.5 font-medium">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.candidateAge.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Grid Row 3: Tanggal Lahir & Jurusan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="birthDate" className="block text-xs uppercase font-extrabold tracking-wide text-primary dark:text-white mb-2">
                      Tanggal Lahir Calon Siswa *
                    </label>
                    <input
                      id="birthDate"
                      type="date"
                      {...register("birthDate")}
                      className={`w-full px-4 py-3 text-sm rounded-xl border bg-bgLight dark:bg-zinc-850 dark:text-white outline-none transition-all ${
                        errors.birthDate ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-accent"
                      }`}
                    />
                    {errors.birthDate && (
                      <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1.5 font-medium">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.birthDate.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="programChoice" className="block text-xs uppercase font-extrabold tracking-wide text-primary dark:text-white mb-2">
                      Pilihan Jalur PPDB *
                    </label>
                    <select
                      id="programChoice"
                      {...register("programChoice")}
                      className={`w-full px-4 py-3 text-sm rounded-xl border bg-bgLight dark:bg-zinc-850 dark:text-white outline-none transition-all ${
                        errors.programChoice ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-accent"
                      }`}
                    >
                      <option value="">-- Pilih Jalur PPDB --</option>
                      <option value="Jalur Reguler">Jalur Reguler</option>
                      <option value="Jalur Prestasi & Bakat">Jalur Prestasi & Bakat</option>
                      <option value="Jalur Beasiswa Tahfidz">Jalur Beasiswa Tahfidz Juz Amma</option>
                    </select>
                    {errors.programChoice && (
                      <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1.5 font-medium">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.programChoice.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Grid Row 4: Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phoneNumber" className="block text-xs uppercase font-extrabold tracking-wide text-primary dark:text-white mb-2">
                      Nomor HP Aktif (Wali/Siswa) *
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      {...register("phoneNumber")}
                      placeholder="Contoh: 08123456789"
                      className={`w-full px-4 py-3 text-sm rounded-xl border bg-bgLight dark:bg-zinc-850 dark:text-white outline-none transition-all ${
                        errors.phoneNumber ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-accent"
                      }`}
                    />
                    {errors.phoneNumber && (
                      <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1.5 font-medium">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.phoneNumber.message}
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase font-extrabold tracking-wide text-primary dark:text-white mb-2">
                      Alamat Email Aktif *
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="Contoh: budi@gmail.com"
                      className={`w-full px-4 py-3 text-sm rounded-xl border bg-bgLight dark:bg-zinc-850 dark:text-white outline-none transition-all ${
                        errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-accent"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1.5 font-medium">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Form Row 5: Alamat Tinggal */}
                <div>
                  <label htmlFor="address" className="block text-xs uppercase font-extrabold tracking-wide text-primary dark:text-white mb-2">
                    Alamat Tinggal Lengkap *
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    {...register("address")}
                    placeholder="Masukkan alamat jalan, RT/RW, kelurahan, kecamatan, kota."
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-bgLight dark:bg-zinc-850 dark:text-white outline-none transition-all ${
                      errors.address ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-accent"
                    }`}
                  ></textarea>
                  {errors.address && (
                    <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1.5 font-medium">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.address.message}
                    </span>
                  )}
                </div>

                {/* Form Row 6: Upload Foto Mock */}
                <div>
                  <label className="block text-xs uppercase font-extrabold tracking-wide text-primary dark:text-white mb-2">
                    Pasfoto Berwarna Calon Siswa (Mock Upload)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-2xl bg-bgLight dark:bg-zinc-850 dark:border-zinc-800">
                    <div className="space-y-1 text-center">
                      <FileText className="mx-auto h-12 w-12 text-textLight/30 dark:text-zinc-500" />
                      <div className="flex text-xs text-textLight/70 dark:text-zinc-400">
                        <label className="relative cursor-pointer rounded-md font-bold text-accent hover:text-accent-dark focus-within:outline-none">
                          <span>Unggah berkas foto</span>
                          <input type="file" className="sr-only" accept="image/*" onChange={() => alert("Simulasi: Berkas foto berhasil dipilih.")} />
                        </label>
                        <p className="pl-1">atau seret ke sini</p>
                      </div>
                      <p className="text-[10px] text-textLight/40">PNG, JPG, JPEG maksimal 500KB (3x4)</p>
                    </div>
                  </div>
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("acceptTerms")}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent accent-accent"
                    />
                    <span className="text-xs text-textLight/70 leading-relaxed dark:text-zinc-400">
                      Saya menyatakan bahwa data yang saya isikan di atas adalah benar, akurat, sesuai dengan berkas kependudukan asli, dan dapat dipertanggungjawabkan.
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1.5 font-medium">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.acceptTerms.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center rounded-xl bg-accent py-4 text-sm font-bold text-white shadow-md hover:bg-accent-dark transition-all hover:scale-102 active:scale-98 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Memproses Formulir...
                    </>
                  ) : (
                    "Kirim Formulir Pendaftaran (PPDB Online)"
                  )}
                </button>

              </form>
            </div>
          </Reveal>

        </div>
      </section>

      {/* 7. FAQ ACCORDION SECTION */}
      <section className="py-20 bg-white dark:bg-zinc-950 border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <Reveal direction="down">
              <h2 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">Frequently Asked Questions</h2>
            </Reveal>
            <Reveal direction="up" delay={0.05}>
              <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-primary dark:text-white">Pertanyaan Sering Diajukan</h3>
            </Reveal>
          </div>

          {/* FAQs loop */}
          <div className="flex flex-col gap-4">
            {ppdbFAQs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <Reveal key={idx} delay={idx * 0.05} direction="up">
                  <div className="bg-bgLight rounded-2xl border border-gray-150/40 shadow-sm overflow-hidden dark:bg-zinc-900 dark:border-zinc-800">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left font-bold text-xs sm:text-sm text-primary dark:text-white transition-colors hover:bg-gray-100/50"
                    >
                      <span className="flex gap-2 items-center">
                        <HelpCircle className="h-4.5 w-4.5 text-accent shrink-0" />
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <Minus className="h-4.5 w-4.5 text-accent shrink-0" />
                      ) : (
                        <Plus className="h-4.5 w-4.5 text-textLight/40 shrink-0" />
                      )}
                    </button>
                    
                    {/* Collapsible content */}
                    <div
                      className={`transition-all duration-300 ${
                        isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                    >
                      <p className="px-5 pb-5 pt-1.5 text-xs sm:text-sm text-textLight/70 dark:text-zinc-400 leading-relaxed border-t border-gray-100/40 dark:border-zinc-850">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. CTA TO WHATSAPP FOR QUESTIONS */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary-dark to-secondary text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <Reveal direction="down">
            <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">Masih Memiliki Pertanyaan?</h3>
          </Reveal>
          
          <Reveal direction="up" delay={0.05}>
            <p className="mt-3 text-xs sm:text-sm text-white/70 max-w-md">
              Tim helpdesk humas panitia PPDB online kami siap melayani dan memberikan panduan bagi Anda via chat WhatsApp.
            </p>
          </Reveal>
          
          <Reveal direction="up" delay={0.1}>
            <div className="mt-8">
              <a
                href={`https://wa.me/${schoolInfo.whatsapp}?text=${encodeURIComponent(
                  "Halo helpdesk PPDB SD Bustanuddin, saya membutuhkan bantuan terkait pendaftaran online..."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-7 py-3.5 font-bold shadow-md hover:bg-[#20ba59] hover:scale-105 active:scale-95 transition-all text-sm sm:text-base"
              >
                <MessageCircle className="h-5.5 w-5.5 fill-current" /> Chat Helpdesk PPDB (WhatsApp)
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SUCCESS MODAL DIALOG */}
      <AnimatePresence>
        {showSuccessModal && submitData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-gray-100 flex flex-col items-center text-center dark:bg-zinc-900 dark:border-zinc-800"
            >
              {/* Success Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lightAccent text-accent mb-4 shadow-inner">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              
              <h3 className="text-xl sm:text-2xl font-black text-primary dark:text-white">Pendaftaran Berhasil!</h3>
              <p className="text-xs text-textLight/50 dark:text-zinc-500 font-semibold uppercase tracking-wider mt-1">Bukti Penerimaan Registrasi Online</p>
              
              {/* Submission metadata summary card */}
              <div className="w-full bg-bgLight p-4.5 rounded-2xl border border-gray-150/40 text-left mt-5 text-xs sm:text-sm space-y-2.5 dark:bg-zinc-850 dark:border-zinc-800">
                <div className="flex justify-between border-b border-gray-200/50 pb-1.5 dark:border-zinc-850">
                  <span className="text-textLight/40 dark:text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Nama Lengkap</span>
                  <span className="font-bold text-primary dark:text-white truncate max-w-[200px]">{submitData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200/50 pb-1.5 dark:border-zinc-850">
                  <span className="text-textLight/40 dark:text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Asal Sekolah</span>
                  <span className="font-bold text-textLight/80 dark:text-zinc-300 truncate max-w-[200px]">{submitData.originSchool}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200/50 pb-1.5 dark:border-zinc-850">
                  <span className="text-textLight/40 dark:text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Jalur PPDB</span>
                  <span className="font-extrabold text-accent">{submitData.programChoice}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200/50 pb-1.5 dark:border-zinc-850">
                  <span className="text-textLight/40 dark:text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Usia Calon Siswa</span>
                  <span className="font-bold text-primary dark:text-white">{submitData.candidateAge} Tahun</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textLight/40 dark:text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Status Form</span>
                  <span className="text-[11px] font-bold text-secondary bg-lightAccent px-2 py-0.5 rounded leading-none flex items-center">TERVERIFIKASI</span>
                </div>
              </div>

              <p className="mt-5 text-[11px] text-textLight/50 dark:text-zinc-500 leading-relaxed">
                Formulir pendaftaran digital Anda telah masuk ke basis data penerimaan panitia. Silakan unduh kartu ujian seleksi sementara yang dikirimkan ke alamat email terdaftar Anda ({submitData.email}).
              </p>

              <button
                onClick={closeSuccessModal}
                className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-bold text-white shadow hover:bg-primary-dark transition-all"
              >
                Selesai & Keluar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
