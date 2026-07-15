"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
} from "lucide-react";
import { navLinks, schoolInfo } from "@/lib/data";

// Custom SVG Social Icons
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  // Handle sticky navbar shadow and size on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Mencari: "${searchQuery}"`);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* 1. TOP BAR (Hidden on mobile) */}
      <div
        className={`bg-primary text-white text-xs transition-all duration-300 overflow-hidden lg:block hidden ${
          isScrolled ? "h-0 opacity-0" : "h-10 opacity-100 border-b border-white/10"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-white/70 font-medium">Ikuti Kami:</span>
            <div className="flex gap-2.5">
              <a
                href={schoolInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href={schoolInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href={schoolInfo.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-accent transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-white/80">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              <span>Galis, Pamekasan, Jawa Timur</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/80">
              <Mail className="h-3.5 w-3.5 text-accent" />
              <a href={`mailto:${schoolInfo.email}`} className="hover:text-accent hover:underline transition-colors">
                {schoolInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-white/80">
              <Phone className="h-3.5 w-3.5 text-accent" />
              <a href={`tel:${schoolInfo.phone}`} className="hover:text-accent hover:underline transition-colors">
                {schoolInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <nav
        className={`bg-white border-b border-gray-100 transition-all duration-300 ${
          isScrolled ? "shadow-md py-2.5" : "shadow-sm py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light shadow-md shadow-primary/20 text-white transition-transform duration-300 group-hover:scale-105">
                <GraduationCap className="h-6 w-6 text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xl font-extrabold tracking-tight text-primary transition-colors duration-300 group-hover:text-accent md:text-2xl leading-none">
                  SD <span className="text-accent">Bustanuddin</span>
                </span>
                <span className="text-[9px] font-bold tracking-widest text-primary/60 uppercase mt-0.5">
                  Cerdas & Berkarakter
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:text-accent ${
                      isActive
                        ? "text-primary bg-lightAccent/40 font-bold"
                        : "text-textLight/80 hover:bg-lightAccent/20"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA & Actions */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              {/* Search Bar Micro-interaction */}
              <div className="relative flex items-center">
                {showSearch && (
                  <form onSubmit={handleSearchSubmit} className="absolute right-10 top-1/2 -translate-y-1/2 animate-fade-in">
                    <input
                      type="text"
                      placeholder="Cari..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border border-gray-200 rounded-full px-4 py-1.5 text-xs focus:outline-none focus:border-accent w-48 text-primary shadow-sm bg-gray-50/50"
                    />
                  </form>
                )}
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="p-2 text-primary hover:text-accent rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Cari"
                >
                  {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                </button>
              </div>

              {/* Apply Now Button */}
              <Link
                href="/ppdb"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-accent/20 transition-all duration-200 hover:bg-accent-dark hover:scale-[1.03] active:scale-[0.98] tracking-wide"
              >
                DAFTAR PPDB
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-primary hover:text-accent rounded-full hover:bg-gray-100"
                aria-label="Cari"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center rounded-xl p-2 text-primary hover:bg-gray-100 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Buka Menu</span>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Overlay */}
          {showSearch && (
            <div className="lg:hidden mt-2 p-2 border-t border-gray-100 animate-slide-down">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Cari sesuatu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-accent bg-gray-50/50"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-screen opacity-100 visible"
              : "max-h-0 opacity-0 invisible overflow-hidden"
          }`}
          id="mobile-menu"
        >
          <div className="border-t border-gray-100 bg-white px-4 py-6 shadow-xl space-y-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 text-base font-bold rounded-xl transition-all ${
                      isActive
                        ? "bg-lightAccent text-primary"
                        : "text-textLight hover:bg-gray-50 hover:text-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <hr className="my-2 border-gray-100" />
              <Link
                href="/ppdb"
                className="block w-full text-center rounded-full bg-accent py-3 text-base font-extrabold text-white shadow-lg shadow-accent/20 hover:bg-accent-dark transition-colors duration-150"
              >
                DAFTAR PPDB (ONLINE)
              </Link>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
}
