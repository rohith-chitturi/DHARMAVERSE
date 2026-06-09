"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Eye, Globe, Zap, Volume2 } from "lucide-react";

const features = [
  {
    id: "cinematic",
    title: "Cinematic Lore",
    description: "Experience the Mahabharata not as ancient text, but as a breathtaking AAA game-like universe.",
    icon: <Zap className="w-8 h-8" />,
    image: "/assets/arjuna_hero.png",
    objectPosition: "object-[center_20%]"
  },
  {
    id: "perspectives",
    title: "Interactive Perspectives",
    description: "Truth is subjective. See the same legendary events through the eyes of different heroes and villains.",
    icon: <Eye className="w-8 h-8" />,
    image: "/assets/draupadi_hero.png",
    objectPosition: "object-[center_20%]"
  },
  {
    id: "universe",
    title: "Living Universe",
    description: "Explore a breathing, interconnected 3D web of destinies, alliances, and bloodlines.",
    icon: <Globe className="w-8 h-8" />,
    image: "/assets/bhishma_hero.png",
    objectPosition: "object-bottom"
  },
  {
    id: "audio",
    title: "Legendary Audio",
    description: "Spine-chilling voice-acted quotes that bring the emotional weight of the epic directly to you.",
    icon: <Volume2 className="w-8 h-8" />,
    image: "/assets/krishna_hero.png",
    objectPosition: "object-[center_20%]"
  }
];

export default function FeatureShowcase() {
  return (
    <section className="w-full bg-[#080B12] py-32 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-widest uppercase drop-shadow-xl"
          >
            Why <span className="text-gradient-gold">Dharmaverse</span>?
          </motion.h2>
          <p className="text-muted tracking-widest uppercase text-lg mt-6">
            A New Standard for Digital Storytelling
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`group relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer ${i % 2 !== 0 ? 'lg:mt-32' : ''}`}
            >
              {/* Image with extreme parallax hover */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover ${feature.objectPosition} transition-transform duration-[2s] group-hover:scale-110`}
                />
              </div>

              {/* Overlays */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700"></div>
              
              <div className="absolute inset-0 z-10 bg-primary/20 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-700"></div>

              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                <div className="transform transition-transform duration-700 translate-y-4 group-hover:translate-y-0">
                  <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-black transition-colors duration-500">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-widest mb-4 drop-shadow-lg">
                    {feature.title}
                  </h3>
                  
                  <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Border glow */}
              <div className="absolute inset-0 z-30 border-[1px] border-white/10 group-hover:border-primary/50 transition-colors duration-700 rounded-2xl pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
