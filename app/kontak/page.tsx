import type { Metadata } from "next";
import KontakClient from "./KontakClient";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description:
    "Hubungi sekretariat SD Bustanuddin. Informasi lengkap alamat sekolah, nomor telepon humas, alamat email resmi, jam operasional, peta lokasi Google Maps, dan formulir pengiriman pesan.",
  keywords: [
    "Kontak SD Bustanuddin",
    "Alamat SD Bustanuddin",
    "Email Sekolah SD Bustanuddin",
    "Nomor Telepon SD Bustanuddin",
    "Peta Google Maps Sekolah Dasar",
  ],
};

export default function KontakPage() {
  return <KontakClient />;
}
