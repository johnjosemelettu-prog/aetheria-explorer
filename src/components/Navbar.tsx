
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
    const { t } = useTranslation();
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
      title: t('menu.sections.Core Hub'),
      initiallyOpen: true,
      items: [
        { name: t('menu.items.Explore'), icon: Compass, path: '/' },
        { name: t('menu.items.Itineraries'), icon: MapIcon, path: '/itineraries' },
        { name: t('menu.items.AI Itinerary'), icon: Zap, path: '/ai-itinerary' },
        { name: t('menu.items.Booking Hub'), icon: Plane, path: '/booking' },
        { name: t('menu.items.Digital Tailor'), icon: Activity, path: '/digital-tailor' },
        { name: t('menu.items.Wallet'), icon: Wallet, path: '/wallet' },
        { name: t('menu.items.eSIM'), icon: Wifi, path: '/esim' },
        { name: t('menu.items.Store'), icon: StoreIcon, path: '/store' },
        { name: t('menu.items.Journal'), icon: BookOpen, path: '/journal' },
        { name: t('menu.items.Profile'), icon: UserIcon, path: '/profile' },
      ]
    },
    {
      title: 'Loyalty & Sovereign Clubs',
      initiallyOpen: true,
      items: [
        { name: 'Centralized Global Club', icon: Award, path: '/global-club' },
        { name: 'Regional Hubs Strategy', icon: Users, path: '/regional-hubs' },
        { name: 'Event Foundry', icon: Hammer, path: '/event-foundry' },
        { name: 'Advanced Ticketing', icon: Ticket, path: '/advanced-ticketing' },
        { name: 'Hyper-Region Sub-Clubs', icon: MapIcon, path: '/hyper-region-sub-clubs' },
        { name: 'Lighthouse Beacon', icon: Radio, path: '/lighthouse-beacon' },
        { name: 'Gamified Event Tiers', icon: Star, path: '/gamified-event-tiers' },
      ]
    },
    {
      title: t('menu.sections.AI & Planning'),
      items: [
        { name: t('menu.items.Scenario Planner'), icon: Brain, path: '/scenario-planner' },
        { name: t('menu.items.Serendipity Engine'), icon: Sparkles, path: '/serendipity-engine' },
        { name: t('menu.items.Cognitive Load Balancer'), icon: Lightbulb, path: '/cognitive-load-balancer' },
        { name: t('menu.items.AI Travel Mentor'), icon: Star, path: '/ai-travel-mentor' },
        { name: t('menu.items.Mood Synthesis'), icon: Heart, path: '/mood-synthesis' },
        { name: t('menu.items.Habit Integration'), icon: CheckSquare, path: '/habit-integration' },
        { name: t('menu.items.Budget Synthesis'), icon: PieChart, path: '/budget-synthesis' },
        { name: t('menu.items.Weather Adaptive'), icon: Cloud, path: '/weather-adaptive' },
        { name: t('menu.items.Pathfinder'), icon: Route, path: '/pathfinder' },
        { name: t('menu.items.Flavor Seeker'), icon: Utensils, path: '/flavor-seeker' },
        { name: t('menu.items.AB Testing'), icon: SplitSquareHorizontal, path: '/ab-testing' },
        { name: t('menu.items.Dream Weaver'), icon: Sparkles, path: '/dream-weaver' },
        { name: t('menu.items.Challenge Generator'), icon: Target, path: '/challenge-generator' },
      ]
    },
    {
      title: t('menu.sections.AR & Immersive'),
      items: [
        { name: t('menu.items.AR Wayfinding'), icon: Navigation, path: '/ar-wayfinding' },
        { name: t('menu.items.Landmark Lens'), icon: Eye, path: '/landmark-lens' },
        { name: t('menu.items.AR Storytelling'), icon: BookOpen, path: '/ar-storytelling' },
        { name: t('menu.items.Heritage Mirror'), icon: ScanFace, path: '/heritage-mirror' },
        { name: t('menu.items.AR Menu'), icon: Utensils, path: '/ar-menu' },
        { name: t('menu.items.Paint The Town'), icon: Palette, path: '/paint-the-town' },
        { name: t('menu.items.Sky Gazer'), icon: Star, path: '/sky-gazer' },
        { name: t('menu.items.AR Time Lapse'), icon: Clock, path: '/ar-time-lapse' },
        { name: t('menu.items.AR Art Gallery'), icon: ImagePlus, path: '/ar-art-gallery' },
        { name: t('menu.items.AR Transit X-Ray'), icon: Train, path: '/ar-transit' },
        { name: t('menu.items.AR Ghost Tours'), icon: Eye, path: '/ar-ghost-tours' },
        { name: t('menu.items.AR Historical'), icon: Castle, path: '/ar-historical' },
        { name: t('menu.items.AR Ancient Ruins'), icon: Building, path: '/ar-ancient-ruins' },
        { name: t('menu.items.Memory Palace'), icon: Brain, path: '/memory-palace' },
        { name: t('menu.items.VR Pre-Trip'), icon: Glasses, path: '/vr-pre-trip' },
        { name: t('menu.items.VR Immobile Travel'), icon: Glasses, path: '/vr-immobile' },
        { name: t('menu.items.VR Meditation'), icon: Glasses, path: '/vr-meditation' },
        { name: t('menu.items.VR Extreme Sports'), icon: Glasses, path: '/vr-extreme-sports' },
        { name: t('menu.items.Postcard Studio'), icon: ImageIcon, path: '/postcard-studio' },
        { name: t('menu.items.Video Teaser'), icon: Film, path: '/video-teaser' },
        { name: t('menu.items.Audio Guide'), icon: Headphones, path: '/audio-guide' },
      ]
    },
    {
      title: t('menu.sections.Food & Gastronomy'),
      items: [
        { name: t('menu.items.Local Food Bingo'), icon: Target, path: '/local-food-bingo' },
        { name: t('menu.items.Local Produce Challenge'), icon: Leaf, path: '/local-produce-challenge' },
        { name: t('menu.items.Mystery Meal'), icon: Utensils, path: '/mystery-meal' },
        { name: t("menu.items.Chef's Table"), icon: Utensils, path: '/chefs-table' },
        { name: t('menu.items.Street Food Tour'), icon: Utensils, path: '/street-food-tour' },
        { name: t('menu.items.Wine Tasting'), icon: Utensils, path: '/wine-tasting' },
        { name: t('menu.items.Cocktail Companion'), icon: Utensils, path: '/cocktail-companion' },
        { name: t('menu.items.Brewery Tour'), icon: Utensils, path: '/brewery-tour' },
        { name: t('menu.items.Coffee Connoisseur'), icon: Utensils, path: '/coffee-connoisseur' },
        { name: t('menu.items.Tea Ceremony'), icon: Utensils, path: '/tea-ceremony' },
        { name: t('menu.items.Vegan Finder'), icon: Leaf, path: '/vegan-finder' },
        { name: t('menu.items.Gluten Free Guide'), icon: Utensils, path: '/gluten-free' },
        { name: t('menu.items.Food History'), icon: BookOpen, path: '/food-history' },
        { name: t('menu.items.Recipe Collector'), icon: BookOpen, path: '/recipe-collector' },
        { name: t('menu.items.Forage Map'), icon: MapIcon, path: '/forage-map' },
        { name: t('menu.items.Home Cooked Meal'), icon: Home, path: '/home-cooked-meal' },
        { name: t('menu.items.Coffee With Local'), icon: Users, path: '/coffee-local' },
        { name: t('menu.items.Farm To Table'), icon: Leaf, path: '/farm-to-table' },
        { name: t('menu.items.Food Blogger Mode'), icon: PenTool, path: '/food-blogger' },
        { name: t('menu.items.Flavor DNA'), icon: Dna, path: '/travel-dna' },
      ]
    },
    {
      title: t('menu.sections.Wellness & Fitness'),
      items: [
        { name: t('menu.items.Digital Detox'), icon: EyeOff, path: '/digital-detox' },
        { name: t('menu.items.Bio Data Monitor'), icon: Activity, path: '/bio-data' },
        { name: t('menu.items.Personalized Meditation'), icon: Heart, path: '/personalized-meditation' },
        { name: t('menu.items.Find A Gym'), icon: Activity, path: '/find-gym' },
        { name: t('menu.items.Running Trails'), icon: Footprints, path: '/running-trails' },
        { name: t('menu.items.Travel Sleep Tracker'), icon: Clock, path: '/travel-sleep' },
        { name: t('menu.items.Mental Health Support'), icon: Heart, path: '/mental-health' },
        { name: t('menu.items.Spa & Wellness'), icon: Sparkles, path: '/spa-wellness' },
        { name: t('menu.items.Travel Workouts'), icon: Activity, path: '/travel-workouts' },
        { name: t('menu.items.Mindful Walking'), icon: Footprints, path: '/mindful-walking' },
        { name: t('menu.items.Stress Monitor'), icon: Activity, path: '/stress-monitor' },
        { name: t('menu.items.Hydration Reminder'), icon: Droplets, path: '/hydration' },
        { name: t('menu.items.Calorie Tracker'), icon: PieChart, path: '/calorie-tracker' },
        { name: t('menu.items.Circadian Protocol'), icon: Clock, path: '/chronosync' },
      ]
    },
    {
      title: t('menu.sections.Eco & Sustainability'),
      items: [
        { name: t('menu.items.Carbon Synthesis'), icon: Leaf, path: '/carbon-synthesis' },
        { name: t('menu.items.Eco Warrior Quests'), icon: TreePine, path: '/eco-warrior-quests' },
        { name: t('menu.items.Leave Positive Trace'), icon: Leaf, path: '/positive-trace' },
        { name: t('menu.items.Green Transit Score'), icon: Recycle, path: '/green-transit-score' },
        { name: t('menu.items.Reforestation Rewards'), icon: TreePine, path: '/reforestation-rewards' },
        { name: t('menu.items.Sustainable Partners'), icon: Handshake, path: '/sustainable-partners' },
        { name: t('menu.items.Water Refill Finder'), icon: Droplets, path: '/water-refill' },
        { name: t('menu.items.Wildlife Sighting'), icon: Bird, path: '/wildlife-sighting' },
        { name: t('menu.items.Conservation Circle'), icon: Recycle, path: '/conservation-circle' },
        { name: t('menu.items.Animal Translator'), icon: MessageCircle, path: '/animal-translator' },
        { name: t('menu.items.Transport CO2'), icon: Recycle, path: '/transport-co2' },
        { name: t('menu.items.Leave No Trace'), icon: Leaf, path: '/leave-no-trace' },
        { name: t('menu.items.Volunteer Opportunities'), icon: Heart, path: '/volunteer-opportunities' },
        { name: t('menu.items.Eco Leaderboard'), icon: Award, path: '/eco-leaderboard' },
      ]
    },
    {
      title: t('menu.sections.Nightlife & Entertainment'),
      items: [
        { name: t('menu.items.Local Music Scene'), icon: Music, path: '/local-music' },
        { name: t('menu.items.Live Music Finder'), icon: Music, path: '/live-music' },
        { name: t('menu.items.Festival Forecaster'), icon: Calendar, path: '/festival-forecaster' },
        { name: t('menu.items.Clubbing Guide'), icon: Music, path: '/clubbing-guide' },
        { name: t('menu.items.Comedy Club'), icon: MessageSquare, path: '/comedy-club' },
        { name: t('menu.items.Theater Booking'), icon: Ticket, path: '/theater-booking' },
        { name: t('menu.items.Karaoke Finder'), icon: Mic, path: '/karaoke-finder' },
        { name: t('menu.items.Speakeasy Guide'), icon: Music, path: '/speakeasy-guide' },
        { name: t('menu.items.Night Market'), icon: StoreIcon, path: '/night-market' },
        { name: t('menu.items.Rooftop Bar'), icon: Building, path: '/rooftop-bar' },
        { name: t('menu.items.Stargazing Spots'), icon: Star, path: '/stargazing-spots' },
        { name: t('menu.items.Travel Soundtrack'), icon: Music, path: '/travel-soundtrack' },
        { name: t('menu.items.Cinema Language'), icon: Film, path: '/cinema-language' },
        { name: t('menu.items.Lost In Translation Game'), icon: Languages, path: '/lost-in-translation' },
      ]
    },
    {
      title: t('menu.sections.Local Culture'),
      items: [
        { name: t('menu.items.Cultural Etiquette'), icon: BookOpen, path: '/cultural-etiquette-guide' },
        { name: t('menu.items.Myth & Folklore'), icon: Castle, path: '/myth-folklore' },
        { name: t('menu.items.Ancestry Trail'), icon: Dna, path: '/ancestry-trail' },
        { name: t('menu.items.Local Legends'), icon: Star, path: '/local-legends' },
        { name: t('menu.items.Local Slang Challenge'), icon: MessageSquare, path: '/local-slang' },
        { name: t('menu.items.Local Dialect Tutor'), icon: Languages, path: '/local-dialect' },
        { name: t('menu.items.Skill Exchange Hub'), icon: Handshake, path: '/skill-exchange-hub' },
        { name: t('menu.items.Street Art Sagas'), icon: Brush, path: '/street-art-sagas' },
        { name: t('menu.items.Translation Earbuds'), icon: Ear, path: '/translation-earbuds' },
        { name: t('menu.items.Translator'), icon: Languages, path: '/translator' },
        { name: t('menu.items.Local Hero Connect'), icon: Users, path: '/local-hero-connect' },
        { name: t('menu.items.Live Like A Local'), icon: Home, path: '/live-like-local' },
        { name: t('menu.items.Secret Local Spots'), icon: MapIcon, path: '/secret-spots' },
        { name: t('menu.items.Artisan Finder'), icon: Hammer, path: '/artisan-finder' },
      ]
    },
    {
      title: t('menu.sections.Safety & Legal'),
      items: [
        { name: t('menu.items.Travel Insurance'), icon: Shield, path: '/travel-insurance' },
        { name: t('menu.items.Digital Passport'), icon: Shield, path: '/digital-passport' },
        { name: t('menu.items.Scam Alert Radar'), icon: AlertOctagon, path: '/scam-radar' },
        { name: t('menu.items.Safety Swarm'), icon: ShieldAlert, path: '/safety-swarm' },
        { name: t('menu.items.Virtual Embassy'), icon: Building, path: '/virtual-embassy' },
        { name: t('menu.items.Emergency Phrases'), icon: PhoneCall, path: '/emergency-phrases' },
        { name: t('menu.items.Find A Doctor'), icon: Heart, path: '/find-doctor' },
        { name: t('menu.items.Water Quality Alerts'), icon: Droplets, path: '/water-quality' },
        { name: t('menu.items.Air Quality Alerts'), icon: Wind, path: '/air-quality' },
        { name: t('menu.items.Disaster Warnings'), icon: AlertTriangle, path: '/disaster-warnings' },
        { name: t('menu.items.Allergen Alert'), icon: AlertTriangle, path: '/allergen-alert' },
        { name: t('menu.items.Visa & Passport'), icon: Mailbox, path: '/visa-passport' },
        { name: t('menu.items.Vaccination'), icon: CheckCircle, path: '/vaccination' },
        { name: t('menu.items.Get Me Home'), icon: Home, path: '/get-me-home' },
        { name: t('menu.items.Lost Luggage'), icon: Package, path: '/lost-luggage' },
        { name: t('menu.items.Driving Laws'), icon: Car, path: '/driving-laws' },
      ]
    },
    {
      title: t('menu.sections.Transit & Finance'),
      items: [
        { name: t('menu.items.Currency Exchange'), icon: TrendingUp, path: '/currency-exchange' },
        { name: t('menu.items.Flight Delay Predictor'), icon: Plane, path: '/flight-delay' },
        { name: t('menu.items.Bike & Scooter Rental'), icon: Bike, path: '/bike-rental' },
        { name: t('menu.items.Ferry Booking'), icon: Compass, path: '/ferry-booking' },
        { name: t('menu.items.Scenic Route Planner'), icon: Route, path: '/scenic-route' },
        { name: t('menu.items.Layover Adventure'), icon: Plane, path: '/layover-adventure' },
        { name: t('menu.items.Public Transport Pass'), icon: Train, path: '/public-transport' },
        { name: t('menu.items.ATM Finder'), icon: Coins, path: '/atm-finder' },
        { name: t('menu.items.Tax Free Shopping'), icon: Receipt, path: '/tax-free' },
        { name: t('menu.items.Ticket Aggregator'), icon: Ticket, path: '/ticket-aggregator' },
        { name: t('menu.items.Traveler Carpooling'), icon: Car, path: '/traveler-carpool' },
        { name: t('menu.items.Last Mile Transit'), icon: Route, path: '/last-mile' },
        { name: t('menu.items.Rental Synthesizer'), icon: Car, path: '/rental-synthesizer' },
        { name: t('menu.items.Digital Nomad Hub'), icon: Laptop, path: '/digital-nomad-hub' },
      ]
    },
    {
      title: t('menu.sections.Social & Games'),
      items: [
        { name: t('menu.items.Travelers Guilds'), icon: Users, path: '/travelers-guilds' },
        { name: t('menu.items.Faction Wars'), icon: Swords, path: '/faction-wars' },
        { name: t('menu.items.Bounty Board'), icon: Target, path: '/bounty-board' },
        { name: t('menu.items.Travel Charades'), icon: Users, path: '/travel-charades' },
        { name: t('menu.items.Global Treasure Hunt'), icon: MapIcon, path: '/global-treasure-hunt' },
        { name: t('menu.items.City Capture The Flag'), icon: Target, path: '/capture-the-flag' },
        { name: t('menu.items.Traveler Duels'), icon: Swords, path: '/traveler-duels' },
        { name: t('menu.items.Shared Expense'), icon: Receipt, path: '/shared-expense' },
        { name: t('menu.items.Pay It Forward'), icon: Gift, path: '/pay-it-forward' },
        { name: t('menu.items.Collaborative Diary'), icon: BookOpen, path: '/collaborative-diary' },
        { name: t('menu.items.Itinerary Trading'), icon: TrendingUp, path: '/itinerary-trading' },
        { name: t('menu.items.Mystery Pen Pal'), icon: Mailbox, path: '/mystery-pen-pal' },
        { name: t('menu.items.Guess The Location'), icon: MapIcon, path: '/guess-the-location' },
        { name: t('menu.items.Echoes of Past Travelers'), icon: Radio, path: '/echoes-of-past-travelers' },
      ]
    },
    {
      title: t('menu.sections.Creative & Memories'),
      items: [
        { name: t('menu.items.AI Story Scout'), icon: BookOpen, path: '/story-scout' },
        { name: t('menu.items.Meme My Trip'), icon: ImageIcon, path: '/meme-my-trip' },
        { name: t('menu.items.AI Blogger'), icon: PenTool, path: '/ai-blogger' },
        { name: t('menu.items.Travel Poem'), icon: PenTool, path: '/travel-poem' },
        { name: t('menu.items.Memory Mapper'), icon: MapIcon, path: '/map-memories' },
        { name: t('menu.items.Sensory Journal'), icon: BookOpen, path: '/sensory-journal' },
        { name: t('menu.items.Historical Dialogue Bot'), icon: MessageCircle, path: '/historical-bot' },
        { name: t('menu.items.Postcard AI'), icon: ImagePlus, path: '/ai-postcards' },
        { name: t('menu.items.Digital Souvenir Forging'), icon: Box, path: '/digital-souvenir-forging' },
        { name: t('menu.items.Travel Tattoo Design'), icon: PenTool, path: '/travel-tattoo' },
        { name: t('menu.items.Trip Color Palette'), icon: Palette, path: '/trip-color-palette' },
        { name: t('menu.items.Vibe Filters'), icon: Camera, path: '/vibe-filters' },
        { name: t('menu.items.Collaborative Scrapbook'), icon: ImagePlus, path: '/collaborative-scrapbook' },
        { name: t('menu.items.Travel Legacy'), icon: Award, path: '/travel-legacy' },
        { name: t('menu.items.Photo Of The Day'), icon: Camera, path: '/photo-of-the-day' },
        { name: t('menu.items.Gif Maker'), icon: Film, path: '/gif-maker' },
        { name: t('menu.items.Vlog Generator'), icon: Film, path: '/vlog-generator' },
      ]
    },
  ];

  if (profile?.role === 'admin') {
    menuSections.push({
      title: t('menu.sections.Administration'),
      items: [{ name: t('menu.items.Admin Console'), icon: Shield, path: '/admin' }]
    });
  }
  if (profile?.role === 'partner') {
    menuSections.push({
      title: t('menu.sections.Partners'),
      items: [{ name: t('menu.items.Partner Dashboard'), icon: StoreIcon, path: '/vendor/dashboard' }]
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
              <p>{t('auto.auto_premium_user__1932')}</p>
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
            <img src="/logo.png" alt={t('auto.auto_aetheria_logo_1931')} className="w-8 h-8 shrink-0" />
            <AnimatePresence>
              {isSidebarExpanded && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl font-display font-bold tracking-tighter whitespace-nowrap"
                >
                  {t('auto.auto_aetheria_1930')}
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
            {t('auto.auto_sign_out_1929')}
                                    </button>
        )}
        <button 
          onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl glass-hover text-foreground/70 font-bold text-sm transition-colors hover:bg-white/5"
        >
          {isSidebarExpanded ? <ChevronsLeft className="w-4 h-4" /> : <ChevronsRight className="w-4 h-4" />}
          {isSidebarExpanded && <span>{t('auto.auto_collapse_menu_1928')}</span>}
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
        <img src="/logo.png" alt={t('auto.auto_aetheria_logo_1927')} className="w-8 h-8" />
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
