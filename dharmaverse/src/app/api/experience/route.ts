import { getUserNarrativeContext } from '@/lib/services/journeyService';
import { dharmaOrchestrator } from '@/lib/agents/DharmaOrchestrator';
import { AgentContext } from '@/lib/agents/contracts';

export const maxDuration = 30; // Vercel timeout

export async function POST(req: Request) {
  try {
    const { messages, characterId, eventConsciousness, momentTitle, mode, accessibility, warDayId, timelineState } = await req.json();

    const narrativeContext = await getUserNarrativeContext();
    
    // Extract the latest message
    const latestMessage = messages[messages.length - 1]?.content || "";

    // Build the AgentContext
    const agentContext: AgentContext = {
      request: {
        message: latestMessage,
        recentMessages: messages,
        category: 'CHARACTER' // Default classification for the experience UI
      },
      userContext: narrativeContext,
      canonicalContext: {
        characterId,
        eventId: momentTitle, // 'momentTitle' was used as eventId in this route historically
        warDayId,
        timelineState,
        eventConsciousness
      },
      options: {
        mode,
        accessibility
      }
    };

    // Run the multi-agent pipeline (Buffering occurs here, validation happens before returning)
    const finalResponse = await dharmaOrchestrator.runExperiencePipeline(agentContext);

    // Stream the finalized response back to the client so `useChat` can consume it seamlessly
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Vercel AI SDK protocol for text chunks is '0:"text"\n'
        controller.enqueue(encoder.encode(`0:${JSON.stringify(finalResponse)}\n`));
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Vercel-AI-Data-Stream': 'v1'
      }
    });

  } catch (error) {
    console.error("Experience API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
