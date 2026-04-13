import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Sparkles, MapPin, Search, Loader2 } from 'lucide-react';
import * as AI from '../services/gemini';

const ThriftSonar = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const scanOutfit = async () => {
    setLoading(true);
    setData(null);
    try {
      const result = await AI.analyzeOutfitAesthetic("mock_camera_stream");
      setData(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-fuchsia-950 text-fuchsia-50 p-8 rounded-lg overflow-hidden flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex justify-center items-center p-5 bg-fuchsia-900 border border-fuchsia-600 rounded-full shadow-[0_0_30px_rgba(192,38,211,0.3)] mb-6">
            <Sparkles className="w-10 h-10 text-fuchsia-300" />
          </div>
          <h1 className="text-4xl font-extrabold mb-4 uppercase tracking-wider text-fuchsia-100 drop-shadow-md">Aesthetic Synthesizer</h1>
          <p className="text-fuchsia-300 text-lg max-w-2xl mx-auto">
            Scan your current fit. The Vision AI perfectly categorizes your aesthetic core and maps a hidden sonar route to underground vintage curbs and unmapped pop-up thrift spots tailored for your vibe.
          </p>
        </div>

        {!data ? (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-fuchsia-800 bg-fuchsia-900/20 rounded-3xl">
            <Button 
              onClick={scanOutfit} 
              disabled={loading}
              className="py-10 px-12 text-2xl font-black uppercase tracking-widest bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-full shadow-2xl shadow-fuchsia-900/50 transition-all hover:scale-105"
            >
              {loading ? <Loader2 className="w-8 h-8 animate-spin mr-4" /> : <Camera className="w-8 h-8 mr-4" />}
              {loading ? "Analyzing Core..." : "Scan Outfit"}
            </Button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              
              <div className="bg-fuchsia-900/40 p-8 rounded-3xl border border-fuchsia-700/50 flex flex-col md:flex-row items-center justify-between shadow-xl gap-6">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-fuchsia-400 mb-2">Detected Core Aesthetic</p>
                  <h2 className="text-5xl font-black text-white">{data.aesthetic}</h2>
                  <p className="text-fuchsia-200 mt-4 font-mono text-sm border-l-2 border-fuchsia-500 pl-4">{data.analysis}</p>
                </div>
                <Button className="shrink-0 bg-white text-fuchsia-950 font-bold hover:bg-fuchsia-100 py-6 px-6 rounded-2xl">
                  <Search className="w-5 h-5 mr-2" /> Share Fit
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-fuchsia-500 mb-4 pl-2 border-l-4 border-fuchsia-600">Sonar Results: Hyper-Local Thrift Curators</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {data.thriftSpots.map((spot: any, i: number) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                      <Card className="bg-fuchsia-950 border border-fuchsia-800 shadow-lg hover:border-fuchsia-500 transition-colors h-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-500" />
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-xl font-bold text-white leading-tight">{spot.name}</h4>
                              <p className="text-xs font-mono text-fuchsia-400 mt-1">{spot.status}</p>
                            </div>
                            <div className="text-center bg-fuchsia-900/50 border border-fuchsia-700/50 px-3 py-1 rounded-xl">
                              <p className="text-[10px] uppercase font-bold text-fuchsia-400">Match</p>
                              <p className="text-lg font-black text-white">{spot.matches}%</p>
                            </div>
                          </div>
                          <p className="text-fuchsia-300 text-sm italic mb-6">"{spot.vibe}"</p>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-xs font-bold uppercase text-fuchsia-500">
                              <MapPin className="w-4 h-4 mr-1" /> {spot.distance} away
                            </span>
                            <Button variant="outline" size="sm" className="border-fuchsia-700 text-fuchsia-300 hover:bg-fuchsia-900 hover:text-white">Route</Button>
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

export default ThriftSonar;
