import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, Hotel, Ship, Search, MapPin, Calendar, Users, ArrowRight, Star, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

type BookingType = 'flight' | 'hotel' | 'cruise';

export default function BookingHub() {
  const [activeTab, setActiveTab] = useState<BookingType>('flight');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call to Amadeus/Booking.com
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResults = {
      flight: [
        { id: 1, title: 'Tokyo Direct', price: 850, rating: 4.8, time: '12h 30m', airline: 'Aetheria Air' },
        { id: 2, title: 'Paris via Dubai', price: 720, rating: 4.5, time: '15h 45m', airline: 'Sky Synthesis' },
      ],
      hotel: [
        { id: 1, title: 'Neon Palace Tokyo', price: 250, rating: 4.9, location: 'Shinjuku' },
        { id: 2, title: 'The Glass House', price: 180, rating: 4.7, location: 'Ginza' },
      ],
      cruise: [
        { id: 1, title: 'Mediterranean Odyssey', price: 1200, rating: 4.9, duration: '7 Days' },
        { id: 2, title: 'Nordic Synthesis', price: 1500, rating: 4.8, duration: '10 Days' },
      ]
    };

    setResults(mockResults[activeTab]);
    setIsSearching(false);
  };

  return (
    <section className="glass p-8 rounded-[32px] overflow-hidden">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center">
          <Search className="text-primary w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold">Booking Hub</h2>
          <p className="text-sm text-foreground/50">Simulated high-fidelity global booking engine.</p>
        </div>
      </div>

      <div className="flex gap-2 mb-8 p-1.5 glass rounded-2xl w-fit">
        {[
          { id: 'flight', icon: Plane, label: 'Flights' },
          { id: 'hotel', icon: Hotel, label: 'Hotels' },
          { id: 'cruise', icon: Ship, label: 'Cruises' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as BookingType);
              setResults(null);
            }}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === tab.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-foreground/50 hover:text-foreground"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
          <input 
            type="text" 
            placeholder="Destination..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
          <input 
            type="text" 
            placeholder="Dates..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <button 
          onClick={handleSearch}
          disabled={isSearching}
          className="bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          Search Synthesis
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
                      {item.rating} • {item.airline || item.location || item.duration}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-display font-bold text-primary">${item.price}</div>
                    <div className="text-[10px] text-foreground/30 uppercase font-bold">Per Person</div>
                  </div>
                </div>
                <button className="w-full py-3 bg-white/5 hover:bg-primary hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                  Book Now
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </motion.div>
        ) : !isSearching && (
          <div className="py-12 text-center glass rounded-3xl border-dashed border-2 border-white/5">
            <Search className="w-12 h-12 text-foreground/10 mx-auto mb-4" />
            <p className="text-sm text-foreground/40">Enter destination and dates to synthesize options.</p>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
