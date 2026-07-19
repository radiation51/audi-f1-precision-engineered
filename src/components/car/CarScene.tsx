import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Html, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { HOTSPOTS, type Hotspot } from "@/data/carHotspots";
import { motion, AnimatePresence } from "framer-motion";

const CARBON = "#0f0f10";
const RED = "#e30613";
const CHROME = "#c9c9c9";

function Tyre({ x, z }: { x: number; z: number }) {
  return (
    <mesh position={[x, 0.4, z]} castShadow>
      <cylinderGeometry args={[0.42, 0.42, 0.34, 32]} />
      <meshStandardMaterial color={"#0b0b0c"} roughness={0.8} metalness={0.1} />
    </mesh>
  );
}

function F1Car({ spinning }: { spinning: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (spinning && group.current) group.current.rotation.y += dt * 0.25;
  });
  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Floor / underbody */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.06, 1.6]} />
        <meshStandardMaterial color={CARBON} roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Nose */}
      <mesh position={[1.75, 0.32, 0]} castShadow>
        <coneGeometry args={[0.3, 1.2, 16]} />
        <meshStandardMaterial color={CARBON} roughness={0.35} metalness={0.6} />
      </mesh>
      {/* Cockpit / chassis */}
      <mesh position={[0.05, 0.42, 0]} castShadow>
        <boxGeometry args={[1.9, 0.28, 0.6]} />
        <meshStandardMaterial color={CARBON} roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Red accent stripe */}
      <mesh position={[0.05, 0.58, 0]}>
        <boxGeometry args={[1.9, 0.03, 0.62]} />
        <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.35} metalness={0.4} roughness={0.3} />
      </mesh>
      {/* Sidepods */}
      <mesh position={[-0.1, 0.36, 0.6]} castShadow>
        <boxGeometry args={[1.6, 0.22, 0.35]} />
        <meshStandardMaterial color={CARBON} roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[-0.1, 0.36, -0.6]} castShadow>
        <boxGeometry args={[1.6, 0.22, 0.35]} />
        <meshStandardMaterial color={CARBON} roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Halo */}
      <mesh position={[0.3, 0.7, 0]}>
        <torusGeometry args={[0.34, 0.03, 12, 24, Math.PI]} />
        <meshStandardMaterial color={CHROME} metalness={0.9} roughness={0.25} />
      </mesh>
      {/* Airbox */}
      <mesh position={[-0.4, 0.72, 0]} castShadow>
        <boxGeometry args={[0.5, 0.28, 0.35]} />
        <meshStandardMaterial color={CARBON} roughness={0.35} metalness={0.6} />
      </mesh>
      {/* Rear wing */}
      <group position={[-1.65, 0.6, 0]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.06, 0.04, 1.1]} />
          <meshStandardMaterial color={CARBON} metalness={0.5} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.28, 0.55]} castShadow>
          <boxGeometry args={[0.06, 0.5, 0.04]} />
          <meshStandardMaterial color={CARBON} />
        </mesh>
        <mesh position={[0, 0.28, -0.55]} castShadow>
          <boxGeometry args={[0.06, 0.5, 0.04]} />
          <meshStandardMaterial color={CARBON} />
        </mesh>
        <mesh position={[0, 0.36, 0]}>
          <boxGeometry args={[0.06, 0.02, 1.12]} />
          <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.3} />
        </mesh>
      </group>
      {/* Front wing */}
      <group position={[2.2, 0.24, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.16, 0.04, 1.4]} />
          <meshStandardMaterial color={CARBON} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.16, 0.02, 1.42]} />
          <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.3} />
        </mesh>
      </group>
      {/* Tyres */}
      <Tyre x={1.4} z={0.75} />
      <Tyre x={1.4} z={-0.75} />
      <Tyre x={-1.2} z={0.85} />
      <Tyre x={-1.2} z={-0.85} />
    </group>
  );
}

function CarHotspotMarker({ h, onClick, active }: { h: Hotspot; onClick: () => void; active: boolean }) {
  // Map 2D hotspot coords to a 3D position around the car (top view)
  const pos: [number, number, number] = [
    (50 - h.x) / 25,   // x (front-back)
    0.9,
    (h.y - 50) / 40,   // z (side-side)
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
        camera={{ position: [4, 3, 4.5], fov: 40 }}
      >
        <color attach="background" args={["#0a0a0b"]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 6, 4]} intensity={1.2} castShadow />
        <spotLight position={[-4, 5, -2]} intensity={0.6} color={RED} />
        <Suspense fallback={null}>
          <F1Car spinning={spin} />
          <ContactShadows position={[0, 0.02, 0]} opacity={0.55} scale={12} blur={2.4} far={6} />
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
          minDistance={4}
          maxDistance={12}
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
