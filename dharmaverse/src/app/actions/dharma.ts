"use server";

import { saveDharmaProfile } from "@/lib/services/dharmaService";

export async function submitDharmaProfile(profile: any) {
  try {
    const savedProfile = await saveDharmaProfile(profile);
    return { success: true, data: savedProfile };
  } catch (error) {
    console.error("Failed to save Dharma Profile:", error);
    return { success: false, error: "Failed to save to Cosmic Archive" };
  }
}
