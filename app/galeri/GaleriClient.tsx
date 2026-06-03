"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  X,
  ChevronLeft,
  ChevronRight as ArrowIcon,
  Maximize2,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { galeriItems } from "@/lib/data";

// Scroll Reveal wrapper
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

export default function GaleriClient() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [visibleCount, setVisibleCount] = useState(6);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["Semua", "Akademik", "Olahraga", "Seni", "PPDB", "Wisuda"];

  // Filtered List
  const filteredList = galeriItems.filter((item) => {
    if (activeFilter === "Semua") return true;
    return item.category.toLowerCase() === activeFilter.toLowerCase();
  });

  // Limit display list
  const displayedList = filteredList.slice(0, visibleCount);

  const handleLoadMore = () => {
    if (visibleCount < filteredList.length) {
      setVisibleCount((prev) => prev + 6);
    } else {
      alert("Seluruh foto dalam kategori ini telah ditampilkan.");
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex]);

  const handleNextImage = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredList.length;
    });
  };

  const handlePrevImage = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredList.length) % filteredList.length;
    });
  };

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. PAGE HERO */}
      <section className="relative bg-gradient-to-r from-primary via-primary-dark to-secondary text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d8f3dc_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <Reveal direction="down">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Galeri Kegiatan</h1>
          </Reveal>
          
          <Reveal direction="up" delay={0.1}>
            <div className="mt-4 flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-white/70">
              <Link href="/" className="hover:text-accent transition-colors">Beranda</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white font-medium">Galeri</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. FILTER & MASONRY PHOTO GRID */}
      <section className="py-16 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter buttons */}
          <div className="flex flex-wrap gap-2 justify-center border-b border-gray-200 pb-8 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setVisibleCount(6); // reset show count
                }}
                className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-full transition-all ${
                  activeFilter === cat
                    ? "bg-primary text-white shadow-md hover:bg-primary-dark"
                    : "bg-white text-textLight/70 hover:bg-gray-50 border border-gray-150"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 3. MASONRY PHOTO GRID (CSS Columns) */}
          {displayedList.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center max-w-md mx-auto">
              <p className="text-textLight/50 text-sm font-medium">Belum ada dokumentasi foto.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_auto]">
              {displayedList.map((item, idx) => {
                // Find global index in filtered list for lightbox tracking
                const globalIdx = filteredList.findIndex((f) => f.id === item.id);
                return (
                  <Reveal key={item.id} delay={idx * 0.05} direction="up">
                    <div
                      onClick={() => setLightboxIndex(globalIdx)}
                      className="break-inside-avoid relative group rounded-2xl overflow-hidden border border-gray-150 shadow-sm bg-white cursor-pointer hover:shadow-lg transition-shadow dark:bg-zinc-900 dark:border-zinc-800"
                    >
                      {/* Photo */}
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={600}
                        height={500}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Interactive Hover Overlay details */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white z-10">
                        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/90 text-white mb-3 shadow-inner transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <Maximize2 className="h-4 w-4" />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold leading-tight transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-[50ms]">
                          {item.title}
                        </h4>
                        <span className="text-[10px] uppercase font-bold text-accent tracking-widest mt-1 block transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-[100ms]">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}

          {/* 5. "MUAT LEBIH BANYAK" BUTTON */}
          {filteredList.length > visibleCount && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center justify-center rounded-lg bg-white border border-gray-200 px-6 py-3 text-sm font-bold text-primary hover:bg-gray-50 shadow-sm transition-all"
              >
                Muat Lebih Banyak Foto
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 4. LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-red-500 transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Left Prev Arrow Button */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-accent transition-colors"
              aria-label="Previous Image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Main Image content wrapper */}
            <div className="relative max-w-4xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative w-full h-full flex flex-col justify-center items-center"
              >
                {/* Photo rendering */}
                <div className="relative w-full h-[70vh]">
                  <Image
                    src={filteredList[lightboxIndex].image}
                    alt={filteredList[lightboxIndex].title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                
                {/* Legend details below photo */}
                <div className="text-center text-white mt-4 max-w-md">
                  <h4 className="text-base sm:text-lg font-bold leading-tight">
                    {filteredList[lightboxIndex].title}
                  </h4>
                  <span className="text-xs uppercase font-bold text-accent tracking-widest mt-1 block">
                    Kategori: {filteredList[lightboxIndex].category}
                  </span>
                  <span className="text-[10px] text-white/40 font-mono mt-1 block">
                    Foto {lightboxIndex + 1} dari {filteredList.length}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Next Arrow Button */}
            <button
              onClick={handleNextImage}
              className="absolute right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-accent transition-colors"
              aria-label="Next Image"
            >
              <ArrowIcon className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
