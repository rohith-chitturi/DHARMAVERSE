import FeatureShowcase from "@/components/FeatureShowcase";
import FinalCTA from "@/components/FinalCTA";

export default function AboutPage() {
  return (
    <div className="bg-[#080B12]">
      <div className="pt-32 pb-16 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif text-white tracking-widest uppercase mb-6 drop-shadow-lg">
          About <span className="text-gradient-gold">Dharmaverse</span>
        </h1>
        <p className="text-xl md:text-2xl font-light text-muted tracking-wide leading-relaxed">
          The Mahabharata is not a myth to be read. It is a reality to be lived. Dharmaverse was built to transform ancient text into a living, breathing cinematic universe.
        </p>
      </div>
      <FeatureShowcase />
      <FinalCTA />
    </div>
  );
}
