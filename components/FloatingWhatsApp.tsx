"use client";

import React, { useState, useEffect } from "react";
import { schoolInfo } from "@/lib/data";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Subtle entrance and bounce trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${schoolInfo.whatsapp}?text=${encodeURIComponent(
    schoolInfo.whatsappMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      {/* Tooltip */}
      <div
        className={`mr-3 rounded-lg bg-textLight px-3 py-1.5 text-xs text-textDark shadow-md transition-all duration-300 ${
          showTooltip ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 pointer-events-none"
        }`}
      >
        Chat dengan kami
        {/* Little triangle pointing right */}
        <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-textLight"></div>
      </div>

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Hubungi kami melalui WhatsApp"
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95 ${
          animate ? "animate-bounce-subtle" : "scale-0"
        }`}
      >
        <svg
          className="h-8 w-8 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.407 9.862-9.836.002-2.63-1.023-5.101-2.885-6.968-1.862-1.867-4.339-2.895-6.974-2.896-5.442 0-9.866 4.41-9.87 9.839-.001 1.77.464 3.5 1.346 5.013l-.974 3.558 3.654-.959zm11.758-6.924c-.305-.153-1.808-.891-2.088-.992-.28-.102-.485-.153-.688.152-.204.305-.788.992-.966 1.196-.178.203-.355.228-.66.076-.304-.152-1.285-.474-2.447-1.511-.904-.807-1.514-1.802-1.691-2.107-.178-.305-.019-.47.133-.621.137-.137.305-.355.457-.533.152-.178.203-.305.305-.508.102-.203.05-.381-.025-.533-.076-.152-.688-1.659-.942-2.27-.247-.597-.5-.515-.688-.525-.178-.008-.381-.01-.584-.01-.203 0-.533.076-.813.381-.28.305-1.067 1.042-1.067 2.54 0 1.498 1.092 2.946 1.244 3.149.153.203 2.15 3.284 5.207 4.601.727.313 1.293.5 1.736.641.73.232 1.393.197 1.918.12.585-.087 1.808-.737 2.062-1.448.254-.71.254-1.321.178-1.448-.076-.127-.28-.203-.585-.356z" />
        </svg>
      </a>
    </div>
  );
}
