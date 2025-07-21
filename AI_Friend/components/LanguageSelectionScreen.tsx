
import React from 'react';
import { useLocalization, Language } from '../contexts/LocalizationContext';

interface LanguageSelectionScreenProps {
  onLanguageSelect: () => void;
}

const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({ onLanguageSelect }) => {
    const { setLanguage } = useLocalization();
    
    const handleSelect = (lang: Language) => {
        setLanguage(lang);
        onLanguageSelect();
    };

    return (
        <div className="min-h-screen bg-pink-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 font-sans text-center">
             <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white leading-tight">
                    Select Language / 選擇語言<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                        言語を選択 / 选择语言
                    </span>
                </h1>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => handleSelect('en')}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-64 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">English</h2>
                </button>
                 <button
                    onClick={() => handleSelect('zh-TW')}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-64 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">繁體中文</h2>
                </button>
                 <button
                    onClick={() => handleSelect('ja')}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-64 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">日本語</h2>
                </button>
                 <button
                    onClick={() => handleSelect('zh-CN')}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-64 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">简体中文</h2>
                </button>
             </div>
        </div>
    );
};
export default LanguageSelectionScreen;
