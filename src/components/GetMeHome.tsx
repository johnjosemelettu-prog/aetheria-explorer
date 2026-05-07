import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as AI from '@/services/gemini';
import { ShieldAlert, Crosshair, Navigation2, MapPin, Zap, Banknote, ShieldCheck } from 'lucide-react';
import { useTranslation } from "react-i18next";

const GetMeHome = () => {
    const { t } = useTranslation();
  const [route, setRoute] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetMeHome = async () => {
    setLoading(true);
    setError(null);
    try {
      const currentLocation = { lat: 48.8584, lng: 2.2945 }; 
      const homeLocation = { lat: 48.86, lng: 2.35 }; 
      const result = await AI.getMeHome(currentLocation, homeLocation);
      setRoute(result);
    } catch (err) {
      setError("Failed to calculate the route. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#110505] text-white pt-32 pb-24 relative overflow-hidden flex flex-col items-center">
      {/* Background Alerts */}
      <div className="absolute top-0 inset-x-0 h-1 bg-red-500 animate-pulse" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-[0.03] mix-blend-screen pointer-events-none" />
      <div className="absolute w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         className="text-center mb-12 z-10"
      >
        <div className="inline-flex items-center justify-center p-5 rounded-full bg-red-500/10 text-red-500 mb-6 border-2 border-red-500/40 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
          <ShieldAlert className="w-16 h-16" />
        </div>
        <h1 className="text-6xl md:text-8xl font-display font-black mb-4 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-red-500">
          {t('auto.auto_get_me_home_1356')}
                          </h1>
        <p className="text-xl text-red-200/60 max-w-xl mx-auto font-mono text-sm tracking-widest">
          {t('auto.auto_emergency_extraction_1355')}
                          </p>
      </motion.div>

      <div className="z-10 w-full max-w-4xl px-4">
        {!route ? (
          <motion.button 
             onClick={handleGetMeHome} 
             disabled={loading}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="w-full mx-auto md:w-2/3 h-32 bg-red-600 hover:bg-red-500 rounded-[40px] flex items-center justify-center gap-4 border-4 border-red-400 font-black text-3xl uppercase tracking-widest shadow-[0_0_60px_rgba(239,68,68,0.6)] disabled:opacity-50 disabled:animate-pulse transition-all"
          >
            {loading ? (
              <>{t('auto.auto_computing_safe_route_1354')}</>
            ) : (
              <><Crosshair className="w-10 h-10" /> {t('auto.auto_initiate_protocol_1353')}</>
            )}
          </motion.button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-black/80 backdrop-blur-xl border border-red-500/30 rounded-[40px] p-8 md:p-12"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                <h2 className="text-3xl font-display font-bold flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-green-400" />
                  {t('auto.auto_routing_established_1352')}
                                                      </h2>
                <div className="text-right">
                  <p className="text-xs font-mono text-white/40 mb-1 tracking-widest">{t('auto.auto_destination_1351')}</p>
                  <p className="font-bold flex items-center gap-2 text-white">
                     <MapPin className="w-4 h-4 text-red-500" /> {t('auto.auto_safehouse___hotel_1350')}
                                                            </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Fastest Route */}
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition">
                    <Zap className="w-24 h-24" />
                  </div>
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-yellow-400">
                     <Zap className="w-5 h-5" /> {t('auto.auto_fastest_escape_1349')}
                                                            </h3>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex justify-between bg-black/40 p-3 rounded-xl border border-white/5">
                       <span className="text-white/50">{t('auto.auto_mode_1348')}</span>
                       <span className="font-bold text-white capitalize">{route.fastestRoute.mode}</span>
                    </div>
                    <div className="flex justify-between bg-black/40 p-3 rounded-xl border border-white/5">
                       <span className="text-white/50">{t('auto.auto_duration_1347')}</span>
                       <span className="font-bold text-yellow-400">{route.fastestRoute.duration}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/10 font-mono text-xs text-white/60 space-y-2">
                     <p className="text-white/40 uppercase tracking-widest mb-3">{t('auto.auto_turn_by_turn_1346')}</p>
                     {route.fastestRoute.steps.map((step: string, i: number) => (
                       <div key={i} className="flex gap-3">
                         <span className="text-yellow-400 shrink-0">0{i+1}</span>
                         <span>{step}</span>
                       </div>
                     ))}
                  </div>
                </div>

                {/* Cheapest Route */}
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition">
                    <Banknote className="w-24 h-24" />
                  </div>
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-green-400">
                     <Banknote className="w-5 h-5" /> {t('auto.auto_most_economical_1345')}
                                                            </h3>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex justify-between bg-black/40 p-3 rounded-xl border border-white/5">
                       <span className="text-white/50">{t('auto.auto_mode_1344')}</span>
                       <span className="font-bold text-white capitalize">{route.cheapestRoute.mode}</span>
                    </div>
                    <div className="flex justify-between bg-black/40 p-3 rounded-xl border border-white/5">
                       <span className="text-white/50">{t('auto.auto_duration___cost_1343')}</span>
                       <span className="font-bold text-green-400">{route.cheapestRoute.duration} / {route.cheapestRoute.cost}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10 font-mono text-xs text-white/60 space-y-2">
                     <p className="text-white/40 uppercase tracking-widest mb-3">{t('auto.auto_turn_by_turn_1342')}</p>
                     {route.cheapestRoute.steps.map((step: string, i: number) => (
                       <div key={i} className="flex gap-3">
                         <span className="text-green-400 shrink-0">0{i+1}</span>
                         <span>{step}</span>
                       </div>
                     ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setRoute(null)} 
                className="mt-8 w-full py-4 text-center text-sm font-mono tracking-widest uppercase text-white/40 hover:text-white transition-colors"
              >
                {t('auto.auto_abort_protocol___res_1341')}
                                                </button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {error && (
        <div className="absolute bottom-10 bg-red-900/80 border border-red-500 text-red-200 px-6 py-4 rounded-xl z-20 backdrop-blur">
          {error}
        </div>
      )}
    </div>
  );
};

export default GetMeHome;
