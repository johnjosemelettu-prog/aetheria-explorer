import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tornado, Loader2, ShieldAlert, Sparkles, MapPin } from 'lucide-react';
import * as AI from '../services/gemini';

const ChaosDial = () => {
  const [chaosLevel, setChaosLevel] = useState(50);
  const [budget, setBudget] = useState(500);
  const [chaosResult, setChaosResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const unleashChaos = async () => {
    setLoading(true);
    setChaosResult(null);
    try {
      const result = await AI.executeChaosDial(chaosLevel, budget);
      setChaosResult(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const getChaosColor = () => {
    if (chaosLevel < 50) return "text-blue-400";
    if (chaosLevel < 90) return "text-orange-400";
    return "text-red-500";
  };

  const getChaosBg = () => {
    if (chaosLevel < 50) return "bg-blue-500/20";
    if (chaosLevel < 90) return "bg-orange-500/20";
    return "bg-red-500/20";
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white p-8 rounded-lg overflow-hidden relative">
      <div className={`absolute inset-0 opacity-20 pointer-events-none transition-colors duration-1000 ${getChaosBg()}`} />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-stone-900 border border-stone-800 rounded-full mb-6">
            <Tornado className={`w-10 h-10 ${getChaosColor()} animate-pulse`} />
          </div>
          <h1 className="text-5xl font-black mb-4">The Chaos Dial</h1>
          <p className="text-stone-400 text-lg max-w-xl mx-auto">
            Give the AI permission to book highly-discounted, anomalous travel events using your budget. At maximum chaos, you won't know where you're going until you reach the airport.
          </p>
        </div>

        <Card className="bg-stone-900/80 border-stone-800 backdrop-blur-xl mb-12 py-8 px-6">
          <div className="space-y-10">
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-bold uppercase tracking-widest text-stone-400">Chaos Intensity</label>
                <span className={`text-4xl font-black ${getChaosColor()}`}>{chaosLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={chaosLevel}
                onChange={(e) => setChaosLevel(parseInt(e.target.value))}
                className="w-full h-3 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-stone-300"
              />
              <div className="flex justify-between text-xs text-stone-500 mt-2 font-bold uppercase">
                <span>Mild Serendipity</span>
                <span>Absolute Anomaly</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">Max Budget Authorization (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 font-bold">$</span>
                <Input 
                  type="number" 
                  value={budget} 
                  onChange={(e) => setBudget(parseInt(e.target.value) || 0)}
                  className="bg-stone-950 border-stone-800 text-2xl py-6 pl-10 text-white font-mono"
                />
              </div>
            </div>

            <Button 
              onClick={unleashChaos} 
              disabled={loading || budget <= 0}
              className={`w-full py-8 text-xl font-bold uppercase tracking-widest transition-all duration-300 ${
                chaosLevel > 89 
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-[0_0_40px_rgba(220,38,38,0.4)]' 
                  : 'bg-stone-100 text-stone-950 hover:bg-stone-300'
              }`}
            >
              {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : 'Unleash Protocol'}
            </Button>
          </div>
        </Card>

        <AnimatePresence>
          {chaosResult && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-8"
            >
              <Card className={`border overflow-hidden ${
                chaosLevel > 89 ? 'bg-red-950/40 border-red-900/50' : 'bg-stone-900/80 border-stone-800'
              }`}>
                <div className={`p-4 text-center font-bold uppercase tracking-[0.3em] text-xs ${
                  chaosLevel > 89 ? 'bg-red-900/50 text-red-200' : 'bg-stone-800 text-stone-300'
                }`}>
                  Action Executed Successfully
                </div>
                <CardContent className="p-8 space-y-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-stone-500 font-bold uppercase mb-1">Status Code</p>
                      <h3 className={`text-2xl font-black ${getChaosColor()}`}>{chaosResult.status}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-stone-500 font-bold uppercase mb-1">Funds Used</p>
                      <p className="text-2xl font-mono text-white">{chaosResult.cost}</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-black/40 border border-white/5 space-y-4">
                    <div className="flex gap-4">
                      <Sparkles className="w-6 h-6 text-yellow-500 shrink-0" />
                      <p className="text-lg text-stone-200">{chaosResult.action}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-stone-950/50 border border-stone-800">
                      <div className="flex items-center gap-2 mb-2 text-stone-400">
                        <MapPin className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase">Destination</span>
                      </div>
                      <p className="font-bold text-white tracking-wide">{chaosResult.destination}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-stone-950/50 border border-stone-800">
                      <div className="flex items-center gap-2 mb-2 text-stone-400">
                        <ShieldAlert className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase">Instructions</span>
                      </div>
                      <p className="font-bold text-white tracking-wide">{chaosResult.instructions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChaosDial;
