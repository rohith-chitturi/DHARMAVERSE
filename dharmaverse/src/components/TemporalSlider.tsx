import { MapEra } from "@/data/mapData";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

interface TemporalSliderProps {
  eras: MapEra[];
  activeEraId: string;
  onEraChange: (eraId: string) => void;
}

export default function TemporalSlider({ eras, activeEraId, onEraChange }: TemporalSliderProps) {
  const currentIndex = eras.findIndex(e => e.id === activeEraId);
  const { t } = useSettings();

  const handlePrev = () => {
    if (currentIndex > 0) onEraChange(eras[currentIndex - 1].id);
  };

  const handleNext = () => {
    if (currentIndex < eras.length - 1) onEraChange(eras[currentIndex + 1].id);
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-4 pointer-events-auto">
      <div className="bg-[#080B12]/80 backdrop-blur-xl border border-white/10 rounded-full p-2 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3 text-white/50 hover:text-white disabled:opacity-30 disabled:hover:text-white/50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex-1 text-center relative overflow-hidden h-10 flex items-center justify-center">
          <motion.div
            key={activeEraId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute"
          >
            <h3 className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
              {eras[currentIndex].title}
            </h3>
          </motion.div>
        </div>

        <button 
          onClick={handleNext}
          disabled={currentIndex === eras.length - 1}
          className="p-3 text-white/50 hover:text-white disabled:opacity-30 disabled:hover:text-white/50 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      
      {/* Narrative Context under slider */}
      <div className="text-center mt-4">
        <motion.p 
          key={`desc-${activeEraId}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs tracking-widest uppercase text-white/40 max-w-md mx-auto line-clamp-2"
        >
          {eras[currentIndex].description}
        </motion.p>
      </div>
    </div>
  );
}
