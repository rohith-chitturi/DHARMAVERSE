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
  timeline: TimelineEvent[];
  relationships: Relationship[];
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
}
