"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { moments, characters } from "@/data/lore";
import { ArrowRight, PlayCircle, Lock, FastForward, Eye } from "lucide-react";

export default function SingleMoment() {
  const params = useParams();
  const id = params.id as string;
  const moment = moments.find(m => m.id === id);
  
  if (!moment) return <div className="min-h-screen flex items-center justify-center text-white">Event Not Found</div>;

  const charactersInvolved = moment.characters.map(charId => characters.find(c => c.id === charId)).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#080B12] overflow-x-hidden">
      
      {/* 1. Cinematic Hero */}
      <div className="relative w-full h-screen">
        <Image
          src={moment.image}
          alt={moment.title}
          fill
          className={`object-cover ${moment.objectPosition} opacity-70`}
          priority
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${moment.theme} opacity-70`}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#080B12] via-transparent to-transparent opacity-80"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:px-24 pb-32 z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex gap-4 mb-6">
              <span className="px-4 py-1 border border-primary text-primary text-xs uppercase tracking-widest rounded-full backdrop-blur-sm bg-black/40">
                Category: {moment.category}
              </span>
              {moment.emotions.slice(0, 3).map((emotion, i) => (
                <span key={i} className="px-4 py-1 border border-white/20 text-white/70 text-xs uppercase tracking-widest rounded-full backdrop-blur-sm bg-black/40">
                  {emotion}
                </span>
              ))}
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-widest drop-shadow-2xl leading-none">
              {moment.title}
            </h1>
            <p className="text-xl md:text-3xl text-white/80 font-light mt-8 max-w-3xl leading-relaxed">
              {moment.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-16 lg:px-24 -mt-20 relative z-20">
        
        {/* Play Documentary Button (Visual hook) */}
        <div className="mb-24 flex items-center gap-6">
          <button className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 hover:bg-primary transition-all">
            <PlayCircle className="w-12 h-12 ml-2" />
          </button>
          <div>
            <h3 className="text-2xl font-bold uppercase tracking-widest text-white">Play Episode</h3>
            <p className="text-muted text-sm uppercase tracking-widest">Duration: 45 Mins</p>
          </div>
        </div>

        {/* Characters Involved */}
        <section className="py-24 border-t border-white/10">
          <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-widest mb-16">
            Figures of <span className="text-gradient-gold">Destiny</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {charactersInvolved.map((char: any) => (
              <Link key={char.id} href={`/characters/${char.id}`}>
                <div className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer">
                  <Image src={char.image} alt={char.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <p className={`text-xs tracking-widest uppercase font-bold mb-1 ${char.color}`}>{char.title}</p>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">{char.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Causes & Consequences */}
        <section className="py-24 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-widest mb-8">
                The <span className="text-gradient-gold">Catalyst</span>
              </h2>
              <ul className="space-y-4">
                {moment.causes.map((cause, i) => (
                  <li key={i} className="text-lg text-white/80 font-light border-l-2 border-white/20 pl-6 py-2">
                    {cause}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-widest mb-8">
                The <span className="text-gradient-gold">Aftermath</span>
              </h2>
              <ul className="space-y-4">
                {moment.consequences.map((cons, i) => (
                  <li key={i} className="text-lg text-white/80 font-light border-l-2 border-primary/50 pl-6 py-2">
                    {cons}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* AI Placeholders: Walk Another Path & Rewrite Destiny */}
        <section className="py-32 my-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Walk Another Path (Perspective Engine) */}
          <div className="relative p-12 md:p-16 rounded-3xl bg-[#0A0D14] border border-white/5 overflow-hidden group">
            <div className={`absolute inset-0 bg-gradient-to-br ${moment.theme} opacity-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-20`}></div>
            <Eye className="w-12 h-12 text-white/50 mb-8" />
            <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-widest mb-4">
              Walk Another <span className="text-gradient-gold">Path</span>
            </h2>
            <p className="text-lg text-muted font-light mb-12">
              Every action is justified by the one who takes it. Enter the Perspective Engine to view this event through the eyes of the heroes and villains involved.
            </p>
            <button disabled className="group/btn relative bg-white/5 border border-white/10 text-white/50 px-8 py-4 rounded-full font-bold uppercase tracking-widest cursor-not-allowed overflow-hidden w-full text-center">
              <span className="flex items-center justify-center gap-3 relative z-10">
                <Lock className="w-4 h-4" /> Perspective Engine (Coming Soon)
              </span>
            </button>
          </div>

          {/* Rewrite Destiny (Alternate Timeline) */}
          <div className="relative p-12 md:p-16 rounded-3xl bg-[#0A0D14] border border-white/5 overflow-hidden group">
            <div className={`absolute inset-0 bg-gradient-to-bl from-red-900/20 to-black opacity-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-20`}></div>
            <FastForward className="w-12 h-12 text-white/50 mb-8" />
            <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-widest mb-4">
              Rewrite <span className="text-red-500">Destiny</span>
            </h2>
            <p className="text-lg text-muted font-light mb-12">
              What if the dice were never rolled? What if peace was accepted? Use the AI timeline generator to branch this event and explore the butterfly effect.
            </p>
            <button disabled className="group/btn relative bg-white/5 border border-white/10 text-white/50 px-8 py-4 rounded-full font-bold uppercase tracking-widest cursor-not-allowed overflow-hidden w-full text-center">
              <span className="flex items-center justify-center gap-3 relative z-10">
                <Lock className="w-4 h-4" /> Timeline Simulator (Coming Soon)
              </span>
            </button>
          </div>

        </section>

      </div>
    </div>
  );
}
