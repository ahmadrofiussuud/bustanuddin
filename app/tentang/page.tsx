import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Pelajari sejarah berdirinya SD Bustanuddin sejak tahun 2006, visi dan misi luhur kami, nilai-nilai budaya karakter anak didik, struktur tata kelola, dan tim kepemimpinan pendidik kami.",
  keywords: [
    "Sejarah SD Bustanuddin",
    "Visi Misi SD",
    "Struktur Organisasi Sekolah Dasar",
    "Kepala Sekolah Bustanuddin",
    "Akreditasi SD Bustanuddin",
  ],
};

export default function TentangPage() {
  return <AboutClient />;
}
