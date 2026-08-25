import { UserNarrativeContext } from "./NarrativeContext";

export class PersonalizationEngine {
  /**
   * Deterministically converts Dharma traits into subtle narrative injection signals.
   * This ensures the LLM naturally focuses on themes relevant to the user,
   * without needing to explain the user's profile directly.
   */
  generateSignals(userContext: UserNarrativeContext | null): string[] {
    if (!userContext) {
      return ["Provide standard, balanced narrative focus."];
    }

    const signals: string[] = [];

    // Map traits to subtle narrative instructions
    const traitMapping: Record<string, string> = {
      "Loyalty": "Subtly emphasize themes of loyalty, obligation, and the cost of unwavering devotion.",
      "Sacrifice": "Subtly highlight the weight of personal sacrifice and the hidden burdens characters carry.",
      "Justice": "Subtly emphasize themes of universal justice, moral rightness, and the consequences of breaking dharma.",
      "Wisdom": "Subtly focus on long-term philosophical implications, detachments, and deeper cosmic truths.",
      "Duty": "Subtly highlight societal duty (Kshatriya dharma) and the conflict between personal desire and structural obligation.",
      "Ambition": "Subtly explore the drive for recognition, power dynamics, and the desire to alter one's destiny."
    };

    userContext.primaryDharmaTraits.forEach(trait => {
      if (traitMapping[trait]) {
        signals.push(traitMapping[trait]);
      }
    });

    if (userContext.epicKnowledge === "NEWCOMER") {
      signals.push("The user is new to the Mahabharata. Ensure critical context, relationships, and basic motivations are clearly explained without assuming prior knowledge.");
    } else if (userContext.epicKnowledge === "ENTHUSIAST") {
      signals.push("The user knows the epic well. Bypass basic plot summaries and focus on deeper psychological layers, conflicting motivations, and nuanced moral ambiguity.");
    }

    if (signals.length === 0) {
      signals.push("Maintain a neutral, balanced thematic approach.");
    }

    return signals;
  }
}

export const personalizationEngine = new PersonalizationEngine();
