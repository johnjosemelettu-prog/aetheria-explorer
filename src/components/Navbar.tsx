import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, Map as MapIcon, Wallet, User as UserIcon, LogOut, Menu, X, Shield, Store as StoreIcon, Globe, Sparkles, Crown, Zap, Activity, TrendingUp, Heart, Camera, BookOpen, PieChart, ScanFace, Book, ChevronRight, Film, Image as ImageIcon, Eye, PersonStanding, Wifi, Plane, Recycle, Users, Footprints, Leaf, Languages, ShieldCheck, Gift, MessageSquare, Brain, Lightbulb, MessageCircle, Utensils, Target, Cloud, CheckSquare, Glasses, Palette, Train, Star, Building, Castle, UserPlus, Mailbox, Handshake, Receipt, Award, ShieldAlert, Hourglass, Swords, Hammer, Network, Wind, CheckCircle, ImagePlus, PenTool, Radio, Box, Ear, Home, AlertTriangle, Route, Navigation, AlertOctagon, PhoneCall, Package, Bike, Laptop, Coins, Ticket, Car, Music, Calendar, Search, EyeOff, Dna, Headphones, CloudRain, TreePine, Droplets, Bird, SplitSquareHorizontal, Brush, Clock, ChevronsLeft, ChevronsRight, ChevronDown
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

// New Collapsible Section Component
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
      title: "Core Hub",
      initiallyOpen: true,
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
     // ... Add other sections here following the same structure
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
        {menuSections.map((section, idx) => (
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
