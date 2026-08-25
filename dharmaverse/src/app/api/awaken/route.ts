import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { characters } from '@/data/lore';
import { ConsciousnessState } from '@/data/types';
import { getUserNarrativeContext } from '@/lib/services/journeyService';
import { contextAssembler } from '@/lib/intelligence/ContextAssembler';

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

    // Fetch Narrative Context
    const narrativeContext = await getUserNarrativeContext();

    // Use Context Assembler
    let systemPrompt = contextAssembler.assembleCharacterPrompt(
      characterId,
      narrativeContext,
      undefined,
      stateId
    );

    // Append Awaken-specific emotional state and mode
    systemPrompt += `

## CURRENT AWAKENED CONTEXT
Your current emotional state is: ${emotion}. Let this heavily influence your tone.
The user has approached you with the intent to "${mode}".

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
