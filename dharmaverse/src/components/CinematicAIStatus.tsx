import React, { useState, useEffect } from 'react';

export default function CinematicAIStatus() {
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    "Consulting the Akashic Records...",
    "Cross-checking the timeline...",
    "Validating canonical constraints...",
    "Consciousness synchronized."
  ];

  useEffect(() => {
    const timers = [
      setTimeout(() => setStatusIndex(1), 1500),
      setTimeout(() => setStatusIndex(2), 3500),
      setTimeout(() => setStatusIndex(3), 5500)
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-widest text-primary/70">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="font-bold text-primary">INTELLIGENCE ORCHESTRATOR</span>
      </div>
      <div className="space-y-1 pl-6 border-l border-primary/20">
        {statuses.map((status, index) => (
          <div 
            key={index} 
            className={`transition-all duration-500 ${index === statusIndex ? 'opacity-100 text-amber-400' : index < statusIndex ? 'opacity-50 text-white/50' : 'opacity-0 hidden'}`}
          >
            {index < statusIndex && <span className="text-green-500 mr-2">✓</span>}
            {index === statusIndex && <span className="text-primary animate-pulse mr-2">►</span>}
            {status}
          </div>
        ))}
      </div>
    </div>
  );
}
