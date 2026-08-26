import { AgentContext, AgentResult } from './contracts';
import { loreRetrievalService } from '../intelligence/LoreRetrievalService';

export interface LoreAgentData {
  characterFacts: any | null;
  eventFacts: any | null;
  knownEntities: { characters: string[]; events: string[] } | null;
}

export class LoreAgent {
  public async execute(context: AgentContext): Promise<AgentResult<LoreAgentData>> {
    const start = Date.now();
    
    let characterFacts = null;
    let eventFacts = null;
    let knownEntities = null;

    if (context.canonicalContext.characterId) {
      characterFacts = loreRetrievalService.getCharacterContext(context.canonicalContext.characterId);
    }

    if (context.canonicalContext.eventId) {
      eventFacts = loreRetrievalService.getEventContext(context.canonicalContext.eventId);
    }

    if (context.userContext) {
      knownEntities = loreRetrievalService.getKnownEntitiesSummary(
        context.userContext.knownCharacters, 
        context.userContext.knownEvents
      );
    }

    return {
      agent: 'LORE',
      success: true,
      confidence: 'HIGH_CONFIDENCE',
      data: {
        characterFacts,
        eventFacts,
        knownEntities
      },
      latencyMs: Date.now() - start
    };
  }
}

export const loreAgent = new LoreAgent();
