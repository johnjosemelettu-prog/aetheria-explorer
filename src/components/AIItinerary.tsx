
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
import PremiumGate from '@/components/PremiumGate';
import { usePremiumStatus } from '@/hooks/usePremiumStatus';

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
  const { isPremium } = usePremiumStatus();

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
    if (!isPremium) {
      setModules((prev: any) => ({...prev, [moduleName]: { needsPremium: true }}));
      return;
    }
    if (modules[moduleName] || moduleLoading) return;
    setModuleLoading(moduleName);
    try {
        let result;
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
            case 'safetyHome': result = await getMeHome({lat: 35.68, lng: 139.76}, {lat: 35.0116, lng: 135.7681}); break;

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

            case 'adaptItineraryToWeather': result = itinerary ? await adaptItineraryToWeather(itinerary, { temp: 25, condition: 'Sunny' }) : { title: "Generate itinerary first"}; break;
            case 'suggestActivityBasedOnBioData': result = await suggestActivityBasedOnBioData({ heartRate: 65, sleepHours: 7.5 }); break;
            case 'findStoryLocations': result = itinerary ? await findStoryLocations(itinerary.itinerary[0].activities[0].description) : { title: "Generate itinerary first"}; break;
            case 'bookFlight': result = await bookFlight({destination, date: new Date().toISOString().split('T')[0]}); break;
            case 'getAetheriaRadioHost': result = await getAetheriaRadioHost(destination); break;
            case 'generate3DPhotoSculpture': result = await generate3DPhotoSculpture('photo.jpg'); break;
            case 'generateTravelBlogPost': result = itinerary ? await generateTravelBlogPost(itinerary) : { title: "Generate itinerary first"}; break;
            case 'findArtisanCrafts': result = await findArtisanCrafts(destination); break;
            case 'chatWithHistoricalFigure': result = await chatWithHistoricalFigure('Oda Nobunaga', 'What was it like unifying Japan?'); break;
            case 'generatePersonalMythology': result = itinerary ? await generatePersonalMythology(itinerary) : { title: "Generate itinerary first"}; break;
            case 'getSentientCompassReading': result = await getSentientCompassReading({ lat: 35.68, lng: 139.76 }); break;
            case 'syncCollaborativeJournal': result = await syncCollaborativeJournal('journal123', 'Just visited the Golden Pavilion, it was amazing!'); break;
            case 'getHapticEvents': result = itinerary ? await getHapticEvents(itinerary.itinerary[0].activities[0]) : { title: "Generate itinerary first"}; break;
            case 'generateDreamItinerary': result = await generateDreamItinerary(['lucid dream about ancient rome']); break;
            case 'getAuraShieldSuggestion': result = await getAuraShieldSuggestion({ stressLevel: 0.8, crowdDensity: 0.9 }); break;
            case 'recordSensoryData': result = await recordSensoryData({ lat: 35.039, lng: 135.729 }, { sound: 'temple bells', smell: 'incense', taste: 'matcha' }); break;
            case 'composeSoundtrack': result = itinerary ? await composeSoundtrack(itinerary) : { title: "Generate itinerary first"}; break;
        }
        setModules((prev: any) => ({...prev, [moduleName]: result}));
    } catch (e) {
        console.error(`Error loading module ${moduleName}:`, e);
    } finally {
        setModuleLoading(null);
    }
  };

  const renderDynamicObject = (obj: any): React.ReactNode => {
    if (typeof obj !== 'object' || obj === null) {
      return <span className="text-foreground/80">{String(obj)}</span>;
    }
    if (Array.isArray(obj)) {
      return (
        <ul className="list-disc pl-5 space-y-2 mt-2 text-foreground/80">
          {obj.map((item, i) => <li key={i}>{renderDynamicObject(item)}</li>)}
        </ul>
      );
    }
    return (
      <div className="space-y-3 mt-2">
        {Object.entries(obj).map(([key, val]) => {
          if (typeof val === 'string' && (val.startsWith('http') || val.startsWith('/'))) {
             return <a key={key} href={val} target="_blank" rel="noopener noreferrer" className="text-accent font-bold hover:underline inline-block items-center">{key} &rarr;</a>;
          }
          return (
            <div key={key} className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-primary font-mono text-[10px] uppercase tracking-widest block mb-1">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <div className="text-sm">{renderDynamicObject(val)}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderModuleContent = (moduleName: string) => {
    const data = modules[moduleName];
    if (moduleLoading === moduleName) {
        return (
            <div className="flex items-center gap-2 mt-2">
                <Bot className="w-4 h-4 animate-spin text-primary" />
                <p className="text-xs text-foreground/50">Synthesizing...</p>
            </div>
        );
    }
    if (!data) {
        return <p className="text-xs text-foreground/50 mt-2">Click to learn more.</p>;
    }

    if (data.needsPremium) {
      return <PremiumGate />;
    }
    
    const renderWrapper = (title: string, content: React.ReactNode, url: string, urlText: string) => (
      <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <h4 className="font-bold text-lg text-white flex items-center gap-2">{title}</h4>
        <div className="text-sm text-foreground/80 leading-relaxed">{content}</div>
        {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-xl font-bold transition-all text-xs uppercase tracking-widest border border-primary/20">
              <Eye className="w-4 h-4" />
              {urlText}
            </a>
        )}
      </div>
    );

    switch (moduleName) {
      case 'vrScout':
        return renderWrapper(`VR Scout: ${data.location}`, <p>{data.description}</p>, data.vrExperienceUrl, "Launch VR Experience");

      case 'vrHotel':
        return renderWrapper(`Virtual Tour: ${data.hotelName}`, <p>{data.description}</p>, data.tourUrl, "Launch Virtual Tour");

      case 'vrAdventure':
        return renderWrapper(`Adventure Sim: ${data.simulationName}`, <p>{data.description}</p>, data.simulationUrl, "Start Simulation");

      case 'vrEtiquette':
        return renderWrapper(`Etiquette Training: ${data.destination}`, <p>{data.summary}</p>, data.trainingUrl, "Begin Training");

      case 'vrHistory':
        return renderWrapper(`Historical Reenactment: ${data.event}`, <p>{data.description}</p>, data.experienceUrl, "Witness History");

      case 'vrTimeMachine':
        return renderWrapper(`Time Machine: ${data.location} - ${data.era}`, <p>{data.description}</p>, data.timeTravelUrl, "Travel Through Time");

      case 'arTimelapse':
        return renderWrapper(`AR Time-Lapse: ${data.location}`, <p>{data.description}</p>, data.arExperienceUrl, "Activate AR");

      case 'arMenu':
        return renderWrapper("AR Menu", <p>{data.restaurantName}</p>, data.arMenuUrl, "View Menu in AR");

      case 'arGallery':
        return renderWrapper(`AR Art Gallery: ${data.artist}`, <p>{data.description}</p>, data.arGalleryUrl, "Enter Gallery");

      case 'arArchitecture':
        return renderWrapper(`Architecture Deconstruction: ${data.buildingName}`, <div><p>{data.era}</p><p>{data.style}</p></div>, data.arModelUrl, "Deconstruct Building");

      default:
        return (
            <div className="mt-3 text-sm">
                {renderDynamicObject(data)}
            </div>
        );
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
          { icon: Bot, title: 'Weather Adapt', name: 'adaptItineraryToWeather' },
          { icon: Heart, title: 'Bio-Data Suggestions', name: 'suggestActivityBasedOnBioData' },
          { icon: BookOpen, title: 'Story Locations', name: 'findStoryLocations' },
          { icon: Briefcase, title: 'Book Flight', name: 'bookFlight' },
          { icon: Users, title: 'Aetheria Radio', name: 'getAetheriaRadioHost' },
          { icon: Camera, title: '3D Photo Sculpture', name: 'generate3DPhotoSculpture' },
          { icon: FileText, title: 'Travel Blog Post', name: 'generateTravelBlogPost' },
          { icon: HandHeart, title: 'Artisan Crafts', name: 'findArtisanCrafts' },
          { icon: Users, title: 'Chat with History', name: 'chatWithHistoricalFigure' },
          { icon: GitMerge, title: 'Personal Mythology', name: 'generatePersonalMythology' },
          { icon: Orbit, title: 'Sentient Compass', name: 'getSentientCompassReading' },
          { icon: Users, title: 'Collab Journal', name: 'syncCollaborativeJournal' },
          { icon: Award, title: 'Haptic Events', name: 'getHapticEvents' },
          { icon: Eye, title: 'Dream Itinerary', name: 'generateDreamItinerary' },
          { icon: Shield, title: 'Aura Shield', name: 'getAuraShieldSuggestion' },
          { icon: MapPin, title: 'Sensory Data', name: 'recordSensoryData' },
          { icon: Feather, title: 'Compose Soundtrack', name: 'composeSoundtrack' },
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
                          <div className="space-y-8">
                              {itinerary.itinerary.map((day: any, index: number) => (
                                <div key={index}>
                                  <h3 className="text-2xl font-bold font-display mb-4">Day {index + 1}: {day.theme}</h3>
                                  <div className="space-y-4">
                                    {day.activities.map((activity: any, actIndex: number) => (
                                      <div key={actIndex} className="glass-light p-4 rounded-xl border border-white/10">
                                        <h4 className="text-md font-bold">{activity.title}</h4>
                                        <p className="text-sm text-foreground/60 leading-relaxed mt-1">{activity.description}</p>
                                        <div className="flex items-center gap-4 mt-3 text-xs text-foreground/50">
                                          <span><strong>Time:</strong> {activity.time}</span>
                                          <span><strong>Cost:</strong> ${activity.estimated_cost}</span>
                                          <span><strong>Type:</strong> {activity.type}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
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
