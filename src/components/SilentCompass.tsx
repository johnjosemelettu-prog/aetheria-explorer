import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PowerOff, ShieldCheck, Loader2 } from 'lucide-react';
import * as AI from '../services/gemini';

const SilentCompass = () => {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);

  const startDetox = async () => {
    setLoading(true);
    try {
      const data = await AI.startDigitalDetoxTracker(4);
      setSession(data);
      setActive(true);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const endDetox = () => {
    setActive(false);
    setSession(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 flex flex-col items-center justify-center p-8 relative overflow-hidden rounded-lg">
      <AnimatePresence>
        {!active ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="max-w-xl text-center z-10 w-full">
            <div className="inline-flex p-5 bg-zinc-900 border border-zinc-800 shadow-2xl rounded-full mb-8">
              <PowerOff className="w-12 h-12 text-zinc-400" />
            </div>
            <h1 className="text-5xl font-black text-white mb-6 tracking-tight">Silent Compass</h1>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed font-light">
              Initiate a Digital Detox. Aetheria will lock down all non-essential UI, block notifications, and provide only a minimalist directional needle. Drift towards serene, scenic environments without maps, ETAs, or distractions.
            </p>
            
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 mb-10 text-left">
              <h3 className="text-zinc-100 font-bold mb-4 flex items-center text-sm uppercase tracking-widest"><ShieldCheck className="w-4 h-4 mr-2 text-indigo-400" /> Detox Parameters</h3>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li>• Estimated Duration: <strong className="text-zinc-300">4 Hours</strong></li>
                <li>• Objective: <strong className="text-zinc-300">Serendipitous Drift</strong></li>
                <li>• Block Level: <strong className="text-zinc-300">Maximum (Emergency Comms Only)</strong></li>
              </ul>
            </div>

            <Button 
              onClick={startDetox} 
              disabled={loading}
              className="w-full py-8 text-xl font-light tracking-widest bg-zinc-100 text-zinc-900 hover:bg-zinc-300 rounded-full"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Initiate Disconnect"}
            </Button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50">
            <div className="absolute top-12 text-center">
              <p className="text-zinc-600 font-mono text-sm tracking-[0.3em] uppercase mb-2">Detox Protocol Active</p>
              <p className="text-zinc-400 text-xs">Environment: {session.guidance.targetAesthetic}</p>
            </div>

            <div className="relative w-64 h-64 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-zinc-800/50 border-t-zinc-600"
              />
              <motion.div 
                animate={{ rotate: -45 }} 
                transition={{ type: "spring", stiffness: 30, damping: 10 }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                <div className="h-48 w-1 bg-gradient-to-b from-white via-zinc-500 to-transparent rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] flex flex-col items-center">
                   <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[12px] border-b-white -mt-2" />
                </div>
              </motion.div>
            </div>

            <div className="absolute bottom-12">
              <Button onClick={endDetox} variant="ghost" className="text-zinc-600 hover:text-white hover:bg-zinc-900 text-xs uppercase tracking-widest">
                Force Reconnect
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SilentCompass;
