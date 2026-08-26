'use server';

import { warStateEngine } from '@/lib/kurukshetra/WarStateEngine';
import { auth } from '@/auth';

export async function getSessionState(dayId: string) {
  const sessionUser = await auth();
  const userId = sessionUser?.user?.id || 'guest';
  return warStateEngine.getSession(userId, dayId);
}

export async function advanceSessionState(dayId: string) {
  const sessionUser = await auth();
  const userId = sessionUser?.user?.id || 'guest';
  return warStateEngine.advanceState(userId, dayId);
}

export async function restoreCanonicalSessionState(dayId: string) {
  const sessionUser = await auth();
  const userId = sessionUser?.user?.id || 'guest';
  warStateEngine.restoreCanonical(userId, dayId);
  return { success: true };
}
