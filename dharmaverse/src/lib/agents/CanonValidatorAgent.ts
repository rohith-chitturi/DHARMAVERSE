import { AgentContext, AgentResult } from './contracts';
import { LoreAgentData } from './LoreAgent';
import { TimelineAgentData } from './TimelineAgent';
import { CharacterAgentData } from './CharacterAgent';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

export interface ValidatorAgentInput {
  proposedResponse: string;
  lore: LoreAgentData | null;
  timeline: TimelineAgentData | null;
  character: CharacterAgentData | null;
}

export interface ValidatorAgentData {
  valid: boolean;
  violations: string[];
  spoilers: string[];
  unsupportedClaims: string[];
  repairInstructions: string[];
}

export class CanonValidatorAgent {
  public async execute(
    context: AgentContext,
    inputs: ValidatorAgentInput
  ): Promise<AgentResult<ValidatorAgentData>> {
    const start = Date.now();
    const { proposedResponse, lore, timeline, character } = inputs;
    
    // Construct the strict validation prompt
    let systemPrompt = `You are the Canon Validator for the DHARMAVERSE simulation. 
Your job is to ruthlessly check the PROPOSED RESPONSE for:
1. Canonical contradictions against the known lore.
2. Timeline leaks (revealing future events that haven't happened yet).
3. Character knowledge leaks (the character knowing something they shouldn't).

## CONSTRAINTS:
`;
    
    if (lore?.characterFacts) {
      systemPrompt += `Character Identity: ${lore.characterFacts.name}\n`;
    }

    if (character) {
      systemPrompt += `Character Knowledge: ${character.consciousnessState?.knownFacts?.join(' | ') || 'Default'}\n`;
      systemPrompt += `FORBIDDEN KNOWLEDGE: ${character.consciousnessState?.forbiddenKnowledge?.join(' | ') || 'None'}\n`;
    }

    if (timeline) {
      systemPrompt += `Current Event: ${timeline.currentEvent?.title || 'Static Timeline'}\n`;
      systemPrompt += `FORBIDDEN FUTURE EVENTS (Must NOT be spoken of as having happened or inevitable): 
${timeline.forbiddenEvents.map(e => '- ' + e.title).join('\n') || 'None'}\n`;
    }

    systemPrompt += `
Analyze the PROPOSED RESPONSE below. 
If it violates ANY constraint, mark valid = false and provide specific repairInstructions.
If it is completely safe and grounded, mark valid = true.

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
          violations: z.array(z.string()).describe("List of canonical contradictions or character breaks"),
          spoilers: z.array(z.string()).describe("List of future events leaked"),
          unsupportedClaims: z.array(z.string()).describe("List of hallucinations or invented lore"),
          repairInstructions: z.array(z.string()).describe("Instructions for the generation model to fix the issues")
        }),
      });

      const data = result.object;
      let confidence: any = 'HIGH_CONFIDENCE';
      if (!data.valid) {
        confidence = 'UNSUPPORTED';
      }

      return {
        agent: 'VALIDATOR',
        success: true,
        confidence,
        data,
        latencyMs: Date.now() - start
      };
    } catch (error: any) {
      console.error("ValidatorAgent Error:", error);
      return {
        agent: 'VALIDATOR',
        success: false,
        confidence: 'UNSUPPORTED',
        data: { valid: false, violations: [], spoilers: [], unsupportedClaims: [], repairInstructions: ["Validation failed completely."] },
        warnings: [error.message],
        latencyMs: Date.now() - start
      };
    }
  }
}

export const canonValidatorAgent = new CanonValidatorAgent();
