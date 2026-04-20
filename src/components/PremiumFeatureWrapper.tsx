import React from 'react';
import { usePremiumStatus } from '../hooks/usePremiumStatus';
import { Crown, Sparkles, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface PremiumFeatureWrapperProps {
  children: React.ReactNode;
}

export const PremiumFeatureWrapper: React.FC<PremiumFeatureWrapperProps> = ({ children }) => {
  const { isPremium, loading } = usePremiumStatus();

  if (loading) {
    return (
      <div className="p-4 my-4 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl">
        <Crown className="w-5 h-5 text-indigo-500/50 animate-pulse" />
      </div>
    );
  }

  if (!isPremium) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 my-4 w-full bg-slate-900 border border-indigo-500/30 rounded-[24px] relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-amber-500/20 transition-colors" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 shrink-0 bg-slate-800 border border-slate-700/50 flex items-center justify-center rounded-xl shadow-inner">
             <Lock className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Aetheria+ Exclusive <Crown className="w-4 h-4 text-amber-500" />
            </h2>
            <p className="text-sm text-slate-400 mt-1">Unlock this feature by upgrading your account or purchasing a session pass.</p>
          </div>
          <button className="shrink-0 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-full transition-colors hidden sm:block">
             Upgrade
          </button>
        </div>
      </motion.div>
    );
  }

  return <>{children}</>;
};
