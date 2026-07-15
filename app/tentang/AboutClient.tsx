"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Award, Clock, CheckCircle2, ChevronRight, GraduationCap, Heart, Shield } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { schoolInfo, sejarahTimeline, visiMisi, nilaiNilai, timKepemimpinan } from "@/lib/data";

// Reuse Scroll Reveal wrapper
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  className?: string;
}

function Reveal({ children, delay = 0, direction = "up", duration = 0.6, className = "" }: RevealProps) {
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
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutClient() {
  return (
    <div className="w-full flex flex-col">
      
      {/* 1. PAGE HERO */}
      <section className="relative bg-gradient-to-r from-primary via-primary-dark to-secondary text-white py-20 sm:py-28 overflow-hidden rounded-b-[40px] md:rounded-b-[80px] shadow-lg shadow-primary/10">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d8f3dc_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <Reveal direction="down">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Tentang Kami</h1>
          </Reveal>
          
          {/* Breadcrumbs */}
          <Reveal direction="up" delay={0.1}>
            <div className="mt-4 flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-white/70">
              <a href="/" className="hover:text-accent transition-colors">Beranda</a>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white font-medium">Tentang Kami</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. SEJARAH TIMELINE */}
      <section className="py-20 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="down">
              <h2 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">
                Perjalanan Kami
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Sejarah Singkat Sekolah
              </h3>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <p className="mt-4 text-sm sm:text-base text-textLight/70 leading-relaxed">
                Didirikan sejak tahun {schoolInfo.foundedYear}, SD Bustanuddin terus berkembang dari sebuah sekolah rintisan lokal hingga menjadi salah satu lembaga pendidikan rujukan dengan akreditasi tertinggi.
              </p>
            </Reveal>
          </div>

          {/* Timeline Structure (Vertical) */}
          <div className="relative border-l-2 border-accent/25 md:border-l-0 md:before:content-[''] md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-0.5 md:before:bg-accent/25 max-w-5xl mx-auto pl-6 md:pl-0 space-y-12 sm:space-y-16">
            {sejarahTimeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center w-full">
                  {/* Circle Node (Desktop absolute centered, Mobile left absolute) */}
                  <div className="absolute left-[-32px] md:left-1/2 md:-translate-x-1/2 top-1.5 md:top-1/2 md:-translate-y-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white shadow-md font-bold text-xs">
                    {idx + 1}
                  </div>

                  {/* Left / Right Card Layout */}
                  <div className={`w-full md:w-[45%] ${isEven ? "md:order-1" : "md:order-2"}`}>
                    <Reveal direction={isEven ? "right" : "left"} delay={0.1}>
                      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 hover:shadow-md transition-shadow">
                        <span className="inline-block bg-lightAccent text-primary px-3 py-1 rounded-md text-sm font-bold mb-3">
                          Tahun {item.year}
                        </span>
                        <h4 className="text-lg font-bold text-primary dark:text-white">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-sm text-textLight/70 leading-relaxed dark:text-zinc-400">
                          {item.description}
                        </p>
                      </div>
                    </Reveal>
                  </div>

                  {/* Empty Spacer Column for Desktop balance */}
                  <div className="hidden md:block md:w-[45%] md:order-2"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. VISI & MISI */}
      <section className="py-20 bg-white border-t border-gray-100 dark:bg-zinc-950 dark:border-zinc-850">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            
            {/* Visi Card */}
            <Reveal direction="right" className="h-full">
              <div className="flex flex-col h-full justify-between bg-primary p-8 sm:p-12 rounded-3xl text-white shadow-lg relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 text-white/5 select-none pointer-events-none">
                  <GraduationCap className="h-48 w-48" />
                </div>
                <div>
                  <h3 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">Visi Kami</h3>
                  <h4 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-tight text-white">
                    Menjadi Pusat Keunggulan Pendidikan
                  </h4>
                  <p className="mt-6 text-base sm:text-lg italic font-light leading-relaxed text-white/90">
                    &ldquo;{visiMisi.visi}&rdquo;
                  </p>
                </div>
                <div className="mt-10 border-t border-white/10 pt-6">
                  <span className="text-xs uppercase text-accent font-semibold tracking-wider">SD Bustanuddin</span>
                </div>
              </div>
            </Reveal>

            {/* Misi Card */}
            <Reveal direction="left" className="h-full">
              <div className="flex flex-col h-full bg-[#f8fdf9] p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
                <h3 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">Misi Kami</h3>
                <h4 className="mt-3 text-xl sm:text-2xl font-extrabold text-primary dark:text-white mb-6">
                  Langkah Nyata Mewujudkan Visi
                </h4>
                <ul className="space-y-5 text-sm sm:text-base">
                  {visiMisi.misi.map((misiStr, idx) => (
                    <li key={idx} className="flex gap-3.5 items-start">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-lightAccent text-primary shrink-0 mt-0.5 shadow-inner">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                      </div>
                      <span className="text-textLight/80 leading-relaxed dark:text-zinc-300">
                        {misiStr}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 4. NILAI-NILAI SEKOLAH */}
      <section className="py-20 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="down">
              <h2 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">
                Budaya Sekolah
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                4 Nilai Utama Karakter Siswa
              </h3>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nilaiNilai.map((nilai, idx) => (
              <Reveal key={idx} delay={idx * 0.05} direction="up">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center hover:scale-102 hover:shadow-md transition-all dark:bg-zinc-900 dark:border-zinc-800">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lightAccent text-primary mb-5 shadow-sm">
                    {idx === 0 && <Shield className="h-6 w-6 text-accent" />}
                    {idx === 1 && <Award className="h-6 w-6 text-accent" />}
                    {idx === 2 && <Clock className="h-6 w-6 text-accent" />}
                    {idx === 3 && <Heart className="h-6 w-6 text-accent" />}
                  </div>
                  <h4 className="text-lg font-bold text-primary dark:text-white">
                    {nilai.title}
                  </h4>
                  <p className="mt-3 text-xs sm:text-sm text-textLight/70 leading-relaxed dark:text-zinc-400">
                    {nilai.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STRUKTUR ORGANISASI */}
      <section className="py-20 bg-white dark:bg-zinc-950 border-t border-gray-150">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="down">
              <h2 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">
                Tata Kelola
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Struktur Organisasi Sekolah
              </h3>
            </Reveal>
          </div>

          {/* Org Chart CSS Blocks */}
          <div className="w-full flex flex-col items-center max-w-4xl mx-auto overflow-x-auto py-6">
            <div className="min-w-[650px] flex flex-col items-center gap-6">
              
              {/* Level 1: Kepala Sekolah */}
              <Reveal direction="down">
                <div className="flex flex-col items-center bg-primary text-white px-6 py-4 rounded-xl shadow-md border border-primary/20 text-center w-64">
                  <span className="text-xs uppercase font-bold text-accent tracking-wider leading-none mb-1.5">Kepala Sekolah</span>
                  <span className="text-base font-extrabold">Dr. H. Ahmad Sunaryo, M.Pd.</span>
                </div>
              </Reveal>

              {/* Vertical connector line */}
              <div className="h-8 w-0.5 bg-accent/30 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-1.5 after:w-1.5 after:bg-accent after:rounded-full"></div>

              {/* Horizontal Split Line for Wakasek */}
              <div className="w-[80%] h-0.5 bg-accent/30 relative">
                {/* Visual vertical drop lines at 4 positions */}
                <div className="absolute left-0 top-0 h-4 w-0.5 bg-accent/30"></div>
                <div className="absolute left-[33%] top-0 h-4 w-0.5 bg-accent/30"></div>
                <div className="absolute left-[66%] top-0 h-4 w-0.5 bg-accent/30"></div>
                <div className="absolute right-0 top-0 h-4 w-0.5 bg-accent/30"></div>
              </div>

              {/* Level 2: 4 Wakasek */}
              <div className="grid grid-cols-4 gap-4 w-full mt-2">
                <div className="flex flex-col items-center bg-white p-3.5 rounded-xl shadow border border-gray-100 text-center dark:bg-zinc-900 dark:border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-secondary tracking-wider mb-1">Wakasek Kurikulum</span>
                  <span className="text-xs font-bold text-primary dark:text-white">Dra. Hajah Martini</span>
                </div>
                <div className="flex flex-col items-center bg-white p-3.5 rounded-xl shadow border border-gray-100 text-center dark:bg-zinc-900 dark:border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-secondary tracking-wider mb-1">Wakasek Kesiswaan</span>
                  <span className="text-xs font-bold text-primary dark:text-white">Drs. M. Ridwan, M.Si.</span>
                </div>
                <div className="flex flex-col items-center bg-white p-3.5 rounded-xl shadow border border-gray-100 text-center dark:bg-zinc-900 dark:border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-secondary tracking-wider mb-1">Wakasek Sarana Prasarana</span>
                  <span className="text-xs font-bold text-primary dark:text-white">Budi Hermawan, S.T.</span>
                </div>
                <div className="flex flex-col items-center bg-white p-3.5 rounded-xl shadow border border-gray-100 text-center dark:bg-zinc-900 dark:border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-secondary tracking-wider mb-1">Wakasek Humas & Hubin</span>
                  <span className="text-xs font-bold text-primary dark:text-white">Siti Aisyah, S.Sos.</span>
                </div>
              </div>

              {/* Connector from middle of Wakasek to Level 3 */}
              <div className="h-8 w-0.5 bg-accent/30 relative"></div>

              {/* Level 3: Staff / TU */}
              <div className="flex gap-8 justify-center">
                <div className="flex flex-col items-center bg-lightAccent px-5 py-3 rounded-lg shadow-sm border border-accent/20 text-center w-52">
                  <span className="text-[9px] uppercase font-bold text-primary tracking-widest mb-0.5">Kepala Tata Usaha</span>
                  <span className="text-xs font-extrabold text-primary">Haji Rahman Effendi, M.M.</span>
                </div>
                <div className="flex flex-col items-center bg-lightAccent px-5 py-3 rounded-lg shadow-sm border border-accent/20 text-center w-52">
                  <span className="text-[9px] uppercase font-bold text-primary tracking-widest mb-0.5">Koordinator Guru</span>
                  <span className="text-xs font-extrabold text-primary">Dewan Guru & Staff Ahli</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. TIM KEPEMIMPINAN */}
      <section className="py-20 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="down">
              <h2 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">
                Jajaran Pendidik
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Tim Kepemimpinan & Manajemen
              </h3>
            </Reveal>
          </div>

          {/* Leaders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {timKepemimpinan.map((leader, idx) => (
              <Reveal key={idx} delay={idx * 0.05} direction="up">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-primary dark:text-white leading-snug">
                        {leader.name}
                      </h4>
                      <p className="text-[10px] uppercase font-bold text-accent mt-1 leading-none">
                        {leader.role}
                      </p>
                    </div>
                    <p className="text-[11px] text-textLight/60 dark:text-zinc-400 mt-2.5 pt-2 border-t border-gray-100 dark:border-zinc-800 line-clamp-3 leading-relaxed">
                      {leader.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* 7. AKREDITASI */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary-dark to-secondary text-white text-center overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          
          <Reveal direction="down">
            <h2 className="text-accent uppercase tracking-widest text-xs sm:text-sm font-bold">
              Penjamin Mutu Sekolah
            </h2>
          </Reveal>
          
          <Reveal direction="up" delay={0.1}>
            <h3 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight">
              Sertifikasi & Akreditasi Nasional
            </h3>
          </Reveal>

          {/* Certificate visual box */}
          <Reveal direction="up" delay={0.2}>
            <div className="mt-10 bg-white text-textLight p-6 sm:p-10 rounded-2xl border-4 border-amber-400 max-w-md shadow-2xl relative">
              {/* Gold seal */}
              <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-amber-400 flex items-center justify-center font-extrabold text-white text-xs border border-white shadow-inner uppercase tracking-wider">
                Seal
              </div>
              
              <div className="flex flex-col items-center">
                <GraduationCap className="h-10 w-10 text-primary mb-2" />
                <h4 className="text-xs tracking-widest uppercase text-textLight/40 font-bold">Kementerian Pendidikan R.I.</h4>
                <h5 className="mt-4 text-2xl font-black text-primary leading-none uppercase">Predikat &ldquo;B&rdquo;</h5>
                <span className="text-[10px] text-accent font-bold uppercase tracking-wider mt-1">Baik</span>
                
                <hr className="w-full my-4 border-gray-100" />
                
                <p className="text-[11px] text-textLight/60 leading-relaxed">
                  Berdasarkan surat keputusan Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M) Republik Indonesia. Berlaku hingga tahun 2030.
                </p>
                <div className="mt-4 font-mono text-[9px] text-textLight/30 uppercase tracking-widest">No: BAN-SM/995/2025/110</div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <p className="mt-6 text-sm text-white/70">
              Menjamin standar materi ajar, kelayakan sarana laboratorium, dan kualifikasi guru berstandar prima.
            </p>
          </Reveal>

        </div>
      </section>

    </div>
  );
}
