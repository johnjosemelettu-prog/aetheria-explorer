import React from 'react';
import { useTranslation } from 'react-i18next';
import { Crown } from 'lucide-react';
import { usePremiumStatus } from '../hooks/usePremiumStatus';

export default function SubscriptionManager() {
  const { t } = useTranslation();
  const isPremium = usePremiumStatus();

  if (isPremium) return null;

  return (
    <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center text-center">
      <Crown className="w-8 h-8 text-primary mb-2" />
      <h3 className="font-bold text-primary mb-1">Upgrade to Premium</h3>
      <p className="text-xs text-foreground/60 mb-3">Unlock all AI synthesis engines and premium features.</p>
      <button 
        onClick={() => {
          window.history.pushState({}, '', '/premium');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
        className="w-full py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-colors"
      >
        View Plans
      </button>
    </div>
  );
}
