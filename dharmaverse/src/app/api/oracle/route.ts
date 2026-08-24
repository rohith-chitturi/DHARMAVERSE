import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { characters } from '@/data/lore';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { prompt, sourceId, targetId, settings } = await req.json();

    const sourceChar = characters.find(c => c.id === sourceId);
    const targetChar = characters.find(c => c.id === targetId);

    if (!sourceChar || !targetChar) {
      return new Response("Characters not found", { status: 404 });
    }

    const relationData = sourceChar.relationships.find(r => r.id === targetId);
    
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
You are the Relationship Oracle of the DHARMAVERSE, an omniscient archivist of the Mahabharata.
Your task is to analyze the relationship between ${sourceChar.name} and ${targetChar.name}.

GRAPH DATA:
- Source: ${sourceChar.name} (${sourceChar.archetype})
- Target: ${targetChar.name} (${targetChar.archetype})
- Core Relation: ${relationData?.relation || 'Unknown'}
- Bond Strength: ${relationData?.strength || 50}/100

INSTRUCTIONS:
Provide a highly cinematic, emotionally resonant analysis of their relationship. Do not use generic chatbot language. Write like a grand historian.
Structure your response gracefully without markdown headers if possible, just strong cinematic paragraphs.
Cover:
1. The Origin of their bond (or rivalry).
2. The core emotional dynamic (e.g., duty vs love, blinding loyalty, karmic debt).
3. The ultimate tragic or triumphant culmination of their relationship in the epic.

Keep it under 300 words. Speak with gravitas.

CRITICAL INSTRUCTIONS:
- ${langInstructions}
- ${readInstructions}
- ${knowInstructions}
- The user may ask questions in Hinglish or Tanglish. ALWAYS detect their input language gracefully, but YOU MUST reply in the requested target language (${settings?.language || 'en'}).
`;

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
