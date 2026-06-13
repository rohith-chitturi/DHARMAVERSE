"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, BookOpen, Brain, Zap } from "lucide-react";
import { useSettings, LanguageCode, ReadabilityMode, KnowledgeLevel } from "@/context/SettingsContext";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { settings, updateSettings, t } = useSettings();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#080B12] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Globe className="text-primary" /> {t("settings.title")}
            </h2>
            <button onClick={onClose} className="p-2 text-white/50 hover:text-white bg-white/5 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8 space-y-10">
            {/* Language */}
            <div>
              <h3 className="text-xs text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4" /> {t("settings.language")}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {(["en", "hi", "te"] as LanguageCode[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => updateSettings({ language: lang })}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      settings.language === lang 
                        ? "bg-primary/20 border-primary text-primary" 
                        : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="font-bold uppercase tracking-widest">{lang === "en" ? "English" : lang === "hi" ? "हिंदी" : "తెలుగు"}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Readability */}
            <div>
              <h3 className="text-xs text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> {t("settings.readability")}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {(["Simple", "Detailed", "Scholar"] as ReadabilityMode[]).map(mode => (
                  <button
                    key={mode}
                    onClick={() => updateSettings({ readability: mode })}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      settings.readability === mode 
                        ? "bg-primary/20 border-primary text-primary" 
                        : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="font-bold uppercase tracking-widest text-xs">{mode}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Knowledge Level */}
            <div>
              <h3 className="text-xs text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4" /> {t("settings.knowledge")}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {(["Newcomer", "Familiar"] as KnowledgeLevel[]).map(level => (
                  <button
                    key={level}
                    onClick={() => updateSettings({ knowledgeLevel: level })}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      settings.knowledgeLevel === level 
                        ? "bg-primary/20 border-primary text-primary" 
                        : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="font-bold uppercase tracking-widest text-xs">{level}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Simplified Mode Toggle */}
            <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div>
                <h3 className="font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-amber-500" /> {t("settings.simplified")}
                </h3>
                <p className="text-xs text-white/50 font-light">Forces the AI to use modern metaphors and short sentences.</p>
              </div>
              <button 
                onClick={() => updateSettings({ simplifiedMode: !settings.simplifiedMode })}
                className={`w-14 h-8 rounded-full p-1 transition-colors ${settings.simplifiedMode ? 'bg-amber-500' : 'bg-white/10'}`}
              >
                <div className={`w-6 h-6 rounded-full bg-white transition-transform ${settings.simplifiedMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
