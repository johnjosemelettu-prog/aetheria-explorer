import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AIPhotoEditor } from './AIPhotoEditor';
import { MemeGenerator } from './MemeGenerator';
import { VibeRecommender } from './VibeRecommender';
import { cn } from '../lib/utils';

type ActiveTab = 'photo' | 'meme' | 'vibe';

export const AIGenerator = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<ActiveTab>('photo');

  const tabs: { id: ActiveTab; label: string }[] = [
    { id: 'photo', label: 'AI Photo Editor' },
    { id: 'meme', label: 'Meme Generator' },
    { id: 'vibe', label: 'Vibe Recommender' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'photo':
        return <AIPhotoEditor />;
      case 'meme':
        return <MemeGenerator />;
      case 'vibe':
        return <VibeRecommender />;
      default:
        return null;
    }
  };

  return (
    <div className="glass p-6 rounded-3xl">
      <div className="flex mb-4 border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 text-sm font-bold transition-colors',
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-foreground/50 hover:text-foreground'
            )}
          >
            {t(tab.label)}
          </button>
        ))}
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};
