import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY, GALLERY_CATEGORIES, type GalleryItem } from "@/data/gallery";
import { Reveal, SectionEyebrow } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Audi Formula 1" },
      { name: "description", content: "High-quality imagery from the Audi F1 program: car, drivers, garage, pit stops, engine, and race day." },
      { property: "og:title", content: "Gallery — Audi Formula 1" },
      { property: "og:description", content: "High-quality imagery from the Audi F1 program." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

function Gallery() {
  const [cat, setCat] = useState<(typeof GALLERY_CATEGORIES)[number]>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = useMemo<GalleryItem[]>(
    () => (cat === "All" ? GALLERY : GALLERY.filter((g) => g.category === cat)),
    [cat],
  );

  const open = openIndex !== null ? items[openIndex] : null;
  const prev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length));
  const next = () => setOpenIndex((i) => (i === null ? null : (i + 1) % items.length));

  return (
    <div className="pt-32 pb-16">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionEyebrow>Gallery</SectionEyebrow>
        <h1 className="max-w-4xl font-display text-5xl font-black leading-[0.95] sm:text-7xl">
          Frames from the <span className="text-gradient-red">edge.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Selected imagery from the garage, the paddock and the pit lane.
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {GALLERY_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition",
                cat === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background/40 text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((g, i) => (
            <Reveal key={g.id} delay={i * 0.03}>
              <button
                onClick={() => setOpenIndex(i)}
                className={cn(
                  "group relative block w-full overflow-hidden rounded-lg border border-border bg-card",
                  g.aspect === "portrait" && "aspect-[3/4]",
                  g.aspect === "landscape" && "aspect-[4/3]",
                  g.aspect === "square" && "aspect-square",
                )}
              >
                <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-left opacity-0 transition group-hover:opacity-100">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-primary">{g.category}</div>
                  <div className="text-xs font-medium">{g.alt}</div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-background/90 p-4 backdrop-blur-xl"
            onClick={() => setOpenIndex(null)}
          >
            <button onClick={() => setOpenIndex(null)} className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full border border-border text-foreground hover:border-primary" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-border text-foreground hover:border-primary" aria-label="Previous">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-6 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-border text-foreground hover:border-primary" aria-label="Next">
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.img
              key={open.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              src={open.src}
              alt={open.alt}
              className="max-h-[85vh] max-w-[92vw] rounded-lg border border-border object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
