'use client';

import React from 'react';

interface BattlefieldMapProps {
  dayId: string;
}

export default function BattlefieldMap({ dayId }: BattlefieldMapProps) {
  // Currently, we only implement Day 17.
  // The Map visualizes the Makara Vyuha (Crocodile Formation) used by Karna.

  return (
    <div className="w-full h-96 bg-stone-950 relative overflow-hidden rounded-lg border border-amber-900/30 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
      {/* Background Terrain */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
        
        {/* Grid lines */}
        <g stroke="rgba(180, 20, 20, 0.1)" strokeWidth="1">
          {Array.from({ length: 20 }).map((_, i) => (
            <React.Fragment key={`grid-${i}`}>
              <line x1="0" y1={i * 30} x2="1000" y2={i * 30} />
              <line x1={i * 50} y1="0" x2={i * 50} y2="600" />
            </React.Fragment>
          ))}
        </g>

        {/* Kurukshetra River / Features */}
        <path d="M -100 100 Q 300 150 500 300 T 1100 400" fill="none" stroke="rgba(255,50,50,0.05)" strokeWidth="40" />

        {/* Makara Vyuha (Crocodile Formation) - Kaurava - Red/Amber */}
        <g className="kaurava-formation animate-pulse-slow">
          {/* Head (Karna) */}
          <polygon points="700,300 750,250 800,300 750,350" fill="rgba(200,50,50,0.2)" stroke="rgba(255,100,100,0.6)" strokeWidth="2" />
          <circle cx="750" cy="300" r="10" fill="#ef4444" className="animate-ping" />
          <text x="750" y="280" fill="#fca5a5" fontSize="12" textAnchor="middle" className="font-cinzel tracking-widest">KARNA</text>
          
          {/* Body/Legs */}
          <path d="M 800 300 L 850 200 L 900 250 L 950 300 L 900 350 L 850 400 Z" fill="rgba(150,20,20,0.1)" stroke="rgba(200,50,50,0.4)" strokeWidth="2" />
          <circle cx="850" cy="200" r="6" fill="#b91c1c" />
          <text x="850" y="180" fill="#fca5a5" fontSize="10" textAnchor="middle" className="font-cinzel">SHALYA</text>
          <circle cx="850" cy="400" r="6" fill="#b91c1c" />
          <text x="850" y="420" fill="#fca5a5" fontSize="10" textAnchor="middle" className="font-cinzel">DURYODHANA</text>
        </g>

        {/* Pandava Forces - Blue/Cyan */}
        <g className="pandava-formation">
          {/* Arjuna & Krishna */}
          <polygon points="300,300 250,250 200,300 250,350" fill="rgba(50,150,255,0.15)" stroke="rgba(100,200,255,0.6)" strokeWidth="2" />
          <circle cx="250" cy="300" r="10" fill="#3b82f6" />
          <circle cx="270" cy="300" r="6" fill="#60a5fa" />
          <text x="250" y="280" fill="#93c5fd" fontSize="12" textAnchor="middle" className="font-cinzel tracking-widest">ARJUNA</text>
          <text x="270" y="320" fill="#93c5fd" fontSize="10" textAnchor="middle" className="font-cinzel">KRISHNA</text>

          {/* Dhrishtadyumna & Others */}
          <path d="M 200 300 L 150 200 L 100 250 L 50 300 L 100 350 L 150 400 Z" fill="rgba(20,100,200,0.1)" stroke="rgba(50,150,255,0.4)" strokeWidth="2" />
          <circle cx="150" cy="200" r="6" fill="#2563eb" />
          <text x="150" y="180" fill="#93c5fd" fontSize="10" textAnchor="middle" className="font-cinzel">YUDHISHTHIRA</text>
        </g>

        {/* The Clash Line */}
        <path d="M 500 150 Q 450 300 500 450" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" />
        
        {/* Tension Points */}
        <circle cx="500" cy="300" r="40" fill="rgba(255,50,50,0.1)" />
        <circle cx="500" cy="300" r="20" fill="rgba(255,255,255,0.1)" />
        <text x="500" y="250" fill="white" opacity="0.5" fontSize="10" textAnchor="middle" className="font-cinzel tracking-[0.2em]">ACTIVE COMBAT ZONE</text>
      </svg>
    </div>
  );
}
