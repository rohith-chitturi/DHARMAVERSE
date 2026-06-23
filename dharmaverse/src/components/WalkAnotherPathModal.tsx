"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EpicEvent } from "@/data/types";
import { characters } from "@/data/lore";
import { X, Eye, GitBranch, ArrowRight } from "lucide-react";
import { useCompletion } from "@ai-sdk/react";

interface WalkAnotherPathModalProps {
  moment: EpicEvent;
  isOpen: boolean;
  onClose: () => void;
}

export default function WalkAnotherPathModal({ moment, isOpen, onClose }: WalkAnotherPathModalProps) {
  const [step, setStep] = useState<"CHARACTER" | "DECISION" | "OUTCOME">("CHARACTER");
  const [selectedCharId, setSelectedCharId] = useState<string>("");
  const [decision, setDecision] = useState<string>("");

  const eventCharacters = characters.filter(c => moment.characters.includes(c.id));
  const selectedCharacter = characters.find(c => c.id === selectedCharId);

  const { completion, complete, isLoading, setCompletion } = useCompletion({
    api: "/api/perspective",
  });

  const handleCharacterSelect = (id: string) => {
    setSelectedCharId(id);
    setStep("DECISION");
  };

  const handleDecisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decision.trim() || !selectedCharId) return;

    setStep("OUTCOME");
    setCompletion("");
    complete("", {
      body: {
        eventId: moment.id,
        characterId: selectedCharId,
        decision: decision
      }
    });
  };

  const handleReset = () => {
    setStep("CHARACTER");
    setSelectedCharId("");
    setDecision("");
    setCompletion("");
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
          className="relative w-full max-w-4xl bg-[#0A0D14] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.15)] flex flex-col h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5 z-20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full border border-primary/30">
                <GitBranch className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-widest leading-none">Walk Another Path</h3>
                <p className="text-xs text-muted uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
                  <Eye className="w-3 h-3 text-primary" /> Alternate Decision Engine
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 md:p-12 relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${moment.theme} opacity-5 pointer-events-none`}></div>

            <AnimatePresence mode="wait">
              {/* STEP 1: SELECT CHARACTER */}
              {step === "CHARACTER" && (
                <motion.div key="char" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-widest mb-2">Select Perspective</h2>
                  <p className="text-muted text-lg font-light mb-12">Whose destiny do you wish to alter during <span className="text-primary font-bold">{moment.title}</span>?</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {eventCharacters.map((char) => (
                      <button
                        key={char.id}
                        onClick={() => handleCharacterSelect(char.id)}
                        className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10"
                      >
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border border-white/20">
                          <img src={char.image} alt={char.name} className={`w-full h-full object-cover ${char.objectPosition} grayscale group-hover:grayscale-0 transition-all`} />
                        </div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-widest group-hover:text-primary transition-colors">{char.name}</h3>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: ENTER DECISION */}
              {step === "DECISION" && selectedCharacter && (
                <motion.div key="decision" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full justify-center max-w-2xl mx-auto text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-8 border border-primary/50 mx-auto shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                    <img src={selectedCharacter.image} alt={selectedCharacter.name} className={`w-full h-full object-cover ${selectedCharacter.objectPosition}`} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-widest mb-4">Rewrite Destiny</h2>
                  <p className="text-muted text-lg font-light mb-12">Instead of their historical action during <span className="text-primary font-bold">{moment.title}</span>, what should {selectedCharacter.name} do?</p>

                  <form onSubmit={handleDecisionSubmit} className="relative w-full">
                    <input
                      type="text"
                      value={decision}
                      onChange={(e) => setDecision(e.target.value)}
                      placeholder="e.g., Refuse to participate, Speak the truth, Draw their weapon..."
                      className="w-full bg-white/5 border border-white/20 rounded-xl py-6 px-8 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors text-lg font-light"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={!decision.trim()}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-primary text-black rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </button>
                  </form>
                  <button onClick={() => setStep("CHARACTER")} className="mt-8 text-white/50 text-sm tracking-widest uppercase hover:text-white">← Back to Perspectives</button>
                </motion.div>
              )}

              {/* STEP 3: OUTCOME */}
              {step === "OUTCOME" && selectedCharacter && (
                <motion.div key="outcome" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full relative">

                  <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-primary/50">
                      <img src={selectedCharacter.image} alt={selectedCharacter.name} className={`w-full h-full object-cover ${selectedCharacter.objectPosition}`} />
                    </div>
                    <div>
                      <p className="text-xs text-primary uppercase tracking-[0.3em] font-bold">The Butterfly Effect</p>
                      <h3 className="text-2xl font-bold text-white uppercase tracking-widest">{selectedCharacter.name}</h3>
                      <p className="text-white/50 italic mt-1 font-light">"{decision}"</p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-4">
                    {isLoading && !completion && (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="relative w-16 h-16 mb-6">
                          <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          <GitBranch className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary animate-pulse" />
                        </div>
                        <p className="text-lg text-white/50 font-light tracking-widest uppercase">Calculating alternate timeline ripples...</p>
                      </div>
                    )}

                    {completion && (
                      <div className="prose prose-invert max-w-none text-white/90 font-light leading-relaxed space-y-6 text-xl">
                        {completion.split('\n\n').map((paragraph, i) => (
                          <p key={i} className="pl-6 border-l-2 border-primary/30">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  {!isLoading && completion && (
                    <div className="mt-8 pt-6 border-t border-white/10 flex justify-center">
                      <button onClick={handleReset} className="px-8 py-3 rounded-full border border-white/20 text-white/70 hover:bg-white/10 transition-colors uppercase tracking-widest text-sm font-bold">
                        Simulate Another Path
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
