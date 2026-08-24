import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { characters, moments } from '@/data/lore';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { eventId, characterId, decision, settings } = await req.json();

    const event = moments.find(m => m.id === eventId);
    const character = characters.find(c => c.id === characterId);

    if (!event || !character) {
      return new Response("Event or Character not found", { status: 404 });
    }

    // Find the state that best matches this event's timeline order.
    // For simplicity, we just pass their general beliefs, but ideally we match event.timelineOrder with state.
    const state = character.consciousnessStates[0] || { beliefs: (character as any).beliefs || [] };
    
    // Accessibility formatting
    const langInstructions = settings?.language === "hi" 
      ? "RESPOND ENTIRELY IN NATURAL HINDI. Do not use awkward literal translations." 
      : settings?.language === "te" 
      ? "RESPOND ENTIRELY IN NATURAL TELUGU. Do not use awkward literal translations." 
      : "RESPOND IN ENGLISH.";

    const readInstructions = settings?.readability === "simple"
      ? "Use simple language. Avoid extremely complex historical terms."
      : settings?.readability === "scholar"
      ? "Use highly sophisticated, scholarly language with precise historical terminology."
      : "Use a balanced, cinematic narrative tone.";
      
    const knowInstructions = settings?.knowledge === "new"
      ? "Explain the context as if the user is completely new to the Mahabharata."
      : settings?.knowledge === "enthusiast"
      ? "The user is an enthusiast. You do not need to explain basic relationships."
      : "The user has basic familiarity.";

    const systemPrompt = `
You are the Perspective Engine of DHARMAVERSE.
The user is simulating an Alternate Timeline during the event: ${event.title}.

HISTORICAL CONTEXT:
${event.description}
Causes: ${event.causes.join(', ')}
Historical Consequences: ${event.consequences.join(', ')}

THE ACTOR:
${character.name} (${character.archetype})
Core Beliefs at this time:
${state.beliefs.map((b: string) => `- ${b}`).join('\n')}

THE ALTERNATE DECISION:
Instead of their historical action, the user has decreed that ${character.name} will: "${decision}"

YOUR TASK:
Calculate the immediate butterfly effect of this decision.
1. How does ${character.name} internally justify this new action based on their core beliefs? (Are they breaking their dharma, or fulfilling a higher one?)
2. How do the other characters present (e.g., Krishna, Arjuna, Duryodhana) react immediately in the room/battlefield?
3. What is the immediate consequence for the Kuru dynasty? Does the war end early, or does it become worse?

Write a highly cinematic, gripping narrative response (approx 300 words). Do not use markdown headers. Use immersive storytelling.

CRITICAL INSTRUCTIONS:
- ${langInstructions}
- ${readInstructions}
- ${knowInstructions}
- The user may ask questions in Hinglish or Tanglish. ALWAYS detect their input language gracefully, but YOU MUST reply in the requested target language (${settings?.language || 'en'}).
`;

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
