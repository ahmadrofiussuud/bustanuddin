import React from "react";
import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, Clock } from "lucide-react";
import { navLinks, schoolInfo } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-textDark pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top footer section: 4 Columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 border-b border-white/10 pb-12">
          
          {/* Column 1: School Branding & Social Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="font-sans text-xl font-bold tracking-tight text-white">
                {schoolInfo.name}
              </span>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">
              Mendidik generasi muda yang cerdas, berkarakter luhur, dan siap bersaing di kancah global dengan nilai keagamaan yang kuat.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-3 pt-2">
              <a
                href={schoolInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram SD Bustanuddin"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-accent hover:text-white"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href={schoolInfo.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube SD Bustanuddin"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-accent hover:text-white"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11C4.483 20.455 12 20.455 12 20.455s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={schoolInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook SD Bustanuddin"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-accent hover:text-white"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-accent">
              Tautan Cepat
            </h3>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/85 hover:text-accent transition-colors duration-150 flex items-center before:content-['›'] before:mr-1.5 before:text-accent before:text-base before:font-bold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/ppdb"
                  className="text-white/85 hover:text-accent transition-colors duration-150 flex items-center before:content-['›'] before:mr-1.5 before:text-accent before:text-base before:font-bold"
                >
                  PPDB
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-accent">
              Kontak Kami
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-white/85 leading-relaxed">{schoolInfo.address}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span className="text-white/85">{schoolInfo.phone}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a href={`mailto:${schoolInfo.email}`} className="text-white/85 hover:underline">
                  {schoolInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Operational & Google Map Embed */}
          <div className="space-y-5">
            <div>
              <h3 className="text-white font-semibold text-base mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-accent">
                Jam Operasional
              </h3>
              <ul className="space-y-2 text-xs text-white/85">
                {schoolInfo.hours.map((hour, idx) => (
                  <li key={idx} className="flex gap-2 items-center">
                    <Clock className="h-3.5 w-3.5 text-accent shrink-0" />
                    <span>
                      <strong className="text-white">{hour.days}:</strong> {hour.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Google Maps Embed iframe */}
            <div className="w-full h-32 rounded-lg overflow-hidden border border-white/10 shadow-inner">
              <iframe
                title="Peta Lokasi SD Bustanuddin"
                src={schoolInfo.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Bottom footer: Copyright Info */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-xs text-white/60 text-center gap-4">
          <p>© {currentYear} {schoolInfo.name}. Seluruh Hak Cipta Dilindungi.</p>
          <p>
            Dikembangkan dengan <span className="text-red-500 animate-pulse">❤️</span> oleh{" "}
            <span className="text-white font-medium hover:text-accent transition-colors duration-150 cursor-pointer">
              Tim IT {schoolInfo.shortName}
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
}
