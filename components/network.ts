/* ==================================================================
   The live route network — single source of truth.
   Every route pairs a city with Mundra, so the site draws them radiating
   from Mundra rather than as a list that repeats "Mundra" eight times.
   Mundra is the common point of the routes, not an operating hub.
   ================================================================== */

export const LAUNCH = {
  iso: "2026-08-28",
  full: "28 August 2026",
  short: "28 Aug 2026",
};

export type Place = {
  city: string;
  region: string;
  lon: number;
  lat: number;
  /** seconds the aircraft waits on the ground before flying the leg again */
  rest: number;
  /**
   * How far the flight arc bows off the straight line. Mundra, Jamnagar and
   * Rajkot sit almost in a row, so a Rajkot leg with little or the wrong bend
   * passes straight over the Jamnagar pin and reads as routing via Jamnagar.
   * These values are chosen to keep every leg at least 26 units clear of any
   * pin it does not serve, and 24 apart from the other legs.
   */
  bow: number;
  /** where the map label sits relative to its pin */
  label: "left" | "right" | "above" | "below";
};

export const MUNDRA: Place = {
  city: "Mundra",
  region: "Kutch",
  lon: 69.72,
  lat: 22.84,
  bow: 0,
  rest: 0,
  label: "above",
};

export const SPOKES: Place[] = [
  {
    city: "Jamnagar",
    region: "Saurashtra",
    lon: 70.07,
    lat: 22.47,
    bow: 0.18,
    rest: 2.4,
    label: "left",
  },
  {
    city: "Rajkot",
    region: "Saurashtra",
    lon: 70.8,
    lat: 22.3,
    bow: -0.22,
    rest: 3.3,
    label: "right",
  },
  {
    city: "Vadodara",
    region: "Central Gujarat",
    lon: 73.18,
    lat: 22.31,
    bow: -0.22,
    rest: 5.2,
    label: "right",
  },
  {
    city: "Diu",
    region: "Union Territory",
    lon: 70.98,
    lat: 20.71,
    bow: 0.26,
    rest: 3.35,
    label: "below",
  },
];

/** Everywhere you can fly to or from — used by the booking bar.
    City only: the region suffix overflowed the field and read as truncation. */
export const AIRPORTS = [MUNDRA, ...SPOKES].map((a) => a.city);

/* ------------------------------------------------------------------ */
/* Map projection                                                      */
/* ------------------------------------------------------------------ */

export const MAP = { w: 620, h: 490 };

/* equirectangular, with lon squeezed to keep the shape honest at 22°N */
const LON0 = 68.0;
const LAT0 = 24.9;
const SX = 88.4;
const SY = 95;
const PAD_X = 14;
const PAD_Y = 12;

export const project = (lon: number, lat: number): [number, number] => [
  (lon - LON0) * SX + PAD_X,
  (LAT0 - lat) * SY + PAD_Y,
];

/**
 * Gujarat state boundary. Derived from the 2011 census district polygons
 * (udit-001/india-maps-data) by dropping every edge shared by two districts,
 * then Douglas-Peucker simplified to ~150 points for a clean stylised coast.
 */
