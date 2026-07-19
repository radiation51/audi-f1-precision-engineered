export type EnginePart = {
  id: string;
  name: string;
  color: string;
  description: string;
  specs: { label: string; value: string }[];
  function: string;
};

export const ENGINE_PARTS: EnginePart[] = [
  { id: "ice", name: "Internal Combustion Engine", color: "#e5e5e5",
    description: "1.6L V6 turbo-hybrid running on 100% sustainable fuel at up to 15,000 rpm.",
    specs: [
      { label: "Displacement", value: "1600 cc" },
      { label: "Configuration", value: "V6, 90°" },
      { label: "Max RPM", value: "15,000" },
      { label: "Fuel", value: "E-fuel, sustainable" },
    ],
    function: "Primary power source. Converts chemical energy into rotational torque." },
  { id: "turbo", name: "Turbocharger", color: "#c94a3a",
    description: "Single turbo mounted between the cylinder banks, spooled by MGU-H to eliminate lag.",
    specs: [
      { label: "Compressor speed", value: "125,000 rpm" },
      { label: "Boost pressure", value: "5.0 bar abs" },
    ],
    function: "Compresses intake air to raise ICE efficiency and power density." },
  { id: "mguh", name: "MGU-H", color: "#ffd166",
    description: "Motor Generator Unit — Heat. Recovers energy from exhaust gases via the turbine shaft.",
    specs: [
      { label: "Recovery", value: "Unlimited" },
      { label: "Efficiency", value: "> 90%" },
    ],
    function: "Harvests exhaust energy and manages turbo speed for instant throttle response." },
  { id: "mguk", name: "MGU-K", color: "#ffb020",
    description: "Motor Generator Unit — Kinetic. Recovers braking energy and returns 120 kW to the driveline.",
    specs: [
      { label: "Power", value: "120 kW / 161 hp" },
      { label: "Deploy limit", value: "4 MJ / lap" },
    ],
    function: "Regenerative braking and hybrid boost on corner exit." },
  { id: "battery", name: "Battery Pack", color: "#4ea3ff",
    description: "High-density ES lithium cells packaged low in the chassis for weight distribution.",
    specs: [
      { label: "Capacity", value: "4 MJ usable" },
      { label: "Mass", value: "20–25 kg" },
    ],
    function: "Stores recovered energy for hybrid deployment." },
  { id: "ers", name: "Energy Recovery System", color: "#38bdf8",
    description: "Full ERS package tying MGU-H, MGU-K and battery through a single control unit.",
    specs: [
      { label: "Total power", value: "+160 hp hybrid" },
      { label: "Recovery zones", value: "Every lap" },
    ],
    function: "Coordinates hybrid deployment and recovery under FIA rules." },
  { id: "cooling", name: "Cooling System", color: "#22c55e",
    description: "Twin water radiators, oil cooler and ERS chiller integrated into the sidepods.",
    specs: [
      { label: "Rejection", value: "220 kW" },
      { label: "Coolant", value: "Water/glycol 50:50" },
    ],
    function: "Keeps ICE, battery and MGUs within their operating window." },
  { id: "gearbox", name: "Gearbox", color: "#a3a3a3",
    description: "8-speed seamless-shift transmission in a carbon-titanium casing.",
    specs: [
      { label: "Gears", value: "8 fwd + reverse" },
      { label: "Shift time", value: "< 40 ms" },
    ],
    function: "Transmits combined ICE + MGU-K torque to the rear wheels." },
];
