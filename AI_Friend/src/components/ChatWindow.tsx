
import React, { useEffect, useRef } from 'react';
import type { Message, ProfileData } from '../types';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  messages: Message[];
  profile: ProfileData | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, profile }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} profile={profile} />
      ))}
    </div>
  );
};

export default ChatWindow;
