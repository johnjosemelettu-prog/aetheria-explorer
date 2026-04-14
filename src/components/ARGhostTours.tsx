import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Ghost, Radical } from 'lucide-react';
import XRLayout from './XRLayout';

export default function ARGhostTours() {
  const [anomaly, setAnomaly] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnomaly(a => !a);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <XRLayout 
      mode="AR"
      title="Ectoplasmic Spectrum" 
      description="Scanning area for paranormal anomalies and lingering spiritual energy from local legends."
      overlayIcon={<Ghost className="w-8 h-8 text-green-500" />}
    >
      <div className="absolute inset-0 max-h-[100%] pointer-events-none mix-blend-color-burn bg-gradient-to-tr from-green-900/30 to-black/80" />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ scale: anomaly ? [1, 1.1, 1] : 1, opacity: anomaly ? [0, 0.4, 0] : 0 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute w-[400px] h-[400px] bg-green-500/20 blur-[100px] rounded-full"
        />
        
        {anomaly && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-10 border border-green-500/50 bg-black/60 p-4 rounded-xl flex flex-col items-center"
          >
            <Radical className="text-green-500 w-12 h-12 mb-2 animate-pulse" />
            <h4 className="text-green-500 font-mono text-xl">CLASS IV APPARITION</h4>
            <p className="text-green-400/60 font-mono text-xs mt-1">Phantom of the Opera House expected...</p>
          </motion.div>
        )}
      </div>

      <div className="absolute top-24 right-8 w-48 border border-green-500/30 bg-black/50 p-4 font-mono text-[10px] text-green-500/80 rounded-lg shadow-[0_0_10px_rgba(0,255,0,0.1)]">
        <div className="flex justify-between mb-1"><span>EMF LEVEL</span><span>{anomaly ? '8.4' : '2.1'} mG</span></div>
        <div className="w-full h-1 bg-green-900/50 mb-4"><motion.div animate={{ width: anomaly ? '80%' : '20%' }} className="h-full bg-green-500" /></div>
        
        <div className="flex justify-between mb-1"><span>THERMAL</span><span>{anomaly ? '-5.2' : '18.4'}°C</span></div>
        <div className="w-full h-1 bg-green-900/50 mb-4"><motion.div animate={{ width: anomaly ? '10%' : '60%' }} className="h-full bg-blue-500" /></div>
        
        <div className="flex justify-between mb-1"><span>EVP CHANNELS</span><span>{anomaly ? 'LOCKED' : 'SCANNING'}</span></div>
      </div>
    </XRLayout>
  );
}