const OUTLINE: [number, number][] = [
  [73.407, 20.624],
  [73.493, 20.536],
  [73.379, 20.390],
  [73.417, 20.198],
  [73.299, 20.209],
  [73.249, 20.123],
  [73.188, 20.128],
  [73.218, 20.186],
  [73.169, 20.208],
  [73.065, 20.159],
  [73.060, 20.223],
  [73.167, 20.289],
  [73.101, 20.303],
  [73.097, 20.361],
  [73.035, 20.291],
  [72.912, 20.274],
  [72.963, 20.209],
  [72.859, 20.225],
  [72.824, 20.142],
  [72.738, 20.128],
  [72.777, 20.337],
  [72.897, 20.380],
  [72.855, 20.468],
  [72.904, 20.576],
  [72.757, 20.932],
  [72.750, 21.062],
  [72.621, 21.099],
  [72.657, 21.225],
  [72.598, 21.317],
  [72.735, 21.475],
  [72.651, 21.453],
  [72.737, 21.539],
  [72.635, 21.535],
  [72.611, 21.581],
  [72.807, 21.658],
  [72.528, 21.678],
  [72.667, 21.955],
  [72.570, 21.883],
  [72.515, 21.885],
  [72.509, 21.944],
  [72.567, 22.182],
  [72.868, 22.214],
  [72.928, 22.312],
  [72.911, 22.267],
  [72.756, 22.232],
  [72.737, 22.275],
  [72.516, 22.321],
  [72.427, 22.209],
  [72.419, 22.300],
  [72.376, 22.315],
  [72.323, 22.144],
  [72.225, 22.058],
  [72.204, 21.891],
  [72.242, 21.824],
  [72.162, 21.808],
  [72.309, 21.625],
  [72.108, 21.303],
  [72.112, 21.199],
  [72.010, 21.135],
  [72.009, 21.186],
  [71.975, 21.123],
  [71.823, 21.097],
  [71.805, 21.040],
  [71.752, 21.059],
  [71.782, 21.032],
  [71.529, 20.943],
  [71.557, 20.970],
  [71.437, 20.869],
  [71.080, 20.738],
  [70.813, 20.719],
  [70.839, 20.691],
  [70.448, 20.848],
  [70.091, 21.115],
  [69.722, 21.539],
  [69.372, 21.829],
  [69.396, 21.888],
  [69.372, 21.830],
  [69.217, 21.958],
  [68.936, 22.311],
  [69.069, 22.478],
  [69.035, 22.390],
  [69.110, 22.410],
  [69.121, 22.375],
  [69.195, 22.422],
  [69.148, 22.195],
  [69.333, 22.328],
  [69.655, 22.359],
  [69.737, 22.485],
  [69.782, 22.415],
  [69.805, 22.465],
  [69.914, 22.451],
  [69.890, 22.495],
  [69.971, 22.500],
  [69.976, 22.543],
  [70.126, 22.553],
  [70.375, 22.907],
  [70.427, 22.904],
  [70.404, 22.816],
  [70.466, 22.845],
  [70.497, 22.934],
  [70.432, 22.967],
  [70.541, 22.960],
  [70.561, 23.029],
  [70.689, 23.117],
  [70.712, 23.214],
  [70.505, 23.177],
  [70.312, 23.215],
  [70.108, 22.978],
  [70.036, 22.953],
  [70.080, 22.920],
  [69.682, 22.800],
  [69.417, 22.811],
  [69.472, 22.774],
  [69.196, 22.838],
  [68.632, 23.170],
  [68.582, 23.239],
  [68.635, 23.301],
  [68.540, 23.248],
  [68.544, 23.301],
  [68.621, 23.328],
  [68.559, 23.338],
  [68.581, 23.371],
  [68.459, 23.367],
  [68.450, 23.437],
  [68.400, 23.420],
  [68.480, 23.518],
  [68.326, 23.496],
  [68.299, 23.593],
  [68.119, 23.616],
  [68.101, 23.678],
  [68.172, 23.696],
  [68.209, 23.875],
  [68.379, 23.984],
  [68.753, 23.971],
  [68.765, 24.296],
  [68.808, 24.314],
  [68.865, 24.213],
  [68.945, 24.303],
  [69.003, 24.223],
  [69.095, 24.274],
  [69.194, 24.236],
  [69.594, 24.293],
  [69.731, 24.171],
  [70.025, 24.171],
  [70.110, 24.295],
  [70.573, 24.422],
  [70.571, 24.252],
  [70.806, 24.221],
  [70.907, 24.259],
  [70.874, 24.295],
  [70.947, 24.348],
  [71.122, 24.406],
  [70.998, 24.444],
  [70.987, 24.543],
  [71.009, 24.636],
  [71.097, 24.690],
  [71.288, 24.616],
  [71.478, 24.680],
  [71.655, 24.639],
  [71.792, 24.677],
  [71.852, 24.609],
  [71.872, 24.682],
  [71.940, 24.634],
  [72.058, 24.712],
  [72.165, 24.621],
  [72.347, 24.629],
  [72.246, 24.585],
  [72.441, 24.515],
  [72.457, 24.415],
  [72.500, 24.417],
  [72.539, 24.519],
  [72.683, 24.464],
  [72.725, 24.367],
  [72.911, 24.337],
  [72.977, 24.378],
  [72.950, 24.399],
  [72.993, 24.480],
  [73.086, 24.499],
  [73.077, 24.396],
  [73.219, 24.364],
  [73.067, 24.195],
  [73.243, 24.002],
  [73.362, 24.105],
  [73.421, 23.927],
  [73.352, 23.791],
  [73.508, 23.703],
  [73.523, 23.607],
  [73.573, 23.654],
  [73.656, 23.621],
  [73.621, 23.435],
  [73.692, 23.458],
  [73.721, 23.410],
  [73.829, 23.447],
  [73.892, 23.334],
  [73.959, 23.381],
  [73.985, 23.310],
  [74.092, 23.298],
  [74.139, 23.266],
  [74.123, 23.185],
  [74.269, 23.164],
  [74.364, 22.981],
  [74.340, 22.953],
  [74.393, 22.897],
  [74.447, 22.921],
  [74.476, 22.852],
  [74.379, 22.634],
  [74.264, 22.644],
  [74.151, 22.521],
  [74.041, 22.542],
  [74.034, 22.490],
  [74.083, 22.506],
  [74.120, 22.419],
  [74.191, 22.476],
  [74.291, 22.394],
  [74.190, 22.320],
  [74.065, 22.355],
  [74.072, 22.219],
  [74.123, 22.212],
  [74.124, 22.098],
  [74.179, 22.085],
  [74.092, 22.015],
  [74.147, 21.948],
  [73.796, 21.824],
  [73.895, 21.676],
  [73.780, 21.628],
  [73.852, 21.498],
  [74.165, 21.569],
  [74.195, 21.532],
  [74.300, 21.568],
  [74.321, 21.498],
  [74.063, 21.475],
  [74.045, 21.419],
  [73.939, 21.405],
  [73.942, 21.299],
  [73.823, 21.271],
  [73.816, 21.174],
  [73.719, 21.140],
  [73.577, 21.171],
  [73.618, 21.118],
  [73.808, 21.085],
  [73.807, 21.009],
  [73.901, 20.982],
  [73.942, 20.742],
  [73.812, 20.692],
  [73.838, 20.620],
  [73.652, 20.564],
  [73.599, 20.637],
  [73.496, 20.654],
  [73.467, 20.736],
  [73.407, 20.624],
];

