import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { ButtonLink, EyebrowLine, Hl } from "@/components/ui";

export const metadata: Metadata = {
  title: "Jobs & Careers — Aero Taxi",
  description:
    "Life at Aero Taxi: full time roles for pilots, customer services and security, plus internships across operations, sales, ground staff and admin.",
};

/* No application inbox has been set up yet, so every apply link points here.
   Swap this one constant for a mailto: or an ATS URL when there is one. */
const APPLY = "#";

const I = {
  team: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.8 19.5a6.2 6.2 0 0 1 12.4 0M16.5 5.2a3.2 3.2 0 0 1 0 5.9M18.4 19.5a6.2 6.2 0 0 0-2.4-4.9" />
    </>
  ),
  growth: (
    <>
      <path d="M3 16.5 9 10l3.6 3.6L21 5.5" />
      <path d="M15.6 5.5H21v5.4" />
    </>
  ),
  hire: (
    <>
      <circle cx="10" cy="8" r="3.4" />
      <path d="M3.4 19.6a6.6 6.6 0 0 1 13.2 0M18.5 6.8v5M21 9.3h-5" />
    </>
  ),
  lead: (
    <>
      <path d="M8 4h8v4.5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5.6H5.2v1.2A3.2 3.2 0 0 0 8 9.9M16 5.6h2.8v1.2A3.2 3.2 0 0 1 16 9.9M9.6 20h4.8M12 12.6V20" />
    </>
  ),
  ops: (
    <>
      <rect x="3" y="7.4" width="18" height="12.2" rx="2.4" />
      <path d="M8.6 7.4V5.8A1.8 1.8 0 0 1 10.4 4h3.2a1.8 1.8 0 0 1 1.8 1.8v1.6M3 12.6h18" />
    </>
  ),
  sales: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.8 19.5a6.2 6.2 0 0 1 12.4 0M17 12.5l4 2.2-4 2.2" />
    </>
  ),
  ground: (
    <>
      <path d="M12 21c4.4-4.2 6.6-7.4 6.6-10.4a6.6 6.6 0 1 0-13.2 0C5.4 13.6 7.6 16.8 12 21Z" />
      <circle cx="12" cy="10.4" r="2.5" />
    </>
  ),
  admin: (
    <>
      <path d="M12 3.2 19 6v5.4c0 4.2-2.9 7.8-7 9.4-4.1-1.6-7-5.2-7-9.4V6l7-2.8Z" />
    </>
  ),
  pilot: (
    <>
      <path d="M2.6 12.4 21 4.6l-7.3 18.2-2.9-7.6-8.2-2.8Z" />
    </>
  ),
  service: (
    <>
      <path d="M4.4 14.2v-1.8a7.6 7.6 0 0 1 15.2 0v1.8" />
      <rect x="2.6" y="13.6" width="3.8" height="5.6" rx="1.7" />
      <rect x="17.6" y="13.6" width="3.8" height="5.6" rx="1.7" />
    </>
  ),
};

const VALUES = [
  { icon: I.team, label: "Collaborative" },
  { icon: I.growth, label: "Professional growth" },
  { icon: I.hire, label: "Hiring people we like" },
  { icon: I.lead, label: "Lead by example" },
];

const FULL_TIME = [
  {
    icon: I.pilot,
    team: "Flight crew",
    tag: "Hiring pilots",
    title: "Join our team of pilots.",
    body: "We are looking for experienced commercial pilots with a CPL or ATPL licence and a real passion for aviation.",
  },
  {
    icon: I.service,
    team: "Ground",
    tag: "We are hiring",
    title: "Customer Services Executive.",
    body: "Be the face of Aero Taxi and help deliver an exceptional travel experience to every passenger.",
  },
  {
    icon: I.admin,
    team: "Ground",
    tag: "We are hiring",
    title: "Security Executive.",
    body: "Help maintain safety and security standards across our operations. Prior experience in aviation security preferred.",
  },
];

const INTERNSHIPS = [
  { icon: I.ops, label: "Operations" },
  { icon: I.sales, label: "Sales & Marketing" },
  { icon: I.ground, label: "Ground Staff" },
  { icon: I.admin, label: "Admin" },
];

