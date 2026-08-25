import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { characters, moments } from '@/data/lore';
import { getUserNarrativeContext } from '@/lib/services/journeyService';
import { contextAssembler } from '@/lib/intelligence/ContextAssembler';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { eventId, characterId, decision, settings } = await req.json();

    const event = moments.find(m => m.id === eventId);
    const character = characters.find(c => c.id === characterId);

    if (!event || !character) {
      return new Response("Event or Character not found", { status: 404 });
    }

    const narrativeContext = await getUserNarrativeContext();

    const systemPrompt = contextAssembler.assemblePerspectivePrompt(
      eventId,
      characterId,
      decision,
      narrativeContext
    );

    const result = streamText({
      model: google('models/gemini-2.5-flash'),
      system: systemPrompt,
      prompt: "Simulate this timeline branch.",
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Perspective API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
