import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { characters } from '@/data/lore';
import { chamberScenarios } from '@/data/chamberScenarios';
import { getUserNarrativeContext } from '@/lib/services/journeyService';
import { contextAssembler } from '@/lib/intelligence/ContextAssembler';

export const maxDuration = 45;

export async function POST(req: Request) {
  try {
    const { 
      scenarioId, 
      chamberMemory, 
      userMessage, 
      mode, 
      settings 
    } = await req.json();

    const scenario = chamberScenarios.find(s => s.scenarioId === scenarioId);
    if (!scenario) {
      return new Response("Scenario not found", { status: 404 });
    }

    // 1. Participant Mode: If user intervened, it's added to memory context on client, but we also acknowledge it.
    
    // 2. Deterministic Speaker Engine
    // Find who spoke last in the chamber memory
    let nextSpeakerId = scenario.initialSpeaker;
    const pastTurns = chamberMemory.recentStatements || [];
    
    if (pastTurns.length > 0) {
      // Find the last actual character who spoke (ignore user)
      const lastCharTurn = [...pastTurns].reverse().find((t: any) => t.speaker !== 'user');
      if (lastCharTurn) {
        const currentIndex = scenario.activeCharacters.indexOf(lastCharTurn.speaker);
        // Simple round-robin for deterministic ordering, skipping if not in active list
        const nextIndex = (currentIndex + 1) % scenario.activeCharacters.length;
        nextSpeakerId = scenario.activeCharacters[nextIndex];
      }
    }

    // Load next speaker's consciousness
    const speaker = characters.find(c => c.id === nextSpeakerId);
    if (!speaker) {
      return new Response("Speaker not found", { status: 404 });
    }

    // Load their specific beliefs and state
    const stateId = speaker.consciousnessStates[0]?.id;

    // Fetch Narrative Context
    const narrativeContext = await getUserNarrativeContext();

    // Generate base character identity and personalization from the intelligence layer
    let systemPrompt = contextAssembler.assembleCharacterPrompt(
      speaker.id,
      narrativeContext,
      undefined, // We'll add the specific chamber scenario context below manually
      stateId
    );

    // Format memory for the prompt
    const conversationHistory = pastTurns.map((t: any) => `${t.speakerName || t.speaker}: ${t.text}`).join('\n');

    // 3. Construct System Prompt (Shared World + Individual Consciousness + Personalization)
    systemPrompt += `

## AKASHIC CHAMBER: SHARED WORLD STATE
Scenario: ${scenario.title} (${scenario.timelineState})
Context: ${scenario.eventContext}
Current Mood: ${scenario.eventEmotion}
Active Tensions:
${scenario.initialTensions.map(t => `- ${t}`).join('\n')}
Historical Constraints:
${scenario.historicalConstraints.map(c => `- ${c}`).join('\n')}

## YOUR OBJECTIVE IN THIS SCENE
${scenario.objectives[speaker.id]}

CRITICAL RULES FOR THE CHAMBER:
1. You DO NOT have omniscience. You only know what ${speaker.name} knows at this exact moment in the timeline (${scenario.timelineState}).
2. Do not reveal secrets that you shouldn't know yet.
3. Stay strictly in character. Defend your objective fiercely against the other characters.

## CONVERSATION HISTORY
${conversationHistory}
${userMessage ? `\nThe Observer (User) suddenly interjects: "${userMessage}"` : ''}

## YOUR INSTRUCTIONS
It is your turn to speak. React to the conversation history${userMessage ? ' and the User\'s interjection. Ensure your reaction is heavily filtered through your unique character lens and current emotional state.' : '.'}
Keep your response concise, powerful, and cinematic (under 150 words).
Do NOT write action brackets like *sighs* or *looks away*. Just deliver the dialogue as if it were a subtitle in a movie.
`;

    // 4. Generate Response
    const result = await generateText({
      model: google('models/gemini-2.5-flash'),
      system: systemPrompt,
      prompt: `Generate ${speaker.name}'s response.`,
    });

    const responseText = result.text.trim();

    // 5. Validation (Basic check to ensure they didn't break character format too badly)
    // If we wanted strict validation, we'd loop here, but for now we return the generated text.

    return new Response(JSON.stringify({
      speaker: speaker.id,
      speakerName: speaker.name,
      text: responseText,
      emotionalState: "Intense" // Could be dynamically parsed if we ask the LLM for JSON
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Chamber API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
