import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as AI from '../services/gemini';
import { ShieldAlert, MapPin, Radio, AlertTriangle, CheckCircle } from 'lucide-react';

const ScamAlertRadar = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const currentPos = { lat: 41.8902, lng: 12.4922 }; // Near Colosseum
      const results = await AI.getScamAlerts(currentPos);
      setAlerts(results.alerts || [results]); 
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
      fetchAlerts();
      const interval = setInterval(fetchAlerts, 30000); 
      return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0505] text-white pt-32 pb-24 relative overflow-hidden">
      {/* Background Cyber-Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none" />
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-red-500/10 text-red-500 mb-6 border border-red-500/30 relative">
            <div className="absolute inset-0 border border-red-500/50 rounded-full animate-ping" />
            <Radio className="w-12 h-12" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-black mb-6 uppercase tracking-tighter">
            Scam Alert Radar
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-mono text-sm">
            Live geographic scanning for reported scams, pickpockets, and tourist traps in your immediate vicinity.
          </p>
        </motion.div>

        <div className="bg-black/60 backdrop-blur-xl border border-red-500/20 rounded-[40px] p-8 md:p-12 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-red-500/20 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-red-400" />
              <span className="font-mono text-sm tracking-widest text-red-200">SCANNING: ROME, IT</span>
            </div>
            {loading ? (
              <span className="font-mono text-xs text-red-400 animate-pulse">SWEEPING AREA...</span>
            ) : (
              <span className="font-mono text-xs text-red-500">LIVE FEED</span>
            )}
          </div>

          <AnimatePresence mode="popLayout">
            {alerts.length > 0 ? (
                <div className="space-y-6">
                    {alerts.map((alert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95, x: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            className={`p-6 rounded-2xl shadow-lg border-l-4 relative overflow-hidden group ${alert.severity === 'High' ? 'border-red-500 bg-red-950/40' : 'border-orange-500 bg-orange-950/40'}`}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full blur-[40px] transition group-hover:opacity-20 ${alert.severity === 'High' ? 'bg-red-500' : 'bg-orange-500'}`} />
                            
                            <div className="flex items-start gap-4 relative z-10">
                              <ShieldAlert className={`w-8 h-8 shrink-0 ${alert.severity === 'High' ? 'text-red-500' : 'text-orange-500'}`} />
                              <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-2 text-white">{alert.title || alert.scam_type}</h2>
                                <p className="text-white/60 text-sm leading-relaxed mb-4">{alert.advice || alert.description}</p>
                                <div className="flex flex-wrap gap-2 text-[10px] font-mono tracking-widest uppercase">
                                  <span className="bg-black/40 px-2 py-1 rounded text-white/50 border border-white/5">
                                    Reported: {alert.time_reported || 'Just now'}
                                  </span>
                                  {alert.distance && (
                                    <span className="bg-black/40 px-2 py-1 rounded text-white/50 border border-white/5">
                                      Dist: {alert.distance}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : !loading && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mb-4 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Area Secure</h3>
                  <p className="text-green-500 font-mono text-sm max-w-sm">No active threats or scams reported in your immediate vicinity. Continue safe exploration.</p>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ScamAlertRadar;
