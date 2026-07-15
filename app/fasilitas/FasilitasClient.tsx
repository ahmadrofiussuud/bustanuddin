"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  ChevronRight,
  Sparkles,
  Compass,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { fasilitasList } from "@/lib/data";

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

export default function FasilitasClient() {
  const customStats = [
    { value: "30", label: "Ruang Kelas", detail: "Dilengkapi AC & Projector" },
    { value: "4", label: "Laboratorium", detail: "Komputer, Fisika, Kimia, Bahasa" },
    { value: "1", label: "Aula Utama", detail: "Kapasitas 500+ orang" },
    { value: "2", label: "Lapangan Olahraga", detail: "Outdoor & Indoor" },
  ];

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. PAGE HERO & INTEGRATED STATS */}
      <section className="relative bg-gradient-to-r from-primary via-primary-dark to-secondary text-white pt-20 pb-16 sm:pt-28 sm:pb-20 overflow-hidden rounded-b-[40px] md:rounded-b-[80px] shadow-lg shadow-primary/10">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d8f3dc_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center sm:text-left">
            <Reveal direction="down">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Fasilitas</h1>
            </Reveal>
            
            {/* Breadcrumbs */}
            <Reveal direction="up" delay={0.1}>
              <div className="mt-4 flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-white/70">
                <a href="/" className="hover:text-accent transition-colors">Beranda</a>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white font-medium">Fasilitas</span>
              </div>
            </Reveal>
          </div>

          {/* Integrated Stats Row */}
          <div className="mt-12 pt-10 border-t border-white/10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {customStats.map((stat, idx) => (
                <Reveal key={idx} delay={idx * 0.05} direction="up">
                  <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="text-3xl sm:text-4xl font-black text-accent">{stat.value}</div>
                    <div className="text-sm font-semibold text-white/90 mt-1">{stat.label}</div>
                    <div className="text-xs text-white/60 mt-0.5">{stat.detail}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FASILITAS GRID (3 Columns) */}
      <section className="py-20 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="down">
              <h2 className="text-accent uppercase tracking-wider text-xs sm:text-sm font-bold">
                Sarana & Prasarana
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Jelajahi Fasilitas Sekolah
              </h3>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <p className="mt-4 text-sm sm:text-base text-textLight/70 leading-relaxed">
                Kami menyediakan sarana pembelajaran berstandar nasional untuk memastikan kenyamanan fisik, keamanan, dan keefektifan kegiatan KBM siswa.
              </p>
            </Reveal>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fasilitasList.map((facility, idx) => (
              <Reveal key={idx} delay={idx * 0.05} direction="up">
                <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 dark:bg-zinc-900 dark:border-zinc-800">
                  {/* Photo Wrapper */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={facility.image}
                      alt={facility.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Visual subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-primary dark:text-white transition-colors duration-300 group-hover:text-accent">
                      {facility.name}
                    </h4>
                    <p className="mt-2.5 text-xs sm:text-sm text-textLight/70 dark:text-zinc-400 leading-relaxed">
                      {facility.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* 4. 360 VIRTUAL TOUR PLACEHOLDER */}
      <section className="py-20 bg-white dark:bg-zinc-950 border-t border-gray-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          {/* Visual virtual tour box card */}
          <Reveal direction="up">
            <div className="relative aspect-[21/9] sm:aspect-[16/6] bg-primary-dark rounded-3xl overflow-hidden shadow-xl border border-primary/20 flex items-center justify-center text-white">
              {/* Wide angle image representation */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop"
                  alt="Library wide landscape placeholder"
                  fill
                  className="object-cover opacity-20 blur-[1px]"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/95 via-primary-dark/80 to-secondary/60" />
              </div>

              {/* Badges / Controls */}
              <div className="relative z-10 p-6 sm:p-10 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/40 px-3.5 py-1 text-xs font-semibold text-accent mb-4 animate-pulse">
                  <Sparkles className="h-3.5 w-3.5" /> Segera Hadir
                </div>
                
                <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                  360° Virtual Tour Sekolah
                </h3>
                
                <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-md leading-relaxed">
                  Jelajahi setiap sudut ruang kelas, koridor, laboratorium, dan fasilitas outdoor kami secara digital dari rumah Anda.
                </p>

                {/* Compass play button mockup */}
                <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg border border-accent/30 cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all">
                  <Compass className="h-7 w-7 animate-spin-slow" />
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

    </div>
  );
}
