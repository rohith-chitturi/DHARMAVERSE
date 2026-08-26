import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { warStateEngine } from '@/lib/kurukshetra/WarStateEngine';
import { alternateTimelineEngine } from '@/lib/kurukshetra/AlternateTimelineEngine';
import { getUserNarrativeContext } from '@/lib/services/journeyService';
import { contextAssembler } from '@/lib/intelligence/ContextAssembler';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { warDayId, eventId, decisionId, chosenOptionId } = await req.json();

    // 1. Create the Branch Synchronously
    const branch = alternateTimelineEngine.createBranch(
      'guest', // Hardcoded userId for guest
      warDayId,
      eventId,
      decisionId,
      chosenOptionId
    );

    const decision = warStateEngine.getDecision(warDayId, decisionId);
    const chosenOption = decision?.options.find(o => o.id === chosenOptionId);
    const daySummary = warStateEngine.getDayContextSummary(warDayId);

    if (!decision || !chosenOption || !daySummary) {
      return Response.json({ error: "Invalid canonical constraints" }, { status: 400 });
    }

    // 2. Fetch User Context
    const narrativeContext = await getUserNarrativeContext();
    const systemPrompt = contextAssembler.assembleAlternateTimelinePrompt(
      daySummary,
      decision.title,
      chosenOption,
      narrativeContext
    );

    // 3. Generate JSON Consequences
    const result = await generateText({
      model: google('models/gemini-2.5-flash'),
      system: systemPrompt,
      prompt: "Generate the structured JSON consequences.",
    });

    let consequences;
    try {
      // Clean up potential markdown blocks the LLM might have inserted despite instructions
      let text = result.text.trim();
      if (text.startsWith('```json')) text = text.substring(7);
      if (text.startsWith('```')) text = text.substring(3);
      if (text.endsWith('```')) text = text.substring(0, text.length - 3);
      consequences = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse AI JSON:", result.text);
      return Response.json({ error: "AI produced invalid format" }, { status: 500 });
    }

    // 4. Save Consequences to Branch
    alternateTimelineEngine.saveConsequences(branch.branchId, consequences);

    return Response.json({ branchId: branch.branchId });
  } catch (error) {
    console.error("Alternate Timeline API Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
