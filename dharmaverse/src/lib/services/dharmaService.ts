import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function saveDharmaProfile(profileData: any) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized: Must be logged in to save Dharma Profile");
  }

  const userId = session.user.id;

  // Save the new profile
  const newProfile = await prisma.dharmaProfile.create({
    data: {
      userId,
      primaryArchetype: profileData.primaryArchetype,
      secondaryArchetype: profileData.secondaryArchetype,
      coreStrength: profileData.coreStrength,
      coreWeakness: profileData.coreWeakness,
      scores: profileData.scores,
      yourKurukshetra: profileData.yourKurukshetra,
    },
  });

  // Save evolution snapshot
  await prisma.dharmaEvolution.create({
    data: {
      userId,
      profileId: newProfile.id,
      primaryArchetype: profileData.primaryArchetype,
      secondaryArchetype: profileData.secondaryArchetype,
      scores: profileData.scores,
    }
  });

  return newProfile;
}

export async function getUserDharmaProfiles() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.dharmaProfile.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getUserDharmaEvolution() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.dharmaEvolution.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'asc' },
  });
}
