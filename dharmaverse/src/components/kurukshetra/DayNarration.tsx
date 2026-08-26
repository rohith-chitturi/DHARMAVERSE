'use client';

import React, { useEffect, useRef } from 'react';
import { useCompletion } from '@ai-sdk/react';
import VoicePlayer from '@/components/VoicePlayer';
import { DayState } from '@/data/kurukshetra';

interface DayNarrationProps {
  warDayId: string;
  currentState?: DayState;
}

export default function DayNarration({ warDayId, currentState }: DayNarrationProps) {
  const { completion, complete, isLoading, setCompletion }: any = useCompletion({
    api: '/api/kurukshetra/narration',
    id: `narration-${warDayId}-${currentState}`,
    body: { warDayId, currentState }
  });

  const prevRef = useRef(currentState);
  const [hasStarted, setHasStarted] = React.useState(false);

  useEffect(() => {
    if (currentState !== prevRef.current) {
      setCompletion('');
      setHasStarted(false);
      prevRef.current = currentState;
    }
    
    if (!hasStarted && !isLoading) {
      setHasStarted(true);
      complete(`Narrate the state: ${currentState || 'DAY_START'}`);
    }
  }, [hasStarted, isLoading, complete, currentState, setCompletion]);

  const isFinished = !isLoading && completion.length > 0;

  return (
    <section className="prose prose-invert prose-amber max-w-none relative group">
      <div className="absolute -left-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {isFinished && completion && (
          <VoicePlayer characterId="sanjaya" text={completion} />
        )}
      </div>
      <p className="text-xl text-amber-100/90 leading-relaxed font-light italic border-l-2 border-red-800 pl-6 min-h-[4rem]">
        {completion || "Gathering canonical intelligence..."}
        {isLoading && <span className="inline-block w-2 h-4 bg-amber-500/50 ml-2 animate-pulse"></span>}
      </p>
    </section>
  );
}
