import type { Metadata } from "next";
import GaleriClient from "./GaleriClient";

export const metadata: Metadata = {
  title: "Galeri Dokumentasi",
  description:
    "Lihat galeri dokumentasi foto kegiatan belajar mengajar akademik, perlombaan olahraga ceria, pertunjukan seni anak, sosialisasi PPDB, dan prosesi pelepasan kelas VI di SD Bustanuddin.",
  keywords: [
    "Foto SD Bustanuddin",
    "Dokumentasi Kegiatan Sekolah Dasar",
    "Kegiatan Anak SD Bustanuddin",
    "Lomba Menggambar SD",
    "Pelepasan Kelas VI SD Bustanuddin",
  ],
};

export default function GaleriPage() {
  return <GaleriClient />;
}
