import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, TrendingDown, Globe, Wind, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function CarbonSynthesis({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isOffsetting, setIsOffsetting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleOffset = async () => {
    setIsOffsetting(true);
    // Simulate carbon offset synthesis
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsOffsetting(false);
    setIsCompleted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-background/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-2xl glass rounded-[40px] p-10 border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Background Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/20 blur-[100px] rounded-full" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                <Leaf className="text-green-400 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold tracking-tighter">Carbon Synthesis</h2>
                <p className="text-sm text-foreground/50">Real-time footprint calculation & neutralization.</p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 glass glass-hover rounded-2xl">
              <X className="w-6 h-6 text-foreground/50" />
            </button>
          </div>

          {!isCompleted ? (
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="glass p-6 rounded-3xl border-green-500/10">
                  <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2 block">Total Footprint</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display font-bold text-green-400">1,240</span>
                    <span className="text-sm font-bold text-foreground/30 uppercase">kg CO2</span>
                  </div>
                </div>
                <div className="glass p-6 rounded-3xl border-primary/10">
                  <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2 block">Global Rank</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display font-bold text-primary">Top 5%</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-green-400" />
                  Synthesis Recommendations
                </h3>
                <div className="space-y-3">
                  {[
                    "Switch to SAF (Sustainable Aviation Fuel) for your Tokyo flight.",
                    "Neutralize 450kg CO2 via Amazon Reforestation Synthesis.",
                    "Optimize local transport via Aetheria EV Network."
                  ].map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-foreground/60">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 shrink-0" />
                      {rec}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleOffset}
                disabled={isOffsetting}
                className="w-full py-5 bg-green-500 text-background rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isOffsetting ? (
                  <>
                    <Wind className="w-6 h-6 animate-spin" />
                    Synthesizing Offset...
                  </>
                ) : (
                  <>
                    <Globe className="w-6 h-6" />
                    Neutralize Footprint
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-3xl font-display font-bold mb-4">Synthesis Complete</h3>
              <p className="text-foreground/60 max-w-md mx-auto mb-10 leading-relaxed">
                Your travel footprint has been successfully neutralized. 
                Aetheria has allocated your synthesis to the **Global Reforestation Protocol**.
              </p>
              <button
                onClick={onClose}
                className="px-10 py-4 glass glass-hover rounded-2xl font-bold"
              >
                Return to Dashboard
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
