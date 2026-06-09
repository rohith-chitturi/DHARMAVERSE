"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const perspectives = [
  {
    id: "yudhishthira",
    character: "Yudhishthira",
    theme: "from-amber-900/60",
    accent: "text-amber-400",
    border: "border-amber-500/50",
    bg: "bg-amber-500/10",
    image: "/assets/yudhishthira_perspective.png",
    quote: "I cannot refuse a challenge of dice. It is a matter of royal honor and dharma.",
    insight: "To him, the game was a sacred duty, blinding him to the deception.",
    objectPosition: "object-top"
  },
  {
    id: "shakuni",
    character: "Shakuni",
    theme: "from-emerald-900/60",
    accent: "text-emerald-400",
    border: "border-emerald-500/50",
    bg: "bg-emerald-500/10",
    image: "/assets/shakuni_perspective.png",
    quote: "The dice obey me, nephew. The empire is already ours.",
    insight: "To him, it was never a game. It was the quiet assassination of an empire.",
    objectPosition: "object-[center_20%]"
  },
  {
    id: "draupadi",
    character: "Draupadi",
    theme: "from-red-900/60",
    accent: "text-red-500",
    border: "border-red-500/50",
    bg: "bg-red-500/10",
    image: "/assets/draupadi_hero.png",
    quote: "How can a man who has lost himself wager his wife?",
    insight: "To her, the game was the ultimate betrayal by the men sworn to protect her.",
    objectPosition: "object-[center_20%]"
  }
];

export default function PerspectiveEngine() {
  const [activeId, setActiveId] = useState(perspectives[0].id);
  
  const activePerspective = perspectives.find(p => p.id === activeId)!;

  return (
    <section className="relative w-full min-h-[100svh] bg-black flex flex-col justify-center overflow-hidden py-24">
      {/* Background Image transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePerspective.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={activePerspective.image}
            alt={activePerspective.character}
            fill
            sizes="100vw"
            className={`object-cover ${activePerspective.objectPosition} opacity-40`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dynamic Gradients */}
      <div className={`absolute inset-0 z-10 bg-gradient-to-t ${activePerspective.theme} via-black/80 to-black/90 transition-colors duration-1000`}></div>
      <div className={`absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${activePerspective.theme} via-transparent to-transparent opacity-30 transition-colors duration-1000`}></div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col h-full">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-white tracking-widest uppercase text-center mb-4"
          >
            Experience Every <span className="text-gradient-gold">Perspective</span>
          </motion.h2>
          <p className="text-center text-muted uppercase tracking-widest text-sm">
            Event: The Dice Game
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-8">
          
          {/* Controls - Left side on desktop */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-4">
            {perspectives.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={`relative group w-full text-left px-8 py-6 rounded-xl border backdrop-blur-sm transition-all duration-500 overflow-hidden ${
                  activeId === p.id 
                    ? `${p.bg} ${p.border} scale-105` 
                    : "border-white/10 hover:border-white/30 hover:bg-white/5"
                }`}
              >
                {/* Highlight effect */}
                {activeId === p.id && (
                  <motion.div 
                    layoutId="active-perspective"
                    className={`absolute inset-0 border-l-4 ${p.border.replace('border-', 'border-l-')} bg-gradient-to-r ${p.theme} to-transparent opacity-20`}
                  ></motion.div>
                )}
                
                <h3 className={`relative z-10 text-2xl font-bold uppercase tracking-widest transition-colors duration-300 ${activeId === p.id ? "text-white" : "text-muted group-hover:text-white/80"}`}>
                  {p.character}
                </h3>
              </button>
            ))}
          </div>

          {/* Content - Right side on desktop */}
          <div className="col-span-1 lg:col-span-8 lg:pl-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePerspective.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="flex flex-col gap-8"
              >
                <div className="relative">
                  <span className={`absolute -top-16 -left-8 text-[120px] font-serif leading-none opacity-20 ${activePerspective.accent}`}>"</span>
                  <blockquote className="text-3xl md:text-5xl font-light text-white leading-tight italic drop-shadow-lg z-10 relative">
                    {activePerspective.quote}
                  </blockquote>
                </div>
                
                <div className={`p-8 border-l-2 ${activePerspective.border} ${activePerspective.bg} backdrop-blur-md mt-4 rounded-r-xl`}>
                  <p className="text-sm tracking-[0.2em] uppercase text-white/50 mb-2">The Hidden Truth</p>
                  <p className={`text-xl md:text-2xl ${activePerspective.accent} drop-shadow-md`}>
                    {activePerspective.insight}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
