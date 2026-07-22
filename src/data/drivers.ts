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
    slug: "nico-hulkenberg",
    name: "Nico Hülkenberg",
    number: 27,
    nationality: "Germany",
    flag: "🇩🇪",
    age: 38,
    born: "1987-08-19",
    hometown: "Emmerich am Rhein, Germany",
    wins: 0,
    poles: 1,
    podiums: 0,
    championships: 0,
    bio: "A veteran with immense speed and technical feedback, Nico 'The Hulk' Hülkenberg leads Audi's entry into Formula 1. With over 200 race starts, his experience is vital in developing the team's first F1 car and power unit.",
    anecdote:
      "Known for his incredible qualifying speed, Nico famously took pole position at Interlagos in his rookie season, showcasing his raw pace in challenging conditions.",
    photo: driver1,
    stats: [
      { label: "Experience", value: 98, max: 100 },
      { label: "Pace", value: 94, max: 100 },
      { label: "Racecraft", value: 92, max: 100 },
      { label: "Technical Feedback", value: 97, max: 100 },
    ],
  },
  {
    slug: "gabriel-bortoleto",
    name: "Gabriel Bortoleto",
    number: 5,
    nationality: "Brazil",
    flag: "🇧🇷",
    age: 21,
    born: "2004-10-14",
    hometown: "São Paulo, Brazil",
    wins: 0,
    poles: 0,
    podiums: 0,
    championships: 1,
    bio: "The 2023 FIA Formula 3 Champion, Gabriel Bortoleto is one of motorsport's brightest young talents. His rapid ascent through the junior categories and composed driving style earned him the seat alongside Hülkenberg for Audi's debut.",
    anecdote:
      "Gabriel made history by winning the F3 title in his debut season, a feat that immediately put him on the radar of every top-tier F1 team.",
    photo: driver2,
    stats: [
      { label: "Potential", value: 96, max: 100 },
      { label: "Pace", value: 92, max: 100 },
      { label: "Consistency", value: 90, max: 100 },
      { label: "Adaptability", value: 94, max: 100 },
    ],
  },
];
