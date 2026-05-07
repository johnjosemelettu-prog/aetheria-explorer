import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users2, PenLine } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function CollaborativeTravelDiary() {
    const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-[#FDF8F0] text-stone-800 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 flex justify-between items-end border-b-2 border-stone-200 pb-6">
          <div>
            <h1 className="text-5xl font-serif font-bold italic text-stone-900 leading-tight">{t('auto.auto_the_kyoto_chronicle_821')}</h1>
            <p className="text-stone-500 mt-2 font-mono text-sm tracking-wide uppercase flex items-center gap-2">
              <Users2 className="w-4 h-4" /> {t('auto.auto_4_contributors___oct_820')}
                                      </p>
          </div>
          <button className="bg-stone-900 text-white font-bold py-3 px-6 rounded hover:bg-stone-800 flex items-center gap-3">
             <PenLine className="w-5 h-5" /> {t('auto.auto_write_entry_819')}
                                </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
           
           <div className="md:col-span-8 flex flex-col gap-12">
              <div className="flex gap-6">
                 <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center font-serif text-xl border-2 border-white shadow-md">E</div>
                    <div className="w-0.5 bg-stone-200 flex-1 mt-2 mb-2" />
                 </div>
                 <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm flex-1">
                    <div className="text-xs font-mono text-stone-400 mb-4">{t('auto.auto_october_14__09_30_am_818')}</div>
                    <p className="font-serif text-lg leading-relaxed text-stone-700">
                      {t('auto.auto_we_woke_up_before_da_817')}
                                                      </p>
                 </div>
              </div>

              <div className="flex gap-6">
                 <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-sky-200 rounded-full flex items-center justify-center font-serif text-xl border-2 border-white shadow-md">M</div>
                    <div className="w-0.5 bg-stone-200 flex-1 mt-2 mb-2" />
                 </div>
                 <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm flex-1">
                    <div className="text-xs font-mono text-stone-400 mb-4">{t('auto.auto_october_14__14_15_pm_816')}</div>
                    <p className="font-serif text-lg leading-relaxed text-stone-700 mb-6">
                      {t('auto.auto_found_this_tiny_matc_815')}
                                                      </p>
                    <div className="h-48 bg-stone-100 rounded flex items-center justify-center border border-stone-200/50">
                       <span className="text-stone-400 font-mono text-sm">{t('auto.auto__attached_photo__mat_814')}</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="md:col-span-4 space-y-6">
              <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
                 <h3 className="font-bold text-stone-900 mb-4 font-serif text-xl">{t('auto.auto_the_fellowship_813')}</h3>
                 <ul className="space-y-3 font-medium text-stone-600">
                    <li className="flex items-center justify-between">{t('auto.auto_elena_812')} <span className="font-mono text-xs bg-stone-100 px-2 rounded">{t('auto.auto_editor_811')}</span></li>
                    <li className="flex items-center justify-between">{t('auto.auto_marco_810')} <span className="font-mono text-xs bg-emerald-100 text-emerald-700 px-2 rounded">{t('auto.auto_online_809')}</span></li>
                    <li className="flex items-center justify-between">{t('auto.auto_sarah_808')} <span className="font-mono text-xs bg-stone-100 px-2 rounded">{t('auto.auto_offline_807')}</span></li>
                    <li className="flex items-center justify-between">{t('auto.auto_david_806')} <span className="font-mono text-xs bg-stone-100 px-2 rounded">{t('auto.auto_offline_805')}</span></li>
                 </ul>
              </div>
              <div className="bg-stone-900 text-[#FDF8F0] border border-stone-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
                 <BookOpen className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5" />
                 <h3 className="font-bold mb-2 font-serif text-xl">{t('auto.auto_print_physical_book_804')}</h3>
                 <p className="text-sm text-stone-400 mb-4">{t('auto.auto_when_your_trip_concl_803')}</p>
                 <button className="w-full bg-[#FDF8F0] text-stone-900 font-bold py-2 rounded transition hover:bg-white">{t('auto.auto_preview_book_802')}</button>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
