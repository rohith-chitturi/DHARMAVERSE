"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Character, ConsciousnessState } from "@/data/types";
import { X, Sparkles, MessageSquare, ShieldAlert, Cpu, Activity, Send } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { useSettings } from "@/context/SettingsContext";

interface AwakenModalProps {
  character: Character;
  isOpen: boolean;
  onClose: () => void;
}

export default function AwakenModal({ character, isOpen, onClose }: AwakenModalProps) {
  const [step, setStep] = useState<"TIMELINE" | "EMOTION" | "MODE" | "INITIALIZING" | "CHAT">("TIMELINE");
  
  // Selections
  const [selectedState, setSelectedState] = useState<ConsciousnessState | null>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<string>("");
  const [selectedMode, setSelectedMode] = useState<string>("");
  const { settings } = useSettings();

  const defaultEmotions = ["Confident", "Angry", "Reflective", "Broken", "Stoic"];
  const modes = [
    { id: "ask-freely", label: "Ask Freely", desc: "Open conversation" },
    { id: "seek-advice", label: "Seek Advice", desc: "Gain their perspective on your struggles" },
    { id: "discuss-event", label: "Discuss Event", desc: "Talk about their timeline" },
    { id: "challenge-beliefs", label: "Challenge Beliefs", desc: "Debate their core dharma" }
  ];

  // AI Chat hook
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/awaken",
    body: {
      characterId: character.id,
      stateId: selectedState?.id,
      emotion: selectedEmotion,
      mode: selectedMode,
      settings: settings
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
      setStep("TIMELINE");
      setSelectedState(null);
      setSelectedEmotion("");
      setSelectedMode("");
    }
  }, [isOpen]);

  const handleTimelineSelect = (state: ConsciousnessState) => {
    setSelectedState(state);
    setStep("EMOTION");
  };

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
    setStep("MODE");
  };

  const handleModeSelect = (mode: string) => {
    setSelectedMode(mode);
    setStep("INITIALIZING");
    
    // Simulate cinematic initialization
    setTimeout(() => {
      setStep("CHAT");
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          onClick={onClose}
        ></motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-[#080B12] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col h-[85vh] md:h-[80vh]"
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
                  <Activity className="w-3 h-3" /> Consciousness Engine
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
              {/* STEP 1: TIMELINE */}
              {step === "TIMELINE" && (
                <motion.div key="timeline" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 p-8 md:p-12 overflow-y-auto">
                  <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-widest mb-2">Select Timeline</h2>
                  <p className="text-muted text-lg font-light mb-12">The consciousness state is strictly bound to the temporal anchor. Future knowledge is inaccessible.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {character.consciousnessStates.map((state) => (
                      <button 
                        key={state.id}
                        onClick={() => handleTimelineSelect(state)}
                        className="group text-left p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10"
                      >
                        <h3 className="text-2xl font-bold text-white uppercase tracking-widest mb-2 group-hover:text-primary transition-colors">{state.label}</h3>
                        <p className="text-white/60 text-sm mb-4">Known Facts: {state.knownFacts.length}</p>
                        <div className="flex items-center gap-2 text-xs text-red-400 uppercase tracking-widest bg-red-900/20 w-fit px-3 py-1 rounded-full border border-red-900/50">
                          <ShieldAlert className="w-3 h-3" /> Strict Memory Lock
                        </div>
                      </button>
                    ))}
                    {character.consciousnessStates.length === 0 && (
                      <p className="text-red-500">Error: No consciousness states defined for this character.</p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: EMOTION */}
              {step === "EMOTION" && (
                <motion.div key="emotion" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 p-8 md:p-12 overflow-y-auto">
                  <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-widest mb-2">Override Emotional State</h2>
                  <p className="text-muted text-lg font-light mb-12">Current Default: <span className="text-primary">{selectedState?.emotionalState}</span></p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {defaultEmotions.map((emotion) => (
                      <button 
                        key={emotion}
                        onClick={() => handleEmotionSelect(emotion)}
                        className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all text-center text-lg text-white/80 hover:text-white uppercase tracking-widest font-bold"
                      >
                        {emotion}
                      </button>
                    ))}
                    <button 
                      onClick={() => handleEmotionSelect(selectedState?.emotionalState || "Neutral")}
                      className="p-6 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all text-center text-lg text-primary uppercase tracking-widest font-bold col-span-2 md:col-span-1"
                    >
                      Use Default
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: MODE */}
              {step === "MODE" && (
                <motion.div key="mode" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 p-8 md:p-12 overflow-y-auto">
                  <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-widest mb-2">Conversation Mode</h2>
                  <p className="text-muted text-lg font-light mb-12">Set the parameters of your interaction.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {modes.map((mode) => (
                      <button 
                        key={mode.id}
                        onClick={() => handleModeSelect(mode.label)}
                        className="group text-left p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10"
                      >
                        <MessageSquare className="w-8 h-8 text-white/50 mb-4 group-hover:text-primary transition-colors" />
                        <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-2">{mode.label}</h3>
                        <p className="text-white/60">{mode.desc}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: INITIALIZING */}
              {step === "INITIALIZING" && (
                <motion.div key="init" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="relative w-32 h-32 mb-8">
                    <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-2 border-white/20 border-b-transparent rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
                    <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-primary animate-pulse" />
                  </div>
                  <h2 className="text-2xl md:text-4xl font-serif text-white uppercase tracking-widest mb-4 animate-pulse">
                    Awakening Consciousness
                  </h2>
                  <div className="space-y-2 text-sm tracking-[0.3em] uppercase text-white/50 font-mono">
                    <p className="animate-[fade-in_0.5s_ease-out]">Synchronizing Temporal Anchor: {selectedState?.label}...</p>
                    <p className="animate-[fade-in_1.5s_ease-out]">Loading Graph Memories...</p>
                    <p className="animate-[fade-in_2.5s_ease-out]">Applying Emotional Override: {selectedEmotion}...</p>
                    <p className="animate-[fade-in_3.5s_ease-out] text-primary">Neural Link Established.</p>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: CHAT */}
              {step === "CHAT" && (
                <motion.div key="chat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col h-full bg-[#05070A]/50">
                  {/* Chat Info Bar */}
                  <div className="bg-white/5 border-b border-white/5 py-2 px-6 flex flex-wrap gap-4 text-xs font-mono uppercase tracking-widest text-white/50">
                    <span className="flex items-center gap-2"><Activity className="w-3 h-3 text-primary" /> {selectedState?.label}</span>
                    <span className="flex items-center gap-2"><Sparkles className="w-3 h-3 text-amber-500" /> {selectedEmotion}</span>
                    <span className="flex items-center gap-2"><MessageSquare className="w-3 h-3 text-blue-400" /> {selectedMode}</span>
                  </div>

                  {/* Messages Area */}
                  <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                    {messages.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                        <MessageSquare className="w-12 h-12 mb-4" />
                        <p className="text-lg font-light tracking-wide max-w-md">The neural link is open. Speak to {character.name}.</p>
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
