import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { characters } from '@/data/lore';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { prompt, sourceId, targetId } = await req.json();

    const sourceChar = characters.find(c => c.id === sourceId);
    const targetChar = characters.find(c => c.id === targetId);

    if (!sourceChar || !targetChar) {
      return new Response("Characters not found", { status: 404 });
    }

    const relationData = sourceChar.relationships.find(r => r.id === targetId);

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
`;

    const result = streamText({
      model: google('models/gemini-2.5-flash'),
      system: systemPrompt,
      prompt: "Analyze this relationship.",
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Oracle API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
