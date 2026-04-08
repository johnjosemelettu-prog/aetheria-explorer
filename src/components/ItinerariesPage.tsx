import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Map, 
  Plus, 
  Search, 
  Calendar, 
  MapPin, 
  Leaf, 
  ChevronRight,
  Clock,
  Filter,
  Users
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { Itinerary } from '../types';
import ItineraryGenerator from './ItineraryGenerator';

export default function ItinerariesPage() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'itineraries'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Itinerary));
      setItineraries(data);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching itineraries:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredItineraries = itineraries.filter(it => 
    it.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    it.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
            <Map className="text-primary w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold mb-1">Itinerary Synthesis</h1>
            <p className="text-foreground/50">Manage and explore your AI-generated travel plans.</p>
          </div>
        </div>
        <button 
          onClick={() => setIsGeneratorOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
        >
          <Plus className="w-5 h-5" />
          Synthesize New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass p-6 rounded-3xl">
            <h3 className="text-sm font-bold text-foreground/50 uppercase tracking-widest mb-4">Search</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
              <input 
                type="text" 
                placeholder="Destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <div className="glass p-6 rounded-3xl">
            <h3 className="text-sm font-bold text-foreground/50 uppercase tracking-widest mb-4">Filter By</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl glass-hover text-sm font-bold">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Duration</span>
                <ChevronRight className="w-4 h-4 text-foreground/20" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl glass-hover text-sm font-bold">
                <span className="flex items-center gap-2"><Leaf className="w-4 h-4" /> Carbon Footprint</span>
                <ChevronRight className="w-4 h-4 text-foreground/20" />
              </button>
            </div>
          </div>
        </div>

        {/* Itineraries Grid */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              <div className="py-20 text-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-foreground/40">Loading synthesis...</p>
              </div>
            ) : filteredItineraries.length > 0 ? (
              filteredItineraries.map((itinerary) => (
                <motion.div
                  key={itinerary.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass p-8 rounded-[32px] glass-hover cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Map className="w-24 h-24 rotate-12" />
                  </div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex gap-6">
                      <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-10 h-10 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                          {itinerary.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/50">
                          <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full">
                            <MapPin className="w-3.5 h-3.5" />
                            {itinerary.destination}
                          </span>
                          {itinerary.vibe && (
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full font-bold uppercase text-[10px] tracking-widest">
                              {itinerary.vibe}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 rounded-full">
                            <Leaf className="w-3.5 h-3.5" />
                            {itinerary.carbonFootprint}kg CO2 Offset
                          </span>
                          <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full">
                            <Clock className="w-3.5 h-3.5" />
                            {itinerary.activities.length} Activities
                          </span>
                          {itinerary.invitedUsers && itinerary.invitedUsers.length > 0 && (
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full text-primary">
                              <Users className="w-3.5 h-3.5" />
                              {itinerary.invitedUsers.length} Invited
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-3 glass glass-hover rounded-2xl font-bold text-sm flex items-center gap-2">
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="glass p-20 rounded-[40px] text-center border-dashed border-2 border-white/5">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-foreground/20" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">No Itineraries Found</h3>
                <p className="text-foreground/50 mb-8 max-w-sm mx-auto">
                  Your travel synthesis library is empty. Start by creating a new AI-powered itinerary.
                </p>
                <button 
                  onClick={() => setIsGeneratorOpen(true)}
                  className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.05] transition-all"
                >
                  Synthesize Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ItineraryGenerator 
        isOpen={isGeneratorOpen} 
        onClose={() => setIsGeneratorOpen(false)} 
      />
    </div>
  );
}
