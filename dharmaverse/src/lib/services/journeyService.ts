import { getUserDharmaProfiles, getUserDharmaEvolution } from "./dharmaService";
import { getUserChamberSessions } from "./chamberService";
import { getUserDiscoveries } from "./discoveryService";

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
