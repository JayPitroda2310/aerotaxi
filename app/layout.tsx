import type { Metadata } from "next";
import CleanHash from "@/components/CleanHash";
import Navbar, { Logo } from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import { Inter, Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

/* Display face, used only for the oversized footer wordmark. */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aero Taxi — Regional Flights Across Gujarat",
  description:
    "Regional air taxi connections across Gujarat — Mundra, Vadodara, Jamnagar, Diu and Rajkot. Flying from 28 August 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/*
          Applies the stored theme before first paint so there is no flash,
          and turns off the browser's scroll restoration.

          Restoration is the other half of landing mid-page: reopening the
          site from history reinstated wherever the last visit had scrolled
          to, which read as the site opening on the route map. Set here rather
          than in an effect because the browser decides what to restore before
          React runs.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("aerotaxi-theme")||"light";document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}try{if("scrollRestoration" in history)history.scrollRestoration="manual"}catch(e){}`,
          }}
        />
      </head>
      <body>
        <CleanHash />
        <Navbar />
        {children}
        <Footer logo={<Logo />} />
      </body>
    </html>
  );
}
