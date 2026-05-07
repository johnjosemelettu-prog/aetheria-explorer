import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from "react-i18next";

const initial = [
  { id:'s1', name:'AR Ghost Tour – Old Town', category:'Experience', price:'$49', status:'Active', bookings:38 },
  { id:'s2', name:'Culinary Time Machine – Kyoto', category:'Food & Culture', price:'$99', status:'Active', bookings:21 },
  { id:'s3', name:'AI Dream Trip Planner', category:'AI Service', price:'$199', status:'Draft', bookings:0 },
];

const ServiceListings: React.FC = () => {
    const { t } = useTranslation();
  const [listings, setListings] = useState(initial);
  const toggleStatus = (id: string) => setListings(ls => ls.map(l => l.id===id ? { ...l, status: l.status==='Active'?'Draft':'Active' } : l));
  const remove = (id: string) => setListings(ls => ls.filter(l => l.id!==id));
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{t('auto.auto_service_listings_3176')}</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl"><Plus className="w-4 h-4"/>{t('auto.auto_add_service_3175')}</button>
      </div>
      <div className="space-y-3">
        {listings.map(l => (
          <div key={l.id} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{l.name}</p>
              <p className="text-xs text-foreground/40">{l.category} · {l.price} · {l.bookings} {t('auto.auto_bookings_3174')}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${l.status==='Active'?'bg-green-500/20 text-green-400':'bg-white/10 text-foreground/40'}`}>{l.status}</span>
              <button onClick={()=>toggleStatus(l.id)} className="p-1.5 hover:text-primary transition-colors">{l.status==='Active'?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}</button>
              <button className="p-1.5 hover:text-blue-400 transition-colors"><Edit2 className="w-4 h-4"/></button>
              <button onClick={()=>remove(l.id)} className="p-1.5 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ServiceListings;
