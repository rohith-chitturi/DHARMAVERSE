"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
  "Every Choice Creates Destiny",
  "Every Perspective Reveals Truth",
  "Every Hero Leaves A Legacy",
];

export default function EpicTrailer() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4000); // 4 seconds per phrase

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#080B12] flex items-center justify-center overflow-hidden">
      {/* Background Cinematic Dust / Noise */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4F8CFF]/20 via-black to-black"></div>
      </div>

      {/* Rotating Cosmic Chakra Simulation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="absolute w-[800px] h-[800px] border-[1px] border-primary/20 rounded-full border-dashed opacity-20 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        className="absolute w-[1200px] h-[1200px] border-[1px] border-secondary/10 rounded-full border-dotted opacity-20 pointer-events-none"
      />

      <div className="relative z-10 w-full px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="flex items-center justify-center h-40"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white uppercase tracking-widest drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">
              {phrases[index]}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Gradient for smooth transition */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#080B12] to-transparent z-20"></div>
    </section>
  );
}
