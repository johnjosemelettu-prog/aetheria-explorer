import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, Map, MessageCircle, Calendar } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function Guide() {
    const { t } = useTranslation();
  const GUIDES = [
    { id: 1, name: 'Hiroshi T.', type: 'History Buff', rating: 4.9, reviews: 128, img: 'https://i.pravatar.cc/150?u=hiroshi' },
    { id: 2, name: 'Yumi K.', type: 'Nightlife Expert', rating: 5.0, reviews: 342, img: 'https://i.pravatar.cc/150?u=yumi' },
    { id: 3, name: 'Kenji M.', type: 'Culinary Master', rating: 4.8, reviews: 89, img: 'https://i.pravatar.cc/150?u=kenji' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h1 className="text-5xl font-display font-bold mb-4 flex items-center gap-4">
            <ShieldCheck className="w-10 h-10 text-emerald-400" />
            {t('auto.auto_trusted_guides_1458')}
                                </h1>
          <p className="text-foreground/60 text-lg max-w-xl">
            {t('auto.auto_connect_with_verifie_1457')}
                                </p>
        </div>
        <div className="relative">
           <input 
             type="text" 
             placeholder={t('auto.auto_search_specialties___1456')}
             className="bg-white/5 border border-white/10 py-3 px-6 rounded-full w-64 focus:outline-none focus:border-emerald-500/50"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GUIDES.map((guide, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            key={guide.id} 
            className="glass p-6 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-colors group"
          >
            <div className="flex items-center gap-4 mb-6">
              <img src={guide.img} alt={guide.name} className="w-20 h-20 rounded-full border-2 border-emerald-500/50 object-cover" />
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {guide.name} <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </h2>
                <p className="text-emerald-400 text-sm font-mono uppercase tracking-widest">{guide.type}</p>
              </div>
            </div>

            <div className="flex gap-4 mb-6 text-sm">
              <div className="bg-black/40 px-3 py-1.5 rounded-lg flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {guide.rating} ({guide.reviews})
              </div>
              <div className="bg-black/40 px-3 py-1.5 rounded-lg flex items-center gap-1 text-foreground/60">
                <Map className="w-4 h-4" /> {t('auto.auto_local_1455')}
                                      </div>
            </div>

            <p className="text-foreground/70 text-sm mb-8 line-clamp-3">
              {t('auto.auto__i_specialize_in_sho_1454')}
                                </p>

            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                <MessageCircle className="w-4 h-4" /> {t('auto.auto_chat_1453')}
                                      </button>
              <button className="py-3 bg-emerald-500 hover:bg-emerald-600 text-black rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                <Calendar className="w-4 h-4" /> {t('auto.auto_book_1452')}
                                      </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
