import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ChevronRight, Zap, Gauge, BatteryCharging, Target } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import { Counter } from "@/components/site/Counter";
import { Reveal, SectionEyebrow } from "@/components/site/Reveal";
import { TIMELINE } from "@/data/timeline";
import { NEWS } from "@/data/news";
import { SPONSORS } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Audi Formula 1 — The Future of Motorsport" },
      { name: "description", content: "Discover the Audi Formula 1 concept team: hybrid power, German engineering, and the next era of racing excellence." },
      { property: "og:title", content: "Audi Formula 1 — The Future of Motorsport" },
      { property: "og:description", content: "Engineering precision. Electric innovation. Racing excellence." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const stats = [
    { icon: Zap,             label: "Engine power",       value: 1050, suffix: " hp", note: "Combined hybrid output" },
    { icon: Gauge,            label: "Top speed",          value: 362,  suffix: " km/h", note: "Recorded on high-speed circuits" },
    { icon: BatteryCharging, label: "Hybrid recovery",    value: 160,  suffix: " kW", note: "MGU-K peak deployment" },
    { icon: Target,          label: "Championship goal",  value: 2028, suffix: "",     note: "First constructors' title" },
  ];

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <img
            src={heroCar}
            alt="Audi Formula 1 R26 concept"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/40" />
        </motion.div>

        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl place-items-center px-4 pt-24 sm:px-6 lg:px-8">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7 }}
              className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-primary"
            >
              <span className="h-px w-10 bg-primary" />
              Season 2026 · Debut
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-4xl font-display text-5xl font-black leading-[0.95] sm:text-7xl lg:text-[7.5rem]"
            >
              The Future of{" "}
              <span className="text-gradient-red">Motorsport</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.7 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Audi Formula 1. Engineering precision. Electric innovation. Racing excellence — reborn on the grid.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.7 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link
                to="/drivers"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90"
              >
                Explore the team
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                to="/car"
                className="group inline-flex items-center gap-2 rounded-md border border-border bg-background/40 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-foreground backdrop-blur transition hover:border-primary hover:text-primary"
              >
                Discover the car
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Bottom bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1, duration: 0.8 }}
              className="mt-20 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-border pt-6 sm:grid-cols-4"
            >
              {[
                ["Chassis", "Hinwil, CH"],
                ["Power Unit", "Neuburg, DE"],
                ["Drivers", "2 · GER / ESP"],
                ["Fuel", "100% Sustainable"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{k}</div>
                  <div className="mt-1 text-sm font-semibold text-foreground">{v}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            Scroll ↓
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="glass hairline group h-full rounded-xl p-6 transition hover:-translate-y-1 hover:red-glow">
                <s.icon className="h-6 w-6 text-primary transition group-hover:scale-110" />
                <div className="mt-6 font-display text-4xl font-black tracking-tight lg:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {s.label}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[400px_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionEyebrow>The journey</SectionEyebrow>
            <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl">
              From Zwickau to the F1 grid.
            </h2>
            <p className="mt-6 text-muted-foreground">
              A century of engineering compressed into one racing program — Audi's Formula 1 chapter builds on Le Mans dominance, DTM titles, and Quattro heritage.
            </p>
          </div>

          <div className="relative pl-8 sm:pl-12">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-border sm:left-4" />
            <div className="space-y-10">
              {TIMELINE.map((t, i) => (
                <Reveal key={t.year} delay={i * 0.05}>
                  <div className="relative">
                    <span className="absolute -left-8 top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background sm:-left-10" />
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-sm text-primary">{t.year}</span>
                      <h3 className="text-xl font-bold">{t.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <SectionEyebrow>Latest</SectionEyebrow>
            <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl">From the paddock.</h2>
          </div>
          <Link to="/performance" className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition hover:text-primary">
            All updates <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {NEWS.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.08}>
              <article className="group relative overflow-hidden rounded-xl border border-border bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={n.img} alt={n.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    <span className="text-primary">{n.tag}</span>
                    <span>{n.date}</span>
                  </div>
                  <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug">{n.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{n.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SPONSORS marquee */}
      <section className="relative overflow-hidden border-y border-border py-10">
        <div className="flex marquee gap-16 whitespace-nowrap font-display text-2xl font-bold uppercase tracking-widest text-muted-foreground/70">
          {[...SPONSORS, ...SPONSORS].map((s, i) => (
            <span key={i} className="flex items-center gap-16">
              {s} <span className="text-primary">◉</span>
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
