import React from "react";
import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { navLinks, schoolInfo, mockNews } from "@/lib/data";

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
    <line x1="17.5" y1="6.5" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Show first 2 recent news
  const recentNews = mockNews.slice(0, 2);

  return (
    <footer className="bg-primary text-white pt-20 pb-8 border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top footer section: 4 Columns */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 border-b border-white/10 pb-16">
          
          {/* Column 1: School Branding & Social Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white shadow-md shadow-accent/20">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xl font-extrabold tracking-tight text-white leading-none">
                  SD <span className="text-accent">Bustanuddin</span>
                </span>
                <span className="text-[9px] font-bold tracking-widest text-white/60 uppercase mt-0.5">
                  Cerdas & Berkarakter
                </span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Mendidik generasi muda yang cerdas, berakhlak mulia, dan siap menghadapi masa depan cerah sejak usia dini.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-3 pt-2">
              <a
                href={schoolInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white border border-white/10 transition-all duration-300 hover:bg-accent hover:border-accent hover:-translate-y-1"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={schoolInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white border border-white/10 transition-all duration-300 hover:bg-accent hover:border-accent hover:-translate-y-1"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={schoolInfo.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white border border-white/10 transition-all duration-300 hover:bg-accent hover:border-accent hover:-translate-y-1"
              >
                <YoutubeIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-accent">
              Tautan Cepat
            </h3>
            <ul className="space-y-3.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-accent hover:translate-x-1.5 transition-all duration-200 flex items-center gap-1.5"
                  >
                    <ArrowRight className="h-3 w-3 text-accent shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/ppdb"
                  className="text-white/70 hover:text-accent hover:translate-x-1.5 transition-all duration-200 flex items-center gap-1.5"
                >
                  <ArrowRight className="h-3 w-3 text-accent shrink-0" />
                  PPDB Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Recent News (Post Terbaru) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-accent">
              Berita Terbaru
            </h3>
            <div className="space-y-5">
              {recentNews.map((item) => (
                <div key={item.id} className="flex gap-3.5 group">
                  <div className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wide">
                      {item.date}
                    </span>
                    <h4 className="text-xs font-bold leading-normal line-clamp-2 text-white/90 hover:text-accent transition-colors">
                      <Link href={`/berita/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-accent">
              Kontak Kami
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start text-white/75 leading-relaxed">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>{schoolInfo.address}</span>
              </li>
              <li className="flex gap-3 items-center text-white/75">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <a href={`tel:${schoolInfo.phone}`} className="hover:text-accent hover:underline">
                  {schoolInfo.phone}
                </a>
              </li>
              <li className="flex gap-3 items-center text-white/75">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a href={`mailto:${schoolInfo.email}`} className="hover:text-accent hover:underline">
                  {schoolInfo.email}
                </a>
              </li>
              <li className="flex gap-3 items-center text-white/75">
                <Clock className="h-5 w-5 text-accent shrink-0" />
                <span>Senin - Sabtu (07:00 - 13:00)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom footer: Copyright Info */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-xs text-white/50 text-center gap-4">
          <p>© {currentYear} edu<span className="text-accent">ka</span> Bustanuddin. Seluruh Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            Dikembangkan oleh
            <span className="text-white hover:text-accent transition-colors font-semibold cursor-pointer">
              Tim IT {schoolInfo.shortName}
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
}
