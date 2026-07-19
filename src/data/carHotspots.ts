export type Hotspot = {
  id: string;
  name: string;
  x: number; // 0-100 (% within scene)
  y: number;
  description: string;
  spec: string;
};

export const HOTSPOTS: Hotspot[] = [
  { id: "front-wing", name: "Front Wing", x: 12, y: 62,
    description: "Multi-element carbon front wing directs airflow around the front tyres and feeds the underfloor.",
    spec: "5 elements · 1800 mm span · 12 kg" },
  { id: "halo", name: "Halo", x: 48, y: 30,
    description: "Titanium safety structure withstands the equivalent of a London bus resting on it.",
    spec: "Grade-5 titanium · 7 kg · 12 t static load" },
  { id: "sidepod", name: "Sidepods", x: 55, y: 55,
    description: "Radiators, ERS cooling and aerodynamic bodywork sculpted to reject 220 kW of heat.",
    spec: "Twin water + oil coolers · 220 kW rejection" },
  { id: "rear-wing", name: "Rear Wing", x: 90, y: 32,
    description: "Two-element wing with DRS actuator — 22% drag reduction when open on the straights.",
    spec: "DRS gap 85 mm · CFD-optimised endplates" },
  { id: "suspension", name: "Suspension", x: 30, y: 70,
    description: "Pushrod front, pullrod rear. Inboard torsion bars and heave dampers for anti-dive geometry.",
    spec: "Carbon wishbones · titanium uprights" },
  { id: "tires", name: "Tyres", x: 78, y: 72,
    description: "Pirelli 18-inch slicks. Operating window 90–110 °C for optimum grip.",
    spec: "18\" rims · 305/720 rear · 305/720" },
  { id: "floor", name: "Floor", x: 45, y: 82,
    description: "The single biggest downforce producer on the car — ground-effect tunnels generate 60% of load.",
    spec: "Full-length venturi · Ti-alloy skid blocks" },
];
