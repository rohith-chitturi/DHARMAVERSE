import { AgentContext, AgentResult } from './contracts';

export interface DharmaAgentData {
  ethicalTensions: string[];
  competingVectors: string[];
  userThematicEmphasis: string[];
}

export class DharmaAgent {
  public async execute(context: AgentContext): Promise<AgentResult<DharmaAgentData>> {
    const start = Date.now();
    
    // In a mature system, this would extract values dynamically based on the event and character.
    // For now, we will deduce from the userNarrativeContext and basic event characteristics.
    const ethicalTensions: string[] = [];
    const competingVectors: string[] = [];
    const userThematicEmphasis: string[] = [];

    const userProfile = context.userContext?.primaryDharmaTraits;

    if (userProfile) {
      // Analyze user profile to provide thematic emphasis
      if (userProfile.includes("Loyalty") || userProfile.includes("loyalty")) {
        userThematicEmphasis.push("Duty to sovereign and friends");
      }
      if (userProfile.includes("Justice") || userProfile.includes("justice")) {
        userThematicEmphasis.push("Upholding universal righteousness over personal bonds");
      }
      if (userProfile.includes("Compassion") || userProfile.includes("compassion")) {
        userThematicEmphasis.push("Mercy and minimizing suffering");
      }
    }

    // Default tensions if we don't have deep semantic extraction yet
    if (context.canonicalContext.eventId || context.canonicalContext.warDayId) {
       ethicalTensions.push("The conflict between warrior duty (Kshatriya Dharma) and cosmic morality.");
       competingVectors.push("Personal honor vs Collective survival.");
    }

    return {
      agent: 'DHARMA',
      success: true,
      confidence: 'SUPPORTED',
      data: {
        ethicalTensions,
        competingVectors,
        userThematicEmphasis
      },
      latencyMs: Date.now() - start
    };
  }
}

export const dharmaAgent = new DharmaAgent();
