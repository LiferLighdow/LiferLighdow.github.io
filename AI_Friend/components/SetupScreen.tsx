
import React, { useState, useCallback, useRef } from 'react';
import type { ProfileData, Gender } from '../types';
import { generateProfileField, generateImageFromPrompt } from '../services/geminiService';
import { useLocalization } from '../contexts/LocalizationContext';

interface SetupScreenProps {
  onStartChat: (profileData: ProfileData) => void;
  onBack: () => void;
  initialError: string | null;
}

type GeneratingState = {
  [key in keyof Omit<ProfileData, 'gender' | 'avatar'>]?: boolean;
};

const MagicWandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.565C9.82 5.232 8.328 6.5 6.5 6.5c-1.828 0-3.32-1.268-3.478-2.685A1.875 1.875 0 001.125 6v1.125c0 .916.663 1.699 1.565 1.85C4.268 9.18 5.5 10.672 5.5 12.5c0 1.828-1.268 3.32-2.685 3.478A1.875 1.875 0 001.125 18H2.25c.916 0 1.699-.663 1.85-1.565C4.282 14.968 5.672 13.5 7.5 13.5c1.828 0 3.32 1.268 3.478 2.685A1.875 1.875 0 0012.875 18h1.125c.916 0 1.699-.663 1.85-1.565C15.982 14.82 17.475 13.5 19.25 13.5c1.107 0 2.072-.631 2.592-1.5H19.25a.75.75 0 010-1.5h2.592C21.322 9.631 20.357 9 19.25 9c-1.775 0-3.268-1.32-3.415-2.935A1.875 1.875 0 0014 4.125V3.75A1.875 1.875 0 0012.125 1.875h-1.125a.375.375 0 01-.375.375z" clipRule="evenodd" /></svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .75.75l.04 1.54.996.25a.75.75 0 0 1 .533 1.04l-.26 1.04a.75.75 0 0 1-1.04.534l-1.04-.26a.75.75 0 0 1-.533-1.04L8.46 6.04A.75.75 0 0 1 9 4.5ZM13.5 15a.75.75 0 0 1 .75.75l.04 1.54.996.25a.75.75 0 0 1 .533 1.04l-.26 1.04a.75.75 0 0 1-1.04.534l-1.04-.26a.75.75 0 0 1-.533-1.04L13.46 16.04A.75.75 0 0 1 13.5 15ZM4.5 9.75a.75.75 0 0 1 .75-.75l1.54.04.25.996a.75.75 0 0 1-1.04.534l-1.04-.26a.75.75 0 0 1-.533-1.04L4.5 9.75ZM15.75 13.5a.75.75 0 0 1 .75-.75l1.54.04.25.996a.75.75 0 0 1-1.04.534l-1.04-.26a.75.75 0 0 1-.533-1.04L15.75 13.5ZM12 7.5a.75.75 0 0 1-.75.75A4.5 4.5 0 0 0 6.75 12a.75.75 0 0 1-1.5 0A6 6 0 0 1 11.25 6a.75.75 0 0 1 .75.75Zm.75 9a.75.75 0 0 1-.75.75A6 6 0 0 1 6 11.25a.75.75 0 0 1 0-1.5A4.5 4.5 0 0 0 11.25 15a.75.75 0 0 1 .75.75Zm4.5-9a.75.75 0 0 1-.75.75A4.5 4.5 0 0 0 12.75 12a.75.75 0 0 1-1.5 0A6 6 0 0 1 17.25 6a.75.75 0 0 1 .75.75Z" clipRule="evenodd" />
    </svg>
);


const presetAvatars = [
    `https://api.dicebear.com/8.x/adventurer/svg?seed=Mimi`,
    `https://api.dicebear.com/8.x/adventurer/svg?seed=Leo`,
    `https://api.dicebear.com/8.x/pixel-art/svg?seed=Alex`,
    `https://api.dicebear.com/8.x/bottts/svg?seed=Unit-01`,
];

