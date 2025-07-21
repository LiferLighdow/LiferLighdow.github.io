
import React from 'react';
import type { Message, ProfileData } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';

interface MessageBubbleProps {
  message: Message;
  profile: ProfileData | null;
}

const UserIcon: React.FC<{className: string}> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
    </svg>
);

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, profile }) => {
  const { t } = useLocalization();
  const isUser = message.sender === 'user';
  const isAI = message.sender === 'ai';

  const bubbleClasses = `
    max-w-[80%] lg:max-w-[65%] rounded-2xl px-4 py-3 shadow-md
    ${isUser 
      ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-br-lg ml-auto' 
      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-lg'
    }
  `;

  const containerClasses = `
    flex items-end gap-2
    ${isUser ? 'justify-end' : 'justify-start'}
  `;

  return (
    <div className={containerClasses}>
      {isAI && (
         <img
          src={profile?.avatar || `https://api.dicebear.com/8.x/adventurer/svg?seed=miko`}
          alt={t('ai_avatar_label', { name: profile?.name || 'AI' })}
          className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
        />
      )}
      <div className={bubbleClasses}>
        <p className="text-base whitespace-pre-wrap break-words">{message.text}</p>
      </div>
       {isUser && (
         <div 
            className="w-8 h-8 rounded-full flex-shrink-0 bg-pink-200 dark:bg-pink-800 flex items-center justify-center text-pink-600 dark:text-pink-300"
            aria-label={t('user_avatar_label')}
            >
            <UserIcon className="w-5 h-5" />
         </div>
      )}
    </div>
  );
};

export default MessageBubble;
