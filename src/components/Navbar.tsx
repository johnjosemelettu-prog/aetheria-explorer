import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, Map as MapIcon, Wallet, User as UserIcon, LogOut, Menu, X, Shield, Store as StoreIcon, Globe, Sparkles, Crown, Zap, Activity, TrendingUp, Heart, Camera, BookOpen, PieChart, ScanFace, Book, ChevronRight, Film, Image as ImageIcon, Eye, PersonStanding, Wifi, Plane, Recycle, Users, Footprints, Leaf, Languages, ShieldCheck, Gift, MessageSquare, Brain, Lightbulb, MessageCircle, Utensils, Target, Cloud, CheckSquare, Glasses, Palette, Train, Star, Building, Castle, UserPlus, Mailbox, Handshake, Receipt, Award, ShieldAlert, Hourglass, Swords, Hammer, Network, Wind, CheckCircle, ImagePlus, PenTool, Radio, Box, Ear, Home, AlertTriangle, Route, Navigation, AlertOctagon, PhoneCall, Package, Bike, Laptop, Coins, Ticket, Car, Music, Calendar, Search, EyeOff, Dna, Headphones, CloudRain, TreePine, Droplets, Bird, SplitSquareHorizontal, Brush
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile } from '../types';
import { cn } from '../lib/utils';
import AuthModal from './AuthModal';
import { usePremiumStatus } from '../hooks/usePremiumStatus';
import CartIcon from './CartIcon';
import Cart from './Cart';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isPremium = usePremiumStatus();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
      } else {
        setProfile(null);
      }
    };
    fetchProfile();
  }, [user]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (window.innerWidth < 1024 && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    }
    
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

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
      setIsSidebarOpen(false);
    }
  };

  const menuSections = [
    {
      title: "Core Hub",
      items: [
        { name: t('navbar.explore'), icon: Compass, path: '/' },
        { name: t('actions.aiItinerary'), icon: Zap, path: '/ai-itinerary' },
        { name: 'Booking Hub', icon: Plane, path: '/booking' },
        { name: t('actions.digitalTailor'), icon: Activity, path: '/digital-tailor' },
        { name: t('actions.vibeMarket'), icon: TrendingUp, path: '/vibe-market' },
        { name: t('actions.wallet'), icon: Wallet, path: '/wallet' },
        { name: 'Store', icon: StoreIcon, path: '/store' },
      ]
    },
    {
      title: "AI & Planning (Smart Journey)",
      items: [
        { name: 'Serendipity Engine', icon: Sparkles, path: '/serendipity-engine' },
        { name: 'Cognitive Load Balancer', icon: Brain, path: '/cognitive-load-balancer' },
        { name: '"What If" Scenario Planner', icon: Lightbulb, path: '/scenario-planner' },
        { name: 'Mood Synthesis', icon: Heart, path: '/mood-synthesis' },
        { name: 'AI Travel Mentor', icon: MessageCircle, path: '/ai-travel-mentor' },
        { name: 'Flavor Seeker', icon: Utensils, path: '/flavor-seeker' },
        { name: 'Dynamic Itinerary A/B Testing', icon: SplitSquareHorizontal, path: '/ab-testing' },
        { name: 'Personalized Challenge Generator', icon: Target, path: '/challenge-generator' },
        { name: 'Dream Weaver', icon: Cloud, path: '/dream-weaver' },
        { name: 'Habit Integration', icon: CheckSquare, path: '/habit-integration' },
        { name: 'Group Vibe Calibration', icon: Users, path: '/group-vibe-calibration' },
        { name: 'Sentient AI Companion', icon: Brain, path: '/sentient-companion' },
      ]
    },
    {
      title: "Augmented Reality",
      items: [
        { name: t('actions.landmarkLens'), icon: Camera, path: '/landmark-lens' },
        { name: t('actions.arWayfinding'), icon: ScanFace, path: '/ar-wayfinding' },
        { name: 'Vision Hub', icon: Eye, path: '/vision-hub' },
        { name: 'Heritage Mirror', icon: PersonStanding, path: '/heritage-mirror' },
        { name: 'AR Time-Lapse View', icon: Clock, path: '/ar-time-lapse' },
        { name: 'VR Pre-Travel Scout', icon: Glasses, path: '/vr-scout' },
        { name: 'AR Menu Visualizer', icon: Utensils, path: '/ar-menu' },
        { name: 'Geocached AR Art Gallery', icon: Palette, path: '/ar-art-gallery' },
        { name: 'AR Public Transit X-Ray', icon: Train, path: '/ar-transit' },
        { name: 'Sky Gazer AR', icon: Star, path: '/sky-gazer' },
        { name: 'Interactive AR Storytelling', icon: BookOpen, path: '/ar-storytelling' },
        { name: '"Paint the Town" AR', icon: Brush, path: '/paint-the-town' },
        { name: 'Architecture Deconstructor', icon: Building, path: '/architecture-deconstructor' },
        { name: 'AR Language Helper', icon: Languages, path: '/ar-language-helper' },
        { name: 'AR Memory Palace', icon: Castle, path: '/memory-palace' },
      ]
    },
    {
      title: "Community & Connections",
      items: [
        { name: 'Local Hero Connect', icon: UserPlus, path: '/local-hero-connect' },
        { name: 'Odyssey Relay', icon: Mailbox, path: '/odyssey-relay' },
        { name: 'Skill Exchange Hub', icon: Handshake, path: '/skill-exchange-hub' },
        { name: 'Echoes of Past Travelers', icon: Users, path: '/echoes-of-past-travelers' },
        { name: 'Shared Expense Synthesizer', icon: Receipt, path: '/shared-expense' },
        { name: 'Aetheria Ambassador Program', icon: Award, path: '/ambassador-program' },
        { name: 'Traveler\'s Guilds', icon: Shield, path: '/travelers-guilds' },
        { name: 'Global Gift Network', icon: Gift, path: '/global-gift-network' },
        { name: 'Spontaneous Meetups', icon: Users, path: '/spontaneous-meetups' },
        { name: 'Safety Swarm', icon: ShieldAlert, path: '/safety-swarm' },
        { name: 'Aetheria DAO', icon: Globe, path: '/aetheria-dao' },
      ]
    },
    {
      title: "Gamification & Quests",
      items: [
        { name: 'Chrono-Quests', icon: Hourglass, path: '/chrono-quests' },
        { name: 'Faction Wars', icon: Swords, path: '/faction-wars' },
        { name: 'Digital Souvenir Forging', icon: Hammer, path: '/digital-souvenir-forging' },
        { name: 'World Grid Unveiling', icon: Globe, path: '/world-grid-unveiling' },
        { name: 'Achievement Trees', icon: Network, path: '/achievement-trees' },
        { name: 'Bounty Board', icon: Target, path: '/bounty-board' },
        { name: '\'Dérive\' Mode', icon: Wind, path: '/derive-mode' },
        { name: 'Local Legend Verification', icon: CheckCircle, path: '/local-legend-verification' },
        { name: 'Escape the City', icon: Footprints, path: '/escape-the-city' },
        { name: 'Culture Collector', icon: Palette, path: '/culture-collector' },
        { name: '"Lost in Translation" Game', icon: MessageSquare, path: '/lost-in-translation' },
        { name: 'Local Produce Challenge', icon: Leaf, path: '/local-produce-challenge' },
      ]
    },
    {
      title: "Eco-Conscious",
      items: [
        { name: 'Carbon Footprint Synthesis 2.0', icon: Leaf, path: '/carbon-synthesis' },
        { name: 'Eco-Warrior Quests', icon: Leaf, path: '/eco-warrior-quests' },
        { name: 'Sustainable Partner Spotlight', icon: Star, path: '/sustainable-partners' },
        { name: '"Leave a Positive Trace"', icon: Heart, path: '/positive-trace' },
        { name: 'Reforestation Rewards', icon: TreePine, path: '/reforestation-rewards' },
        { name: 'Water Refill Station Finder', icon: Droplets, path: '/water-refill' },
        { name: 'Green Transit Score', icon: Train, path: '/green-transit-score' },
        { name: 'Conservation Circle', icon: Users, path: '/conservation-circle' },
        { name: 'Wildlife Sighting Ethos', icon: Bird, path: '/wildlife-sighting' },
      ]
    },
    {
      title: "Memories & Storytelling",
      items: [
        { name: t('actions.journal'), icon: BookOpen, path: '/journal' },
        { name: 'Video Teaser', icon: Film, path: '/video-teaser' },
        { name: 'Postcard Studio', icon: ImageIcon, path: '/postcard-studio' },
        { name: 'Collaborative Journals', icon: Users, path: '/collaborative-journal' },
        { name: '"Then & Now" Photo Mixer', icon: ImagePlus, path: '/then-and-now' },
        { name: 'AI Travel Blogger', icon: PenTool, path: '/ai-blogger' },
        { name: 'Aetheria Radio Host', icon: Radio, path: '/radio-host' },
        { name: 'Vibe-based Photo Filters', icon: Camera, path: '/vibe-filters' },
        { name: 'Interactive Travel Maps', icon: MapIcon, path: '/interactive-maps' },
        { name: 'Travel Comic Strip Creator', icon: BookOpen, path: '/comic-creator' },
        { name: '3D Photo Sculptures', icon: Box, path: '/3d-sculptures' },
        { name: 'AI Story Scout', icon: Compass, path: '/story-scout' },
        { name: 'Sensory Journal', icon: Ear, path: '/sensory-journal' },
        { name: 'Quantum Entanglement Souvenirs', icon: Zap, path: '/quantum-souvenirs' },
      ]
    },
    {
      title: "Safety & Wellbeing",
      items: [
        { name: 'Travel Insurance', icon: ShieldCheck, path: '/travel-insurance' },
        { name: '"Get Me Home" Button', icon: Home, path: '/get-me-home' },
        { name: 'Crowd Density Predictor', icon: Users, path: '/crowd-density' },
        { name: 'Chronosync', icon: Clock, path: '/chronosync' },
        { name: 'Automated "Check-in" System', icon: CheckSquare, path: '/automated-check-in' },
        { name: 'Scam Alert Radar', icon: AlertTriangle, path: '/scam-radar' },
        { name: 'Virtual Embassy', icon: Building, path: '/virtual-embassy' },
        { name: 'Trusted Route Corridors', icon: Route, path: '/trusted-routes' },
        { name: '"Follow Me" Digital Escort', icon: Navigation, path: '/follow-me' },
        { name: 'Allergen Alert System', icon: AlertOctagon, path: '/allergen-alert' },
        { name: 'Privacy Scrubber', icon: Shield, path: '/privacy-scrubber' },
        { name: 'Aura Shield', icon: ShieldAlert, path: '/aura-shield' },
        { name: 'Emergency Services Dialogue', icon: PhoneCall, path: '/emergency-dialogue' },
        { name: 'Bio-Data Integration', icon: Activity, path: '/bio-data' },
        { name: 'Haptic Feedback Integration', icon: Activity, path: '/haptic-controller' },
        { name: 'Weather-Adaptive Itinerary', icon: CloudRain, path: '/weather-adaptive' },
      ]
    },
    {
      title: "Digital Nomads & Utilities",
      items: [
        { name: t('actions.esim'), icon: Wifi, path: '/esim' },
        { name: t('actions.budget'), icon: PieChart, path: '/budget-synthesis' },
        { name: t('actions.guide'), icon: Compass, path: '/guide' },
        { name: 'Translator', icon: Languages, path: '/translator' },
        { name: 'Intelligent Souvenir Shipper', icon: Package, path: '/souvenir-shipper' },
        { name: '"Last-Mile" Transit Solver', icon: Bike, path: '/last-mile' },
        { name: 'Digital Nomad Hub', icon: Laptop, path: '/digital-nomad-hub' },
        { name: 'Predictive Currency Exchange', icon: Coins, path: '/currency-exchange' },
        { name: 'Universal Ticket Aggregator', icon: Ticket, path: '/ticket-aggregator' },
        { name: '"Wait or Go" Advisor', icon: Clock, path: '/wait-or-go' },
        { name: 'Rental Synthesizer', icon: Car, path: '/rental-synthesizer' },
        { name: 'Cultural Etiquette Guide', icon: Book, path: '/cultural-etiquette' },
        { name: 'Myth & Folklore Hotspots', icon: MapIcon, path: '/myth-folklore' },
        { name: 'Street Art Sagas', icon: Palette, path: '/street-art-sagas' },
        { name: 'Local Music Scene Explorer', icon: Music, path: '/local-music' },
        { name: 'Festival Forecaster', icon: Calendar, path: '/festival-forecaster' },
        { name: 'Artisan Craft Finder', icon: Search, path: '/artisan-finder' },
        { name: 'Historical Dialogue Bot', icon: MessageSquare, path: '/historical-bot' },
        { name: '"Silent Observer" Mode', icon: EyeOff, path: '/silent-observer' },
        { name: 'DNA-based Ancestry Trail', icon: Dna, path: '/ancestry-trail' },
        { name: 'Drone-as-a-Service', icon: Plane, path: '/drone-service' },
        { name: 'Real-time Translation Earbuds', icon: Headphones, path: '/translation-earbuds' },
      ]
    }
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
    {/* Sidebar Navigation */}
    <aside 
      className={cn(
        "fixed top-0 left-0 bottom-0 z-50 bg-[#0a0a0a] border-r border-white/10 flex flex-col shadow-2xl transition-transform duration-300",
        "w-[280px] lg:translate-x-0", // Fixed width, always show on desktop
        isSidebarOpen ? "translate-x-0" : "-translate-x-full" // Toggle on mobile
      )}
      ref={sidebarRef}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 shrink-0">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Compass className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-display font-bold tracking-tighter">AETHERIA</span>
          </div>
        {/* Close button only visible on mobile */}
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden p-2 rounded-lg glass-hover text-foreground/50 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-white/5 bg-white/[0.02] shrink-0">
        {user ? (
          <>
            <div 
              className="flex items-center gap-4 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/profile')}
            >
              <img
                src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-primary/20"
                referrerPolicy="no-referrer"
              />
              <div className="overflow-hidden">
                <h3 className="font-bold text-sm truncate">{profile?.displayName || user.displayName || 'Explorer'}</h3>
                <p className="text-xs text-foreground/50 truncate">{user.email}</p>
              </div>
            </div>
            
            {isPremium ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 font-bold text-xs uppercase tracking-wider w-fit">
                <Crown className="w-3.5 h-3.5" />
                Premium Member
              </div>
            ) : (
              <button onClick={() => navigate('/premium')} className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary/20 text-primary border border-primary/30 font-bold text-xs uppercase tracking-wider hover:bg-primary/30 transition-colors">
                <Crown className="w-4 h-4" />
                Upgrade to Premium
              </button>
            )}
          </>
        ) : (
          <div className="text-center">
            <p className="text-sm text-foreground/60 mb-4">Join Aetheria to unlock your journey.</p>
            <button
              onClick={handleLogin}
              className="w-full py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20"
            >
              Get Started
            </button>
          </div>
        )}
      </div>

      {/* Scrollable Nav Links */}
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6">
        {menuSections.map((section, idx) => (
          <div key={section.title} className={cn("mb-8 px-4", idx > 0 && "pt-6 border-t border-white/5")}>
            <h4 className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-3 ml-2">
              {section.title}
            </h4>
            <ul className="space-y-1">
              {section.items.map((item) => {
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
                          "w-4 h-4 transition-colors", 
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
            </ul>
          </div>
        ))}
      </div>

      {/* Sidebar Footer (Logout) */}
      {user && (
        <div className="p-4 border-t border-white/5 shrink-0 bg-black/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl glass-hover text-accent font-bold text-sm transition-colors hover:bg-accent/10"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </aside>

    {/* Top Navbar (Mobile Only - just for the hamburger) */}
    <nav className="lg:hidden fixed top-0 left-0 right-0 z-30 glass border-b border-white/5 h-16 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 -ml-2 rounded-lg glass-hover text-foreground hover:text-primary transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="text-xl font-display font-bold tracking-tighter">AETHERIA</span>
      </div>
    </nav>

    {/* Cart Icon (Fixed positioning for both Mobile and Desktop) */}
    {user && (
      <div className="fixed top-2 right-4 z-40 h-12 flex items-center">
         <div className="bg-black/60 backdrop-blur-md rounded-full p-2 border border-white/10 shadow-lg">
            <CartIcon onClick={() => setIsCartOpen(true)} />
         </div>
      </div>
    )}

    {/* Mobile Backdrop overlay */}
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
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
