import { SimulationBranch, SimulationConsequences } from '@/data/kurukshetra';
import { warStateEngine } from './WarStateEngine';

class AlternateTimelineEngine {
  // In-memory store for simulation branches during the session.
  // In a real app with a DB, this would be backed by Postgres/Mongo.
  private branches: Map<string, SimulationBranch> = new Map();

  /**
   * Initializes a new alternate timeline simulation branch.
   */
  createBranch(
    userId: string,
    warDayId: string,
    eventId: string,
    decisionId: string,
    chosenOptionId: string
  ): SimulationBranch {
    const canonicalState = warStateEngine.getWarDay(warDayId);
    if (!canonicalState) {
      throw new Error("Cannot branch from unknown canonical state.");
    }

    const branchId = `sim_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    const branch: SimulationBranch = {
      branchId,
      userId,
      warDayId,
      eventId,
      decisionId,
      chosenOptionId,
      originCanonicalState: { ...canonicalState }, // Shallow copy for snapshot
      branchStatus: 'active',
      consequences: null
    };

    this.branches.set(branchId, branch);
    return branch;
  }

  /**
   * Retrieves an active branch.
   */
  getBranch(branchId: string): SimulationBranch | null {
    return this.branches.get(branchId) || null;
  }

  /**
   * Saves the generated consequences to the branch.
   */
  saveConsequences(branchId: string, consequences: SimulationConsequences, branchSummary?: string) {
    const branch = this.branches.get(branchId);
    if (!branch) {
      throw new Error(`Branch ${branchId} not found.`);
    }
    
    branch.consequences = consequences;
    if (branchSummary) {
      branch.branchSummary = branchSummary;
    }
    this.branches.set(branchId, branch);
    return branch;
  }

  /**
   * Ends the simulation branch and returns the user to the canonical timeline.
   */
  closeBranch(branchId: string) {
    const branch = this.branches.get(branchId);
    if (branch) {
      branch.branchStatus = 'completed';
      this.branches.set(branchId, branch);
    }
  }
}

export const alternateTimelineEngine = new AlternateTimelineEngine();
