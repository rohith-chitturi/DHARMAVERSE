"use client";

import { motion } from "framer-motion";
import { Sword, Eye, Sparkles, ScrollText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const journeys = [
  {
    id: 1,
    title: "Become A Hero",
    icon: <Sword className="w-8 h-8 text-primary" />,
    description: "Discover your epic counterpart through AI personality match.",
    image: "/assets/karna_hero.png",
    href: "/characters"
  },
  {
    id: 2,
    title: "Experience Perspectives",
    icon: <Eye className="w-8 h-8 text-primary" />,
    description: "See the same legendary event through different eyes.",
    image: "/assets/krishna_hero.png",
    href: "/perspectives"
  },
  {
    id: 3,
    title: "Explore The Universe",
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    description: "Navigate the interconnected relationships of the Mahabharata.",
    image: "/assets/arjuna_hero.png",
    href: "/universe"
  },
  {
    id: 4,
    title: "Legendary Moments",
    icon: <ScrollText className="w-8 h-8 text-primary" />,
    description: "Witness the most pivotal events of the epic in 3D.",
    image: "/assets/karna_hero.png", // Wait, need to fix image for moments. Let's use dice_game.png
    href: "/moments"
  },
];

export default function ChooseJourney() {
  return (
    <section className="relative w-full min-h-screen bg-[#080B12] py-24 px-4 sm:px-8 lg:px-16 overflow-hidden z-10">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/5 via-[#080B12] to-[#080B12]"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-wide uppercase mb-6 drop-shadow-lg">
            Choose Your <span className="text-gradient-gold">Journey</span>
          </h2>
          <p className="text-xl text-muted font-light tracking-widest uppercase">
            Four Paths into the Epic
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {journeys.map((journey, i) => (
            <Link key={journey.id} href={journey.href} className="block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                whileHover={{ scale: 1.02, y: -10 }}
                className="group relative overflow-hidden rounded-2xl aspect-[16/9] cursor-pointer"
              >
                {/* Background Image with Parallax & Darken Effect */}
                <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-110">
                  <Image
                    src={journey.image === "/assets/karna_hero.png" && journey.id === 4 ? "/assets/dice_game.png" : journey.image}
                    alt={journey.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/80 to-transparent transition-opacity duration-500 group-hover:opacity-80"></div>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>

                {/* Glowing Border on Hover */}
                <div className="absolute inset-0 z-10 border border-white/10 rounded-2xl transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"></div>

                {/* Content */}
                <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-end">
                  <motion.div
                    initial={{ y: 20, opacity: 0.8 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="mb-4 p-4 rounded-full bg-black/40 backdrop-blur-md inline-block border border-white/5">
                      {journey.icon}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 uppercase tracking-wider group-hover:text-primary transition-colors duration-300">
                      {journey.title}
                    </h3>
                    <p className="text-muted text-lg font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      {journey.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
