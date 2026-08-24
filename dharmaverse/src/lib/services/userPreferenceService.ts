import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function saveUserPreferences(prefs: any) {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.userPreference.upsert({
    where: { userId: session.user.id },
    update: {
      language: prefs.language,
      complexity: prefs.complexity,
      epicKnowledge: prefs.epicKnowledge,
      audioModeEnabled: prefs.audioModeEnabled,
    },
    create: {
      userId: session.user.id,
      language: prefs.language || "en",
      complexity: prefs.complexity || "Detailed",
      epicKnowledge: prefs.epicKnowledge || "Familiar",
      audioModeEnabled: prefs.audioModeEnabled || false,
    },
  });
}

export async function getUserPreferences() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.userPreference.findUnique({
    where: { userId: session.user.id },
  });
}
