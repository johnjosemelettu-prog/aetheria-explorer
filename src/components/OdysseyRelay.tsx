import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, MapPin, Archive, EyeOff } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function OdysseyRelay() {
    const { t } = useTranslation();
  const [scanning, setScanning] = useState(false);
  const [found, setFound] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setFound(true);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-display font-bold mb-4">{t('auto.auto_odyssey_relay_1951')}</h1>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          {t('auto.auto_leave_hidden_digital_1950')}
                          </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="glass rounded-[40px] p-8 border border-white/10 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
          
          <AnimatePresence mode="wait">
            {!scanning && !found && (
              <motion.div key="idle" exit={{ opacity: 0, scale: 0.9 }} className="text-center z-10">
                <Radio className="w-20 h-20 text-primary mx-auto mb-6 opacity-50" />
                <h3 className="text-2xl font-bold mb-8">{t('auto.auto_area_is_quiet__1949')}</h3>
                <div className="flex gap-4">
                  <button onClick={handleScan} className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl flex items-center gap-2 hover:scale-105 transition-transform">
                    <Radio className="w-5 h-5" /> {t('auto.auto_scan_for_drops_1948')}
                                                        </button>
                  <button className="px-8 py-4 bg-white/5 border border-white/10 font-bold rounded-2xl flex items-center gap-2 hover:bg-white/10 transition-colors">
                    <Archive className="w-5 h-5" /> {t('auto.auto_leave_drop_1947')}
                                                        </button>
                </div>
              </motion.div>
            )}

            {scanning && (
              <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center z-0">
                {/* Radar Waves */}
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-20 h-20 border-2 border-primary rounded-full"
                    animate={{ scale: [1, 8], opacity: [0.8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
                  />
                ))}
                <div className="z-10 text-center">
                  <Radio className="w-12 h-12 text-primary mx-auto animate-pulse mb-4" />
                  <p className="font-mono text-primary font-bold tracking-widest uppercase">{t('auto.auto_triangulating_signal_1946')}</p>
                </div>
              </motion.div>
            )}

            {found && (
              <motion.div key="found" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="z-10 w-full text-center">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/50">
                  <MapPin className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-2">{t('auto.auto_1_dead_drop_found_1945')}</h3>
                <p className="text-foreground/50 mb-8">{t('auto.auto_hidden_24_days_ago_b_1944')} <span className="text-emerald-400">{t('auto.auto__cybernomad_1943')}</span></p>

                <div className="bg-black/40 p-6 rounded-2xl border border-white/5 mb-8 max-w-sm mx-auto text-left relative overflow-hidden">
                  <div className="absolute top-3 right-3 text-white/20"><EyeOff className="w-5 h-5"/></div>
                  <p className="font-mono text-emerald-300 text-sm mb-2">{t('auto.auto_encrypted_message__1942')}</p>
                  <p className="italic text-foreground/80">
                    {t('auto.auto__if_you_re_reading_t_1941')}
                                                        </p>
                </div>

                <button onClick={() => setFound(false)} className="px-8 py-3 glass glass-hover rounded-xl font-bold">
                  {t('auto.auto_resume_scanning_1940')}
                                                  </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
