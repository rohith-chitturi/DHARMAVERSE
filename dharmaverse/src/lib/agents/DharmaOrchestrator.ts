import { AgentContext } from './contracts';
import { loreAgent } from './LoreAgent';
import { timelineAgent } from './TimelineAgent';
import { characterAgent } from './CharacterAgent';
import { dharmaAgent } from './DharmaAgent';
import { narrativeAgent } from './NarrativeAgent';
import { canonValidatorAgent } from './CanonValidatorAgent';
import { causalityAgent, CausalityInput, CausalityAgentData } from './CausalityAgent';
import { alternateTimelineValidatorAgent, AlternateValidatorInput } from './AlternateTimelineValidatorAgent';

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

  public async runAlternateTimelinePipeline(
    context: AgentContext,
    decisionInputs: CausalityInput
  ): Promise<{ branchData: CausalityAgentData | null; narrative: string }> {
    console.log("[Orchestrator] Starting Alternate Timeline Pipeline");

    // 1. Parallel Context Retrieval
    console.log("[Orchestrator] Retrieving Canonical Context...");
    const [loreResult, timelineResult, characterResult, dharmaResult] = await Promise.all([
      loreAgent.execute(context),
      timelineAgent.execute(context),
      characterAgent.execute(context),
      dharmaAgent.execute(context)
    ]);

    // 2. Causality Agent evaluates the decision
    console.log("[Orchestrator] Running Causality Engine...");
    const causalityResult = await causalityAgent.execute(context, decisionInputs);
    if (!causalityResult.success) {
      console.error("[Orchestrator] Causality Agent failed.");
      return { branchData: null, narrative: "The universe resists this divergence. Causal calculation failed." };
    }

    const branchData = causalityResult.data;

    // We will build the narrative input for this branch creation moment.
    const narrativeInputs = {
      lore: loreResult.data,
      timeline: timelineResult.data,
      character: characterResult.data,
      dharma: dharmaResult.data,
      causalityData: branchData // we pass this so NarrativeAgent knows the branch summary
    };

    let attempts = 0;
    const maxAttempts = 2;
    let finalResponse = "The fracture could not be stabilized. Please try again.";

    // Tell NarrativeAgent this is an alternate timeline creation moment
    context.request.message = `[SYSTEM INSTRUCTION: You are reacting to a TIMELINE DEVIATION. The user has chosen an alternate path. 
Branch Summary: ${branchData.branchSummary}
Ripple Effects: ${branchData.causalNodes.map(n => n.description).join(' | ')}
Acknowledge this new reality in character.]\n${context.request.message}`;

    while (attempts < maxAttempts) {
      attempts++;
      console.log(`[Orchestrator] Generating Branch Narrative (Attempt ${attempts})...`);

      // 3. Narrative Agent
      const narrativeResult = await narrativeAgent.execute(context, narrativeInputs as any);
      if (!narrativeResult.success) {
        break;
      }
      const proposedText = narrativeResult.data.text;

      // 4. Alternate Timeline Validator
      console.log("[Orchestrator] Validating Alternate Timeline Consistency...");
      const validatorInput: AlternateValidatorInput = {
        proposedResponse: proposedText,
        causalityData: branchData,
        characterId: context.canonicalContext.characterId || 'unknown'
      };
      
      const validationResult = await alternateTimelineValidatorAgent.execute(context, validatorInput);

      if (validationResult.data.valid) {
        console.log("[Orchestrator] Branch Validation SUCCESS.");
        finalResponse = proposedText;
        break;
      } else {
        console.warn("[Orchestrator] Branch Validation FAILED:", validationResult.data.violations);
        context.request.message = `[SYSTEM INSTRUCTION: Your previous response contradicted the alternate branch logic:\n- ${validationResult.data.violations.join('\n- ')}\nREPAIR INSTRUCTIONS: ${validationResult.data.repairInstructions.join(' ')}\n\nRewrite your response.]\n\nOriginal Request: ${context.request.message}`;
        if (attempts === maxAttempts) {
          finalResponse = "The timeline remains unstable... I cannot see clearly.";
        }
      }
    }

    return { branchData, narrative: finalResponse };
  }
}

export const dharmaOrchestrator = new DharmaOrchestrator();
