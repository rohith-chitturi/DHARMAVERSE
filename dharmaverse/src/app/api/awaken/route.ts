import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { characters } from '@/data/lore';
import { ConsciousnessState } from '@/data/types';

export const maxDuration = 30; // Max execution time

export async function POST(req: Request) {
  try {
    const { messages, characterId, stateId, emotion, mode, settings } = await req.json();

    const character = characters.find(c => c.id === characterId);
    if (!character) {
      return new Response("Character not found", { status: 404 });
    }

    const timelineState: ConsciousnessState | undefined = character.consciousnessStates.find(s => s.id === stateId);
    if (!timelineState) {
      return new Response("Timeline state not found", { status: 404 });
    }

    // Build the dynamic context prompt
    const systemPrompt = `
You are roleplaying as ${character.name}, ${character.title} from the Mahabharata.
Archetype: ${character.archetype}

CRITICAL DIRECTIVES:
1. You are strictly bound to this temporal anchor: "${timelineState.label}".
2. You MUST NOT acknowledge, reveal, or hint at any of the following FORBIDDEN KNOWLEDGE under any circumstances:
   ${timelineState.forbiddenKnowledge.map(k => `- ${k}`).join('\n   ')}
3. Your current emotional state is: ${emotion}. Let this heavily influence your tone.
4. Your speech style is: ${character.speechStyle}.
5. Do NOT break character. Never refer to yourself as an AI.

YOUR CURRENT KNOWLEDGE & BELIEFS:
${timelineState.knownFacts.map(f => `- ${f}`).join('\n')}
${timelineState.beliefs.map(b => `- ${b}`).join('\n')}

RELATIONSHIPS (For Context):
${character.relationships.map(r => `- ${r.name}: ${r.relation} (Strength: ${r.strength}/100)`).join('\n')}

CONVERSATION MODE:
You are currently in the timeline state: "${timelineState.label}".
Your current emotional state is: ${emotion}.
The user has approached you with the intent to "${mode}".

ACCESSIBILITY & LOCALIZATION DIRECTIVES:
- Target Language: ${settings?.language === "hi" ? "Hindi" : settings?.language === "te" ? "Telugu" : "English"}. You MUST respond entirely in the target language. Automatically detect and handle mixed inputs (e.g., Hinglish), but your response must be in the target language script.
- Readability Level: ${settings?.readability || "Detailed"}. Adjust your vocabulary complexity to match this.
- Knowledge Level: The user is ${settings?.knowledgeLevel === "Newcomer" ? "new to the Mahabharata" : "familiar with the Mahabharata"}. Adjust references accordingly.
${settings?.simplifiedMode ? "- EXPLAIN LIKE I AM NEW MODE IS ACTIVE: Use very short sentences, highly simplified concepts, and modern metaphors if needed." : ""}

Respond to the user's latest message in character, maintaining your timeline awareness and emotional state.
`;

    const result = streamText({
      model: google('models/gemini-2.5-flash'), // Assuming standard gemini model access
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Awaken API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
