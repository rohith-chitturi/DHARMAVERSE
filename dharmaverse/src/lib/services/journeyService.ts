import { getUserDharmaProfiles, getUserDharmaEvolution } from "./dharmaService";
import { getUserChamberSessions } from "./chamberService";
import { getUserDiscoveries } from "./discoveryService";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { UserNarrativeContext, ExploredNode, InteractionDepth } from "@/lib/intelligence/NarrativeContext";

export async function getJourneyData() {
  const [profiles, evolutions, sessions, discoveries] = await Promise.all([
    getUserDharmaProfiles(),
    getUserDharmaEvolution(),
    getUserChamberSessions(),
    getUserDiscoveries(),
  ]);

  return {
    latestProfile: profiles?.[0] || null,
    evolutionHistory: evolutions || [],
    chamberSessions: sessions || [],
    discoveries: discoveries || [],
  };
}

export async function getUserNarrativeContext(): Promise<UserNarrativeContext | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  const [
    profile, 
    preferences,
    characterInteractions,
    eventInteractions
  ] = await Promise.all([
    getUserDharmaProfiles().then(p => p?.[0] || null),
    prisma.userPreference.findUnique({ where: { userId: session.user.id } }),
    prisma.characterInteraction.findMany({ where: { userId: session.user.id } }),
    prisma.eventInteraction.findMany({ where: { userId: session.user.id } })
  ]);

  // Determine traits from top profile scores
  let primaryTraits: string[] = [];
  let secondaryTraits: string[] = [];
  
  if (profile && profile.scores) {
    const sorted = Object.entries(profile.scores as Record<string, number>).sort((a,b) => b[1] - a[1]);
    primaryTraits = sorted.slice(0, 2).map(s => s[0]);
    secondaryTraits = sorted.slice(2, 4).map(s => s[0]);
  }

  // Parse interactions into ExploredNodes
  const charNodes = new Map<string, ExploredNode>();
  characterInteractions.forEach(int => {
    let depth: InteractionDepth = 'VIEWED';
    if (int.interactionType === 'INTERACTED') depth = 'INTERACTED';
    if (int.interactionType === 'DEEP_EXPERIENCE') depth = 'DEEP_EXPERIENCE';

    const existing = charNodes.get(int.characterId);
    if (!existing || depthLevel(depth) > depthLevel(existing.depth)) {
      charNodes.set(int.characterId, {
        id: int.characterId,
        type: 'character',
        depth,
        lastExplored: int.lastInteractionAt,
        count: int.interactionCount
      });
    }
  });

  const eventNodes = new Map<string, ExploredNode>();
  eventInteractions.forEach(int => {
    let depth: InteractionDepth = 'VIEWED';
    if (int.interactionType === 'INTERACTED') depth = 'INTERACTED';
    if (int.interactionType === 'DEEP_EXPERIENCE') depth = 'DEEP_EXPERIENCE';
    if (int.interactionType === 'COMPLETED') depth = 'COMPLETED';

    const existing = eventNodes.get(int.eventId);
    if (!existing || depthLevel(depth) > depthLevel(existing.depth)) {
      eventNodes.set(int.eventId, {
        id: int.eventId,
        type: 'event',
        depth,
        lastExplored: int.lastInteractionAt,
        count: int.interactionCount
      });
    }
  });

  const knownCharacters = Array.from(charNodes.values());
  const knownEvents = Array.from(eventNodes.values());
  
  const deepExperiences = [...knownCharacters, ...knownEvents].filter(n => 
    n.depth === 'DEEP_EXPERIENCE' || n.depth === 'COMPLETED'
  );

  return {
    primaryDharmaTraits: primaryTraits,
    secondaryDharmaTraits: secondaryTraits,
    recentDharmaEvolution: "Stable", // Can be calculated from evolution history later
    knownCharacters,
    knownEvents,
    knownRelationships: [], // To be implemented when relationship interactions are tracked
    deepExperiences,
    recentThemes: primaryTraits, // Simplified mapping for now
    epicKnowledge: (preferences?.epicKnowledge as any) || 'NEWCOMER',
    language: preferences?.language || 'en',
    complexity: (preferences?.complexity as any) || 'DETAILED'
  };
}

function depthLevel(depth: InteractionDepth): number {
  switch (depth) {
    case 'VIEWED': return 1;
    case 'INTERACTED': return 2;
    case 'COMPLETED': return 3;
    case 'DEEP_EXPERIENCE': return 4;
    default: return 0;
  }
}
