import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Map as MapIcon, 
  Wallet, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X,
  Shield,
  Store as StoreIcon,
  Globe,
  Sparkles,
  Crown,
  Zap,
  Activity,
  TrendingUp,
  Heart,
  Camera,
  BookOpen,
  PieChart,
  ScanFace,
  Book,
  ChevronRight,
  Film,
  Image as ImageIcon,
  Eye,
  PersonStanding,
  Wifi,
  Plane
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
      ]
    },
    {
      title: "Digital Nomads",
      items: [
        { name: t('actions.esim'), icon: Wifi, path: '/esim' },
        { name: t('actions.budget'), icon: PieChart, path: '/budget-synthesis' },
        { name: 'Store', icon: StoreIcon, path: '/store' },
        { name: t('actions.guide'), icon: Compass, path: '/guide' },
      ]
    },
    {
      title: "Memories & Vibes",
      items: [
        { name: t('actions.vibe'), icon: Heart, path: '/vibe' },
        { name: t('actions.journal'), icon: BookOpen, path: '/journal' },
        { name: t('actions.localLegends'), icon: Book, path: '/local-legends' },
        { name: 'Video Teaser', icon: Film, path: '/video-teaser' },
        { name: 'Postcard Studio', icon: ImageIcon, path: '/postcard-studio' },
      ]
    },
    {
      title: "Augmented Reality",
      items: [
        { name: t('actions.landmarkLens'), icon: Camera, path: '/landmark-lens' },
        { name: t('actions.arWayfinding'), icon: ScanFace, path: '/ar-wayfinding' },
        { name: 'Vision Hub', icon: Eye, path: '/vision-hub' },
        { name: 'Heritage Mirror', icon: PersonStanding, path: '/heritage-mirror' },
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
                        {item.name}
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
