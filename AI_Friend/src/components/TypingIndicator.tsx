
import React from 'react';
import type { ProfileData } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';

interface TypingIndicatorProps {
    profile: ProfileData | null;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ profile }) => {
  const { t } = useLocalization();
  const name = profile?.name || 'AI';
  return (
    <div className="flex items-center space-x-2 justify-start px-2 mb-2">
       <img
          src={profile?.avatar || `https://api.dicebear.com/8.x/adventurer/svg?seed=miko`}
          alt={t('ai_avatar_label', { name })}
          className="w-8 h-8 rounded-full object-cover"
        />
      <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-lg px-4 py-3 shadow-md flex items-center space-x-1.5">
          <span className="text-gray-500 dark:text-gray-400 text-sm">{t('typing_indicator', { name })}</span>
        <div className="w-2 h-2 rounded-full bg-pink-300 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 rounded-full bg-pink-300 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 rounded-full bg-pink-300 animate-bounce"></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
