"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function FinalCTA() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black border-t border-white/10">
      
      {/* Deep Space Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/krishna_hero.png" // Using the most epic asset for the background
          alt="Cosmic Universe"
          fill
          className="object-cover object-[center_20%] opacity-20 blur-sm"
        />
      </div>

      {/* Heavy Vignette & Radial Glow */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_70%)] opacity-100"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full z-10 pointer-events-none"></div>

      <div className="relative z-20 text-center px-4 max-w-4xl flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-24 h-24 rounded-full bg-black border border-primary/50 shadow-[0_0_50px_rgba(212,175,55,0.4)] flex items-center justify-center mb-10"
        >
          {/* Stylized Dharmachakra icon representation */}
          <div className="w-12 h-12 rounded-full border-4 border-primary border-dashed animate-[spin_10s_linear_infinite]"></div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black text-white uppercase tracking-widest drop-shadow-2xl mb-6 leading-tight"
        >
          Your Destiny <br/> <span className="text-gradient-gold">Awaits</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-3xl font-light text-muted tracking-wide mb-16"
        >
          The epic is written. How will you live it?
        </motion.p>

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="group relative flex items-center gap-4 bg-primary text-black px-12 py-6 rounded-sm font-black text-xl tracking-[0.2em] uppercase overflow-hidden hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:shadow-[0_0_80px_rgba(212,175,55,0.8)]"
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          
          <span className="relative z-10">Enter Dharmaverse</span>
          <ChevronRight className="relative z-10 w-8 h-8 group-hover:translate-x-2 transition-transform" />
        </motion.button>
        
      </div>
    </section>
  );
}
