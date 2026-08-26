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
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Column: Context */}
        <div>
          <div className="mb-8">
            <h3 className="text-red-500 font-cinzel tracking-widest uppercase text-sm mb-2">SITUATION</h3>
            <p className="text-xl text-amber-100/90 leading-relaxed font-light">
              {decision.description}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-red-500 font-cinzel tracking-widest uppercase text-sm mb-2">WHAT IS AT STAKE</h3>
            <p className="text-lg text-amber-200/70 leading-relaxed font-light">
              {decision.stakes}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-red-500 font-cinzel tracking-widest uppercase text-sm mb-2">COMPETING VALUES</h3>
            <div className="flex flex-wrap gap-2">
              {decision.competingValues.map((v, i) => (
                <span key={i} className="px-3 py-1 border border-amber-900/40 bg-amber-900/10 text-amber-300/80 text-xs tracking-widest uppercase font-cinzel">
                  {v}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-red-500 font-cinzel tracking-widest uppercase text-sm mb-2">WHY THIS MOMENT MATTERS</h3>
            <p className="text-md text-amber-100/60 leading-relaxed font-light italic border-l border-red-900/50 pl-4">
              {decision.whyItMatters}
            </p>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div>
          <h4 className="text-amber-500/70 font-cinzel tracking-widest uppercase text-xs mb-6 border-b border-amber-900/30 pb-2">POSSIBLE ACTIONS</h4>
          
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
              </div>
            ))}
          </div>

          {selectedOption && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button 
                onClick={handleSimulate}
                disabled={isSimulating}
                className="w-full py-4 bg-gradient-to-r from-red-950 to-red-900 border border-red-500 text-amber-50 shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:shadow-[0_0_30px_rgba(255,50,50,0.6)] cursor-pointer transition-all font-cinzel tracking-widest font-semibold flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-amber-50 border-t-transparent rounded-full"></span>
                    CALCULATING CONSEQUENCES...
                  </>
                ) : (
                  <>MAKE YOUR CHOICE</>
                )}
              </button>
              {!selectedOption.isCanonical && (
                <p className="text-xs text-red-400/80 text-center mt-3 tracking-widest uppercase">
                  Warning: Creating Alternate Timeline Branch
                </p>
              )}
            </div>

          )}
        </div>
      </div>
    </div>
  );
}
