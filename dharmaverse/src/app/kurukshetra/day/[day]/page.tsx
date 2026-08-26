import React from 'react';
import { warStateEngine } from '@/lib/kurukshetra/WarStateEngine';
import Link from 'next/link';
import BattlefieldMap from '@/components/kurukshetra/BattlefieldMap';
import DharmaDecision from '@/components/kurukshetra/DharmaDecision';
import DayNarration from '@/components/kurukshetra/DayNarration';
import { markDiscovered } from '@/lib/services/discoveryService';

export default async function WarDayPage({ params }: { params: Promise<{ day: string }> }) {
  const resolvedParams = await params;
  await markDiscovered('kurukshetra_day', resolvedParams.day);
  const dayData = warStateEngine.getWarDay(resolvedParams.day);

  if (!dayData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-cinzel">
        <div className="text-center">
          <h1 className="text-4xl text-red-600 mb-4">CANONICAL DATA MISSING</h1>
          <p className="text-gray-400">The historical data for this day is not yet available.</p>
          <Link href="/kurukshetra" className="text-amber-500 hover:underline mt-6 inline-block">Return to War Room</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-amber-50 font-inter">
      {/* Cinematic Header */}
      <header className="relative w-full h-[40vh] min-h-[300px] flex flex-col items-center justify-center border-b border-amber-900/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/40 via-black to-stone-950 z-0"></div>
        <div className="relative z-10 text-center px-4">
          <h3 className="text-red-500 tracking-[0.4em] uppercase text-sm mb-2 font-cinzel">CANONICAL TIMELINE</h3>
          <h1 className="text-5xl md:text-7xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-700 mb-4">
            DAY {dayData.dayNumber}
          </h1>
          <h2 className="text-2xl md:text-3xl text-amber-100/80 font-cinzel tracking-widest">{dayData.title}</h2>
        </div>
      </header>

      {/* War Room Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Stats & Tension */}
          <div className="lg:col-span-1 space-y-8">
            <section className="bg-black/50 border border-amber-900/20 p-6 rounded-lg backdrop-blur">
              <h4 className="text-amber-500 font-cinzel tracking-widest uppercase text-xs mb-4 border-b border-amber-900/30 pb-2">Commanders</h4>
              <div className="flex justify-between items-center mb-2">
                <span className="text-red-400 font-semibold">Kaurava:</span>
                <span className="text-amber-100 capitalize">{dayData.commanderKaurava}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-400 font-semibold">Pandava:</span>
                <span className="text-amber-100 capitalize">{dayData.commanderPandava}</span>
              </div>
            </section>

            <section className="bg-black/50 border border-amber-900/20 p-6 rounded-lg backdrop-blur">
              <h4 className="text-amber-500 font-cinzel tracking-widest uppercase text-xs mb-4 border-b border-amber-900/30 pb-2">Active Tensions</h4>
              <ul className="space-y-3">
                {dayData.tensions.map((tension, i) => (
                  <li key={i} className="text-amber-100/70 text-sm leading-relaxed flex gap-2">
                    <span className="text-red-600 mt-1">♦</span> {tension}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Events & Interactive Layers */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* AI Narrative */}
            <DayNarration warDayId={dayData.id} />

            {/* Major Events */}
            <section>
              <h3 className="text-2xl font-cinzel text-amber-500 mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-amber-500/50"></span>
                Canonical Events
                <span className="flex-1 h-px bg-amber-500/10"></span>
              </h3>
              <div className="space-y-4">
                {dayData.majorEvents.map((event, i) => (
                  <div key={i} className="p-4 bg-gradient-to-r from-red-950/20 to-transparent border-l border-red-900/50 text-amber-100/80">
                    {event}
                  </div>
                ))}
              </div>
            </section>

            {/* Battlefield SVG Visualization */}
            <section>
              <BattlefieldMap dayId={dayData.id} />
            </section>

            {/* Chamber Integration */}
            <section className="grid grid-cols-2 gap-6">
              <Link href={`/chamber?scenario=${dayData.id.replace('-', '_')}_pandava`} className="block">
                <div className="p-6 h-full border border-blue-900/30 bg-blue-950/10 hover:bg-blue-950/20 transition cursor-pointer text-center group">
                  <h4 className="text-blue-400 font-cinzel tracking-widest uppercase mb-2">Pandava Camp</h4>
                  <p className="text-xs text-blue-200/50 group-hover:text-blue-200/80 transition">Enter the Akashic Chamber</p>
                </div>
              </Link>
              <Link href={`/chamber?scenario=${dayData.id.replace('-', '_')}_kaurava`} className="block">
                <div className="p-6 h-full border border-red-900/30 bg-red-950/10 hover:bg-red-950/20 transition cursor-pointer text-center group">
                  <h4 className="text-red-400 font-cinzel tracking-widest uppercase mb-2">Kaurava Camp</h4>
                  <p className="text-xs text-red-200/50 group-hover:text-red-200/80 transition">Enter the Akashic Chamber</p>
                </div>
              </Link>
            </section>

            {/* Critical Decision */}
            {dayData.criticalDecisions.length > 0 && (
              <section className="mt-16 pt-12 border-t border-amber-900/30">
                <DharmaDecision decision={dayData.criticalDecisions[0]} dayId={dayData.id} />
              </section>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
