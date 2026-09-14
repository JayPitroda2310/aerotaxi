"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  AirportSelect,
  DateField,
  Field,
  fieldCls,
  labelCls,
  valueCls,
} from "./fields";
import { AIRPORTS, LAUNCH } from "./network";
import { Button } from "./ui";

const TRIPS = ["One Way", "Round Trip"] as const;

/** Seats on the aircraft — adults and children each occupy one. */
const MAX_SEATS = 9;

export type Pax = { adults: number; children: number; infants: number };

const PAX_ROWS = [
  { key: "adults", label: "Adults", hint: "12+ years" },
  { key: "children", label: "Children", hint: "2–11 years" },
  { key: "infants", label: "Infants", hint: "Under 2, on lap" },
] as const;

/** "2 Travellers" while it's all adults, itemised once it isn't. */
function summarise({ adults, children, infants }: Pax) {
  if (!children && !infants)
    return `${adults} ${adults === 1 ? "Traveller" : "Travellers"}`;
  const parts = [`${adults} Adult${adults === 1 ? "" : "s"}`];
  if (children) parts.push(`${children} Child${children === 1 ? "" : "ren"}`);
  if (infants) parts.push(`${infants} Infant${infants === 1 ? "" : "s"}`);
  return parts.join(", ");
}

/** Lower and upper bound for each row, given the rest of the party. */
function bounds(kind: keyof Pax, p: Pax): [number, number] {
  const seated = p.adults + p.children;
  if (kind === "adults")
    // at least one adult must travel, and infants ride on an adult's lap
    return [Math.max(1, p.infants), p.adults + (MAX_SEATS - seated)];
  if (kind === "children") return [0, p.children + (MAX_SEATS - seated)];
  return [0, p.adults];
}

