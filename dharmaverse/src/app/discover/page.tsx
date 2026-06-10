"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { discoverCategories } from "@/data/lore";

export default function Discover() {
  return (
    <div className="min-h-screen bg-[#080B12] pb-24">
      {/* Featured Hero Banner */}
      <div className="relative w-full h-[60vh] md:h-[70vh] mb-12">
        <Image
          src="/assets/krishna_hero.png"
          alt="Discover the Dharmaverse"
          fill
          className="object-cover object-[center_20%] opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#080B12] via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:px-24 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary tracking-[0.3em] uppercase text-sm font-bold mb-4 drop-shadow-md">Featured Universe</p>
            <h1 className="text-6xl md:text-8xl font-serif text-white uppercase tracking-widest drop-shadow-2xl mb-4">
              Explore The <br/><span className="text-gradient-gold">Epic</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl font-light mb-8">
              Navigate the greatest story ever told through the eyes of its most legendary figures.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Categories - Netflix Style Horizontal Scrollers */}
      <div className="flex flex-col gap-12 lg:gap-16">
        {discoverCategories.map((category, i) => (
          <div key={i} className="w-full">
            <div className="px-8 md:px-16 lg:px-24 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-widest uppercase drop-shadow-md">
                {category.title}
              </h2>
            </div>
            
            {/* Horizontal Scroll Container */}
            <div className="w-full overflow-x-auto pb-8 hide-scrollbar px-8 md:px-16 lg:px-24">
              <div className="flex gap-6 w-max">
                {category.items.map((item: any, j) => (
                  <Link 
                    key={j} 
                    href={item.characters ? `/moments/${item.id}` : `/characters/${item.id}`}
                    className="block w-[300px] md:w-[400px] shrink-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: j * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="group relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer bg-black"
                    >
                      <Image
                        src={item.image}
                        alt={item.name || item.title}
                        fill
                        className={`object-cover ${item.objectPosition || 'object-center'} transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>
                      
                      <div className="absolute bottom-0 left-0 p-6 w-full">
                        <p className={`text-xs tracking-widest uppercase font-bold mb-1 ${item.color || 'text-primary'}`}>
                          {item.title || item.name}
                        </p>
                        <h3 className="text-2xl font-bold text-white uppercase tracking-wider group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary transition-all">
                          {item.name || item.title}
                        </h3>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
