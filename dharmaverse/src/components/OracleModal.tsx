"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Character } from "@/data/types";
import { X, Network, Activity } from "lucide-react";
import { useCompletion } from "ai/react";

interface OracleModalProps {
  sourceCharacter: Character;
  targetCharacterId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function OracleModal({ sourceCharacter, targetCharacterId, isOpen, onClose }: OracleModalProps) {
  const [targetChar, setTargetChar] = useState<Character | null>(null);

  // Use completion to fetch the Relationship Oracle insight
  const { completion, complete, isLoading, setCompletion } = useCompletion({
    api: "/api/oracle",
  });

  // Fetch target character details from API or local data (assuming we can pass it, but for simplicity let's just trigger complete)
  useEffect(() => {
    if (isOpen && targetCharacterId) {
      setCompletion(""); // clear previous
      complete("", {
        body: {
          sourceId: sourceCharacter.id,
          targetId: targetCharacterId
        }
      });
    }
  }, [isOpen, targetCharacterId]);

  if (!isOpen) return null;

  const relationData = sourceCharacter.relationships.find(r => r.id === targetCharacterId);

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
          className="relative w-full max-w-4xl bg-[#0A0D14] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.15)] flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5 z-20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full border border-primary/30">
                <Network className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-widest leading-none">Relationship Oracle</h3>
                <p className="text-xs text-muted uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
                  <Activity className="w-3 h-3 text-primary" /> Analyzing Graph Node
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content Area */}
          <div className="p-8 md:p-12 overflow-y-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
              <div className="text-center">
                <h4 className="text-3xl font-black text-white uppercase tracking-widest">{sourceCharacter.name}</h4>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full animate-ping"></div>
                </div>
                <p className="text-xs text-primary uppercase tracking-[0.3em] mt-2 font-bold">{relationData?.relation}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1">Strength: {relationData?.strength}/100</p>
              </div>

              <div className="text-center">
                <h4 className="text-3xl font-black text-white uppercase tracking-widest">{relationData?.name}</h4>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 via-white/10 to-transparent"></div>
              
              {isLoading && !completion && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Network className="w-12 h-12 text-primary/50 animate-pulse mb-6" />
                  <p className="text-lg text-white/50 font-light tracking-widest uppercase">Consulting the Akashic Graph...</p>
                </div>
              )}

              {completion && (
                <div className="prose prose-invert max-w-none text-white/80 font-light leading-relaxed space-y-6 text-lg">
                  {completion.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="pl-6 border-l border-transparent hover:border-primary/30 transition-colors">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
