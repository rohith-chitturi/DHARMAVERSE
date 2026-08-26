import { UserNarrativeContext } from '../intelligence/NarrativeContext';
import { DayState } from '@/data/kurukshetra';

export type AgentType = 
  | 'LORE'
  | 'TIMELINE'
  | 'CHARACTER'
  | 'DHARMA'
  | 'CAUSALITY'
  | 'NARRATIVE'
  | 'VALIDATOR'
  | 'ORCHESTRATOR';

export type RequestCategory = 
  | 'LORE'
  | 'CHARACTER'
  | 'RELATIONSHIP'
  | 'TIMELINE'
  | 'ETHICAL'
  | 'ALTERNATE_TIMELINE'
  | 'CHAMBER'
  | 'WAR_SIMULATION'
  | 'GENERAL';

export type ConfidenceLevel = 'HIGH_CONFIDENCE' | 'SUPPORTED' | 'PLAUSIBLE' | 'SPECULATIVE' | 'UNSUPPORTED';

export interface AgentContext {
  request: {
    message: string;
    category?: RequestCategory;
    recentMessages?: { role: string; content: string }[];
  };
  userContext: UserNarrativeContext | null;
  canonicalContext: {
    characterId?: string;
    eventId?: string;
    warDayId?: string;
    timelineState?: DayState;
    simulationBranchId?: string;
    eventConsciousness?: any; // To pass specific event objectives if available
  };
  options?: {
    mode?: string;
    accessibility?: boolean;
    language?: string;
    complexity?: string;
  };
}

export interface AgentResult<T> {
  agent: AgentType;
  success: boolean;
  confidence: ConfidenceLevel;
  data: T;
  warnings?: string[];
  latencyMs?: number;
}
