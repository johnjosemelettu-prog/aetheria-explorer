import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Store, 
  Package, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Settings,
  ChevronRight,
  Clock,
  BarChart3
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import SynthesisIntel from './SynthesisIntel';
import VibeTrends from './VibeTrends';

const yieldData = [
  { name: 'Mon', yield: 400 },
  { name: 'Tue', yield: 300 },
  { name: 'Wed', yield: 500 },
  { name: 'Thu', yield: 280 },
  { name: 'Fri', yield: 590 },
  { name: 'Sat', yield: 800 },
  { name: 'Sun', yield: 700 },
];

export default function PartnerHub() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center">
          <Store className="text-secondary w-6 h-6" />
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold">Partner Hub</h1>
          <p className="text-foreground/50">Manage your travel services and fulfillment.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SynthesisIntel />
            <VibeTrends />
          </div>

          {/* Yield Monitoring Chart */}
          <section className="glass p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-display font-bold">Yield Monitoring</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest">
                  +12.5% vs Last Week
                </span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yieldData}>
                  <defs>
                    <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#ffffff20" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#ffffff20" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      border: '1px solid #ffffff10',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}
                    itemStyle={{ color: '#0ea5e9' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="yield" 
                    stroke="#0ea5e9" 
                    fillOpacity={1} 
                    fill="url(#colorYield)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="glass p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-display font-bold">Pending Orders</h2>
              <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-widest">
                4 New
              </span>
            </div>
            <div className="space-y-4">
              {[
                { id: 'ORD-8821', user: 'John Doe', service: 'Luxury SUV Transfer', status: 'Pending' },
                { id: 'ORD-8822', user: 'Jane Smith', service: 'Guided City Tour', status: 'In Progress' }
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl glass-hover group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                      <Package className="w-6 h-6 text-foreground/30" />
                    </div>
                    <div>
                      <p className="font-bold">{order.service}</p>
                      <p className="text-xs text-foreground/40">{order.user} • {order.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-secondary">{order.status}</span>
                    <ChevronRight className="w-4 h-4 text-foreground/20 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="glass p-8 rounded-3xl bg-gradient-to-br from-secondary/10 to-transparent border border-white/10">
            <h2 className="text-xl font-display font-bold mb-6">Partner Wallet</h2>
            <div className="mb-8">
              <span className="text-sm text-foreground/50 block mb-1">Total Earnings</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-display font-bold tracking-tighter">$12,840.00</span>
              </div>
            </div>
            <button className="w-full py-3 bg-white text-background rounded-xl font-bold hover:bg-white/90 transition-all">
              Withdraw Funds
            </button>
          </section>

          <section className="glass p-8 rounded-3xl">
            <h2 className="text-xl font-display font-bold mb-6">Vibe Feed</h2>
            <div className="spacey-4">
              <p className="text-sm text-foreground/60">Get a real-time pulse on what's hot. See what explorers are vibing with right now, and use this intel to curate your offerings.</p>
              <button className="text-sm font-bold text-primary">Learn More</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
