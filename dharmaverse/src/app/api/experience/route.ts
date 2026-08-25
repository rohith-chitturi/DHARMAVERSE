import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { characters } from '@/data/lore';
import { EventConsciousness } from '@/data/types';
import { getUserNarrativeContext } from '@/lib/services/journeyService';
import { contextAssembler } from '@/lib/intelligence/ContextAssembler';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, characterId, eventConsciousness, momentTitle, mode, accessibility } = await req.json();

    const character = characters.find(c => c.id === characterId);
    if (!character) {
      return new Response("Character not found", { status: 404 });
    }

    const narrativeContext = await getUserNarrativeContext();
    
    // We try to find a consciousness state that vaguely matches the event, otherwise fallback to their core beliefs.
    const stateId = character.consciousnessStates[0]?.id;

    // Use the central intelligence layer to construct the prompt
    let systemPrompt = contextAssembler.assembleCharacterPrompt(
      characterId,
      narrativeContext,
      momentTitle,
      stateId
    );

    const ec = eventConsciousness as EventConsciousness;
    const objective = ec.eventObjectives.find(o => o.characterId === characterId)?.objective || "Survive the event.";

    // Append experience-specific context safely at the end
    systemPrompt += `

## SIMULATION CHAMBER CONTEXT
Political State: ${ec.worldState.politicalState}
Unresolved Conflicts: ${ec.worldState.unresolvedConflicts.join(', ')}
Event Emotion: ${ec.eventEmotion}

GLOBAL EVENT TENSIONS CURRENTLY HAPPENING:
${ec.eventTensions.map(t => `- ${t}`).join('\n')}

YOUR SPECIFIC OBJECTIVE RIGHT NOW:
"${objective}"

CONVERSATION MODE:
The user has approached you with the intent to "${mode}". 
Keep your responses highly cinematic, intense, and grounded entirely in the active tensions and your current objective. Do not summarize the event; react to it as if it is happening right around you.
`;

    const result = streamText({
      model: google('models/gemini-2.5-flash'),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Experience API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
