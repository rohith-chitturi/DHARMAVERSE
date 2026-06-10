"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Character, EventConsciousness } from "@/data/types";
import { X, MessageSquare, Cpu, Activity, Send, Target } from "lucide-react";
import { useChat } from "@ai-sdk/react";

interface EventCharacterModalProps {
  character: Character;
  eventConsciousness: EventConsciousness;
  momentTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventCharacterModal({ character, eventConsciousness, momentTitle, isOpen, onClose }: EventCharacterModalProps) {
  const [step, setStep] = useState<"MODE" | "INITIALIZING" | "CHAT">("MODE");
  const [selectedMode, setSelectedMode] = useState<string>("");

  const modes = [
    { id: "interrogate", label: "Interrogate Motives", desc: "Question their current objective" },
    { id: "seek-counsel", label: "Seek Event Counsel", desc: "Ask for their perspective on the situation" },
    { id: "challenge-dharma", label: "Challenge Dharma", desc: "Debate the righteousness of their actions" }
  ];

  const objective = eventConsciousness.eventObjectives.find(o => o.characterId === character.id)?.objective || "Survive the event.";

  // AI Chat hook
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/experience",
    body: {
      characterId: character.id,
      eventConsciousness,
      momentTitle,
      mode: selectedMode
    }
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setStep("MODE");
      setSelectedMode("");
    }
  }, [isOpen]);

  const handleModeSelect = (mode: string) => {
    setSelectedMode(mode);
    setStep("INITIALIZING");
    
    // Faster cinematic initialization since we are already in the simulation
    setTimeout(() => {
      setStep("CHAT");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        ></motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-[#080B12] border border-primary/20 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.15)] flex flex-col h-[85vh] md:h-[80vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5 z-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 relative">
                <div className={`absolute inset-0 bg-gradient-to-t ${character.theme} opacity-50`}></div>
                <img src={character.image} alt={character.name} className={`w-full h-full object-cover ${character.objectPosition}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-widest leading-none">{character.name}</h3>
                <p className="text-xs text-primary uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
                  <Activity className="w-3 h-3" /> Event-Synchronized Consciousness
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 relative overflow-hidden flex flex-col">
            <div className={`absolute inset-0 bg-gradient-to-br ${character.theme} opacity-5 pointer-events-none`}></div>

            <AnimatePresence mode="wait">
              {/* STEP 1: MODE */}
              {step === "MODE" && (
                <motion.div key="mode" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 p-8 md:p-12 overflow-y-auto">
                  <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-widest mb-2">Approach Entity</h2>
                  <p className="text-muted text-lg font-light mb-8">You are interacting with {character.name} during the events of <span className="text-primary font-bold">{momentTitle}</span>.</p>
                  
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12 flex items-start gap-4">
                    <Target className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-primary uppercase tracking-[0.2em] font-bold mb-1">Current Event Objective</p>
                      <p className="text-white/80 font-light">{objective}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {modes.map((mode) => (
                      <button 
                        key={mode.id}
                        onClick={() => handleModeSelect(mode.label)}
                        className="group text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10"
                      >
                        <MessageSquare className="w-8 h-8 text-white/50 mb-4 group-hover:text-primary transition-colors" />
                        <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-2 leading-snug">{mode.label}</h3>
                        <p className="text-white/60 text-sm">{mode.desc}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: INITIALIZING */}
              {step === "INITIALIZING" && (
                <motion.div key="init" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-serif text-white uppercase tracking-widest mb-4 animate-pulse">
                    Routing to Simulation Node
                  </h2>
                  <div className="space-y-2 text-xs tracking-[0.3em] uppercase text-white/50 font-mono">
                    <p className="animate-[fade-in_0.5s_ease-out]">Syncing World Memory...</p>
                    <p className="animate-[fade-in_1.0s_ease-out]">Injecting Tensions...</p>
                    <p className="animate-[fade-in_1.5s_ease-out] text-primary">Connection Live.</p>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: CHAT */}
              {step === "CHAT" && (
                <motion.div key="chat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col h-full bg-[#05070A]/50">
                  {/* Messages Area */}
                  <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                    {messages.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                        <MessageSquare className="w-12 h-12 mb-4" />
                        <p className="text-lg font-light tracking-wide max-w-md">You have approached {character.name}. They are focused on their objective. Choose your words carefully.</p>
                      </div>
                    )}
                    
                    {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-6 ${
                          m.role === 'user' 
                            ? 'bg-white/10 text-white rounded-br-sm' 
                            : 'bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-white/90 rounded-bl-sm shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
                        }`}>
                          {m.role === 'assistant' && (
                            <p className="text-[10px] text-primary uppercase tracking-[0.3em] mb-3 font-bold">{character.name}</p>
                          )}
                          <p className="leading-relaxed whitespace-pre-wrap font-light text-lg">{m.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl rounded-bl-sm p-6 flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Area */}
                  <div className="p-4 md:p-6 bg-[#080B12] border-t border-white/10">
                    <form onSubmit={handleSubmit} className="relative flex items-center">
                      <input
                        value={input}
                        onChange={handleInputChange}
                        placeholder={`Speak to ${character.name}...`}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-16 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors font-light"
                      />
                      <button 
                        type="submit" 
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 p-3 bg-primary text-black rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
