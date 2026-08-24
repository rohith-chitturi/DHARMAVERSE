import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function saveChamberSession(scenarioId: string, language: string, messages: any[]) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized: Must be logged in to save Chamber Session");
  }

  const newSession = await prisma.chamberSession.create({
    data: {
      userId: session.user.id,
      scenarioId,
      language,
      messages: {
        create: messages.map((m, index) => ({
          speakerId: m.speaker || m.speakerId || 'user',
          text: m.text,
          turnIndex: index,
        })),
      },
    },
  });

  return newSession;
}

export async function getUserChamberSessions() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.chamberSession.findMany({
    where: { userId: session.user.id },
    include: { messages: true },
    orderBy: { datePlayed: 'desc' },
  });
}
