import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function logCharacterInteraction(characterId: string, interactionType: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  try {
    return await prisma.characterInteraction.upsert({
      where: {
        userId_characterId_interactionType: {
          userId: session.user.id,
          characterId,
          interactionType,
        },
      },
      update: {
        interactionCount: { increment: 1 },
        lastInteractionAt: new Date(),
      },
      create: {
        userId: session.user.id,
        characterId,
        interactionType,
        interactionCount: 1,
      },
    });
  } catch (error) {
    console.error("Interaction Log Error:", error);
    return null;
  }
}

export async function logEventInteraction(eventId: string, interactionType: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  try {
    return await prisma.eventInteraction.upsert({
      where: {
        userId_eventId_interactionType: {
          userId: session.user.id,
          eventId,
          interactionType,
        },
      },
      update: {
        interactionCount: { increment: 1 },
        lastInteractionAt: new Date(),
      },
      create: {
        userId: session.user.id,
        eventId,
        interactionType,
        interactionCount: 1,
      },
    });
  } catch (error) {
    console.error("Event Interaction Log Error:", error);
    return null;
  }
}
