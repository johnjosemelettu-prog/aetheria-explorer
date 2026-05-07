import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, ScrollText } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function TravelStoryContest() {
    const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-amber-950 text-amber-50 p-8 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <ScrollText className="w-16 h-16 text-amber-500 mx-auto mb-6" />
          <h1 className="text-6xl font-serif font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-amber-600 mb-4">{t('auto.auto_the_narrators_2827')}</h1>
          <p className="font-mono text-sm text-amber-300/60 uppercase tracking-widest">
             {t('auto.auto_weekly_non_fiction_t_2826')}
                                </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           
           <div className="md:col-span-2 bg-black/40 backdrop-blur border border-amber-500/30 p-10 rounded-2xl">
              <div className="text-amber-500 font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                 <Trophy className="w-4 h-4" /> {t('auto.auto_current_top_ranked_2825')}
                                        </div>
              <h2 className="text-4xl font-serif font-bold italic text-amber-100 mb-6">{t('auto.auto_midnight_on_the_tran_2824')}</h2>
              <p className="font-serif leading-relaxed text-amber-100/80 text-lg mb-8">
                {t('auto.auto_the_radiator_hissed__2823')}
                                        </p>
              <div className="flex justify-between items-center border-t border-amber-500/20 pt-6">
                 <span className="font-mono text-amber-500/80 text-sm">{t('auto.auto_by__winternomad___12_2822')}</span>
                 <button className="bg-transparent border border-amber-500 text-amber-400 py-2 px-6 rounded hover:bg-amber-500/10 transition">{t('auto.auto_read_full_entry_2821')}</button>
              </div>
           </div>

           <div className="space-y-6">
              <div className="bg-amber-500 text-amber-950 p-6 rounded-2xl shadow-xl hover:scale-105 transition cursor-pointer">
                 <BookOpen className="w-8 h-8 mb-4 border-b border-amber-950/20 pb-2 w-full" />
                 <h3 className="font-bold text-xl mb-2">{t('auto.auto_submit_your_draft_2820')}</h3>
                 <p className="text-sm font-medium opacity-80 mb-4">{t('auto.auto_prompt___a_meal_that_2819')}</p>
                 <div className="text-xs font-mono bg-amber-950/10 inline-block px-2 py-1 rounded">{t('auto.auto_2_days_remaining_2818')}</div>
              </div>

              <div className="bg-black/40 backdrop-blur border border-amber-500/30 p-6 rounded-2xl">
                 <h3 className="font-bold text-amber-300 mb-4 uppercase text-xs tracking-widest">{t('auto.auto_previous_winners_2817')}</h3>
                 <ul className="space-y-4 font-serif text-amber-100/70">
                   <li className="border-b border-amber-500/20 pb-2 hover:text-amber-400 cursor-pointer">{t('auto.auto__lost_in_the_souk__2816')}</li>
                   <li className="border-b border-amber-500/20 pb-2 hover:text-amber-400 cursor-pointer">{t('auto.auto__the_silent_monk__2815')}</li>
                   <li className="border-b border-amber-500/20 pb-2 hover:text-amber-400 cursor-pointer">{t('auto.auto__coffee_in_sarajevo__2814')}</li>
                 </ul>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
