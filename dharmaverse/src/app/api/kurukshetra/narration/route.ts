import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { warStateEngine } from '@/lib/kurukshetra/WarStateEngine';
import { getUserNarrativeContext } from '@/lib/services/journeyService';
import { contextAssembler } from '@/lib/intelligence/ContextAssembler';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { warDayId, currentState } = await req.json();

    const daySummary = warStateEngine.getDayContextSummary(warDayId);
    if (!daySummary) {
      return new Response("Canonical day data not found", { status: 404 });
    }

    // Get current event based on state
    const warDay = warStateEngine.getWarDay(warDayId);
    let currentEvent = null;
    if (warDay && currentState) {
      currentEvent = warDay.chronology.find(e => e.stateTrigger === currentState);
    }

    const narrativeContext = await getUserNarrativeContext();
    const systemPrompt = contextAssembler.assembleWarDayPrompt(warDayId, daySummary, narrativeContext, currentState, currentEvent);

    const result = streamText({
      model: google('models/gemini-2.5-flash'),
      system: systemPrompt,
      prompt: `Provide the cinematic narration for the current state: ${currentState || 'DAY_START'}.`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Narration API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
