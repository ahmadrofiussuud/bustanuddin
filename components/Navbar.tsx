"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks, schoolInfo } from "@/lib/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle sticky navbar backdrop and shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white border-b border-gray-100 ${
        isScrolled ? "shadow-md py-2.5" : "shadow-sm py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-auto items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt="SD Bustanuddin Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-lg font-bold tracking-tight text-primary transition-colors duration-300 group-hover:text-secondary md:text-xl">
                {schoolInfo.name}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-secondary font-medium leading-none">
                {schoolInfo.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:bg-lightAccent/30 hover:text-primary ${
                    isActive
                      ? "text-primary font-semibold bg-lightAccent/40"
                      : "text-textLight hover:text-primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/ppdb"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-dark hover:scale-[1.02] active:scale-[0.98]"
            >
              Daftar Sekarang
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-primary hover:bg-lightAccent/40 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
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
        <div className="border-t border-gray-100 bg-white px-4 py-4 shadow-lg">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2.5 text-base font-medium rounded-lg transition-colors duration-150 ${
                    isActive
                      ? "bg-lightAccent text-primary font-bold"
                      : "text-textLight hover:bg-gray-50 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <hr className="my-2 border-gray-100" />
            <Link
              href="/ppdb"
              className="block w-full text-center rounded-lg bg-accent py-3 text-base font-bold text-white shadow-sm hover:bg-accent-dark transition-colors duration-150"
            >
              Daftar Sekarang
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
