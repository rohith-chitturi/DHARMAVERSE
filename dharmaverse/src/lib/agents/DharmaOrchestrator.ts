import { AgentContext } from './contracts';
import { loreAgent } from './LoreAgent';
import { timelineAgent } from './TimelineAgent';
import { characterAgent } from './CharacterAgent';
import { dharmaAgent } from './DharmaAgent';
import { narrativeAgent } from './NarrativeAgent';
import { canonValidatorAgent } from './CanonValidatorAgent';

export class DharmaOrchestrator {
  public async runExperiencePipeline(context: AgentContext): Promise<string> {
    console.log("[Orchestrator] Starting Experience Pipeline");
    
    // 1. Parallel Context Retrieval
    console.log("[Orchestrator] Retrieving Context...");
    const [loreResult, timelineResult, characterResult, dharmaResult] = await Promise.all([
      loreAgent.execute(context),
      timelineAgent.execute(context),
      characterAgent.execute(context),
      dharmaAgent.execute(context)
    ]);

    const narrativeInputs = {
      lore: loreResult.data,
      timeline: timelineResult.data,
      character: characterResult.data,
      dharma: dharmaResult.data
    };

    let attempts = 0;
    const maxAttempts = 2;
    let finalResponse = "The archives are temporarily silent. Please try again.";
    
    while (attempts < maxAttempts) {
      attempts++;
      console.log(`[Orchestrator] Generating Narrative (Attempt ${attempts})...`);
      
      const narrativeResult = await narrativeAgent.execute(context, narrativeInputs);
      if (!narrativeResult.success) {
        console.error("[Orchestrator] Narrative generation failed.");
        break;
      }

      const proposedText = narrativeResult.data.text;
      
      console.log("[Orchestrator] Validating Narrative...");
      const validationResult = await canonValidatorAgent.execute(context, {
        proposedResponse: proposedText,
        ...narrativeInputs
      });

      if (validationResult.data.valid) {
        console.log("[Orchestrator] Validation SUCCESS.");
        finalResponse = proposedText;
        break;
      } else {
        console.warn("[Orchestrator] Validation FAILED:", validationResult.data.violations);
        // Inject repair instructions into the context for the next iteration
        context.request.message = `[SYSTEM INSTRUCTION: Your previous response was rejected by the Canon Validator for the following reasons:\n- ${validationResult.data.violations.join('\n- ')}\n- ${validationResult.data.spoilers.join('\n- ')}\n\nREPAIR INSTRUCTIONS: ${validationResult.data.repairInstructions.join(' ')}\n\nRewrite your response focusing ONLY on fixing these issues. DO NOT break character.]\n\nOriginal Request: ${context.request.message}`;
        
        if (attempts === maxAttempts) {
          console.error("[Orchestrator] Max repair attempts reached. Returning deterministic fallback.");
          finalResponse = "My mind is clouded... the timeline restricts what I can say right now. Ask me something else.";
        }
      }
    }

    return finalResponse;
  }
}

export const dharmaOrchestrator = new DharmaOrchestrator();
