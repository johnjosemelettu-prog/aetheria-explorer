import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BatteryWarning, Loader2, BedDouble, ShieldCheck, Music, Utensils, MapPin } from 'lucide-react';
import * as AI from '../services/gemini';

const LowBatteryProtocol = () => {
  const [loading, setLoading] = useState(false);
  const [protocol, setProtocol] = useState<any>(null);

  const activateProtocol = async () => {
    setLoading(true);
    try {
      const data = await AI.triggerLowBatteryProtocol();
      setProtocol(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Delivery': return <Utensils className="w-5 h-5 text-amber-500" />;
      case 'Audio': return <Music className="w-5 h-5 text-blue-500" />;
      case 'Location': return <MapPin className="w-5 h-5 text-emerald-500" />;
      default: return <BedDouble className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-8 flex flex-col items-center rounded-lg">
      <div className="w-full max-w-3xl">
        
        <div className="text-center mb-12">
          <div className="inline-flex justify-center items-center p-4 bg-slate-900 border border-slate-700 rounded-full mb-6">
            <BatteryWarning className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-4xl font-extrabold mb-4 text-white hover:text-red-400 transition-colors">"Rotting in Bed" Override</h1>
          <p className="text-slate-500 text-lg">
            Burnout detected. Force-canceling all high-energy itineraries. Activating Low-Battery Protocol for maximum recovery and zero guilt.
          </p>
        </div>

        {!protocol ? (
          <div className="flex justify-center">
            <Button 
              onClick={activateProtocol} 
              disabled={loading}
              className="py-8 px-12 text-lg font-bold uppercase tracking-widest bg-red-950 hover:bg-red-900 border border-red-800 text-red-400 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.2)]"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : <ShieldCheck className="w-6 h-6 mr-3" />}
              {loading ? "Canceling Plans..." : "Initiate Low-Battery Mode"}
            </Button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
              
              <div className="bg-slate-900 border border-red-900/50 p-6 rounded-2xl">
                <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4 border-b border-red-900/30 pb-2">Actions Automatically Taken</h3>
                <ul className="space-y-3">
                  {protocol.actionsTaken.map((action: string, i: number) => (
                    <li key={i} className="flex items-center text-slate-400 font-mono text-sm before:content-['✓'] before:mr-3 before:text-emerald-500">
                      <del className="opacity-70">{action}</del>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 pl-2">Zero-Effort Recovery Suggestions</h3>
                
                <div className="grid gap-4">
                  {protocol.lowEffortSuggestions.map((sug: any, i: number) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}>
                      <Card className="bg-slate-900/50 border-slate-800 hover:bg-slate-900 transition-colors cursor-pointer relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-800" />
                        <CardContent className="p-5 flex items-start gap-4 ml-2">
                          <div className="p-3 bg-black rounded-lg border border-slate-800">
                            {getIcon(sug.type)}
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-lg">{sug.title}</h4>
                            <p className="text-slate-500 text-sm mt-1">{sug.detail}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default LowBatteryProtocol;
