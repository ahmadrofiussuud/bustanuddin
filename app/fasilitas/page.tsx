import type { Metadata } from "next";
import FasilitasClient from "./FasilitasClient";

export const metadata: Metadata = {
  title: "Fasilitas Sekolah",
  description:
    "Lihat sarana prasarana penunjang belajar mengajar di SD Bustanuddin: Playground edukatif, Laboratorium Komputer dasar, Perpustakaan ramah anak, Lapangan olahraga, Kantin sehat, dan UKS.",
  keywords: [
    "Fasilitas SD Bustanuddin",
    "Laboratorium Komputer SD",
    "Perpustakaan Ramah Anak",
    "Playground SD Bustanuddin",
    "Lapangan Olahraga SD",
  ],
};

export default function FasilitasPage() {
  return <FasilitasClient />;
}
