import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart, Zap, Globe } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function TransportCO2Comparison() {
    const { t } = useTranslation();
  const stats = [
    { label: "Today's Insights", value: "84%", icon: Activity, color: "text-blue-500", bg: "bg-blue-100" },
    { label: "Global Reach", value: "1.2k", icon: Globe, color: "text-emerald-500", bg: "bg-emerald-100" },
    { label: "Efficiency", value: "+24%", icon: Zap, color: "text-amber-500", bg: "bg-amber-100" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8 lg:p-12 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tight mb-2">{t('auto.auto_public_transport_co2_2649')}</h1>
          <p className="text-slate-500">{t('auto.auto_monitor_your_journey_2648')}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 min-h-[400px] flex items-center justify-center">
           <div className="text-center">
             <BarChart className="w-16 h-16 text-slate-200 mx-auto mb-4" />
             <h3 className="text-xl font-bold text-slate-700 mb-2">{t('auto.auto_analyzing_data_strea_2647')}</h3>
             <p className="text-slate-400 max-w-sm mx-auto">{t('auto.auto_advanced_visualizati_2646')}</p>
           </div>
        </div>
      </div>
    </div>
  );
}