/** The boundary as an SVG path. Real coastline, so no smoothing needed. */
export const GUJARAT_PATH = (() => {
  const f = (v: number) => v.toFixed(1);
  return (
    OUTLINE.map(([lon, lat], i) => {
      const [x, y] = project(lon, lat);
      return `${i ? "L" : "M"} ${f(x)} ${f(y)}`;
    }).join(" ") + " Z"
  );
})();

/** Top-down aircraft silhouette, nose pointing +X, centred on the origin. */
export const PLANE_PATH =
  "M 12 0 L 3 -1.7 L -3.5 -8 L -6.5 -8 L -5 -1.7 L -9.5 -1.7 L -11.5 -4.6 " +
  "L -13 -4.6 L -12.2 0 L -13 4.6 L -11.5 4.6 L -9.5 1.7 L -5 1.7 L -6.5 8 " +
  "L -3.5 8 L 3 1.7 Z";

const f2 = (v: number) => v.toFixed(1);

/** Control point of the bowed leg from Mundra out to `to`. */
function legPoints(to: Place) {
  const [ax, ay] = project(MUNDRA.lon, MUNDRA.lat);
  const [bx, by] = project(to.lon, to.lat);
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy);
  // push the control point perpendicular to the chord so the legs fan out
  return {
    ax,
    ay,
    bx,
    by,
    cx: (ax + bx) / 2 + (-dy / len) * len * to.bow,
    cy: (ay + by) / 2 + (dx / len) * len * to.bow,
  };
}

