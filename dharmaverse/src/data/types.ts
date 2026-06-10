export interface TimelineEvent {
  year: string;
  order: number;
  event: string;
}

export interface Relationship {
  id: string; // Target character ID
  name: string; // Target character name
  relation: string; // E.g., "Loyal Friend"
  strength: number; // 1-100 scale
}

export interface CharacterQuote {
  text: string;
  context: string;
}

export interface WorldMemory {
  politicalState: string;
  unresolvedConflicts: string[];
}

export interface EventConsciousness {
  activeCharacters: string[]; // Character IDs present in the simulation
  knownFacts: string[];       // Global truths of the moment
  eventTensions: string[];    // E.g., "Karna vs Arjuna", "Shalya demoralizing Karna"
  eventObjectives: { characterId: string; objective: string }[];
  criticalDecisions: { decision: string; consequence: string; futureImpact: string }[];
  eventEmotion: string;       // Dominant emotion (e.g., "Tragic Tension")
  worldState: WorldMemory;
}

export interface ConsciousnessState {
  id: string; // e.g., "pre-revelation", "day-17"
  label: string; // e.g., "Before Kunti Revelation"
  knownFacts: string[];
  forbiddenKnowledge: string[];
  beliefs: string[];
  emotionalState: string; // Default emotional state for this timeline
}

export interface Character {
  id: string;
  slug: string;
  name: string;
  title: string;
  archetype: string;
  image: string;
  objectPosition: string;
  theme: string; // Tailwind gradient classes
  color: string; // Tailwind text color class
  description: string;
  speechStyle: string; // E.g., "respectful, proud, emotionally restrained"
  timeline: TimelineEvent[];
  relationships: Relationship[];
  consciousnessStates: ConsciousnessState[];
  quote: CharacterQuote;
  personalityTraits: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface EpicEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string; // E.g., "War", "Politics", "Betrayal"
  emotions: string[]; // E.g., ["humiliation", "anger", "betrayal"]
  timelineOrder: number;
  image: string;
  objectPosition: string;
  theme: string; // Tailwind gradient classes
  characters: string[]; // Array of character IDs
  causes: string[];
  consequences: string[];
  location: string;
  locationId: string;
  eventConsciousness?: EventConsciousness;
}
