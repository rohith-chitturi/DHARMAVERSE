"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles, Activity, ShieldAlert, Zap, Compass, TreeDeciduous } from "lucide-react";
import { dharmaScenarios } from "@/data/dharmaScenarios";
import { DharmaDecisionOption, DharmaProfile, DharmaDecision } from "@/data/types";
import { calculateDharmaProfile } from "@/utils/dharmaEngine";
import { useSettings } from "@/context/SettingsContext";
import { submitDharmaProfile } from "@/app/actions/dharma";

const SCENARIO_COUNT = 7;

export default function DharmaMirror() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<DharmaDecisionOption[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [profile, setProfile] = useState<DharmaProfile | null>(null);
  const [history, setHistory] = useState<DharmaProfile[]>([]);
  const { t, settings } = useSettings();

  // Randomly select scenarios on mount
  const sessionScenarios = useMemo(() => {
    const shuffled = [...dharmaScenarios].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, SCENARIO_COUNT);
  }, []);

  useEffect(() => {
    // Load history
    const saved = localStorage.getItem("dharmaHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const handleOptionSelect = (option: DharmaDecisionOption) => {
    const newOptions = [...selectedOptions, option];
    setSelectedOptions(newOptions);
    
    if (currentStep < SCENARIO_COUNT - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      generateProfile(newOptions);
    }
  };

  const generateProfile = async (finalOptions: DharmaDecisionOption[]) => {
    setIsGenerating(true);
    
    setTimeout(async () => {
      const newProfile = calculateDharmaProfile(finalOptions, history);
      const newHistory = [...history, newProfile];
      localStorage.setItem("dharmaHistory", JSON.stringify(newHistory));
      
      // Attempt to save to Cosmic Archive (fails silently if guest)
      try {
        await submitDharmaProfile(newProfile);
      } catch (e) {
        // Guest mode or network error, ignore
      }

      setProfile(newProfile);
      setHistory(newHistory);
      setIsGenerating(false);
    }, 4000); // Cinematic generation delay
  };

  const currentScenario = sessionScenarios[currentStep];

  if (profile) {
    return <ProfileView profile={profile} history={history} />;
  }

  return (
    <div className="min-h-screen bg-[#020305] text-white flex flex-col relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-[#020305] to-[#020305] pointer-events-none"></div>
      
      <nav className="relative z-50 p-6">
        <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold w-fit">
          <ArrowLeft className="w-4 h-4" /> {t("mirror.leave")}
        </Link>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        <AnimatePresence mode="wait">
          {!hasStarted && !isGenerating && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 1.5 }}
              className="text-center max-w-2xl"
            >
              <Sparkles className="w-12 h-12 text-primary/50 mx-auto mb-8 animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-serif text-white uppercase tracking-widest mb-6 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                {t("mirror.title")}
              </h1>
              <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed mb-12 tracking-wide">
                {t("mirror.subtitle")}
              </p>
              <button 
                onClick={() => setHasStarted(true)}
                className="group relative bg-primary/10 border border-primary/30 text-primary px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)] overflow-hidden"
              >
                <span className="relative z-10">{t("mirror.gaze")}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            </motion.div>
          )}

          {hasStarted && !isGenerating && currentScenario && (
            <motion.div 
              key={`step-${currentStep}`}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full max-w-4xl"
            >
              <div className="text-center mb-16">
                <p className="text-[10px] text-primary uppercase tracking-[0.4em] mb-8 font-bold">
                  Reflection {currentStep + 1} of {SCENARIO_COUNT}
                </p>
                <h2 className="text-2xl md:text-4xl font-serif text-white leading-relaxed tracking-wide">
                  "{currentScenario.scenario[settings.language] || currentScenario.scenario['en']}"
                </h2>
              </div>

              <div className="space-y-6">
                {currentScenario.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(opt)}
                    className="w-full text-left p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/50 hover:bg-white/[0.05] transition-all group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <p className="text-lg md:text-xl text-white/80 font-light relative z-10 group-hover:text-white transition-colors duration-500">
                      {opt.text[settings.language] || opt.text['en']}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {isGenerating && (
            <motion.div 
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-12">
                <div className="absolute inset-0 border border-primary/20 rounded-full animate-ping duration-[3s]"></div>
                <div className="absolute inset-4 border border-primary/40 rounded-full animate-spin duration-[4s] reverse"></div>
                <div className="absolute inset-8 border border-primary/60 rounded-full animate-spin duration-[5s]"></div>
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary animate-pulse" />
              </div>
              <p className="text-sm text-primary uppercase tracking-[0.4em] font-bold animate-pulse">
                Distilling Your Dharma
              </p>
              <div className="mt-8 space-y-4 text-xs tracking-widest text-white/40 uppercase font-mono">
                <p className="animate-[fade-in_1s_ease-out]">Weighing Actions...</p>
                <p className="animate-[fade-in_2s_ease-out]">Consulting the Epic...</p>
                <p className="animate-[fade-in_3s_ease-out]">Forming Profile...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// -----------------------------------------------------
// PROFILE VIEW COMPONENT
// -----------------------------------------------------

function ProfileView({ profile, history }: { profile: DharmaProfile, history: DharmaProfile[] }) {
  // Sort vectors for display
  const sortedVectors = Object.entries(profile.scores)
    .sort((a, b) => b[1] - a[1])
    .filter(v => v[1] > 0);

  return (
    <div className="min-h-screen bg-[#05070A] text-white overflow-x-hidden pb-32">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
      
      <nav className="relative z-50 p-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold">
          <ArrowLeft className="w-4 h-4" /> Return to Universe
        </Link>
      </nav>

      <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10 pt-12">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24">
          <h3 className="text-xs text-primary uppercase tracking-[0.4em] font-bold mb-4">Your True Nature</h3>
          <h1 className="text-5xl md:text-7xl font-serif text-white uppercase tracking-widest mb-6">
            {profile.primaryArchetype}
          </h1>
          <p className="text-xl text-white/50 font-light tracking-wide max-w-2xl mx-auto">
            Secondary Alignment: <span className="text-white">{profile.secondaryArchetype}</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          
          {/* Core Traits */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-4 space-y-8">
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <h2 className="text-xs text-white/40 uppercase tracking-[0.3em] mb-8">Dharma Vectors</h2>
              
              <div className="space-y-6">
                {sortedVectors.slice(0, 5).map(([vector, score], i) => (
                  <div key={vector}>
                    <div className="flex justify-between items-end mb-2">
                      <span className={`text-sm uppercase tracking-widest ${i === 0 ? 'text-primary font-bold' : 'text-white/80'}`}>{vector}</span>
                      <span className="text-[10px] text-white/40 font-mono">{(score / 70 * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${i === 0 ? 'bg-primary shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'bg-white/30'}`} 
                        style={{ width: `${Math.min(100, Math.max(5, (score / 70) * 100))}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center">
                 <p className="text-[10px] text-green-500 uppercase tracking-widest mb-2">Core Strength</p>
                 <p className="text-xl font-bold uppercase tracking-widest">{profile.coreStrength}</p>
               </div>
               <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center">
                 <p className="text-[10px] text-red-500 uppercase tracking-widest mb-2">Core Weakness</p>
                 <p className="text-xl font-bold uppercase tracking-widest">{profile.coreWeakness}</p>
               </div>
            </div>
          </motion.div>

          {/* Character Resonance System */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-8 space-y-8">
            <h2 className="text-2xl font-serif text-white uppercase tracking-widest mb-6 px-2 flex items-center gap-3">
              <Activity className="text-primary" /> Character Resonance
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.characterResonance.map((res, i) => (
                <div key={i} className="bg-[#0A0D14] border border-white/5 rounded-3xl p-8 hover:border-primary/30 transition-colors group">
                  <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-2 capitalize">
                    {res.characterId.replace('-', ' ')}
                  </h3>
                  <p className="text-xs text-primary uppercase tracking-[0.2em] mb-4">{res.trait}</p>
                  <p className="text-white/70 font-light leading-relaxed group-hover:text-white transition-colors">
                    {res.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Your Kurukshetra */}
            <div className="bg-gradient-to-br from-red-900/10 to-transparent border border-red-900/30 rounded-3xl p-8 md:p-12 relative overflow-hidden mt-8">
              <ShieldAlert className="absolute -bottom-12 -right-12 w-64 h-64 text-red-500/5 rotate-12" />
              <h2 className="text-2xl font-serif text-white uppercase tracking-widest mb-4 relative z-10 flex items-center gap-3">
                <Zap className="text-red-500" /> Your Kurukshetra
              </h2>
              <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] mb-6 relative z-10">The Ultimate Internal Conflict</p>
              <p className="text-xl text-white/90 font-light leading-relaxed relative z-10">
                {profile.yourKurukshetra}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Dharma Evolution Tree */}
        {history.length > 1 && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="border-t border-white/10 pt-24 mb-24">
            <div className="text-center mb-16">
              <TreeDeciduous className="w-12 h-12 text-primary/50 mx-auto mb-4" />
              <h2 className="text-3xl font-serif text-white uppercase tracking-widest mb-2">Dharma Evolution</h2>
              <p className="text-white/50 font-light tracking-wide">How your soul has shifted over time.</p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-8 relative">
              <div className="absolute top-1/2 left-10 right-10 h-px bg-white/10 -z-10 hidden md:block"></div>
              {history.map((h, i) => (
                <div key={h.id} className="bg-[#0A0D14] border border-white/5 rounded-2xl p-6 w-64 relative">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4">
                    {new Date(h.timestamp).toLocaleDateString()}
                  </p>
                  <p className="text-lg font-bold text-white uppercase tracking-widest mb-1">{h.primaryArchetype}</p>
                  <p className="text-xs text-primary uppercase tracking-[0.2em]">{h.coreStrength} Dominant</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
