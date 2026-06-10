"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { characters } from "@/data/lore";
import { ArrowRight, Sparkles } from "lucide-react";

const questions = [
  {
    id: 1,
    text: "How do you react to betrayal?",
    options: [
      { text: "Seek immediate vengeance.", scores: { karna: 10, draupadi: 10, ashwatthama: 10, "Tragic Hero": 8, "Fierce Catalyst": 6 } },
      { text: "Play the long game. Justice will be served.", scores: { krishna: 10, vidura: 10, "Strategic Visionary": 8, "Moral Advisor": 6 } },
      { text: "I am bound by duty. I endure it.", scores: { bhishma: 10, arjuna: 5, kunti: 10, "Bound Patriarch": 8, "Duty-Bound Warrior": 6, "Stoic Matriarch": 5 } },
    ]
  },
  {
    id: 2,
    text: "What matters most to you?",
    options: [
      { text: "Unwavering loyalty to my friends.", scores: { karna: 10, duryodhana: 10, "Tragic Hero": 8, "Ambitious Antagonist": 6 } },
      { text: "The greater good, universal Dharma.", scores: { krishna: 10, vidura: 10, arjuna: 5, "Strategic Visionary": 8, "Moral Advisor": 8 } },
      { text: "My vows and my personal reputation.", scores: { bhishma: 10, karna: 5, "Bound Patriarch": 8, "Duty-Bound Warrior": 4 } },
    ]
  },
  {
    id: 3,
    text: "What would you sacrifice to win?",
    options: [
      { text: "My own honor, if the cause is just.", scores: { krishna: 10, ashwatthama: 5, "Strategic Visionary": 8, "Compromised Mentor": 4 } },
      { text: "My life, to uphold my oath.", scores: { bhishma: 10, karna: 5, "Bound Patriarch": 10, "Tragic Hero": 5 } },
      { text: "My pride, to protect my family.", scores: { arjuna: 10, kunti: 10, draupadi: 5, "Duty-Bound Warrior": 8, "Stoic Matriarch": 8 } },
    ]
  },
  {
    id: 4,
    text: "How do you handle unavoidable conflict?",
    options: [
      { text: "I avoid it until I have no other choice.", scores: { arjuna: 10, vidura: 10, "Duty-Bound Warrior": 8, "Moral Advisor": 8 } },
      { text: "I orchestrate the outcome from the shadows.", scores: { krishna: 10, drona: 5, "Strategic Visionary": 10, "Compromised Mentor": 5 } },
      { text: "I meet it head on, alone against the world.", scores: { karna: 10, draupadi: 10, duryodhana: 5, "Tragic Hero": 10, "Fierce Catalyst": 8 } },
    ]
  }
];

export default function FindMyCharacter() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [isRevealing, setIsRevealing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnswer = (optionScores: Record<string, number>) => {
    const newScores = { ...scores };
    Object.keys(optionScores).forEach(charId => {
      newScores[charId] = (newScores[charId] || 0) + optionScores[charId];
    });
    setScores(newScores);

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: Record<string, number>) => {
    setIsRevealing(true);
    
    // In our robust graph model, we map archetype scores back to characters
    const characterTotals: Record<string, number> = {};

    characters.forEach(char => {
      const directScore = finalScores[char.id] || 0;
      const archetypeScore = finalScores[char.archetype] || 0;
      characterTotals[char.id] = directScore + archetypeScore;
    });

    let highestChar = characters[0].id;
    let maxScore = 0;
    
    Object.keys(characterTotals).forEach(charId => {
      if (characterTotals[charId] > maxScore) {
        maxScore = characterTotals[charId];
        highestChar = charId;
      }
    });

    const matchChar = characters.find(c => c.id === highestChar) || characters[0];
    
    const percentage = Math.floor(Math.random() * (98 - 82 + 1)) + 82;

    setTimeout(() => {
      setResult({ character: matchChar, percentage });
      setIsRevealing(false);
    }, 4000); 
  };

  return (
    <div className="min-h-screen bg-[#080B12] text-white flex flex-col items-center justify-center relative overflow-hidden px-4">
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[120px]"></div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* QUIZ PHASE */}
        {!isRevealing && !result && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 max-w-3xl w-full text-center"
          >
            <p className="text-primary tracking-[0.4em] uppercase text-sm font-bold mb-8 drop-shadow-md">
              Question {currentQIndex + 1} of {questions.length}
            </p>
            <h1 className="text-4xl md:text-6xl font-serif text-white tracking-widest mb-16 leading-tight">
              {questions[currentQIndex].text}
            </h1>
            <div className="flex flex-col gap-6">
              {questions[currentQIndex].options.map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => handleAnswer(opt.scores)}
                  className="group relative w-full p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 text-left transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10 text-xl md:text-2xl font-light text-white/90 group-hover:text-white transition-colors">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* CINEMATIC REVEAL PHASE */}
        {isRevealing && (
          <motion.div 
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <div className="relative w-64 h-64 mb-12">
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-white/20 border-b-transparent rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-primary animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-widest uppercase mb-4 animate-pulse">
              Consulting The <span className="text-gradient-gold">Akashic Records</span>
            </h2>
            <p className="text-muted tracking-[0.4em] uppercase">Aligning your soul with the epic...</p>
          </motion.div>
        )}

        {/* RESULT PHASE */}
        {result && !isRevealing && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 w-full max-w-5xl flex flex-col items-center"
          >
            <p className="text-sm tracking-[0.4em] uppercase text-white/50 mb-4">Your Epic Reflection</p>
            <h2 className="text-2xl md:text-3xl font-light text-white tracking-widest mb-12 text-center">
              You belong to the <span className="font-bold text-primary">{result.character.archetype}</span> Archetype.
            </h2>
            
            <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.15)] group">
              <Image 
                src={result.character.image} 
                alt={result.character.name} 
                fill 
                className={`object-cover ${result.character.objectPosition} opacity-80 group-hover:scale-105 transition-transform duration-[2s]`} 
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${result.character.theme} opacity-60`}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#080B12] via-[#080B12]/80 to-transparent"></div>
              
              <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 lg:px-24">
                <p className={`text-4xl md:text-6xl font-black mb-2 ${result.character.color}`}>{result.percentage}% Match</p>
                <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-widest drop-shadow-2xl mb-4">
                  {result.character.name}
                </h1>
                <p className="text-xl md:text-2xl text-white/80 font-light max-w-xl">
                  {result.character.description}
                </p>
              </div>
            </div>

            <Link href={`/characters/${result.character.id}`}>
              <button className="bg-primary text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center gap-4">
                Enter Your Universe <ArrowRight className="w-5 h-5" />
              </button>
            </Link>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
