export const RECENT_RESULTS = [
  { gp: "Bahrain",   date: "Mar 02", nico: "P6",  matteo: "P9",  points: 14 },
  { gp: "Saudi Arabia", date: "Mar 09", nico: "P4",  matteo: "P11", points: 12 },
  { gp: "Australia", date: "Mar 23", nico: "P3",  matteo: "P7",  points: 21 },
  { gp: "Japan",     date: "Apr 06", nico: "P5",  matteo: "P8",  points: 14 },
  { gp: "China",     date: "Apr 20", nico: "P2",  matteo: "P6",  points: 26 },
  { gp: "Miami",     date: "May 04", nico: "P4",  matteo: "P10", points: 13 },
  { gp: "Imola",     date: "May 18", nico: "P3",  matteo: "P5",  points: 25 },
  { gp: "Monaco",    date: "May 25", nico: "P6",  matteo: "P4",  points: 20 },
];

export const POINTS_EVOLUTION = RECENT_RESULTS.reduce<
  { round: string; total: number }[]
>((acc, r, i) => {
  const prev = acc[i - 1]?.total ?? 0;
  acc.push({ round: r.gp, total: prev + r.points });
  return acc;
}, []);

export const DRIVER_STANDINGS = [
  { pos: 1, name: "M. Verstappen", team: "Red Bull",   pts: 178 },
  { pos: 2, name: "L. Norris",     team: "McLaren",    pts: 156 },
  { pos: 3, name: "C. Leclerc",    team: "Ferrari",    pts: 141 },
  { pos: 4, name: "N. Hülkenberg", team: "Audi F1",    pts: 118 },
  { pos: 5, name: "G. Russell",    team: "Mercedes",   pts: 112 },
  { pos: 6, name: "O. Piastri",    team: "McLaren",    pts: 104 },
  { pos: 9, name: "G. Bortoleto",  team: "Audi F1",    pts: 67 },
];

export const CONSTRUCTOR_STANDINGS = [
  { pos: 1, name: "Red Bull",  pts: 289 },
  { pos: 2, name: "McLaren",   pts: 260 },
  { pos: 3, name: "Ferrari",   pts: 241 },
  { pos: 4, name: "Audi F1",   pts: 185 },
  { pos: 5, name: "Mercedes",  pts: 174 },
];

export const CALENDAR = [
  { round: 9,  gp: "Canada",       date: "Jun 08", flag: "🇨🇦" },
  { round: 10, gp: "Spain",        date: "Jun 22", flag: "🇪🇸" },
  { round: 11, gp: "Austria",      date: "Jul 06", flag: "🇦🇹" },
  { round: 12, gp: "Britain",      date: "Jul 20", flag: "🇬🇧" },
  { round: 13, gp: "Hungary",      date: "Aug 03", flag: "🇭🇺" },
  { round: 14, gp: "Belgium",      date: "Aug 31", flag: "🇧🇪" },
  { round: 15, gp: "Netherlands",  date: "Sep 07", flag: "🇳🇱" },
  { round: 16, gp: "Italy",        date: "Sep 14", flag: "🇮🇹" },
  { round: 17, gp: "Singapore",    date: "Oct 05", flag: "🇸🇬" },
  { round: 18, gp: "USA",          date: "Oct 26", flag: "🇺🇸" },
];
