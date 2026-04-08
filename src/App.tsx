import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExplorerDashboard from './components/ExplorerDashboard';
import ItinerariesPage from './components/ItinerariesPage';
import WalletPage from './components/WalletPage';
import ESimPage from './components/ESimPage';
import ProfilePage from './components/ProfilePage';
import AIItinerary from './components/AIItinerary';
import DigitalTailor from './components/DigitalTailor';
import VibeMarket from './components/VibeMarket';
import AdminConsole from './components/AdminConsole';
import PartnerHub from './components/PartnerHub';
import RuthAssistant from './components/RuthAssistant';
import Journal from './components/Journal';
import BudgetSynthesis from './components/BudgetSynthesis';
import Store from './components/Store';
import Marketplace from './components/Marketplace';
import Pathfinder from './components/Pathfinder';
import Guide from './components/Guide';
import ARWayfinding from './components/ARWayfinding';
import LocalLegends from './components/LocalLegends';
import AudioGuide from './components/AudioGuide';
import HeritageMirror from './components/HeritageMirror';
import MoodSynthesis from './components/MoodSynthesis';
import VideoTeaser from './components/VideoTeaser';
import PostcardStudio from './components/PostcardStudio';
import { UserProfile } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          // Create initial profile
          const newProfile: UserProfile = {
            uid: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || 'Explorer',
            role: 'explorer',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          try {
            await setDoc(docRef, newProfile);
            setProfile(newProfile);
          } catch (error) {
            console.error("Error creating user profile:", error);
          }
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    // Simple path listener
    const handlePathChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePathChange);
    
    return () => {
      unsubscribe();
      window.removeEventListener('popstate', handlePathChange);
    };
  }, []);

  const renderContent = () => {
    if (!user) return <Hero />;

    // Role-based routing
    if (currentPath === '/admin' && profile?.role === 'admin') {
      return <AdminConsole />;
    }
    if (currentPath === '/vendor/dashboard' && profile?.role === 'partner') {
      return <PartnerHub />;
    }

    // Explorer routing
    switch (currentPath) {
      case '/itineraries':
        return <ItinerariesPage />;
      case '/wallet':
        return <WalletPage />;
      case '/esim':
        return <ESimPage />;
      case '/profile':
        return <ProfilePage />;
      case '/ai-itinerary':
        return <AIItinerary />;
      case '/digital-tailor':
        return <DigitalTailor />;
      case '/vibe-market':
        return <VibeMarket />;
      case '/journal':
        return <Journal />;
      case '/budget-synthesis':
        return <BudgetSynthesis />;
      case '/store':
        return <Store />;
      case '/marketplace':
        return <Marketplace />;
      case '/pathfinder':
        return <Pathfinder />;
      case '/guide':
        return <Guide />;
      case '/ar-wayfinding':
        return <ARWayfinding />;
      case '/local-legends':
        return <LocalLegends />;
      case '/audio-guide':
        return <AudioGuide />;
      case '/heritage-mirror':
        return <HeritageMirror />;
      case '/mood-synthesis':
        return <MoodSynthesis />;
      case '/video-teaser':
        return <VideoTeaser />;
      case '/postcard-studio':
        return <PostcardStudio />;
      default:
        return <ExplorerDashboard />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath + (user?.uid || 'guest')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <RuthAssistant />

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-primary rounded-sm" />
              </div>
              <span className="font-display font-bold tracking-tighter">AETHERIA</span>
            </div>
            <div className="flex gap-8 text-sm text-foreground/40">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
            <p className="text-sm text-foreground/20">
              © 2026 Aetheria Ecosystem. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
