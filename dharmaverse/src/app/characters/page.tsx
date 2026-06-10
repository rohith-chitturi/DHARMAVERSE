"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { characters } from "@/data/lore";

export default function CharactersHub() {
  return (
    <div className="min-h-screen bg-[#080B12] pt-32 pb-24 px-4 sm:px-8 lg:px-16">
      <div className="max-w-[1800px] mx-auto">
        
        <div className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-white tracking-widest uppercase drop-shadow-xl"
          >
            Legendary <span className="text-gradient-gold">Characters</span>
          </motion.h1>
          <p className="text-muted tracking-widest uppercase text-lg mt-6">
            Choose a soul to enter their universe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {characters.map((char, i) => (
            <Link key={char.id} href={`/characters/${char.id}`} className="block w-full">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -10 }}
                className="group relative w-full h-[70vh] min-h-[500px] rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 z-0 bg-black">
                  <Image
                    src={char.image}
                    alt={char.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 20vw"
                    className={`object-cover ${char.objectPosition} transition-all duration-[2s] group-hover:scale-110 group-hover:opacity-100 opacity-60 grayscale-[30%] group-hover:grayscale-0`}
                  />
                </div>

                <div className={`absolute inset-0 z-10 bg-gradient-to-t ${char.theme} opacity-80 group-hover:opacity-40 transition-opacity duration-700`}></div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-700"></div>

                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 pb-12 items-center text-center">
                  <motion.div
                    initial={{ y: 20 }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className={`text-sm tracking-[0.3em] uppercase font-bold mb-2 ${char.color}`}>
                      {char.title}
                    </p>
                    <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-widest drop-shadow-2xl mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary transition-all">
                      {char.name}
                    </h2>
                    
                    <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <button className="mt-4 px-6 py-3 border border-white/20 rounded-full text-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors backdrop-blur-md">
                        Enter Universe
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
