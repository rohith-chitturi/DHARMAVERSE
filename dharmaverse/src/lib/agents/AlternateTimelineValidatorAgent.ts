import { AgentContext, AgentResult } from './contracts';
import { CausalityAgentData } from './CausalityAgent';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

export interface AlternateValidatorInput {
  proposedResponse: string;
  causalityData: CausalityAgentData;
  characterId: string;
}

export interface AlternateValidatorData {
  valid: boolean;
  violations: string[];
  repairInstructions: string[];
}

export class AlternateTimelineValidatorAgent {
  public async execute(
    context: AgentContext,
    inputs: AlternateValidatorInput
  ): Promise<AgentResult<AlternateValidatorData>> {
    const start = Date.now();
    const { proposedResponse, causalityData, characterId } = inputs;
    
    let systemPrompt = `You are the Alternate Timeline Validator for DHARMAVERSE.
Your job is to ruthlessly check the PROPOSED RESPONSE for INTERNAL CONTRADICTIONS against the Alternate Timeline state.

This is a Simulation Branch. IT IS ALLOWED TO DIFFER FROM CANONICAL MAHABHARATA.
Do NOT reject the response because it differs from standard lore.

You must ONLY reject it if:
1. It contradicts the established Ripple Effects (Causal Nodes) of this specific branch.
2. The character claims to know future events they shouldn't know yet.
3. The character breaks their core personality (their personality is unchanged, only their circumstances changed).

## ALTERNATE TIMELINE STATE (BRANCH LOGIC):
Branch Summary: ${causalityData.branchSummary}
Ripple Effects: 
${causalityData.causalNodes.map(n => `- ${n.type}: ${n.description}`).join('\n')}

Analyze the PROPOSED RESPONSE below. 
If it violates the branch logic, mark valid = false and provide specific repairInstructions.
If it is internally consistent with the branch, mark valid = true.

PROPOSED RESPONSE:
"""
${proposedResponse}
"""
`;

    try {
      const result = await generateObject({
        model: google('models/gemini-2.5-flash'),
        system: "You are a strict JSON data extraction and validation system.",
        prompt: systemPrompt,
        schema: z.object({
          valid: z.boolean(),
          violations: z.array(z.string()).describe("List of internal contradictions or character breaks within the alternate branch"),
          repairInstructions: z.array(z.string()).describe("Instructions to fix the response to align with the alternate branch logic")
        }),
      });

      const data = result.object;
      
      return {
        agent: 'VALIDATOR',
        success: true,
        confidence: data.valid ? 'HIGH_CONFIDENCE' : 'UNSUPPORTED',
        data,
        latencyMs: Date.now() - start
      };
    } catch (error: any) {
      console.error("AlternateTimelineValidatorAgent Error:", error);
      return {
        agent: 'VALIDATOR',
        success: false,
        confidence: 'UNSUPPORTED',
        data: { valid: false, violations: [], repairInstructions: ["Validation failed."] },
        warnings: [error.message],
        latencyMs: Date.now() - start
      };
    }
  }
}

export const alternateTimelineValidatorAgent = new AlternateTimelineValidatorAgent();
