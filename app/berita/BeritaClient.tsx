"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Calendar,
  Download,
  FileText,
  ArrowRight,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import {
  beritaPageList,
  pengumumanTerbaru,
  kalenderAkademikSidebar,
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

export default function BeritaClient() {
  const [activeFilter, setActiveFilter] = useState("Semua");

  // Filter Categories
  const filters = ["Semua", "Berita", "Pengumuman", "Agenda"];

  // Filtered List
  const filteredList = beritaPageList.filter((item) => {
    if (activeFilter === "Semua") return true;
    return item.category.toLowerCase() === activeFilter.toLowerCase();
  });

  // Extract featured news (first matching card)
  const featuredNews = filteredList[0];
  const gridNews = filteredList.slice(1);

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. PAGE HERO */}
      <section className="relative bg-gradient-to-r from-primary via-primary-dark to-secondary text-white py-20 sm:py-28 overflow-hidden rounded-b-[40px] md:rounded-b-[80px] shadow-lg shadow-primary/10">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d8f3dc_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <Reveal direction="down">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Berita & Pengumuman</h1>
          </Reveal>
          
          <Reveal direction="up" delay={0.1}>
            <div className="mt-4 flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-white/70">
              <Link href="/" className="hover:text-accent transition-colors">Beranda</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white font-medium">Berita</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. FILTER & NEWS LAYOUT */}
      <section className="py-16 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT COLUMN: News Feed (8 cols on desktop) */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              
              {/* Category Filter tabs */}
              <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                    }}
                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                      activeFilter === filter
                        ? "bg-primary text-white shadow-sm"
                        : "bg-white text-textLight/65 hover:bg-gray-100 hover:text-primary border border-gray-150"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* NEWS ARTICLES */}
              {filteredList.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center">
                  <p className="text-textLight/50 text-sm font-medium">Tidak ada berita atau pengumuman di kategori ini.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-10">
                  
                  {/* 3. FEATURED NEWS (First card) */}
                  {featuredNews && (
                    <Reveal direction="up">
                      <article className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-2 dark:bg-zinc-900 dark:border-zinc-800">
                        {/* Image */}
                        <div className="relative aspect-[16/10] md:aspect-auto h-full min-h-[240px] overflow-hidden">
                          <Image
                            src={featuredNews.image}
                            alt={featuredNews.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4 z-10 rounded-md bg-accent px-2.5 py-1 text-xs font-bold text-white shadow-md">
                            Kabar Terbaru
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-8 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center text-xs text-textLight/40 dark:text-zinc-500 mb-3 gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{featuredNews.date}</span>
                              <span className="px-1.5 py-0.5 rounded bg-lightAccent text-primary font-bold text-[9px] uppercase tracking-wider">
                                {featuredNews.category}
                              </span>
                            </div>
                            <h3 className="text-xl font-extrabold text-primary dark:text-white leading-snug group-hover:text-accent transition-colors">
                              <Link href={`/berita/${featuredNews.slug}`}>{featuredNews.title}</Link>
                            </h3>
                            <p className="mt-3.5 text-xs sm:text-sm text-textLight/70 dark:text-zinc-400 leading-relaxed line-clamp-4">
                              {featuredNews.excerpt}
                            </p>
                          </div>
                          
                          <div className="mt-6 pt-4 border-t border-gray-150/40">
                            <Link
                              href={`/berita/${featuredNews.slug}`}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary group-hover:text-accent transition-colors"
                            >
                              Baca Selengkapnya <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  )}

                  {/* 4. NEWS GRID (Other cards) */}
                  {gridNews.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {gridNews.map((news, idx) => (
                        <Reveal key={news.id} delay={idx * 0.05} direction="up">
                          <article className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
                            <div className="relative aspect-[16/10] overflow-hidden">
                              <Image
                                src={news.image}
                                alt={news.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-108"
                              />
                              <div className="absolute top-4 left-4 z-10 rounded-md bg-lightAccent px-2.5 py-1 text-[10px] font-bold text-primary shadow-sm border border-accent/20 uppercase tracking-wider">
                                {news.category}
                              </div>
                            </div>

                            <div className="p-5 flex-grow flex flex-col justify-between">
                              <div>
                                <div className="flex items-center text-xs text-textLight/40 dark:text-zinc-500 mb-3.5 gap-1.5">
                                  <Calendar className="h-3.5 w-3.5" />
                                  <span>{news.date}</span>
                                </div>
                                <h4 className="text-sm sm:text-base font-bold text-primary dark:text-white leading-snug group-hover:text-accent transition-colors line-clamp-2">
                                  <Link href={`/berita/${news.slug}`}>{news.title}</Link>
                                </h4>
                                <p className="mt-2 text-xs sm:text-sm text-textLight/70 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                                  {news.excerpt}
                                </p>
                              </div>
                              
                              <div className="mt-5 pt-3.5 border-t border-gray-100 dark:border-zinc-800">
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
                  )}

                  {/* 6. PAGINATION MOCK */}
                  <div className="flex justify-center items-center gap-1.5 py-4">
                    <button
                      className="px-3 py-2 text-xs font-bold rounded-lg border border-gray-150 bg-white text-textLight/40 cursor-not-allowed"
                      disabled
                    >
                      Sebelumnya
                    </button>
                    <button className="px-3.5 py-2 text-xs font-bold rounded-lg bg-primary text-white">
                      1
                    </button>
                    <button
                      onClick={() => alert("Hanya simulasi halaman archive")}
                      className="px-3.5 py-2 text-xs font-bold rounded-lg bg-white border border-gray-150 text-textLight/75 hover:bg-gray-100"
                    >
                      2
                    </button>
                    <button
                      onClick={() => alert("Hanya simulasi halaman archive")}
                      className="px-3 py-2 text-xs font-bold rounded-lg border border-gray-150 bg-white text-textLight/75 hover:bg-gray-100"
                    >
                      Berikutnya
                    </button>
                  </div>

                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Sidebar (4 cols on desktop) */}
            <aside className="lg:col-span-4 flex flex-col gap-8">
              
              {/* Sidebar Component 1: Pengumuman Terbaru */}
              <Reveal direction="left">
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
                  <h3 className="text-base font-extrabold text-primary dark:text-white mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-accent">
                    Pengumuman Penting
                  </h3>
                  <div className="flex flex-col gap-4">
                    {pengumumanTerbaru.map((anno) => (
                      <div key={anno.id} className="flex items-start gap-3 pb-3.5 border-b border-gray-100 dark:border-zinc-800 last:border-b-0 last:pb-0">
                        <div className="bg-lightAccent text-primary px-2 py-1 rounded text-center min-w-[50px] shrink-0 font-mono text-[10px] font-bold">
                          {anno.date}
                        </div>
                        <h4 className="text-xs sm:text-sm font-semibold text-textLight/85 hover:text-accent transition-colors leading-snug cursor-pointer">
                          {anno.title}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Sidebar Component 2: Kalender Akademik */}
              <Reveal direction="left" delay={0.05}>
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
                  <h3 className="text-base font-extrabold text-primary dark:text-white mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-accent">
                    Kalender Akademik
                  </h3>
                  <div className="flex flex-col gap-4">
                    {kalenderAkademikSidebar.map((cal, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="h-2 w-2 rounded-full bg-accent shrink-0 mt-1.5"></div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-accent font-mono block leading-none">
                            {cal.month}
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-textLight/80 leading-relaxed block mt-0.5">
                            {cal.event}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Sidebar Component 3: Download Dokumen */}
              <Reveal direction="left" delay={0.1}>
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
                  <h3 className="text-base font-extrabold text-primary dark:text-white mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-accent">
                    Unduh Dokumen
                  </h3>
                  <div className="flex flex-col gap-3.5">
                    {downloadDocuments.map((doc, idx) => (
                      <div
                        key={idx}
                        onClick={() => alert(`Memulai pengunduhan berkas: "${doc.name}"`)}
                        className="group/doc flex items-center justify-between p-2.5 rounded-xl bg-bgLight dark:bg-zinc-850 hover:bg-lightAccent/40 transition-colors cursor-pointer border border-gray-150/40"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className="h-4.5 w-4.5 text-accent shrink-0" />
                          <span className="text-xs font-bold text-primary dark:text-white truncate">
                            {doc.name}
                          </span>
                        </div>
                        <Download className="h-4 w-4 text-textLight/40 group-hover/doc:text-accent transition-colors shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

            </aside>

          </div>
        </div>
      </section>

    </div>
  );
}
