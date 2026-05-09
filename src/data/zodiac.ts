type RawConstellation = {
  anchor: { x: number; y: number };
  connections: Array<[number, number]>;
  id: "gemini" | "leo" | "taurus";
  scale: { x: number; y: number };
  stars: Array<{
    brightness: number;
    x: number;
    y: number;
  }>;
};

// The IAU standardizes constellation boundaries, not stick-figure line art.
// These simplified zodiac figures are inferred from public star maps for Taurus, Gemini, and Leo.
export const ZODIAC_CONSTELLATIONS: Record<string, RawConstellation> = {
  gemini: {
    anchor: { x: 0.42, y: 0.12 },
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [4, 8],
      [8, 9],
    ],
    id: "gemini",
    scale: { x: 0.28, y: 0.36 },
    stars: [
      { brightness: 0.95, x: 0.1, y: 0.04 },
      { brightness: 0.88, x: 0.28, y: 0.08 },
      { brightness: 0.8, x: 0.24, y: 0.22 },
      { brightness: 0.74, x: 0.2, y: 0.42 },
      { brightness: 0.9, x: 0.48, y: 0.1 },
      { brightness: 0.84, x: 0.5, y: 0.26 },
      { brightness: 0.78, x: 0.5, y: 0.45 },
      { brightness: 0.72, x: 0.5, y: 0.64 },
      { brightness: 0.76, x: 0.68, y: 0.26 },
      { brightness: 0.72, x: 0.78, y: 0.46 },
    ],
  },
  leo: {
    anchor: { x: 0.67, y: 0.48 },
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
    ],
    id: "leo",
    scale: { x: 0.24, y: 0.24 },
    stars: [
      { brightness: 1, x: 0.12, y: 0.04 },
      { brightness: 0.86, x: 0.24, y: 0.1 },
      { brightness: 0.8, x: 0.34, y: 0.22 },
      { brightness: 0.76, x: 0.28, y: 0.38 },
      { brightness: 0.82, x: 0.46, y: 0.46 },
      { brightness: 0.8, x: 0.62, y: 0.42 },
      { brightness: 0.76, x: 0.72, y: 0.24 },
      { brightness: 0.72, x: 0.56, y: 0.08 },
      { brightness: 0.7, x: 0.34, y: 0.02 },
    ],
  },
  taurus: {
    anchor: { x: 0.12, y: 0.14 },
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 4],
      [4, 5],
      [2, 6],
      [6, 7],
    ],
    id: "taurus",
    scale: { x: 0.26, y: 0.26 },
    stars: [
      { brightness: 1, x: 0.32, y: 0.34 },
      { brightness: 0.88, x: 0.22, y: 0.22 },
      { brightness: 0.84, x: 0.44, y: 0.18 },
      { brightness: 0.76, x: 0.54, y: 0.28 },
      { brightness: 0.8, x: 0.1, y: 0.08 },
      { brightness: 0.72, x: 0.02, y: 0.02 },
      { brightness: 0.82, x: 0.58, y: 0.06 },
      { brightness: 0.76, x: 0.72, y: 0.02 },
    ],
  },
};
