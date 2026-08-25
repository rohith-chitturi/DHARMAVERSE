import { UserNarrativeContext, ExploredNode } from "./NarrativeContext";
import { characters, moments } from "@/data/lore";
import { mapLocations } from "@/data/mapData";

export interface Recommendation {
  id: string;
  type: 'character' | 'event' | 'location';
  title: string;
  shortExplanation: string;
  whyThisPath: string;
  url: string;
}

export class RecommendationEngine {
  
  /**
   * Generates deterministic recommendations based on what the user has explored
   * and what their Dharma Profile emphasizes.
   */
  generateRecommendations(userContext: UserNarrativeContext): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const exploredIds = new Set([
      ...userContext.knownCharacters.map(n => n.id),
      ...userContext.knownEvents.map(n => n.id)
    ]);

    // Simple deterministic scoring based on Traits
    const hasLoyalty = userContext.primaryDharmaTraits.includes("Loyalty");
    const hasJustice = userContext.primaryDharmaTraits.includes("Justice");
    const hasSacrifice = userContext.primaryDharmaTraits.includes("Sacrifice");

    // 1. Character Recommendation logic
    if (hasLoyalty || hasSacrifice) {
      if (!exploredIds.has("karna")) {
        recommendations.push({
          id: "karna",
          type: "character",
          title: "Explore Karna",
          shortExplanation: "The Tragic Hero bound by obligation.",
          whyThisPath: "Your recent reflections center on loyalty and sacrifice. Karna's story explores the extreme consequences of unwavering devotion over cosmic justice.",
          url: "/universe/karna"
        });
      } else if (!exploredIds.has("bhishma")) {
        recommendations.push({
          id: "bhishma",
          type: "character",
          title: "Explore Bhishma",
          shortExplanation: "The Patriarch bound by his terrible vow.",
          whyThisPath: "Since you value duty and sacrifice, Bhishma represents the ultimate conflict between structural loyalty and higher dharma.",
          url: "/universe/bhishma"
        });
      }
    }

    if (hasJustice && !exploredIds.has("vidura")) {
      recommendations.push({
        id: "vidura",
        type: "character",
        title: "Explore Vidura",
        shortExplanation: "The Voice of Righteousness.",
        whyThisPath: "Your profile strongly resonates with Justice. Vidura offers a contrasting path where moral rightness takes priority over personal allegiance.",
        url: "/universe/vidura" // Assuming this route would exist
      });
    }

    // 2. Event/Simulation Recommendation logic
    if (!exploredIds.has("kurukshetra-day-17") && exploredIds.has("karna")) {
      recommendations.push({
        id: "kurukshetra-day-17",
        type: "event",
        title: "Karna vs Arjuna",
        shortExplanation: "The final stand on Day 17.",
        whyThisPath: "You have deeply explored Karna's character. Now step into his final simulation to experience the climax of his loyalty and tragedy.",
        url: "/experience/karna-vs-arjuna"
      });
    }

    // Fallback recommendation if nothing matched
    if (recommendations.length === 0) {
      recommendations.push({
        id: "krishna",
        type: "character",
        title: "Seek Krishna's Counsel",
        shortExplanation: "The Divine Strategist.",
        whyThisPath: "Your journey has reached a point of balance. Krishna offers a cosmic perspective that transcends standard human traits.",
        url: "/universe/krishna"
      });
    }

    // Return top 3 recommendations
    return recommendations.slice(0, 3);
  }
}

export const recommendationEngine = new RecommendationEngine();
