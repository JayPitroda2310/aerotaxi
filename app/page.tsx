import FlightStrip from "@/components/FlightStrip";
import Hero from "@/components/Hero";
import { Features, Reviews, Routes, Steps } from "@/components/Sections";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Routes />
      <FlightStrip />
      <Steps />
      <Reviews />
    </main>
  );
}
