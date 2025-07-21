
import React, { useRef } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';

interface LandingScreenProps {
  onNavigateToSetup: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreateIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.5a5.5 5.5 0 0 1 5.5 5.5c0 1.52-.614 2.91-1.616 3.924.032.025.063.052.095.079 1.14 1.022 1.895 2.51 2.01 4.127a1.5 1.5 0 0 1-1.489 1.618H7.5a1.5 1.5 0 0 1-1.49-1.618c.115-1.617.87-3.105 2.01-4.127.032-.027.063-.054.095-.079A5.488 5.488 0 0 1 6.5 8a5.5 5.5 0 0 1 5.5-5.5Zm-3.53 10.992A4.48 4.48 0 0 0 6.5 15H17.5a4.48 4.48 0 0 0-1.97-1.508 5.525 5.525 0 0 1-7.06 0Z" />
  </svg>
);

const ImportIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.75 15.625a.75.75 0 0 1 .75.75v3.125a.75.75 0 0 1-1.5 0V16.375a.75.75 0 0 1 .75-.75Z" />
    <path d="M11.625 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Z" />
    <path d="M8.375 14.25a.75.75 0 0 0-1.5 0v5.25a.75.75 0 0 0 1.5 0v-5.25Z" />
    <path d="M15.625 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Z" />
    <path d="M4.5 5.25A2.25 2.25 0 0 1 6.75 3h10.5A2.25 2.25 0 0 1 19.5 5.25v3.232a4.002 4.002 0 0 0-2-.732V6.75a.75.75 0 0 0-.75-.75H7.5a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 .75.75h3.047c.22.72.583 1.368 1.053 1.914l.014.016V19.5A2.25 2.25 0 0 1 9.75 21H6.75A2.25 2.25 0 0 1 4.5 18.75V5.25Z" />
  </svg>
);


const LandingScreen: React.FC<LandingScreenProps> = ({ onNavigateToSetup, onImport }) => {
  const { t } = useLocalization();
  const importInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    importInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 font-sans text-center">
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">{t('landing_title')}</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          {t('landing_subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {/* Create New Card */}
        <button
          onClick={onNavigateToSetup}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >
          <div className="bg-pink-100 dark:bg-pink-900/50 rounded-full p-4 mb-4">
            <CreateIcon className="w-12 h-12 text-pink-500 dark:text-pink-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('create_new_character')}</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{t('create_new_character_desc')}</p>
        </button>

        {/* Import Existing Card */}
        <button
          onClick={handleImportClick}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >
          <div className="bg-sky-100 dark:bg-sky-900/50 rounded-full p-4 mb-4">
            <ImportIcon className="w-12 h-12 text-sky-500 dark:text-sky-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('import_chat_history')}</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{t('import_chat_history_desc')}</p>
        </button>
      </div>
      
      <input type="file" ref={importInputRef} onChange={onImport} className="hidden" accept="application/json" />

      <footer className="absolute bottom-4 text-gray-500 dark:text-gray-400 text-sm">
        <p>{t('powered_by')}</p>
      </footer>
    </div>
  );
};

export default LandingScreen;
