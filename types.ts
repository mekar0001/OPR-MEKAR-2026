
export interface Report {
  id: string;
  namaProgram: string;
  unit: string;
  anjuran: string;
  tarikh: string;
  masa: string;
  tempat: string;
  bilanganPeserta: string;
  sasaran: string;
  aktiviti: string;
  rumusan: string;
  disediakanOleh: string;
  createdAt: string;
  images: string[];
}

export enum Tab {
  FORM = 'form',
  CHECKLIST = 'checklist',
  DASHBOARD = 'dashboard',
  ANALYTICS = 'analytics',
  GALLERY = 'gallery'
}

export const UNITS = [
  "Unit Akademik",
  "Unit Kokurikulum",
  "Unit Hal Ehwal Murid",
  "Unit Pentadbiran",
  "Unit Kaunseling",
  "Unit Perpustakaan"
];

export const ANJURAN_LIST = [
  "Panitia Bahasa Melayu",
  "Panitia Bahasa Inggeris",
  "Panitia Matematik",
  "Panitia Sains",
  "Panitia Sejarah",
  "Panitia Pendidikan Islam",
  "Unit Bimbingan",
  "Unit Disiplin",
  "Unit Sukan",
  "Unit Kelab & Persatuan",
  "PIBG",
  "Pentadbiran"
];
