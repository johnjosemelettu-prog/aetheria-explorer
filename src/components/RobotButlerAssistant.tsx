import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart, Zap, Globe } from 'lucide-react';

export default function RobotButlerAssistant() {
  const stats = [
    { label: "Authenticity", value: "98%", icon: Activity, color: "text-purple-500", bg: "bg-purple-100" },
    { label: "Local Connections", value: "14", icon: Globe, color: "text-teal-500", bg: "bg-teal-100" },
    { label: "Cultural Growth", value: "+42%", icon: Zap, color: "text-rose-500", bg: "bg-rose-100" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8 lg:p-12 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tight mb-2">Robot Butler</h1>
          <p className="text-slate-500">Advanced metrics and insights for your journey.</p>
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
             <h3 className="text-xl font-bold text-slate-700 mb-2">Synthesizing Experiences</h3>
             <p className="text-slate-400 max-w-sm mx-auto">Your immersive journey is currently being analyzed and structured.</p>
           </div>
        </div>
      </div>
    </div>
  );
}