/** Bowed flight path from Mundra out to a destination. */
export function arc(to: Place): string {
  const { ax, ay, bx, by, cx, cy } = legPoints(to);
  return `M ${f2(ax)} ${f2(ay)} Q ${f2(cx)} ${f2(cy)} ${f2(bx)} ${f2(by)}`;
}

/** Sampled length of the quadratic, so flight time can follow distance. */
function arcLength(to: Place) {
  const { ax, ay, bx, by, cx, cy } = legPoints(to);
  let len = 0;
  let px = ax;
  let py = ay;
  for (let i = 1; i <= 48; i++) {
    const t = i / 48;
    const u = 1 - t;
    const x = u * u * ax + 2 * u * t * cx + t * t * bx;
    const y = u * u * ay + 2 * u * t * cy + t * t * by;
    len += Math.hypot(x - px, y - py);
    px = x;
    py = y;
  }
  return len;
}

/** The same bowed leg, flown the other way: destination back to Mundra. */
export function arcBack(to: Place): string {
  const { ax, ay, bx, by, cx, cy } = legPoints(to);
  // reversing the path rather than running the motion backwards keeps
  // rotate="auto" pointing the nose the right way in every browser
  return `M ${f2(bx)} ${f2(by)} Q ${f2(cx)} ${f2(cy)} ${f2(ax)} ${f2(ay)}`;
}

type Leg = {
  key: string;
  d: string;
  dur: string;
  begin: string;
  keyTimes: string;
  keySplines: string;
  trailTimes: string;
  trailSplines: string;
  fadeTimes: string;
};

const t3 = (v: number) => v.toFixed(3);

/**
 * Both directions of a route share one cycle, and the return only leaves once
 * the outbound has landed and sat on the ground a while. Sequencing them on a
 * single timeline is what guarantees the two aircraft are never airborne at
 * the same time — otherwise they meet head-on halfway down the leg.
 *
 * Within its cycle each aircraft waits at the start of its path, flies, then
 * holds at the far end until the cycle comes round again. The trail does not
 * fade on arrival — it is drawn to the landing point and then reeled in, the
 * tail catching up to the nose until the whole thing is swallowed by the
 * destination.
 */
export const FLIGHTS: Leg[] = SPOKES.flatMap((to, i) => {
  const flight = 1.6 + arcLength(to) / 70;
  const holdAway = to.rest; // parked at the destination
  const holdHome = to.rest * 0.8 + 1.2; // parked back at Mundra
  const cycle = flight * 2 + holdAway + holdHome;
  const dur = `${cycle.toFixed(2)}s`;
  // offset whole routes against each other so they do not all launch together
  const begin = `${(-i * 3.1).toFixed(2)}s`;

  const mk = (key: string, d: string, startAt: number): Leg => {
    const s = startAt / cycle; // takes off
    const e = (startAt + flight) / cycle; // lands
    const r = Math.min(1, e + 0.09); // trail fully reeled in by here
    return {
      key,
      d,
      dur,
      begin,
      // wait at the stand, fly, then hold at the far end
      keyTimes: `0;${t3(s)};${t3(e)};1`,
      keySplines: "0 0 1 1;0.42 0 0.58 1;0 0 1 1",
      // stand, draw out behind the aircraft, then reel in, then hold
      trailTimes: `0;${t3(s)};${t3(e)};${t3(r)};1`,
      trailSplines: "0 0 1 1;0.42 0 0.58 1;0.32 0 0.2 1;0 0 1 1",
      // the aircraft holds on the ground while its trail is drawn in
      fadeTimes: `0;${t3(s)};${t3(Math.min(s + 0.02, e))};${t3(e)};${t3(r)};1`,
    };
  };

  return [
    mk(`${to.city}-out`, arc(to), 0),
    mk(`${to.city}-back`, arcBack(to), flight + holdAway),
  ];
});


