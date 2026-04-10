
import React, { useState, useEffect, Suspense } from 'react';
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
import BookingHub from './components/BookingHub';
import { UserProfile as UserProfileType } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import i18n from './lib/i18n';
import Vibe from './components/Vibe';
import LandmarkLens from './components/LandmarkLens';
import CreateItinerary from './components/CreateItinerary';
import RealtimeItinerary from './components/RealtimeItinerary';
import UserProfile from './components/UserProfile';
import SplashScreen from './components/SplashScreen';
import AIFeatureShowcase from './components/AIFeatures';
import DeriveMode from './components/DeriveMode';
import LocalLegendVerification from './components/LocalLegendVerification';
import EscapeTheCity from './components/EscapeTheCity';
import CultureCollector from './components/CultureCollector';
import GetMeHome from './components/GetMeHome';
import CrowdDensityPredictor from './components/CrowdDensityPredictor';
import Chronosync from './components/Chronosync';
import IntelligentSouvenirShipper from './components/IntelligentSouvenirShipper';
import LastMileTransitSolver from './components/LastMileTransitSolver';
import FollowMeEscort from './components/FollowMeEscord';
import PrivacyScrubber from './components/PrivacyScrubber';
import AuraShield from './components/AuraShield';
import EmergencyServicesDialogue from './components/EmergencyServicesDialogue';
import CarbonFootprintSynthesis from './components/CarbonFootprintSynthesis';
import EcoWarriorQuests from './components/EcoWarriorQuests';
import SustainablePartnerSpotlight from './components/SustainablePartnerSpotlight';
import LeavePositiveTrace from './components/LeavePositiveTrace';
import ReforestationRewards from './components/ReforestationRewards';
import WaterRefillStationFinder from './components/WaterRefillStationFinder';
import LocalProduceChallenge from './components/LocalProduceChallenge';
import GreenTransitScore from './components/GreenTransitScore';
import ConservationCircle from './components/ConservationCircle';
import WildlifeSightingEthos from './components/WildlifeSightingEthos';
import CollaborativeJournal from './components/CollaborativeJournal';
import LostInTranslation from './components/LostInTranslation';
import FestivalForecaster from './components/FestivalForecaster';
import ArtisanCraftFinder from './components/ArtisanCraftFinder';
import HistoricalDialogue from './components/HistoricalDialogue';
import SilentObserver from './components/SilentObserver';
import AncestryTrail from './components/AncestryTrail';
import DroneRental from './components/DroneRental';
import TranslationEarbuds from './components/TranslationEarbuds';
import MemoryPalace from './components/MemoryPalace';
import AetheriaDAO from './components/AetheriaDAO';
import HapticController from './components/HapticController';
import WeatherAdaptiveController from './components/WeatherAdaptiveController';
import BioDataMonitor from './components/BioDataMonitor';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    if (profile?.preferences?.language) {
      i18n.changeLanguage(profile.preferences.language);
    }
  }, [profile]);

  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePathChange);

    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfileType);
        } else {
          const newProfile: UserProfileType = {
            uid: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || 'Explorer',
            role: 'explorer',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            preferences: { language: 'en', currency: 'USD', timezone: 'UTC', units: 'metric' }
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

    return () => {
      unsubscribe();
      window.removeEventListener('popstate', handlePathChange);
      clearTimeout(splashTimer);
    };
  }, []);

  const renderContent = () => {
    if (!user) return <Hero />;

    const itineraryIdMatch = currentPath.match(/\/itineraries\/(.+)/);
    if (itineraryIdMatch) {
      return <RealtimeItinerary itineraryId={itineraryIdMatch[1]} />;
    }

    const userIdMatch = currentPath.match(/\/users\/(.+)/);
    if (userIdMatch) {
      return <UserProfile userId={userIdMatch[1]} />;
    }

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
      case '/create-itinerary':
        return <CreateItinerary />;
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
      case '/vibe':
        return <Vibe />;
      case '/landmark-lens':
        return <LandmarkLens />;
      case '/ai-features':
        return <AIFeatureShowcase />;
      case '/derive-mode':
        return <DeriveMode />;
      case '/local-legend-verification':
        return <LocalLegendVerification />;
      case '/escape-the-city':
        return <EscapeTheCity />;
      case '/culture-collector':
        return <CultureCollector />;
      case '/get-me-home':
        return <GetMeHome />;
      case '/crowd-density-predictor':
        return <CrowdDensityPredictor />;
      case '/chronosync':
        return <Chronosync />;
      case '/intelligent-souvenir-shipper':
        return <IntelligentSouvenirShipper />;
      case '/last-mile-transit-solver':
        return <LastMileTransitSolver />;
      case '/follow-me-escort':
        return <FollowMeEscort />;
      case '/privacy-scrubber':
        return <PrivacyScrubber />;
      case '/aura-shield':
        return <AuraShield />;
      case '/emergency-services-dialogue':
        return <EmergencyServicesDialogue />;
      case '/carbon-footprint-synthesis':
        return <CarbonFootprintSynthesis />;
      case '/eco-warrior-quests':
        return <EcoWarriorQuests />;
      case '/sustainable-partner-spotlight':
        return <SustainablePartnerSpotlight />;
      case '/leave-positive-trace':
        return <LeavePositiveTrace />;
      case '/reforestation-rewards':
        return <ReforestationRewards />;
      case '/water-refill-station-finder':
        return <WaterRefillStationFinder />;
      case '/local-produce-challenge':
        return <LocalProduceChallenge />;
      case '/green-transit-score':
        return <GreenTransitScore />;
      case '/conservation-circle':
        return <ConservationCircle />;
      case '/wildlife-sighting-ethos':
        return <WildlifeSightingEthos />;
      case '/collaborative-journal':
        return <CollaborativeJournal />;
      case '/lost-in-translation':
        return <LostInTranslation />;
      case '/festival-forecaster':
        return <FestivalForecaster />;
      case '/artisan-craft-finder':
        return <ArtisanCraftFinder />;
      case '/historical-dialogue':
        return <HistoricalDialogue />;
      case '/silent-observer':
        return <SilentObserver />;
      case '/ancestry-trail':
        return <AncestryTrail />;
      case '/drone-rental':
        return <DroneRental />;
      case '/translation-earbuds':
        return <TranslationEarbuds />;
      case '/memory-palace':
        return <MemoryPalace />;
      case '/aetheria-dao':
        return <AetheriaDAO />;
      case '/booking':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <BookingHub />
          </div>
        );
      default:
        return <ExplorerDashboard />;
    }
  };

  if (loading || showSplash) {
    return <SplashScreen />;
  }

  return (
    <Suspense fallback={<SplashScreen />}>
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar user={user} />
      <HapticController />
      {user && <WeatherAdaptiveController />}
      {user && <BioDataMonitor />}
      <div className="lg:pl-[280px] transition-all duration-300">
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
              <div className="flex items-.center gap-2">
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
    </div>
    </Suspense>
  );
}
