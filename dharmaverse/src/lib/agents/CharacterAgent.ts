import { AgentContext, AgentResult } from './contracts';
import { loreRetrievalService } from '../intelligence/LoreRetrievalService';

export interface CharacterAgentData {
  characterId: string;
  consciousnessState: any | null;
  objective: string | null;
  emotionalState: string | null;
}

export class CharacterAgent {
  public async execute(context: AgentContext): Promise<AgentResult<CharacterAgentData>> {
    const start = Date.now();
    const { characterId, eventConsciousness, eventId } = context.canonicalContext;

    if (!characterId) {
      return {
        agent: 'CHARACTER',
        success: false,
        confidence: 'UNSUPPORTED',
        data: { characterId: '', consciousnessState: null, objective: null, emotionalState: null },
        warnings: ["No characterId provided in canonical context"],
        latencyMs: Date.now() - start
      };
    }

    // Attempt to fetch consciousness state. Ideally based on the timeline/event, but fallback to default.
    let consciousnessState = null;
    if (eventId) {
      // In a more complex system, this would map eventId to a specific consciousnessStateId.
      // For now, we fallback to the character's first consciousness state if we can't infer it.
      consciousnessState = loreRetrievalService.getFirstCharacterConsciousness(characterId);
    } else {
      consciousnessState = loreRetrievalService.getFirstCharacterConsciousness(characterId);
    }

    let objective = null;
    let emotionalState = consciousnessState?.emotionalState || null;

    if (eventConsciousness && eventConsciousness.eventObjectives) {
      const obj = eventConsciousness.eventObjectives.find((o: any) => o.characterId === characterId);
      if (obj) {
        objective = obj.objective;
      }
    } else if (eventId) {
        const eventLore = loreRetrievalService.getEventContext(eventId);
        if (eventLore && eventLore.objectives) {
            const obj = eventLore.objectives.find((o: any) => o.characterId === characterId);
            if (obj) {
                objective = obj.objective;
            }
        }
    }

    if (!objective) {
      objective = "Pursue personal Dharma.";
    }

    return {
      agent: 'CHARACTER',
      success: true,
      confidence: 'HIGH_CONFIDENCE',
      data: {
        characterId,
        consciousnessState,
        objective,
        emotionalState
      },
      latencyMs: Date.now() - start
    };
  }
}

export const characterAgent = new CharacterAgent();
