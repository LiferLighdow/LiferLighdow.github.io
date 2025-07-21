
import React, { useState, useRef } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onGenerateSuggestion: () => Promise<string>;
  isGeneratingSuggestion: boolean;
  isChatReady: boolean;
}

const SendIcon: React.FC<{className: string}> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
);

const MagicWandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h.5a1.5 1.5 0 010 3h-.5a1 1 0 00-1 1v.5a1.5 1.5 0 01-3 0V8a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3h.5a1 1 0 001-1v-.5z" />
        <path d="M12.25 10a2.25 2.25 0 00-2.25 2.25V15a2.25 2.25 0 004.5 0v-2.75A2.25 2.25 0 0012.25 10zM8.5 10a2.25 2.25 0 00-2.25 2.25V15a2.25 2.25 0 004.5 0v-2.75A2.25 2.25 0 008.5 10z" />
        <path d="M3 10a2.25 2.25 0 00-2.25 2.25V15a2.25 2.25 0 004.5 0v-2.75A2.25 2.25 0 003 10z" />
    </svg>
);


const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, onGenerateSuggestion, isGeneratingSuggestion, isChatReady }) => {
  const { t } = useLocalization();
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const isDisabled = isLoading || !isChatReady;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isDisabled) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleInsertParens = () => {
    if (!inputRef.current) return;
    const input = inputRef.current;
    const parenPair = language === 'zh-TW' ? '（）' : '()';
    const start = input.selectionStart ?? text.length;
    const newText = text.substring(0, start) + parenPair + text.substring(start);
    setText(newText);

    requestAnimationFrame(() => {
        input.focus();
        input.setSelectionRange(start + 1, start + 1);
    });
  };

  const handleSuggestionClick = async () => {
    if(isGeneratingSuggestion || isDisabled) return;
    const suggestion = await onGenerateSuggestion();
    setText(suggestion);
    inputRef.current?.focus();
  };
  
  const { language } = useLocalization();

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3">
      <div className="relative flex-1">
        <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isChatReady ? t('chat_placeholder') : t('chat_placeholder_offline')}
            disabled={isDisabled}
            className="w-full px-5 py-3 pr-24 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-600 transition duration-300 disabled:opacity-50"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 space-x-2">
            <button
                type="button"
                onClick={handleInsertParens}
                disabled={isDisabled}
                className="text-gray-500 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 disabled:opacity-50 transition-colors"
                aria-label={t('insert_action')}
            >
                <span className="font-bold text-lg">{language === 'zh-TW' ? '()' : '()'}</span>
            </button>
            <button
                type="button"
                onClick={handleSuggestionClick}
                disabled={isDisabled || isGeneratingSuggestion}
                className="text-gray-500 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 disabled:opacity-50 disabled:cursor-wait transition-colors"
                aria-label={t('generate_reply')}
            >
                {isGeneratingSuggestion ? (
                    <div className="w-5 h-5 border-2 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <MagicWandIcon className="w-5 h-5" />
                )}
            </button>
        </div>
      </div>
      <button
        type="submit"
        disabled={isDisabled || !text.trim()}
        className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg transform transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 dark:focus:ring-offset-gray-900 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:scale-100 disabled:cursor-not-allowed"
      >
        <SendIcon className="w-6 h-6" />
      </button>
    </form>
  );
};

export default ChatInput;
