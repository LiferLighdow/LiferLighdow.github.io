
import React, { useState, useCallback } from 'react';
import type { Message, ProfileData, ExportData } from './types';
import { buildSystemInstruction, generateSuggestedReply, getChatStream } from './services/geminiService';
import { useLocalization } from './contexts/LocalizationContext';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';
import SetupScreen from './components/SetupScreen';
import LandingScreen from './components/LandingScreen';
import LanguageSelectionScreen from './components/LanguageSelectionScreen';

function App() {
  const { t, language } = useLocalization();
  const [view, setView] = useState<'languageSelection' | 'landing' | 'setup' | 'chat'>('languageSelection');
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState(false);
  const [isChatReady, setIsChatReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLanguageSelected = () => {
    setView('landing');
  };

  const handleStartChat = useCallback((profileData: ProfileData, initialMessages?: Message[]) => {
    try {
      setError(null);
      setProfile(profileData);
      
      if (initialMessages && initialMessages.length > 0) {
        setMessages(initialMessages);
      } else {
        setMessages([
          {
            id: 'init',
            text: profileData.openingLine,
            sender: 'ai',
          },
        ]);
      }
      setIsChatReady(true);
      setView('chat');
    } catch (e: unknown) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError('An unknown error occurred during initialization.');
        }
        setIsChatReady(false);
        setView('setup'); 
    }
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || !profile) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
    };
    
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setIsLoading(true);
    setError(null);
    
    const aiMessageId = Date.now().toString() + '-ai';

    try {
        const systemInstruction = buildSystemInstruction(profile, language);
        const response = await getChatStream(systemInstruction, currentMessages, text);
        
        setIsLoading(false);
        
        if (!response.body) {
            throw new Error("Response body is null");
        }
        
        setMessages(prev => [...prev, { id: aiMessageId, text: '', sender: 'ai' }]);
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            fullResponse += decoder.decode(value, { stream: true });
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === aiMessageId ? { ...msg, text: fullResponse } : msg
                )
            );
        }

        if (fullResponse.trim() === "") {
             const emptyResponseText = t('ai_empty_response');
             setMessages(prev =>
                prev.map(msg =>
                    msg.id === aiMessageId ? { ...msg, text: emptyResponseText } : msg
                )
            );
        }

    } catch (e: unknown) {
        setMessages(prev => prev.filter(msg => msg.id !== aiMessageId));
        let errorMessage = t('ai_response_error', { name: profile?.name || 'AI' });
        if (e instanceof Error) {
            errorMessage = `${errorMessage} (${e.message})`;
        }
        setError(errorMessage);
        setMessages(prev => [...prev, { id: 'error-' + Date.now(), text: errorMessage, sender: 'ai' }]);
    } finally {
        setIsLoading(false);
    }
  }, [profile, messages, t, language]);
  
  const handleGenerateSuggestion = useCallback(async (): Promise<string> => {
    if (!profile) return "";
    setIsGeneratingSuggestion(true);
    let suggestion = t('ai_suggestion_failed');
    try {
        suggestion = await generateSuggestedReply(messages, profile, language);
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            setError(`Suggestion generation failed: ${e.message}`);
        }
    } finally {
        setIsGeneratingSuggestion(false);
    }
    return suggestion;
  }, [profile, messages, language, t]);


  const handleExportChat = useCallback(() => {
    if (!profile || messages.length === 0) {
      alert(t('no_history_to_export'));
      return;
    }
    const exportData: ExportData = {
      profile,
      messages,
    };
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-with-${profile.name}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [profile, messages, t]);

  const handleImportChat = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data = JSON.parse(text) as ExportData;
        
        if (data.profile && data.profile.name && data.messages) {
            handleStartChat(data.profile, data.messages);
        } else {
          throw new Error(t('invalid_file_format'));
        }
      } catch (err) {
        let message = t('import_failed');
        if (err instanceof Error) {
            message = `${message} (${err.message})`;
        }
        alert(message);
      } finally {
          if(event.target) {
            event.target.value = '';
          }
      }
    };
    reader.readAsText(file);
  };
  
  const handleReset = () => {
    if (window.confirm(t('confirm_reset_message'))) {
        setIsChatReady(false);
        setProfile(null);
        setMessages([]);
        setError(null);
        setView('setup');
    }
  }
  
  const handleNavigateToSetup = () => {
    setError(null);
    setView('setup');
  }
  
  const handleBackToLanding = () => {
     if (window.confirm(t('confirm_back_to_landing_message'))) {
        setError(null);
        setView('landing');
    }
  }

  if (view === 'languageSelection') {
    return <LanguageSelectionScreen onLanguageSelect={handleLanguageSelected} />
  }

  if (view === 'landing') {
    return <LandingScreen onNavigateToSetup={handleNavigateToSetup} onImport={handleImportChat} />
  }

  if (view === 'setup') {
    return <SetupScreen onStartChat={handleStartChat} onBack={handleBackToLanding} initialError={error} />;
  }

  return (
    <div className="flex flex-col h-screen bg-pink-50 dark:bg-gray-900 font-sans">
      <Header profile={profile} onExport={handleExportChat} onImport={handleImportChat} onReset={handleReset} isOnline={isChatReady} />
      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto overflow-hidden">
        <ChatWindow messages={messages} profile={profile} />
        <div className="p-4">
          {isLoading && <TypingIndicator profile={profile} />}
          {error && !isLoading && <div className="text-red-500 text-center text-sm mb-2">{error}</div>}
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onGenerateSuggestion={handleGenerateSuggestion}
            isGeneratingSuggestion={isGeneratingSuggestion}
            isChatReady={isChatReady}
            />
        </div>
      </main>
    </div>
  );
}

export default App;
