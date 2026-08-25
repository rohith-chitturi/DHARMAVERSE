import React from 'react';
import AlternateTimelineView from '@/components/kurukshetra/AlternateTimelineView';

export default function SimulationBranchPage({ params }: { params: { branchId: string } }) {
  return <AlternateTimelineView branchId={params.branchId} />;
}
