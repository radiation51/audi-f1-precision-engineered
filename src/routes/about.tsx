import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionEyebrow } from "@/components/site/Reveal";
import { TIMELINE, VALUES } from "@/data/timeline";
import factory from "@/assets/factory.jpg";
import garage from "@/assets/garage.jpg";
import engine from "@/assets/engine.jpg";
import { Leaf, Cog, Cpu, Wind } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Audi Formula 1" },
      { name: "description", content: "Audi's Formula 1 story: heritage, hybrid engineering in Neuburg, sustainability, and the vision for a first constructors' title." },
      { property: "og:title", content: "About — Audi Formula 1" },
      { property: "og:description", content: "Audi's Formula 1 story: heritage, engineering and vision." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  const pillars = [
    { icon: Cog,  title: "Engineering DNA",   text: "Vorsprung durch Technik — a philosophy tested across every category we've ever entered." },
    { icon: Cpu,  title: "Hybrid Innovation", text: "A power unit built from a blank sheet, with the MGU-K delivering 50% of usable power." },
    { icon: Leaf, title: "Sustainability",    text: "100% synthetic drop-in fuel and a carbon-neutral factory footprint targeted for 2030." },
    { icon: Wind, title: "Aerodynamic Rigor", text: "Simulation-first development refined by full-scale wind tunnel work at Neuburg." },
  ];

  return (
    <div className="pt-32 pb-16">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionEyebrow>About</SectionEyebrow>
        <h1 className="max-w-4xl font-display text-5xl font-black leading-[0.95] sm:text-7xl">
          A century of engineering. <span className="text-gradient-red">One racing dream.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Audi's decision to enter Formula 1 is the natural extension of everything we've done — from Quattro to Le Mans hybrids. It's the ultimate technology stage, and we intend to compete at the front.
        </p>
      </section>

      <section className="mx-auto mt-24 grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <img src={factory} alt="Neuburg factory" loading="lazy" className="aspect-[4/3] w-full rounded-2xl border border-border object-cover" />
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col justify-center">
          <SectionEyebrow>Neuburg</SectionEyebrow>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Where the power unit is born.</h2>
          <p className="mt-4 text-muted-foreground">
            The Audi Motorsport Competence Center in Neuburg an der Donau houses the entire F1 Power Unit program — from design and casting to dyno testing and simulation. Every component is engineered under one roof, minimising handoffs and maximising iteration speed.
          </p>
          <ul className="mt-6 grid gap-3 text-sm">
            {[
              "40+ years of Audi motorsport heritage",
              "Purpose-built hybrid PU test benches",
              "Cross-team engineers from Le Mans, DTM and Formula E",
              "Sustainable fuel R&D on-site",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <SectionEyebrow>Core values</SectionEyebrow>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Four pillars, one program.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="glass h-full rounded-xl p-6 transition hover:-translate-y-1">
                <p.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <SectionEyebrow>Timeline</SectionEyebrow>
            <h2 className="mb-10 font-display text-3xl font-bold sm:text-4xl">Milestones on the road here.</h2>
            <div className="relative pl-8">
              <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
              <div className="space-y-8">
                {TIMELINE.map((t, i) => (
                  <Reveal key={t.year} delay={i * 0.04}>
                    <div className="relative">
                      <span className="absolute -left-8 top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-sm text-primary">{t.year}</span>
                        <h3 className="text-lg font-semibold">{t.title}</h3>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <img src={garage} alt="Team garage" loading="lazy" className="aspect-[4/5] w-full rounded-2xl border border-border object-cover" />
            <img src={engine} alt="Power unit" loading="lazy" className="aspect-video w-full rounded-2xl border border-border object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass hairline overflow-hidden rounded-2xl p-10 sm:p-16">
          <div className="grid gap-8 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Value {String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-2 font-display text-2xl font-bold">{v.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
