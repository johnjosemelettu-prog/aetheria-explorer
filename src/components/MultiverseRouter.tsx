import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Footprints, Train, ArrowRight, Compass, Sparkles, Loader2, GitMerge } from 'lucide-react';
import * as AI from '../services/gemini';

const MultiverseRouter = () => {
  const [location, setLocation] = useState("Shibuya Crossing, Tokyo");
  const [routes, setRoutes] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const exploreMultiverse = async () => {
    if (!location) return;
    setLoading(true);
    setRoutes(null);
    setSelectedBranch(null);
    try {
      const results = await AI.generateMultiverseRoutes(location);
      setRoutes(results);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white rounded-lg">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center justify-center p-3 bg-indigo-500/20 text-indigo-400 rounded-full mb-4">
            <GitMerge className="w-8 h-8" />
          </motion.div>
          <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            "Sliding Doors" Multiverse Router
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Don't just see the fastest route—see the butterfly effect of your choices. Choose your adventure based on downstream vibes, weather, and serendipity.
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700 shadow-2xl mb-12 flex flex-col md:flex-row items-end gap-4">
          <div className="flex-grow w-full">
            <label className="block text-sm font-medium mb-2 text-indigo-300">Your Current Crossroad</label>
            <Input 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              placeholder="e.g. Times Square, Shinjuku Station..." 
              className="bg-gray-900/50 border-gray-600 text-white py-6 text-lg"
            />
          </div>
          <Button 
            onClick={exploreMultiverse} 
            disabled={loading}
            className="w-full md:w-auto py-6 px-8 bg-indigo-600 hover:bg-indigo-700 text-white text-lg rounded-xl shadow-lg shadow-indigo-900/20"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Sparkles className="w-5 h-5 mr-2" /> Peek into Multiverse</>}
          </Button>
        </div>

        <AnimatePresence>
          {routes && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <Compass className="w-6 h-6 text-indigo-400" />
                <h2 className="text-2xl font-bold">Parallel Timelines for: <span className="text-indigo-400">{routes.crossroad}</span></h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {routes.branches.map((branch: any, idx: number) => (
                  <motion.div
                    key={branch.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                  >
                    <Card 
                      className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
                        selectedBranch === branch.id 
                          ? 'border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)] bg-gray-800' 
                          : 'border-gray-700 bg-gray-800/60 hover:bg-gray-800 hover:border-gray-500'
                      }`}
                      onClick={() => setSelectedBranch(branch.id)}
                    >
                      {selectedBranch === branch.id && (
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
                      )}
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Branch {branch.id}</span>
                          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-medium border border-indigo-500/20">
                            {branch.vibe}
                          </span>
                        </div>
                        <CardTitle className="text-2xl text-white flex items-center gap-3">
                          {branch.icon === 'train' ? <Train className="w-6 h-6 text-indigo-400" /> : <Footprints className="w-6 h-6 text-purple-400" />}
                          {branch.action}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <p className="text-sm text-gray-400 uppercase tracking-wider mb-1 font-semibold">Immediate Outcome</p>
                          <p className="text-gray-200">{branch.immediateOutcome}</p>
                        </div>
                        
                        <div className="relative p-4 rounded-xl bg-gray-900/50 border border-gray-700/50">
                          <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-gray-500">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                          <p className="text-sm text-gray-400 uppercase tracking-wider mb-1 font-semibold">Downstream Butterfly Effect</p>
                          <p className="text-indigo-200">{branch.downstreamEffects}</p>
                        </div>

                        {selectedBranch === branch.id && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-4 border-t border-gray-700">
                            <Button className="w-full bg-white text-gray-900 hover:bg-gray-200">
                              Lock In This Timeline
                            </Button>
                          </motion.div>
                        )}
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

export default MultiverseRouter;
