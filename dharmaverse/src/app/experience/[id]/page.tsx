"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { moments, characters } from "@/data/lore";
import { Activity, ShieldAlert, Cpu, GitBranch, ArrowLeft, HeartPulse, History } from "lucide-react";
import Link from "next/link";
import EventCharacterModal from "@/components/EventCharacterModal";

export default function SimulationChamber() {
  const params = useParams();
  const moment = moments.find(m => m.id === params.id);
  
  const [initStep, setInitStep] = useState(0); // 0 to 4 for loading
  const [isReady, setIsReady] = useState(false);
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);

  useEffect(() => {
    if (!moment) return;
    
    // Simulate complex synchronization
    const timers = [
      setTimeout(() => setInitStep(1), 800),
      setTimeout(() => setInitStep(2), 1600),
      setTimeout(() => setInitStep(3), 2400),
      setTimeout(() => setInitStep(4), 3200),
      setTimeout(() => setIsReady(true), 4000)
    ];

    return () => timers.forEach(clearTimeout);
  }, [moment]);

  if (!moment) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Simulation Data Corrupted.</div>;

  const eventConsciousness = moment.eventConsciousness;
  if (!eventConsciousness) return <div className="min-h-screen bg-black text-white flex items-center justify-center">No Event Consciousness data available.</div>;

  const activeCharacters = eventConsciousness.activeCharacters.map(id => characters.find(c => c.id === id)).filter(Boolean);

  // Determine global color grading based on eventEmotion
  const emotionColor = eventConsciousness.eventEmotion === "Tragic Tension" ? "amber-500" : "primary";

  if (!isReady) {
    return (
      <div className="min-h-screen bg-[#05070A] flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${moment.theme} opacity-10 animate-pulse duration-1000`}></div>
        
        <div className="relative w-48 h-48 mb-12">
          <div className="absolute inset-0 border border-white/10 rounded-full animate-ping duration-1000 opacity-20"></div>
          <div className={`absolute inset-4 border-2 border-t-${emotionColor} border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin`}></div>
          <div className={`absolute inset-8 border-2 border-b-${emotionColor} border-r-transparent border-t-transparent border-l-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]`}></div>
          <Cpu className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-${emotionColor} animate-pulse`} />
        </div>

        <h1 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-widest mb-8">
          The Living Epic Engine
        </h1>

        <div className="space-y-4 text-sm md:text-base tracking-[0.3em] uppercase text-white/50 font-mono w-full max-w-md text-left bg-black/40 p-6 rounded-lg border border-white/5">
          <p className="animate-[fade-in_0.5s_ease-out]">
            <span className="text-green-500 mr-2">[OK]</span> Neural Handshake Established.
          </p>
          {initStep >= 1 && <p className="animate-[fade-in_0.5s_ease-out]"><span className="text-green-500 mr-2">[OK]</span> Synchronizing World State...</p>}
          {initStep >= 2 && <p className="animate-[fade-in_0.5s_ease-out]"><span className="text-green-500 mr-2">[OK]</span> Applying Tensions: {eventConsciousness.eventTensions.length} Nodes</p>}
          {initStep >= 3 && <p className="animate-[fade-in_0.5s_ease-out]"><span className="text-green-500 mr-2">[OK]</span> Loading Consciousnesses: {activeCharacters.length} Entities</p>}
          {initStep >= 4 && <p className={`animate-[fade-in_0.5s_ease-out] text-${emotionColor} font-bold`}>► Event Simulation Ready.</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070A] text-white overflow-x-hidden pb-32">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black to-transparent">
        <Link href={`/moments/${moment.id}`} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold">
          <ArrowLeft className="w-4 h-4" /> Abort Simulation
        </Link>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-500 font-mono border border-amber-500/30 bg-amber-500/10 px-4 py-2 rounded-full">
            <ShieldAlert className="w-4 h-4" /> Historical Stability: 94%
          </div>
          <div className={`flex items-center gap-2 text-xs uppercase tracking-widest text-${emotionColor} font-mono border border-${emotionColor}/30 bg-${emotionColor}/10 px-4 py-2 rounded-full`}>
            <HeartPulse className="w-4 h-4 animate-pulse" /> Event Pulse: Critical
          </div>
        </div>
      </nav>

      {/* Global Environment Gradient based on Emotion */}
      <div className={`fixed inset-0 bg-gradient-to-br ${moment.theme} opacity-5 pointer-events-none z-0`}></div>

      <div className="max-w-[1600px] mx-auto pt-32 px-4 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: World State & Tensions */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <h2 className="text-xs text-primary uppercase tracking-[0.3em] font-bold mb-2">Simulation Chamber</h2>
            <h1 className="text-4xl font-serif uppercase tracking-widest mb-6">{moment.title}</h1>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-[10px] text-white/50 uppercase tracking-[0.2em] mb-2">Location</h3>
                <p className="font-light">{moment.location}</p>
              </div>
              <div>
                <h3 className="text-[10px] text-white/50 uppercase tracking-[0.2em] mb-2">Political State</h3>
                <p className="font-light text-red-300">{eventConsciousness.worldState.politicalState}</p>
              </div>
              <div>
                <h3 className="text-[10px] text-white/50 uppercase tracking-[0.2em] mb-2">Dominant Emotion</h3>
                <p className={`font-bold text-${emotionColor} uppercase tracking-widest`}>{eventConsciousness.eventEmotion}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <h3 className="text-xs text-primary uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Active Tensions
            </h3>
            <ul className="space-y-4">
              {eventConsciousness.eventTensions.map((tension, i) => (
                <li key={i} className="text-sm font-light text-white/80 border-l border-primary/50 pl-4 py-1">
                  {tension}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* MIDDLE COLUMN: Active Consciousnesses (Characters) */}
        <div className="lg:col-span-8">
          <h3 className="text-sm text-white/50 uppercase tracking-[0.3em] font-bold mb-6 text-center">
            Synchronized Entities Present
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeCharacters.map((char: any) => {
              const objective = eventConsciousness.eventObjectives.find(o => o.characterId === char.id)?.objective;
              
              return (
                <div 
                  key={char.id} 
                  onClick={() => setSelectedCharId(char.id)}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-primary/50 transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-t ${char.theme} opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-white/10 group-hover:border-primary transition-colors z-10 relative">
                    <img src={char.image} alt={char.name} className={`w-full h-full object-cover ${char.objectPosition}`} />
                  </div>
                  <h4 className="text-xl font-bold uppercase tracking-widest z-10">{char.name}</h4>
                  <p className="text-[10px] text-primary uppercase tracking-[0.2em] mb-4 z-10">{char.archetype}</p>
                  
                  <div className="bg-black/40 border border-white/5 rounded-lg p-3 w-full z-10">
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Current Objective</p>
                    <p className="text-xs font-light text-white/80 leading-snug">{objective}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fate Threads Section */}
          <div className="mt-12 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <h3 className="text-xs text-primary uppercase tracking-[0.3em] font-bold mb-8 flex items-center gap-2">
              <GitBranch className="w-4 h-4" /> Critical Fate Threads
            </h3>
            
            <div className="space-y-8">
              {eventConsciousness.criticalDecisions.map((cd, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6 relative">
                  <div className="flex-1 bg-black/30 border border-white/10 rounded-xl p-6 relative">
                    <p className="text-[10px] text-primary uppercase tracking-widest mb-2">Historical Decision</p>
                    <p className="text-lg font-bold text-white leading-snug">{cd.decision}</p>
                  </div>
                  
                  {/* Connector */}
                  <div className="hidden md:flex items-center justify-center text-white/20">
                    →
                  </div>
                  
                  <div className="flex-1 bg-black/30 border border-white/10 rounded-xl p-6">
                    <p className="text-[10px] text-amber-500 uppercase tracking-widest mb-2">Immediate Consequence</p>
                    <p className="text-sm font-light text-white/80 leading-snug">{cd.consequence}</p>
                  </div>

                  {/* Connector */}
                  <div className="hidden md:flex items-center justify-center text-white/20">
                    →
                  </div>

                  <div className="flex-1 bg-black/30 border border-white/10 rounded-xl p-6">
                    <p className="text-[10px] text-red-400 uppercase tracking-widest mb-2">Future Impact</p>
                    <p className="text-sm font-light text-white/80 leading-snug">{cd.futureImpact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {selectedCharId && (
        <EventCharacterModal 
          character={characters.find(c => c.id === selectedCharId)!}
          eventConsciousness={eventConsciousness}
          momentTitle={moment.title}
          isOpen={!!selectedCharId}
          onClose={() => setSelectedCharId(null)}
        />
      )}
    </div>
  );
}
