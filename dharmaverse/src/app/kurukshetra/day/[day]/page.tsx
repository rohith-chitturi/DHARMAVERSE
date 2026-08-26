import React from 'react';
import { warStateEngine } from '@/lib/kurukshetra/WarStateEngine';
import Link from 'next/link';
import WarRoomDashboard from '@/components/kurukshetra/WarRoomDashboard';
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
        <WarRoomDashboard dayData={dayData} />
      </main>
    </div>
  );
}
