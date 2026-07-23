import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { Reveal, SectionEyebrow } from "@/components/site/Reveal";
import { HOTSPOTS } from "@/data/carHotspots";
import engineVideo from "@/assets/engine-explode.mp4.asset.json";

const CarScene = lazy(() => import("@/components/car/CarScene"));
const EngineScene = lazy(() => import("@/components/car/EngineScene"));

export const Route = createFileRoute("/car")({
  head: () => ({
    meta: [
      { title: "The Car — Audi Formula 1 R26" },
      { name: "description", content: "Explore the Audi F1 R26 in 3D. Rotate the chassis, inspect hotspots on wings and floor, and dive into the hybrid power unit." },
      { property: "og:title", content: "The Car — Audi Formula 1 R26" },
      { property: "og:description", content: "Interactive 3D of the Audi F1 car and hybrid power unit." },
      { property: "og:url", content: "/car" },
    ],
    links: [{ rel: "canonical", href: "/car" }],
  }),
  component: CarPage,
});

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false);
  useEffect(() => setOk(true), []);
  if (!ok) return null;
  return <>{children}</>;
}

function Skeleton({ label }: { label: string }) {
  return (
    <div className="grid aspect-[16/10] w-full place-items-center rounded-2xl border border-border bg-carbon">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Loading {label}…
        </div>
      </div>
    </div>
  );
}

function CarPage() {
  return (
    <div className="pt-32 pb-16">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionEyebrow>Chassis R26</SectionEyebrow>
        <h1 className="max-w-4xl font-display text-5xl font-black leading-[0.95] sm:text-7xl">
          Every gram. <span className="text-gradient-red">Every millimetre.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A ground-effect chassis engineered around the hybrid power unit. Drag to rotate, tap the red markers to inspect the components.
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <ClientOnly>
          <Suspense fallback={<Skeleton label="chassis" />}>
            <CarScene />
          </Suspense>
        </ClientOnly>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HOTSPOTS.slice(0, 4).map((h) => (
            <div key={h.id} className="rounded-lg border border-border bg-card/60 p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{h.id}</div>
              <div className="mt-1 font-semibold">{h.name}</div>
              <div className="mt-1 font-mono text-[11px] text-muted-foreground">{h.spec}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <SectionEyebrow>Hybrid Power Unit</SectionEyebrow>
            <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl">
              The <span className="text-gradient-red">heart</span> of the machine.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              A 1.6 litre V6 turbo, twin MGUs and a high-density battery pack — all designed in Neuburg. Explode the assembly, click a part, meet the future of racing engines.
            </p>
          </div>
          <video src={engineVideo.url} autoPlay muted loop playsInline className="aspect-video rounded-2xl border border-border object-cover" />
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <ClientOnly>
          <Suspense fallback={<Skeleton label="power unit" />}>
            <EngineScene />
          </Suspense>
        </ClientOnly>
      </section>

      <Reveal className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass hairline grid gap-6 rounded-2xl p-8 sm:grid-cols-3">
          {[
            ["1.6 L V6", "Turbo Hybrid ICE"],
            ["+160 hp", "ERS Deployment"],
            ["100%", "Sustainable Fuel"],
          ].map(([v, k]) => (
            <div key={k} className="text-center">
              <div className="font-display text-4xl font-black text-gradient-red">{v}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{k}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
