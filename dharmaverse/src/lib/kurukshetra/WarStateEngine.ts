import { kurukshetraDays, WarDay, CriticalDecision } from '@/data/kurukshetra';

export class WarStateEngine {
  /**
   * Get the canonical data for a specific day.
   */
  getWarDay(dayId: string): WarDay | null {
    return kurukshetraDays[dayId] || null;
  }

  /**
   * Get all active characters for a specific day and their status.
   */
  getActiveCharacters(dayId: string) {
    const day = this.getWarDay(dayId);
    return day ? day.activeCharacters : [];
  }

  /**
   * Get the canonical critical decisions available for this day.
   */
  getCriticalDecisions(dayId: string): CriticalDecision[] {
    const day = this.getWarDay(dayId);
    return day ? day.criticalDecisions : [];
  }

  /**
   * Get a specific decision by ID.
   */
  getDecision(dayId: string, decisionId: string): CriticalDecision | null {
    const day = this.getWarDay(dayId);
    if (!day) return null;
    return day.criticalDecisions.find(d => d.id === decisionId) || null;
  }

  /**
   * Validates if a chosen option is actually part of the canonical decision.
   */
  validateOption(dayId: string, decisionId: string, optionId: string): boolean {
    const decision = this.getDecision(dayId, decisionId);
    if (!decision) return false;
    return decision.options.some(o => o.id === optionId);
  }

  /**
   * Returns a lightweight summary of the day for the LLM Context.
   */
  getDayContextSummary(dayId: string) {
    const day = this.getWarDay(dayId);
    if (!day) return null;

    return {
      dayNumber: day.dayNumber,
      title: day.title,
      commanderKaurava: day.commanderKaurava,
      commanderPandava: day.commanderPandava,
      majorEvents: day.majorEvents,
      canonicalOutcome: day.canonicalOutcome
    };
  }
}

export const warStateEngine = new WarStateEngine();
