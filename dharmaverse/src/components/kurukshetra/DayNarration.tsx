'use client';

import React, { useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import VoicePlayer from '@/components/VoicePlayer';

interface DayNarrationProps {
  warDayId: string;
}

export default function DayNarration({ warDayId }: DayNarrationProps) {
  const { messages, append, isLoading } = useChat({
    api: '/api/kurukshetra/narration',
    id: `narration-${warDayId}`,
    body: { warDayId }
  });

  useEffect(() => {
    // Only fetch if we haven't already
    if (messages.length === 0 && !isLoading) {
      append({
        role: 'user',
        content: 'Generate narration',
        // In AI SDK, we can pass data in the body by overriding the request or passing data in the append call
        // For simplicity, we'll pass it in a JSON body via fetch if useChat doesn't support body natively in append.
        // Wait, useChat supports `body` in the hook options.
      } as any);
    }
  }, [messages.length, isLoading, append]);

  const lastMessage = messages[messages.length - 1];
  const isFinished = !isLoading && messages.length > 0;

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
