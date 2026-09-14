import Image from "next/image";
import planeSide from "@/public/plane-side.png";
import Reveal from "./Reveal";
import {
  FLIGHTS,
  GUJARAT_PATH,
  MUNDRA,
  MAP,
  PLANE_PATH,
  project,
  SPOKES,
} from "./network";
import { ButtonAnchor, ButtonLink, Eyebrow, EyebrowLine, Hl } from "./ui";

/* ================================================================== */
/* Features                                                            */
/* ================================================================== */

/* Drawn as paths rather than characters: the glyphs that were here before
   (⚡ ◎ ⛨ ◈) fell back to whatever each platform had, so the lightning bolt
   came out as a colour emoji while its neighbours stayed monochrome. */
const FEATURES = [
  {
    title: "Out and back in a day",
    body: "Every route is flown in both directions, so a morning meeting and the trip home fit inside the same day.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5.2l3.4 2" />
      </>
    ),
  },
  {
    title: "Regional airfields",
    body: "Land minutes from where you are actually going. Small strips the big carriers will never touch.",
    icon: (
      <>
        <path d="M12 21c4.4-4.2 6.6-7.4 6.6-10.4a6.6 6.6 0 1 0-13.2 0C5.4 13.6 7.6 16.8 12 21Z" />
        <circle cx="12" cy="10.4" r="2.5" />
      </>
    ),
  },
  {
    title: "Audited operators",
    body: "Every operator flying under our name is independently audited, and every leg is dual-pilot.",
    icon: (
      <>
        <path d="M12 3.2 19 6v5.4c0 4.2-2.9 7.8-7 9.4-4.1-1.6-7-5.2-7-9.4V6l7-2.8Z" />
        <path d="M8.9 12.1l2.3 2.3 4-4.2" />
      </>
    ),
  },
  {
    title: "Locked-in pricing",
    body: "The fare you see is the fare you pay. No fuel surcharges, no repositioning fees, no settlement surprises.",
    icon: (
      <>
        <rect x="4.6" y="10.4" width="14.8" height="9.6" rx="2.6" />
        <path d="M8.3 10.4V7.9a3.7 3.7 0 0 1 7.4 0v2.5" />
      </>
    ),
  },
];

