"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chamberScenarios, ScenarioContext } from "@/data/chamberScenarios";
import { characters } from "@/data/lore";
import { useSettings } from "@/context/SettingsContext";
import { Play, Pause, FastForward, User, Eye, ArrowRight, DoorOpen } from "lucide-react";
import Image from "next/image";

type Turn = {
  speaker: string;
  speakerName: string;
  text: string;
  emotionalState?: string;
};

export default function NarrativeChamber() {
  const { settings, t } = useSettings();
  
  // Phase States
  const [phase, setPhase] = useState<"SELECTION" | "INTRO" | "SIMULATION">("SELECTION");
  
  // Scenario State
  const [selectedScenario, setSelectedScenario] = useState<ScenarioContext | null>(null);
  const [activeChars, setActiveChars] = useState<any[]>([]);
  
  // Simulation State
  const [turns, setTurns] = useState<Turn[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState<"OBSERVER" | "PARTICIPANT">("OBSERVER");
  const [speed, setSpeed] = useState<"NORMAL" | "FAST" | "CINEMATIC">("NORMAL");
  const [isPaused, setIsPaused] = useState(false);
  const [introText, setIntroText] = useState("");
  const [userIntervention, setUserIntervention] = useState("");
  const [completed, setCompleted] = useState(false);
  
  const endOfChatRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [turns]);

  const handleStartScenario = (scenario: ScenarioContext) => {
    setSelectedScenario(scenario);
    setActiveChars(scenario.activeCharacters.map(id => characters.find(c => c.id === id)).filter(Boolean));
    setPhase("INTRO");
    runIntro();
  };

  const runIntro = async () => {
    const steps = [
      "Opening the Akashic Records...",
      "Synchronizing Timeline...",
      "Gathering Consciousnesses...",
      "Restoring Historical Memory...",
      "Chamber Ready."
    ];
    for (let step of steps) {
      setIntroText(step);
      await new Promise(r => setTimeout(r, 1200));
    }
    setPhase("SIMULATION");
    generateNextTurn([]);
  };

  const generateNextTurn = async (currentTurns: Turn[], userMsg?: string) => {
    if (!selectedScenario || completed || isPaused) return;
    
    if (currentTurns.length >= selectedScenario.maxTurns) {
      setCompleted(true);
      return;
    }

    setIsGenerating(true);
    
    try {
      const res = await fetch("/api/chamber", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioId: selectedScenario.scenarioId,
          chamberMemory: { recentStatements: currentTurns },
          userMessage: userMsg,
          mode: mode,
          settings: settings
        })
      });
      
      const data = await res.json();
      setTurns(prev => [...prev, data]);
      
      // Auto-trigger next turn if observer and not paused
      if (mode === "OBSERVER" && !isPaused && currentTurns.length + 1 < selectedScenario.maxTurns) {
        const delay = speed === "FAST" ? 1000 : speed === "CINEMATIC" ? 5000 : 3000;
        setTimeout(() => generateNextTurn([...currentTurns, data]), delay);
      } else if (currentTurns.length + 1 >= selectedScenario.maxTurns) {
        setCompleted(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNextTurnManual = () => {
    if (!isGenerating && !completed) {
      generateNextTurn(turns);
    }
  };

  const handleParticipantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userIntervention.trim() || isGenerating) return;
    
    const newTurn = { speaker: "user", speakerName: "You (Observer)", text: userIntervention };
    setTurns(prev => [...prev, newTurn]);
    generateNextTurn([...turns, newTurn], userIntervention);
    setUserIntervention("");
  };

  // --- UI RENDERING ---

  if (phase === "SELECTION") {
    return (
      <div className="min-h-screen bg-[#080B12] text-white pt-32 px-6 flex flex-col items-center">
        <h1 className="text-5xl font-serif tracking-widest uppercase mb-4 text-center">{t('chamber.title') || "Akashic Narrative Chamber"}</h1>
        <p className="text-white/50 tracking-[0.2em] mb-16 text-center max-w-2xl">Witness history unfold as pure consciousness recreating itself in real-time. Select a scenario from the records.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          {chamberScenarios.map(s => (
            <button 
              key={s.scenarioId} 
              onClick={() => handleStartScenario(s)}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-primary/50 text-left transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <p className="text-xs text-primary uppercase tracking-[0.3em] font-bold mb-2">{s.timelineState}</p>
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-4 group-hover:text-primary transition-colors">{s.title}</h3>
              <p className="text-white/60 font-light mb-6 line-clamp-3">{s.description}</p>
              <div className="flex -space-x-4">
                {s.activeCharacters.map(charId => {
                  const char = characters.find(c => c.id === charId);
                  if (!char) return null;
                  return (
                    <div key={charId} className="w-10 h-10 rounded-full border-2 border-[#080B12] overflow-hidden">
                      <img src={char.image} alt={char.name} className={`w-full h-full object-cover ${char.objectPosition}`} />
                    </div>
                  );
                })}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === "INTRO") {
    return (
      <div className="min-h-screen bg-[#0A0D14] text-white flex flex-col items-center justify-center">
        <div className="relative w-32 h-32 mb-12">
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-4 border-white/20 border-b-transparent rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full animate-ping"></div>
        </div>
        <AnimatePresence mode="wait">
          <motion.h2 
            key={introText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-2xl md:text-3xl font-light tracking-[0.4em] uppercase text-primary/80"
          >
            {introText}
          </motion.h2>
        </AnimatePresence>
      </div>
    );
  }

  // SIMULATION PHASE
  const activeSpeakerId = isGenerating ? "generating" : turns.length > 0 ? turns[turns.length - 1].speaker : null;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0505] to-black"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-primary/5 blur-[150px]"></div>
      </div>

      {/* Header Controls */}
      <div className="relative z-20 flex justify-between items-center p-6 bg-gradient-to-b from-black to-transparent">
        <div>
          <h2 className="text-xl font-bold tracking-widest uppercase text-white/90">{selectedScenario?.title}</h2>
          <p className="text-xs tracking-[0.3em] text-primary">{selectedScenario?.timelineState}</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setMode(mode === "OBSERVER" ? "PARTICIPANT" : "OBSERVER")} className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors text-xs uppercase tracking-widest">
            {mode === "OBSERVER" ? <Eye className="w-4 h-4" /> : <User className="w-4 h-4" />}
            {mode === "OBSERVER" ? t('chamber.observer') : t('chamber.participant')}
          </button>
          <div className="w-px h-6 bg-white/20"></div>
          <button onClick={() => setSpeed(speed === "NORMAL" ? "FAST" : speed === "FAST" ? "CINEMATIC" : "NORMAL")} className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-white">
            <FastForward className="w-4 h-4" /> {t(`chamber.speed.${speed.toLowerCase()}`) || speed}
          </button>
          <div className="w-px h-6 bg-white/20"></div>
          <button onClick={() => setPhase("SELECTION")} className="flex items-center gap-2 text-xs uppercase tracking-widest text-red-400 hover:text-red-300">
            <DoorOpen className="w-4 h-4" /> {t('chamber.exit')}
          </button>
        </div>
      </div>

      {/* Cinematic Chamber Room (Semi-circle) */}
      <div className="relative z-10 flex-1 flex flex-col justify-between pt-10">
        
        {/* Character Stage */}
        <div className="flex justify-center items-end gap-4 md:gap-12 px-6 h-48 mb-8">
          {activeChars.map(char => {
            const isActive = char.id === activeSpeakerId;
            return (
              <div key={char.id} className={`relative flex flex-col items-center transition-all duration-1000 ${isActive ? 'scale-125 z-20' : 'scale-90 opacity-40 z-10 grayscale blur-[1px]'}`}>
                {isActive && <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>}
                <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 ${isActive ? 'border-primary shadow-[0_0_30px_rgba(212,175,55,0.4)]' : 'border-white/20'}`}>
                  <img src={char.image} alt={char.name} className={`w-full h-full object-cover ${char.objectPosition}`} />
                </div>
                <p className={`mt-4 font-bold uppercase tracking-widest text-xs md:text-sm transition-colors ${isActive ? 'text-primary' : 'text-white/50'}`}>{char.name}</p>
              </div>
            );
          })}
        </div>

        {/* Dialogue Stream */}
        <div className="flex-1 overflow-y-auto px-6 md:px-24 pb-32">
          <div className="max-w-4xl mx-auto space-y-12">
            {turns.map((turn, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${turn.speaker === 'user' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-primary text-xs uppercase tracking-[0.3em] mb-2 font-bold">{turn.speakerName}</span>
                <p className={`text-xl md:text-2xl font-light leading-relaxed ${turn.speaker === 'user' ? 'text-white/80' : 'text-white'}`}>
                  "{turn.text}"
                </p>
              </motion.div>
            ))}
            
            {isGenerating && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </motion.div>
            )}
            <div ref={endOfChatRef} />
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black to-transparent z-20 flex flex-col items-center">
        
        {mode === "OBSERVER" && !completed && (
          <div className="flex items-center gap-6">
            <button 
              onClick={() => {
                setIsPaused(!isPaused);
                if (isPaused && !isGenerating) generateNextTurn(turns);
              }} 
              className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
            >
              {isPaused ? <Play className="w-6 h-6 text-white" /> : <Pause className="w-6 h-6 text-white" />}
            </button>
            <button 
              onClick={handleNextTurnManual}
              disabled={isGenerating || !isPaused}
              className="px-8 py-4 rounded-full bg-primary text-black font-bold uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
            >
              {t('chamber.next')} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {mode === "PARTICIPANT" && !completed && (
          <form onSubmit={handleParticipantSubmit} className="w-full max-w-3xl relative">
            <input 
              type="text" 
              value={userIntervention}
              onChange={e => setUserIntervention(e.target.value)}
              placeholder={t('chamber.yourResponse') || "What would you say?"}
              disabled={isGenerating}
              className="w-full bg-white/10 border border-white/20 rounded-full py-4 px-8 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
            />
            <button type="submit" disabled={isGenerating || !userIntervention.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary text-black rounded-full disabled:opacity-50">
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}

        {completed && (
          <div className="text-center">
            <p className="text-primary tracking-widest uppercase mb-4">Historical Sequence Complete.</p>
            <button onClick={() => setPhase("SELECTION")} className="px-8 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-black transition-colors uppercase tracking-widest text-sm font-bold">
              Return to Records
            </button>
          </div>
        )}

        <div className="mt-4 text-xs text-white/30 tracking-[0.3em] uppercase">
          Turn {turns.length} / {selectedScenario?.maxTurns}
        </div>
      </div>
    </div>
  );
}
