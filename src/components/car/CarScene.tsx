import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Html, ContactShadows, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import { HOTSPOTS, type Hotspot } from "@/data/carHotspots";
import { motion, AnimatePresence } from "framer-motion";
import carModel from "@/assets/audi-f1-2026.glb.asset.json";

const RED = "#e30613";
const CAR_SCALE = 4.5;

useGLTF.preload(carModel.url);

function F1Car({ spinning }: { spinning: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(carModel.url);
  useFrame((_, dt) => {
    if (spinning && group.current) group.current.rotation.y += dt * 0.25;
  });
  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} scale={CAR_SCALE} />
      </Center>
    </group>
  );
}

function CarHotspotMarker({ h, onClick, active }: { h: Hotspot; onClick: () => void; active: boolean }) {
  // Map 2D hotspot coords to a 3D position around the car (top view)
  const pos: [number, number, number] = [
    ((50 - h.x) / 25) * CAR_SCALE,   // x (front-back)
    0.9 * CAR_SCALE,
    ((h.y - 50) / 40) * CAR_SCALE,   // z (side-side)
  ];
  return (
    <Html position={pos} center distanceFactor={8}>
      <button
        onClick={onClick}
        className={`group grid h-6 w-6 place-items-center rounded-full border-2 transition ${
          active ? "border-primary bg-primary" : "border-primary/70 bg-primary/20"
        } pulse-red`}
        aria-label={h.name}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
      </button>
    </Html>
  );
}

export default function CarScene() {
  const [selected, setSelected] = useState<Hotspot | null>(null);
  const [spin, setSpin] = useState(true);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-carbon">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [1.8, 1.35, 1.8], fov: 28 }}
      >
        <color attach="background" args={["#0a0a0b"]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 6, 4]} intensity={1.4} castShadow />
        <spotLight position={[-4, 5, -2]} intensity={0.7} color={RED} />
        <Suspense fallback={null}>
          <F1Car spinning={spin} />
          <ContactShadows position={[0, 0.02, 0]} opacity={0.55} scale={32} blur={2.4} far={8} />
          <Environment preset="warehouse" />
          {HOTSPOTS.map((h) => (
            <CarHotspotMarker
              key={h.id}
              h={h}
              active={selected?.id === h.id}
              onClick={() => { setSelected(h); setSpin(false); }}
            />
          ))}
        </Suspense>
        <OrbitControls
          enablePan={false}
          minDistance={1.5}
          maxDistance={5}
          maxPolarAngle={Math.PI / 2.05}
          onStart={() => setSpin(false)}
        />
      </Canvas>

      {/* Overlay HUD */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>◉ R26 · Concept Chassis</span>
        <span>Drag to rotate · Scroll to zoom</span>
      </div>
      <button
        onClick={() => setSpin((s) => !s)}
        className="absolute bottom-4 left-4 rounded-md border border-border bg-background/60 px-3 py-1.5 text-xs uppercase tracking-widest text-muted-foreground backdrop-blur transition hover:text-foreground"
      >
        {spin ? "Pause" : "Auto rotate"}
      </button>

      <AnimatePresence>
        {selected && (
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            className="glass-strong absolute right-4 top-4 w-72 rounded-xl p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Component</div>
                <h3 className="mt-1 text-lg font-bold">{selected.name}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground" aria-label="Close">×</button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {selected.description}
            </p>
            <div className="mt-4 rounded-md border border-border bg-background/40 p-3 font-mono text-[11px] text-muted-foreground">
              {selected.spec}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
