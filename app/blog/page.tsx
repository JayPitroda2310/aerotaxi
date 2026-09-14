import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { EyebrowLine, Hl } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog — Aero Taxi",
  description:
    "Notes on flying short regional routes across Gujarat: how a rotation works, why we use small airfields, and what to expect on the day.",
};

/* Placeholder editorial — written to show the layout working, not published
   writing. Individual posts have no pages yet, so every link lands here. */
const POST = "#";

type Post = {
  title: string;
  category: string;
  date: string; // display form
  iso: string; // for <time>
  read: string;
  excerpt?: string;
};

const FEATURED: Post = {
  title: "Inside a short hop: Mundra to Vadodara and back",
  category: "Operations",
  date: "08 Sep 2026",
  iso: "2026-09-08",
  read: "6 min",
  excerpt:
    "A regional rotation looks nothing like a commercial departure. No terminal, no gate, no boarding groups — just a walk across the apron and a pre-flight check. Here is the whole sequence, from the aircraft leaving the stand to the turnaround at the other end.",
};

const POSTS: Post[] = [
  {
    title: "Why small airfields beat big terminals",
    category: "Network",
    date: "02 Sep 2026",
    iso: "2026-09-02",
    read: "4 min",
  },
  {
    title: "The hour before your flight, start to finish",
    category: "Operations",
    date: "26 Aug 2026",
    iso: "2026-08-26",
    read: "5 min",
  },
  {
    title: "Four routes, and why these four",
    category: "Network",
    date: "19 Aug 2026",
    iso: "2026-08-19",
    read: "4 min",
  },
  {
    title: "Weather, and how we decide whether to fly",
    category: "Safety",
    date: "11 Aug 2026",
    iso: "2026-08-11",
    read: "7 min",
  },
  {
    title: "What fits: baggage on a light aircraft",
    category: "Travel",
    date: "04 Aug 2026",
    iso: "2026-08-04",
    read: "3 min",
  },
];

const Arrow = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 16 16"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
  </svg>
);

export default function Blog() {
  return (
    <main className="pt-30 pb-6 max-lg:pt-26">
      <section>
        <div className="mx-auto w-full max-w-[1240px] px-6">
          <Reveal className="max-w-[680px]">
            <p className="mb-7 text-[11px] leading-none font-semibold tracking-[0.22em] text-accent uppercase">
              <EyebrowLine>Blog</EyebrowLine>
            </p>
            <h1 className="mb-6 text-[clamp(2.4rem,4.6vw,3.9rem)] leading-[0.98] tracking-[-0.04em]">
              Notes from <Hl>the apron.</Hl>
            </h1>
            <p className="max-w-[58ch] text-[16.5px] leading-relaxed text-fog">
              How a short regional rotation actually works, why the network
              looks the way it does, and what to expect on the day you fly.
            </p>
          </Reveal>

          {/* ---------- lead story ---------- */}
          <Reveal delay={0.1}>
            <a
              href={POST}
              className="group mt-14 grid grid-cols-[160px_minmax(0,1fr)] items-start gap-10 border-y border-hair py-10 transition-colors duration-250 hover:bg-accent/5 max-lg:grid-cols-1 max-lg:gap-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
            >
              <div className="flex flex-col gap-2 max-lg:flex-row max-lg:items-center max-lg:gap-3">
                <span className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
                  {FEATURED.category}
                </span>
                <time
                  dateTime={FEATURED.iso}
                  className="text-[12.5px] tabular-nums text-fog-2"
                >
                  {FEATURED.date}
                </time>
              </div>

              <div>
                <h2 className="mb-4 font-display text-[clamp(1.5rem,3vw,2.3rem)] leading-tight tracking-[-0.035em] transition-colors duration-300 group-hover:text-accent">
                  {FEATURED.title}
                </h2>
                <p className="mb-6 max-w-[62ch] text-[15.5px] leading-relaxed text-fog">
                  {FEATURED.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-accent">
                  Read the piece
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          </Reveal>

          {/* ---------- archive ---------- */}
          <Reveal delay={0.15}>
            <ul className="mt-2">
              {POSTS.map((p) => (
                <li key={p.title} className="border-b border-hair">
                  <a
                    href={POST}
                    className="group grid grid-cols-[110px_120px_minmax(0,1fr)_70px] items-center gap-6 py-5 transition-[padding-left,background] duration-250 hover:bg-accent/5 hover:pl-3 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent max-lg:grid-cols-1 max-lg:gap-2 max-lg:py-4"
                  >
                    <time
                      dateTime={p.iso}
                      className="text-[12.5px] tabular-nums text-fog-2"
                    >
                      {p.date}
                    </time>
                    <span className="text-[10.5px] font-semibold tracking-[0.16em] text-accent uppercase">
                      {p.category}
                    </span>
                    <span className="font-display text-[16.5px] tracking-[-0.02em] transition-colors duration-300 group-hover:text-accent">
                      {p.title}
                    </span>
                    <span className="flex items-center justify-end gap-2 text-[12.5px] text-fog-2 max-lg:justify-start">
                      {p.read}
                      <Arrow className="size-3 text-fog-2 transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
