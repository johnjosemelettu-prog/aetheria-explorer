
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scissors, 
  MapPin, 
  Calendar, 
  Wind, 
  Sun, 
  CloudRain, 
  Snowflake,
  Loader2,
  CheckCircle2,
  Shirt,
  Smartphone,
  Briefcase,
  Sparkles,
  Camera,
  Ruler,
  ShoppingBag,
  RotateCcw,
  ChevronRight,
  Info,
  Thermometer,
  Cloud,
  Droplets,
  Library,
  Upload
} from 'lucide-react';
import { generateFashionSuggestions, synthesizeWeather, generateHeritageImage } from '../services/gemini';
import { db, auth } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, updateDoc, doc, getDocs, getDoc } from 'firebase/firestore';
import { Itinerary, BodyMeasurements, FashionRental, UserProfile } from '../types';
import { cn } from '../lib/utils';
import DigitalTailorPaymentModal from './DigitalTailorPaymentModal';

export interface FashionItem {
  category: string;
  name: string;
  price: number;
  availability: ('buy' | 'rent')[];
  reason: string;
  color: string;
}

interface FashionResult {
  title: string;
  vibe: string;
  weatherSummary: string;
  items: FashionItem[];
}

interface WeatherData {
  summary: string;
  avgTemp: number;
  humidity: number;
  conditions: string;
}

interface HeritageResult {
    imageUrl: string;
    outfitName: string;
    narrative: string;
}

