"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const characters = [
  {
    id: "karna",
    name: "Karna",
    title: "Born a Warrior. Remembered as a Tragedy.",
    quote: "I fought for loyalty. I died for dharma.",
    image: "/assets/karna_hero.png",
    objectPosition: "object-[center_20%]",
  },
  {
    id: "krishna",
    name: "Krishna",
    title: "The Strategist Beyond Time.",
    quote: "Perform your duty without attachment to the results.",
    image: "/assets/krishna_hero.png",
    objectPosition: "object-[center_20%]",
  },
  {
    id: "arjuna",
    name: "Arjuna",
    title: "The Warrior of Doubt and Destiny.",
    quote: "My mind is restless, O Krishna. How do I find peace?",
    image: "/assets/arjuna_hero.png",
    objectPosition: "object-[center_20%]",
  },
  {
    id: "bhishma",
    name: "Bhishma",
    title: "The Sacrifice That Bound The Universe.",
    quote: "I am bound by my vow. Even if it costs me my soul.",
    image: "/assets/bhishma_hero.png",
    objectPosition: "object-bottom",
  },
  {
    id: "draupadi",
    name: "Draupadi",
    title: "The Fire Born to Burn an Empire.",
    quote: "I was born from fire. And I will see this world burn.",
    image: "/assets/draupadi_hero.png",
    objectPosition: "object-[center_20%]",
  },
  {
    id: "vidura",
    name: "Vidura",
    title: "The Silent Voice of Truth.",
    quote: "Dharma protects those who protect it.",
    image: "/assets/vidura_hero.png",
    objectPosition: "object-top",
  }
];

export default function CharacterMatch() {
  return (
    <section className="relative w-full bg-[#080B12] py-24 z-10 flex flex-col items-center overflow-hidden">
      <div className="w-full text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif text-white tracking-wider uppercase drop-shadow-xl"
        >
          Which <span className="text-gradient-gold">Character</span> Are You?
        </motion.h2>
      </div>

      <div className="w-full max-w-[1600px] flex flex-col gap-12 px-4 sm:px-8">
        {characters.map((char, index) => (
          <motion.div
            key={char.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="group relative w-full aspect-[4/5] md:aspect-video lg:h-[80vh] min-h-[500px] overflow-hidden rounded-sm cursor-pointer"
          >
            {/* Background Image & Zoom */}
            <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105">
              <Image
                src={char.image}
                alt={char.name}
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                className={`object-cover ${char.objectPosition}`}
              />
            </div>
            
            {/* Netflix-style Vignette & Gradients */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-700 opacity-90 group-hover:opacity-70"></div>
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-700"></div>

            {/* Glowing Battlefield Particles (Simulated via CSS for now) */}
            <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent mix-blend-screen pointer-events-none"></div>

            {/* Content Area */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-30 flex flex-col justify-end h-full">
              <motion.div className="max-w-4xl transform transition-transform duration-700 translate-y-8 group-hover:translate-y-0">
                <h3 className="text-6xl md:text-8xl font-black uppercase text-white tracking-widest drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">
                  {char.name}
                </h3>
                <p className="text-2xl md:text-3xl font-light text-primary mt-2 drop-shadow-md tracking-wide">
                  {char.title}
                </p>

                {/* Hidden Quote & Button revealed on hover */}
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  <p className="text-xl md:text-2xl font-serif text-white/80 italic border-l-4 border-primary pl-6 mb-8 drop-shadow-lg">
                    "{char.quote}"
                  </p>
                  
                  <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full text-white font-medium tracking-widest uppercase transition-colors">
                    <span>Enter {char.name} Universe</span>
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </button>
                </div>
              </motion.div>
            </div>
            
            {/* Cinematic Golden Glow on Hover */}
            <div className="absolute inset-0 border-[2px] border-transparent group-hover:border-primary/30 rounded-sm pointer-events-none transition-colors duration-1000 z-40"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
