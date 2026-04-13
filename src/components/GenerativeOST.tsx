import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, Activity, Clock, MapPin, Music4, Loader2, FastForward, SkipBack } from 'lucide-react';
import * as AI from '../services/gemini';

const GenerativeOST = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ostData, setOstData] = useState<any>(null);
  
  // Mock biometric and environment states
  const [heartRate] = useState(72);
  const [timeOfDay] = useState("Night");
  const [location] = useState("Ancient Ruins, Rome");

  const togglePlayback = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    
    if (!ostData) {
      setLoading(true);
      try {
        const result = await AI.generateSoundtrack({ heartRate }, { location, timeOfDay });
        setOstData(result);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    setIsPlaying(true);
  };

  const regenerateTrack = async () => {
    setLoading(true);
    setIsPlaying(false);
    try {
      const result = await AI.generateSoundtrack({ heartRate }, { location, timeOfDay });
      setOstData(result);
      setIsPlaying(true);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center relative overflow-hidden rounded-lg">
      {/* Background Effect */}
      {isPlaying && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-black to-black animate-pulse" />
        </motion.div>
      )}

      <div className="z-10 w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Generative OST
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your life is a movie. This AI generates a continuous, bespoke soundtrack in real-time based on your heart rate, pace, time of day, and location.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-900/60 border-gray-800 backdrop-blur-xl shadow-2xl relative overflow-hidden p-8">
              {/* Visualizer Lines */}
              <div className="h-48 flex items-center justify-center gap-2 mb-8">
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 rounded-full bg-blue-500"
                    animate={
                      isPlaying 
                        ? { height: ["20%", "80%", "40%", "100%", "30%"] } 
                        : { height: "10%" }
                    }
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: i * 0.05
                    }}
                  />
                ))}
              </div>

              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-bold text-white">
                  {ostData ? ostData.trackName : "Ready to Synthesize"}
                </h2>
                <p className="text-gray-400 font-medium tracking-widest uppercase text-sm">
                  {ostData ? ostData.genre : "Aetheria Soundtrack Engine"}
                </p>
                {ostData && (
                  <p className="text-gray-500 text-sm mt-4 italic">
                    "{ostData.description}"
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center gap-6">
                <Button variant="outline" size="icon" className="w-14 h-14 rounded-full border-gray-700 bg-gray-800/50 hover:bg-gray-700 text-white">
                  <SkipBack className="w-6 h-6" />
                </Button>
                <Button 
                  onClick={togglePlayback} 
                  disabled={loading}
                  className="w-20 h-20 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_40px_rgba(37,99,235,0.4)]"
                >
                  {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current translate-x-1" />}
                </Button>
                <Button variant="outline" size="icon" className="w-14 h-14 rounded-full border-gray-700 bg-gray-800/50 hover:bg-gray-700 text-white hover:text-white">
                  <FastForward className="w-6 h-6" />
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-4">Live Telemetry</h3>
            
            <Card className="bg-gray-900/60 border-gray-800 p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg text-red-400"><Activity className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase">Heart Rate</p>
                  <p className="text-xl font-bold text-white">{heartRate} BPM</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900/60 border-gray-800 p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-500/20 rounded-lg text-orange-400"><Clock className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase">Time of Day</p>
                  <p className="text-xl font-bold text-white">{timeOfDay}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900/60 border-gray-800 p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/20 rounded-lg text-emerald-400"><MapPin className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase">Location Context</p>
                  <p className="text-lg font-bold text-white leading-tight">{location}</p>
                </div>
              </div>
            </Card>

            <Button onClick={regenerateTrack} variant="outline" className="w-full mt-4 border-gray-700 hover:bg-gray-800 text-white">
              <Music4 className="w-4 h-4 mr-2" /> Force Resync
            </Button>
            
            <div className="text-xs text-center text-gray-600 mt-4">
              In a full environment, these parameters update automatically from your device sensors.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerativeOST;
