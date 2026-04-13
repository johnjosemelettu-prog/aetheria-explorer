import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, MapPin, Calendar, Users, Heart, BookOpen, Clock, Eye, Briefcase, BarChart, Shield, Camera, Accessibility, Orbit, Bot, GitMerge, Award, HandHeart, Feather, FileText
} from 'lucide-react';
import {
  generateItinerary, getVRScout, getVRHotelTour, getVRActivitySimulation, getVRCulturalTraining, getVRHistoricalReenactment, getVRTimeMachine,
  getARTimelapse, getARMenu, getARArtGallery, deconstructArchitecture,
  getScamAlerts, getSafetyCorridors, getMeHome, 
  connectWithLocalHero, getTravelersGuilds, getDAOStatus, getBountyBoard,
  getAncestryTrail, rentDrone, getLiveTranslation, getMemoryPalace, adaptItineraryToWeather, suggestActivityBasedOnBioData, findStoryLocations,
  generateTravelComicStrip, getVibePhotoFilters, generateAIHaiku, bookFlight, getAetheriaRadioHost, generate3DPhotoSculpture, generateTravelBlogPost, findArtisanCrafts,
  chatWithHistoricalFigure, generatePersonalMythology, getSentientCompassReading, syncCollaborativeJournal, getHapticEvents, generateDreamItinerary, getAuraShieldSuggestion,
  recordSensoryData, composeSoundtrack
} from '@/services/gemini';
import { cn } from '@/lib/utils';

interface Itinerary { [key: string]: any; }

