import React, { useState } from 'react';
import { Megaphone, Plus, Tag, Image as ImageIcon, Send, Clock, Activity } from 'lucide-react';

export default function PromotionsManager() {
  const [promotions, setPromotions] = useState([
    { id: '1', title: '50% off Tokyo City Tour', status: 'Active', impressions: 12400, clicks: 840, endsAt: '2026-06-01' },
    { id: '2', title: 'Free Dessert with Dinner Booking', status: 'Scheduled', impressions: 0, clicks: 0, endsAt: '2026-07-01' },
    { id: '3', title: 'Skip the line VIP Access', status: 'Ended', impressions: 45000, clicks: 3200, endsAt: '2026-04-15' }
  ]);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display">Advertisements & Promotions</h2>
          <p className="text-foreground/50 text-sm mt-1">Create and manage your sponsored content across the Aetheria network.</p>
        </div>
        <button onClick={() => setIsCreating(!isCreating)} className="px-5 py-2.5 bg-secondary text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-secondary/90 transition-colors shadow-[0_0_15px_rgba(var(--secondary-rgb),0.3)]">
          {isCreating ? 'Cancel' : <><Plus className="w-4 h-4"/> Create Ad Campaign</>}
        </button>
      </div>

      {isCreating && (
        <div className="glass p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary" />
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-secondary" />
            </div>
            <h3 className="text-xl font-bold">New Advertising Campaign</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
               <label className="text-xs font-semibold text-foreground/40 uppercase tracking-widest block mb-2">Headline</label>
               <input type="text" placeholder="e.g. 50% Off Sushi Making Class" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-secondary transition-colors" />
             </div>
             <div>
               <label className="text-xs font-semibold text-foreground/40 uppercase tracking-widest block mb-2">Target Audience Vibe</label>
               <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-secondary appearance-none cursor-pointer">
                 <option>Foodie & Culinary</option>
                 <option>Adventure & Outdoors</option>
                 <option>Relaxation & Spa</option>
                 <option>Culture & History</option>
                 <option>Nightlife & Entertainment</option>
               </select>
             </div>
             <div className="md:col-span-2">
               <label className="text-xs font-semibold text-foreground/40 uppercase tracking-widest block mb-2">Offer Description</label>
               <textarea placeholder="Describe your offer and terms..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-secondary h-28 resize-none transition-colors" />
             </div>
             <div>
               <label className="text-xs font-semibold text-foreground/40 uppercase tracking-widest block mb-2">Discount Badge Text</label>
               <input type="text" placeholder="e.g. 50% OFF" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-secondary transition-colors" />
             </div>
             <div>
               <label className="text-xs font-semibold text-foreground/40 uppercase tracking-widest block mb-2">Campaign Duration</label>
               <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-secondary appearance-none cursor-pointer">
                 <option>1 Week</option>
                 <option>2 Weeks</option>
                 <option>1 Month</option>
                 <option>Ongoing</option>
               </select>
             </div>
          </div>
          <div className="flex justify-end gap-3 mt-4 pt-6 border-t border-white/5">
            <button className="px-6 py-2.5 glass rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">Save as Draft</button>
            <button onClick={() => setIsCreating(false)} className="px-6 py-2.5 bg-secondary hover:bg-secondary/90 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(var(--secondary-rgb),0.3)]">
              <Send className="w-4 h-4"/> Publish Ad
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promotions.map(promo => (
          <div key={promo.id} className="glass p-6 rounded-3xl border border-white/5 flex flex-col justify-between group hover:border-secondary/30 transition-all">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Tag className="w-5 h-5 text-secondary" />
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-bold ${promo.status === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : promo.status === 'Scheduled' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20' : 'bg-foreground/10 text-foreground/50 border border-foreground/10'}`}>{promo.status}</span>
              </div>
              <h4 className="font-bold text-lg mb-2 leading-tight group-hover:text-secondary transition-colors">{promo.title}</h4>
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground/40 mb-6 uppercase tracking-widest">
                <Clock className="w-3 h-3"/> Ends {promo.endsAt}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <div className="bg-white/5 p-4 rounded-2xl text-center group-hover:bg-white/10 transition-colors">
                <Activity className="w-4 h-4 text-primary mx-auto mb-2 opacity-50" />
                <p className="font-bold text-xl">{promo.impressions.toLocaleString()}</p>
                <p className="text-[10px] text-foreground/40 uppercase tracking-widest mt-1">Impressions</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl text-center group-hover:bg-white/10 transition-colors">
                <Activity className="w-4 h-4 text-secondary mx-auto mb-2 opacity-50" />
                <p className="font-bold text-xl">{promo.clicks.toLocaleString()}</p>
                <p className="text-[10px] text-foreground/40 uppercase tracking-widest mt-1">Clicks</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
