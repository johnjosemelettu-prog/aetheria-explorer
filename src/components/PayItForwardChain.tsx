import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Link2, Coins } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function PayItForwardChain() {
    const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-pink-950 text-white p-8">
      <div className="max-w-4xl mx-auto text-center">
        <header className="mb-16">
          <div className="w-24 h-24 bg-pink-600/20 flex items-center justify-center rounded-full mx-auto mb-6">
             <Link2 className="w-12 h-12 text-pink-400 transform -rotate-45" />
          </div>
          <h1 className="text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-pink-600 tracking-tighter">{t('auto.auto_pay_it_forward_1988')}</h1>
          <p className="text-pink-200/80 mt-4 font-mono text-sm max-w-lg mx-auto">
            {t('auto.auto_you_just_received_a__1987')}
                                </p>
        </header>

        <div className="bg-pink-900/40 border border-pink-500/30 rounded-3xl p-12 max-w-2xl mx-auto mb-12 shadow-[0_0_50px_rgba(236,72,153,0.15)] relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50" />
           
           <Coffee className="w-16 h-16 text-pink-300 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]" />
           <div className="text-4xl font-display font-bold mb-2">{t('auto.auto_1_free_espresso_1986')}</div>
           <div className="text-pink-400 font-mono text-sm mb-8">{t('auto.auto___the_local_roaster__1985')}</div>

           <div className="bg-black/40 rounded-xl p-4 mb-8">
              <span className="text-pink-300 font-bold block mb-1">{t('auto.auto_current_chain_length_1984')}</span>
              <span className="text-xs text-white/50">{t('auto.auto_travelers_have_passe_1983')}</span>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <button className="bg-pink-500 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-pink-400 transition flex flex-col items-center justify-center gap-1">
                 <Coins className="w-5 h-5" />
                 {t('auto.auto_pay_it_forward___3_5_1982')}
                                        </button>
              <button className="bg-transparent border-2 border-pink-500/50 text-pink-300 font-bold py-4 rounded-xl hover:bg-pink-500/10 transition">
                 {t('auto.auto_claim_for_myself_1981')}
                                        </button>
           </div>
        </div>

        <div className="text-pink-500/50 font-mono text-xs opacity-80 hover:opacity-100 transition cursor-help">
          {t('auto.auto__paying_it_forward_g_1980')}
                          </div>
      </div>
    </div>
  );
}
