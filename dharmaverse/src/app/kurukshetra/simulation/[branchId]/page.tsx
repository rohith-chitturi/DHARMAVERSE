import React from 'react';
import AlternateTimelineView from '@/components/kurukshetra/AlternateTimelineView';
import { markDiscovered } from '@/lib/services/discoveryService';

export default async function SimulationBranchPage({ params }: { params: Promise<{ branchId: string }> }) {
  const resolvedParams = await params;
  await markDiscovered('simulation_branch', resolvedParams.branchId);
  return <AlternateTimelineView branchId={resolvedParams.branchId} />;
}
