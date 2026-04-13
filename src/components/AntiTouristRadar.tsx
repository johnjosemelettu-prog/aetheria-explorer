import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Radar, Loader2, ShieldX, MapPinOff, Ghost, Fingerprint } from 'lucide-react';
import * as AI from '../services/gemini';

const AntiTouristRadar = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [radarActive, setRadarActive] = useState(false);

  const activateRadar = async () => {
    setLoading(true);
    setRadarActive(true);
    try {
      const result = await AI.fetchAntiTouristLocations("Current City");
      setData(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 p-8 flex flex-col items-center rounded-lg">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <motion.div 
            animate={{ rotate: radarActive ? 360 : 0 }} 
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="inline-block p-4 bg-lime-900/20 border border-lime-500/30 rounded-full mb-6"
          >
            <Radar className={`w-10 h-10 ${radarActive ? 'text-lime-400' : 'text-neutral-500'}`} />
          </motion.div>
          <h1 className="text-4xl font-extrabold mb-4 text-white uppercase tracking-wider">No-Traps Vibe Checker</h1>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
            Scrub the map of everything deemed "basic." Zero Instagram footprint. Zero TripAdvisor reviews. Only raw, underground, and local spots survive the filter.
          </p>
        </div>

        {!data ? (
          <div className="flex justify-center mb-12">
            <Button 
              onClick={activateRadar}
              disabled={loading}
              className="py-8 px-12 text-lg font-bold bg-lime-500 text-lime-950 hover:bg-lime-400 rounded-none border-b-4 border-lime-700 uppercase tracking-widest"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : <ShieldX className="w-6 h-6 mr-3" />}
              {loading ? "Scrubbing Social Media Footprints..." : "Deploy Anti-Tourist Filter"}
            </Button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-neutral-900 border border-neutral-800 p-4 text-center">
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Traps Avoided</p>
                  <p className="text-3xl font-mono text-white">{data.metrics.trapsAvoided}</p>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-4 text-center">
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Digital Scrub</p>
                  <p className="text-3xl font-mono text-lime-400">{data.metrics.socialMediaFootprintScrubbed}</p>
                </div>
                <div className="bg-lime-900/20 border border-lime-500/30 p-4 text-center flex flex-col justify-center items-center">
                  <p className="text-xs uppercase tracking-widest text-lime-500 font-bold mb-1 flex items-center">
                    <ShieldX className="w-4 h-4 mr-1" /> Status
                  </p>
                  <p className="text-sm font-bold text-lime-300 uppercase">{data.metrics.basicVibeDetected}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 border-b border-neutral-800 pb-2 flex items-center">
                  <MapPinOff className="w-4 h-4 mr-2" /> Verified Safe Zones
                </h3>
                
                {data.safeZones.map((zone: any, idx: number) => (
                  <motion.div key={zone.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                    <Card className="bg-black border-neutral-800 hover:border-lime-500/50 transition-colors rounded-none">
                      <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-start">
                        <div className="p-4 bg-neutral-900 border border-neutral-800 shrink-0">
                          <Ghost className="w-8 h-8 text-neutral-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-xl font-bold text-white uppercase tracking-wide">{zone.name}</h4>
                            <span className="flex items-center text-xs font-mono text-lime-500 bg-lime-500/10 px-2 py-1 border border-lime-500/20">
                              <Fingerprint className="w-3 h-3 mr-1" /> Footprint: {zone.digitalFootprint}
                            </span>
                          </div>
                          <p className="text-neutral-400 leading-relaxed font-mono text-sm mb-4">
                            {zone.description}
                          </p>
                          <div className="bg-neutral-900 px-3 py-2 text-xs font-mono text-neutral-500 border border-neutral-800 inline-block">
                            COORD // {zone.coordinates}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default AntiTouristRadar;
