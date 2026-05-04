import React, { useState } from 'react';
import { Tag, MapPin, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnerPromotions() {
  const [promotions] = useState([
    { id: 1, type: 'Culinary', title: '50% off Tokyo City Tour', partner: 'Tokyo Explorers', location: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800', discount: '50% OFF', rating: 4.9 },
    { id: 2, type: 'Wellness', title: 'Free Massage with Spa Day', partner: 'Zen Kyoto Spa', location: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800', discount: 'FREE GIFT', rating: 4.8 },
    { id: 3, type: 'Adventure', title: '2-for-1 Scuba Diving', partner: 'Okinawa Deep Blue', location: 'Okinawa, Japan', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800', discount: '2 FOR 1', rating: 4.7 },
    { id: 4, type: 'Culture', title: 'VIP Access: Imperial Palace', partner: 'Heritage Tours', location: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&q=80&w=800', discount: '20% OFF', rating: 4.9 },
    { id: 5, type: 'Culinary', title: 'Complimentary Sake Tasting', partner: 'Gion Dining', location: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1615598914619-3f0f785b306a?auto=format&fit=crop&q=80&w=800', discount: 'FREE UPGRADE', rating: 4.8 },
    { id: 6, type: 'Retail', title: 'Tax-Free Shopping Pass', partner: 'Aetheria Retail', location: 'Osaka, Japan', image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=800', discount: 'TAX FREE', rating: 4.6 }
  ]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(var(--secondary-rgb),0.3)]">
          <Tag className="w-10 h-10 text-secondary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">Local Deals & Promotions</h1>
        <p className="text-xl text-foreground/60 max-w-2xl mx-auto">Discover exclusive offers and sponsored experiences from our verified local partners.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map((promo, i) => (
          <motion.div key={promo.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass rounded-3xl overflow-hidden border border-white/10 group cursor-pointer hover:border-secondary/50 hover:shadow-[0_10px_40px_rgba(var(--secondary-rgb),0.15)] transition-all">
            <div className="h-56 relative overflow-hidden">
              <img src={promo.image} alt={promo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              
              <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-secondary/20">
                {promo.discount}
              </div>
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold border border-white/10">
                {promo.type}
              </div>
              
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold mb-1 leading-tight group-hover:text-secondary transition-colors drop-shadow-md">{promo.title}</h3>
                <div className="flex items-center gap-2 text-xs text-white/80 drop-shadow-md">
                  <MapPin className="w-3 h-3"/> {promo.location}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">
                  {promo.partner.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-foreground/50 uppercase tracking-widest">Offered by</p>
                  <p className="text-sm font-bold">{promo.partner}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-sm font-bold">
                  <Star className="w-4 h-4 text-yellow-400 fill-current"/> {promo.rating}
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-secondary group-hover:gap-3 transition-all px-4 py-2 bg-secondary/10 rounded-xl group-hover:bg-secondary group-hover:text-white">
                  Claim Offer <ArrowRight className="w-4 h-4"/>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
