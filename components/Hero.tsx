import Image from "next/image";
import plane from "@/public/plane.png";
import Booker from "./Booker";
import { LAUNCH } from "./network";
import Reveal from "./Reveal";
import { AnchorButton, AnchorLink } from "./AnchorLink";
import { EyebrowLine, Hl } from "./ui";

/* The headline facts, set as a labelled data strip rather than loose prose —
   the flight-information idiom this whole page borrows from. Deliberately no
   "hub" column: Mundra is the common point of the four routes, not a hub. */
const FACTS = [
  { label: "Airfields", value: "Five", note: "across Gujarat" },
  { label: "Routes", value: "Four", note: "flown both ways" },
  { label: "First flight", value: LAUNCH.short, note: "inaugural service" },
];

export default function Hero() {
  return (
    <section id="top" className="relative z-10 pt-30 pb-18 max-lg:pt-26">
      {/* ambient glow. The clipping lives on this wrapper rather than on the
          section, so the booking bar dropdowns are free to overflow. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 -top-[20%] h-[900px] bg-[radial-gradient(680px_460px_at_50%_8%,rgb(58_160_238/0.20),transparent_68%),radial-gradient(560px_420px_at_88%_42%,rgb(58_160_238/0.09),transparent_70%),radial-gradient(520px_400px_at_8%_34%,rgb(58_160_238/0.07),transparent_72%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-6">
        <div className="grid min-h-[600px] grid-cols-[1.05fr_minmax(340px,0.95fr)] items-center gap-5 max-lg:min-h-0 max-lg:grid-cols-1 max-lg:gap-9">
          {/* ---------- copy ---------- */}
          <Reveal className="max-lg:order-1">
            {/* a rule and a letterspaced label, rather than a pill badge */}
            <p className="mb-7 text-[11px] leading-none font-semibold tracking-[0.22em] text-accent uppercase">
              <EyebrowLine>Gujarat regional air taxi</EyebrowLine>
            </p>

            <h1 className="mb-6 text-[clamp(2.6rem,5.1vw,4.4rem)] leading-[0.96] tracking-[-0.04em]">
              Skip the terminal.
              <br />
              Fly <Hl>Gujarat</Hl> direct.
            </h1>

            {/* The last clause is dropped on a phone, where the paragraph
                runs to several lines and the point is already made. The comma
                that joined it goes with it and the full stop stays outside the
                span, so the short form ends cleanly rather than on a dangling
                comma. */}
            <p className="max-w-[46ch] text-[16.5px] leading-relaxed text-fog max-lg:max-w-none">
              Four short-hop routes linking Mundra with Vadodara, Jamnagar, Diu
              and Rajkot. Small airfields, no check-in queues
              <span className="max-sm:hidden">
                , and no long drive to an international terminal first
              </span>
              .
            </p>

            {/* The launch date and the shape of the network, as data.
                Dropped on a phone: three columns will not fit, and stacking
                them turned a compact strip into a tall block that pushed the
                booking bar well below the fold. The same facts are on the
                About page, which has the room for them. */}
            <dl className="mt-10 grid max-w-[540px] grid-cols-3 border-y border-hair max-lg:max-w-none max-sm:hidden">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="border-l border-hair py-4 pl-5 first:border-l-0 first:pl-0"
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

            {/* Moved out of the navbar. The booking bar it points at sits a
                few hundred pixels below, so a plain fragment scrolls to it
                natively — no handler needed. */}
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <AnchorButton href="#book" size="md">
                Book now
              </AnchorButton>

              <AnchorLink
                href="#routes"
                className="inline-flex items-center gap-2 border-b border-accent/30 pb-0.5 text-sm font-semibold text-accent transition-colors duration-250 hover:border-accent"
              >
                See the route map
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
                >
                  <path d="M8 2.5v11M3.5 9.5 8 14l4.5-4.5" />
                </svg>
              </AnchorLink>
            </div>
          </Reveal>

          {/* ---------- plane ---------- */}
          <Reveal delay={0.1} className="relative grid place-items-center max-lg:order-2">
            {/* Ambient glow. It is deliberately wider than the column — the
                gradient has faded to nothing well before its own box edge, so
                a box that only spans the column would cut the glow short. The
                wrapper clips it back to the column, at a radius where the
                alpha is already under 1%, so the cut is invisible and the
                circle can no longer push the page sideways. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute top-1/2 left-1/2 aspect-square w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(58_160_238/0.18),transparent_62%)] blur-[18px]" />
            </div>
            <div className="relative">
              <Image
                src={plane}
                alt="White and blue light aircraft seen from above"
                priority
                placeholder="blur"
                sizes="(max-width: 1000px) 70vw, 430px"
                className="h-auto w-full max-w-[430px] drop-shadow-[0_30px_60px_rgb(13_27_42/0.11)] max-lg:max-w-[330px]"
              />
            </div>
          </Reveal>
        </div>

        {/* ---------- booking bar ---------- */}
        <Reveal delay={0.3}>
          <Booker />
        </Reveal>
      </div>
    </section>
  );
}
