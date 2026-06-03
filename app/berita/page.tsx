import type { Metadata } from "next";
import BeritaClient from "./BeritaClient";

export const metadata: Metadata = {
  title: "Berita & Pengumuman",
  description:
    "Ikuti kabar berita terbaru, pengumuman ujian, agenda rapat komite sekolah, dan kalender kegiatan akademis di SD Bustanuddin.",
  keywords: [
    "Berita SD Bustanuddin",
    "Pengumuman Ujian Sekolah SD",
    "Agenda Rapat Komite SD",
    "Kabar Terbaru Siswa SD",
    "Kalender Akademik SD",
  ],
};

export default function BeritaPage() {
  return <BeritaClient />;
}
