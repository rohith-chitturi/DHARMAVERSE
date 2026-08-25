import React from 'react';
import Link from 'next/link';

export default function KurukshetraLanding() {
  return (
    <div className="min-h-screen bg-black text-amber-50 flex flex-col items-center justify-center relative overflow-hidden font-cinzel">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black"></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        {/* Subtle dust particles could be added via CSS animation here */}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-6">
        <h3 className="text-amber-500 tracking-[0.5em] uppercase text-sm mb-4 font-inter font-semibold opacity-80">
          The Dharma Intelligence Simulation
        </h3>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-700 filter drop-shadow-lg">
          KURUKSHETRA
        </h1>
        
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-red-800 to-transparent mb-8"></div>
        
        <p className="text-xl md:text-2xl text-amber-100/70 max-w-2xl font-light mb-4">
          18 DAYS.
        </p>
        <p className="text-xl md:text-2xl text-amber-100/70 max-w-2xl font-light mb-12">
          One war. A thousand choices.
        </p>

        <p className="text-md text-amber-100/50 max-w-xl font-inter mb-16 italic">
          "This is a controlled historical simulation. The Mahabharata remains the canonical world. Your choices will create temporary alternate timelines to explore consequences, but canonical reality is immutable."
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <Link href="/kurukshetra/day/day-17">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-red-900 to-amber-900 border border-amber-500/30 rounded shadow-[0_0_20px_rgba(180,20,20,0.3)] hover:shadow-[0_0_30px_rgba(255,50,50,0.6)] transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <span className="relative text-amber-50 tracking-[0.2em] font-semibold">ENTER DAY 17</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
