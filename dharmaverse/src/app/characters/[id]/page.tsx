"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { characters, moments } from "@/data/lore";
import { Play, Square, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function CharacterUniverse() {
  const params = useParams();
  const id = params.id as string;
  const character = characters.find(c => c.id === id);
  const nextCharacter = characters[(characters.findIndex(c => c.id === id) + 1) % characters.length];
  
  const relatedMoments = moments.filter(m => m.characters.includes(id));

  // Voice Player State
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  if (!character) return <div className="min-h-screen flex items-center justify-center text-white">Character Not Found</div>;

  const togglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(character.quote.text);
      const availableVoices = window.speechSynthesis.getVoices();
      const preferredVoice = availableVoices.find(v => v.name.includes("Google UK English Male") || v.name.includes("Daniel") || v.lang === "en-GB");
      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.pitch = 0.6; 
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-[#080B12] overflow-x-hidden">
      
      {/* 1. Massive Hero Banner */}
      <div className="relative w-full h-[85vh] lg:h-screen">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className={`object-cover ${character.objectPosition} opacity-80`}
          priority
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${character.theme} opacity-60`}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:px-24 pb-24 z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-widest drop-shadow-2xl">
              {character.name}
            </h1>
            <p className={`text-2xl md:text-3xl tracking-[0.3em] uppercase font-bold mt-4 drop-shadow-md ${character.color}`}>
              {character.title}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-16 lg:px-24">
        
        {/* 2. Who Was [Name]? */}
        <section className="py-24">
          <h2 className="text-sm tracking-[0.4em] uppercase text-white/50 mb-4">Origins & Identity</h2>
          <p className="text-3xl md:text-5xl font-light text-white leading-relaxed tracking-wide">
            {character.description}
          </p>
        </section>

        {/* 3. Life Timeline */}
        <section className="py-24 border-t border-white/10">
          <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-widest mb-16">
            The Path of <span className="text-gradient-gold">Destiny</span>
          </h2>
          <div className="relative border-l border-white/20 pl-8 ml-4 flex flex-col gap-12">
            {character.timeline.map((event, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className={`absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-black border-2 border-primary`}></div>
                <h3 className={`text-sm font-bold uppercase tracking-widest ${character.color} mb-2`}>{event.year}</h3>
                <p className="text-2xl text-white font-light">{event.event}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Key Relationships */}
        <section className="py-24 border-t border-white/10">
          <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-widest mb-16">
            Key <span className="text-gradient-gold">Relationships</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {character.relationships.map((rel, i) => (
              <div key={i} className="p-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">{rel.name}</h3>
                <p className="text-muted tracking-widest uppercase text-sm">{rel.relation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Legendary Voice */}
        <section className="py-32 my-12 relative rounded-3xl overflow-hidden border border-white/10">
          <div className={`absolute inset-0 bg-gradient-to-r ${character.theme} opacity-20 blur-3xl pointer-events-none`}></div>
          <div className="relative z-10 text-center flex flex-col items-center px-4">
            <p className="text-3xl md:text-5xl lg:text-6xl font-light italic text-white leading-relaxed tracking-wide drop-shadow-2xl mb-8 max-w-4xl">
              "{character.quote.text}"
            </p>
            <p className="text-muted tracking-widest uppercase text-sm mb-12">
              Context: {character.quote.context}
            </p>

            <button 
              onClick={togglePlay}
              className={`w-20 h-20 rounded-full border-2 ${isPlaying ? 'border-red-500 text-red-500' : 'border-primary text-primary'} flex items-center justify-center hover:bg-white/5 transition-all hover:scale-105`}
            >
              {isPlaying ? <Square className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-2" />}
            </button>
            <p className="text-xs uppercase tracking-widest text-white/40 mt-4">Play Cinematic Audio</p>
          </div>
        </section>

        {/* 6. Related Moments */}
        {relatedMoments.length > 0 && (
          <section className="py-24 border-t border-white/10">
            <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-widest mb-16">
              Witness <span className="text-gradient-gold">Events</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {relatedMoments.map((moment) => (
                <Link key={moment.id} href={`/moments/${moment.id}`}>
                  <div className="group relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer">
                    <Image src={moment.image} alt={moment.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8">
                      <h3 className="text-3xl font-bold text-white uppercase tracking-wider mb-2">{moment.title}</h3>
                      <p className="text-muted text-sm uppercase tracking-widest">Enter Event <ArrowRight className="inline w-4 h-4 ml-1"/></p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 7. Explore Next Character */}
        <section className="py-32 text-center border-t border-white/10">
          <p className="text-sm tracking-[0.4em] uppercase text-white/50 mb-8">Continue The Journey</p>
          <Link href={`/characters/${nextCharacter.id}`}>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-widest hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-6">
              {nextCharacter.name} <ArrowRight className="w-16 h-16" />
            </h2>
          </Link>
        </section>

      </div>
    </div>
  );
}
