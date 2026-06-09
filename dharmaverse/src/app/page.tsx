import HeroCarousel from "@/components/HeroCarousel";
import EpicTrailer from "@/components/EpicTrailer";
import ChooseJourney from "@/components/ChooseJourney";
import CharacterMatch from "@/components/CharacterMatch";
import LegendaryMoments from "@/components/LegendaryMoments";
import ScrollEpic from "@/components/ScrollEpic";
import PerspectiveEngine from "@/components/PerspectiveEngine";
import LivingUniverse from "@/components/LivingUniverse";
import LegendaryVoices from "@/components/LegendaryVoices";
import FeatureShowcase from "@/components/FeatureShowcase";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <HeroCarousel />
      <EpicTrailer />
      <ChooseJourney />
      <CharacterMatch />
      <LegendaryMoments />
      <ScrollEpic />
      <PerspectiveEngine />
      <LivingUniverse />
      <LegendaryVoices />
      <FeatureShowcase />
      <FinalCTA />
    </main>
  );
}
