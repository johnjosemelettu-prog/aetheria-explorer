import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame } from 'lucide-react';
import { useRead } from '../hooks/useRead';
import { useTranslation } from "react-i18next";

interface VibeTrend {
    name: string;
    current: number;
    last: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    const { t } = useTranslation();
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-lg">
        <p className="font-bold text-lg text-primary">{label}</p>
        <p className="text-sm text-cyan-400">{t('auto.auto_current_vibe_score__2916')} {payload[0].value}</p>
        <p className="text-sm text-foreground/50">{t('auto.auto_last_week__2915')} {payload[0].payload.last}</p>
        <p className={`text-xs font-bold mt-2 ${payload[0].value > payload[0].payload.last ? 'text-green-400' : 'text-red-400'}`}>
          {t('auto.auto_change__2914')} {payload[0].value - payload[0].payload.last > 0 ? '+' : ''}{payload[0].value - payload[0].payload.last}
        </p>
      </div>
    );
  }
  return null;
};

export default function VibeTrends() {
    const { t } = useTranslation();
  const { data, loading } = useRead('vibe_trends');
  const vibeData = data as VibeTrend[] | null;

  return (
    <section className="glass p-8 rounded-3xl col-span-1">
       <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold">{t('auto.auto_vibe_trends_2913')}</h2>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-widest">
          <Flame className="w-3 h-3" /> {t('auto.auto_hot_2912')}
                          </div>
      </div>
      <div className="h-[150px] w-full">
        {loading || !vibeData ? (
            <div className="h-full w-full animate-pulse flex items-end gap-2 px-4">
                <div className="w-1/5 h-3/4 bg-slate-700/50 rounded-t-lg"></div>
                <div className="w-1/5 h-full bg-slate-700/50 rounded-t-lg"></div>
                <div className="w-1/5 h-2/3 bg-slate-700/50 rounded-t-lg"></div>
                <div className="w-1/5 h-1/2 bg-slate-700/50 rounded-t-lg"></div>
                <div className="w-1/5 h-3/4 bg-slate-700/50 rounded-t-lg"></div>
            </div>
        ) : (
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={vibeData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: '#ffffff05'}} content={<CustomTooltip />} />
                <Bar dataKey="current" fill="#22d3ee" radius={[4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
