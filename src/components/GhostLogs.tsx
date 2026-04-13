import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Ghost, Headphones, MapPin, Play, Search, RadioTower } from 'lucide-react';
import * as AI from '../services/gemini';

const GhostLogs = () => {
  const [scanning, setScanning] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const [activeLog, setActiveLog] = useState<string | null>(null);

  const scanForLogs = async () => {
    setScanning(true);
    setLogs([]);
    setActiveLog(null);
    try {
      const results = await AI.fetchGhostLogs("Local Park Bench");
      setLogs(results);
    } catch (err) {
      console.error(err);
    }
    setScanning(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 flex flex-col items-center relative overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      
      <div className="z-10 w-full max-w-3xl">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <motion.div animate={{ scale: scanning ? [1, 1.5, 1] : 1, opacity: scanning ? [0.5, 0, 0.5] : 0 }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-indigo-500 rounded-full" />
            <div className="relative bg-slate-900 border border-indigo-500/30 p-5 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.2)]">
              <Ghost className={`w-10 h-10 ${scanning ? 'text-indigo-400 animate-pulse' : 'text-slate-400'}`} />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold mb-4 text-white">Ghost Logs (Context Drops)</h1>
          <p className="text-slate-400 text-lg">
            Discover ephemeral 3D binaural stories, scents, and memories anchored to physical coordinates left by past explorers.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <Button 
            onClick={scanForLogs}
            disabled={scanning}
            className="rounded-full px-8 py-6 text-lg bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-900/50 font-bold text-white border-0"
          >
            {scanning ? (
              <><RadioTower className="w-5 h-5 mr-3 animate-ping" /> Scanning Local Frequencies...</>
            ) : (
              <><Search className="w-5 h-5 mr-3" /> Ping Environment for Ghosts</>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {logs.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-indigo-300 font-semibold tracking-[0.2em] uppercase text-sm mb-6 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Detected Spatial Anomalies ({logs.length})
              </h3>
              
              <div className="grid gap-6">
                {logs.map((log: any, i: number) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className={`overflow-hidden transition-colors border ${activeLog === log.id ? 'bg-indigo-900/40 border-indigo-500/50' : 'bg-slate-900/50 border-slate-800'}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-4 rounded-full ${activeLog === log.id ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-indigo-400'}`}>
                            {log.icon === "headphones" ? <Headphones className="w-6 h-6" /> : <Ghost className="w-6 h-6" />}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="text-lg font-bold text-white">{log.author}'s Echo</h4>
                                <p className="text-xs text-slate-500 tracking-wider">Deposited {log.timestamp}</p>
                              </div>
                              <span className="text-xs font-mono px-2 py-1 bg-slate-950 text-slate-400 rounded-md">
                                D-{log.triggerRadius}
                              </span>
                            </div>
                            
                            <p className="text-slate-300 leading-relaxed italic mb-4">
                              "{log.prompt}"
                            </p>
                            
                            {activeLog === log.id ? (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-indigo-500/20">
                                <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5">
                                  <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-sm font-mono text-indigo-300">Synchronizing {log.type}...</span>
                                  </div>
                                  <div className="flex gap-1 h-4">
                                    {[1,2,3,4,5].map(bar => (
                                      <motion.div 
                                        key={bar} 
                                        animate={{ height: ["20%", "100%", "20%"] }} 
                                        transition={{ duration: Math.random() * 0.5 + 0.5, repeat: Infinity }} 
                                        className="w-1 bg-indigo-500 rounded-full" 
                                      />
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            ) : (
                              <Button 
                                onClick={() => setActiveLog(log.id)}
                                variant="outline" 
                                className="w-full border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 flex items-center gap-2"
                              >
                                <Play className="w-4 h-4 fill-current" /> Experience Drop
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GhostLogs;
