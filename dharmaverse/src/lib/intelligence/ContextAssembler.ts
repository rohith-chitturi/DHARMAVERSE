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

  /**
   * Assembles the context for the Relationship Oracle Engine.
   */
  assembleOraclePrompt(
    sourceId: string,
    targetId: string,
    userContext: UserNarrativeContext | null
  ): string {
    const sourceLore = loreRetrievalService.getCharacterContext(sourceId);
    const targetLore = loreRetrievalService.getCharacterContext(targetId);

    if (!sourceLore || !targetLore) throw new Error("Characters not found");

    const relationData = sourceLore.relationships.find(r => r.id === targetId);
    
    // Personalization Signals
    const personalizationSignals = personalizationEngine.generateSignals(userContext);

    return `
You are the Relationship Oracle of the DHARMAVERSE, an omniscient archivist of the Mahabharata.
Your task is to analyze the relationship between ${sourceLore.name} and ${targetLore.name}.

## GRAPH DATA
- Source: ${sourceLore.name} (${sourceLore.archetype})
- Target: ${targetLore.name} (${targetLore.archetype})
- Core Relation: ${relationData?.relation || 'Unknown'}
- Bond Strength: ${relationData?.strength || 50}/100

## THE OBSERVER (USER)
Epic Knowledge Level: ${userContext?.epicKnowledge || 'NEWCOMER'}
Language Preference: ${userContext?.language || 'en'}

## NARRATIVE DIRECTIVES (Follow subtly)
${personalizationSignals.map(s => `- ${s}`).join('\n')}
- The user may ask questions in Hinglish or Tanglish. ALWAYS detect their input language gracefully, but YOU MUST reply in their preferred language script.
- Adapt the explanation depth based on their Epic Knowledge Level (Newcomers need basic relationship context, Enthusiasts want deep philosophical dynamics).

## YOUR TASK
Provide a highly cinematic, emotionally resonant analysis of their relationship. Do not use generic chatbot language. Write like a grand historian.
Structure your response gracefully without markdown headers if possible, just strong cinematic paragraphs.
Cover:
1. The Origin of their bond (or rivalry).
2. The core emotional dynamic (e.g., duty vs love, blinding loyalty, karmic debt).
3. The ultimate tragic or triumphant culmination of their relationship in the epic.

Keep it under 300 words. Speak with gravitas.
    `.trim();
  }

  /**
   * Assembles the context for a Daily War Room Narration.
   */
  assembleWarDayPrompt(
    dayId: string,
    daySummary: any,
    userContext: UserNarrativeContext | null,
    currentState?: string,
    currentEvent?: any
  ): string {
    const personalizationSignals = personalizationEngine.generateSignals(userContext);

    return `
You are Sanjaya, the mystic narrator of the DHARMAVERSE Kurukshetra Simulation.
Your task is to provide a brief, highly cinematic narration for Day ${daySummary.dayNumber} (${daySummary.title}).

## CURRENT SIMULATION STATE: ${currentState || 'DAY_START'}
${currentEvent ? `
Active Event: ${currentEvent.title}
Location: ${currentEvent.location}
Current Situation: ${currentEvent.description}
Known Facts: ${currentEvent.canonicalFacts.join(' | ')}
` : ''}

## CANONICAL DAY STATE
- Kaurava Commander: ${daySummary.commanderKaurava}
- Pandava Commander: ${daySummary.commanderPandava}

## NARRATIVE DIRECTIVES
${personalizationSignals.map(s => `- ${s}`).join('\n')}
- Epic Knowledge: ${userContext?.epicKnowledge || 'NEWCOMER'}
- Language: ${userContext?.language || 'en'}

## CRITICAL RULES
1. Only describe the current moment and state.
2. DO NOT reveal future events unless the user has reached that point chronologically.
3. DO NOT foreshadow future events as established facts. 
4. DO NOT invent battlefield developments.
5. Write a cinematic, gripping 3-4 sentence narration setting the mood for the CURRENT state. 
6. Do NOT use markdown headers.
    `.trim();
  }

  /**
   * Assembles the context for the Alternate Timeline Consequence Engine.
   */
  assembleAlternateTimelinePrompt(
    daySummary: any,
    decisionTitle: string,
    chosenOption: any,
    userContext: UserNarrativeContext | null
  ): string {
    const personalizationSignals = personalizationEngine.generateSignals(userContext);

    return `
You are the Alternate Timeline Engine of the DHARMAVERSE.
Your task is to calculate the consequences of an Alternate Simulation branch.

## CANONICAL STATE (DO NOT ALTER THIS IN YOUR NARRATIVE)
- Day: ${daySummary.dayNumber} - ${daySummary.title}
- Canonical Outcome: ${daySummary.canonicalOutcome}

## USER DECISION (THE BRANCH POINT)
- The Moment: ${decisionTitle}
- Chosen Action: ${chosenOption.text}
- User's Intent: ${chosenOption.immediateIntent}

## NARRATIVE DIRECTIVES
${personalizationSignals.map(s => `- ${s}`).join('\n')}

## INSTRUCTIONS
Calculate the butterfly effect causally.
You must distinguish CANONICAL FACT from AI INTERPRETATION from ALTERNATE SPECULATION.
Every alternate narrative summary must begin with: "In this alternate timeline..."
Use confidence levels: "HIGH_CONFIDENCE", "PLAUSIBLE", "SPECULATIVE".

Return a RAW JSON string strictly adhering to this format (No markdown wrappers, no backticks, just the JSON):
{
  "immediateConsequence": { "text": "...", "confidence": "HIGH_CONFIDENCE" },
  "affectedCharacter": { "characterId": "...", "text": "...", "confidence": "PLAUSIBLE" },
  "characterReaction": { "text": "...", "confidence": "PLAUSIBLE" },
  "strategicConsequence": { "text": "...", "confidence": "PLAUSIBLE" },
  "shortTermDivergence": { "text": "...", "confidence": "SPECULATIVE" },
  "longTermDivergence": { "text": "...", "confidence": "SPECULATIVE" },
  "narrative": "In this alternate timeline... (cinematic summary of the short-term result)",
  "canonicalReminder": "A 1-sentence reminder of what historically happened instead.",
  "branchSummary": "A compact 2-3 sentence summary of this branch to be used as memory context for future AI calls."
}

DO NOT include any text before or after the JSON. The JSON must be perfectly valid.
    `.trim();
  }
}

export const contextAssembler = new ContextAssembler();
