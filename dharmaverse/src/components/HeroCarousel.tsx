"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Sword, Compass } from "lucide-react";
import Image from "next/image";

const scenes = [
  {
    id: 1,
    image: "/assets/krishna_hero.png",
    alt: "Krishna with Sudarshana",
  },
  {
    id: 2,
    image: "/assets/karna_hero.png",
    alt: "Karna in battlefield dust",
  },
  {
    id: 3,
    image: "/assets/arjuna_hero.png",
    alt: "Arjuna at Kurukshetra",
  },
];

export default function HeroCarousel() {
  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length);
    }, 8000); // 8 seconds transition
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-black flex flex-col justify-center">
      {/* Background Images Carousel */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={scenes[currentScene].image}
            alt={scenes[currentScene].alt}
            fill
            priority
            className="object-cover object-top"
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080B12] via-[#080B12]/60 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 to-transparent" />
      
      {/* Content */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-widest text-gradient-gold mb-6 drop-shadow-2xl uppercase font-serif">
            Dharmaverse
          </h1>
          <p className="text-2xl md:text-4xl font-light text-white mb-2 tracking-wide text-shadow-sm">
            Don't Read the Epic. <span className="font-semibold">Live It.</span>
          </p>
          <p className="text-lg md:text-xl text-muted font-light tracking-widest uppercase mb-12">
            Experience Every Perspective.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 mt-8"
        >
          <button className="group relative glass px-8 py-4 rounded-full flex items-center justify-center gap-3 overflow-hidden transition-all hover:bg-white/10 hover:border-primary/50">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Zap className="w-5 h-5 text-primary group-hover:text-[#FFDF73] transition-colors" />
            <span className="text-white font-medium tracking-wider uppercase text-sm">Find My Character</span>
          </button>
          
          <button className="group relative glass px-8 py-4 rounded-full flex items-center justify-center gap-3 overflow-hidden transition-all hover:bg-white/10 hover:border-primary/50">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Sword className="w-5 h-5 text-primary group-hover:text-[#FFDF73] transition-colors" />
            <span className="text-white font-medium tracking-wider uppercase text-sm">Enter the Story</span>
          </button>

          <button className="group relative glass px-8 py-4 rounded-full flex items-center justify-center gap-3 overflow-hidden transition-all hover:bg-white/10 hover:border-primary/50">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Compass className="w-5 h-5 text-primary group-hover:text-[#FFDF73] transition-colors" />
            <span className="text-white font-medium tracking-wider uppercase text-sm">Explore the Universe</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
