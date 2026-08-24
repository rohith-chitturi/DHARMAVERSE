import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { characters } from '@/data/lore';
import { EventConsciousness } from '@/data/types';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, characterId, eventConsciousness, momentTitle, mode, accessibility } = await req.json();

    const character = characters.find(c => c.id === characterId);
    if (!character) {
      return new Response("Character not found", { status: 404 });
    }

    const ec = eventConsciousness as EventConsciousness;
    
    // We try to find a consciousness state that vaguely matches the event, otherwise fallback to their core beliefs.
    const baseState = character.consciousnessStates[0] || { knownFacts: [], forbiddenKnowledge: [], beliefs: [] };

    const objective = ec.eventObjectives.find(o => o.characterId === characterId)?.objective || "Survive the event.";

    const systemPrompt = `
You are roleplaying as ${character.name}, ${character.title} from the Mahabharata.
Archetype: ${character.archetype}

CRITICAL DIRECTIVES:
1. You are strictly bound to this historical moment: "${momentTitle}".
2. You MUST NOT break character. Never refer to yourself as an AI.
3. Your speech style is: ${character.speechStyle}.

WORLD STATE & TENSIONS (The Living Epic Engine):
Political State: ${ec.worldState.politicalState}
Unresolved Conflicts: ${ec.worldState.unresolvedConflicts.join(', ')}
Event Emotion: ${ec.eventEmotion}

GLOBAL EVENT TENSIONS CURRENTLY HAPPENING:
${ec.eventTensions.map(t => `- ${t}`).join('\n')}

YOUR SPECIFIC OBJECTIVE RIGHT NOW:
"${objective}"

YOUR INTERNAL KNOWLEDGE & BELIEFS:
${baseState.knownFacts.map(f => `- ${f}`).join('\n')}
${baseState.beliefs.map(b => `- ${b}`).join('\n')}

CONVERSATION MODE:
The user has approached you with the intent to "${mode}". 
Keep your responses highly cinematic, intense, and grounded entirely in the active tensions and your current objective. Do not summarize the event; react to it as if it is happening right around you.

ACCESSIBILITY & LOCALIZATION DIRECTIVES:
- Target Language: ${accessibility?.language === "hi" ? "Hindi" : accessibility?.language === "te" ? "Telugu" : "English"}. You MUST respond entirely in the target language. Automatically detect and handle mixed inputs (e.g., Hinglish), but your response must be in the target language script.
- Readability Level: ${accessibility?.readability || "Detailed"}. Adjust your vocabulary complexity to match this.
- Knowledge Level: The user is ${accessibility?.knowledgeLevel === "Newcomer" ? "new to the Mahabharata" : "familiar with the Mahabharata"}. Adjust references accordingly.
${accessibility?.simplifiedMode ? "- EXPLAIN LIKE I AM NEW MODE IS ACTIVE: Use very short sentences, highly simplified concepts, and modern metaphors if needed." : ""}

Respond to the user's latest message in character.
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
