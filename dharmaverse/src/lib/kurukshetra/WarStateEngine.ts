import { kurukshetraDays, WarDay, CriticalDecision, DayState, ChronologicalEvent } from '@/data/kurukshetra';

export interface WarSessionState {
  userId: string;
  dayId: string;
  currentState: DayState;
  currentEventIndex: number;
}

export class WarStateEngine {
  private sessions: Map<string, WarSessionState> = new Map();

  /**
   * Initializes or retrieves the active session for a user on a given day.
   */
  getSession(userId: string, dayId: string): WarSessionState {
    const key = `${userId}-${dayId}`;
    if (!this.sessions.has(key)) {
      this.sessions.set(key, {
        userId,
        dayId,
        currentState: 'DAY_START',
        currentEventIndex: 0
      });
    }
    return this.sessions.get(key)!;
  }

  /**
   * Advances the chronology to the next state for the user's session.
   */
  advanceState(userId: string, dayId: string): WarSessionState | null {
    const session = this.getSession(userId, dayId);
    const day = this.getWarDay(dayId);
    if (!day) return null;

    if (session.currentEventIndex < day.chronology.length - 1) {
      session.currentEventIndex++;
      session.currentState = day.chronology[session.currentEventIndex].stateTrigger;
    } else if (session.currentState === 'CRITICAL_MOMENT') {
      session.currentState = 'DECISION_AVAILABLE';
    }
    return session;
  }

  /**
   * Retrieves the current chronological event for a session.
   */
  getCurrentEvent(userId: string, dayId: string): ChronologicalEvent | null {
    const session = this.getSession(userId, dayId);
    const day = this.getWarDay(dayId);
    if (!day || day.chronology.length === 0) return null;
    return day.chronology[session.currentEventIndex];
  }

  /**
   * Restores the canonical state by exiting an alternate branch.
   */
  restoreCanonical(userId: string, dayId: string) {
    const session = this.getSession(userId, dayId);
    session.currentState = 'CANONICAL_RESTORED';
  }

  /**
   * Set state directly (e.g. to enter ALTERNATE_BRANCH).
   */
  setExplicitState(userId: string, dayId: string, state: DayState) {
    const session = this.getSession(userId, dayId);
    session.currentState = state;
  }

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
      canonicalOutcome: day.canonicalOutcome
    };
  }
}

export const warStateEngine = new WarStateEngine();
