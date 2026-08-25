import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { characters } from '@/data/lore';
import { getUserNarrativeContext } from '@/lib/services/journeyService';
import { contextAssembler } from '@/lib/intelligence/ContextAssembler';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { prompt, sourceId, targetId, settings } = await req.json();

    const sourceChar = characters.find(c => c.id === sourceId);
    const targetChar = characters.find(c => c.id === targetId);

    if (!sourceChar || !targetChar) {
      return new Response("Characters not found", { status: 404 });
    }

    const narrativeContext = await getUserNarrativeContext();

    const systemPrompt = contextAssembler.assembleOraclePrompt(
      sourceId,
      targetId,
      narrativeContext
    );

    const result = streamText({
      model: google('models/gemini-2.5-flash'),
      system: systemPrompt,
      prompt: "Analyze this relationship.",
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Oracle API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