export default function AIItinerary() {
  const [destination, setDestination] = useState('Kyoto');
  const [duration, setDuration] = useState(3);
  const [mood, setMood] = useState('Mystical');
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [modules, setModules] = useState<any>({});
  const [moduleLoading, setModuleLoading] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setItinerary(null);
    setModules({});
    try {
      const itin = await generateItinerary(destination, duration, mood, []);
      setItinerary(itin);
      setActiveTab('itinerary');
    } catch (error) {
      console.error('Error generating itinerary:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadModule = async (moduleName: string) => {
    if (modules[moduleName] || moduleLoading) return;
    setModuleLoading(moduleName);
    try {
        let result;
        // This switch is now a monster, but it demonstrates the principle!
        switch(moduleName) {
            case 'vrScout': result = await getVRScout(destination); break;
            case 'vrHotel': result = await getVRHotelTour('hotel123'); break;
            case 'vrAdventure': result = await getVRActivitySimulation('Bungee Jumping'); break;
            case 'vrEtiquette': result = await getVRCulturalTraining(destination); break;
            case 'vrHistory': result = await getVRHistoricalReenactment('Gion Matsuri Parade'); break;
            case 'vrTimeMachine': result = await getVRTimeMachine(destination); break;
            
            case 'arTimelapse': result = await getARTimelapse(destination); break;
            case 'arMenu': result = await getARMenu('menu.jpg'); break;
            case 'arGallery': result = await getARArtGallery({lat: 35.68, lng: 139.76}); break;
            case 'arArchitecture': result = await deconstructArchitecture('building.jpg'); break;
            
            case 'safetyScams': result = await getScamAlerts(destination); break;
            case 'safetyCorridors': result = await getSafetyCorridors(destination); break;
            case 'safetyHome': result = await getMeHome({}, {}); break;

            case 'communityHeroes': result = await connectWithLocalHero(destination); break;
            case 'communityGuilds': result = await getTravelersGuilds('foodie'); break;
            case 'communityDAO': result = await getDAOStatus(); break;
            case 'communityBounties': result = await getBountyBoard(destination); break;

            case 'ancestryTrail': result = await getAncestryTrail('dna123'); break;
            case 'rentDrone': result = await rentDrone(destination, 30); break;
            case 'liveTranslation': result = await getLiveTranslation(new Blob(), 'Japanese'); break;
            case 'memoryPalace': result = await getMemoryPalace('user123'); break;
            case 'comicStrip': result = itinerary ? await generateTravelComicStrip(itinerary.itinerary[0]) : { title: "Generate itinerary first"}; break;
            case 'photoFilters': result = await getVibePhotoFilters(mood); break;
            case 'haikuGenerator': result = await generateAIHaiku('photo.jpg'); break;
        }
        setModules((prev: any) => ({...prev, [moduleName]: result}));
    } catch (e) {
        console.error(`Error loading module ${moduleName}:`, e);
    } finally {
        setModuleLoading(null);
    }
  };

  const renderModuleContent = (moduleName: string) => {
      const data = modules[moduleName];
      if (moduleLoading === moduleName) return <p className="text-xs text-foreground/50">Loading...</p>;
      if (!data) return <p className="text-xs text-foreground/50">Click to load.</p>;
      
      switch(moduleName) {
          case 'vrScout': return <p className="text-xs text-green-400">VR Scout loaded: {data.description}</p>;
          case 'communityHeroes': return <p className="text-xs text-green-400">Local Hero: {data.heroes[0].name}</p>;
          case 'ancestryTrail': return <p className="text-xs text-green-400">Ancestry Trail: {data.title}</p>;
          case 'comicStrip': return <p className="text-xs text-green-400">Comic Strip: {data.title}</p>;
          default: return <p className="text-xs text-green-400">Module loaded successfully.</p>;
      }
  }

  const tabs = [
      { name: 'itinerary', icon: MapPin },
      { name: 'vr', icon: Eye },
      { name: 'ar', icon: Camera },
      { name: 'community', icon: Users },
      { name: 'safety', icon: Shield },
      { name: 'conceptual', icon: Orbit },
  ];

  const moduleConfig: { [key: string]: { icon: React.ElementType, title: string, name: string }[] } = {
      vr: [
          { icon: Eye, title: 'Pre-Travel Scout', name: 'vrScout' },
          { icon: Briefcase, title: 'Hotel Tour', name: 'vrHotel' },
          { icon: Heart, title: 'Adventure Sim', name: 'vrAdventure' },
          { icon: Users, title: 'Etiquette Training', name: 'vrEtiquette' },
          { icon: BookOpen, title: 'History Reenactment', name: 'vrHistory' },
          { icon: Clock, title: 'Time Machine', name: 'vrTimeMachine' },
      ],
      ar: [
          { icon: Clock, title: 'AR Time-Lapse', name: 'arTimelapse' },
          { icon: BookOpen, title: 'AR Menu', name: 'arMenu' },
          { icon: Camera, title: 'AR Art Gallery', name: 'arGallery' },
          { icon: BarChart, title: 'Architecture Decon', name: 'arArchitecture' },
      ],
      community: [
          { icon: HandHeart, title: 'Local Heroes', name: 'communityHeroes' },
          { icon: Award, title: "Traveler's Guilds", name: 'communityGuilds' },
          { icon: GitMerge, title: 'Aetheria DAO', name: 'communityDAO' },
          { icon: FileText, title: 'Bounty Board', name: 'communityBounties' },
      ],
      safety: [
          { icon: Shield, title: 'Scam Alerts', name: 'safetyScams' },
          { icon: MapPin, title: 'Safety Corridors', name: 'safetyCorridors' },
          { icon: Bot, title: 'Get Me Home', name: 'safetyHome' },
      ],
      conceptual: [
          { icon: GitMerge, title: 'Ancestry Trail', name: 'ancestryTrail' },
          { icon: Camera, title: 'Drone Rental', name: 'rentDrone' },
          { icon: Accessibility, title: 'Live Translation', name: 'liveTranslation' },
          { icon: Orbit, title: 'Memory Palace', name: 'memoryPalace' },
          { icon: Feather, title: 'Haiku Generator', name: 'haikuGenerator' },
          { icon: FileText, title: 'Comic Strip', name: 'comicStrip' },
      ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="glass p-6 rounded-2xl space-y-4">
             <div className='space-y-2'>
                <label className="text-xs font-bold uppercase tracking-wider text-foreground/40">Aetheria Explorer</label>
                <div className="relative"><input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2" placeholder="Destination"/></div>
                <div className="grid grid-cols-2 gap-2">
                    <input type="number" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs" placeholder="Days"/>
                    <input type="text" value={mood} onChange={(e) => setMood(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs" placeholder="Mood"/>
                </div>
            </div>
            <button onClick={handleGenerate} disabled={loading} className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? <Bot className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-5 h-5" />Synthesize Itinerary</>}
            </button>
          </div>
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {itinerary ? (
              <motion.div key="itinerary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div>
                    <h2 className="text-3xl font-display font-bold">{itinerary.title}</h2>
                </div>
                
                <div>
                    <div className="flex border-b border-white/10">
                        {tabs.map(tab => (
                            <button key={tab.name} onClick={() => setActiveTab(tab.name)} className={cn("px-4 py-2 text-sm font-bold flex items-center gap-2", activeTab === tab.name ? 'text-primary border-b-2 border-primary' : 'text-foreground/50')}>
                                <tab.icon className="w-4 h-4"/> {tab.name}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={activeTab} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                      {activeTab === 'itinerary' && (
                          <div className="space-y-4">
                              {itinerary.itinerary[0].activities.map((activity: any) => (
                                  <div key={activity.id} className="glass-light p-4 rounded-xl">
                                      <h3 className="text-md font-bold">{activity.title}</h3>
                                      <p className="text-xs text-foreground/60 leading-relaxed mt-1">{activity.description}</p>
                                  </div>
                              ))}
                          </div>
                      )}
                      {activeTab !== 'itinerary' && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {moduleConfig[activeTab]?.map(mod => (
                                  <button key={mod.name} onClick={() => loadModule(mod.name)} disabled={!!moduleLoading} className="glass-light p-4 rounded-xl text-left space-y-2 hover:border-primary/50 transition-colors disabled:opacity-50">
                                      <div className="flex items-center gap-2">
                                          <mod.icon className="w-4 h-4 text-cyan-400"/>
                                          <h3 className="text-sm font-bold">{mod.title}</h3>
                                      </div>
                                      {renderModuleContent(mod.name)}
                                  </button>
                              ))}
                          </div>
                      )}
                  </motion.div>
                </AnimatePresence>

              </motion.div>
            ) : (
              <motion.div key="placeholder" className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-2xl">
                <h3 className="text-xl font-bold mb-1">Aetheria Explorer</h3>
                <p className="text-foreground/50 max-w-xs text-sm">Enter a destination and preferences to synthesize your journey.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
