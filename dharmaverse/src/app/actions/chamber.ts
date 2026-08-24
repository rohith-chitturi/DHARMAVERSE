"use server";

import { saveChamberSession } from "@/lib/services/chamberService";

export async function submitChamberSession(scenarioId: string, language: string, messages: any[]) {
  try {
    const session = await saveChamberSession(scenarioId, language, messages);
    return { success: true, data: session };
  } catch (error) {
    console.error("Failed to save Chamber Session:", error);
    return { success: false, error: "Failed to save session" };
  }
}
