import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  Leaf, 
  ChevronRight, 
  Loader2,
  Plus,
  Trash2,
  Download,
  Share2,
  UserPlus,
  Check,
  Wind,
  Sun,
  CloudRain,
  Snowflake
} from 'lucide-react';
import { generateItinerary } from '../services/gemini';
import { db, auth } from '../lib/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { UserProfile, Itinerary as ItineraryType } from '../types';
import { cn } from '../lib/utils';

interface Activity {
  id: string;
  title: string;
  description: string;
  location: string;
  time: string;
  type: 'flight' | 'hotel' | 'dining' | 'sightseeing' | 'transport';
}

interface Itinerary {
  title: string;
  destination: string;
  vibe: string;
  carbonFootprint: number;
  activities: Activity[];
}

export default function AIItinerary() {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [vibe, setVibe] = useState('Adventurous');
  const [interest, setInterest] = useState('');
  const [interests, setInterests] = useState<string[]>(['Sustainable Travel', 'Local Food']);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [matchingUsers, setMatchingUsers] = useState<UserProfile[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const vibes = [
    { name: 'Cyberpunk', icon: Wind },
    { name: 'Minimalist', icon: Sun },
    { name: 'Adventurous', icon: CloudRain },
    { name: 'Sophisticated', icon: Snowflake }
  ];

  const handleAddInterest = () => {
    if (interest && !interests.includes(interest)) {
      setInterests([...interests, interest]);
      setInterest('');
    }
  };

  const handleRemoveInterest = (idx: number) => {
    setInterests(interests.filter((_, i) => i !== idx));
  };

  const findMatchingUsers = async (selectedVibe: string) => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, 'users'), 
      where('vibe', '==', selectedVibe),
      where('uid', '!=', auth.currentUser.uid)
    );
    const snap = await getDocs(q);
    setMatchingUsers(snap.docs.map(d => d.data() as UserProfile));
  };

  const handleGenerate = async () => {
    if (!destination) return;
    setLoading(true);
    try {
      const duration = startDate && endDate 
        ? Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24))
        : 3;
      
      const result = await generateItinerary(destination, duration, interests, vibe, startDate, endDate);
      setItinerary(result);
      await findMatchingUsers(vibe);
    } catch (error) {
      console.error('Error generating itinerary:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleInvite = (uid: string) => {
    setInvitedUsers(prev => 
      prev.includes(uid) ? prev.filter(id => id !== uid) : [...prev, uid]
    );
  };

  const handleSave = async () => {
    if (!itinerary || !auth.currentUser) return;
    setIsSaving(true);
    try {
      await addDoc(collection(db, 'itineraries'), {
        userId: auth.currentUser.uid,
        title: itinerary.title,
        destination: itinerary.destination,
        vibe: itinerary.vibe,
        startDate: startDate || new Date().toISOString(),
        endDate: endDate || new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
        activities: itinerary.activities,
        carbonFootprint: itinerary.carbonFootprint,
        invitedUsers: invitedUsers,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      });
      alert('Itinerary synthesized and saved to your hub!');
    } catch (error) {
      console.error('Error saving itinerary:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Input Section */}
        <div className="w-full lg:w-1/3 space-y-8">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">AI Itinerary</h1>
            <p className="text-foreground/50">Synthesize your perfect journey with Ruth AI.</p>
          </div>

          <div className="glass p-8 rounded-[32px] space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 ml-1">Destination</label>
              <div className="relative">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 pl-11 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Where to?"
                />
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 ml-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 ml-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 ml-1">Vibe</label>
              <div className="grid grid-cols-2 gap-2">
                {vibes.map(v => (
                  <button
                    key={v.name}
                    onClick={() => setVibe(v.name)}
                    className={cn(
                      "p-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all",
                      vibe === v.name ? "bg-primary/10 border-primary/50 text-primary" : "bg-white/5 border-white/5 text-foreground/40"
                    )}
                  >
                    <v.icon className="w-4 h-4" />
                    {v.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 ml-1">Interests</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Add interest..."
                  />
                </div>
                <button
                  onClick={handleAddInterest}
                  className="p-3 bg-primary/10 text-primary rounded-2xl hover:bg-primary/20 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {interests.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs flex items-center gap-2"
                  >
                    {item}
                    <button onClick={() => handleRemoveInterest(idx)}>
                      <Trash2 className="w-3 h-3 text-foreground/20 hover:text-accent" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !destination}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Synthesize Journey
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {itinerary ? (
              <motion.div
                key="itinerary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-display font-bold">{itinerary.title}</h2>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-sm text-foreground/50">
                        <MapPin className="w-4 h-4" />
                        {itinerary.destination}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-primary font-bold uppercase tracking-widest">
                        {itinerary.vibe} Vibe
                      </span>
                      <span className="flex items-center gap-1 text-sm text-green-400 font-medium">
                        <Leaf className="w-4 h-4" />
                        {itinerary.carbonFootprint}kg CO2e
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:scale-[1.02] transition-all flex items-center gap-2"
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                      Save Itinerary
                    </button>
                  </div>
                </div>

                {/* Matching Explorers */}
                {matchingUsers.length > 0 && (
                  <div className="glass p-8 rounded-[32px] border-primary/20 bg-primary/5">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold">Matching Explorers</h3>
                        <p className="text-sm text-foreground/50">These users share your "{vibe}" vibe. Invite them to join!</p>
                      </div>
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {matchingUsers.map(user => (
                        <div key={user.uid} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="flex items-center gap-3">
                            <img 
                              src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} 
                              className="w-10 h-10 rounded-full border border-white/10"
                              alt={user.displayName}
                            />
                            <div>
                              <p className="text-sm font-bold">{user.displayName}</p>
                              <p className="text-[10px] text-foreground/40 uppercase tracking-widest">{user.location || 'Global Explorer'}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => toggleInvite(user.uid)}
                            className={cn(
                              "p-2 rounded-xl transition-all",
                              invitedUsers.includes(user.uid) 
                                ? "bg-green-500 text-white" 
                                : "bg-white/5 hover:bg-white/10 text-foreground/40"
                            )}
                          >
                            {invitedUsers.includes(user.uid) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {itinerary.activities.map((activity, idx) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="glass p-6 rounded-[24px] flex gap-6 group hover:border-primary/30 transition-all"
                    >
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                        <Clock className="w-6 h-6 text-foreground/20 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-primary uppercase tracking-widest">{activity.time}</span>
                          <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded-full text-foreground/40 uppercase font-bold">{activity.type}</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">{activity.title}</h3>
                        <p className="text-sm text-foreground/60 leading-relaxed">{activity.description}</p>
                        <div className="flex items-center gap-2 mt-4 text-xs text-foreground/40">
                          <MapPin className="w-3 h-3" />
                          {activity.location}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-foreground/10 group-hover:text-primary transition-colors" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-[40px]"
              >
                <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-primary/20" />
                </div>
                <h3 className="text-xl font-bold mb-2">Ready to Synthesize?</h3>
                <p className="text-foreground/40 max-w-xs">
                  Enter your destination, dates, and vibe to generate a custom AI-powered itinerary and find matching explorers.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
