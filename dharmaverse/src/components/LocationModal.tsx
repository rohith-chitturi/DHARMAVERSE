import { MapLocation, MapEra } from "@/data/mapData";
import { characters, moments } from "@/data/lore";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Users, Zap, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

interface LocationModalProps {
  location: MapLocation | null;
  era: MapEra | null;
  presentCharacters: string[];
  presentEvents: string[];
  onClose: () => void;
}

export default function LocationModal({ location, era, presentCharacters, presentEvents, onClose }: LocationModalProps) {
  const { t } = useSettings();

  if (!location || !era) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed bottom-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[600px] bg-[#080B12]/95 backdrop-blur-2xl border-t md:border border-white/10 md:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-50 overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className={`p-6 border-b border-white/10 bg-gradient-to-br ${era.worldState} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary font-bold mb-1 flex items-center gap-2">
                <MapPin className="w-3 h-3" /> {location.region}
              </p>
              <h2 className="text-3xl font-serif uppercase tracking-widest text-white">{location.name}</h2>
              <p className="text-sm text-white/50 mt-2 font-light">{location.description}</p>
            </div>
            <button onClick={onClose} className="p-2 text-white/50 hover:text-white bg-black/30 rounded-full hover:bg-black/50 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
              <Users className="w-4 h-4" /> Who is here ({era.title})
            </h3>
            
            {presentCharacters.length === 0 ? (
              <p className="text-white/30 text-sm italic">No major figures present.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {presentCharacters.map(charId => {
                  const char = characters.find(c => c.id === charId);
                  if (!char) return null;
                  return (
                    <Link 
                      key={charId} 
                      href={`/characters/${char.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                        <img src={char.image} alt={char.name} className={`w-full h-full object-cover ${char.objectPosition}`} />
                      </div>
                      <span className="text-sm uppercase tracking-widest text-white/70 group-hover:text-primary transition-colors truncate">
                        {char.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
              <Zap className="w-4 h-4" /> Relevant Events
            </h3>
            
            {presentEvents.length === 0 ? (
              <p className="text-white/30 text-sm italic">No major events recorded in this era.</p>
            ) : (
              <div className="space-y-3">
                {presentEvents.map(eventId => {
                  const event = moments.find(m => m.id === eventId);
                  if (!event) return null;
                  return (
                    <div key={eventId} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-base uppercase tracking-widest text-white font-bold">{event.title}</h4>
                        <Link href={`/moments`} className="text-xs text-primary hover:text-white transition-colors flex items-center gap-1">
                          Explore <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                      <p className="text-sm text-white/60 mb-4">{event.description}</p>
                      
                      {event.eventConsciousness && (
                        <Link 
                          href={`/experience/${event.id}`}
                          className="inline-block w-full text-center px-4 py-2 border border-primary/50 text-primary hover:bg-primary hover:text-black transition-colors uppercase tracking-widest text-xs font-bold rounded-lg"
                        >
                          Enter Simulation
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
