import HeroCarousel from "@/components/HeroCarousel";
import EpicTrailer from "@/components/EpicTrailer";
import ChooseJourney from "@/components/ChooseJourney";
import CharacterMatch from "@/components/CharacterMatch";
import LegendaryMoments from "@/components/LegendaryMoments";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <HeroCarousel />
      <EpicTrailer />
      <ChooseJourney />
      <CharacterMatch />
      <LegendaryMoments />
      {/* 
        Remaining sections to be built:
        - Scroll Through The Epic
        - Experience Every Perspective
        - Living Universe
        - Legendary Voices
        - Why DHARMAVERSE
        - Final CTA
      */}
    </main>
  );
}
