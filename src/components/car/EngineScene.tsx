import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ENGINE_PARTS, type EnginePart } from "@/data/engineParts";
import engineVideo from "@/assets/engine-lumina.mp4.asset.json";





export default function EngineScene() {
  const [explode, setExplode] = useState(0.6);
  const [selected, setSelected] = useState<EnginePart | null>(ENGINE_PARTS[0]);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-carbon">
        <Canvas shadows dpr={[1, 1.75]} camera={{ position: [3.2, 2.4, 3.4], fov: 45 }}>
          <color attach="background" args={["#0a0a0b"]} />
          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 5, 3]} intensity={1.1} castShadow />
          <spotLight position={[-3, 4, -2]} intensity={0.7} color={"#e30613"} />
          <Suspense fallback={null}>
            {LAYOUT.map((p) => (
              <Part
                key={p.part.id}
                placed={p}
                explode={explode}
                selected={selected?.id === p.part.id}
                onSelect={() => setSelected(p.part)}
              />
            ))}
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enablePan={false} minDistance={3} maxDistance={10} />
        </Canvas>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>◉ Hybrid Power Unit</span>
          <span>Click part · Explode →</span>
        </div>

        <div className="absolute inset-x-4 bottom-4 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Explode</span>
          <input
            type="range"
            min={0} max={1.6} step={0.02}
            value={explode}
            onChange={(e) => setExplode(parseFloat(e.target.value))}
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
