import { Suspense, useMemo, useRef, useState, type ReactElement } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Html, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { ENGINE_PARTS, type EnginePart } from "@/data/engineParts";

type Vec3 = [number, number, number];

type Placed = {
  part: EnginePart;
  origin: Vec3;
  dir: Vec3; // explode direction
};

const P = (id: string) => ENGINE_PARTS.find((p) => p.id === id)!;

const LAYOUT: Placed[] = [
  { part: P("ice"),      origin: [0, 0, 0],        dir: [0, 0, 0] },
  { part: P("turbo"),    origin: [1.05, 0.15, 0],  dir: [1.3, 0.15, 0] },
  { part: P("mguh"),     origin: [0.62, 0.5, 0],   dir: [0.9, 1.1, 0] },
  { part: P("mguk"),     origin: [-0.95, -0.1, 0], dir: [-1.4, -0.1, 0] },
  { part: P("battery"),  origin: [0, -0.78, 0],    dir: [0, -1.3, 0] },
  { part: P("ers"),      origin: [0, 0.72, 0],     dir: [0, 1.25, 0] },
  { part: P("cooling"),  origin: [0, 0.05, 0.85],  dir: [0, 0.1, 1.4] },
  { part: P("gearbox"),  origin: [-1.5, -0.05, 0], dir: [-2.2, -0.1, 0] },
];

function mat(color: string, selected: boolean, opts?: { metalness?: number; roughness?: number }) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={opts?.metalness ?? 0.85}
      roughness={opts?.roughness ?? 0.3}
      emissive={selected ? color : "#000000"}
      emissiveIntensity={selected ? 0.45 : 0}
    />
  );
}

/* ---------------- Individual detailed component geometries ---------------- */

function ICE({ selected }: { selected: boolean }) {
  const c = P("ice").color;
  const banks: Vec3[] = [
    [0, 0.3, 0.26],
    [0, 0.3, -0.26],
  ];
  return (
    <group>
      {/* crankcase / block */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.25, 0.5, 0.8]} />
        {mat(c, selected, { metalness: 0.8, roughness: 0.35 })}
      </mesh>
      {/* sump */}
      <mesh position={[0, -0.34, 0]} castShadow>
        <boxGeometry args={[1.05, 0.2, 0.6]} />
        {mat("#5c5c60", selected, { roughness: 0.5 })}
      </mesh>
      {/* V6 cylinder banks */}
      {banks.map((p, bi) => (
        <group key={bi} position={p} rotation={[bi === 0 ? 0.42 : -0.42, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.15, 0.42, 0.34]} />
            {mat(c, selected)}
          </mesh>
          {/* cam cover */}
          <mesh position={[0, 0.27, 0]} castShadow>
            <boxGeometry args={[1.05, 0.12, 0.3]} />
            {mat("#b8241f", selected, { roughness: 0.4 })}
          </mesh>
          {/* 3 cylinders per bank */}
          {[-0.36, 0, 0.36].map((x) => (
            <mesh key={x} position={[x, 0.4, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.1, 0.16, 20]} />
              {mat("#8a8a90", selected, { roughness: 0.35 })}
            </mesh>
          ))}
        </group>
      ))}
      {/* intake plenum in the vee */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[0.8, 0.18, 0.22]} />
        {mat("#3a3a3f", selected, { roughness: 0.45 })}
      </mesh>
      {/* exhaust headers */}
      {[0.26, -0.26].map((z) =>
        [-0.34, 0, 0.34].map((x) => (
          <mesh key={`${z}${x}`} position={[x, 0.5, z * 1.9]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[0.12, 0.032, 10, 22, Math.PI]} />
            {mat("#c2603a", selected, { metalness: 0.95, roughness: 0.25 })}
          </mesh>
        )),
      )}
    </group>
  );
}

function Turbo({ selected }: { selected: boolean }) {
  const c = P("turbo").color;
  const spin = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.x += dt * 14;
  });
  return (
    <group rotation={[0, 0, 0]}>
      {/* compressor housing (snail) */}
      <group position={[0, 0, 0.24]}>
        <mesh castShadow>
          <torusGeometry args={[0.19, 0.11, 16, 32]} />
          {mat(c, selected, { metalness: 0.9, roughness: 0.25 })}
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <cylinderGeometry args={[0.1, 0.1, 0.14, 24]} />
          {mat("#2c2c30", selected)}
        </mesh>
      </group>
      {/* turbine housing */}
      <group position={[0, 0, -0.24]}>
        <mesh castShadow>
          <torusGeometry args={[0.19, 0.11, 16, 32]} />
          {mat("#8f3b2c", selected, { metalness: 0.95, roughness: 0.35 })}
        </mesh>
      </group>
      {/* center shaft + spinning wheel */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.075, 0.075, 0.5, 20]} />
        {mat("#6e6e74", selected)}
      </mesh>
      <group ref={spin} position={[0, 0, 0.3]}>
        {Array.from({ length: 9 }).map((_, i) => (
          <mesh key={i} rotation={[(i / 9) * Math.PI * 2, 0.5, 0]} castShadow>
            <boxGeometry args={[0.02, 0.17, 0.07]} />
            {mat("#d8d8dc", selected, { roughness: 0.15 })}
          </mesh>
        ))}
      </group>
      {/* wastegate pipe */}
      <mesh position={[0.16, 0.16, -0.24]} rotation={[0, 0, -0.6]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.3, 14]} />
        {mat("#c2603a", selected)}
      </mesh>
    </group>
  );
}

