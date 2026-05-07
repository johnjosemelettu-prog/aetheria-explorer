import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Award } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function LocalFoodBingo() {
    const { t } = useTranslation();
  const items = [
    { name: "Takoyaki", done: true }, { name: "Okonomiyaki", done: true }, { name: "Matcha Ice Cream", done: false },
    { name: "Yakisoba", done: false }, { name: "Kushikatsu", done: true }, { name: "Taiyaki", done: false },
    { name: "Ramen", done: true }, { name: "FREE SPACE", done: true }, { name: "Udon", done: false },
    { name: "Yakiniku", done: false }, { name: "Sashimi", done: true }, { name: "Mochi", done: false },
    { name: "Curry", done: false }, { name: "Gyoza", done: true }, { name: "Tonkatsu", done: false },
  ];

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <Utensils className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h1 className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-600 uppercase">{t('auto.auto_local_food_bingo_1731')}</h1>
          <p className="text-stone-400 mt-2 font-mono">{t('auto.auto_osaka_culinary_editi_1730')}</p>
        </header>

        <div className="bg-stone-800 border-4 border-stone-700/50 p-6 rounded-3xl shadow-2xl relative">
          <div className="absolute -top-4 -right-4 bg-amber-500 text-stone-900 font-bold p-3 rounded-full shadow-xl flex gap-1">
             <Award className="w-5 h-5" /> {t('auto.auto_reward__250_xp_1729')}
                                </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {items.map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className={`aspect-square rounded-2xl flex items-center justify-center text-center p-3 font-bold text-sm cursor-pointer border-2 transition-all ${
                  item.done 
                  ? 'bg-amber-500 text-stone-900 border-amber-400 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]'
                  : 'bg-stone-900 border-stone-700 text-stone-400 hover:border-amber-500/50'
                }`}
              >
                {item.done ? (
                   <span className="line-through decoration-stone-900/50 decoration-2">{item.name}</span>
                ) : (
                   item.name
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center text-stone-500 font-mono text-sm">
          {t('auto.auto_snap_a_photo_of_the__1728')}
                          </div>
      </div>
    </div>
  );
}
