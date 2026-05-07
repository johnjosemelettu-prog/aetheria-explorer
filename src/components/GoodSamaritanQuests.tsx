import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Leaf, Trash2 } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function GoodSamaritanQuests() {
    const { t } = useTranslation();
  const quests = [
    { title: "Beach Cleanup", loc: "Kamakura Coast", xp: 500, icon: <Trash2 /> },
    { title: "Help a Tourist", loc: "Central Station", xp: 150, icon: <HeartHandshake /> },
    { title: "Water the Community Garden", loc: "Shinjuku Park", xp: 100, icon: <Leaf /> }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <HeartHandshake className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h1 className="text-6xl font-display font-black text-stone-800 tracking-tighter mix-blend-multiply">{t('auto.auto_samaritan_quests_1420')}</h1>
          <p className="text-stone-500 mt-6 font-mono max-w-xl mx-auto">
            {t('auto.auto_leave_the_world_bett_1419')}
                                </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-rose-500 p-8 rounded-3xl text-white shadow-xl flex flex-col justify-between">
              <div>
                 <div className="text-rose-200 font-bold tracking-widest text-sm mb-2">{t('auto.auto_karma_balance_1418')}</div>
                 <div className="text-6xl font-display font-black mb-4">4,250</div>
                 <p className="text-rose-100 font-mono text-sm max-w-[250px]">
                   {t('auto.auto_you_are_in_the_top_5_1417')}
                                               </p>
              </div>
              <button className="bg-white text-rose-600 font-bold py-3 px-6 rounded-full mt-8 self-start hover:bg-stone-100 transition shadow-lg">
                {t('auto.auto_redeem_karma_1416')}
                                        </button>
           </div>

           <div className="space-y-4">
              <h3 className="font-bold text-stone-400 uppercase tracking-widest text-sm pl-2">{t('auto.auto_available_nearby_1415')}</h3>
              {quests.map((q, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border border-stone-200 p-4 rounded-2xl flex items-center justify-between shadow-sm cursor-pointer hover:border-rose-400 transition"
                >
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-rose-500">
                        {q.icon}
                      </div>
                      <div>
                         <h4 className="font-bold text-stone-800">{q.title}</h4>
                         <p className="text-xs text-stone-500 font-mono">{q.loc}</p>
                      </div>
                   </div>
                   <div className="bg-rose-50 text-rose-600 font-bold py-1 px-3 rounded text-sm">
                      +{q.xp}
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
