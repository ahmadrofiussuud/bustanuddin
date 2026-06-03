import type { Metadata } from "next";
import AkademikClient from "./AkademikClient";

export const metadata: Metadata = {
  title: "Akademik",
  description:
    "Jelajahi program pembelajaran SD Bustanuddin (Fase A, Fase B, Fase C), struktur kurikulum Merdeka Belajar kelas I-VI, jadwal KBM harian, prestasi akademik, dan portal unduhan brosur.",
  keywords: [
    "Program Akademik SD Bustanuddin",
    "Fase Belajar SD",
    "Kurikulum Merdeka SD",
    "Kurikulum Merdeka Belajar",
    "Jadwal Pelajaran KBM SD",
    "Download Dokumen Sekolah",
  ],
};

export default function AkademikPage() {
  return <AkademikClient />;
}
