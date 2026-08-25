'use client';

import React, { useState } from 'react';
import { CriticalDecision, DecisionOption } from '@/data/kurukshetra';
import { useRouter } from 'next/navigation';

interface DharmaDecisionProps {
  decision: CriticalDecision;
  dayId: string;
}

export default function DharmaDecision({ decision, dayId }: DharmaDecisionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DecisionOption | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const router = useRouter();

  const handleSimulate = async () => {
    if (!selectedOption) return;
    setIsSimulating(true);

    try {
      // Create simulation branch API call
      const res = await fetch('/api/alternate-timeline/create-branch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          warDayId: dayId,
          eventId: decision.id,
          decisionId: decision.id,
          chosenOptionId: selectedOption.id
        })
      });
      
      const data = await res.json();
      
      if (data.branchId) {
        router.push(`/kurukshetra/simulation/${data.branchId}`);
      } else {
        throw new Error('Simulation branch creation failed.');
      }
    } catch (e) {
      console.error(e);
      alert('Simulation unavailable. Canonical timeline remains unchanged.');
      setIsSimulating(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="text-center">
        <h3 className="text-sm tracking-[0.3em] text-red-500 font-cinzel mb-2 animate-pulse">CRITICAL DECISION</h3>
        <h2 className="text-3xl md:text-4xl font-cinzel text-amber-100 mb-6 drop-shadow-md">{decision.title}</h2>
        <button 
          onClick={() => setIsOpen(true)}
          className="inline-block px-10 py-5 bg-gradient-to-r from-red-950 to-stone-900 border border-red-800/80 text-amber-50 hover:bg-red-900/60 hover:border-red-500/80 shadow-[0_0_20px_rgba(200,20,20,0.3)] hover:shadow-[0_0_30px_rgba(255,50,50,0.6)] cursor-pointer transition-all duration-300 font-cinzel tracking-widest font-semibold"
        >
          APPROACH THE MOMENT
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-stone-950 border border-amber-900/50 p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-xl relative overflow-hidden">
      {/* Visual background for decision state */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black pointer-events-none"></div>
      
      <div className="relative z-10">
        <h3 className="text-red-500 font-cinzel tracking-widest uppercase text-sm mb-4">THE DILEMMA</h3>
        <p className="text-xl text-amber-100/90 leading-relaxed font-light mb-8">
          {decision.description}
        </p>

        <h4 className="text-amber-500/70 font-cinzel tracking-widest uppercase text-xs mb-6 border-b border-amber-900/30 pb-2">CHOOSE YOUR PATH</h4>
        
        <div className="space-y-4 mb-10">
          {decision.options.map(option => (
            <div 
              key={option.id}
              onClick={() => setSelectedOption(option)}
              className={`p-5 border cursor-pointer transition-all duration-300 ${
                selectedOption?.id === option.id 
                  ? 'bg-red-900/20 border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.2)] scale-[1.02]' 
                  : 'bg-black/50 border-amber-900/30 hover:border-amber-700/50 hover:bg-stone-900/50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h5 className={`font-cinzel text-lg ${selectedOption?.id === option.id ? 'text-amber-50' : 'text-amber-100/80'}`}>
                  {option.text}
                </h5>
                {option.isCanonical && (
                  <span className="text-[10px] tracking-widest text-amber-500/80 uppercase border border-amber-500/30 px-2 py-1 bg-amber-900/20">
                    CANONICAL
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400 font-inter italic">{option.immediateIntent}</p>
              
              {selectedOption?.id === option.id && (
                <div className="mt-4 pt-4 border-t border-amber-900/20">
                  <span className="text-xs text-amber-500 uppercase tracking-widest mb-1 block">Dharma Themes</span>
                  <div className="flex gap-2 flex-wrap">
                    {option.dharmaThemes.map(theme => (
                      <span key={theme} className="text-xs text-amber-100/60 bg-amber-900/20 px-2 py-1 rounded">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedOption && (
          <div className="flex justify-end gap-4 animate-fade-in">
            <button 
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 border border-amber-900/50 text-amber-500 hover:bg-amber-900/20 font-cinzel tracking-widest text-sm transition"
              disabled={isSimulating}
            >
              WITHDRAW
            </button>
            <button 
              onClick={handleSimulate}
              disabled={isSimulating}
              className={`px-8 py-3 bg-red-800 text-amber-50 font-cinzel tracking-widest text-sm transition shadow-[0_0_15px_rgba(200,20,20,0.4)] ${
                isSimulating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700 hover:shadow-[0_0_25px_rgba(255,50,50,0.6)]'
              }`}
            >
              {isSimulating ? 'SIMULATING TIMELINE...' : 'ENTER SIMULATION'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
