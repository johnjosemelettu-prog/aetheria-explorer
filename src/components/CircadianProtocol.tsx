import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Moon, Sun, Coffee, Loader2, ThermometerSnowflake, Plane, BrainCircuit } from 'lucide-react';
import * as AI from '../services/gemini';

const CircadianProtocol = () => {
  const [loading, setLoading] = useState(false);
  const [protocol, setProtocol] = useState<any>(null);

  const generateProtocol = async () => {
    setLoading(true);
    try {
      const result = await AI.generateCircadianProtocol({ flight: "JFK to NRT", duration: "14h" });
      setProtocol(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Diet': return <Coffee className="w-6 h-6 text-orange-400" />;
      case 'Environment': return <Moon className="w-6 h-6 text-indigo-400" />;
      case 'Biological': return <Sun className="w-6 h-6 text-yellow-400" />;
      default: return <BrainCircuit className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-8 rounded-lg overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-slate-800 rounded-full mb-6 border border-slate-700 shadow-xl">
            <ThermometerSnowflake className="w-10 h-10 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-extrabold mb-4 text-white">Nomadic Circadian Protocol</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Eradicate jetlag completely. The AI bio-engine controls your light exposure, diet, and automatically syncs with your smart hotel integrations to override your biological clock safely.
          </p>
        </div>

        {!protocol ? (
          <Card className="bg-slate-800/50 border-slate-700 p-10 text-center">
            <Plane className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Flight: JFK to NRT Detected</h2>
            <p className="text-slate-400 mb-8">Timezone delta: +13 hours. Extreme jetlag risk determined.</p>
            <Button 
              onClick={generateProtocol} 
              disabled={loading}
              className="py-6 px-8 text-lg font-bold bg-cyan-600 hover:bg-cyan-500 text-white rounded-full shadow-[0_0_30px_rgba(8,145,178,0.3)]"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Compute Biological Override Protocol"}
            </Button>
          </Card>
        ) : (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              
              <div className="flex justify-between items-center bg-cyan-950/30 p-4 rounded-xl border border-cyan-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-mono text-cyan-400 font-bold tracking-widest">{protocol.protocolId} {protocol.status}</span>
                </div>
                <Button variant="outline" className="border-cyan-800 text-cyan-300 hover:bg-cyan-900 hover:text-cyan-100" onClick={() => setProtocol(null)}>
                  Abort Protocol
                </Button>
              </div>

              <div className="grid gap-4">
                {protocol.instructions.map((inst: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.15 }}
                  >
                    <Card className="bg-slate-800/80 border-slate-700 overflow-hidden">
                      <div className="flex items-stretch">
                        <div className="bg-slate-900/50 p-6 flex flex-col justify-center items-center font-mono border-r border-slate-700 min-w-[120px]">
                          <span className="text-slate-500 text-xs uppercase mb-1">Time</span>
                          <span className="text-lg font-bold text-white">{inst.time}</span>
                        </div>
                        <div className="p-6 flex-1 flex items-center gap-6">
                          <div className="p-3 bg-slate-900 rounded-full border border-slate-700">
                            {getIconForType(inst.type)}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">{inst.type}</span>
                            <p className="text-lg text-slate-200">{inst.action}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                <Card className="bg-indigo-950/30 border-indigo-900/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 bg-indigo-500/20 text-indigo-300 text-xs font-black uppercase tracking-widest rounded-bl-xl border-b border-l border-indigo-500/20">
                    Smart Hotel Link
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      <Moon className="w-5 h-5 text-indigo-400" />
                      Environment Sync Active
                    </h3>
                    <p className="text-indigo-200 leading-relaxed font-medium">
                      {protocol.smartHotelSync.details}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default CircadianProtocol;
