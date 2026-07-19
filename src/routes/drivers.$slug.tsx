import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { DRIVERS, type Driver } from "@/data/drivers";
import { Reveal, SectionEyebrow } from "@/components/site/Reveal";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/drivers/$slug")({
  loader: ({ params }): Driver => {
    const driver = DRIVERS.find((d) => d.slug === params.slug);
    if (!driver) throw notFound();
    return driver;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Driver not found — Audi F1" }, { name: "robots", content: "noindex" }] };
    }
    const d = loaderData;
    return {
      meta: [
        { title: `${d.name} — Audi F1 Driver #${d.number}` },
        { name: "description", content: `${d.name} · ${d.nationality} · #${d.number}. ${d.bio.slice(0, 140)}` },
        { property: "og:title", content: `${d.name} — Audi F1 Driver #${d.number}` },
        { property: "og:description", content: d.bio.slice(0, 140) },
        { property: "og:url", content: `/drivers/${d.slug}` },
        { property: "og:type", content: "profile" },
      ],
      links: [{ rel: "canonical", href: `/drivers/${d.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: d.name,
          nationality: d.nationality,
          jobTitle: "Formula 1 Driver",
        }),
      }],
    };
  },
  component: DriverPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center pt-32">
      <div className="text-center">
        <h1 className="font-display text-4xl font-black">Driver not found</h1>
        <Link to="/drivers" className="mt-4 inline-block text-primary">← Back to drivers</Link>
      </div>
    </div>
  ),
});

function DriverPage() {
  const d = Route.useLoaderData();

  return (
    <div className="pt-32 pb-16">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/drivers" className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> All drivers
        </Link>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <img src={d.photo} alt={d.name} className="aspect-[3/4] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                  {d.flag} {d.nationality}
                </div>
                <div className="font-display text-8xl font-black text-primary">{d.number}</div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionEyebrow>Profile</SectionEyebrow>
            <h1 className="font-display text-5xl font-black leading-[1] sm:text-6xl">{d.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{d.hometown} · Age {d.age}</p>

            <div className="mt-8 grid grid-cols-4 gap-3">
              {[
                ["Wins", d.wins],
                ["Poles", d.poles],
                ["Podiums", d.podiums],
                ["Titles", d.championships],
              ].map(([k, v]) => (
                <div key={k as string} className="rounded-lg border border-border bg-card/60 p-3 text-center">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{k}</div>
                  <div className="mt-1 font-display text-2xl font-black">{v}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>{d.bio}</p>
            </div>

            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Anecdote</div>
              <blockquote className="mt-2 border-l-2 border-primary pl-4 text-sm italic text-foreground">
                “{d.anecdote}”
              </blockquote>
            </div>

            <div className="mt-10 space-y-3">
              {d.stats.map((s, i) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono uppercase tracking-widest text-muted-foreground">{s.label}</span>
                    <span className="font-mono text-foreground">{s.value}/{s.max}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(s.value / s.max) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