function MGUH({ selected }: { selected: boolean }) {
  const c = P("mguh").color;
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.17, 0.17, 0.42, 28]} />
        {mat(c, selected, { metalness: 0.7, roughness: 0.35 })}
      </mesh>
      {/* cooling fins */}
      {[-0.14, -0.05, 0.05, 0.14].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <torusGeometry args={[0.18, 0.014, 8, 28]} />
          {mat("#3d3d42", selected)}
        </mesh>
      ))}
      {/* end caps */}
      {[-0.23, 0.23].map((y) => (
        <mesh key={y} position={[0, y, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.06, 24]} />
          {mat("#2b2b30", selected)}
        </mesh>
      ))}
      {/* HV cable */}
      <mesh position={[0.1, -0.3, 0]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.026, 0.026, 0.3, 10]} />
        {mat("#ff8a00", selected, { metalness: 0.2, roughness: 0.7 })}
      </mesh>
    </group>
  );
}

function MGUK({ selected }: { selected: boolean }) {
  const c = P("mguk").color;
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.21, 0.21, 0.46, 30]} />
        {mat(c, selected, { metalness: 0.72, roughness: 0.34 })}
      </mesh>
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} rotation={[0, (i / 12) * Math.PI * 2, 0]} position={[0, 0, 0]}>
          <boxGeometry args={[0.44, 0.46, 0.02]} />
          {mat("#1f1f24", selected, { roughness: 0.6 })}
        </mesh>
      ))}
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.16, 20]} />
        {mat("#9a9aa0", selected)}
      </mesh>
      <mesh position={[-0.14, -0.3, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.028, 0.028, 0.32, 10]} />
        {mat("#ff8a00", selected, { metalness: 0.2, roughness: 0.7 })}
      </mesh>
    </group>
  );
}

function Battery({ selected }: { selected: boolean }) {
  const c = P("battery").color;
  const cells: Vec3[] = [];
  for (let x = -0.45; x <= 0.451; x += 0.18) for (let z = -0.2; z <= 0.201; z += 0.2) cells.push([x, 0.11, z]);
  return (
    <group>
      {/* casing */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.2, 0.66]} />
        {mat("#22262c", selected, { metalness: 0.6, roughness: 0.5 })}
      </mesh>
      {/* cell modules */}
      {cells.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <boxGeometry args={[0.15, 0.1, 0.16]} />
          {mat(c, selected, { metalness: 0.5, roughness: 0.3 })}
        </mesh>
      ))}
      {/* bus bar */}
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[1.0, 0.02, 0.05]} />
        {mat("#ff8a00", selected, { metalness: 0.4, roughness: 0.4 })}
      </mesh>
      {/* mounting rails */}
      {[-0.36, 0.36].map((z) => (
        <mesh key={z} position={[0, -0.12, z]}>
          <boxGeometry args={[1.24, 0.05, 0.06]} />
          {mat("#4a4a50", selected)}
        </mesh>
      ))}
    </group>
  );
}

function ERS({ selected }: { selected: boolean }) {
  const c = P("ers").color;
  return (
    <group>
      {/* control unit box */}
      <mesh castShadow>
        <boxGeometry args={[0.95, 0.16, 0.5]} />
        {mat("#1d2229", selected, { metalness: 0.5, roughness: 0.55 })}
      </mesh>
      {/* heat sink fins */}
      {Array.from({ length: 11 }).map((_, i) => (
        <mesh key={i} position={[-0.42 + i * 0.084, 0.13, 0]}>
          <boxGeometry args={[0.03, 0.1, 0.44]} />
          {mat(c, selected, { metalness: 0.8, roughness: 0.25 })}
        </mesh>
      ))}
      {/* connectors */}
      {[-0.3, 0, 0.3].map((x) => (
        <mesh key={x} position={[x, -0.1, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.1, 14]} />
          {mat("#ff8a00", selected, { metalness: 0.3, roughness: 0.6 })}
        </mesh>
      ))}
    </group>
  );
}

