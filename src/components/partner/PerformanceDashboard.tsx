import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Star, TrendingUp, Users, Eye } from 'lucide-react';
import { useTranslation } from "react-i18next";

const bookingData = [
  {day:'Mon',bookings:12},{day:'Tue',bookings:8},{day:'Wed',bookings:15},{day:'Thu',bookings:10},
  {day:'Fri',bookings:22},{day:'Sat',bookings:30},{day:'Sun',bookings:25},
];

const PerformanceDashboard: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold">{t('auto.auto___performance_dashbo_548')}</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        { icon: Star, label: 'Avg Rating', value: '4.8', color: 'text-yellow-400' },
        { icon: Users, label: 'Total Bookings', value: '284', color: 'text-primary' },
        { icon: Eye, label: 'Profile Views', value: '12.4k', color: 'text-blue-400' },
        { icon: TrendingUp, label: 'Conversion', value: '2.3%', color: 'text-green-400' },
      ].map((s, i) => (
        <div key={i} className="glass rounded-xl p-4">
          <s.icon className={`w-5 h-5 ${s.color} mb-2`}/>
          <p className="text-xl font-bold">{s.value}</p>
          <p className="text-xs text-foreground/40">{s.label}</p>
        </div>
      ))}
    </div>
    <div className="glass rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-foreground/40 uppercase tracking-widest mb-4">{t('auto.auto___weekly_bookings___547')}</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bookingData} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false}/>
            <XAxis dataKey="day" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false}/>
            <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false}/>
            <Tooltip contentStyle={{ backgroundColor:'#0f172a', border:'1px solid #ffffff10', borderRadius:'12px', fontSize:'12px' }} cursor={{ fill: '#ffffff08' }}/>
            <Bar dataKey="bookings" fill="#6366f1" radius={[6,6,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="glass rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-foreground/40 uppercase tracking-widest mb-3">{t('auto.auto___top_services___546')}</h3>
      {[
        { name:'AR Ghost Tour', pct:68 },
        { name:'Culinary Time Machine', pct:51 },
        { name:'AI Dream Trip', pct:34 },
      ].map((s, i) => (
        <div key={i} className="mb-3">
          <div className="flex justify-between text-sm mb-1"><span>{s.name}</span><span className="text-foreground/40">{s.pct}%</span></div>
          <div className="h-1.5 bg-white/10 rounded-full"><div className="h-1.5 bg-primary rounded-full" style={{width:`${s.pct}%`}}/></div>
        </div>
      ))}
    </div>
  </div>
);
export default PerformanceDashboard;
