import HeroCarousel from "@/components/HeroCarousel";
import EpicTrailer from "@/components/EpicTrailer";
import ChooseJourney from "@/components/ChooseJourney";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <HeroCarousel />
      <EpicTrailer />
      <ChooseJourney />
    </main>
  );
}
