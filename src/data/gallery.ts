import hero from "@/assets/hero-car.jpg";
import engine from "@/assets/engine.jpg";
import garage from "@/assets/garage.jpg";
import pit from "@/assets/pit-stop.jpg";
import race from "@/assets/race.jpg";
import factory from "@/assets/factory.jpg";
import top from "@/assets/car-top.jpg";
import d1 from "@/assets/driver-1.jpg";
import d2 from "@/assets/driver-2.jpg";

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: "Car" | "Drivers" | "Garage" | "Pit Stop" | "Engine" | "Race";
  aspect: "portrait" | "landscape" | "square";
};

export const GALLERY: GalleryItem[] = [
  { id: "g1", src: hero,    alt: "R26 concept car at night",   category: "Car",     aspect: "landscape" },
  { id: "g2", src: top,     alt: "R26 top-down",              category: "Car",     aspect: "portrait" },
  { id: "g3", src: engine,  alt: "Hybrid power unit close-up", category: "Engine",  aspect: "landscape" },
  { id: "g4", src: d1,      alt: "Nico Hartmann portrait",    category: "Drivers", aspect: "portrait" },
  { id: "g5", src: d2,      alt: "Matteo Reyes portrait",     category: "Drivers", aspect: "portrait" },
  { id: "g6", src: garage,  alt: "Team garage",               category: "Garage",  aspect: "landscape" },
  { id: "g7", src: pit,     alt: "Pit stop in motion",        category: "Pit Stop",aspect: "landscape" },
  { id: "g8", src: race,    alt: "Race day at sunset",        category: "Race",    aspect: "landscape" },
  { id: "g9", src: factory, alt: "Neuburg factory floor",     category: "Garage",  aspect: "landscape" },
];

export const GALLERY_CATEGORIES = [
  "All", "Car", "Drivers", "Garage", "Pit Stop", "Engine", "Race",
] as const;
