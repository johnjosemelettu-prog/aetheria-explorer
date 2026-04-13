import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Wind, VolumeX, Trees, Flower2, Loader2, Navigation } from 'lucide-react';
import * as AI from '../services/gemini';

const SensoryWayfinding = () => {
  const [destination, setDestination] = useState("Le Marais, Paris");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [routeData, setRouteData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const togglePreference = (pref: string) => {
    if (preferences.includes(pref)) {
      setPreferences(preferences.filter(p => p !== pref));
    } else {
      setPreferences([...preferences, pref]);
    }
  };

  const generateRoute = async () => {
    if (!destination) return;
    setLoading(true);
    setRouteData(null);
    try {
      const results = await AI.generateSensoryRoute(destination, preferences);
      setRouteData(results);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-green-950 min-h-screen text-green-50 rounded-lg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex p-4 bg-green-900 rounded-full mb-6 text-green-400 shadow-[0_0_40px_rgba(74,222,128,0.2)]">
            <Wind className="w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl font-extrabold mb-4 text-white drop-shadow-md">
            Sensorial & Acoustic Wayfinding
          </h1>
          <p className="text-green-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Move beyond shortest-distance routing. Find paths optimized for lower decibels, deep tree canopies, or the scent of local bakeries.
          </p>
        </div>

        <Card className="bg-green-900/60 border-green-800 backdrop-blur-md mb-10 p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-green-300 uppercase tracking-widest">Where to?</label>
              <Input 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)} 
                className="bg-green-950/50 border-green-700 text-white text-lg py-6"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-3 text-green-300 uppercase tracking-widest">Sensory Optimizations</label>
              <div className="flex flex-wrap gap-3">
                {[
                  { id: 'Quiet', icon: VolumeX, label: 'Minimize Noise (< 50dB)' },
                  { id: 'Shade', icon: Trees, label: 'Maximize Tree Canopy' },
                  { id: 'Scent', icon: Flower2, label: 'Prioritize Floral/Bakery Scents' }
                ].map(pref => {
                  const Icon = pref.icon;
                  const isActive = preferences.includes(pref.id);
                  return (
                    <Button 
                      key={pref.id}
                      variant="outline"
                      onClick={() => togglePreference(pref.id)}
                      className={`h-12 px-6 rounded-full transition-all duration-300 ${isActive ? 'bg-green-500 border-green-500 text-green-950 hover:bg-green-400 hover:text-green-950' : 'bg-transparent border-green-700 text-green-300 hover:bg-green-800'}`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {pref.label}
                    </Button>
                  )
                })}
              </div>
            </div>

            <Button 
              onClick={generateRoute} 
              disabled={loading || preferences.length === 0}
              className="w-full py-6 mt-4 bg-green-600 hover:bg-green-500 text-white text-lg font-bold shadow-lg disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Navigation className="w-5 h-5 mr-2" /> Calculate Sensory Route</>}
            </Button>
          </div>
        </Card>

        <AnimatePresence>
          {routeData && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between p-6 bg-green-900/40 rounded-2xl border border-green-800/50 backdrop-blur-xl">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">{routeData.routeType}</h3>
                  <p className="text-green-400 text-sm">Path to {routeData.destination}</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center p-3 bg-green-950/50 rounded-xl border border-green-800">
                    <p className="text-xs text-green-500 font-bold uppercase">Avg Noise</p>
                    <p className="text-lg font-black text-white">{routeData.metrics.avgNoise}</p>
                  </div>
                  <div className="text-center p-3 bg-green-950/50 rounded-xl border border-green-800">
                    <p className="text-xs text-green-500 font-bold uppercase">Shade</p>
                    <p className="text-lg font-black text-white">{routeData.metrics.shadeCoverage}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {routeData.waypoints.map((wp: any, idx: number) => (
                  <motion.div 
                    key={wp.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    className="flex gap-6"
                  >
                    <div className="relative flex flex-col items-center">
                      <div className="w-4 h-4 mt-2 rounded-full border-2 border-green-400 bg-green-900 z-10" />
                      {idx !== routeData.waypoints.length - 1 && (
                        <div className="w-0.5 h-full bg-green-800/50 absolute top-6" />
                      )}
                    </div>
                    <Card className="flex-1 bg-green-900/20 border-green-800/30">
                      <CardContent className="p-5">
                        <h4 className="text-lg font-bold text-green-100 mb-1">{wp.name}</h4>
                        <p className="text-green-300 text-sm">{wp.description}</p>
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

export default SensoryWayfinding;
