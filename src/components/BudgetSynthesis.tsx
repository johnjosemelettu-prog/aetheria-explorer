import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PieChart, DollarSign, Loader2, Sparkles } from 'lucide-react';

export default function BudgetSynthesis() {
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [destination, setDestination] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSynthesize = async () => {
    setIsSynthesizing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResult({
      accommodation: Number(budget) * 0.4,
      food: Number(budget) * 0.25,
      transport: Number(budget) * 0.15,
      activities: Number(budget) * 0.15,
      misc: Number(budget) * 0.05,
    });
    setIsSynthesizing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
            <PieChart className="text-primary w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold">Budget Synthesis</h1>
            <p className="text-foreground/50">AI-powered financial planning for your journey.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass p-8 rounded-3xl">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-foreground/70 mb-2">Total Budget ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                  <input 
                    type="number" 
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Enter amount..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground/70 mb-2">Destination</label>
                <input 
                  type="text" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g., Tokyo, Japan"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground/70 mb-2">Duration (Days)</label>
                <input 
                  type="number" 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 7"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <button
                onClick={handleSynthesize}
                disabled={!budget || !destination || !duration || isSynthesizing}
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
              >
                {isSynthesizing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                Synthesize Budget
              </button>
            </div>
          </div>

          {result && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass p-8 rounded-3xl"
            >
              <h2 className="text-2xl font-bold mb-6">Suggested Allocation</h2>
              <div className="space-y-4">
                {[
                  { label: 'Accommodation', amount: result.accommodation, color: 'bg-primary' },
                  { label: 'Food & Dining', amount: result.food, color: 'bg-secondary' },
                  { label: 'Transportation', amount: result.transport, color: 'bg-accent' },
                  { label: 'Activities', amount: result.activities, color: 'bg-green-500' },
                  { label: 'Miscellaneous', amount: result.misc, color: 'bg-blue-500' }
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span>{item.label}</span>
                      <span>${item.amount.toFixed(2)}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color}`} 
                        style={{ width: `${(item.amount / Number(budget)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
