"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { schoolInfo } from "@/lib/data";

// -------------------------------------------------------------
// ZOD CONTACT SCHEMA
// -------------------------------------------------------------
const contactSchema = z.object({
  name: z.string().min(3, { message: "Nama minimal 3 karakter" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  phone: z
    .string()
    .min(9, { message: "Nomor HP minimal 9 digit" })
    .max(15, { message: "Nomor HP maksimal 15 digit" })
    .regex(/^[0-9]+$/, { message: "Nomor HP hanya boleh berisi angka" }),
  subject: z.string().min(1, { message: "Subjek pesan wajib dipilih" }),
  message: z.string().min(10, { message: "Pesan minimal 10 karakter" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

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

export default function KontakClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact submission data:", data);
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessToast(true);
      reset(); // clear input fields
      
      // Auto hide success banner after 5 seconds
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. PAGE HERO */}
      <section className="relative bg-gradient-to-r from-primary via-primary-dark to-secondary text-white py-20 sm:py-28 overflow-hidden rounded-b-[40px] md:rounded-b-[80px] shadow-lg shadow-primary/10">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d8f3dc_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <Reveal direction="down">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Hubungi Kami</h1>
          </Reveal>
          
          <Reveal direction="up" delay={0.1}>
            <div className="mt-4 flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-white/70">
              <Link href="/" className="hover:text-accent transition-colors">Beranda</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white font-medium">Kontak</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. THREE QUICK CONTACT CARDS */}
      <section className="py-12 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Quick Card 1: WhatsApp */}
            <Reveal direction="up">
              <a
                href={`https://wa.me/${schoolInfo.whatsapp}?text=Halo%20Admin%20SD%20Bustanuddin...`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-6 bg-white rounded-2xl border border-gray-150 shadow-sm hover:border-[#25D366]/40 hover:shadow-md transition-all gap-4 dark:bg-zinc-900 dark:border-zinc-800"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] transition-colors duration-300 group-hover:bg-[#25D366] group-hover:text-white shrink-0">
                  <MessageCircle className="h-6 w-6 fill-current" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-textLight/40 dark:text-zinc-500">Hubungi via Chat</h4>
                  <span className="text-sm sm:text-base font-bold text-[#1a4731] dark:text-accent leading-tight block mt-1">
                    WhatsApp Chat
                  </span>
                </div>
              </a>
            </Reveal>

            {/* Quick Card 2: Phone */}
            <Reveal direction="up" delay={0.05}>
              <a
                href={`tel:${schoolInfo.phone.replace(/[^0-9]/g, "")}`}
                className="group flex items-center p-6 bg-white rounded-2xl border border-gray-150 shadow-sm hover:border-accent/40 hover:shadow-md transition-all gap-4 dark:bg-zinc-900 dark:border-zinc-800"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lightAccent text-primary transition-colors duration-300 group-hover:bg-accent group-hover:text-white shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-textLight/40 dark:text-zinc-500">Panggilan Telepon</h4>
                  <span className="text-sm sm:text-base font-bold text-primary dark:text-accent leading-tight block mt-1">
                    {schoolInfo.phone}
                  </span>
                </div>
              </a>
            </Reveal>

            {/* Quick Card 3: Email */}
            <Reveal direction="up" delay={0.1}>
              <a
                href={`mailto:${schoolInfo.email}`}
                className="group flex items-center p-6 bg-white rounded-2xl border border-gray-150 shadow-sm hover:border-accent/40 hover:shadow-md transition-all gap-4 dark:bg-zinc-900 dark:border-zinc-800"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lightAccent text-primary transition-colors duration-300 group-hover:bg-accent group-hover:text-white shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-textLight/40 dark:text-zinc-500">Kirim Surat Elektronik</h4>
                  <span className="text-sm sm:text-base font-bold text-primary dark:text-accent leading-tight block mt-1 truncate max-w-[200px] sm:max-w-none">
                    {schoolInfo.email}
                  </span>
                </div>
              </a>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 2. TWO COLUMN DETAILS + CONTACT FORM */}
      <section className="py-12 pb-24 bg-bgLight">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Success Banner message */}
          <AnimatePresence>
            {showSuccessToast && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8 p-5 bg-[#d8f3dc] border border-[#52b788]/30 rounded-2xl shadow-sm text-primary flex items-start gap-3.5 max-w-3xl mx-auto"
              >
                <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-extrabold">Pesan Terkirim!</h4>
                  <p className="text-xs text-textLight/70 mt-1 leading-relaxed">
                    Terima kasih telah menghubungi kami. Pesan Anda telah kami terima dan tim administrasi kami akan segera menanggapi melalui alamat email atau nomor telepon yang Anda berikan.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT COLUMN: School details & Iframe (7 cols on desktop) */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              
              {/* Detailed Contact Cards */}
              <Reveal direction="right">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-150/40 shadow-sm space-y-6 dark:bg-zinc-900 dark:border-zinc-800">
                  <h3 className="text-lg font-extrabold text-primary dark:text-white mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-accent">
                    Sekretariat Sekolah
                  </h3>
                  
                  <div className="flex gap-4 items-start">
                    <MapPin className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs uppercase font-extrabold tracking-wide text-textLight/45 dark:text-zinc-500">Alamat Fisik Sekolah</h4>
                      <p className="text-sm font-semibold text-primary dark:text-zinc-300 leading-relaxed mt-1">{schoolInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <Clock className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs uppercase font-extrabold tracking-wide text-textLight/45 dark:text-zinc-500">Jam Operasional Layanan</h4>
                      <ul className="text-xs sm:text-sm font-semibold text-primary dark:text-zinc-300 mt-1.5 space-y-1">
                        {schoolInfo.hours.map((hour, idx) => (
                          <li key={idx} className="flex gap-1.5 justify-between max-w-[250px]">
                            <span className="text-textLight/60">{hour.days}</span>
                            <span>{hour.time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Google Maps Iframe */}
              <Reveal direction="right" delay={0.05}>
                <div className="w-full h-80 rounded-3xl overflow-hidden border border-gray-150/45 shadow-sm">
                  <iframe
                    title="Peta Lokasi Google Maps SD Bustanuddin"
                    src={schoolInfo.googleMapsEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </Reveal>

            </div>

            {/* RIGHT COLUMN: Contact Form (5 cols on desktop) */}
            <div className="lg:col-span-5">
              <Reveal direction="left" delay={0.05}>
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-150/40 shadow-md dark:bg-zinc-900 dark:border-zinc-800">
                  <h3 className="text-lg font-extrabold text-primary dark:text-white mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-accent">
                    Kirim Pesan
                  </h3>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    
                    {/* Name input */}
                    <div>
                      <label htmlFor="name" className="block text-xs uppercase font-extrabold tracking-wide text-primary dark:text-white mb-2">
                        Nama Lengkap Anda *
                      </label>
                      <input
                        id="name"
                        type="text"
                        {...register("name")}
                        placeholder="Contoh: Budi Santoso"
                        className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-bgLight dark:bg-zinc-850 dark:text-white outline-none transition-all ${
                          errors.name ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-accent"
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1.5 font-medium">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.name.message}
                        </span>
                      )}
                    </div>

                    {/* Email input */}
                    <div>
                      <label htmlFor="email" className="block text-xs uppercase font-extrabold tracking-wide text-primary dark:text-white mb-2">
                        Alamat Surat Elektronik (Email) *
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="Contoh: budi@gmail.com"
                        className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-bgLight dark:bg-zinc-850 dark:text-white outline-none transition-all ${
                          errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-accent"
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1.5 font-medium">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.email.message}
                        </span>
                      )}
                    </div>

                    {/* Phone input */}
                    <div>
                      <label htmlFor="phone" className="block text-xs uppercase font-extrabold tracking-wide text-primary dark:text-white mb-2">
                        Nomor HP Aktif Anda *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        placeholder="Contoh: 08123456789"
                        className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-bgLight dark:bg-zinc-850 dark:text-white outline-none transition-all ${
                          errors.phone ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-accent"
                        }`}
                      />
                      {errors.phone && (
                        <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1.5 font-medium">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.phone.message}
                        </span>
                      )}
                    </div>

                    {/* Subject select */}
                    <div>
                      <label htmlFor="subject" className="block text-xs uppercase font-extrabold tracking-wide text-primary dark:text-white mb-2">
                        Subjek Kepentingan Pesan *
                      </label>
                      <select
                        id="subject"
                        {...register("subject")}
                        className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-bgLight dark:bg-zinc-850 dark:text-white outline-none transition-all ${
                          errors.subject ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-accent"
                        }`}
                      >
                        <option value="">-- Pilih Subjek --</option>
                        <option value="Info PPDB">Informasi Pendaftaran Siswa (PPDB)</option>
                        <option value="Informasi Umum">Informasi Kegiatan Sekolah Umum</option>
                        <option value="Proposal Kerja Sama">Penawaran Kemitraan / Kerja Sama</option>
                        <option value="Pengaduan">Pengaduan Layanan / Saran Kritik</option>
                      </select>
                      {errors.subject && (
                        <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1.5 font-medium">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.subject.message}
                        </span>
                      )}
                    </div>

                    {/* Message textarea */}
                    <div>
                      <label htmlFor="message" className="block text-xs uppercase font-extrabold tracking-wide text-primary dark:text-white mb-2">
                        Isi Pesan Anda *
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        {...register("message")}
                        placeholder="Tuliskan detail pertanyaan atau saran Anda..."
                        className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-bgLight dark:bg-zinc-850 dark:text-white outline-none transition-all ${
                          errors.message ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-accent"
                        }`}
                      ></textarea>
                      {errors.message && (
                        <span className="text-[11px] text-red-500 flex items-center gap-1 mt-1.5 font-medium">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.message.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center rounded-xl bg-accent py-3 text-sm font-bold text-white shadow-sm hover:bg-accent-dark transition-all hover:scale-102 active:scale-98 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Mengirim Pesan...
                        </>
                      ) : (
                        "Kirim Pesan Kontak"
                      )}
                    </button>

                  </form>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
