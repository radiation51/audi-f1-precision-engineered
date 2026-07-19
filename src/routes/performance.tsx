import { createFileRoute } from "@tanstack/react-router";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { Reveal, SectionEyebrow } from "@/components/site/Reveal";
import { CALENDAR, CONSTRUCTOR_STANDINGS, DRIVER_STANDINGS, POINTS_EVOLUTION, RECENT_RESULTS } from "@/data/performance";
import { Counter } from "@/components/site/Counter";
import { motion } from "framer-motion";

export const Route = createFileRoute("/performance")({
  head: () => ({
    meta: [
      { title: "Performance — Audi Formula 1" },
      { name: "description", content: "Live-style standings, race results, points evolution and the upcoming calendar for the Audi Formula 1 team." },
      { property: "og:title", content: "Performance — Audi Formula 1" },
      { property: "og:description", content: "Race results, standings, and the season calendar." },
      { property: "og:url", content: "/performance" },
    ],
    links: [{ rel: "canonical", href: "/performance" }],
  }),
  component: Performance,
});

function Performance() {
  const teamPoints = CONSTRUCTOR_STANDINGS.find((c) => c.name === "Audi F1")?.pts ?? 0;
  const kpis = [
    { label: "Constructor position", value: 4, suffix: "" },
    { label: "Team points",           value: teamPoints, suffix: "" },
    { label: "Podiums",               value: 3, suffix: "" },
    { label: "Fastest laps",          value: 2, suffix: "" },
  ];

  return (
    <div className="pt-32 pb-16">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionEyebrow>Season · 2026</SectionEyebrow>
        <h1 className="max-w-4xl font-display text-5xl font-black leading-[0.95] sm:text-7xl">
          The data <span className="text-gradient-red">speaks.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Placeholder telemetry from the debut season, updated after each Grand Prix. Data structure is API-ready.
        </p>
      </section>

      <section className="mx-auto mt-14 grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {kpis.map((k, i) => (
          <Reveal key={k.label} delay={i * 0.06}>
            <div className="glass rounded-xl p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{k.label}</div>
              <div className="mt-3 font-display text-4xl font-black">
                <Counter to={k.value} suffix={k.suffix} />
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <Reveal className="lg:col-span-2">
          <div className="glass rounded-xl p-6">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <SectionEyebrow>Points evolution</SectionEyebrow>
                <h3 className="font-display text-2xl font-bold">Cumulative team points</h3>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">R01 → R08</div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={POINTS_EVOLUTION}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="round" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#141416", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: "#e30613", fontFamily: "monospace" }}
                  />
                  <Line type="monotone" dataKey="total" stroke="#e30613" strokeWidth={2.5} dot={{ fill: "#e30613", r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass h-full rounded-xl p-6">
            <SectionEyebrow>Constructors</SectionEyebrow>
            <h3 className="mb-4 font-display text-2xl font-bold">Standings</h3>
            <div className="space-y-2.5">
              {CONSTRUCTOR_STANDINGS.map((c) => {
                const highlight = c.name === "Audi F1";
                return (
                  <div key={c.name} className={`flex items-center justify-between rounded-md px-3 py-2 ${highlight ? "border border-primary/40 bg-primary/10" : "border border-transparent"}`}>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground">{String(c.pos).padStart(2, "0")}</span>
                      <span className={`text-sm ${highlight ? "font-bold text-primary" : ""}`}>{c.name}</span>
                    </div>
                    <span className="font-mono text-sm">{c.pts}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-6 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div className="glass overflow-hidden rounded-xl">
            <div className="flex items-center justify-between border-b border-border p-6">
              <div>
                <SectionEyebrow>Recent results</SectionEyebrow>
                <h3 className="font-display text-2xl font-bold">Race by race</h3>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead className="text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">GP</th>
                  <th className="px-2 py-3">Date</th>
                  <th className="px-2 py-3">Hartmann</th>
                  <th className="px-2 py-3">Reyes</th>
                  <th className="px-6 py-3 text-right">Pts</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_RESULTS.map((r) => (
                  <tr key={r.gp} className="border-t border-border">
                    <td className="px-6 py-3 font-medium">{r.gp}</td>
                    <td className="px-2 py-3 font-mono text-muted-foreground">{r.date}</td>
                    <td className="px-2 py-3">{r.nico}</td>
                    <td className="px-2 py-3">{r.matteo}</td>
                    <td className="px-6 py-3 text-right font-mono text-primary">+{r.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass h-full rounded-xl p-6">
            <SectionEyebrow>Drivers</SectionEyebrow>
            <h3 className="mb-4 font-display text-2xl font-bold">Top of the championship</h3>
            <div className="space-y-2.5">
              {DRIVER_STANDINGS.map((d) => {
                const ours = d.team === "Audi F1";
                const max = DRIVER_STANDINGS[0].pts;
                return (
                  <div key={d.name} className={`rounded-md border p-3 ${ours ? "border-primary/40 bg-primary/10" : "border-border"}`}>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-muted-foreground">{String(d.pos).padStart(2, "0")}</span>
                        <span className={ours ? "font-bold text-primary" : ""}>{d.name}</span>
                        <span className="text-xs text-muted-foreground">· {d.team}</span>
                      </div>
                      <span className="font-mono">{d.pts}</span>
                    </div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(d.pts / max) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className={`h-full ${ours ? "bg-primary" : "bg-muted-foreground/40"}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <SectionEyebrow>Upcoming</SectionEyebrow>
            <h3 className="font-display text-3xl font-black">Race calendar</h3>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {CALENDAR.map((r, i) => (
            <Reveal key={r.round} delay={i * 0.03}>
              <div className="glass rounded-lg p-4 transition hover:-translate-y-1 hover:border-primary/40">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary">R{String(r.round).padStart(2, "0")}</span>
                  <span className="text-2xl">{r.flag}</span>
                </div>
                <div className="mt-2 font-semibold">{r.gp}</div>
                <div className="font-mono text-xs text-muted-foreground">{r.date}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
