import { AgentContext, AgentResult } from './contracts';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { characters, moments } from '@/data/lore';

export interface CausalityInput {
  decisionId: string;
  chosenOptionId: string;
  originEventId: string;
  originDay: string;
  activeCharacters: string[];
}

export interface CausalNode {
  id: string;
  type: 'FIRST_ORDER' | 'SECOND_ORDER' | 'THIRD_ORDER';
  description: string;
  confidence: 'HIGH_CONFIDENCE' | 'SUPPORTED' | 'PLAUSIBLE' | 'SPECULATIVE' | 'UNSUPPORTED';
  affectedCharacters: string[];
  sourceCauseId: string | null;
}

export interface CausalityAgentData {
  branchSummary: string;
  causalNodes: CausalNode[];
  alteredEvents: string[];
  alteredRelationships: string[];
  divergences: string[];
  confidence: string;
}

export class CausalityAgent {
  public async execute(
    context: AgentContext,
    inputs: CausalityInput
  ): Promise<AgentResult<CausalityAgentData>> {
    const start = Date.now();
    
    // Fetch canonical facts to ground the reasoning
    const activeCharNames = inputs.activeCharacters
      .map(id => characters.find(c => c.id === id)?.name)
      .filter(Boolean);
      
    const originEvent = moments.find(m => m.id === inputs.originEventId)?.title || inputs.originEventId;

    const systemPrompt = `You are the Causality Engine of the DHARMAVERSE.
Your purpose is to mathematically compute the ripple effects of an Alternate Timeline decision.

CANONICAL ORIGIN: ${originEvent} (Day: ${inputs.originDay})
ACTIVE CHARACTERS: ${activeCharNames.join(', ')}

USER DECISION TRIGGER (DEVIATION):
Decision ID: ${inputs.decisionId}
Option Chosen: ${inputs.chosenOptionId}

RULES FOR CAUSAL REASONING:
1. Identify FIRST_ORDER effects (immediate physics/actions that change right now).
2. Identify SECOND_ORDER effects (how characters react, strategic shifts).
3. Identify THIRD_ORDER effects (future events that may diverge based on 1 and 2).
4. NEVER claim unsupported, long-range outcomes as absolute facts. 
5. NEVER mutate canonical events that occurred BEFORE this decision.

Generate a structured causal graph of consequences.
`;

    try {
      const result = await generateObject({
        model: google('models/gemini-2.5-flash'),
        system: systemPrompt,
        prompt: "Compute the causal graph for this deviation.",
        schema: z.object({
          branchSummary: z.string().describe("A 2-sentence summary of what this alternate reality is about."),
          causalNodes: z.array(z.object({
            id: z.string(),
            type: z.enum(['FIRST_ORDER', 'SECOND_ORDER', 'THIRD_ORDER']),
            description: z.string(),
            confidence: z.enum(['HIGH_CONFIDENCE', 'SUPPORTED', 'PLAUSIBLE', 'SPECULATIVE', 'UNSUPPORTED']),
            affectedCharacters: z.array(z.string()).describe("List of character IDs affected"),
            sourceCauseId: z.string().nullable().describe("The ID of the causal node that triggered this one, or null if it's the direct user decision.")
          })),
          alteredEvents: z.array(z.string()).describe("Titles of future canonical events that will likely change."),
          alteredRelationships: z.array(z.string()).describe("Relationships that will shift (e.g. 'Arjuna loses faith in Krishna')."),
          divergences: z.array(z.string()).describe("Long-term speculative divergences."),
          confidence: z.enum(['HIGH_CONFIDENCE', 'SUPPORTED', 'PLAUSIBLE', 'SPECULATIVE', 'UNSUPPORTED']).describe("Overall confidence in this branch logic.")
        }),
      });

      // Filter out unsupported nodes
      const validNodes = result.object.causalNodes.filter(n => n.confidence !== 'UNSUPPORTED');
      result.object.causalNodes = validNodes;

      return {
        agent: 'CAUSALITY',
        success: true,
        confidence: result.object.confidence as any,
        data: result.object,
        latencyMs: Date.now() - start
      };
    } catch (error: any) {
      console.error("CausalityAgent Error:", error);
      return {
        agent: 'CAUSALITY',
        success: false,
        confidence: 'UNSUPPORTED',
        data: {
          branchSummary: "Causal computation failed.",
          causalNodes: [],
          alteredEvents: [],
          alteredRelationships: [],
          divergences: [],
          confidence: 'UNSUPPORTED'
        },
        warnings: [error.message],
        latencyMs: Date.now() - start
      };
    }
  }
}

export const causalityAgent = new CausalityAgent();
