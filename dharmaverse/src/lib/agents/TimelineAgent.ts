import { AgentContext, AgentResult } from './contracts';
import { warStateEngine } from '../kurukshetra/WarStateEngine';
import { ChronologicalEvent } from '@/data/kurukshetra';

export interface TimelineAgentData {
  warDayId: string | null;
  currentState: string | null;
  currentEvent: ChronologicalEvent | null;
  knownEvents: ChronologicalEvent[];
  forbiddenEvents: ChronologicalEvent[];
  temporalWarnings: string[];
}

export class TimelineAgent {
  public async execute(context: AgentContext): Promise<AgentResult<TimelineAgentData>> {
    const start = Date.now();
    const { warDayId, timelineState } = context.canonicalContext;

    if (!warDayId) {
      return {
        agent: 'TIMELINE',
        success: true,
        confidence: 'SUPPORTED',
        data: {
          warDayId: null,
          currentState: null,
          currentEvent: null,
          knownEvents: [],
          forbiddenEvents: [],
          temporalWarnings: ["No temporal boundary specified. Entire timeline is treated as static/historic."]
        },
        latencyMs: Date.now() - start
      };
    }

    const warDay = warStateEngine.getWarDay(warDayId);
    if (!warDay) {
      return {
        agent: 'TIMELINE',
        success: false,
        confidence: 'UNSUPPORTED',
        data: { warDayId, currentState: null, currentEvent: null, knownEvents: [], forbiddenEvents: [], temporalWarnings: [] },
        warnings: [`Invalid warDayId: ${warDayId}`],
        latencyMs: Date.now() - start
      };
    }

    let currentEvent: ChronologicalEvent | null = null;
    let knownEvents: ChronologicalEvent[] = [];
    let forbiddenEvents: ChronologicalEvent[] = [];
    
    if (timelineState) {
      const currentIndex = warDay.chronology.findIndex(e => e.stateTrigger === timelineState);
      if (currentIndex !== -1) {
        currentEvent = warDay.chronology[currentIndex];
        knownEvents = warDay.chronology.slice(0, currentIndex + 1);
        forbiddenEvents = warDay.chronology.slice(currentIndex + 1);
      } else {
        // If state is DECISION_AVAILABLE, ALTERNATE_BRANCH, or CANONICAL_RESTORED, everything up to CRITICAL_MOMENT is known.
        const criticalIndex = warDay.chronology.findIndex(e => e.stateTrigger === 'CRITICAL_MOMENT');
        if (criticalIndex !== -1) {
          knownEvents = warDay.chronology.slice(0, criticalIndex + 1);
          forbiddenEvents = warDay.chronology.slice(criticalIndex + 1);
        }
      }
    } else {
      knownEvents = warDay.chronology; // Entire day known if no state specified
    }

    const temporalWarnings: string[] = [];
    if (forbiddenEvents.length > 0) {
      temporalWarnings.push("CRITICAL TEMPORAL BOUNDARY: The future is unknown. Do NOT reveal events that occur after the current state.");
    }

    return {
      agent: 'TIMELINE',
      success: true,
      confidence: 'HIGH_CONFIDENCE',
      data: {
        warDayId,
        currentState: timelineState || null,
        currentEvent,
        knownEvents,
        forbiddenEvents,
        temporalWarnings
      },
      latencyMs: Date.now() - start
    };
  }
}

export const timelineAgent = new TimelineAgent();
