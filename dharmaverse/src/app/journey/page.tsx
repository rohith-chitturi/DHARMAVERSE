import { getJourneyData } from "@/lib/services/journeyService";
import { auth } from "@/auth";
import Link from "next/link";
import { TreeDeciduous, Compass, Eye, Activity, SaveAll } from "lucide-react";
import { characters, moments as events } from "@/data/lore";
import Image from "next/image";

export default async function JourneyPage() {
  const session = await auth();
  
  if (!session?.user) {
    return (
      <div className="min-h-screen bg-[#05070A] text-white flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-serif uppercase tracking-widest mb-6">The Cosmic Archive</h1>
        <p className="text-white/50 mb-8 max-w-lg font-light leading-relaxed">
          Your journey through the DHARMAVERSE is ephemeral unless anchored. Sign in to preserve your Dharma Evolution, save historical Chamber Sessions, and track your discoveries.
        </p>
        {/* We can use a client component for the auth buttons, or next-auth signIn link */}
        <Link href="/api/auth/signin" className="px-8 py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform">
          Preserve Your Journey
        </Link>
      </div>
    );
  }

  const { latestProfile, evolutionHistory, chamberSessions, discoveries } = await getJourneyData();

  const discoveredCharacters = discoveries.filter(d => d.type === "CHARACTER");
  const discoveredEvents = discoveries.filter(d => d.type === "EVENT");

  return (
    <div className="min-h-screen bg-[#05070A] text-white pt-32 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 pb-8 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-serif uppercase tracking-widest mb-4">Your Dharmaverse</h1>
            <p className="text-primary text-xs uppercase tracking-[0.3em]">The Cosmic Archive of {session.user.name || "Traveler"}</p>
          </div>
          {session.user.image && (
            <img src={session.user.image} alt="User" className="w-16 h-16 rounded-full border border-primary/30" />
          )}
        </div>

        {/* Section 1: Dharma Evolution */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <TreeDeciduous className="text-primary w-6 h-6" />
            <h2 className="text-2xl font-bold uppercase tracking-widest text-white">Your Dharma Evolution</h2>
          </div>
          
          {evolutionHistory.length === 0 ? (
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center">
              <p className="text-white/50 mb-4">You have not yet gazed into the Dharma Mirror.</p>
              <Link href="/dharma-mirror" className="text-primary hover:text-white uppercase tracking-widest text-xs font-bold transition-colors">
                Gaze into the mirror →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {evolutionHistory.map((evo) => (
                <div key={evo.id} className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4">
                    {new Date(evo.createdAt).toLocaleDateString()}
                  </p>
                  <h3 className="text-xl font-serif uppercase tracking-widest text-white mb-2">{evo.primaryArchetype}</h3>
                  <p className="text-xs text-primary uppercase tracking-[0.2em] mb-6">{evo.secondaryArchetype}</p>
                  
                  <div className="space-y-3">
                    {Object.entries(evo.scores as Record<string, number>).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([key, val]) => (
                      <div key={key}>
                        <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1">
                          <span className="text-white/70">{key}</span>
                          <span className="text-white/40">{Math.round((val/70)*100)}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary/70" style={{ width: `${Math.min(100, Math.max(5, (val / 70) * 100))}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Historical Memories (Chamber Sessions) */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <SaveAll className="text-primary w-6 h-6" />
            <h2 className="text-2xl font-bold uppercase tracking-widest text-white">Historical Memories</h2>
          </div>
          
          {chamberSessions.length === 0 ? (
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center">
              <p className="text-white/50 mb-4">No Akashic Chamber sessions preserved.</p>
              <Link href="/chamber" className="text-primary hover:text-white uppercase tracking-widest text-xs font-bold transition-colors">
                Enter the Chamber →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {chamberSessions.map((session) => (
                <div key={session.id} className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl flex items-center justify-between hover:bg-white/[0.05] transition-colors cursor-pointer">
                  <div>
                    <h3 className="text-lg uppercase tracking-widest text-white mb-1">{session.scenarioId.replace(/_/g, ' ')}</h3>
                    <p className="text-xs text-white/40 tracking-widest uppercase">
                      {new Date(session.datePlayed).toLocaleDateString()} • {session.messages.length} Turns • Language: {session.language}
                    </p>
                  </div>
                  <button className="text-primary hover:text-white transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Discovered Lore */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <Compass className="text-primary w-6 h-6" />
            <h2 className="text-2xl font-bold uppercase tracking-widest text-white">Discovered Lore</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Characters */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm text-white/50 uppercase tracking-[0.3em] font-bold mb-6 flex justify-between">
                <span>Characters</span>
                <span className="text-primary">{discoveredCharacters.length} / {characters.length}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {characters.map(c => {
                  const discovered = discoveredCharacters.some(d => d.entityId === c.id);
                  return (
                    <div key={c.id} className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-widest border ${discovered ? 'border-primary/50 text-white bg-primary/10' : 'border-white/10 text-white/30 bg-black'}`}>
                      {discovered ? c.name : '???'}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Events */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm text-white/50 uppercase tracking-[0.3em] font-bold mb-6 flex justify-between">
                <span>Events</span>
                <span className="text-primary">{discoveredEvents.length} / {events.length}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {events.map(e => {
                  const discovered = discoveredEvents.some(d => d.entityId === e.id);
                  return (
                    <div key={e.id} className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-widest border ${discovered ? 'border-primary/50 text-white bg-primary/10' : 'border-white/10 text-white/30 bg-black'}`}>
                      {discovered ? e.title : '???'}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Continue Exploring */}
        <div>
          <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-6 text-center">Continue Exploring</h2>
          <div className="flex justify-center gap-6">
            <Link href="/characters" className="px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors uppercase tracking-widest text-xs font-bold text-white/70 hover:text-white">
              Discover Characters
            </Link>
            <Link href="/chamber" className="px-6 py-3 border border-primary/50 text-primary rounded-full hover:bg-primary hover:text-black transition-colors uppercase tracking-widest text-xs font-bold">
              Enter New Chamber
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
