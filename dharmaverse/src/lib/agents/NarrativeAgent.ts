import { AgentContext, AgentResult } from './contracts';
import { LoreAgentData } from './LoreAgent';
import { TimelineAgentData } from './TimelineAgent';
import { CharacterAgentData } from './CharacterAgent';
import { DharmaAgentData } from './DharmaAgent';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export interface NarrativeAgentInput {
  lore: LoreAgentData | null;
  timeline: TimelineAgentData | null;
  character: CharacterAgentData | null;
  dharma: DharmaAgentData | null;
}

export interface NarrativeAgentData {
  text: string;
}

export class NarrativeAgent {
  public async execute(
    context: AgentContext,
    inputs: NarrativeAgentInput
  ): Promise<AgentResult<NarrativeAgentData>> {
    const start = Date.now();
    const { lore, timeline, character, dharma } = inputs;
    
    // Construct the strictly bound system prompt
    let systemPrompt = `You are playing a role in a cinematic simulation of the Mahabharata. `;
    
    if (lore?.characterFacts) {
      systemPrompt += `You are ${lore.characterFacts.name}, ${lore.characterFacts.title}.
Personality: ${lore.characterFacts.personalityTraits?.join(', ') || ''}
Speech Style: ${lore.characterFacts.speechStyle || 'Cinematic, ancient, grounded'}\n\n`;
    }

    if (character) {
      systemPrompt += `## CONSCIOUSNESS & OBJECTIVE
Your current objective: "${character.objective}"
Emotional state: ${character.emotionalState || 'Focused'}
Current Beliefs: ${character.consciousnessState?.beliefs?.join(' | ') || 'Default'}\n\n`;
    }

    if (timeline) {
      systemPrompt += `## TIMELINE CONSTRAINTS
Current Event: ${timeline.currentEvent?.title || 'Static Timeline'}
State: ${timeline.currentState || 'Unknown'}
CRITICAL TEMPORAL RULE: You only know events that have occurred up to this point. 
Do NOT reference or foreshadow the following future events as facts: 
${timeline.forbiddenEvents.map(e => '- ' + e.title).join('\n') || 'None'}
\n`;
    }

    if (dharma) {
      systemPrompt += `## THEMATIC EMPHASIS (Subtle)
Tensions: ${dharma.ethicalTensions.join(', ')}
User Thematic Emphasis: ${dharma.userThematicEmphasis.join(', ')} (Do not explicitly state these, just weave them in.)\n\n`;
    }
    
    systemPrompt += `## INSTRUCTIONS
- Respond directly to the user in the context of the simulation.
- Maintain your character boundaries. Do not invent canonical lore.
- Keep the response cinematic, emotionally intelligent, and concise.
- Language/Complexity preference: ${context.options?.language || 'en'}, ${context.options?.complexity || 'default'}`;

    try {
      const messages = context.request.recentMessages || [];
      // Always append the final user message to the context
      if (context.request.message) {
         // Filter out the last message if it's already there to prevent duplication, or just use the recentMessages directly if it includes the latest.
         // Assuming recentMessages includes the current request if handled by Orchestrator.
      }
      
      const result = await generateText({
        model: google('models/gemini-2.5-flash'),
        system: systemPrompt,
        messages: messages.length > 0 ? messages as any : [{ role: 'user', content: context.request.message }],
      });

      return {
        agent: 'NARRATIVE',
        success: true,
        confidence: 'HIGH_CONFIDENCE',
        data: {
          text: result.text
        },
        latencyMs: Date.now() - start
      };
    } catch (error: any) {
      console.error("NarrativeAgent Error:", error);
      return {
        agent: 'NARRATIVE',
        success: false,
        confidence: 'UNSUPPORTED',
        data: { text: "" },
        warnings: [error.message],
        latencyMs: Date.now() - start
      };
    }
  }
}

export const narrativeAgent = new NarrativeAgent();
