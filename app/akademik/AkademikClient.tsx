"use client";

import React, { useState, useRef } from "react";
import {
  ChevronRight,
  BookOpen,
  Download,
  FileText,
  Clock,
  CheckCircle2,
  Trophy,
  Cpu,
  Users,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  programKeahlian,
  kurikulumBreakdown,
  jadwalKBM,
  prestasiAkademik,
  downloadDocuments,
} from "@/lib/data";

// Scroll Reveal animation
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
        return { hidden: { opacity: 0, y: 35 }, visible: { opacity: 1, y: 0 } };
      case "down":
        return { hidden: { opacity: 0, y: -35 }, visible: { opacity: 1, y: 0 } };
      case "left":
        return { hidden: { opacity: 0, x: 35 }, visible: { opacity: 1, x: 0 } };
      case "right":
        return { hidden: { opacity: 0, x: -35 }, visible: { opacity: 1, x: 0 } };
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

export default function AkademikClient() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. PAGE HERO */}
      <section className="relative bg-gradient-to-r from-primary via-primary-dark to-secondary text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d8f3dc_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <Reveal direction="down">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Akademik</h1>
          </Reveal>
          
          {/* Breadcrumbs */}
          <Reveal direction="up" delay={0.1}>
            <div className="mt-4 flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-white/70">
              <a href="/" className="hover:text-accent transition-colors">Beranda</a>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white font-medium">Akademik</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. PROGRAM KEAHLIAN */}
      <section className="py-20 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="down">
              <h2 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">
                Jalur Minat Belajar
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Program Keahlian (Konsentrasi Studi)
              </h3>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <p className="mt-4 text-sm sm:text-base text-textLight/70 leading-relaxed">
                Kami membimbing siswa ke arah minat penjurusan spesifik sejak dini agar proses transisi menuju bangku perkuliahan berjalan lurus dan mantap.
              </p>
            </Reveal>
          </div>

          {/* Program Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programKeahlian.map((prog, idx) => (
              <Reveal key={prog.id} delay={idx * 0.1} direction="up">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-lg transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lightAccent text-primary mb-6 shadow-inner">
                    {idx === 0 && <Cpu className="h-6 w-6 text-accent" />}
                    {idx === 1 && <Users className="h-6 w-6 text-accent" />}
                    {idx === 2 && <BookOpen className="h-6 w-6 text-accent" />}
                  </div>
                  <h4 className="text-xl font-bold text-primary dark:text-white leading-snug">
                    {prog.title}
                  </h4>
                  <p className="mt-3 text-sm text-textLight/70 leading-relaxed dark:text-zinc-400">
                    {prog.description}
                  </p>
                  
                  {/* Detailed list bullet points */}
                  <ul className="mt-6 space-y-3 pt-6 border-t border-gray-100 dark:border-zinc-800 flex-grow text-xs sm:text-sm text-textLight/85">
                    {prog.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex gap-2.5 items-start">
                        <CheckCircle2 className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                        <span className="leading-relaxed dark:text-zinc-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* 3. KURIKULUM (INTERACTIVE TABS) */}
      <section className="py-20 bg-white dark:bg-zinc-950 border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <Reveal direction="down">
              <h2 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">
                Kurikulum Merdeka
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Tahapan Pembelajaran Siswa
              </h3>
            </Reveal>
          </div>

          {/* Interactive Switch Tab Buttons */}
          <div className="flex p-1.5 bg-bgLight rounded-2xl border border-gray-200 dark:bg-zinc-900 dark:border-zinc-850 justify-between gap-1 shadow-inner">
            {kurikulumBreakdown.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 py-3 px-2 sm:px-4 text-sm font-bold rounded-xl transition-all ${
                  activeTab === idx
                    ? "bg-white text-primary shadow-sm dark:bg-zinc-850 dark:text-white"
                    : "text-textLight/60 hover:text-primary dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {item.phase}
              </button>
            ))}
          </div>

          {/* Tab Display Content Card */}
          <div className="mt-6 bg-[#f8fdf9] rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm dark:bg-zinc-900/40 dark:border-zinc-800 min-h-[300px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs uppercase font-extrabold text-accent tracking-widest leading-none">
                    {kurikulumBreakdown[activeTab].subtitle}
                  </span>
                  <h4 className="mt-2 text-xl sm:text-2xl font-black text-primary dark:text-white">
                    Kurikulum {kurikulumBreakdown[activeTab].phase}
                  </h4>
                  <p className="mt-3 text-sm sm:text-base text-textLight/70 leading-relaxed dark:text-zinc-400">
                    {kurikulumBreakdown[activeTab].description}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-200/50 dark:border-zinc-800">
                  <h5 className="text-xs sm:text-sm uppercase font-extrabold text-primary dark:text-white tracking-wider mb-4">
                    Fokus Utama & Kegiatan Pembelajaran:
                  </h5>
                  <ul className="space-y-3.5 text-xs sm:text-sm">
                    {kurikulumBreakdown[activeTab].focus.map((fItem, fIdx) => (
                      <li key={fIdx} className="flex gap-3 items-start">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-lightAccent text-primary shrink-0 mt-0.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                        </div>
                        <span className="text-textLight/80 leading-relaxed dark:text-zinc-300">
                          {fItem}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 4. JADWAL KBM TABLE */}
      <section className="py-20 bg-bgLight">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <Reveal direction="down">
              <h2 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">
                Jadwal Harian
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Jadwal Kegiatan Belajar Mengajar (KBM)
              </h3>
            </Reveal>
          </div>

          {/* Table Container */}
          <Reveal direction="up" delay={0.2}>
            <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-primary text-white border-b border-primary-dark">
                      <th className="px-6 py-4.5 text-sm sm:text-base font-bold">Hari</th>
                      <th className="px-6 py-4.5 text-sm sm:text-base font-bold">Jam Kegiatan</th>
                      <th className="px-6 py-4.5 text-sm sm:text-base font-bold">Keterangan / Aktivitas Tambahan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150/40 text-xs sm:text-sm">
                    {jadwalKBM.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`hover:bg-lightAccent/25 dark:hover:bg-zinc-800 transition-colors ${
                          idx % 2 === 0 ? "bg-white dark:bg-zinc-900" : "bg-bgLight dark:bg-zinc-900/50"
                        }`}
                      >
                        <td className="px-6 py-4 font-bold text-primary dark:text-accent">{row.day}</td>
                        <td className="px-6 py-4 font-medium text-textLight/90 dark:text-zinc-300 flex items-center gap-1.5 whitespace-nowrap">
                          <Clock className="h-3.5 w-3.5 text-accent" /> {row.hours}
                        </td>
                        <td className="px-6 py-4 text-textLight/70 dark:text-zinc-400">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* 5. PRESTASI AKADEMIK */}
      <section className="py-20 bg-white dark:bg-zinc-950 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="down">
              <h2 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">
                Papan Penghargaan
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Prestasi Akademik Unggulan
              </h3>
            </Reveal>
          </div>

          {/* Trophy Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {prestasiAkademik.map((pres, idx) => (
              <Reveal key={idx} delay={idx * 0.05} direction="up">
                <div className="group bg-[#f8fdf9] p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full dark:bg-zinc-900 dark:border-zinc-800">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lightAccent text-primary mb-5 group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-inner">
                      <Trophy className="h-5 w-5 text-accent" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-accent tracking-widest">{pres.year}</span>
                    <h4 className="mt-1.5 text-base font-extrabold text-primary leading-snug group-hover:text-accent transition-colors dark:text-white">
                      {pres.title}
                    </h4>
                    <p className="mt-2.5 text-xs text-textLight/70 dark:text-zinc-400 leading-relaxed line-clamp-3">
                      {pres.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200/50 dark:border-zinc-800 text-[11px] font-semibold text-textLight/50 dark:text-zinc-500 uppercase tracking-wider">
                    Siswa: {pres.student}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* 6. DOWNLOAD DOCUMENTS */}
      <section className="py-20 bg-bgLight">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <Reveal direction="down">
              <h2 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">
                Layanan Unduhan
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Dokumen & Brosur Akademik
              </h3>
            </Reveal>
          </div>

          {/* Download Cards Stack */}
          <div className="flex flex-col gap-4">
            {downloadDocuments.map((doc, idx) => (
              <Reveal key={idx} delay={idx * 0.05} direction="up">
                <div className="flex items-center justify-between bg-white p-4.5 sm:p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-shadow gap-4 dark:bg-zinc-900 dark:border-zinc-800">
                  <div className="flex gap-4 items-center min-w-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lightAccent text-primary shrink-0 shadow-inner">
                      <FileText className="h-6 w-6 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-primary dark:text-white truncate">
                        {doc.name}
                      </h4>
                      <p className="text-xs text-textLight/40 dark:text-zinc-500 font-semibold tracking-wide uppercase mt-0.5">
                        Tipe: {doc.type} | Ukuran: {doc.size}
                      </p>
                    </div>
                  </div>
                  
                  {/* Fake link button with download trigger */}
                  <a
                    href={doc.url}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Memulai pengunduhan file: "${doc.name}" (Berkas simulasi)`);
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow hover:bg-accent-dark hover:scale-105 active:scale-95 transition-all shrink-0"
                    aria-label={`Unduh ${doc.name}`}
                  >
                    <Download className="h-4.5 w-4.5" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
