import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, PersonStanding, Bike, Car, BatteryCharging } from 'lucide-react';

const OPTIONS = [
  { id: 'walk', name: 'Walk', icon: PersonStanding, time: '12 mins', cost: 'Free', eco: true, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
  { id: 'scooter', name: 'E-Scooter', icon: Bike, time: '4 mins', cost: '$2.50', eco: true, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30', battery: '84%' },
  { id: 'taxi', name: 'Local Taxi', icon: Car, time: '6 mins', cost: '$8.00', eco: false, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' }
];

export default function LastMileTransitSolver() {
  const [selected, setSelected] = useState('scooter');

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-12">
        <Navigation className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
        <h1 className="text-5xl font-display font-bold mb-4">Last-Mile Solver</h1>
        <p className="text-foreground/60 text-lg">You've arrived at the station. How do you want to cover the final 800 meters to your destination?</p>
      </div>

      <div className="glass p-8 rounded-[40px] border border-white/10 relative overflow-hidden">
        {/* Fake Map Section */}
        <div className="h-48 bg-neutral-900 rounded-3xl mb-8 relative border border-white/5 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:2rem_2rem]" />
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-indigo-500 rounded-full shadow-[0_0_20px_#6366f1]" />
          <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-rose-500 rounded-full shadow-[0_0_20px_#f43f5e] flex items-center justify-center">
             <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))' }}>
            <path d="M 200,50 L 300,50 L 300,150 L 500,150" fill="transparent" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeDasharray="5 5" />
          </svg>
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 flex items-center gap-2">
            <MapPin className="w-3 h-3 text-rose-400" /> Destination: The Hidden Shrine
          </div>
        </div>

        <div className="space-y-4">
          {OPTIONS.map(opt => (
            <div 
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${selected === opt.id ? opt.bg : 'glass border-white/5 hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-black/40 ${opt.color}`}>
                  <opt.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">{opt.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-foreground/50">
                    <span className="flex items-center gap-1">{opt.eco && <span className="text-emerald-400">Eco-friendly</span>}</span>
                    {opt.battery && <span className="flex items-center gap-1"><BatteryCharging className="w-3 h-3"/> {opt.battery}</span>}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">{opt.time}</div>
                <div className="text-sm text-foreground/50">{opt.cost}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-4 bg-indigo-500 text-white font-bold rounded-2xl mt-8 hover:bg-indigo-600 transition-colors">
          Confirm {OPTIONS.find(o => o.id === selected)?.name} Route
        </button>
      </div>
    </div>
  );
}