const DEFAULT_AVATAR = `https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop`;

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartChat, onBack, initialError }) => {
  const { t, language } = useLocalization();
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    gender: 'female',
    avatar: DEFAULT_AVATAR,
    relationship: '',
    backstory: '',
    interests: '',
    openingLine: '',
  });
  const [avatarPrompt, setAvatarPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState<GeneratingState>({});
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [error, setError] = useState<string | null>(initialError);
  const avatarUploadRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleGenderChange = (gender: Gender) => {
    setProfile(prev => ({...prev, gender}));
  };

  const handleGenerate = useCallback(async (field: keyof Omit<ProfileData, 'gender'|'avatar'>) => {
    setIsGenerating(prev => ({ ...prev, [field]: true }));
    setError(null);
    try {
      const content = await generateProfileField(field, profile.gender, language);
      setProfile(prev => ({ ...prev, [field]: content }));
    } catch (err) {
      setError(t('error_generation_failed'));
    } finally {
      setIsGenerating(prev => ({ ...prev, [field]: false }));
    }
  }, [profile.gender, language, t]);

  const handleGenerateAll = useCallback(async () => {
    setIsGeneratingAll(true);
    setError(null);
    
    const fieldsToGenerate: (keyof Omit<ProfileData, 'gender' | 'avatar'>)[] = [ 'name', 'relationship', 'openingLine', 'backstory', 'interests' ];

    const generatingStateUpdate: GeneratingState = {};
    fieldsToGenerate.forEach(field => { generatingStateUpdate[field] = true; });
    setIsGenerating(generatingStateUpdate);

    try {
        const promises = fieldsToGenerate.map(field => generateProfileField(field, profile.gender, language));
        const results = await Promise.all(promises);
        
        const newProfileData = Object.fromEntries(
            fieldsToGenerate.map((field, index) => [field, results[index]])
        );
        
        setProfile(prev => ({
            ...prev,
            ...newProfileData,
        }));
    } catch (err) {
        setError(t('error_generation_failed'));
    } finally {
        setIsGenerating({});
        setIsGeneratingAll(false);
    }
  }, [profile.gender, language, t]);
  
  const handleGenerateAvatar = async () => {
    if (!avatarPrompt.trim()) {
        setError(t('error_avatar_prompt_required'));
        return;
    }
    setIsGeneratingAvatar(true);
    setError(null);
    try {
        const imageData = await generateImageFromPrompt(avatarPrompt);
        setProfile(prev => ({...prev, avatar: imageData}));
    } catch (err) {
        if (err instanceof Error) setError(t('error_avatar_generation_failed'));
        else setError('An unknown error occurred');
    } finally {
        setIsGeneratingAvatar(false);
    }
  };
  
  const handleAvatarClick = () => {
    avatarUploadRef.current?.click();
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        setError(t('error_invalid_image_file'));
        e.target.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        if (typeof reader.result === 'string') {
            setProfile(prev => ({...prev, avatar: reader.result as string}));
            setError(null);
        }
    };
    reader.onerror = () => {
        setError(t('error_image_read_failed'));
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.entries(profile).some(([key, value]) => key !== 'avatar' && typeof value === 'string' && !value.trim())) {
      setError(t('error_all_fields_required'));
      return;
    }
    onStartChat(profile);
  };

  const formFields: { key: keyof Omit<ProfileData, 'gender'|'avatar'>; labelKey: string; placeholderKey: string; isTextarea: boolean }[] = [
    { key: 'name', labelKey: 'character_name', placeholderKey: 'character_name_placeholder', isTextarea: false },
    { key: 'relationship', labelKey: 'relationship', placeholderKey: 'relationship_placeholder', isTextarea: false },
    { key: 'openingLine', labelKey: 'opening_line', placeholderKey: 'opening_line_placeholder', isTextarea: true },
    { key: 'backstory', labelKey: 'backstory', placeholderKey: 'backstory_placeholder', isTextarea: true },
    { key: 'interests', labelKey: 'interests', placeholderKey: 'interests_placeholder', isTextarea: true },
  ];

  const genderOptions: { key: Gender; labelKey: string }[] = [
      { key: 'female', labelKey: 'gender_female' },
      { key: 'male', labelKey: 'gender_male' },
      { key: 'neutral', labelKey: 'gender_neutral' },
      { key: 'none', labelKey: 'gender_none' },
  ]

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white">{t('setup_title')}</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{t('setup_subtitle')}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 relative grid grid-cols-1 md:grid-cols-2 gap-8">
                <button type="button" onClick={handleGenerateAll} disabled={isGeneratingAll || isGeneratingAvatar} className="absolute top-6 right-6 flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-pink-500 rounded-full shadow-md hover:bg-pink-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105" aria-label={t('generate_all')}>
                  {isGeneratingAll ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <SparklesIcon className="w-5 h-5"/>}
                  <span>{t('generate_all')}</span>
                </button>
                {/* Left Side: Avatar & Core Info */}
                <div className="space-y-6">
                    {/* Avatar Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('avatar')}</label>
                        <div className="flex flex-col items-center gap-4">
                            <button type="button" onClick={handleAvatarClick} className="relative group rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 dark:focus:ring-offset-gray-800">
                                <img src={profile.avatar} alt="Avatar Preview" className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700 transition-opacity group-hover:opacity-70"/>
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-sm font-semibold">{t('avatar_cta').split(',')[0]}</span>
                                </div>
                            </button>
                             <input type="file" ref={avatarUploadRef} onChange={handleAvatarUpload} className="hidden" accept="image/*" />
                            <div className="w-full space-y-2">
                                <p className="text-xs text-center text-gray-500 dark:text-gray-400">{t('avatar_cta')}</p>
                                <div className="relative">
                                    <input type="text" value={avatarPrompt} onChange={(e) => setAvatarPrompt(e.target.value)} placeholder={t('avatar_prompt_placeholder')} className="w-full pl-4 pr-24 py-2 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-pink-500 focus:border-pink-500"/>
                                    <button type="button" onClick={handleGenerateAvatar} disabled={isGeneratingAvatar || isGeneratingAll} className="absolute inset-y-0 right-0 flex items-center justify-center px-4 text-white bg-pink-500 hover:bg-pink-600 rounded-full text-sm font-semibold disabled:bg-gray-400 disabled:cursor-wait">
                                       {isGeneratingAvatar ? `${t('generate')}...` : t('generate')}
                                    </button>
                                </div>
                                <div className="flex justify-center gap-2 pt-2">
                                    {presetAvatars.map(avatarUrl => (
                                        <button type="button" key={avatarUrl} onClick={() => setProfile(p => ({...p, avatar: avatarUrl}))} className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 dark:focus:ring-offset-gray-800">
                                            <img src={avatarUrl} alt="Preset Avatar" className="w-12 h-12 rounded-full object-cover border-2 border-transparent hover:border-pink-400"/>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gender Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('gender')}</label>
                        <div className="grid grid-cols-4 gap-2">
                            {genderOptions.map(({key, labelKey}) => (
                                <button type="button" key={key} onClick={() => handleGenderChange(key)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${profile.gender === key ? 'bg-pink-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                                    {t(labelKey)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Name */}
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('character_name')}</label>
                        <div className="relative">
                            <input type="text" id="name" name="name" value={profile.name} onChange={handleInputChange} placeholder={t('character_name_placeholder')} className="w-full pl-4 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
                            <button type="button" onClick={() => handleGenerate('name')} disabled={isGenerating['name'] || isGeneratingAll} className="absolute inset-y-0 right-0 flex items-center pr-3 text-pink-500 hover:text-pink-700 disabled:text-gray-400 disabled:cursor-wait" aria-label={t('generate_content_for', {label: t('character_name')})}>
                                {isGenerating['name'] ? <div className="w-5 h-5 border-2 border-pink-400 border-t-transparent rounded-full animate-spin"></div> : <MagicWandIcon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Details */}
                <div className="space-y-6">
                  {formFields.filter(f => f.key !== 'name').map(({ key, labelKey, placeholderKey, isTextarea }) => (
                    <div key={key}>
                      <label htmlFor={key} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t(labelKey)}</label>
                      <div className="relative">
                        {isTextarea ? (
                           <textarea id={key} name={key} value={profile[key as keyof ProfileData] as string} onChange={handleInputChange} placeholder={t(placeholderKey)} rows={key === 'openingLine' ? 2 : 4} className="w-full pl-4 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 resize-none"/>
                        ) : (
                          <input type="text" id={key} name={key} value={profile[key as keyof ProfileData] as string} onChange={handleInputChange} placeholder={t(placeholderKey)} className="w-full pl-4 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"/>
                        )}
                        <button type="button" onClick={() => handleGenerate(key as keyof Omit<ProfileData, 'gender' | 'avatar'>)} disabled={isGenerating[key as keyof typeof isGenerating] || isGeneratingAll} className="absolute top-2.5 right-0 flex items-center pr-3 text-pink-500 hover:text-pink-700 disabled:text-gray-400 disabled:cursor-wait" aria-label={t('generate_content_for', {label: t(labelKey)})}>
                            {isGenerating[key as keyof typeof isGenerating] ? <div className="w-5 h-5 border-2 border-pink-400 border-t-transparent rounded-full animate-spin"></div> : <MagicWandIcon className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="md:col-span-2">
                    {error && <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-md mb-6" role="alert"><p>{error}</p></div>}
                    <div className="flex flex-col sm:flex-row gap-4">
                         <button type="button" onClick={onBack} className="w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-500 rounded-full shadow-sm text-lg font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-offset-gray-800">
                            {t('back')}
                          </button>
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-medium text-white bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 dark:focus:ring-offset-gray-800 transition-transform transform hover:scale-105">
                            {t('start_chat')}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
};

export default SetupScreen;
