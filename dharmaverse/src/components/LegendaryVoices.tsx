"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square } from "lucide-react";

const voices = [
  {
    id: 1,
    character: "Krishna",
    quote: "I am Time, the destroyer of all worlds.",
    context: "The revelation of the Vishvarupa",
    color: "from-blue-500 to-purple-500",
    textShadow: "shadow-blue-500/50"
  },
  {
    id: 2,
    character: "Karna",
    quote: "If the sun himself asks for my armor, how can I refuse?",
    context: "The ultimate sacrifice before the war",
    color: "from-amber-500 to-orange-500",
    textShadow: "shadow-amber-500/50"
  },
  {
    id: 3,
    character: "Bhishma",
    quote: "I am bound by my vow. Even if it costs me my soul.",
    context: "The paradox of duty",
    color: "from-slate-400 to-white",
    textShadow: "shadow-white/50"
  }
];

export default function LegendaryVoices() {
  const [activeVoice, setActiveVoice] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(voices[activeVoice].quote);
      
      // Try to find a deep/dramatic english voice if possible
      const availableVoices = window.speechSynthesis.getVoices();
      const preferredVoice = availableVoices.find(v => v.name.includes("Google UK English Male") || v.name.includes("Daniel") || v.lang === "en-GB");
      if (preferredVoice) utterance.voice = preferredVoice;
      
      utterance.pitch = 0.6; // Deeper pitch for cinematic feel
      utterance.rate = 0.8; // Slower, dramatic pacing

      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, [activeVoice]);

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  const nextVoice = () => {
    setActiveVoice((prev) => (prev + 1) % voices.length);
  };

  const prevVoice = () => {
    setActiveVoice((prev) => (prev === 0 ? voices.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full py-32 bg-black overflow-hidden border-t border-b border-white/5">
      {/* Background ambient glow based on active character */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r ${voices[activeVoice].color} opacity-[0.03] blur-[100px] rounded-full transition-colors duration-1000 pointer-events-none`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-sm tracking-[0.4em] text-primary uppercase font-bold mb-4">The Echoes of Time</h2>
          <h3 className="text-4xl md:text-6xl font-serif text-white tracking-widest uppercase">
            Legendary <span className="text-gradient-gold">Voices</span>
          </h3>
        </motion.div>

        {/* Cinematic Voice Player */}
        <div className="w-full max-w-4xl flex flex-col items-center relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVoice}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
              className="text-center min-h-[250px] flex flex-col items-center justify-center w-full"
            >
              <p className="text-3xl md:text-5xl lg:text-6xl font-light italic text-white leading-relaxed tracking-wide drop-shadow-2xl mb-8">
                "{voices[activeVoice].quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-primary/50"></div>
                <h4 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-primary">
                  {voices[activeVoice].character}
                </h4>
                <div className="w-12 h-[1px] bg-primary/50"></div>
              </div>
              <p className="text-muted tracking-widest uppercase text-xs mt-3">
                {voices[activeVoice].context}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Player Controls & Simulated Soundwave */}
          <div className="mt-16 w-full max-w-2xl flex flex-col items-center gap-8">
            
            {/* Simulated Audio Waveform */}
            <div className="flex items-center justify-center gap-1 h-12 w-full px-8">
              {[...Array(40)].map((_, i) => {
                // Generate a pseudo-random wave pattern
                const isCenter = Math.abs(i - 20) < 5;
                const baseHeight = isCenter ? 30 + Math.random() * 20 : 5 + Math.random() * 15;
                
                return (
                  <motion.div
                    key={i}
                    animate={isPlaying ? {
                      height: [baseHeight, baseHeight * (1.5 + Math.random()), baseHeight],
                    } : {
                      height: baseHeight * 0.3
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`w-1 rounded-full bg-gradient-to-t ${voices[activeVoice].color} opacity-70`}
                    style={{ minHeight: '4px' }}
                  ></motion.div>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-8">
              <button 
                onClick={prevVoice}
                className="text-muted hover:text-white transition-colors text-sm uppercase tracking-widest"
              >
                Prev
              </button>
              
              <button 
                onClick={togglePlay}
                className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 hover:border-primary transition-all hover:scale-105"
              >
                {isPlaying ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </button>

              <button 
                onClick={nextVoice}
                className="text-muted hover:text-white transition-colors text-sm uppercase tracking-widest"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