export default function DigitalTailor() {
  const [activeTab, setActiveTab] = useState<'tailor' | 'heritage'>('tailor');
  const [step, setStep] = useState<'destination' | 'body' | 'results' | 'rentals'>('destination');
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState(5);
  const [vibe, setVibe] = useState('Cyberpunk');
  const [measurements, setMeasurements] = useState<BodyMeasurements>({ height: 175, weight: 70 });
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fashionResult, setFashionResult] = useState<FashionResult | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [rentals, setRentals] = useState<FashionRental[]>([]);
  const [selectedItem, setSelectedItem] = useState<FashionItem | null>(null);
  const [actionType, setActionType] = useState<'buy' | 'rent' | null>(null);
  const [heritageResult, setHeritageResult] = useState<HeritageResult | null>(null);
  const [isGeneratingHeritage, setIsGeneratingHeritage] = useState(false);
  const [userImageForHeritage, setUserImageForHeritage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const vibes = [
    { name: 'Cyberpunk', icon: Wind, color: 'text-blue-400' },
    { name: 'Minimalist', icon: Sun, color: 'text-orange-400' },
    { name: 'Adventurous', icon: CloudRain, color: 'text-green-400' },
    { name: 'Sophisticated', icon: Snowflake, color: 'text-purple-400' }
  ];

  useEffect(() => {
    if (!auth.currentUser) return;
    const uid = auth.currentUser.uid;

    // Load itineraries
    const q = query(collection(db, 'itineraries'), where('userId', '==', uid));
    const unsub = onSnapshot(q, (snap) => {
      setItineraries(snap.docs.map(d => ({ id: d.id, ...d.data() } as Itinerary)));
    });

    // Load rentals
    const qRentals = query(collection(db, 'rentals'), where('userId', '==', uid));
    const unsubRentals = onSnapshot(qRentals, (snap) => {
      setRentals(snap.docs.map(d => ({ id: d.id, ...d.data() } as FashionRental)));
    });

    // Load existing measurements
    const loadProfile = async () => {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const profile = docSnap.data() as UserProfile;
        if (profile.bodyMeasurements) {
          setMeasurements(profile.bodyMeasurements);
        }
      }
    };
    loadProfile();

    return () => {
      unsub();
      unsubRentals();
    };
  }, []);

  const startScan = async () => {
    setIsScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      // Simulate AI scanning
      setTimeout(async () => {
        const newMeasurements = {
          height: 182,
          weight: 78,
          chest: 102,
          waist: 86,
          hips: 98,
          shoulder: 46,
          inseam: 82
        };
        setMeasurements(newMeasurements);
        stopScan(stream);

        // Save to profile
        if (auth.currentUser) {
          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            bodyMeasurements: newMeasurements,
            updatedAt: new Date().toISOString()
          });
        }
      }, 3000);
    } catch (err) {
      console.error("Camera access denied", err);
      setIsScanning(false);
    }
  };

  const stopScan = (stream: MediaStream) => {
    stream.getTracks().forEach(track => track.stop());
    setIsScanning(false);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const dest = selectedItinerary?.destination || destination;
      const start = selectedItinerary?.startDate;
      const end = selectedItinerary?.endDate;

      // 1. Synthesize Weather
      const weather = await synthesizeWeather(dest, start, end);
      setWeatherData(weather);

      // 2. Generate Fashion Suggestions
      const weatherInfo = `${weather.summary}. Avg Temp: ${weather.avgTemp}°C, Humidity: ${weather.humidity}%, Conditions: ${weather.conditions}`;
      const result = await generateFashionSuggestions(
        dest,
        selectedItinerary ? (new Date(selectedItinerary.endDate).getTime() - new Date(selectedItinerary.startDate).getTime()) / (1000 * 3600 * 24) : duration,
        vibe,
        measurements,
        weatherInfo
      );
      setFashionResult(result);
      setStep('results');
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (item: FashionItem, type: 'buy' | 'rent') => {
    setSelectedItem(item);
    setActionType(type);
  };

  const handleSuccessfulCheckout = async () => {
    if (!auth.currentUser || !selectedItem || !actionType) return;
    try {
      await addDoc(collection(db, 'rentals'), {
        userId: auth.currentUser.uid,
        itemName: selectedItem.name,
        category: selectedItem.category,
        price: actionType === 'buy' ? selectedItem.price : selectedItem.price * 0.2,
        type: actionType,
        status: actionType === 'buy' ? 'purchased' : 'active',
        destination: selectedItinerary?.destination || destination,
        createdAt: new Date().toISOString(),
        rentalEndDate: actionType === 'rent' ? new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString() : null
      });
      // Add transaction
      await addDoc(collection(db, 'transactions'), {
        userId: auth.currentUser.uid,
        amount: actionType === 'buy' ? selectedItem.price : selectedItem.price * 0.2,
        type: 'debit',
        description: `${actionType === 'buy' ? 'Purchased' : 'Rented'} ${selectedItem.name}`,
        category: 'booking',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error processing action:', error);
    } finally {
        setSelectedItem(null);
        setActionType(null);
    }
  };

  const handleReturn = async (rentalId: string) => {
    try {
      await updateDoc(doc(db, 'rentals', rentalId), {
        status: 'returned',
        returnedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error returning item:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setUserImageForHeritage(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleGenerateHeritage = async () => {
      if (!userImageForHeritage || !destination) return;
      setIsGeneratingHeritage(true);
      setHeritageResult(null);
      try {
          const result = await generateHeritageImage(userImageForHeritage, destination);
          setHeritageResult(result);
      } catch (error) {
          console.error("Error generating heritage image:", error);
      } finally {
          setIsGeneratingHeritage(false);
      }
  };

  const renderTabs = () => (
    <div className="flex gap-4 mb-8">
      <button
        onClick={() => setActiveTab('tailor')}
        className={cn(
          "py-2 px-4 rounded-full text-sm font-bold flex items-center gap-2 transition-all",
          activeTab === 'tailor' ? "bg-primary text-white" : "bg-white/5 text-foreground/60"
        )}
      >
        <Scissors className="w-4 h-4" />
        Digital Tailor
      </button>
      <button
        onClick={() => setActiveTab('heritage')}
        className={cn(
          "py-2 px-4 rounded-full text-sm font-bold flex items-center gap-2 transition-all",
          activeTab === 'heritage' ? "bg-primary text-white" : "bg-white/5 text-foreground/60"
        )}
      >
        <Library className="w-4 h-4" />
        Heritage Mirror
      </button>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      {selectedItem && actionType && (
          <DigitalTailorPaymentModal 
              item={selectedItem} 
              type={actionType} 
              onClose={() => { setSelectedItem(null); setActionType(null); }} 
              onSuccessfulCheckout={handleSuccessfulCheckout} 
          />
      )}
      {renderTabs()}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar / Controls */}
        <div className="w-full md:w-1/3 space-y-8">
        <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-display font-bold mb-2">
                {activeTab === 'tailor' ? 'Digital Tailor' : 'Heritage Mirror'}
              </h1>
              <p className="text-foreground/50">
                {activeTab === 'tailor' ? 'Synthesize your travel style with Ruth AI.' : 'See yourself in traditional attire.'}
                </p>
            </div>
            <button 
              onClick={() => setStep('rentals')}
              className="p-3 glass rounded-2xl hover:bg-white/10 transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {rentals.filter(r => r.status === 'active').length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {rentals.filter(r => r.status === 'active').length}
                </span>
              )}
            </button>
          </div>

          <div className="glass p-8 rounded-[32px] space-y-6">
            {activeTab === 'tailor' && (
                 <AnimatePresence mode='wait'>
                    {step === 'destination' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 ml-1">Select Booking</label>
                        <div className="space-y-2">
                            {itineraries.map(it => (
                            <button
                                key={it.id}
                                onClick={() => {
                                setSelectedItinerary(it);
                                setDestination(it.destination);
                                }}
                                className={cn(
                                "w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between",
                                selectedItinerary?.id === it.id ? "bg-primary/10 border-primary/50" : "bg-white/5 border-white/5 hover:bg-white/10"
                                )}
                            >
                                <div>
                                <p className="text-sm font-bold">{it.title}</p>
                                <p className="text-xs text-foreground/40">{it.destination}</p>
                                </div>
                                <CheckCircle2 className={cn("w-4 h-4", selectedItinerary?.id === it.id ? "text-primary" : "text-transparent")} />
                            </button>
                            ))}
                            <button
                            onClick={() => setSelectedItinerary(null)}
                            className={cn(
                                "w-full p-4 rounded-2xl border text-left transition-all",
                                !selectedItinerary ? "bg-primary/10 border-primary/50" : "bg-white/5 border-white/5 hover:bg-white/10"
                            )}
                            >
                            <p className="text-sm font-bold">Manual Entry</p>
                            </button>
                        </div>
                        </div>

                        {!selectedItinerary && (
                        <div className="space-y-4">
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
                            <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 ml-1">Duration (Days)</label>
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(parseInt(e.target.value))}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                            />
                            </div>
                        </div>
                        )}

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

                        <button
                        onClick={() => setStep('body')}
                        disabled={!destination}
                        className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                        Next: Body Scan
                        <ChevronRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                    )}

                    {step === 'body' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="relative aspect-square bg-black rounded-3xl overflow-hidden border border-white/10">
                        {isScanning ? (
                            <>
                            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover opacity-50" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="w-full h-1 bg-primary/50 absolute top-0 animate-scan shadow-[0_0_20px_rgba(var(--primary),0.5)]" />
                                <div className="text-primary font-mono text-[10px] animate-pulse">ANALYZING BIOMETRICS...</div>
                            </div>
                            </>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                            <Camera className="w-12 h-12 text-foreground/10 mb-4" />
                            <p className="text-sm text-foreground/40">Position yourself in front of the camera for a precise 3D body synthesis.</p>
                            </div>
                        )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-foreground/30">Height (cm)</label>
                            <input 
                            type="number" 
                            value={measurements.height} 
                            onChange={e => setMeasurements({...measurements, height: parseInt(e.target.value)})}
                            className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/30"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-foreground/30">Weight (kg)</label>
                            <input 
                            type="number" 
                            value={measurements.weight} 
                            onChange={e => setMeasurements({...measurements, weight: parseInt(e.target.value)})}
                            className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/30"
                            />
                        </div>
                        </div>

                        <div className="flex gap-2">
                        <button
                            onClick={startScan}
                            disabled={isScanning}
                            className="flex-1 py-3 glass rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                        >
                            <Camera className="w-4 h-4" />
                            Start Scan
                        </button>
                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                            Synthesize Fashion
                        </button>
                        </div>
                        <button onClick={() => setStep('destination')} className="w-full text-xs text-foreground/30 hover:text-foreground transition-colors">Back to Destination</button>
                    </motion.div>
                    )}

                    {(step === 'results' || step === 'rentals') && (
                    <button 
                        onClick={() => setStep('destination')}
                        className="w-full py-3 glass rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Start New Synthesis
                    </button>
                    )}
                </AnimatePresence>
            )}
            {activeTab === 'heritage' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 ml-1">Destination</label>
                        <div className="relative">
                            <input
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 pl-11 focus:outline-none focus:border-primary/50 transition-colors"
                            placeholder="e.g. Kyoto, Japan"
                            />
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 ml-1">Your Image</label>
                        <div 
                            className="relative aspect-square bg-black rounded-3xl overflow-hidden border-2 border-dashed border-white/10 flex items-center justify-center text-center cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {userImageForHeritage ? (
                                <img src={userImageForHeritage} alt="User preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center">
                                    <Upload className="w-10 h-10 text-foreground/20 mb-2"/>
                                    <p className="text-sm text-foreground/50">Click to upload a photo</p>
                                    <p className="text-xs text-foreground/30">For best results, use a clear, front-facing photo.</p>
                                </div>
                            )}
                        </div>
                        <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>
                    <button
                        onClick={handleGenerateHeritage}
                        disabled={isGeneratingHeritage || !userImageForHeritage || !destination}
                        className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isGeneratingHeritage ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                        Generate Heritage Image
                    </button>
                </motion.div>
            )}

          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'tailor' && (
                <>          
                {step === 'results' && fashionResult ? (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        <div className="glass p-8 rounded-[40px] bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                            <h2 className="text-3xl font-display font-bold mb-2">{fashionResult.title}</h2>
                            <div className="flex flex-wrap gap-4">
                                <span className="flex items-center gap-1.5 text-sm text-foreground/60">
                                <Thermometer className="w-4 h-4 text-orange-400" />
                                {weatherData?.avgTemp}°C Avg
                                </span>
                                <span className="flex items-center gap-1.5 text-sm text-foreground/60">
                                <Cloud className="w-4 h-4 text-blue-400" />
                                {weatherData?.conditions}
                                </span>
                                <span className="flex items-center gap-1.5 text-sm text-foreground/60">
                                <Droplets className="w-4 h-4 text-secondary" />
                                {weatherData?.humidity}% Humidity
                                </span>
                            </div>
                            </div>
                            <div className="px-4 py-2 glass rounded-2xl text-xs font-bold text-primary uppercase tracking-widest">
                            {fashionResult.vibe} Vibe
                            </div>
                        </div>
                        <p className="text-foreground/60 leading-relaxed italic border-l-2 border-primary/30 pl-4">
                            "{weatherData?.summary}"
                        </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {fashionResult.items.map((item, idx) => (
                            <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass p-6 rounded-[32px] group hover:border-primary/30 transition-all flex flex-col"
                            >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary">
                                <Shirt className="w-6 h-6" />
                                </div>
                                <div className="text-right">
                                <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest mb-1">{item.category}</p>
                                <p className="text-lg font-bold text-primary">${item.price}</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                            <p className="text-sm text-foreground/50 leading-relaxed mb-6 flex-1">{item.reason}</p>
                            
                            <div className="flex gap-2">
                                {item.availability.includes('buy') && (
                                <button 
                                    onClick={() => handleAction(item, 'buy')}
                                    className="flex-1 py-3 bg-white/5 hover:bg-primary text-foreground hover:text-white rounded-xl text-xs font-bold transition-all"
                                >
                                    Buy Now
                                </button>
                                )}
                                {item.availability.includes('rent') && (
                                <button 
                                    onClick={() => handleAction(item, 'rent')}
                                    className="flex-1 py-3 glass-hover border border-white/5 hover:border-secondary/50 text-xs font-bold rounded-xl transition-all"
                                >
                                    Rent ($ {(item.price * 0.2).toFixed(0)})
                                </button>
                                )}
                            </div>
                            </motion.div>
                        ))}
                        </div>
                    </motion.div>
                    ) : step === 'rentals' ? (
                    <motion.div
                        key="rentals"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-display font-bold">My Wardrobe</h2>
                        <div className="flex gap-4">
                            <div className="glass px-4 py-2 rounded-2xl text-xs font-bold">
                            <span className="text-foreground/40 mr-2">Active Rentals:</span>
                            <span className="text-primary">{rentals.filter(r => r.status === 'active').length}</span>
                            </div>
                        </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                        {rentals.length > 0 ? (
                            rentals.map((rental) => (
                            <div key={rental.id} className="glass p-6 rounded-[32px] flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center",
                                    rental.type === 'buy' ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                                )}>
                                    <Shirt className="w-7 h-7" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-bold">{rental.itemName}</h3>
                                    <span className={cn(
                                        "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase",
                                        rental.status === 'active' ? "bg-green-500/10 text-green-400" : "bg-white/5 text-foreground/40"
                                    )}>
                                        {rental.status}
                                    </span>
                                    </div>
                                    <p className="text-xs text-foreground/40">
                                    {rental.type === 'buy' ? 'Purchased' : 'Rented'} for {rental.destination} • ${rental.price.toFixed(2)}
                                    </p>
                                    {rental.rentalEndDate && rental.status === 'active' && (
                                    <p className="text-[10px] text-accent font-bold mt-1 uppercase tracking-widest">
                                        Due: {new Date(rental.rentalEndDate).toLocaleDateString()}
                                    </p>
                                    )}
                                </div>
                                </div>
                                
                                {rental.type === 'rent' && rental.status === 'active' && (
                                <button 
                                    onClick={() => handleReturn(rental.id)}
                                    className="px-6 py-3 glass-hover rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Return Item
                                </button>
                                )}
                            </div>
                            ))
                        ) : (
                            <div className="h-64 flex flex-col items-center justify-center text-center glass rounded-[40px] border-dashed border-2 border-white/5">
                            <Shirt className="w-12 h-12 text-foreground/10 mb-4" />
                            <p className="text-foreground/40">Your wardrobe is empty. Synthesize some fashion!</p>
                            </div>
                        )}
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
                        <Scissors className="w-10 h-10 text-primary/20" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Ready to Synthesize?</h3>
                        <p className="text-foreground/40 max-w-xs">
                        Select a booking or enter a destination to start your personalized fashion synthesis.
                        </p>
                    </motion.div>
                    )}
                </>
            )}
            {activeTab === 'heritage' && (
                <AnimatePresence mode="wait">
                    {isGeneratingHeritage ? (
                        <motion.div
                            key="heritage-loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-[40px]"
                        >
                            <Loader2 className="w-12 h-12 text-primary/50 animate-spin mb-6" />
                            <h3 className="text-xl font-bold mb-2">Generating Your Heritage Portrait...</h3>
                            <p className="text-foreground/40 max-w-xs">
                                Please wait while Ruth AI works its magic. This may take a moment.
                            </p>
                        </motion.div>
                    ) : heritageResult ? (
                        <motion.div
                            key="heritage-results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="glass p-8 rounded-[40px] flex flex-col md:flex-row gap-8">
                                <div className="w-full md:w-1/2">
                                    <img src={heritageResult.imageUrl} alt={heritageResult.outfitName} className="rounded-3xl w-full h-auto object-cover" />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <h2 className="text-3xl font-display font-bold mb-2"> {heritageResult.outfitName}</h2>
                                    <p className="text-foreground/60 leading-relaxed">{heritageResult.narrative}</p>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="heritage-placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-[40px]"
                        >
                            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                                <Library className="w-10 h-10 text-primary/20" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Discover Your Heritage</h3>
                            <p className="text-foreground/40 max-w-xs">
                                Upload your photo and select a destination to see yourself in traditional attire.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
