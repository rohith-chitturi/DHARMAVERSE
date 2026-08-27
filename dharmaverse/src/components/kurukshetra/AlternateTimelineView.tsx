'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import VoicePlayer from '@/components/VoicePlayer';

interface AlternateTimelineViewProps {
  branchId: string;
}

export default function AlternateTimelineView({ branchId }: AlternateTimelineViewProps) {
  const [branchData, setBranchData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const res = await fetch(`/api/alternate-timeline/branch/${branchId}`);
        if (!res.ok) throw new Error('Failed to load simulation branch');
        const data = await res.json();
        
        if (data.causalNodes) {
          setBranchData(data);
        } else {
          setError("Simulation data is incomplete.");
        }
      } catch (e: any) {
        setError(e.message);
      }
    };

    fetchBranch();
  }, [branchId]);

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex flex-col items-center justify-center font-cinzel">
        <h2 className="text-2xl mb-4">SIMULATION UNAVAILABLE</h2>
        <p className="text-gray-400 mb-8">{error}</p>
        <button onClick={() => router.back()} className="text-amber-500 hover:underline">
          Return to Canonical Timeline
        </button>
      </div>
    );
  }

  if (!branchData) {
    return (
      <div className="min-h-screen bg-black text-violet-400 flex flex-col items-center justify-center font-cinzel">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-violet-500 mb-4"></div>
        <h2 className="text-xl tracking-widest animate-pulse">CALCULATING BUTTERFLY EFFECT...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-violet-50 font-inter relative overflow-hidden">
      {/* Alternate Reality Visuals */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-950/40 via-black to-slate-950"></div>
        {/* Fractured effect */}
        <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full border-t-[40px] border-l-[40px] border-b-[40px] border-violet-900/10 rounded-[100px] pointer-events-none transform -rotate-1 scale-105"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-1 border border-violet-500/50 bg-violet-900/30 text-violet-300 text-xs tracking-[0.4em] mb-6 animate-pulse">
            SIMULATION — NON-CANONICAL
          </div>
          <h1 className="text-4xl md:text-5xl font-cinzel text-violet-100 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            ALTERNATE TIMELINE
          </h1>
          <p className="mt-4 text-violet-300/80 font-cinzel text-lg">{branchData.branchSummary}</p>
        </header>

        <div className="space-y-12">
          {/* Causal Chain */}
          <div className="relative border-l-2 border-violet-900/50 pl-8 ml-4 space-y-12">
            
            {branchData.causalNodes.map((node: any, idx: number) => (
              <div key={node.id || idx} className="relative">
                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-violet-900 border border-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                <h3 className="text-violet-400 font-cinzel tracking-widest text-sm mb-2 uppercase flex items-center gap-4">
                  {node.type.replace('_', ' ')}
                  <span className="text-[10px] px-2 py-1 bg-violet-950 border border-violet-800 text-violet-300">{node.confidence}</span>
                </h3>
                <p className="text-violet-100 text-lg leading-relaxed">{node.description}</p>
                {node.affectedCharacters?.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {node.affectedCharacters.map((c: string, i: number) => (
                      <span key={i} className="text-xs px-2 py-1 border border-violet-800/50 bg-violet-900/20 text-violet-300/80 uppercase font-cinzel">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Speculative Future */}
            {branchData.divergences?.length > 0 && (
              <div className="relative opacity-60 mt-12">
                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-slate-900 border border-slate-600 border-dashed"></div>
                <h3 className="text-slate-400 font-cinzel tracking-widest text-sm mb-2 uppercase flex items-center gap-4">
                  SPECULATIVE FUTURE
                  <span className="text-[10px] px-2 py-1 bg-slate-900 border border-slate-700 text-slate-400">UNWRITTEN</span>
                </h3>
                <ul className="list-disc list-inside space-y-2 text-slate-300 italic">
                  {branchData.divergences.map((div: string, idx: number) => (
                    <li key={idx}>{div}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
        </div>

        <div className="mt-20 pt-8 border-t border-violet-900/50 text-center">
          <p className="text-sm text-violet-400/50 font-inter italic mb-8 max-w-lg mx-auto">
            "You have chosen a path untrodden. The consequences are yours to bear."
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            <Link href={`/chamber?scenario=karna-dilemma&branchId=${branchId}`}>
              <button className="px-8 py-4 bg-violet-900/40 border border-violet-500/50 text-violet-300 hover:bg-violet-800/60 hover:border-violet-400 transition font-cinzel tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                EXPLORE ALTERNATE CHAMBER
              </button>
            </Link>

            <button 
              onClick={async () => {
                const { restoreCanonicalSessionState } = await import('@/app/actions/warState');
                await restoreCanonicalSessionState(branchData.originDay);
                router.push(`/kurukshetra/day/${branchData.originDay}`);
              }}
              className="px-8 py-4 bg-transparent border border-amber-500/50 text-amber-500 hover:bg-amber-950/30 hover:border-amber-400 transition font-cinzel tracking-widest"
            >
              RESTORE CANONICAL TIMELINE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