export function Features() {
  return (
    <section id="how" className="relative py-18 max-md:py-12">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <Reveal className="mb-13">
          <Eyebrow>Why Aero Taxi</Eyebrow>
          <h2 className="text-[clamp(1.9rem,3.4vw,2.9rem)]">
            Regional flying without the
            <br />
            <Hl>regional flying hassle.</Hl>
          </h2>
        </Reveal>

        <div className="grid grid-cols-4 gap-4.5 max-xl:grid-cols-2 max-md:grid-cols-1">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-[18px] border border-hair bg-linear-[170deg,var(--color-panel),var(--color-ink-2)] px-6.5 py-7.5 transition-[transform,border-color] duration-350 hover:-translate-y-1.5 hover:border-accent/30">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(340px_200px_at_50%_-10%,rgb(58_160_238/0.14),transparent_70%)] opacity-0 transition-opacity duration-350 group-hover:opacity-100"
                />

                {/* the set index, ghosted into the corner */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-4 right-5 font-display text-[44px] leading-none font-extrabold tabular-nums text-head opacity-[0.045] transition-opacity duration-350 group-hover:opacity-[0.09]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* no container — the mark sits on the card and carries its own weight */}
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="relative mb-5 size-7 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {f.icon}
                </svg>

                {/* a rule that draws itself out under the mark on hover */}
                <span
                  aria-hidden
                  className="relative -mt-3 mb-3.5 block h-px w-7 origin-left scale-x-100 bg-accent/35 transition-transform duration-350 group-hover:scale-x-[2.6]"
                />

                <h3 className="relative mb-2.5 text-lg">{f.title}</h3>
                <p className="relative text-[14.5px] text-fog">{f.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Routes                                                              */
/* ================================================================== */

export function Routes() {
  return (
    <section id="routes" className="relative py-18 max-md:py-12">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <Reveal className="mb-12 max-w-[620px]">
          <Eyebrow>Our network</Eyebrow>
          <h2 className="mb-5 text-[clamp(1.9rem,3.4vw,2.9rem)]">
            Short hops across <Hl>Gujarat.</Hl>
          </h2>
          <p className="text-[16.5px] text-fog">
            Four regional connections, each one flying both ways. Pick the city
            you need &mdash; no terminals, no transfers, no long haul to a metro
            airport first.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <NetworkMap />
        </Reveal>

        <Reveal
          delay={0.2}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3.5"
        >
          <span className="text-[13.5px] text-fog">
            All four routes operate{" "}
            <strong className="text-head">in both directions</strong>
          </span>
          <span aria-hidden className="size-1 rounded-full bg-fog-2 max-sm:hidden" />
          <ButtonAnchor href="#book" size="sm">
            Check seats &amp; dates
          </ButtonAnchor>
        </Reveal>
      </div>
    </section>
  );
}

/* label offsets, in map units, per side */
const LABEL = {
  left: { dx: -15, dy: 5, anchor: "end" },
  right: { dx: 15, dy: 5, anchor: "start" },
  above: { dx: 0, dy: -17, anchor: "middle" },
  below: { dx: 0, dy: 28, anchor: "middle" },
} as const;

/** Gujarat, with an aircraft working each of the four live legs. */
function NetworkMap() {
  const places = [MUNDRA, ...SPOKES];

  return (
    <div className="relative mx-auto w-full max-w-[880px]">
      {/* ---------- map (md and up) ---------- */}
      <div className="relative max-md:hidden">
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(58_160_238/0.13),transparent_67%)] blur-[22px]"
        />
        <svg
          viewBox={`0 0 ${MAP.w} ${MAP.h}`}
          className="relative block h-auto w-full"
          role="img"
          aria-label="Map of Gujarat showing flights between Mundra and Jamnagar, Rajkot, Vadodara and Diu."
        >
          <defs>
            <linearGradient id="land" x1="0" y1="0" x2="0.35" y2="1">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {/* landmass */}
          <path
            d={GUJARAT_PATH}
            fill="url(#land)"
            stroke="var(--color-route)"
            strokeOpacity="0.4"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />

          {/* the four legs: a faint corridor, plus a plane working it */}
          {FLIGHTS.map((leg) => (
            <g key={leg.key}>
              <path
                d={leg.d}
                fill="none"
                stroke="var(--color-route)"
                strokeOpacity="0.28"
                strokeWidth="1.4"
                strokeDasharray="1 7"
                strokeLinecap="round"
              />

              {/* planes are decoration — stood down when motion is unwelcome */}
              <g className="in-flight">
                {/* contrail: a length of line that travels with the aircraft */}
                <path
                  d={leg.d}
                  pathLength="100"
                  fill="none"
                  stroke="var(--color-route)"
                  strokeOpacity="0.9"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeDasharray="26 100"
                >
                  {/*
                    The dash head is pinned to the landing point while its
                    length is animated to nothing, so the trail is reeled into
                    the destination rather than fading out on the spot.
                  */}
                  <animate
                    attributeName="stroke-dashoffset"
                    values="26;26;-74;-100;-100"
                    keyTimes={leg.trailTimes}
                    calcMode="spline"
                    keySplines={leg.trailSplines}
                    dur={leg.dur}
                    begin={leg.begin}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-dasharray"
                    values="26 100;26 100;26 100;0 100;0 100"
                    keyTimes={leg.trailTimes}
                    calcMode="spline"
                    keySplines={leg.trailSplines}
                    dur={leg.dur}
                    begin={leg.begin}
                    repeatCount="indefinite"
                  />
                </path>

                <g>
                  <path
                    d={PLANE_PATH}
                    transform="scale(0.5)"
                    fill="var(--color-route)"
                    stroke="var(--color-ink)"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                    paintOrder="stroke"
                  />
                  {/* rotate="auto" banks the airframe into the curve */}
                  <animateMotion
                    path={leg.d}
                    rotate="auto"
                    keyPoints="0;0;1;1"
                    keyTimes={leg.keyTimes}
                    calcMode="spline"
                    keySplines={leg.keySplines}
                    dur={leg.dur}
                    begin={leg.begin}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0;1;1;0;0"
                    keyTimes={leg.fadeTimes}
                    dur={leg.dur}
                    begin={leg.begin}
                    repeatCount="indefinite"
                  />
                </g>
              </g>
            </g>
          ))}

          {/* airfields — every one carries the same weight */}
          {places.map((p) => {
            const [x, y] = project(p.lon, p.lat);
            const l = LABEL[p.label];
            return (
              <g key={p.city}>
                <circle
                  cx={x}
                  cy={y}
                  r="11"
                  fill="var(--color-route)"
                  fillOpacity="0.15"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="var(--color-route)"
                  stroke="var(--color-ink)"
                  strokeWidth="2"
                />
                <text
                  x={x + l.dx}
                  y={y + l.dy}
                  textAnchor={l.anchor}
                  className="fill-head font-display"
                  fontSize="16"
                  fontWeight="500"
                  letterSpacing="-0.01em"
                >
                  {p.city}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ---------- stacked fallback (below md) ---------- */}
      <ul className="hidden gap-3 max-md:grid">
        {SPOKES.map((d) => (
          <li
            key={d.city}
            className="rounded-2xl border border-hair bg-linear-[135deg,var(--color-panel),var(--color-ink-2)] px-4 pt-4 pb-3 transition-colors duration-300 hover:border-accent/40"
          >
            {/* the two ends, with the leg drawn between them */}
            <div className="flex items-center gap-2">
              <b className="font-display text-[15.5px] leading-none tracking-[-0.02em]">
                {MUNDRA.city}
              </b>

              <span
                aria-hidden
                className="flex min-w-10 flex-1 items-center gap-1"
              >
                <i className="size-1.5 shrink-0 rounded-full bg-accent" />
                <i className="dashed-route h-px flex-1" />
                <svg
                  viewBox="-14 -9 28 18"
                  className="size-3.5 shrink-0 fill-accent"
                >
                  <path d={PLANE_PATH} />
                </svg>
                <i className="dashed-route h-px flex-1" />
                <i className="size-1.5 shrink-0 rounded-full bg-accent" />
              </span>

              <b className="font-display text-[15.5px] leading-none tracking-[-0.02em]">
                {d.city}
              </b>
            </div>

            {/* region on one side, how it runs on the other */}
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-hair pt-2.5">
              <span className="truncate text-[11.5px] text-fog">{d.region}</span>
              <span className="shrink-0 text-[10px] font-semibold tracking-[0.16em] text-fog-2 uppercase">
                Both ways
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ================================================================== */
/* Steps                                                               */
/* ================================================================== */

/* A scheduled service, not charter — so no quotes, no aircraft matching and
   nothing arranged on request. Book a seat, turn up, fly. */
const STEPS = [
  [
    "01",
    "Book on the website",
    "Pick your two cities and a date, choose your seats and pay online. No calls to make and no quote to wait on.",
  ],
  [
    "02",
    "Reach the airfield",
    "Arrive about 15 minutes before departure. No terminal to cross, no queues, no boarding groups.",
  ],
  [
    "03",
    "Enjoy the flight",
    "A short hop across Gujarat — and on an aircraft this size, every seat is a window seat.",
  ],
];

export function Steps() {
  return (
    <section className="relative bg-linear-to-b from-transparent via-accent/3 to-transparent py-18 max-md:py-12">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <Reveal className="mb-14 max-w-[620px]">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-[clamp(1.9rem,3.4vw,2.9rem)]">
            Three steps to <Hl>wheels up.</Hl>
          </h2>
        </Reveal>

        {/*
          The numerals carry the sequence on their own, so there is no ring or
          connector line to draw — those are what made this read as a stock
          stepper. Left aligned as well: centring three columns forced every
          line ragged on both sides.
        */}
        <ol className="grid grid-cols-3 gap-x-10 gap-y-12 max-md:grid-cols-1">
          {STEPS.map(([num, title, body], i) => (
            <Reveal key={num} delay={i * 0.1}>
              <li className="group border-t border-hair pt-6">
                <span className="block font-display text-[clamp(2.6rem,5vw,3.6rem)] leading-none font-extrabold tracking-[-0.05em] tabular-nums text-accent/22 transition-colors duration-350 group-hover:text-accent/45">
                  {num}
                </span>
                <h3 className="mt-6 mb-2.5 text-[19px] tracking-[-0.02em]">
                  {title}
                </h3>
                <p className="max-w-[38ch] text-[14.5px] leading-relaxed text-fog">
                  {body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Reviews                                                             */
/* ================================================================== */

/* Placeholder testimonials: written to fit the real routes and the real
   proposition, but invented. Replace with genuine quotes before launch. */
const REVIEWS = [
  {
    quote:
      "Mundra to Vadodara used to be a day written off — leave before dawn, drive back after dark. Now I am at the site by mid-morning and home for dinner the same day.",
    initials: "RP",
    name: "Rohit Patel",
    role: "Plant Manager, Vadodara",
  },
  {
    quote:
      "We send people to Jamnagar most weeks. No terminal, no queue, and the airfield is a short drive from the refinery — the whole trip is shorter than the drive to an international airport used to be.",
    initials: "MJ",
    name: "Meera Joshi",
    role: "Operations Lead, Mundra",
  },
  {
    quote:
      "Took the Diu leg with my parents. Check-in was walking up to the aircraft, and the crew carried the bags out themselves. My mother has not stopped talking about it.",
    initials: "AS",
    name: "Ankit Shah",
    role: "Rajkot",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="relative py-18 max-md:py-12">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <Reveal className="mx-auto mb-13 max-w-165 text-center">
          <Eyebrow centered>Reviews</Eyebrow>
          <h2 className="text-[clamp(1.9rem,3.4vw,2.9rem)]">
            Flown by people who <Hl>value their time.</Hl>
          </h2>
        </Reveal>

        <div className="grid grid-cols-3 gap-4.5 max-xl:grid-cols-2 max-md:grid-cols-1">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1} className="h-full">
              <figure className="flex h-full flex-col rounded-[26px] border border-hair bg-linear-[170deg,var(--color-panel),var(--color-ink-2)] px-7 py-7.5 transition-[transform,border-color] duration-350 hover:-translate-y-1.5 hover:border-accent/30">
                <div className="mb-4 text-sm tracking-[2px] text-accent" aria-hidden>
                  ★★★★★
                </div>
                <blockquote className="mb-6 text-[15.5px] leading-[1.72] text-body">
                  {r.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-hair pt-4.5">
                  <span className="grid size-10.5 shrink-0 place-items-center rounded-full bg-linear-[150deg,var(--color-accent),var(--color-accent-dark)] text-[13px] font-extrabold text-[#0d1b2a]">
                    {r.initials}
                  </span>
                  <div>
                    <b className="block text-[14.5px]">{r.name}</b>
                    <small className="text-[12.5px] text-fog">{r.role}</small>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Fleet                                                               */
/* ================================================================== */

const FLEET_MARKS = [
  "Airworthy assets",
  "DGCA certified",
  "Full serviceability",
  "Regular maintenance",
];

export function Fleet() {
  return (
    <section id="fleet" className="relative py-18 max-md:py-12">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-center gap-14 max-lg:grid-cols-1 max-lg:gap-10">
          {/* copy */}
          <Reveal>
            <p className="mb-6 text-[11px] leading-none font-semibold tracking-[0.22em] text-accent uppercase">
              <EyebrowLine>Fleet</EyebrowLine>
            </p>

            <h2 className="mb-6 text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.02] tracking-[-0.035em]">
              Modern &amp; <Hl>diverse fleet.</Hl>
            </h2>

            <div className="grid max-w-[56ch] gap-4 text-[16px] leading-relaxed text-fog">
              <p>
                Our commitment to a better travel experience shows up first in
                what we fly. The fleet is chosen around three things: safety,
                efficiency and passenger comfort.
              </p>
              <p>
                It consists of turboprop aircraft suited to regional
                connectivity and short-haul routes &mdash; efficient on fuel,
                and held to the safety standards mandated by the DGCA.
              </p>
            </div>

            <ul className="mt-8 grid max-w-[520px] grid-cols-2 gap-2.5 max-sm:grid-cols-1">
              {FLEET_MARKS.map((m) => (
                <li
                  key={m}
                  className="flex items-center gap-2.5 rounded-xl border border-accent/25 bg-accent/8 px-4 py-3 text-[13.5px] font-semibold"
                >
                  <svg
                    viewBox="0 0 14 14"
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="shrink-0 text-accent"
                  >
                    <path d="M2 7.5l3.5 3.5L12 3.5" />
                  </svg>
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* aircraft */}
          <Reveal delay={0.1}>
            <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-[22px] border border-hair bg-linear-[160deg,var(--color-panel),var(--color-ink-2)] p-8 max-lg:aspect-[16/9]">
              <Image
                src={planeSide}
                alt="Aero Taxi aircraft on the apron"
                sizes="(max-width: 1024px) 90vw, 560px"
                className="h-auto w-full object-contain"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Founders                                                            */
/* ================================================================== */

/* `photo` stays null until the portrait lands in /public — the monogram
   below stands in for it, so nothing 404s in the meantime. */
const FOUNDERS = [
  {
    name: "Capt. Varun Suhag",
    role: "Co-Founder & Director",
    initials: "VS",
    photo: null as string | null,
    tags: [
      "Mechanical Engineer",
      "Commercial Pilot",
      "ATR fleet, 2007–2010",
      "Rotax & Continental certified",
    ],
    bio: [
      "A Mechanical Engineer, Pilot and an Entrepreneur, Varun has a deep rooted interest in aviation that spans every vertical. He never minds getting his hands dirty with engines or taking up challenging flights. He served as a co-pilot with the erstwhile Air Deccan and Kingfisher airlines on the ATR fleet from 2007 till 2010, then left the cockpit to pursue his ambitions in the aviation business.",
      "He is responsible for discovering and bringing the Tecnam Aircraft brand to India, changing the economics of flight schools along the way — Tecnam is today the number one choice of flight schools in the country. Aero Taxi was his idea, born from the conviction that regional travel could feel entirely different: no long queues, no waiting at the airport, and a genuinely personal service.",
      "Away from aviation he is a state level basketball player and an all round sportsman, a keen paraglider and paramotor pilot, and a motorcycling enthusiast. He is also a Certified Rotax and CONTINENTAL engine maintenance and service technician.",
    ],
  },
];

export function Founders() {
  return (
    <section id="founders" className="relative py-18 max-md:py-12">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <Reveal className="mb-14 max-w-[620px]">
          <Eyebrow>Founders</Eyebrow>
          <h2 className="text-[clamp(1.9rem,3.4vw,2.9rem)]">
            The people who <Hl>drew the route.</Hl>
          </h2>
        </Reveal>

        <div className="grid gap-16">
          {FOUNDERS.map((f) => (
            <Reveal key={f.name}>
              <article className="grid grid-cols-[minmax(0,320px)_minmax(0,1fr)] items-start gap-12 max-lg:grid-cols-1 max-lg:gap-8">
                {/* portrait */}
                <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[22px] border border-hair bg-linear-[160deg,var(--color-panel),var(--color-ink-2)] max-lg:aspect-[3/2]">
                    {f.photo ? (
                      <Image
                        src={f.photo}
                        alt={f.name}
                        fill
                        sizes="(max-width: 1024px) 90vw, 320px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="font-display text-[72px] leading-none font-extrabold tracking-[-0.04em] text-accent/22">
                        {f.initials}
                      </span>
                    )}
                </div>

                {/* the person */}
                <div>
                  <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.05rem)] leading-tight tracking-[-0.03em]">
                    {f.name}
                  </h3>
                  <p className="mt-2 text-[12px] font-semibold tracking-[0.2em] text-accent uppercase">
                    {f.role}
                  </p>
                  <span aria-hidden className="mt-5 block h-0.5 w-11 bg-accent" />

                  <div className="mt-6 grid max-w-[68ch] gap-4 text-[15.5px] leading-relaxed text-fog">
                    {f.bio.map((para) => (
                      <p key={para.slice(0, 24)}>{para}</p>
                    ))}
                  </div>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {f.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-hair bg-tint px-3.5 py-1.5 text-[11.5px] font-semibold tracking-[0.06em] text-fog-2 uppercase"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Footer                                                              */
/* ================================================================== */

const SOCIALS = [
  {
    label: "X",
    path: "M18.9 2H22l-7.1 8.1L23.2 22h-6.5l-5.1-6.7L5.8 22H2.7l7.6-8.7L2 2h6.6l4.6 6.1L18.9 2Zm-1.1 18.1h1.7L7.3 3.8H5.5l12.3 16.3Z",
  },
  {
    label: "LinkedIn",
    path: "M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C21.6 8.65 23 10.9 23 14.2V21h-4v-6c0-1.5-.03-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V21h-4V9Z",
  },
  {
    label: "Instagram",
    path: "M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm4 5.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Zm0 1.9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM17 6.2a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1Z",
  },
];

const FOOTER_COLS = [
  {
    title: "Company",
    links: ["About us", "Careers", "Newsroom", "Safety record"],
  },
  {
    title: "Fly with us",
    links: ["Our network", "Book a seat", "Our fleet", "Contact us"],
  },
  {
    title: "Support",
    links: ["Help centre", "Contact 24/7", "Terms", "Privacy"],
  },
];

export function Footer({ logo }: { logo: React.ReactNode }) {
  return (
    <footer id="footer" className="relative border-t border-hair bg-ink-2 pt-16">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-[1.7fr_1fr_1fr_1fr] gap-9 px-6 pb-12 max-xl:grid-cols-2 max-sm:grid-cols-2 max-sm:gap-x-5 max-sm:gap-y-8">
        <div className="max-sm:col-span-2">
          {logo}
          <p className="my-4 max-w-80 text-sm text-fog">
            Regional air taxi connections across Gujarat. Short hops between
            small airfields, with no terminal queues.
          </p>
          <div className="flex gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="grid size-9.5 place-items-center rounded-xl border border-hair bg-tint text-fog transition-all duration-250 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-[#0d1b2a]"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {FOOTER_COLS.map((c) => (
          <div key={c.title}>
            <h4 className="mb-4.5 text-sm">{c.title}</h4>
            {c.links.map((l) => (
              <a
                key={l}
                href="#"
                className="block py-1.5 text-sm text-fog transition-all duration-200 hover:pl-1 hover:text-accent"
              >
                {l}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-[1240px] flex-wrap justify-between gap-4 border-t border-hair px-6 pt-5.5 pb-8 max-sm:flex-col max-sm:items-center max-sm:gap-2 max-sm:text-center">
        <small className="text-[12.5px] text-fog-2">
          © 2026 Aero Taxi. All rights reserved.
        </small>
        <small className="text-[12.5px] text-fog-2">
          Operated by DGCA-approved partner airlines.
        </small>
      </div>

      {/* ---------- oversized wordmark ---------- */}
      <div aria-hidden className="overflow-hidden">
        <svg
          viewBox="0 0 1000 126"
          preserveAspectRatio="xMidYMax meet"
          className="block w-full"
        >
          {/*
            textLength pins the word to the full page width, and
            lengthAdjust="spacing" opens only the gaps — "spacingAndGlyphs"
            would scale the outlines themselves and fatten them.

            The size is deliberately well under what would fill 1000 on its
            own, which leaves textLength about 17 units of tracking to add to
            every gap. That is what makes the spacing read as even: set larger,
            the added tracking approaches zero and the font's own sidebearings
            and kern pairs dominate instead, so TA closes up while XI stays
            open. Kerning is off for the same reason.

            Space Grotesk Bold, not the Sora used elsewhere — its cap height is
            700 per 1000 em, so at 168 the caps stand 118 tall and a baseline of
            126 in a 126-tall box rests them on the bottom edge with 8 units of
            headroom. "AERO TAXI" has no descenders, so the baseline is the
            bottom of the glyphs. It runs a little narrower than Sora, hence the
            larger size to keep the tracking in the same range.
          */}
          <text
            x="0"
            y="126"
            textLength="1000"
            lengthAdjust="spacing"
            fontSize="168"
            fontWeight="700"
            style={{ fontKerning: "none" }}
            className="font-wordmark"
          >
            {/* same split as the logo: first word neutral, second accent */}
            <tspan fill="var(--color-head)">AERO </tspan>
            <tspan fill="var(--color-route)">TAXI</tspan>
          </text>
        </svg>
      </div>
    </footer>
  );
}
