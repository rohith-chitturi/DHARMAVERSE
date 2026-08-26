'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { WarDay, DayState } from '@/data/kurukshetra';
import { WarSessionState } from '@/lib/kurukshetra/WarStateEngine';
import { getSessionState, advanceSessionState } from '@/app/actions/warState';
import Link from 'next/link';
import BattlefieldMap from '@/components/kurukshetra/BattlefieldMap';
import DharmaDecision from '@/components/kurukshetra/DharmaDecision';
import DayNarration from '@/components/kurukshetra/DayNarration';

interface WarRoomDashboardProps {
  dayData: WarDay;
}

const STATE_ORDER: DayState[] = [
  'DAY_START',
  'BATTLE_ACTIVE',
  'KARNA_ENGAGED',
  'CRITICAL_MOMENT',
  'DECISION_AVAILABLE',
  'ALTERNATE_BRANCH',
  'CANONICAL_RESTORED'
];

export default function WarRoomDashboard({ dayData }: WarRoomDashboardProps) {
  const [session, setSession] = useState<WarSessionState | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getSessionState(dayData.id).then(setSession);
  }, [dayData.id]);

  const handleAdvance = () => {
    startTransition(async () => {
      const newSession = await advanceSessionState(dayData.id);
      setSession(newSession);
    });
  };

  if (!session) {
    return <div className="text-center py-20 text-amber-500 animate-pulse font-cinzel tracking-widest">INITIALIZING SIMULATION STATE...</div>;
  }

  const currentStateIndex = STATE_ORDER.indexOf(session.currentState);
  const currentEvent = dayData.chronology[session.currentEventIndex];

  // Helper to check if a feature is unlocked
  const isUnlocked = (requiredState: DayState) => {
    return currentStateIndex >= STATE_ORDER.indexOf(requiredState);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      {/* Chronological State Indicator */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
        {dayData.chronology.map((event, idx) => {
          const eventStateIndex = STATE_ORDER.indexOf(event.stateTrigger);
          const isPast = currentStateIndex > eventStateIndex;
          const isCurrent = currentStateIndex === eventStateIndex;
          const isFuture = currentStateIndex < eventStateIndex;
          
          return (
            <div key={event.eventId} className="flex items-center">
              <div className={`px-3 py-1 text-xs md:text-sm tracking-widest font-cinzel border ${
                isCurrent ? 'bg-red-900/40 text-amber-50 border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.5)]' :
                isPast ? 'bg-black/50 text-amber-500/50 border-amber-900/30' :
                'bg-black/20 text-gray-700 border-gray-800'
              }`}>
                {event.title.toUpperCase()}
              </div>
              {idx < dayData.chronology.length - 1 && (
                <div className={`h-px w-4 md:w-8 mx-1 ${isPast ? 'bg-amber-900/50' : 'bg-gray-800'}`}></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mb-12">
        {currentStateIndex < STATE_ORDER.indexOf('CRITICAL_MOMENT') && (
          <button 
            onClick={handleAdvance} 
            disabled={isPending}
            className="px-6 py-2 border border-amber-900/50 hover:bg-amber-900/20 text-amber-500 font-cinzel tracking-widest text-sm transition"
          >
            {isPending ? 'ADVANCING TIME...' : 'ADVANCE TIMELINE'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Stats & Tension */}
        <div className="lg:col-span-1 space-y-8">
          <section className="bg-black/50 border border-amber-900/20 p-6 rounded-lg backdrop-blur relative overflow-hidden">
             {/* Current Event Context */}
             <h4 className="text-amber-500 font-cinzel tracking-widest uppercase text-xs mb-4 border-b border-amber-900/30 pb-2">Active Development</h4>
             <h3 className="text-xl text-amber-50 font-cinzel mb-2">{currentEvent.title}</h3>
             <p className="text-sm text-amber-100/70 mb-4">{currentEvent.description}</p>
             <div className="text-xs text-red-400/80 uppercase tracking-widest">
               Location: {currentEvent.location}
             </div>
          </section>

          <section className="bg-black/50 border border-amber-900/20 p-6 rounded-lg backdrop-blur">
            <h4 className="text-amber-500 font-cinzel tracking-widest uppercase text-xs mb-4 border-b border-amber-900/30 pb-2">Active Characters</h4>
            <div className="flex flex-wrap gap-2">
              {currentEvent.characters.map(char => (
                <span key={char} className="px-2 py-1 text-xs bg-amber-900/20 border border-amber-900/40 text-amber-200 capitalize">
                  {char}
                </span>
              ))}
            </div>
          </section>

          <section className="bg-black/50 border border-amber-900/20 p-6 rounded-lg backdrop-blur">
            <h4 className="text-amber-500 font-cinzel tracking-widest uppercase text-xs mb-4 border-b border-amber-900/30 pb-2">Known Facts</h4>
            <ul className="space-y-3">
              {currentEvent.canonicalFacts.map((fact, i) => (
                <li key={i} className="text-amber-100/70 text-sm leading-relaxed flex gap-2">
                  <span className="text-red-600 mt-1">♦</span> {fact}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Events & Interactive Layers */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* AI Narrative Context - Now aware of current state */}
          <DayNarration warDayId={dayData.id} currentState={session.currentState} />

          {/* Battlefield SVG Visualization */}
          <section>
            <BattlefieldMap dayId={dayData.id} currentState={session.currentState} />
          </section>

          {/* Chamber Integration - Only available if characters can be interacted with */}
          {currentEvent.availableInteractions.length > 0 && (
            <section className="grid grid-cols-2 gap-6">
              <Link href={`/chamber?scenario=${dayData.id.replace('-', '_')}_pandava`} className="block">
                <div className="p-6 h-full border border-blue-900/30 bg-blue-950/10 hover:bg-blue-950/20 transition cursor-pointer text-center group">
                  <h4 className="text-blue-400 font-cinzel tracking-widest uppercase text-sm mb-2 group-hover:text-blue-300">Pandava Camp</h4>
                  <p className="text-xs text-blue-200/50">Consult Arjuna & Yudhishthira</p>
                </div>
              </Link>
              <Link href={`/chamber?scenario=${dayData.id.replace('-', '_')}_kaurava`} className="block">
                <div className="p-6 h-full border border-red-900/30 bg-red-950/10 hover:bg-red-950/20 transition cursor-pointer text-center group">
                  <h4 className="text-red-400 font-cinzel tracking-widest uppercase text-sm mb-2 group-hover:text-red-300">Kaurava Camp</h4>
                  <p className="text-xs text-red-200/50">Consult Karna & Shalya</p>
                </div>
              </Link>
            </section>
          )}

          {/* Dharma Decision - Unlocked at CRITICAL_MOMENT */}
          {isUnlocked('CRITICAL_MOMENT') && dayData.criticalDecisions.map(decision => (
            <section key={decision.id} className="pt-8">
              <DharmaDecision decision={decision} dayId={dayData.id} />
            </section>
          ))}
          
        </div>
      </div>
    </div>
  );
}
