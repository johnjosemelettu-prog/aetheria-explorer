import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RadioReceiver, AlertTriangle, Clock, MapPin, Ticket, ShieldAlert } from 'lucide-react';
import * as AI from '../services/gemini';

const EphemeralDrops = () => {
  const [listening, setListening] = useState(true);
  const [dropData, setDropData] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Poll for a mock drop
  useEffect(() => {
    if (!listening || dropData) return;
    
    // Auto trigger drop after 3 seconds for demonstration
    const timer = setTimeout(async () => {
      try {
        const drop = await AI.triggerEphemeralDrop();
        setDropData(drop);
        setTimeLeft(drop.expiresInSeconds);
        setListening(false);
      } catch (err) {
        console.error(err);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [listening, dropData]);

  // Countdown timer
  useEffect(() => {
    if (!dropData || timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [dropData, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleClaim = () => {
    alert("Drop Claimed! Coordinates locked into routing.");
    setDropData(null);
    setListening(true);
  };

  return (
    <div className="min-h-screen bg-black text-rose-50 p-8 flex flex-col items-center justify-center relative overflow-hidden rounded-lg">
      
      {/* Dynamic Background Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} />

      <div className="z-10 w-full max-w-2xl text-center">
        {!dropData ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="mx-auto w-24 h-24 border-2 border-dashed border-rose-500/50 rounded-full flex items-center justify-center">
              <RadioReceiver className="w-8 h-8 text-rose-500" />
            </motion.div>
            <h1 className="text-3xl font-mono uppercase tracking-[0.2em] text-rose-500 ml-4">Listening to Anomalies...</h1>
            <p className="text-rose-200/50 font-mono text-sm">Keep app open. Drop could happen at any second.</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {timeLeft > 0 ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}>
                <div className="bg-rose-600 text-black px-6 py-2 rounded-full font-black uppercase text-xl inline-flex items-center mb-10 shadow-[0_0_50px_rgba(225,29,72,0.8)] animate-pulse">
                  <AlertTriangle className="w-6 h-6 mr-3" /> Anomalous Drop Detected
                </div>
                
                <div className="bg-zinc-900 border border-rose-600 rounded-3xl p-8 relative overflow-hidden text-left shadow-2xl">
                  {/* Warning Striping */}
                  <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundImage: "repeating-linear-gradient(45deg, #e11d48, #e11d48 10px, transparent 10px, transparent 20px)" }} />
                  
                  <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-6">
                    <div>
                      <p className="text-xs font-bold uppercase text-rose-500 tracking-widest mb-1">{dropData.dropId}</p>
                      <h2 className="text-3xl font-black text-white">{dropData.title}</h2>
                    </div>
                    <div className="bg-black border border-rose-500/50 px-4 py-2 rounded-xl text-center">
                      <p className="text-[10px] uppercase font-bold text-rose-500 mb-1">Evaporates In</p>
                      <p className={`text-3xl font-mono font-bold ${timeLeft < 30 ? 'text-red-500 animate-bounce' : 'text-rose-100'}`}>
                        {formatTime(timeLeft)}
                      </p>
                    </div>
                  </div>

                  <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                    {dropData.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-black/40 rounded-xl flex items-center">
                      <Ticket className="w-6 h-6 text-rose-400 mr-3 shrink-0" />
                      <p className="text-sm font-bold text-rose-100 uppercase">{dropData.reward}</p>
                    </div>
                    <div className="p-4 bg-black/40 rounded-xl flex items-center">
                      <MapPin className="w-6 h-6 text-rose-400 mr-3 shrink-0" />
                      <p className="text-sm font-bold font-mono text-zinc-400">{dropData.coordinates}</p>
                    </div>
                  </div>

                  <Button onClick={handleClaim} className="w-full py-8 text-2xl font-black uppercase tracking-widest bg-rose-600 hover:bg-rose-500 text-white rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]">
                    Claim & Sprint
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20">
                <ShieldAlert className="w-20 h-20 text-zinc-600 mx-auto mb-6" />
                <h2 className="text-4xl font-black text-zinc-500 uppercase tracking-widest mb-4">Signal Lost</h2>
                <p className="text-zinc-400 mb-8">The anomaly has evaporated. You were too slow.</p>
                <Button onClick={() => { setDropData(null); setListening(true); }} variant="outline" className="border-rose-500 text-rose-500 hover:bg-rose-950">
                  Resync Frequencies
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default EphemeralDrops;
