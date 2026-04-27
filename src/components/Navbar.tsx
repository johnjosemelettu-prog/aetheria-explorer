
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass, Map as MapIcon, Wallet, User as UserIcon, LogOut, Menu, X, Shield, Store as StoreIcon,
  Sparkles, Zap, Activity, TrendingUp, Heart, Camera, BookOpen, PieChart, ScanFace, ChevronRight,
  Film, Image as ImageIcon, Eye, Wifi, Plane, Recycle, Users, Footprints, Leaf, Languages,
  Gift, MessageSquare, Brain, Lightbulb, MessageCircle, Utensils, Target, Cloud, CheckSquare,
  Glasses, Palette, Train, Star, Building, Castle, Mailbox, Handshake, Receipt, Award, ShieldAlert,
  Swords, Hammer, Wind, CheckCircle, ImagePlus, PenTool, Radio, Box, Ear, Home, AlertTriangle,
  Route, Navigation, AlertOctagon, PhoneCall, Package, Bike, Laptop, Coins, Ticket, Car, Music,
  Calendar, EyeOff, Dna, Headphones, TreePine, Droplets, Bird, SplitSquareHorizontal, Brush,
  Clock, ChevronsLeft, ChevronsRight, ChevronDown, Mic
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile } from '../types';
import { cn } from '../lib/utils';
import AuthModal from './AuthModal';
import CartIcon from './CartIcon';
import Cart from './Cart';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  user: User | null;
}

