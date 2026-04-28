import React, { useState } from 'react';
import { Store, BarChart2, Calendar, List, Users, TrendingUp, Activity } from 'lucide-react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import SynthesisIntel from './SynthesisIntel';
import VibeTrends from './VibeTrends';
import BookingManager from './partner/BookingManager';
import PartnerFinancialsDashboard from './partner/FinancialsDashboard';
import VibeFeed from './partner/VibeFeed';
import ServiceListings from './partner/ServiceListings';
import PerformanceDashboard from './partner/PerformanceDashboard';
import CommunityTools from './partner/CommunityTools';

const yieldData = [
  { name: 'Mon', yield: 400 },{ name: 'Tue', yield: 300 },{ name: 'Wed', yield: 500 },
  { name: 'Thu', yield: 280 },{ name: 'Fri', yield: 590 },{ name: 'Sat', yield: 800 },{ name: 'Sun', yield: 700 },
];

const tabs = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'services', label: 'Services', icon: List },
  { id: 'financials', label: 'Financials', icon: TrendingUp },
  { id: 'performance', label: 'Performance', icon: BarChart2 },
  { id: 'community', label: 'Community', icon: Users },
];

export default function PartnerHub() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center">
          <Store className="text-secondary w-6 h-6" />
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold">Partner Hub</h1>
          <p className="text-foreground/50">Manage your travel services and grow your business.</p>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
              activeTab === t.id ? 'bg-secondary/20 text-secondary' : 'text-foreground/50 hover:text-white hover:bg-white/5'
            }`}>
            <t.icon className="w-4 h-4"/>{t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SynthesisIntel />
              <VibeTrends />
            </div>
            <section className="glass p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-display font-bold">Yield Monitoring</h2>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest">+12.5% vs Last Week</span>
              </div>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={yieldData}>
                    <defs>
                      <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false}/>
                    <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false}/>
                    <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} tickFormatter={v => `$${v}`}/>
                    <Tooltip contentStyle={{ backgroundColor:'#0f172a', border:'1px solid #ffffff10', borderRadius:'12px', fontSize:'12px' }} itemStyle={{ color:'#0ea5e9' }}/>
                    <Area type="monotone" dataKey="yield" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorYield)" strokeWidth={2}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>
            <BookingManager />
          </div>
          <div className="space-y-8">
            <PartnerFinancialsDashboard />
            <VibeFeed />
          </div>
        </div>
      )}
      {activeTab === 'bookings' && <BookingManager />}
      {activeTab === 'services' && <div className="glass rounded-2xl p-6"><ServiceListings /></div>}
      {activeTab === 'financials' && <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"><PartnerFinancialsDashboard /><VibeFeed /></div>}
      {activeTab === 'performance' && <div className="glass rounded-2xl p-6"><PerformanceDashboard /></div>}
      {activeTab === 'community' && <div className="glass rounded-2xl p-6"><CommunityTools /></div>}
    </div>
  );
}
