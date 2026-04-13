import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Camera, Film, Loader2, PlayCircle, Star, Music, MapPin } from 'lucide-react';
import * as AI from '../services/gemini';

const ERAS = ["Villain Era", "Indie Sleaze Retro", "Cyberpunk Protagonist"];

const MainCharacterEngine = () => {
  const [selectedEra, setSelectedEra] = useState(ERAS[0]);
  const [location, setLocation] = useState("Downtown Metropolis");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<any>(null);

  const generateStoryboard = async () => {
    setLoading(true);
    try {
      const data = await AI.generateMainCharacterItinerary(selectedEra, location);
      setItinerary(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-1000 bg-gradient-to-br ${itinerary ? itinerary.theme.palette : 'from-zinc-900 to-black'} text-zinc-100 rounded-lg`}>
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <div className="inline-flex justify-center items-center p-4 bg-zinc-800/50 rounded-full border border-zinc-700 backdrop-blur-md mb-6">
            <Film className="w-10 h-10 text-zinc-300" />
          </div>
          <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Main Character Engine</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light">
            You are the protagonist. Define your current "era," and the AI will reskin your entire itinerary into a mood-board and storyboard.
          </p>
        </div>

        <Card className="bg-black/40 border-white/10 backdrop-blur-xl mb-12">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Define Your Era</label>
                <div className="flex flex-col gap-3">
                  {ERAS.map(era => (
                    <Button 
                      key={era} 
                      onClick={() => setSelectedEra(era)}
                      variant="outline" 
                      className={`justify-start border-white/10 ${selectedEra === era ? 'bg-white text-black' : 'bg-transparent text-zinc-300 hover:bg-white/10'}`}
                    >
                      {era === selectedEra && <Star className="w-4 h-4 mr-2" />}
                      {era}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Current Set Location</label>
                <Input 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  className="bg-zinc-900/50 border-white/10 text-white p-6 rounded-xl"
                />
                
                <Button 
                  onClick={generateStoryboard} 
                  disabled={loading}
                  className="w-full mt-6 py-6 font-bold uppercase tracking-widest bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Camera className="w-5 h-5 mr-2" /> Generate Storyboard</>}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <AnimatePresence>
          {itinerary && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="relative p-8 border border-white/20 rounded-2xl bg-black/60 backdrop-blur-3xl overflow-hidden shadow-2xl">
                {/* Cinematic Letterbox Effects */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-black z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-black z-10" />
                
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 mb-1">Scene 01 // {itinerary.era}</p>
                    <h2 className="text-3xl font-black">{itinerary.location}</h2>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="text-white/50 hover:text-white"><PlayCircle className="w-6 h-6" /></Button>
                    <Button variant="ghost" size="icon" className="text-white/50 hover:text-white"><Music className="w-6 h-6" /></Button>
                  </div>
                </div>

                <p className="text-xl md:text-2xl font-serif italic text-white/90 leading-relaxed mb-10 text-center px-4">
                  "{itinerary.theme.narrator}"
                </p>

                <div className="grid md:grid-cols-2 gap-6 relative">
                  {itinerary.theme.locations.map((loc: any, idx: number) => (
                    <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + (idx * 0.1) }}>
                      <Card className="bg-white/5 border-white/10 h-full hover:bg-white/10 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <span className="font-mono text-sm bg-black/50 px-2 py-1 rounded text-white/70">{loc.time}</span>
                            <MapPin className="w-5 h-5 text-white/50" />
                          </div>
                          <h3 className="text-lg font-bold mb-2">{loc.place}</h3>
                          <p className="text-white/60 text-sm">{loc.action}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainCharacterEngine;
