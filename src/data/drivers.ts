import driver1Asset from "@/assets/F1_p_2026_9224_HUL-L-2.avif.asset.json";
import driver2Asset from "@/assets/F1_p_2026_9236_BOR-L-2.avif.asset.json";

const driver1 = driver1Asset.url;
const driver2 = driver2Asset.url;

export type Driver = {
  slug: string;
  name: string;
  number: number;
  nationality: string;
  flag: string;
  age: number;
  born: string;
  hometown: string;
  wins: number;
  poles: number;
  podiums: number;
  championships: number;
  bio: string;
  anecdote: string;
  photo: string;
  stats: { label: string; value: number; max: number }[];
};

export const DRIVERS: Driver[] = [
  {
    slug: "nico-hartmann",
    name: "Nico Hartmann",
    number: 7,
    nationality: "Germany",
    flag: "🇩🇪",
    age: 28,
    born: "1997-04-14",
    hometown: "Ingolstadt, Germany",
    wins: 4,
    poles: 6,
    podiums: 17,
    championships: 0,
    bio: "Raised in the shadow of the Audi factory in Ingolstadt, Nico climbed the karting ladder before dominating F3 and F2. He brings clinical precision, deep telemetry literacy, and a calm race-craft that earned him the team's #1 seat for the debut season.",
    anecdote:
      "At 12 he snuck into an Audi test day and asked an engineer how the DRS worked — the engineer, now his race performance chief, still keeps the notebook page Nico scribbled equations on.",
    photo: driver1,
    stats: [
      { label: "Pace", value: 96, max: 100 },
      { label: "Racecraft", value: 92, max: 100 },
      { label: "Consistency", value: 94, max: 100 },
      { label: "Wet weather", value: 89, max: 100 },
    ],
  },
  {
    slug: "matteo-reyes",
    name: "Matteo Reyes",
    number: 22,
    nationality: "Spain",
    flag: "🇪🇸",
    age: 24,
    born: "2001-08-02",
    hometown: "Barcelona, Spain",
    wins: 1,
    poles: 3,
    podiums: 8,
    championships: 0,
    bio: "A prodigy from the karting circuits of Catalonia, Matteo is the youngest race winner in the current F1 grid. Aggressive on the brakes, fearless on cold tyres, and armed with a communications style engineers describe as ‘relentlessly curious’.",
    anecdote:
      "Between practice sessions he sketches setup ideas on paper napkins — one of them, tested for laughs in the sim, became the base configuration for his first F2 pole.",
    photo: driver2,
    stats: [
      { label: "Pace", value: 94, max: 100 },
      { label: "Racecraft", value: 88, max: 100 },
      { label: "Consistency", value: 84, max: 100 },
      { label: "Wet weather", value: 91, max: 100 },
    ],
  },
];
