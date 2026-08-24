import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function markDiscovered(type: string, entityId: string) {
  const session = await auth();
  if (!session?.user?.id) return null; // Silently fail for guests since they don't persist

  try {
    const discovery = await prisma.discoveredLore.upsert({
      where: {
        userId_type_entityId: {
          userId: session.user.id,
          type,
          entityId,
        },
      },
      update: {}, // Do nothing if it exists
      create: {
        userId: session.user.id,
        type,
        entityId,
      },
    });
    return discovery;
  } catch (error) {
    console.error("Discovery Save Error:", error);
    return null;
  }
}

export async function getUserDiscoveries() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.discoveredLore.findMany({
    where: { userId: session.user.id },
    orderBy: { discoveredAt: 'desc' },
  });
}
