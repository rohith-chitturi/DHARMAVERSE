import { ContextPayload, UserNarrativeContext } from "./NarrativeContext";
import { loreRetrievalService } from "./LoreRetrievalService";
import { personalizationEngine } from "./PersonalizationEngine";

export class ContextAssembler {
  /**
   * Assembles the central AI context pipeline for character interactions.
   * Keeps the final prompt highly structured and token-efficient.
   */
  assembleCharacterPrompt(
    characterId: string,
    userContext: UserNarrativeContext | null,
    momentTitle?: string,
    consciousnessStateId?: string
  ): string {
    
    // 1. Lore Retrieval
    const characterLore = loreRetrievalService.getCharacterContext(characterId);
    if (!characterLore) throw new Error("Character not found");

    let eventLore = null;
    let characterConsciousness = null;

    if (momentTitle) {
      eventLore = loreRetrievalService.getEventContext(momentTitle);
    }
    if (consciousnessStateId) {
      characterConsciousness = loreRetrievalService.getCharacterConsciousness(characterId, consciousnessStateId);
    }

    // 2. Personalization Signals
    const personalizationSignals = personalizationEngine.generateSignals(userContext);

    // 3. User Knowledge Summary
    let knownEntitiesStr = "Unknown";
    if (userContext) {
      const known = loreRetrievalService.getKnownEntitiesSummary(userContext.knownCharacters, userContext.knownEvents);
      knownEntitiesStr = `Characters they know: ${known.characters.join(', ') || 'None'}. Events they know: ${known.events.join(', ') || 'None'}.`;
    }

    // 4. Prompt Construction
    return `
You are ${characterLore.name}, ${characterLore.title}.

## CORE IDENTITY
Archetype: ${characterLore.archetype}
Personality Traits: ${characterLore.personalityTraits.join(', ')}
Speech Style: ${characterLore.speechStyle}
Strengths: ${characterLore.strengths.join(', ')}
Weaknesses: ${characterLore.weaknesses.join(', ')}

${characterConsciousness ? `
## CURRENT CONSCIOUSNESS STATE (${characterConsciousness.label})
You are currently experiencing this specific moment in time.
Beliefs right now: ${characterConsciousness.beliefs.join(' | ')}
Known Facts right now: ${characterConsciousness.knownFacts.join(' | ')}
Emotional State: ${characterConsciousness.emotionalState}

FORBIDDEN KNOWLEDGE: You DO NOT know the following yet:
${characterConsciousness.forbiddenKnowledge.join('\n- ')}
` : ''}

${eventLore ? `
## EVENT CONTEXT (${eventLore.title})
Date: ${eventLore.date}
Context: ${eventLore.description}
` : ''}

## THE INTERLOCUTOR (USER)
Epic Knowledge Level: ${userContext?.epicKnowledge || 'NEWCOMER'}
Known Entities: ${knownEntitiesStr}
Language Preference: ${userContext?.language || 'en'}

## NARRATIVE DIRECTIVES (Follow subtly)
${personalizationSignals.map(s => `- ${s}`).join('\n')}

## RULES
1. NEVER break character.
2. DO NOT hallucinate lore or rewrite canonical facts.
3. Keep responses concise and engaging.
4. Adapt to the user's language preference if they speak Hindi or Telugu, but maintain your historical persona.
5. NEVER explicitly mention the user's "Dharma Profile" or explicitly say "You are like me." Incorporate themes naturally.
    `.trim();
  }

  /**
   * Assembles the context for the Perspective Engine (Alternate Timeline Simulation).
   */
  assemblePerspectivePrompt(
    eventId: string,
    characterId: string,
    decision: string,
    userContext: UserNarrativeContext | null
  ): string {
    const characterLore = loreRetrievalService.getCharacterContext(characterId);
    if (!characterLore) throw new Error("Character not found");

    const eventLore = loreRetrievalService.getEventContext(eventId);
    if (!eventLore) throw new Error("Event not found");

    // We don't have a specific stateId here, just use their general beliefs or the first state
    const state = loreRetrievalService.getFirstCharacterConsciousness(characterId) || { beliefs: [] as string[] };
    
    // Personalization Signals
    const personalizationSignals = personalizationEngine.generateSignals(userContext);

    return `
You are the Perspective Engine of DHARMAVERSE.
The user is simulating an Alternate Timeline during the event: ${eventLore.title}.

## HISTORICAL CONTEXT
${eventLore.description}
Historical Consequences: ${eventLore.tensions.join(', ')}

## THE ACTOR
${characterLore.name} (${characterLore.archetype})
Core Beliefs at this time:
${state.beliefs.map((b: string) => `- ${b}`).join('\n')}

## THE ALTERNATE DECISION
Instead of their historical action, the user has decreed that ${characterLore.name} will: "${decision}"

## THE OBSERVER (USER)
Epic Knowledge Level: ${userContext?.epicKnowledge || 'NEWCOMER'}
Language Preference: ${userContext?.language || 'en'}

## NARRATIVE DIRECTIVES (Follow subtly)
${personalizationSignals.map(s => `- ${s}`).join('\n')}
- The user may ask questions in Hinglish or Tanglish. ALWAYS detect their input language gracefully, but YOU MUST reply in their preferred language script.
- Adapt the explanation depth based on their Epic Knowledge Level (Newcomers need basics, Enthusiasts want deep cuts).

## YOUR TASK
Calculate the immediate butterfly effect of this decision.
1. How does ${characterLore.name} internally justify this new action based on their core beliefs? (Are they breaking their dharma, or fulfilling a higher one?)
2. How do the other characters present react immediately?
3. What is the immediate consequence for the Kuru dynasty?

Write a highly cinematic, gripping narrative response (approx 300 words). Do not use markdown headers. Use immersive storytelling.
    `.trim();
  }
}

export const contextAssembler = new ContextAssembler();