const CollapsibleSection = ({ title, items, navigate, isExpanded, initiallyOpen = false }: any) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div className={cn("mb-4 px-4", isExpanded && "pt-4 border-t border-white/5")}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-3 ml-2 hover:text-white transition-colors"
      >
        {isExpanded && (
          <>
            <span>{title}</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
          </>
        )}
      </button>
      <AnimatePresence>
        {isOpen && isExpanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-1 overflow-hidden"
          >
            {items.map((item: any) => {
              const isActive = window.location.pathname === item.path;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                      isActive 
                        ? "bg-primary/10 text-primary font-bold" 
                        : "text-foreground/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={cn(
                        "w-4 h-4 transition-colors shrink-0", 
                        isActive ? "text-primary" : "text-foreground/40 group-hover:text-white"
                      )} />
                      <span className="truncate max-w-[170px] text-left">{item.name}</span>
                    </div>
                    <ChevronRight className={cn(
                      "w-4 h-4 opacity-0 -translate-x-2 transition-all",
                      isActive ? "opacity-100 translate-x-0" : "group-hover:opacity-100 group-hover:translate-x-0"
                    )} />
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar({ user }: NavbarProps) {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const isLandingPage = !user && pathname === '/';

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userProfile = docSnap.data() as UserProfile;
          setProfile(userProfile);
          
          const premiumRef = doc(db, 'premium', user.uid);
          const premiumSnap = await getDoc(premiumRef);
          setIsPremium(premiumSnap.exists());
        }
      } else {
        setProfile(null);
        setIsPremium(false);
      }
    };
    fetchProfile();
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (window.innerWidth < 1024 && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsMobileSidebarOpen(false);
      }
    }
    
    if (isMobileSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileSidebarOpen]);

  const handleLogin = () => {
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    signOut(auth);
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    if (window.innerWidth < 1024) {
      setIsMobileSidebarOpen(false);
    }
  };

  
  const menuSections = [
    {
      title: 'Core Hub',
      initiallyOpen: true,
      items: [
        { name: 'Explore', icon: Compass, path: '/' },
        { name: 'Itineraries', icon: MapIcon, path: '/itineraries' },
        { name: 'AI Itinerary', icon: Zap, path: '/ai-itinerary' },
        { name: 'Booking Hub', icon: Plane, path: '/booking' },
        { name: 'Digital Tailor', icon: Activity, path: '/digital-tailor' },
        { name: 'Wallet', icon: Wallet, path: '/wallet' },
        { name: 'eSIM', icon: Wifi, path: '/esim' },
        { name: 'Store', icon: StoreIcon, path: '/store' },
        { name: 'Journal', icon: BookOpen, path: '/journal' },
        { name: 'Profile', icon: UserIcon, path: '/profile' },
      ]
    },
    {
      title: 'AI & Planning',
      items: [
        { name: 'Scenario Planner', icon: Brain, path: '/scenario-planner' },
        { name: 'Serendipity Engine', icon: Sparkles, path: '/serendipity-engine' },
        { name: 'Cognitive Load Balancer', icon: Lightbulb, path: '/cognitive-load-balancer' },
        { name: 'AI Travel Mentor', icon: Star, path: '/ai-travel-mentor' },
        { name: 'Mood Synthesis', icon: Heart, path: '/mood-synthesis' },
        { name: 'Habit Integration', icon: CheckSquare, path: '/habit-integration' },
        { name: 'Budget Synthesis', icon: PieChart, path: '/budget-synthesis' },
        { name: 'Weather Adaptive', icon: Cloud, path: '/weather-adaptive' },
        { name: 'Pathfinder', icon: Route, path: '/pathfinder' },
        { name: 'Flavor Seeker', icon: Utensils, path: '/flavor-seeker' },
        { name: 'AB Testing', icon: SplitSquareHorizontal, path: '/ab-testing' },
        { name: 'Dream Weaver', icon: Sparkles, path: '/dream-weaver' },
        { name: 'Challenge Generator', icon: Target, path: '/challenge-generator' },
      ]
    },
    {
      title: 'AR & Immersive',
      items: [
        { name: 'AR Wayfinding', icon: Navigation, path: '/ar-wayfinding' },
        { name: 'Landmark Lens', icon: Eye, path: '/landmark-lens' },
        { name: 'AR Storytelling', icon: BookOpen, path: '/ar-storytelling' },
        { name: 'Heritage Mirror', icon: ScanFace, path: '/heritage-mirror' },
        { name: 'AR Menu', icon: Utensils, path: '/ar-menu' },
        { name: 'Paint The Town', icon: Palette, path: '/paint-the-town' },
        { name: 'Sky Gazer', icon: Star, path: '/sky-gazer' },
        { name: 'AR Time Lapse', icon: Clock, path: '/ar-time-lapse' },
        { name: 'AR Art Gallery', icon: ImagePlus, path: '/ar-art-gallery' },
        { name: 'AR Transit X-Ray', icon: Train, path: '/ar-transit' },
        { name: 'AR Ghost Tours', icon: Eye, path: '/ar-ghost-tours' },
        { name: 'AR Historical', icon: Castle, path: '/ar-historical' },
        { name: 'AR Ancient Ruins', icon: Building, path: '/ar-ancient-ruins' },
        { name: 'Memory Palace', icon: Brain, path: '/memory-palace' },
        { name: 'VR Pre-Trip', icon: Glasses, path: '/vr-pre-trip' },
        { name: 'VR Immobile Travel', icon: Glasses, path: '/vr-immobile' },
        { name: 'VR Meditation', icon: Glasses, path: '/vr-meditation' },
        { name: 'VR Extreme Sports', icon: Glasses, path: '/vr-extreme-sports' },
        { name: 'Postcard Studio', icon: ImageIcon, path: '/postcard-studio' },
        { name: 'Video Teaser', icon: Film, path: '/video-teaser' },
        { name: 'Audio Guide', icon: Headphones, path: '/audio-guide' },
      ]
    },
    {
      title: 'Food & Gastronomy',
      items: [
        { name: 'Local Food Bingo', icon: Target, path: '/local-food-bingo' },
        { name: 'Local Produce Challenge', icon: Leaf, path: '/local-produce-challenge' },
        { name: 'Mystery Meal', icon: Utensils, path: '/mystery-meal' },
        { name: "Chef's Table", icon: Utensils, path: '/chefs-table' },
        { name: 'Street Food Tour', icon: Utensils, path: '/street-food-tour' },
        { name: 'Wine Tasting', icon: Utensils, path: '/wine-tasting' },
        { name: 'Cocktail Companion', icon: Utensils, path: '/cocktail-companion' },
        { name: 'Brewery Tour', icon: Utensils, path: '/brewery-tour' },
        { name: 'Coffee Connoisseur', icon: Utensils, path: '/coffee-connoisseur' },
        { name: 'Tea Ceremony', icon: Utensils, path: '/tea-ceremony' },
        { name: 'Vegan Finder', icon: Leaf, path: '/vegan-finder' },
        { name: 'Gluten Free Guide', icon: Utensils, path: '/gluten-free' },
        { name: 'Food History', icon: BookOpen, path: '/food-history' },
        { name: 'Recipe Collector', icon: BookOpen, path: '/recipe-collector' },
        { name: 'Forage Map', icon: MapIcon, path: '/forage-map' },
        { name: 'Home Cooked Meal', icon: Home, path: '/home-cooked-meal' },
        { name: 'Coffee With Local', icon: Users, path: '/coffee-local' },
        { name: 'Farm To Table', icon: Leaf, path: '/farm-to-table' },
        { name: 'Food Blogger Mode', icon: PenTool, path: '/food-blogger' },
        { name: 'Flavor DNA', icon: Dna, path: '/travel-dna' },
      ]
    },
    {
      title: 'Wellness & Fitness',
      items: [
        { name: 'Digital Detox', icon: EyeOff, path: '/digital-detox' },
        { name: 'Bio Data Monitor', icon: Activity, path: '/bio-data' },
        { name: 'Personalized Meditation', icon: Heart, path: '/personalized-meditation' },
        { name: 'Find A Gym', icon: Activity, path: '/find-gym' },
        { name: 'Running Trails', icon: Footprints, path: '/running-trails' },
        { name: 'Travel Sleep Tracker', icon: Clock, path: '/travel-sleep' },
        { name: 'Mental Health Support', icon: Heart, path: '/mental-health' },
        { name: 'Spa & Wellness', icon: Sparkles, path: '/spa-wellness' },
        { name: 'Travel Workouts', icon: Activity, path: '/travel-workouts' },
        { name: 'Mindful Walking', icon: Footprints, path: '/mindful-walking' },
        { name: 'Stress Monitor', icon: Activity, path: '/stress-monitor' },
        { name: 'Hydration Reminder', icon: Droplets, path: '/hydration' },
        { name: 'Calorie Tracker', icon: PieChart, path: '/calorie-tracker' },
        { name: 'Circadian Protocol', icon: Clock, path: '/chronosync' },
      ]
    },
    {
      title: 'Eco & Sustainability',
      items: [
        { name: 'Carbon Synthesis', icon: Leaf, path: '/carbon-synthesis' },
        { name: 'Eco Warrior Quests', icon: TreePine, path: '/eco-warrior-quests' },
        { name: 'Leave Positive Trace', icon: Leaf, path: '/positive-trace' },
        { name: 'Green Transit Score', icon: Recycle, path: '/green-transit-score' },
        { name: 'Reforestation Rewards', icon: TreePine, path: '/reforestation-rewards' },
        { name: 'Sustainable Partners', icon: Handshake, path: '/sustainable-partners' },
        { name: 'Water Refill Finder', icon: Droplets, path: '/water-refill' },
        { name: 'Wildlife Sighting', icon: Bird, path: '/wildlife-sighting' },
        { name: 'Conservation Circle', icon: Recycle, path: '/conservation-circle' },
        { name: 'Animal Translator', icon: MessageCircle, path: '/animal-translator' },
        { name: 'Transport CO2', icon: Recycle, path: '/transport-co2' },
        { name: 'Leave No Trace', icon: Leaf, path: '/leave-no-trace' },
        { name: 'Volunteer Opportunities', icon: Heart, path: '/volunteer-opportunities' },
        { name: 'Eco Leaderboard', icon: Award, path: '/eco-leaderboard' },
      ]
    },
    {
      title: 'Nightlife & Entertainment',
      items: [
        { name: 'Local Music Scene', icon: Music, path: '/local-music' },
        { name: 'Live Music Finder', icon: Music, path: '/live-music' },
        { name: 'Festival Forecaster', icon: Calendar, path: '/festival-forecaster' },
        { name: 'Clubbing Guide', icon: Music, path: '/clubbing-guide' },
        { name: 'Comedy Club', icon: MessageSquare, path: '/comedy-club' },
        { name: 'Theater Booking', icon: Ticket, path: '/theater-booking' },
        { name: 'Karaoke Finder', icon: Mic, path: '/karaoke-finder' },
        { name: 'Speakeasy Guide', icon: Music, path: '/speakeasy-guide' },
        { name: 'Night Market', icon: StoreIcon, path: '/night-market' },
        { name: 'Rooftop Bar', icon: Building, path: '/rooftop-bar' },
        { name: 'Stargazing Spots', icon: Star, path: '/stargazing-spots' },
        { name: 'Travel Soundtrack', icon: Music, path: '/travel-soundtrack' },
        { name: 'Cinema Language', icon: Film, path: '/cinema-language' },
        { name: 'Lost In Translation Game', icon: Languages, path: '/lost-in-translation' },
      ]
    },
    {
      title: 'Local Culture',
      items: [
        { name: 'Cultural Etiquette', icon: BookOpen, path: '/cultural-etiquette-guide' },
        { name: 'Myth & Folklore', icon: Castle, path: '/myth-folklore' },
        { name: 'Ancestry Trail', icon: Dna, path: '/ancestry-trail' },
        { name: 'Local Legends', icon: Star, path: '/local-legends' },
        { name: 'Local Slang Challenge', icon: MessageSquare, path: '/local-slang' },
        { name: 'Local Dialect Tutor', icon: Languages, path: '/local-dialect' },
        { name: 'Skill Exchange Hub', icon: Handshake, path: '/skill-exchange-hub' },
        { name: 'Street Art Sagas', icon: Brush, path: '/street-art-sagas' },
        { name: 'Translation Earbuds', icon: Ear, path: '/translation-earbuds' },
        { name: 'Translator', icon: Languages, path: '/translator' },
        { name: 'Local Hero Connect', icon: Users, path: '/local-hero-connect' },
        { name: 'Live Like A Local', icon: Home, path: '/live-like-local' },
        { name: 'Secret Local Spots', icon: MapIcon, path: '/secret-spots' },
        { name: 'Artisan Finder', icon: Hammer, path: '/artisan-finder' },
      ]
    },
    {
      title: 'Safety & Legal',
      items: [
        { name: 'Travel Insurance', icon: Shield, path: '/travel-insurance' },
        { name: 'Digital Passport', icon: Shield, path: '/digital-passport' },
        { name: 'Scam Alert Radar', icon: AlertOctagon, path: '/scam-radar' },
        { name: 'Safety Swarm', icon: ShieldAlert, path: '/safety-swarm' },
        { name: 'Virtual Embassy', icon: Building, path: '/virtual-embassy' },
        { name: 'Emergency Phrases', icon: PhoneCall, path: '/emergency-phrases' },
        { name: 'Find A Doctor', icon: Heart, path: '/find-doctor' },
        { name: 'Water Quality Alerts', icon: Droplets, path: '/water-quality' },
        { name: 'Air Quality Alerts', icon: Wind, path: '/air-quality' },
        { name: 'Disaster Warnings', icon: AlertTriangle, path: '/disaster-warnings' },
        { name: 'Allergen Alert', icon: AlertTriangle, path: '/allergen-alert' },
        { name: 'Visa & Passport', icon: Mailbox, path: '/visa-passport' },
        { name: 'Vaccination', icon: CheckCircle, path: '/vaccination' },
        { name: 'Get Me Home', icon: Home, path: '/get-me-home' },
        { name: 'Lost Luggage', icon: Package, path: '/lost-luggage' },
        { name: 'Driving Laws', icon: Car, path: '/driving-laws' },
      ]
    },
    {
      title: 'Transit & Finance',
      items: [
        { name: 'Currency Exchange', icon: TrendingUp, path: '/currency-exchange' },
        { name: 'Flight Delay Predictor', icon: Plane, path: '/flight-delay' },
        { name: 'Bike & Scooter Rental', icon: Bike, path: '/bike-rental' },
        { name: 'Ferry Booking', icon: Compass, path: '/ferry-booking' },
        { name: 'Scenic Route Planner', icon: Route, path: '/scenic-route' },
        { name: 'Layover Adventure', icon: Plane, path: '/layover-adventure' },
        { name: 'Public Transport Pass', icon: Train, path: '/public-transport' },
        { name: 'ATM Finder', icon: Coins, path: '/atm-finder' },
        { name: 'Tax Free Shopping', icon: Receipt, path: '/tax-free' },
        { name: 'Ticket Aggregator', icon: Ticket, path: '/ticket-aggregator' },
        { name: 'Traveler Carpooling', icon: Car, path: '/traveler-carpool' },
        { name: 'Last Mile Transit', icon: Route, path: '/last-mile' },
        { name: 'Rental Synthesizer', icon: Car, path: '/rental-synthesizer' },
        { name: 'Digital Nomad Hub', icon: Laptop, path: '/digital-nomad-hub' },
      ]
    },
    {
      title: 'Social & Games',
      items: [
        { name: 'Travelers Guilds', icon: Users, path: '/travelers-guilds' },
        { name: 'Faction Wars', icon: Swords, path: '/faction-wars' },
        { name: 'Bounty Board', icon: Target, path: '/bounty-board' },
        { name: 'Travel Charades', icon: Users, path: '/travel-charades' },
        { name: 'Global Treasure Hunt', icon: MapIcon, path: '/global-treasure-hunt' },
        { name: 'City Capture The Flag', icon: Target, path: '/capture-the-flag' },
        { name: 'Traveler Duels', icon: Swords, path: '/traveler-duels' },
        { name: 'Shared Expense', icon: Receipt, path: '/shared-expense' },
        { name: 'Pay It Forward', icon: Gift, path: '/pay-it-forward' },
        { name: 'Collaborative Diary', icon: BookOpen, path: '/collaborative-diary' },
        { name: 'Itinerary Trading', icon: TrendingUp, path: '/itinerary-trading' },
        { name: 'Mystery Pen Pal', icon: Mailbox, path: '/mystery-pen-pal' },
        { name: 'Guess The Location', icon: MapIcon, path: '/guess-the-location' },
        { name: 'Echoes of Past Travelers', icon: Radio, path: '/echoes-of-past-travelers' },
      ]
    },
    {
      title: 'Creative & Memories',
      items: [
        { name: 'AI Story Scout', icon: BookOpen, path: '/story-scout' },
        { name: 'Meme My Trip', icon: ImageIcon, path: '/meme-my-trip' },
        { name: 'AI Blogger', icon: PenTool, path: '/ai-blogger' },
        { name: 'Travel Poem', icon: PenTool, path: '/travel-poem' },
        { name: 'Memory Mapper', icon: MapIcon, path: '/map-memories' },
        { name: 'Sensory Journal', icon: BookOpen, path: '/sensory-journal' },
        { name: 'Historical Dialogue Bot', icon: MessageCircle, path: '/historical-bot' },
        { name: 'Postcard AI', icon: ImagePlus, path: '/ai-postcards' },
        { name: 'Digital Souvenir Forging', icon: Box, path: '/digital-souvenir-forging' },
        { name: 'Travel Tattoo Design', icon: PenTool, path: '/travel-tattoo' },
        { name: 'Trip Color Palette', icon: Palette, path: '/trip-color-palette' },
        { name: 'Vibe Filters', icon: Camera, path: '/vibe-filters' },
        { name: 'Collaborative Scrapbook', icon: ImagePlus, path: '/collaborative-scrapbook' },
        { name: 'Travel Legacy', icon: Award, path: '/travel-legacy' },
        { name: 'Photo Of The Day', icon: Camera, path: '/photo-of-the-day' },
        { name: 'Gif Maker', icon: Film, path: '/gif-maker' },
        { name: 'Vlog Generator', icon: Film, path: '/vlog-generator' },
      ]
    },
  ];

  if (profile?.role === 'admin') {
    menuSections.push({
      title: "Administration",
      items: [{ name: 'Admin Console', icon: Shield, path: '/admin' }]
    });
  }
  if (profile?.role === 'partner') {
    menuSections.push({
      title: "Partners",
      items: [{ name: 'Partner Dashboard', icon: StoreIcon, path: '/vendor/dashboard' }]
    });
  }

  return (
    <>
      <AnimatePresence>
        {isPremium && (
          <motion.div 
            initial={{ height: 0 }} 
            animate={{ height: 'auto' }} 
            exit={{ height: 0 }} 
            className="overflow-hidden"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center text-sm font-semibold p-2">
              <p>Premium user!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    {/* Sidebar Navigation */}
    <aside 
      className={cn(
        "fixed top-0 left-0 bottom-0 z-50 bg-[#0a0a0a] border-r border-white/10 flex flex-col shadow-2xl transition-all duration-300 ease-in-out",
        isSidebarExpanded ? "w-72" : "w-20",
        "lg:translate-x-0",
        isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
      ref={sidebarRef}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 shrink-0">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img src="/logo.png" alt="Aetheria Logo" className="w-8 h-8 shrink-0" />
            <AnimatePresence>
              {isSidebarExpanded && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl font-display font-bold tracking-tighter whitespace-nowrap"
                >
                  AETHERIA
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        <button 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="lg:hidden p-2 rounded-lg glass-hover text-foreground/50 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User Info */}
      <div className={cn("p-6 border-b border-white/5 bg-white/[0.02] shrink-0 overflow-hidden", isSidebarExpanded ? "h-auto" : "h-0 p-0 border-0")}>
         {/* Content from previous user info section */}
      </div>

      {/* Scrollable Nav Links */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar py-6">
        {!isLandingPage && menuSections.map((section, idx) => (
          <CollapsibleSection 
            key={idx} 
            title={section.title} 
            items={section.items} 
            navigate={navigate} 
            isExpanded={isSidebarExpanded}
            initiallyOpen={section.initiallyOpen}
          />
        ))}
      </div>

      {/* Sidebar Footer (Logout & Collapse) */}
      <div className="p-4 border-t border-white/5 shrink-0 bg-black/20">
        {user && isSidebarExpanded && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl glass-hover text-accent font-bold text-sm transition-colors hover:bg-accent/10 mb-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        )}
        <button 
          onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl glass-hover text-foreground/70 font-bold text-sm transition-colors hover:bg-white/5"
        >
          {isSidebarExpanded ? <ChevronsLeft className="w-4 h-4" /> : <ChevronsRight className="w-4 h-4" />}
          {isSidebarExpanded && <span>Collapse Menu</span>}
        </button>
      </div>
    </aside>

    {/* Top Navbar (Mobile Only) */}
    <nav className="lg:hidden fixed top-0 left-0 right-0 z-30 glass border-b border-white/5 h-16 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-2 -ml-2 rounded-lg glass-hover text-foreground hover:text-primary transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <img src="/logo.png" alt="Aetheria Logo" className="w-8 h-8" />
      </div>
    </nav>

    {/* Cart Icon */}
    {user && (
      <div className="fixed top-2 right-4 z-40 h-12 flex items-center">
         <div className="bg-black/60 backdrop-blur-md rounded-full p-2 border border-white/10 shadow-lg">
            <CartIcon onClick={() => setIsCartOpen(true)} />
         </div>
      </div>
    )}

    {/* Mobile Backdrop overlay */}
    <AnimatePresence>
      {isMobileSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
        />
      )}
    </AnimatePresence>

    <AuthModal 
      isOpen={isAuthModalOpen} 
      onClose={() => setIsAuthModalOpen(false)} 
    />
    <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
