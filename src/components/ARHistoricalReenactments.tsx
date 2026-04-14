import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';
import XRLayout from './XRLayout';

export default function ARHistoricalReenactments() {
  const [year, setYear] = useState(1889);

  return (
    <XRLayout 
      mode="AR"
      title="Historical Reenactments" 
      description="Witness the past unfold right before your eyes. Adjust the timeline to see localized events from different eras."
      overlayIcon={<Clock className="w-8 h-8" />}
    >
      <div className="absolute inset-x-0 top-1/3 flex items-center justify-center pointer-events-none">
        <motion.div 
          key={year}
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 0.8, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <Users className="w-32 h-32 text-primary/30 mx-auto" strokeWidth={1} />
          <h3 className="text-3xl font-display text-primary mt-4 tracking-[0.2em] uppercase mix-blend-screen">
            {year === 1889 ? "EXPOSITION UNIVERSELLE" : 
             year === 1789 ? "RÉVOLUTION FRANÇAISE" : 
             "LUTECE FOUNDATION"}
          </h3>
          <p className="text-primary/60 mt-2 font-mono text-sm max-w-md mx-auto">
            {year === 1889 ? "Visualizing original crowd attending the opening of the Eiffel Tower." : 
             year === 1789 ? "Citizens gathering near the Bastille." : 
             "Gallo-Roman city elements rendered over modern streets."}
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-40 inset-x-8 flex flex-col items-center pointer-events-auto">
        <div className="flex justify-between w-full max-w-xl text-primary/70 font-mono text-xs mb-2">
          <span>50 BC</span>
          <span>1789</span>
          <span>1889</span>
          <span>PRESENT</span>
        </div>
        <input 
          type="range" 
          min="50" 
          max="2026" 
          step="1"
          value={year}
          onChange={(e) => {
             const val = parseInt(e.target.value);
             if(val < 800) setYear(50);
             else if(val < 1850) setYear(1789);
             else setYear(1889);
          }}
          className="w-full max-w-xl appearance-none bg-black/50 h-2 rounded-full border border-primary/30 outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full"
        />
        <div className="mt-6 text-6xl font-bold font-display text-white tracking-widest drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]">
          {year}
        </div>
      </div>
    </XRLayout>
  );
}
