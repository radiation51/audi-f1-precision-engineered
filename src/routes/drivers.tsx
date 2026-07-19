import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DRIVERS } from "@/data/drivers";
import { Reveal, SectionEyebrow } from "@/components/site/Reveal";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/drivers")({
  head: () => ({
    meta: [
      { title: "Drivers — Audi Formula 1" },
      { name: "description", content: "Meet the two race drivers of the Audi Formula 1 team — Nico Hartmann and Matteo Reyes." },
      { property: "og:title", content: "Drivers — Audi Formula 1" },
      { property: "og:description", content: "Meet the two race drivers of the Audi Formula 1 team." },
      { property: "og:url", content: "/drivers" },
    ],
    links: [{ rel: "canonical", href: "/drivers" }],
  }),
  component: DriversPage,
});

function DriversPage() {
  return (
    <div className="pt-32 pb-16">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionEyebrow>Race drivers</SectionEyebrow>
        <h1 className="max-w-4xl font-display text-5xl font-black leading-[0.95] sm:text-7xl">
          Two seats. <span className="text-gradient-red">One mission.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A German veteran meets a Spanish prodigy. Together, they define the debut era of Audi in Formula 1.
        </p>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {DRIVERS.map((d, i) => (
          <Reveal key={d.slug} delay={i * 0.1}>
            <Link
              to="/drivers/$slug"
              params={{ slug: d.slug }}
              className="group relative block overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <motion.img
                  src={d.photo}
                  alt={d.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                {/* number */}
                <div className="absolute right-4 top-4 font-display text-8xl font-black leading-none text-primary/80 mix-blend-plus-lighter sm:text-9xl">
                  {d.number}
                </div>

                {/* info */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                    <span className="text-lg">{d.flag}</span> {d.nationality}
                  </div>
                  <h2 className="mt-2 font-display text-3xl font-black sm:text-5xl">{d.name}</h2>
                  <div className="mt-4 grid grid-cols-4 gap-3 text-xs">
                    {[
                      ["Wins", d.wins],
                      ["Poles", d.poles],
                      ["Podiums", d.podiums],
                      ["Titles", d.championships],
                    ].map(([k, v]) => (
                      <div key={k as string} className="rounded-md border border-border bg-background/40 p-2 backdrop-blur">
                        <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{k}</div>
                        <div className="mt-0.5 text-base font-bold">{v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-foreground opacity-80 transition group-hover:text-primary group-hover:opacity-100">
                    Read profile <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
