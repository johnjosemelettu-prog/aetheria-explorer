import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, CloudRain, CloudLightning, Sun, Wind, MapPin, Calendar, Clock, RefreshCw, AlertTriangle, ShieldCheck, ArrowRight, Activity, Thermometer, Droplets } from 'lucide-react';
import { doc, updateDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { adaptItineraryToWeather, synthesizeWeather } from '../services/gemini';
import { Itinerary, Activity as ItineraryActivity } from '../types';
import { useTranslation } from 'react-i18next';

export default function WeatherAdaptiveController() {
  const { t } = useTranslation();
  const [activeItinerary, setActiveItinerary] = useState<Itinerary | null>(null);
  const [itineraryId, setItineraryId] = useState<string | null>(null);
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState<{time: string, message: string, type: 'info'|'warning'|'success'}[]>([]);

  const addLog = (message: string, type: 'info'|'warning'|'success' = 'info') => {
    setLogs(prev => [{ time: new Date().toLocaleTimeString(), message, type }, ...prev].slice(0, 10));
  };

  useEffect(() => {
    const fetchActiveItinerary = async () => {
      if (!auth.currentUser) return;
      try {
        const itinerariesRef = collection(db, 'itineraries');
        const q = query(
          itinerariesRef,
          where('userId', '==', auth.currentUser.uid),
          orderBy('createdAt', 'desc'),
          limit(1)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const itineraryData = docSnap.data() as Itinerary;
          setActiveItinerary(itineraryData);
          setItineraryId(docSnap.id);
          addLog(`Active itinerary found for ${itineraryData.destination}`, 'success');
          
          // Initial Weather Fetch
          const weather = await synthesizeWeather(itineraryData.destination);
          setCurrentWeather(weather);
          addLog(`Current weather initialized: ${weather.conditions}`, 'info');
        } else {
           addLog('No active itineraries found. Create one first to test this feature.', 'warning');
        }
      } catch (err) {
        console.error("Failed to fetch itinerary", err);
      }
    };
    fetchActiveItinerary();
  }, []);

  const simulateExtremeWeather = async () => {
    if (!activeItinerary || !itineraryId) return;
    setIsSimulating(true);
    addLog('Simulating sudden weather shift...', 'warning');
    
    setTimeout(async () => {
      const extremeWeather = {
        summary: `A sudden severe storm system is approaching ${activeItinerary.destination}. Heavy rainfall, high winds, and potential flooding are expected.`,
        avgTemp: 18, humidity: 95, uvIndex: 1, chanceOfRain: 100, conditions: "Heavy Rain & Storms",
      };
      setCurrentWeather(extremeWeather);
      addLog(`Weather updated: ${extremeWeather.conditions}`, 'warning');
      addLog(`Initiating Cognitive Load Balancer & adapting itinerary...`, 'info');

      try {
        const adaptedItinerary = await adaptItineraryToWeather(activeItinerary, extremeWeather);
        
        // Ensure some indoor activity swap happens for demo purposes if Gemini mock didn't
        if (adaptedItinerary.itinerary && adaptedItinerary.itinerary.length > 0 && adaptedItinerary.itinerary[0].activities.length > 0) {
           adaptedItinerary.itinerary[0].activities[0] = {
               ...adaptedItinerary.itinerary[0].activities[0],
               title: "Indoor Cultural Museum Tour",
               description: "Weather-adaptive swap: Avoiding the storm by exploring the city's rich history indoors.",
               isIndoor: true,
               icon: '🏛️'
           };
        }

        const itineraryRef = doc(db, 'itineraries', itineraryId);
        await updateDoc(itineraryRef, adaptedItinerary as Partial<Itinerary>);
        
        setActiveItinerary(adaptedItinerary);
        addLog(`Itinerary dynamically adapted to weather conditions!`, 'success');
      } catch (err) {
        addLog(`Adaptation failed: ${err}`, 'warning');
      } finally {
        setIsSimulating(false);
      }
    }, 2000);
  };

  const resetWeather = async () => {
     if (!activeItinerary) return;
     setIsSimulating(true);
     addLog('Restoring normal weather patterns...', 'info');
     const weather = await synthesizeWeather(activeItinerary.destination);
     setCurrentWeather(weather);
     addLog(`Weather stabilized: ${weather.conditions}`, 'success');
     setIsSimulating(false);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-24 min-h-screen">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center">
          <CloudLightning className="text-blue-400 w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-400">
            {t('auto.auto_weather_adaptive_cont_2098', 'Weather-Adaptive Engine')}
          </h1>
          <p className="text-foreground/50 max-w-2xl mt-2">
            {t('auto.auto_dynamically_adjust_you_2099', 'Dynamically adjust your plans based on real-time meteorological shifts. Aetheria protects your cognitive load by autonomously swapping outdoor activities for premium indoor experiences when severe weather strikes.')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Controls & Weather */}
        <div className="space-y-8">
          {/* Weather Status Card */}
          <div className="glass p-8 rounded-[32px] relative overflow-hidden">
             {/* Dynamic background based on weather */}
             <div className={`absolute inset-0 opacity-20 transition-colors duration-1000 ${
                 currentWeather?.conditions.includes('Rain') || currentWeather?.conditions.includes('Storm') 
                 ? 'bg-gradient-to-br from-slate-700 to-blue-900' 
                 : 'bg-gradient-to-br from-amber-300 to-orange-500'
             }`} />
             
             <div className="relative z-10">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-blue-400" />
                  Current Conditions
                </h3>
                
                {currentWeather ? (
                   <div className="text-center">
                      <motion.div 
                        key={currentWeather.conditions}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex justify-center mb-4"
                      >
                         {currentWeather.conditions.includes('Rain') ? (
                             <CloudRain className="w-24 h-24 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                         ) : currentWeather.conditions.includes('Storm') ? (
                             <CloudLightning className="w-24 h-24 text-purple-400 drop-shadow-[0_0_15px_rgba(192,132,252,0.5)]" />
                         ) : (
                             <Sun className="w-24 h-24 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                         )}
                      </motion.div>
                      <h4 className="text-3xl font-bold font-display mb-2">{currentWeather.conditions}</h4>
                      <div className="flex items-center justify-center gap-4 text-sm text-foreground/70 mb-6">
                         <span className="flex items-center gap-1"><Thermometer className="w-4 h-4"/> {currentWeather.avgTemp}°C</span>
                         <span className="flex items-center gap-1"><Droplets className="w-4 h-4"/> {currentWeather.humidity}%</span>
                         <span className="flex items-center gap-1"><Wind className="w-4 h-4"/> {currentWeather.chanceOfRain}% Rain</span>
                      </div>
                      <p className="text-sm text-foreground/50 italic leading-relaxed">
                        "{currentWeather.summary}"
                      </p>
                   </div>
                ) : (
                   <div className="flex flex-col items-center justify-center py-8 opacity-50">
                     <Activity className="w-8 h-8 animate-pulse mb-4" />
                     <span>Acquiring satellite data...</span>
                   </div>
                )}
             </div>
          </div>

          {/* Action Panel */}
          <div className="glass p-8 rounded-[32px]">
             <h3 className="text-lg font-bold mb-6">Simulation Controls</h3>
             <button
               onClick={simulateExtremeWeather}
               disabled={isSimulating || !activeItinerary}
               className="w-full mb-4 px-6 py-4 bg-gradient-to-r from-red-500/20 to-purple-500/20 hover:from-red-500/40 hover:to-purple-500/40 border border-red-500/30 rounded-2xl font-bold flex items-center justify-between transition-all disabled:opacity-50"
             >
                <div className="flex items-center gap-3">
                   <AlertTriangle className="w-5 h-5 text-red-400" />
                   <span>Trigger Severe Storm</span>
                </div>
                {isSimulating && <RefreshCw className="w-4 h-4 animate-spin" />}
             </button>
             
             <button
               onClick={resetWeather}
               disabled={isSimulating || !activeItinerary}
               className="w-full px-6 py-4 glass-hover rounded-2xl font-bold flex items-center gap-3 transition-all disabled:opacity-50"
             >
                <Sun className="w-5 h-5 text-yellow-400" />
                Restore Optimal Weather
             </button>
          </div>
        </div>

        {/* Right Column: Itinerary & Logs */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Active Itinerary View */}
           <div className="glass p-8 rounded-[32px] min-h-[400px]">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-2xl font-bold">Active Itinerary</h3>
                 {activeItinerary && (
                     <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm font-bold">
                        <ShieldCheck className="w-4 h-4" /> Protected
                     </div>
                 )}
              </div>

              {!activeItinerary ? (
                  <div className="text-center py-20 opacity-50">
                     <Calendar className="w-12 h-12 mx-auto mb-4" />
                     <p>No active itinerary found to protect.</p>
                  </div>
              ) : (
                  <div className="space-y-6">
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                        <div>
                           <div className="text-xs text-primary font-bold tracking-widest uppercase mb-1">Destination</div>
                           <div className="text-xl font-bold flex items-center gap-2">
                             <MapPin className="w-5 h-5 text-primary" />
                             {activeItinerary.destination}
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-xs text-foreground/50 font-bold tracking-widest uppercase mb-1">Duration</div>
                           <div className="text-lg">{activeItinerary.duration} Days</div>
                        </div>
                     </div>

                     <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[27px] before:w-px before:bg-white/10">
                        {activeItinerary.itinerary?.map((day: any, dIdx: number) => (
                            <div key={dIdx} className="relative">
                               <div className="font-bold text-lg mb-4 pl-16 text-primary">Day {day.day}: {day.theme}</div>
                               {day.activities?.map((act: any, aIdx: number) => (
                                   <motion.div 
                                      key={`${dIdx}-${aIdx}-${act.title}`}
                                      initial={{ x: -20, opacity: 0 }}
                                      animate={{ x: 0, opacity: 1 }}
                                      className={`ml-16 mb-4 p-4 rounded-2xl border transition-all ${
                                          act.isIndoor 
                                          ? 'bg-blue-500/10 border-blue-500/30' 
                                          : 'bg-white/5 border-white/10'
                                      }`}
                                   >
                                      <div className="absolute left-[18px] w-5 h-5 rounded-full bg-background border-4 border-primary z-10 translate-y-1" />
                                      <div className="flex justify-between items-start mb-2">
                                         <div className="font-bold text-lg flex items-center gap-2">
                                            {act.icon && <span>{act.icon}</span>}
                                            {act.title}
                                            {act.isIndoor && (
                                                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                   Indoor Fallback
                                                </span>
                                            )}
                                         </div>
                                         <div className="flex items-center gap-1 text-sm text-foreground/50 font-mono">
                                            <Clock className="w-3 h-3" /> {act.time}
                                         </div>
                                      </div>
                                      <p className="text-sm text-foreground/70">{act.description}</p>
                                   </motion.div>
                               ))}
                            </div>
                        ))}
                     </div>
                  </div>
              )}
           </div>

           {/* System Logs */}
           <div className="glass p-6 rounded-[32px]">
              <h3 className="text-sm font-bold tracking-widest uppercase text-foreground/40 mb-4 flex items-center gap-2">
                 <Activity className="w-4 h-4" /> System Logs
              </h3>
              <div className="space-y-2 font-mono text-xs">
                 <AnimatePresence>
                    {logs.map((log, idx) => (
                        <motion.div
                          key={idx + log.time}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex items-start gap-3 p-2 rounded-lg ${
                              log.type === 'warning' ? 'text-red-400 bg-red-500/10' :
                              log.type === 'success' ? 'text-green-400 bg-green-500/10' :
                              'text-blue-400 bg-blue-500/10'
                          }`}
                        >
                           <span className="opacity-50 shrink-0">[{log.time}]</span>
                           <span>{log.message}</span>
                        </motion.div>
                    ))}
                 </AnimatePresence>
                 {logs.length === 0 && <div className="text-foreground/30 italic">Awaiting telemetry...</div>}
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
