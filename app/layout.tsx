import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | SD Bustanuddin",
    default: "SD Bustanuddin - Cerdas, Berakhlak Mulia, Berkarakter Sejak Dini",
  },
  description:
    "Website Resmi SD Bustanuddin. Berdiri sejak tahun 2006, mendidik anak didik cerdas, berakhlak mulia, dan berkarakter sejak usia dini.",
  keywords: [
    "SD Bustanuddin",
    "Sekolah Bustanuddin",
    "SD Terbaik Pamekasan",
    "Profil SD",
    "PPDB SD Bustanuddin",
  ],
  authors: [{ name: "SD Bustanuddin" }],
  metadataBase: new URL("http://localhost:3000"), // Fallback base URL for metadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-bgLight text-textLight flex flex-col min-h-screen`}
      >
        {/* Sticky Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col pt-[72px]">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Floating WhatsApp button */}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
