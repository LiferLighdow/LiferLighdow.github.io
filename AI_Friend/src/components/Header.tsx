
import React, { useState, useRef, useEffect } from 'react';
import type { ProfileData } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';

interface HeaderProps {
    profile: ProfileData | null;
    onExport: () => void;
    onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onReset: () => void;
    isOnline: boolean;
}

const MenuIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
);


const Header: React.FC<HeaderProps> = ({ profile, onExport, onImport, onReset, isOnline }) => {
  const { t } = useLocalization();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleImportClick = () => {
    importInputRef.current?.click();
    setMenuOpen(false);
  };
  
  const handleExportClick = () => {
    onExport();
    setMenuOpen(false);
  }
  
  const handleResetClick = () => {
    onReset();
    setMenuOpen(false);
  }

  return (
    <header className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-md sticky top-0 z-10">
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <img
            src={profile?.avatar || `https://api.dicebear.com/8.x/adventurer/svg?seed=miko`}
            alt={t('ai_avatar_label', { name: profile?.name || 'AI' })}
            className="w-14 h-14 rounded-full border-2 border-pink-300 dark:border-pink-500 shadow-lg object-cover"
            />
            <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                {profile?.name || 'AI'} <span className="text-pink-500">❤️</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <span className="relative flex h-3 w-3 mr-2">
                {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                </span>
                {isOnline ? t('header_online') : t('header_offline')}
            </p>
            </div>
        </div>
        <div className="relative" ref={menuRef}>
            <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                aria-label={t('header_menu')}
            >
                <MenuIcon className="w-6 h-6" />
            </button>
            {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20 border border-gray-200 dark:border-gray-700">
                    <button onClick={handleImportClick} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-gray-700">{t('import_chat')}</button>
                    <button onClick={handleExportClick} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-gray-700">{t('export_chat')}</button>
                     <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    <button onClick={handleResetClick} className="w-full text-left block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">{t('reset_character')}</button>
                </div>
            )}
            <input type="file" ref={importInputRef} onChange={onImport} className="hidden" accept="application/json" />
        </div>
      </div>
    </header>
  );
};

export default Header;
