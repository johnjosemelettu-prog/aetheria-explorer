import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Droplets, Leaf, Coffee, Beaker, Fingerprint } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function FlavorDNA() {
    const { t } = useTranslation();
  const FLAVORS = [
    { name: 'Umami', value: 92, icon: Beaker, color: 'text-purple-400', bg: 'bg-purple-400' },
    { name: 'Spicy', value: 78, icon: Flame, color: 'text-red-500', bg: 'bg-red-500' },
    { name: 'Sweet', value: 45, icon: Droplets, color: 'text-pink-400', bg: 'bg-pink-400' },
    { name: 'Bitter', value: 65, icon: Coffee, color: 'text-amber-700', bg: 'bg-amber-700' },
    { name: 'Sour', value: 30, icon: Leaf, color: 'text-lime-400', bg: 'bg-lime-400' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <Fingerprint className="w-16 h-16 text-rose-500 mx-auto mb-6" />
        <h1 className="text-5xl font-display font-bold mb-4">{t('auto.auto_flavor_dna_1287')}</h1>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          {t('auto.auto_your_unique_taste_pr_1286')}
                          </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="glass p-12 rounded-[40px] border border-white/10 flex items-center justify-center min-h-[400px] relative">
           {/* Abstract Radar Chart Placeholder */}
           <div className="relative w-64 h-64 border-4 border-white/10 rounded-full flex items-center justify-center">
             <div className="absolute w-48 h-48 border-2 border-white/5 rounded-full" />
             <div className="absolute w-32 h-32 border border-white/5 rounded-full" />
             
             {/* Fake polygon for radar */}
             <svg className="absolute inset-0 w-full h-full overflow-visible z-10" viewBox="0 0 100 100">
               <motion.polygon 
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 1, type: 'spring' }}
                 points="50,5 90,40 75,90 25,90 10,40" 
                 fill="rgba(244, 63, 94, 0.3)" 
                 stroke="#f43f5e" 
                 strokeWidth="2" 
               />
             </svg>

             {/* Labels */}
             <div className="absolute -top-8 text-sm font-bold text-purple-400">{t('auto.auto_umami_1285')}</div>
             <div className="absolute -right-12 top-1/3 text-sm font-bold text-red-500">{t('auto.auto_spicy_1284')}</div>
             <div className="absolute -bottom-8 right-8 text-sm font-bold text-pink-400">{t('auto.auto_sweet_1283')}</div>
             <div className="absolute -bottom-8 left-8 text-sm font-bold text-lime-400">{t('auto.auto_sour_1282')}</div>
             <div className="absolute -left-12 top-1/3 text-sm font-bold text-amber-600">{t('auto.auto_bitter_1281')}</div>
           </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-6">{t('auto.auto_profile_breakdown_1280')}</h3>
          
          {FLAVORS.map((flavor, i) => (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              key={flavor.name}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <flavor.icon className={`w-4 h-4 ${flavor.color}`} />
                  <span className="font-bold">{flavor.name}</span>
                </div>
                <span className="font-mono text-sm">{flavor.value}%</span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${flavor.value}%` }} transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full ${flavor.bg}`} 
                />
              </div>
            </motion.div>
          ))}

          <div className="mt-8 p-6 bg-rose-500/10 border border-rose-500/30 rounded-2xl">
            <h4 className="font-bold text-rose-400 mb-2">{t('auto.auto_insight_1279')}</h4>
            <p className="text-sm text-foreground/70">{t('auto.auto_your_high_umami_and__1278')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
