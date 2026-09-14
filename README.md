# AeroTaxi

On-demand private air taxi landing page — yellow-on-black theme built around the
top-down aircraft render in `public/plane.png`.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 |
| Language | TypeScript 7 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Animation | Motion 13 (`motion/react`) |
| Fonts | Sora + Inter via `next/font/google` |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`.

## Layout

```
app/
  globals.css     design tokens (@theme), keyframes, base styles, custom utilities
  layout.tsx      fonts + metadata
  page.tsx        composes the sections
components/
  Navbar.tsx      sticky nav, scroll state, mobile sheet
  Hero.tsx        headline, plane, stat chips, booker, brand marquee
  Booker.tsx      trip type / route / date / passengers search bar
  Counter.tsx     scroll-triggered count-up
  Reveal.tsx      scroll-in fade + lift wrapper
  Sections.tsx    Features, Fleet, Routes, Steps, Reviews, CTA, Footer
  ui.tsx          Button / ButtonLink / Eyebrow / Hl primitives
public/plane.png  hero aircraft
```

## Theming

All colours live as tokens in the `@theme` block of `app/globals.css` —
`--color-gold`, `--color-ink`, `--color-panel`, `--color-fog` and friends.
Change the palette there and it propagates through every `text-gold`,
`bg-ink`, `border-gold/30` utility in the app.
