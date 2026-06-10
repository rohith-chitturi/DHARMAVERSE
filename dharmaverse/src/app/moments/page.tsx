"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { moments } from "@/data/lore";
import { PlayCircle } from "lucide-react";

export default function MomentsHub() {
  return (
    <div className="min-h-screen bg-[#080B12] pt-32 pb-24 px-4 sm:px-8 lg:px-16">
      <div className="max-w-[1800px] mx-auto">
        
        <div className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-white tracking-widest uppercase drop-shadow-xl"
          >
            Legendary <span className="text-gradient-gold">Moments</span>
          </motion.h1>
          <p className="text-muted tracking-widest uppercase text-lg mt-6">
            The turning points of destiny
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {moments.map((moment, i) => (
            <Link key={moment.id} href={`/moments/${moment.id}`} className="block w-full">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`relative w-full h-[60vh] min-h-[500px] rounded-3xl overflow-hidden group cursor-pointer flex items-center justify-start`}
              >
                {/* Background Image with Parallax & Netflix zoom */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={moment.image}
                    alt={moment.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className={`object-cover ${moment.objectPosition} transition-transform duration-[1.5s] group-hover:scale-110`}
                  />
                </div>

                <div className={`absolute inset-0 z-10 bg-gradient-to-r ${moment.theme} via-[#080B12]/80 to-transparent transition-opacity duration-700 opacity-90 group-hover:opacity-70`}></div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080B12] via-transparent to-transparent opacity-80"></div>

                {/* Content Panel */}
                <div className="relative z-20 w-full max-w-4xl px-8 md:px-16 lg:px-24 transform transition-all duration-700 group-hover:translate-x-8">
                  <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-wider drop-shadow-2xl mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary transition-all duration-700">
                    {moment.title}
                  </h3>
                  
                  <p className="text-xl md:text-2xl font-light text-muted drop-shadow-md mb-10 max-w-2xl">
                    {moment.description}
                  </p>

                  <button className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-primary hover:border-primary hover:text-[#080B12] text-white px-8 py-4 rounded-sm font-bold tracking-widest uppercase transition-all duration-300 transform group-hover:scale-105">
                    <PlayCircle className="w-8 h-8" />
                    <span>Enter Event</span>
                  </button>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
