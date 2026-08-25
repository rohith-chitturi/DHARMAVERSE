export type InteractionDepth = 'VIEWED' | 'INTERACTED' | 'COMPLETED' | 'DEEP_EXPERIENCE';

export interface ExploredNode {
  id: string;
  type: 'character' | 'event' | 'relationship' | 'simulation' | 'dharma_trait';
  depth: InteractionDepth;
  lastExplored: Date;
  count: number;
}

export interface UserNarrativeContext {
  primaryDharmaTraits: string[];
  secondaryDharmaTraits: string[];
  recentDharmaEvolution: string; // e.g. "Shifted towards Justice"
  knownCharacters: ExploredNode[];
  knownEvents: ExploredNode[];
  knownRelationships: ExploredNode[];
  deepExperiences: ExploredNode[]; // subset of above that are DEEP_EXPERIENCE
  recentThemes: string[];
  epicKnowledge: 'NEWCOMER' | 'ENTHUSIAST' | 'SCHOLAR';
  language: string;
  complexity: 'SIMPLE' | 'DETAILED' | 'PHILOSOPHICAL';
}

export interface ContextPayload {
  userContext: UserNarrativeContext | null; // null if guest
  canonicalLore: any[]; // The raw lore blocks retrieved for the prompt
  timelineState?: any;
  characterConsciousness?: any;
  eventConsciousness?: any;
  personalizationSignals: string[]; // Narrative directions generated from Dharma profile
}
