"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

const moments = [
  {
    id: "dice-game",
    title: "The Dice Game",
    description: "The fateful roll that altered destiny forever.",
    image: "/assets/dice_game.png",
    alignment: "left",
  },
  {
    id: "karna-vs-arjuna",
    title: "Karna vs Arjuna",
    description: "The ultimate clash of dharma and destiny.",
    image: "/assets/arjuna_hero.png", // reusing asset
    alignment: "right",
  },
  {
    id: "bhishma-vow",
    title: "Bhishma's Vow",
    description: "The sacrifice that bound the universe.",
    image: "/assets/krishna_hero.png", // reusing asset
    alignment: "left",
  }
];

export default function LegendaryMoments() {
  return (
    <section className="w-full bg-[#080B12] py-32 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-20 px-4">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif text-white tracking-widest uppercase drop-shadow-lg"
          >
            Legendary <span className="text-gradient-gold">Moments</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted font-light tracking-wide mt-4 uppercase"
          >
            Experience the Pivotal Turning Points
          </motion.p>
        </div>

        <div className="flex flex-col gap-24">
          {moments.map((moment, i) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`relative w-full h-[70vh] min-h-[600px] rounded-3xl overflow-hidden group cursor-pointer flex items-center ${moment.alignment === 'right' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Background Image with Parallax & Netflix zoom */}
              <div className="absolute inset-0 z-0">
                <img
                  src={moment.image}
                  alt={moment.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
              </div>

              {/* Dynamic Netflix-style Overlays */}
              <div className={`absolute inset-0 z-10 bg-gradient-to-${moment.alignment === 'left' ? 'r' : 'l'} from-[#080B12] via-[#080B12]/80 to-transparent transition-opacity duration-700 opacity-90 group-hover:opacity-70`}></div>
              
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080B12] via-transparent to-transparent opacity-80"></div>

              {/* Cinematic Glow overlay */}
              <div className="absolute inset-0 z-10 bg-primary/10 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-1000"></div>

              {/* Content Panel */}
              <div className={`relative z-20 w-full max-w-4xl px-8 md:px-16 lg:px-24 transform transition-all duration-700 group-hover:translate-x-${moment.alignment === 'left' ? '8' : '-8'}`}>
                <motion.div 
                  initial={{ opacity: 0, x: moment.alignment === 'left' ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <h3 className="text-6xl md:text-8xl font-black text-white uppercase tracking-wider drop-shadow-2xl mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary transition-all duration-700">
                    {moment.title}
                  </h3>
                  
                  <p className="text-2xl md:text-3xl font-light text-muted drop-shadow-md mb-10 max-w-2xl">
                    {moment.description}
                  </p>

                  <button className="flex items-center gap-4 bg-white hover:bg-primary text-[#080B12] px-8 py-4 rounded-sm font-bold tracking-widest uppercase transition-all duration-300 transform group-hover:scale-105">
                    <PlayCircle className="w-8 h-8" />
                    <span>Experience Event</span>
                  </button>
                </motion.div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
