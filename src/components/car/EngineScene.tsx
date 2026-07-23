import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ENGINE_PARTS, type EnginePart } from "@/data/engineParts";
import engineVideo from "@/assets/engine-lumina.mp4.asset.json";

export default function EngineScene() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [explode, setExplode] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selected, setSelected] = useState<EnginePart | null>(ENGINE_PARTS[0]);

  const handleScrub = (v: number) => {
    setExplode(v);
    const vid = videoRef.current;
    if (vid && duration > 0) {
      vid.pause();
      // Map the extended slider range (0..2.4) into the full video timeline
      vid.currentTime = Math.min(duration, (v / 2.4) * duration);
    }
  };

  // Progressive visual separation on top of the video's own explode
  const progress = Math.min(1, explode / 2.4);
  const scale = 1 + progress * 0.35;
  const spread = progress * 40; // px

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-carbon">
        <div
          className="absolute inset-0 transition-transform duration-200 ease-out"
          style={{ transform: `scale(${scale})` }}
        >
          <video
            ref={videoRef}
            src={engineVideo.url}
            autoPlay
            muted
            loop
            playsInline
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            className="h-full w-full object-cover"
            style={{
              filter: `contrast(${1 + progress * 0.15}) saturate(${1 + progress * 0.2})`,
            }}
          />
        </div>

        {/* Layered ghost passes to amplify the perceived separation of parts */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-screen opacity-40 transition-transform duration-200 ease-out"
          style={{
            transform: `translateX(${spread}px) scale(${scale})`,
            filter: "hue-rotate(-10deg) blur(1px)",
            opacity: progress * 0.35,
            backgroundImage: `url(${engineVideo.url})`,
          }}
        />

        {/* Red technical grid that intensifies as parts spread */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            opacity: progress * 0.25,
            backgroundImage:
              "linear-gradient(rgba(227,6,19,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(227,6,19,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>◉ Hybrid Power Unit</span>
          <span>Separation · {Math.round(progress * 100)}%</span>
        </div>

        <div className="absolute inset-x-4 bottom-4 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Explode</span>
          <input
            type="range"
            min={0} max={2.4} step={0.02}
            value={explode}
            onChange={(e) => handleScrub(parseFloat(e.target.value))}
            className="flex-1 accent-primary"
          />
        </div>
      </div>



      <div className="flex flex-col gap-3">
        <div className="glass rounded-xl p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Now inspecting</div>
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <h4 className="mt-1 text-xl font-bold">{selected.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{selected.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  {selected.specs.map((s) => (
                    <div key={s.label} className="rounded-md border border-border bg-background/40 p-2.5">
                      <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
                      <div className="mt-1 font-medium text-foreground">{s.value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-md border border-primary/30 bg-primary/5 p-3 text-xs leading-relaxed text-foreground">
                  <span className="font-mono uppercase tracking-widest text-primary">Function · </span>
                  {selected.function}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {ENGINE_PARTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className={`rounded-md border p-2 text-left text-xs transition ${
                selected?.id === p.id
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ background: p.color }} />
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
