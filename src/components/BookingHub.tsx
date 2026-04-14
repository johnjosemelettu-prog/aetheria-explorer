import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Hotel, Ship, Search, MapPin, Calendar, Bus, Car, Utensils, Star, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { usePremiumStatus } from '../hooks/usePremiumStatus';
import SubscriptionManager from './SubscriptionManager';

type BookingType = 'flight' | 'hotel' | 'cruise' | 'bus' | 'cab' | 'dining';

export default function BookingHub() {
  const [activeTab, setActiveTab] = useState<BookingType>('flight');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const { isPremium } = usePremiumStatus();

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call to various booking services
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResults = {
      flight: [
        { id: 1, title: 'Tokyo Direct', price: 850, rating: 4.8, detail: '12h 30m • Aetheria Air' },
        { id: 2, title: 'Paris via Dubai', price: 720, rating: 4.5, detail: '15h 45m • Sky Synthesis' },
      ],
      hotel: [
        { id: 1, title: 'Neon Palace Tokyo', price: 250, rating: 4.9, detail: 'Shinjuku • Free WiFi' },
        { id: 2, title: 'The Glass House', price: 180, rating: 4.7, detail: 'Ginza • Breakfast Included' },
      ],
      cruise: [
        { id: 1, title: 'Mediterranean Odyssey', price: 1200, rating: 4.9, detail: '7 Days • All Inclusive' },
        { id: 2, title: 'Nordic Synthesis', price: 1500, rating: 4.8, detail: '10 Days • Excursions Included' },
      ],
      bus: [
        { id: 1, title: 'City Express', price: 25, rating: 4.2, detail: '2h 15m • Direct Route' },
        { id: 2, title: 'Scenic Route Coach', price: 35, rating: 4.6, detail: '3h 30m • Panoramic Views' },
      ],
      cab: [
        { id: 1, title: 'Aetheria Premium', price: 45, rating: 4.9, detail: 'Luxury Sedan • 15 mins away' },
        { id: 2, title: 'Eco Ride', price: 30, rating: 4.7, detail: 'Electric Vehicle • 5 mins away' },
      ],
      dining: [
        { id: 1, title: 'The Floating Garden', price: 120, rating: 4.9, detail: 'Fine Dining • Table for 2 Available' },
        { id: 2, title: 'Neon Noodle Bar', price: 40, rating: 4.5, detail: 'Casual • Walk-ins Welcome' },
      ]
    };

    setResults(mockResults[activeTab]);
    setIsSearching(false);
  };

  const bookingOptions = [
    { id: 'flight', icon: Plane, label: 'Flights' },
    { id: 'hotel', icon: Hotel, label: 'Hotels' },
    { id: 'cruise', icon: Ship, label: 'Cruises' },
    { id: 'bus', icon: Bus, label: 'Bus' },
    { id: 'cab', icon: Car, label: 'Cab' },
    { id: 'dining', icon: Utensils, label: 'Dining' }
  ];


  return (
    <section className="glass p-8 rounded-[32px] overflow-hidden">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center">
          <Search className="text-primary w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold">Booking Hub</h2>
          <p className="text-sm text-foreground/50">Global booking engine.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 p-1.5 glass rounded-2xl w-fit">
        {bookingOptions.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as BookingType);
              setResults(null);
            }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
              activeTab === tab.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-foreground/50 hover:text-foreground hover:bg-white/5"
            )}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
          <input 
            type="text" 
            placeholder="Destination or Location..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
          <input 
            type="text" 
            placeholder="Dates or Time..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <button 
          onClick={handleSearch}
          disabled={isSearching}
          className="bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          Search
        </button>
      </div>

      <AnimatePresence mode="wait">
        {results ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {results.map((item) => (
              <div key={item.id} className="glass p-6 rounded-3xl border border-white/5 hover:border-primary/30 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-foreground/40">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      {item.rating} • {item.detail}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-display font-bold text-primary">${item.price}</div>
                    <div className="text-[10px] text-foreground/30 uppercase font-bold">
                      {activeTab === 'dining' ? 'Est. Total' : 'Per Person'}
                    </div>
                  </div>
                </div>
                {isPremium ? (
                  <button className="w-full py-3 bg-white/5 hover:bg-primary hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                    Book Now
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <div className="mt-4">
                     <SubscriptionManager />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        ) : !isSearching && (
          <div className="py-12 text-center glass rounded-3xl border-dashed border-2 border-white/5">
            <Search className="w-12 h-12 text-foreground/10 mx-auto mb-4" />
            <p className="text-sm text-foreground/40">Enter details to explore {activeTab} options.</p>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