function Step({
  sign,
  onClick,
  disabled,
  label,
}: {
  sign: "−" | "+";
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  const plus = sign === "+";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-[15px] leading-none font-bold transition-[background,border-color,color,opacity] duration-200 disabled:cursor-not-allowed disabled:opacity-30 ${
        plus
          ? "bg-accent text-[#0d1b2a] hover:bg-accent-light"
          : "border border-hair text-head hover:border-accent/50 hover:text-accent"
      }`}
    >
      {sign}
    </button>
  );
}

/** Travellers field that opens a stepper panel; changes apply on confirm. */
function TravellerPicker({
  value,
  onChange,
}: {
  value: Pax;
  onChange: (p: Pax) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  // the panel edits a copy — dismissing without applying keeps the old party
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = () => {
    setDraft(value);
    setOpen((o) => !o);
  };

  const nudge = (kind: keyof Pax, by: number) =>
    setDraft((d) => {
      const [lo, hi] = bounds(kind, d);
      const next = Math.min(hi, Math.max(lo, d[kind] + by));
      const merged = { ...d, [kind]: next };
      // dropping adults can strand infants who were riding on their laps
      if (kind === "adults") merged.infants = Math.min(merged.infants, next);
      return merged;
    });

  const seated = draft.adults + draft.children;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className={`${fieldCls} w-full cursor-pointer text-left ${
          open ? "border-accent/60 bg-accent/6" : "hover:border-accent/30"
        }`}
      >
        <span className={labelCls}>Travellers</span>
        <span className={valueCls}>{summarise(value)}</span>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 z-30 w-[min(288px,calc(100vw-2.5rem))] rounded-2xl border border-hair bg-panel-2 p-4 shadow-[0_26px_58px_-22px_rgb(13_27_42/0.17)] max-md:left-0">
          {PAX_ROWS.map(({ key, label, hint }) => {
            const [lo, hi] = bounds(key, draft);
            return (
              <div
                key={key}
                className="flex items-center justify-between gap-3 border-b border-hair py-2.5 first:pt-0 last:border-0 last:pb-0"
              >
                <span className="min-w-0">
                  <b className="block text-[14px] font-semibold tracking-tight">
                    {label}
                  </b>
                  <small className="text-[11.5px] text-fog-2">{hint}</small>
                </span>
                <span className="flex items-center gap-2.5">
                  <Step
                    sign="−"
                    label={`One fewer ${label.toLowerCase()}`}
                    onClick={() => nudge(key, -1)}
                    disabled={draft[key] <= lo}
                  />
                  <span className="w-4 text-center text-[15px] font-bold tabular-nums">
                    {draft[key]}
                  </span>
                  <Step
                    sign="+"
                    label={`One more ${label.toLowerCase()}`}
                    onClick={() => nudge(key, 1)}
                    disabled={draft[key] >= hi}
                  />
                </span>
              </div>
            );
          })}

          <p className="mt-3 text-[11.5px] text-fog-2">
            {MAX_SEATS - seated === 0
              ? "Aircraft is full at 9 seats."
              : `${MAX_SEATS - seated} of ${MAX_SEATS} seats still free.`}
          </p>

          <Button
            size="sm"
            className="mt-3 w-full"
            onClick={() => {
              onChange(draft);
              setOpen(false);
            }}
          >
            Apply Selection
          </Button>
        </div>
      )}
    </div>
  );
}

export default function Booker() {
  const [trip, setTrip] = useState<(typeof TRIPS)[number]>("One Way");
  const [from, setFrom] = useState(AIRPORTS[1]); // Jamnagar
  const [to, setTo] = useState(AIRPORTS[0]); // Mundra
  const [out, setOut] = useState(LAUNCH.iso);
  const [back, setBack] = useState("");
  const [pax, setPax] = useState<Pax>({ adults: 2, children: 0, infants: 0 });
  const [toast, setToast] = useState<string | null>(null);

  const roundTrip = trip === "Round Trip";

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  /* the two ends can never be the same airport — picking a duplicate swaps */
  const pickFrom = (v: string) => {
    if (v === to) setTo(from);
    setFrom(v);
  };
  const pickTo = (v: string) => {
    if (v === from) setFrom(to);
    setTo(v);
  };

  const search = () => {
    setToast(
      `${summarise(pax)} · ${from} ${roundTrip ? "⇄" : "→"} ${to}`,
    );
    setTimeout(() => setToast(null), 3200);
  };

  return (
    <>
      <div
        id="book"
        className="relative z-5 mt-11 scroll-mt-28 rounded-[20px] border border-accent/15 bg-linear-to-b from-panel-2/95 to-ink-2/95 p-4 shadow-[0_30px_64px_-34px_rgb(13_27_42/0.18),inset_0_1px_0_rgb(255_255_255/0.05)] backdrop-blur-xl"
      >
        {/* trip type + launch note */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hair px-1 pb-3.5">
          {/*
            Two presentations of one control. On a wide bar the pair sits as
            radios, which is what the rest of the row reads as. On a phone the
            row is full width and two radios leave a lot of dead space, so the
            same buttons become a segmented track: the dots drop away, the
            halves split the width, and a thumb slides under the live one.
            Nothing is duplicated — only the skin changes at the breakpoint.
          */}
          <div className="relative flex flex-wrap gap-1 max-md:w-full max-md:flex-nowrap max-md:gap-0 max-md:rounded-full max-md:border max-md:border-hair max-md:bg-tint max-md:p-1">
            {/*
              The sliding thumb, mobile only. The track is padded by 4px, so
              each half is (100% - 8px) / 2 = 50% - 4px wide, and translating
              the thumb by its own width lands it exactly on the second half.
            */}
            <span
              aria-hidden
              className={`pointer-events-none absolute top-1 bottom-1 left-1 hidden w-[calc(50%-0.25rem)] rounded-full bg-panel shadow-[0_2px_8px_-3px_rgb(13_27_42/0.25)] transition-transform duration-300 ease-out-soft max-md:block ${
                trip === "Round Trip" ? "translate-x-full" : "translate-x-0"
              }`}
            />

            {TRIPS.map((t) => {
              const on = trip === t;
              return (
                <button
                  key={t}
                  onClick={() => setTrip(t)}
                  aria-pressed={on}
                  className={`relative z-1 inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-all duration-250 max-md:flex-1 max-md:justify-center max-md:border-transparent max-md:bg-transparent max-md:py-1.5 ${
                    on
                      ? "border-accent/30 bg-accent/10 text-accent"
                      : "border-transparent text-fog hover:text-head"
                  }`}
                >
                  <span
                    className={`size-3 rounded-full border-[1.5px] transition-all duration-250 max-md:hidden ${
                      on
                        ? "border-accent bg-accent shadow-[inset_0_0_0_2.5px_#0d1b2a]"
                        : "border-[#b9c6d4]"
                    }`}
                  />
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* fields */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)_auto] items-stretch gap-2 pt-3.5 max-xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] max-md:grid-cols-1">
          <AirportSelect
            label="Departure"
            value={from}
            options={AIRPORTS}
            onChange={pickFrom}
          />

          <div className="flex items-center justify-center">
            {/* Drawn rather than the "⇄" character, which fell back to
                whatever each platform had and came out at a different weight
                from everything around it. The two arrows are 180° rotationally
                symmetric, so the spin on hover reads as the swap itself.

                Both shafts span 5 to 19, so they share the box's centre line;
                the earlier pair sat on centres of 10.5 and 13.5, which read as
                lopsided however carefully the rest was drawn.

                The shafts sit 8 apart rather than 6: at 6 the arrowheads
                reached past the centre line into each other's half and the
                pair read as one crowded mark. At 8 there is a clear unit of
                daylight between the two shapes. */}
            <button
              type="button"
              onClick={swap}
              aria-label="Swap departure and arrival"
              className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full border border-accent/20 bg-panel-2 text-accent transition-[transform,background,border-color] duration-400 hover:rotate-180 hover:border-accent/45 hover:bg-accent/12 max-md:rotate-90 max-md:hover:rotate-270"
            >
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 8H19M15.5 4.5L19 8L15.5 11.5" />
                <path d="M19 16H5M8.5 12.5L5 16L8.5 19.5" />
              </svg>
            </button>
          </div>

          <AirportSelect
            label="Arrival"
            value={to}
            options={AIRPORTS}
            onChange={pickTo}
          />

          <div className="max-xl:col-span-3 max-md:col-span-1">
            <DateField
              label="Journey date"
              value={out}
              min={LAUNCH.iso}
              onChange={setOut}
            />
          </div>

          {/* on a one-way there is no return, so show a placeholder rather
              than a disabled date input rendering as "dd-----yyyy" */}
          <div className="max-xl:col-span-3 max-md:col-span-1">
            {roundTrip ? (
              <DateField
                label="Return date"
                value={back}
                min={out || LAUNCH.iso}
                onChange={setBack}
                placeholder="Add return"
                align="right"
              />
            ) : (
              <Field label="Return date" muted>
                <span className={`${valueCls} text-fog-2`}>Add return</span>
              </Field>
            )}
          </div>

          <div className="max-xl:col-span-3 max-md:col-span-1">
            <TravellerPicker value={pax} onChange={setPax} />
          </div>

          <Button
            onClick={search}
            size="sm"
            className="h-full px-5 max-xl:col-span-3 max-md:col-span-1 max-md:h-12 max-md:w-full"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            Search
          </Button>
        </div>
      </div>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.4, ease: [0.22, 0.9, 0.24, 1] }}
            className="fixed bottom-8 left-1/2 z-200 max-w-[90vw] -translate-x-1/2 rounded-full bg-accent px-6 py-3.5 text-center text-sm font-bold text-[#0d1b2a] shadow-[0_18px_40px_-14px_rgb(58_160_238/0.75)]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