function Cooling({ selected }: { selected: boolean }) {
  const c = P("cooling").color;
  return (
    <group>
      {/* radiator core */}
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.5, 0.09]} />
        {mat("#191c20", selected, { metalness: 0.4, roughness: 0.8 })}
      </mesh>
      {/* fins */}
      {Array.from({ length: 16 }).map((_, i) => (
        <mesh key={i} position={[-0.42 + i * 0.056, 0, 0.05]}>
          <boxGeometry args={[0.02, 0.46, 0.015]} />
          {mat(c, selected, { metalness: 0.6, roughness: 0.4 })}
        </mesh>
      ))}
      {/* end tanks */}
      {[-0.47, 0.47].map((x) => (
        <mesh key={x} position={[x, 0, 0]} castShadow>
          <boxGeometry args={[0.07, 0.52, 0.11]} />
          {mat("#2f3338", selected)}
        </mesh>
      ))}
      {/* hoses */}
      {[0.2, -0.2].map((y) => (
        <mesh key={y} position={[-0.58, y, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.24, 14]} />
          {mat("#4ea3ff", selected, { metalness: 0.2, roughness: 0.7 })}
        </mesh>
      ))}
    </group>
  );
}

function Gearbox({ selected }: { selected: boolean }) {
  const c = P("gearbox").color;
  return (
    <group>
      {/* bell housing (tapered casing) */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.34, 0.2, 0.75, 8]} />
        {mat(c, selected, { metalness: 0.7, roughness: 0.4 })}
      </mesh>
      {/* gear stack visible on top */}
      {[-0.2, -0.06, 0.08, 0.22].map((x, i) => (
        <mesh key={x} position={[x, 0.3, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.13 - i * 0.015, 0.13 - i * 0.015, 0.09, 18]} />
          {mat("#8f9298", selected, { metalness: 0.95, roughness: 0.2 })}
        </mesh>
      ))}
      {/* output shafts / driveshafts */}
      {[0.4, -0.4].map((z) => (
        <mesh key={z} position={[-0.1, -0.08, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.35, 16]} />
          {mat("#6d7075", selected)}
        </mesh>
      ))}
      {/* rear crash structure mount */}
      <mesh position={[-0.45, 0, 0]} castShadow>
        <boxGeometry args={[0.12, 0.26, 0.26]} />
        {mat("#26282c", selected, { roughness: 0.6 })}
      </mesh>
    </group>
  );
}

const GEOMETRY: Record<string, (p: { selected: boolean }) => ReactElement> = {
  ice: ICE,
  turbo: Turbo,
  mguh: MGUH,
  mguk: MGUK,
  battery: Battery,
  ers: ERS,
  cooling: Cooling,
  gearbox: Gearbox,
};

/* ---------------- Scene plumbing ---------------- */

function PartNode({
  placed,
  explode,
  selected,
  onSelect,
}: {
  placed: Placed;
  explode: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const target = useMemo<Vec3>(
    () => [
      placed.origin[0] + placed.dir[0] * explode,
      placed.origin[1] + placed.dir[1] * explode,
      placed.origin[2] + placed.dir[2] * explode,
    ],
    [placed, explode],
  );

  useFrame(() => {
    if (ref.current) ref.current.position.lerp(new THREE.Vector3(...target), 0.12);
  });

  const Geo = GEOMETRY[placed.part.id];

  return (
    <group>
      <group
        ref={ref}
        position={placed.origin}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        {Geo ? <Geo selected={selected} /> : null}
      </group>
      {selected && (
        <Html position={target} center distanceFactor={7}>
          <div className="pointer-events-none whitespace-nowrap rounded bg-primary px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
            {placed.part.name}
          </div>
        </Html>
      )}
    </group>
  );
}

export default function EngineScene() {
  const [explode, setExplode] = useState(0.6);
  const [selected, setSelected] = useState<EnginePart | null>(ENGINE_PARTS[0]);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-carbon">
        <Canvas shadows dpr={[1, 1.75]} camera={{ position: [3.4, 2.2, 3.6], fov: 42 }}>
          <color attach="background" args={["#0a0a0b"]} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 6, 3]} intensity={1.3} castShadow />
          <spotLight position={[-4, 4, -3]} intensity={1.1} color={"#e30613"} />
          <pointLight position={[0, -2, 2]} intensity={0.5} color={"#4ea3ff"} />
          <Suspense fallback={null}>
            {LAYOUT.map((p) => (
              <PartNode
                key={p.part.id}
                placed={p}
                explode={explode}
                selected={selected?.id === p.part.id}
                onSelect={() => setSelected(p.part)}
              />
            ))}
            <ContactShadows position={[0, -1.6, 0]} opacity={0.5} scale={12} blur={2.6} far={6} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enablePan={false} minDistance={2.5} maxDistance={11} />
        </Canvas>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>◉ Hybrid Power Unit</span>
          <span>Click part · Explode →</span>
        </div>

        <div className="absolute inset-x-4 bottom-4 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Explode</span>
          <input
            type="range"
            min={0}
            max={1.6}
            step={0.02}
            value={explode}
            onChange={(e) => setExplode(parseFloat(e.target.value))}
            className="flex-1 accent-primary"
            aria-label="Explode power unit"
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
