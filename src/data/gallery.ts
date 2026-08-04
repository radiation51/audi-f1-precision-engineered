import bor1 from "@/assets/F1_2026_9155_BOR-L.avif.asset.json";
import borHul from "@/assets/F1_2026_9158_BOR_HUL-L.avif.asset.json";
import hul1 from "@/assets/F1_2026_9161_HUL-L.avif.asset.json";
import hul2 from "@/assets/F1_2026_9163_HUL-L.avif.asset.json";
import hulP from "@/assets/F1_p_2026_9224_HUL-L.avif.asset.json";
import borP from "@/assets/F1_p_2026_9236_BOR-L.avif.asset.json";

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: "Drivers" | "Race";
  aspect: "portrait" | "landscape" | "square";
};

export const GALLERY: GalleryItem[] = [
  { id: "u1", src: bor1.url,   alt: "Gabriel Bortoleto on track — 2026",     category: "Race",    aspect: "landscape" },
  { id: "u2", src: borHul.url, alt: "Bortoleto and Hülkenberg — 2026",       category: "Drivers", aspect: "landscape" },
  { id: "u3", src: hul1.url,   alt: "Nico Hülkenberg on track — 2026",       category: "Race",    aspect: "landscape" },
  { id: "u4", src: hul2.url,   alt: "Nico Hülkenberg cornering — 2026",      category: "Race",    aspect: "landscape" },
  { id: "u5", src: hulP.url,   alt: "Hülkenberg portrait — 2026",            category: "Drivers", aspect: "landscape" },
  { id: "u6", src: borP.url,   alt: "Bortoleto portrait — 2026",             category: "Drivers", aspect: "landscape" },
];

export const GALLERY_CATEGORIES = ["All", "Drivers", "Race"] as const;

