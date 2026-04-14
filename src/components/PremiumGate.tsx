import React from 'react';
import { usePremiumStatus } from '../hooks/usePremiumStatus';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Shield, ArrowRight } from 'lucide-react';

interface PremiumGateProps {
  children: React.ReactNode;
  featureName?: string;
  isBookingSpecific?: boolean;
}

export default function PremiumGate({ children, featureName = "This feature", isBookingSpecific = false }: PremiumGateProps) {
  const { isPremium, loading } = usePremiumStatus();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-900 w-full h-full">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Crown className="w-8 h-8 text-indigo-500/50" />
          <p className="text-sm font-mono text-slate-400">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-6 bg-slate-900 text-white selection:bg-indigo-500/30">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full bg-slate-800 border border-slate-700/50 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600" />
        <div className="w-16 h-16 bg-gradient-to-br from-amber-400/20 to-yellow-600/20 flex items-center justify-center rounded-2xl mb-6 border border-amber-500/20">
          <Crown className="w-8 h-8 text-amber-400" />
        </div>
        
        <h2 className="text-2xl font-black mb-3">{featureName} Requires Aetheria+</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Unlock our generative AI capabilities, augmented reality tools, and dynamic booking insights.
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex gap-3 items-center text-sm font-medium">
            <Sparkles className="w-5 h-5 text-amber-500 shrink-0" /> Generative AI Travel Agents
          </div>
          <div className="flex gap-3 items-center text-sm font-medium">
            <Shield className="w-5 h-5 text-amber-500 shrink-0" /> Premium Insurance & Support
          </div>
          <div className="flex gap-3 items-center text-sm font-medium">
            <Crown className="w-5 h-5 text-amber-500 shrink-0" /> Zero Convenience Fees
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 font-bold text-slate-900 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
            Upgrade to Aetheria+ <ArrowRight className="w-4 h-4" />
          </button>
          
          {isBookingSpecific && (
            <button className="w-full py-4 rounded-xl bg-slate-700 hover:bg-slate-600 font-bold text-white transition-all border border-slate-600">
              Buy Premium Pass for this Booking
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
