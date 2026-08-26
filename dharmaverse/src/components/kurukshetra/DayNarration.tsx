'use client';

import React, { useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import VoicePlayer from '@/components/VoicePlayer';
import { DayState } from '@/data/kurukshetra';

interface DayNarrationProps {
  warDayId: string;
  currentState?: DayState;
}

export default function DayNarration({ warDayId, currentState }: DayNarrationProps) {
  const { messages, append, isLoading, setMessages }: any = useChat({
    api: '/api/kurukshetra/narration',
    id: `narration-${warDayId}-${currentState}`,
    body: { warDayId, currentState }
  } as any);

  const prevRef = useRef(currentState);

  useEffect(() => {
    // If state changes, clear previous messages and trigger a new narration
    if (currentState !== prevRef.current) {
      setMessages([]);
      prevRef.current = currentState;
    }
    
    // Only fetch if we haven't already
    if (messages.length === 0 && !isLoading) {
      append({
        role: 'user',
        content: `Narrate the state: ${currentState || 'DAY_START'}`,
      } as any);
    }
  }, [messages.length, isLoading, append, currentState, setMessages]);

  const lastMessage = (messages as any[])[(messages as any[]).length - 1];
  const isFinished = !isLoading && (messages as any[]).length > 0;

  return (
    <section className="prose prose-invert prose-amber max-w-none relative group">
      <div className="absolute -left-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {isFinished && lastMessage?.content && (
          <VoicePlayer characterId="sanjaya" text={lastMessage.content} />
        )}
      </div>
      <p className="text-xl text-amber-100/90 leading-relaxed font-light italic border-l-2 border-red-800 pl-6 min-h-[4rem]">
        {lastMessage?.content || "Gathering canonical intelligence..."}
        {isLoading && <span className="inline-block w-2 h-4 bg-amber-500/50 ml-2 animate-pulse"></span>}
      </p>
    </section>
  );
}