function Icon({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export default function Careers() {
  return (
    <main className="pt-30 pb-6 max-lg:pt-26">
      {/* ---------- header ---------- */}
      <section>
        <div className="mx-auto w-full max-w-[1240px] px-6">
          <Reveal className="max-w-[680px]">
            <p className="mb-7 text-[11px] leading-none font-semibold tracking-[0.22em] text-accent uppercase">
              <EyebrowLine>Join our team</EyebrowLine>
            </p>

            <h1 className="mb-6 text-[clamp(2.4rem,4.6vw,3.9rem)] leading-[0.98] tracking-[-0.04em]">
              Life at <Hl>Aero Taxi.</Hl>
            </h1>

            <div className="grid max-w-[62ch] gap-4 text-[16.5px] leading-relaxed text-fog">
              <p>
                Our success is driven by a small, dedicated team. We offer a
                working environment where innovation, collaboration and
                excellence are genuinely celebrated.
              </p>
              <p>
                We value diversity and inclusion, and we are committed to a
                workplace where everyone can do their best work. Whether you are
                a seasoned pilot, an aviation enthusiast, or someone looking to
                start a career in the industry, there is room here to grow.
              </p>
            </div>
          </Reveal>

          {/* what it is like to work here */}
          <Reveal delay={0.1}>
            <ul className="mt-14 grid grid-cols-4 gap-x-8 gap-y-5 border-y border-hair py-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {VALUES.map((v) => (
                <li key={v.label} className="flex items-center gap-3">
                  <Icon className="size-[18px] shrink-0 text-accent">
                    {v.icon}
                  </Icon>
                  <span className="text-[14.5px] font-semibold tracking-tight">
                    {v.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------- full time ---------- */}
      <section id="full-time" className="relative py-18 max-md:py-12">
        <div className="mx-auto w-full max-w-[1240px] px-6">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="mb-4 text-[11px] leading-none font-semibold tracking-[0.22em] text-accent uppercase">
                <EyebrowLine>Full time</EyebrowLine>
              </p>
              <h2 className="text-[clamp(1.8rem,3.2vw,2.6rem)] tracking-[-0.035em]">
                Open positions.
              </h2>
            </div>
            <p className="text-[13.5px] text-fog-2">
              {FULL_TIME.length} roles currently open
            </p>
          </Reveal>

          {/*
            A board rather than a grid of cards. It is the idiom the rest of
            the site already speaks — ruled columns, letterspaced labels — and
            unlike a card grid it takes a fourth or a tenth role without
            reflowing into an awkward orphan row.
          */}
          <Reveal delay={0.05}>
            <div className="overflow-hidden rounded-[22px] border border-hair">
              <div className="grid grid-cols-[minmax(0,1fr)_150px_150px_110px] gap-6 border-b border-hair bg-tint px-7 py-3.5 text-[10.5px] font-semibold tracking-[0.18em] text-fog-2 uppercase max-lg:hidden">
                <span>Position</span>
                <span>Team</span>
                <span>Status</span>
                <span className="text-right">Apply</span>
              </div>

              <ul>
                {FULL_TIME.map((r) => (
                  <li key={r.title} className="border-b border-hair last:border-b-0">
                    <a
                      href={APPLY}
                      className="group grid grid-cols-[minmax(0,1fr)_150px_150px_110px] items-center gap-6 px-7 py-6 transition-colors duration-250 hover:bg-accent/6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent max-lg:grid-cols-1 max-lg:gap-4 max-sm:px-5"
                    >
                      <div className="flex gap-4">
                        <Icon className="mt-0.5 size-6 shrink-0 text-accent">
                          {r.icon}
                        </Icon>
                        <div className="min-w-0">
                          <h3 className="font-display text-[17.5px] leading-snug tracking-[-0.02em]">
                            {r.title}
                          </h3>
                          <p className="mt-1.5 max-w-[56ch] text-[14px] leading-relaxed text-fog">
                            {r.body}
                          </p>
                        </div>
                      </div>

                      {/* contents on the board, a meta row once it stacks */}
                      <div className="contents max-lg:flex max-lg:flex-wrap max-lg:items-center max-lg:gap-3 max-lg:pl-10">
                        <span className="text-[13.5px] text-fog max-lg:text-[12.5px] max-lg:tracking-[0.1em] max-lg:uppercase">
                          {r.team}
                        </span>
                        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/25 bg-accent/8 py-1.5 pr-3 pl-2.5 text-[10.5px] font-semibold tracking-[0.12em] text-accent uppercase">
                          <i aria-hidden className="size-1.5 rounded-full bg-accent" />
                          {r.tag}
                        </span>
                        <span className="inline-flex items-center gap-1.5 justify-self-end text-[13.5px] font-semibold text-accent max-lg:ml-auto">
                          Apply
                          <svg
                            viewBox="0 0 16 16"
                            width="13"
                            height="13"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          >
                            <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                          </svg>
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- internships ---------- */}
      <section id="internship" className="relative py-18 max-md:py-12">
        <div className="mx-auto w-full max-w-[1240px] px-6">
          {/*
            Heading and list side by side. Run full width, four short labels
            leave a huge void between the name and its icon — pairing the list
            with the heading gives the row a sensible measure instead.
          */}
          <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] items-start gap-16 max-lg:grid-cols-1 max-lg:gap-9">
            <Reveal>
              <p className="mb-4 text-[11px] leading-none font-semibold tracking-[0.22em] text-accent uppercase">
                <EyebrowLine>Internship</EyebrowLine>
              </p>
              <h2 className="mb-4 text-[clamp(1.8rem,3.2vw,2.6rem)] tracking-[-0.035em]">
                Start where the work <Hl>actually happens.</Hl>
              </h2>
              <p className="max-w-[42ch] text-[16px] leading-relaxed text-fog">
                Internships run across four areas. Tell us which one fits and
                what you want to learn.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="border-t border-hair">
                {INTERNSHIPS.map((it) => (
                  <li key={it.label}>
                    <a
                      href={APPLY}
                      className="group flex items-center gap-4 border-b border-hair py-5 transition-[padding-left] duration-350 hover:pl-2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
                    >
                      <Icon className="size-5 shrink-0 text-accent">
                        {it.icon}
                      </Icon>
                      <span className="flex-1 font-display text-[17.5px] tracking-[-0.02em] transition-colors duration-300 group-hover:text-accent">
                        {it.label}
                      </span>
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
                        className="shrink-0 text-fog-2 transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-accent"
                      >
                        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-12 rounded-[22px] border border-accent/25 bg-accent/8 px-8 py-12 text-center max-sm:px-5 max-sm:py-9">
              <p className="mx-auto max-w-[22ch] font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight tracking-[-0.035em]">
                The smart way to fly, with <Hl>Aero Taxi.</Hl>
              </p>
              <ButtonLink href={APPLY} size="md" className="mt-7">
                Send us your CV
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
