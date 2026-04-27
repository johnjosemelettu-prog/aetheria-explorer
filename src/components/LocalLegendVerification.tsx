import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, CheckCircle2, MapPin, ScanLine, ShieldCheck } from 'lucide-react';

export default function LocalLegendVerification() {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      {/* Fake Camera Feed Background */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />

      <div className="relative z-10 flex-grow flex flex-col p-6 max-w-md mx-auto w-full">
        <header className="flex justify-between items-center py-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span className="font-bold text-emerald-400 uppercase tracking-widest text-sm">Aetheria Verification</span>
          </div>
          <span className="px-3 py-1 bg-black/50 border border-white/10 rounded-full text-xs font-mono">AR_MODE</span>
        </header>

        <div className="flex-grow flex flex-col items-center justify-center">
          {!verified ? (
            <motion.div 
              className="relative w-72 h-72 rounded-3xl border-2 border-dashed border-white/30 flex items-center justify-center overflow-hidden"
              animate={verifying ? { borderColor: ['rgba(255,255,255,0.3)', 'rgba(52,211,153,1)', 'rgba(255,255,255,0.3)'] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {verifying && (
                <motion.div 
                  initial={{ top: '-10%' }}
                  animate={{ top: '110%' }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  className="absolute left-0 right-0 h-1 bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)] z-20"
                />
              )}
              <ScanLine className={`w-16 h-16 ${verifying ? 'text-emerald-400' : 'text-white/50'}`} />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/50">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-display font-bold text-white mb-2">Legend Verified</h2>
              <p className="text-emerald-400/80">You are the 42nd explorer to find this location.</p>
            </motion.div>
          )}
        </div>

        <div className="mt-auto pt-8">
          <div className="glass p-6 rounded-3xl border border-white/10 backdrop-blur-xl">
            <h3 className="font-bold text-lg mb-2">The Hidden Shrine of Fox</h3>
            <p className="text-sm text-foreground/60 mb-6 flex items-center gap-1"><MapPin className="w-4 h-4"/> Target Location Reached</p>
            
            {!verified ? (
              <button 
                onClick={handleVerify}
                disabled={verifying}
                className="w-full py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <Camera className="w-5 h-5" />
                {verifying ? 'Analyzing Environment...' : 'Capture & Verify'}
              </button>
            ) : (
              <button className="w-full py-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(52,211,153,0.4)]">
                Claim Achievement
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
