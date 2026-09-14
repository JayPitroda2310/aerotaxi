import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Fleet, Founders } from "@/components/Sections";
import { EyebrowLine, Hl } from "@/components/ui";

export const metadata: Metadata = {
  title: "About — Aero Taxi",
  description:
    "Who is behind Aero Taxi, and why a regional service across Gujarat: Mundra, Vadodara, Jamnagar, Diu and Rajkot.",
};

/* Same labelled-data idiom as the home page hero. */
const FACTS = [
  { label: "Based in", value: "Gujarat", note: "western India" },
  { label: "Routes", value: "Four", note: "flown both ways" },
  { label: "First flight", value: "28 Aug 2026", note: "inaugural service" },
];

export default function About() {
  return (
    <main className="pt-30 pb-6 max-lg:pt-26">
      <section>
        <div className="mx-auto w-full max-w-[1240px] px-6">
          <Reveal className="max-w-[680px]">
            <p className="mb-7 text-[11px] leading-none font-semibold tracking-[0.22em] text-accent uppercase">
              <EyebrowLine>About us</EyebrowLine>
            </p>

            <h1 className="mb-6 text-[clamp(2.4rem,4.6vw,3.9rem)] leading-[0.98] tracking-[-0.04em]">
              Short hops, <Hl>taken seriously.</Hl>
            </h1>

            <div className="grid max-w-[62ch] gap-4 text-[16.5px] leading-relaxed text-fog">
              <p>
                Getting between two towns in Gujarat usually means a long drive
                to an international airport, a terminal built for aircraft ten
                times the size, and most of a day gone. For journeys of an hour
                in the air, almost none of that is doing any work.
              </p>
              <p>
                Aero Taxi flies four regional routes &mdash; Mundra to Vadodara,
                Jamnagar, Diu and Rajkot, each in both directions &mdash; out of
                small airfields close to where people are actually going. No
                terminals to cross, no transfers, no long haul to a metro hub
                before the journey even begins.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-12 grid max-w-[560px] grid-cols-3 border-y border-hair max-sm:max-w-none max-sm:grid-cols-1">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="border-l border-hair py-4 pl-5 first:border-l-0 first:pl-0 max-sm:border-t max-sm:border-l-0 max-sm:py-3.5 max-sm:pl-0 max-sm:first:border-t-0"
                >
                  <dt className="text-[10px] font-semibold tracking-[0.18em] text-fog-2 uppercase">
                    {f.label}
                  </dt>
                  <dd className="mt-2 font-display text-[17px] tracking-[-0.02em] tabular-nums">
                    {f.value}
                  </dd>
                  <dd className="mt-0.5 text-[12px] text-fog">{f.note}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <Founders />
      <Fleet />
    </main>
  );
}
