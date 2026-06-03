import type { Metadata } from "next";
import PpdbClient from "./PpdbClient";

export const metadata: Metadata = {
  title: "Pendaftaran PPDB Online",
  description:
    "Portal Resmi Penerimaan Peserta Didik Baru (PPDB) SD Bustanuddin. Informasi lengkap alur pendaftaran, rincian biaya pendidikan tahun ajaran baru, dokumen persyaratan, dan formulir registrasi digital.",
  keywords: [
    "PPDB Online SD Bustanuddin",
    "Penerimaan Siswa Baru SD",
    "Formulir Pendaftaran SD",
    "Biaya Sekolah SD Bustanuddin",
    "Jadwal PPDB Online SD",
  ],
};

export default function PpdbPage() {
  return <PpdbClient />;
}
