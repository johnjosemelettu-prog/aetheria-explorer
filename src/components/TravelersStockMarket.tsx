import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function TravelersStockMarket() {
    const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-8">
      <div className="max-w-6xl mx-auto">
         <header className="mb-12 flex justify-between items-center">
           <div>
             <h1 className="text-3xl sm:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-sky-500 uppercase tracking-tighter">{t('auto.auto_experience_exchange_2743')}</h1>
             <p className="font-mono mt-2 text-xs sm:text-sm text-slate-500"><BarChart3 className="inline w-4 h-4 mr-1"/> {t('auto.auto_speculate_on_destina_2742')}</p>
           </div>
           <div className="text-right bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">{t('auto.auto_portfolio_value_2741')}</div>
              <div className="text-2xl font-mono text-emerald-400">{t('auto.auto_14_250_aeth_2740')}</div>
           </div>
         </header>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur rounded-3xl border border-slate-800 p-6 flex flex-col justify-center items-center h-[500px] relative">
               <div className="absolute top-6 left-6 text-xl font-bold text-white flex items-center gap-2">
                 {t('auto.auto__tky__tokyo__2739')} <span className="text-emerald-400 text-xs px-2 py-1 bg-emerald-400/10 rounded">+4.2%</span>
               </div>
               {/* Mock graph */}
               <svg className="w-full h-64" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    d="M0,80 Q10,75 20,60 T40,50 T60,20 T80,30 T100,10" 
                    fill="none" 
                    stroke="rgba(52, 211, 153, 0.8)" 
                    strokeWidth="1" 
                  />
                  <path d="M0,80 Q10,75 20,60 T40,50 T60,20 T80,30 T100,10 L100,100 L0,100 Z" fill="url(#grad)" />
                  <defs>
                    <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="rgba(52, 211, 153, 0.2)" />
                      <stop offset="100%" stopColor="rgba(52, 211, 153, 0)" />
                    </linearGradient>
                  </defs>
               </svg>
               
               <div className="absolute bottom-6 inset-x-6 flex gap-4">
                  <button className="flex-1 bg-emerald-500 text-black font-bold py-3 rounded-xl hover:bg-emerald-400 transition">{t('auto.auto_buy__tky_2738')}</button>
                  <button className="flex-1 bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-700 border border-slate-700 transition">{t('auto.auto_sell_2737')}</button>
               </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur rounded-3xl border border-slate-800 p-6">
               <h3 className="font-bold text-white mb-6 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-400"/> {t('auto.auto_rising_markets_2736')}</h3>
               <div className="space-y-4 font-mono text-sm">
                  {[
                    { ticker: "$SEO", name: "Seoul", change: "+12.4%", up: true },
                    { ticker: "$KTM", name: "Kathmandu", change: "+8.1%", up: true },
                    { ticker: "$CDMX", name: "Mexico City", change: "+5.2%", up: true },
                    { ticker: "$BCN", name: "Barcelona", change: "-2.1%", up: false },
                    { ticker: "$VCE", name: "Venice", change: "-4.5%", up: false }
                  ].map((market, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-slate-800 pb-3">
                       <div>
                         <span className="text-white font-bold">{market.ticker}</span>
                         <span className="text-slate-500 ml-2">{market.name}</span>
                       </div>
                       <span className={market.up ? 'text-emerald-400' : 'text-red-400'}>{market.change}</span>
                    </div>
                  ))}
               </div>
               <p className="mt-8 text-xs text-slate-500 leading-relaxed">
                 {t('auto.auto__market_values_are_d_2735')}
                                         </p>
            </div>
         </div>
      </div>
    </div>
  );
}
