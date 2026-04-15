
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
      title: "AR & Immersive",
      items: [
        { name: 'Itineraries Page', icon: Glasses, path: '/itineraries' },
        { name: 'Create Itinerary', icon: Glasses, path: '/create-itinerary' },
        { name: 'A I Itinerary', icon: Glasses, path: '/ai-itinerary' },
        { name: 'Vibe Market', icon: Glasses, path: '/vibe-market' },
        { name: 'Marketplace', icon: Glasses, path: '/marketplace' },
        { name: 'A R Wayfinding', icon: Glasses, path: '/ar-wayfinding' },
        { name: 'Postcard Studio', icon: Glasses, path: '/postcard-studio' },
        { name: 'Landmark Lens', icon: Glasses, path: '/landmark-lens' },
        { name: 'What If Scenario Planner', icon: Glasses, path: '/scenario-planner' },
        { name: 'Dynamic Itinerary A B Testing', icon: Glasses, path: '/ab-testing' },
        { name: 'A R Time Lapse View', icon: Glasses, path: '/ar-time-lapse' },
        { name: 'A R Menu Visualizer', icon: Glasses, path: '/ar-menu' },
        { name: 'Geocached A R Art Gallery', icon: Glasses, path: '/ar-art-gallery' },
        { name: 'A R Public Transit X Ray', icon: Glasses, path: '/ar-transit' },
        { name: 'Sky Gazer A R', icon: Glasses, path: '/sky-gazer' },
        { name: 'Interactive A R Storytelling', icon: Glasses, path: '/ar-storytelling' },
        { name: 'Paint The Town A R', icon: Glasses, path: '/paint-the-town' },
        { name: 'Architecture Deconstructor', icon: Glasses, path: '/architecture-deconstructor' },
        { name: 'A R Language Helper', icon: Glasses, path: '/ar-language-helper' },
        { name: 'A R Historical Reenactments', icon: Glasses, path: '/ar-historical' },
        { name: 'A R Ghost Tours', icon: Glasses, path: '/ar-ghost-tours' },
        { name: 'A R Ancient Ruins', icon: Glasses, path: '/ar-ancient-ruins' },
        { name: 'A R Celebrity Tour Guide', icon: Glasses, path: '/ar-celebrity-guide' },
        { name: 'A R Local Wildlife', icon: Glasses, path: '/ar-wildlife' },
        { name: 'A R Food Deconstruction', icon: Glasses, path: '/ar-food-deconstruction' },
        { name: 'A R Souvenir Try On', icon: Glasses, path: '/ar-souvenir-tryon' },
        { name: 'V R Pre Trip', icon: Glasses, path: '/vr-pre-trip' },
        { name: 'V R Immobile Travel', icon: Glasses, path: '/vr-immobile' },
        { name: 'A R Personalized Graffiti', icon: Glasses, path: '/ar-personalized-graffiti' },
        { name: 'V R Meditation', icon: Glasses, path: '/vr-meditation' },
        { name: 'A R Hotel Art Gallery', icon: Glasses, path: '/ar-hotel-gallery' },
        { name: 'A R Fitness Trails', icon: Glasses, path: '/ar-fitness-trails' },
        { name: 'A R Plant Flora', icon: Glasses, path: '/ar-plant-flora' },
        { name: 'V R Extreme Sports', icon: Glasses, path: '/vr-extreme-sports' },
        { name: 'A R Haunted Places', icon: Glasses, path: '/ar-haunted-places' },
        { name: 'A R Mythical Creatures', icon: Glasses, path: '/ar-mythical-creatures' },
        { name: 'A R D I Y Souvenir', icon: Glasses, path: '/ar-diy-souvenir' },
        { name: 'V R Cultural Etiquette', icon: Glasses, path: '/vr-cultural-etiquette' },
        { name: 'A R Weather Dome', icon: Glasses, path: '/ar-weather-dome' },
        { name: 'A R Musical Streets', icon: Glasses, path: '/ar-musical-streets' },
        { name: 'A R Dish Size Visualizer', icon: Glasses, path: '/ar-dish-size' },
        { name: 'Good Samaritan Quests', icon: Glasses, path: '/good-samaritan' },
        { name: 'Itinerary Trading', icon: Glasses, path: '/itinerary-trading' },
        { name: 'Local Knowledge Leaderboard', icon: Glasses, path: '/local-knowledge' },
        { name: 'Travelers Stock Market', icon: Glasses, path: '/travelers-stock-market' },
        { name: 'Travel Charades', icon: Glasses, path: '/travel-charades' },
        { name: 'Collaborative Travel Diary', icon: Glasses, path: '/collaborative-diary' },
        { name: 'Pay It Forward Chain', icon: Glasses, path: '/pay-it-forward' },
        { name: 'Skill Bartering', icon: Glasses, path: '/skill-bartering' },
        { name: 'Urban Exploration Leaderboard', icon: Glasses, path: '/urban-exploration' },
        { name: 'Bio Feedback Itinerary', icon: Glasses, path: '/bio-feedback' },
        { name: 'A I Personalized Postcards', icon: Glasses, path: '/ai-postcards' },
        { name: 'Shared Expense Synthesizer', icon: Glasses, path: '/shared-expense' },
        { name: 'Faction Wars', icon: Glasses, path: '/faction-wars' },
        { name: 'Bounty Board', icon: Glasses, path: '/bounty-board' },
        { name: 'Wait Or Go Advisor', icon: Glasses, path: '/wait-or-go' },
        { name: 'Safety Swarm', icon: Glasses, path: '/safety-swarm' },
        { name: 'Scam Alert Radar', icon: Glasses, path: '/scam-radar' },
        { name: 'Virtual Embassy', icon: Glasses, path: '/virtual-embassy' },
        { name: 'Carbon Footprint Synthesis', icon: Glasses, path: '/carbon-synthesis' },
        { name: 'Eco Warrior Quests', icon: Glasses, path: '/eco-warrior-quests' },
        { name: 'Sustainable Partner Spotlight', icon: Glasses, path: '/sustainable-partners' },
        { name: 'Reforestation Rewards', icon: Glasses, path: '/reforestation-rewards' },
        { name: 'Aetheria Radio Host', icon: Glasses, path: '/radio-host' },
        { name: 'Three D Photo Sculptures', icon: Glasses, path: '/3d-sculptures' },
        { name: 'Live Like A Local Simulation', icon: Glasses, path: '/live-like-a-local' },
        { name: 'Street Art Sagas', icon: Glasses, path: '/street-art-sagas' },
        { name: 'Artisan Craft Finder', icon: Glasses, path: '/artisan-finder' },
        { name: 'Translation Earbuds', icon: Glasses, path: '/translation-earbuds' },
        { name: 'Live Location Share', icon: Glasses, path: '/share-location' },
        { name: 'Allergy Card Translator', icon: Glasses, path: '/allergy-card' },
        { name: 'Natural Disaster Warnings', icon: Glasses, path: '/disaster-warnings' },
        { name: 'Travel Insurance Comparison', icon: Glasses, path: '/insurance-comparison' },
        { name: 'Carbon Footprint Tracker', icon: Glasses, path: '/carbon-tracker' },
        { name: 'Carbon Offsetter', icon: Glasses, path: '/carbon-offset' },
        { name: 'Transport C O2 Comparison', icon: Glasses, path: '/transport-co2' },
        { name: 'Eco Warrior Leaderboard', icon: Glasses, path: '/eco-leaderboard' },
        { name: 'Local Artisans Marketplace', icon: Glasses, path: '/artisan-marketplace' },
        { name: 'Day In The Life A R', icon: Glasses, path: '/day-in-life-ar' },
        { name: 'Learn Local Craft', icon: Glasses, path: '/local-craft' },
        { name: 'Underground Art Scene', icon: Glasses, path: '/art-scene' },
        { name: 'Sensory Diary Feature', icon: Glasses, path: '/sensory-diary-v2' },
        { name: 'Three Printed Souvenirs', icon: Glasses, path: '/3d-souvenirs' },
        { name: 'Trip Share Online', icon: Glasses, path: '/share-trip' },
        { name: 'Historical Aura Reading', icon: Glasses, path: '/aura-reading' },
        { name: 'Interdimensional Portal', icon: Glasses, path: '/interdimensional' },
        { name: 'Memory Marketplace Feature', icon: Glasses, path: '/memory-marketplace' },
        { name: 'Holographic Journal', icon: Glasses, path: '/holographic-journal' },
        { name: 'Augmented Taste A R', icon: Glasses, path: '/augmented-taste' },
        { name: 'Smart Luggage Integration', icon: Glasses, path: '/smart-luggage' },
        { name: 'Traveler Carpooling', icon: Glasses, path: '/traveler-carpool' },
        { name: 'Diarrhea Prevention', icon: Glasses, path: '/diarrhea-prevention' },
        { name: 'Find Rooftop Bar', icon: Glasses, path: '/rooftop-bar' },
        { name: 'Karaoke Bar Finder', icon: Glasses, path: '/karaoke-finder' },
        { name: 'Night Market Explorer', icon: Glasses, path: '/night-market' },
        { name: 'Stargazing Spots', icon: Glasses, path: '/stargazing-spots' },
        { name: 'Personal Force Field A R', icon: Glasses, path: '/force-field-ar' },
        { name: 'Alien Archeology Game', icon: Glasses, path: '/alien-archeology' },
        { name: 'Invisibility Cloak A R', icon: Glasses, path: '/invisibility-cloak' },
        { name: 'Cybernetic Eye A R', icon: Glasses, path: '/cybernetic-eye' },
        { name: 'Anti Gravity Boots A R', icon: Glasses, path: '/anti-gravity-boots' },
        { name: 'Time Dilation Field A R', icon: Glasses, path: '/time-dilation-ar' },
        { name: 'Farm To Table Experience', icon: Glasses, path: '/farm-to-table' },
        { name: 'Local Market Treasure Hunt', icon: Glasses, path: '/market-treasure-hunt' },
        { name: 'Bargain Hunter Mode', icon: Glasses, path: '/bargain-hunter' },
        { name: 'Try On Clothes A R', icon: Glasses, path: '/try-on-ar' },
        { name: 'What To Wear Predictor', icon: Glasses, path: '/what-to-wear' },
        { name: 'Local Flea Market Guide', icon: Glasses, path: '/flea-market' },
        { name: 'Artisan Craft Marketplace2', icon: Glasses, path: '/artisan-craft-v2' },
        { name: 'Size Conversion Chart', icon: Glasses, path: '/size-conversion' },
        { name: 'Fashion History A R', icon: Glasses, path: '/fashion-history' },
      ]
    },
    {
      title: "Gastronomy",
      items: [
        { name: 'Video Teaser', icon: Utensils, path: '/video-teaser' },
        { name: 'Flavor Seeker', icon: Utensils, path: '/flavor-seeker' },
        { name: 'Local Food Bingo', icon: Utensils, path: '/local-food-bingo' },
        { name: 'Local Produce Challenge', icon: Utensils, path: '/local-produce-challenge' },
        { name: 'A I Travel Blogger', icon: Utensils, path: '/ai-blogger' },
        { name: 'Travel Comic Strip Creator', icon: Utensils, path: '/comic-creator' },
        { name: 'Weather Adaptive Controller', icon: Utensils, path: '/weather-adaptive' },
        { name: 'Eat Pray Love Journey', icon: Utensils, path: '/eat-pray-love' },
        { name: 'Local Produce Finder', icon: Utensils, path: '/produce-finder' },
        { name: 'Forageable Food Map', icon: Utensils, path: '/forage-map' },
        { name: 'Home Cooked Meal', icon: Utensils, path: '/home-cooked-meal' },
        { name: 'Coffee With Local', icon: Utensils, path: '/coffee-local' },
        { name: 'Street Food Safety', icon: Utensils, path: '/street-food-safety' },
        { name: 'Digital Time Capsule Feature', icon: Utensils, path: '/digital-time-capsule' },
        { name: 'Then And Now Blender Feature', icon: Utensils, path: '/then-now-blender' },
        { name: 'Travel Comic Creator Feature', icon: Utensils, path: '/comic-creator-v2' },
        { name: 'Quantum Souvenir Feature', icon: Utensils, path: '/quantum-souvenir-v2' },
        { name: 'Sentient Companion Feature', icon: Utensils, path: '/sentient-companion-v2' },
        { name: 'Dream Weaving Feature', icon: Utensils, path: '/dream-weaving-v2' },
        { name: 'Seat Recommender', icon: Utensils, path: '/seat-recommender' },
        { name: 'Healthy Eating Guide', icon: Utensils, path: '/healthy-eating' },
        { name: 'Theater Booking', icon: Utensils, path: '/theater-booking' },
        { name: 'Mystery Meal Experience', icon: Utensils, path: '/mystery-meal' },
        { name: 'Chefs Table Booking', icon: Utensils, path: '/chefs-table' },
        { name: 'Cocktail Companion', icon: Utensils, path: '/cocktail-companion' },
        { name: 'Wine Tasting Assistant', icon: Utensils, path: '/wine-tasting' },
        { name: 'Street Food Tour Gen', icon: Utensils, path: '/street-food-tour' },
        { name: 'Food Photo Contest', icon: Utensils, path: '/food-photo-contest' },
        { name: 'Edible Insect Challenge', icon: Utensils, path: '/insect-challenge' },
        { name: 'Coffee Connoisseur Guide', icon: Utensils, path: '/coffee-connoisseur' },
        { name: 'Tea Ceremony Finder', icon: Utensils, path: '/tea-ceremony' },
        { name: 'Brewery Distillery Tour', icon: Utensils, path: '/brewery-tour' },
        { name: 'Vegan Restaurant Finder', icon: Utensils, path: '/vegan-finder' },
        { name: 'Gluten Free Guide', icon: Utensils, path: '/gluten-free' },
        { name: 'Food History Guide', icon: Utensils, path: '/food-history' },
        { name: 'Recipe Collector', icon: Utensils, path: '/recipe-collector' },
        { name: 'Eat With Local Feature', icon: Utensils, path: '/eat-with-local-v2' },
        { name: 'Food Blogger Mode', icon: Utensils, path: '/food-blogger' },
      ]
    },
    {
      title: "Wellness & Fitness",
      items: [
        { name: 'Digital Detox Mode', icon: Heart, path: '/digital-detox' },
        { name: 'Bio Data Monitor', icon: Heart, path: '/bio-data' },
        { name: 'Personalized Meditation', icon: Heart, path: '/personalized-meditation' },
        { name: 'Find A Gym', icon: Heart, path: '/find-gym' },
        { name: 'Running Hiking Trails', icon: Heart, path: '/running-trails' },
        { name: 'Traveler Meditation', icon: Heart, path: '/traveler-meditation' },
        { name: 'Travel Sleep Tracker', icon: Heart, path: '/travel-sleep' },
        { name: 'Digital Detox Challenges', icon: Heart, path: '/digital-detox-challenges' },
        { name: 'Mental Health Support', icon: Heart, path: '/mental-health' },
        { name: 'Spa Wellness Booking', icon: Heart, path: '/spa-wellness' },
        { name: 'Sunscreen Reminder', icon: Heart, path: '/sunscreen' },
        { name: 'Hydration Reminder', icon: Heart, path: '/hydration' },
        { name: 'Travel Friendly Workouts', icon: Heart, path: '/travel-workouts' },
        { name: 'Find Quiet Place', icon: Heart, path: '/quiet-place' },
        { name: 'Stress Level Monitor', icon: Heart, path: '/stress-monitor' },
        { name: 'Mindful Walking', icon: Heart, path: '/mindful-walking' },
        { name: 'Digital Nomad Health Inc', icon: Heart, path: '/nomad-insurance' },
        { name: 'Find Therapist', icon: Heart, path: '/find-therapist' },
        { name: 'Bioluminescent Fashion', icon: Heart, path: '/bio-fashion' },
        { name: 'Calorie Nutrition Tracker', icon: Heart, path: '/calorie-tracker' },
      ]
    },
    {
      title: "Eco & Sustainability",
      items: [
        { name: 'Souvenir Recommendations', icon: Leaf, path: '/souvenir-recommendations' },
        { name: 'Achievement Trees', icon: Leaf, path: '/achievement-trees' },
        { name: 'Culture Collector', icon: Leaf, path: '/culture-collector' },
        { name: 'Trusted Route Corridors', icon: Leaf, path: '/trusted-routes' },
        { name: 'Leave Positive Trace', icon: Leaf, path: '/positive-trace' },
        { name: 'Green Transit Score', icon: Leaf, path: '/green-transit-score' },
        { name: 'Spirit Animal', icon: Leaf, path: '/spirit-animal' },
        { name: 'Eco Travel Challenges', icon: Leaf, path: '/eco-challenges' },
        { name: 'Sustainable Business Directory', icon: Leaf, path: '/sustainable-directory' },
        { name: 'Leave No Trace Guide', icon: Leaf, path: '/leave-no-trace' },
        { name: 'Volunteer Opportunities', icon: Leaf, path: '/volunteer-opportunities' },
        { name: 'Animal Friendly Tourism', icon: Leaf, path: '/animal-friendly' },
        { name: 'Green Accommodation Ratings', icon: Leaf, path: '/green-ratings' },
        { name: 'Sustainable Souvenir Guide', icon: Leaf, path: '/sustainable-souvenirs' },
        { name: 'Second Hand Store Map', icon: Leaf, path: '/second-hand-map' },
        { name: 'Plant A Tree', icon: Leaf, path: '/plant-tree' },
        { name: 'Nature Sounds Destination', icon: Leaf, path: '/nature-sounds' },
        { name: 'Psychic Recommendations', icon: Leaf, path: '/psychic-recommendations' },
        { name: 'Animal Translator', icon: Leaf, path: '/animal-translator' },
      ]
    },
    {
      title: "Nightlife & Entertainment",
      items: [
        { name: 'Global Gift Network', icon: Music, path: '/global-gift-network' },
        { name: 'Local Music Scene', icon: Music, path: '/local-music' },
        { name: 'Lost In Translation Game', icon: Music, path: '/lost-in-translation' },
        { name: 'Festival Forecaster', icon: Music, path: '/festival-forecaster' },
        { name: 'Safe Night Routes', icon: Music, path: '/safe-routes' },
        { name: 'Local Film Watcher', icon: Music, path: '/local-film' },
        { name: 'Travel Soundtrack Gen', icon: Music, path: '/travel-soundtrack' },
        { name: 'Animated Gif Maker', icon: Music, path: '/gif-maker' },
        { name: 'Chrono Quest Game', icon: Music, path: '/chrono-quest-v2' },
        { name: 'Live Music Finder', icon: Music, path: '/live-music' },
        { name: 'Clubbing Guide', icon: Music, path: '/clubbing-guide' },
        { name: 'Comedy Club Nights', icon: Music, path: '/comedy-club' },
        { name: 'Cinema Language', icon: Music, path: '/cinema-language' },
        { name: 'Speakeasy Guide', icon: Music, path: '/speakeasy-guide' },
      ]
    },
    {
      title: "Local Culture",
      items: [
        { name: 'Local Legends', icon: Users, path: '/local-legends' },
        { name: 'Local Expert Verification', icon: Users, path: '/local-expert-verification' },
        { name: 'Local Slang Challenge', icon: Users, path: '/local-slang' },
        { name: 'Local Hero Connect', icon: Users, path: '/local-hero-connect' },
        { name: 'Skill Exchange Hub', icon: Users, path: '/skill-exchange-hub' },
        { name: 'Local Legend Verification', icon: Users, path: '/local-legend-verification' },
        { name: 'Cultural Etiquette Guide', icon: Users, path: '/cultural-etiquette' },
        { name: 'Myth Folklore Hotspots', icon: Users, path: '/myth-folklore' },
        { name: 'Ancestry Trail', icon: Users, path: '/ancestry-trail' },
        { name: 'Local News Feed', icon: Users, path: '/local-news' },
        { name: 'Ancestor Connect', icon: Users, path: '/ancestor-connect' },
        { name: 'Local Emergency Services', icon: Users, path: '/local-emergency' },
        { name: 'Shop Local Challenges', icon: Users, path: '/shop-local' },
        { name: 'Community Tourism Directory', icon: Users, path: '/community-tourism' },
        { name: 'Live Like Local Day', icon: Users, path: '/live-like-local' },
        { name: 'Local Skill Swap', icon: Users, path: '/skill-swap' },
        { name: 'Secret Local Spots', icon: Users, path: '/secret-spots' },
        { name: 'Local Dialect Tutor', icon: Users, path: '/local-dialect' },
        { name: 'Local Wedding Crusher', icon: Users, path: '/local-wedding' },
        { name: 'Local Interview', icon: Users, path: '/interview-local' },
        { name: 'Local Etiquette Quiz', icon: Users, path: '/local-etiquette' },
        { name: 'Local Cause Support', icon: Users, path: '/support-cause' },
        { name: 'Find Local Band', icon: Users, path: '/local-band' },
        { name: 'Local Superstitions', icon: Users, path: '/local-superstitions' },
        { name: 'Local Sports Finder', icon: Users, path: '/local-sports' },
        { name: 'Local Author Reader', icon: Users, path: '/local-author' },
        { name: 'Local Humor Explained', icon: Users, path: '/local-humor' },
        { name: 'Local Designer Spotlight', icon: Users, path: '/local-designer' },
        { name: 'Local Beauty Products', icon: Users, path: '/local-beauty' },
      ]
    },
    {
      title: "Safety & Legal",
      items: [
        { name: 'Travel Insurance', icon: Shield, path: '/travel-insurance' },
        { name: 'Digital Passport', icon: Shield, path: '/digital-passport' },
        { name: 'Allergen Alert System', icon: Shield, path: '/allergen-alert' },
        { name: 'Emergency Services Dialogue', icon: Shield, path: '/emergency-dialogue' },
        { name: 'Custom Travel Alerts', icon: Shield, path: '/travel-alerts' },
        { name: 'Neighborhood Safety Score', icon: Shield, path: '/safety-score' },
        { name: 'Emergency Contact Access', icon: Shield, path: '/emergency-contact' },
        { name: 'Find A Doctor', icon: Shield, path: '/find-doctor' },
        { name: 'Scam Alert Database', icon: Shield, path: '/scam-database' },
        { name: 'Water Quality Alerts', icon: Shield, path: '/water-quality' },
        { name: 'Air Quality Alerts', icon: Shield, path: '/air-quality' },
        { name: 'Political Unrest Alerts', icon: Shield, path: '/political-unrest' },
        { name: 'Digital Embassy Network', icon: Shield, path: '/digital-embassy-network' },
        { name: 'Lost And Found Network', icon: Shield, path: '/lost-and-found' },
        { name: 'Visa Passport Reminders', icon: Shield, path: '/visa-passport' },
        { name: 'Lost Luggage Assistant', icon: Shield, path: '/lost-luggage' },
        { name: 'Driving Laws Tips', icon: Shield, path: '/driving-laws' },
        { name: 'Travel Doc Scanner', icon: Shield, path: '/doc-scanner' },
        { name: 'Emergency Phrases', icon: Shield, path: '/emergency-phrases' },
        { name: 'Vaccination Requirements', icon: Shield, path: '/vaccination' },
      ]
    },
    {
      title: "Transit & Finance",
      items: [
        { name: 'Budget Synthesis', icon: Wallet, path: '/budget-synthesis' },
        { name: 'Predictive Currency Exchange', icon: Wallet, path: '/currency-exchange' },
        { name: 'Universal Ticket Aggregator', icon: Wallet, path: '/ticket-aggregator' },
        { name: 'Travel Budget Tracker', icon: Wallet, path: '/budget-tracker' },
        { name: 'Route Refill Finder', icon: Wallet, path: '/refill-finder' },
        { name: 'Flight Delay Predictor', icon: Wallet, path: '/flight-delay' },
        { name: 'Public Transport Pass', icon: Wallet, path: '/public-transport' },
        { name: 'Bike Scooter Rental', icon: Wallet, path: '/bike-rental' },
        { name: 'Ferry Boat Booking', icon: Wallet, path: '/ferry-booking' },
        { name: 'Scenic Route Planner', icon: Wallet, path: '/scenic-route' },
        { name: 'Layover Adventure Gen', icon: Wallet, path: '/layover-adventure' },
        { name: 'Currency Exchange Tracker', icon: Wallet, path: '/currency-tracker' },
        { name: 'A T M Bank Finder', icon: Wallet, path: '/atm-finder' },
        { name: 'Tax Free Shopping Guide', icon: Wallet, path: '/tax-free' },
      ]
    },
    {
      title: "Explorer Utilities",
      items: [
        { name: 'Wallet Page', icon: Compass, path: '/wallet' },
        { name: 'E Sim Page', icon: Compass, path: '/esim' },
        { name: 'Profile Page', icon: Compass, path: '/profile' },
        { name: 'Digital Tailor', icon: Compass, path: '/digital-tailor' },
        { name: 'Journal', icon: Compass, path: '/journal' },
        { name: 'Store', icon: Compass, path: '/store' },
        { name: 'Pathfinder', icon: Compass, path: '/pathfinder' },
        { name: 'Guide', icon: Compass, path: '/guide' },
        { name: 'Audio Guide', icon: Compass, path: '/audio-guide' },
        { name: 'Heritage Mirror', icon: Compass, path: '/heritage-mirror' },
        { name: 'Mood Synthesis', icon: Compass, path: '/mood-synthesis' },
        { name: 'Vibe', icon: Compass, path: '/vibe' },
        { name: 'Translator', icon: Compass, path: '/translator' },
        { name: 'Privacy Policy', icon: Compass, path: '/privacy-policy' },
        { name: 'Terms Of Service', icon: Compass, path: '/terms-of-service' },
        { name: 'Contact', icon: Compass, path: '/contact' },
        { name: 'Serendipity Engine', icon: Compass, path: '/serendipity-engine' },
        { name: 'Cognitive Load Balancer', icon: Compass, path: '/cognitive-load-balancer' },
        { name: 'A I Travel Mentor', icon: Compass, path: '/ai-travel-mentor' },
        { name: 'Personalized Challenge Generator', icon: Compass, path: '/challenge-generator' },
        { name: 'Dream Weaver', icon: Compass, path: '/dream-weaver' },
        { name: 'Habit Integration', icon: Compass, path: '/habit-integration' },
        { name: 'Traveler Duels', icon: Compass, path: '/traveler-duels' },
        { name: 'City Capture The Flag', icon: Compass, path: '/capture-the-flag' },
        { name: 'Exploration Achievements', icon: Compass, path: '/exploration-achievements' },
        { name: 'Spontaneous Adventures', icon: Compass, path: '/spontaneous-adventures' },
        { name: 'Global Treasure Hunt', icon: Compass, path: '/global-treasure-hunt' },
        { name: 'Photo Of The Day', icon: Compass, path: '/photo-of-the-day' },
        { name: 'Language Exchange Match', icon: Compass, path: '/language-exchange' },
        { name: 'Secret Handshakes', icon: Compass, path: '/secret-handshakes' },
        { name: 'City Challenges', icon: Compass, path: '/city-challenges' },
        { name: 'Mystery Pen Pal', icon: Compass, path: '/mystery-pen-pal' },
        { name: 'Travelers Potluck', icon: Compass, path: '/travelers-potluck' },
        { name: 'Guess The Location', icon: Compass, path: '/guess-the-location' },
        { name: 'Travel Story Contest', icon: Compass, path: '/travel-story-contest' },
        { name: 'Time Capsule Messages', icon: Compass, path: '/time-capsule' },
        { name: 'Travelers Radio', icon: Compass, path: '/travelers-radio' },
        { name: 'Meme My Trip', icon: Compass, path: '/meme-my-trip' },
        { name: 'Social Battery Mode', icon: Compass, path: '/social-battery' },
        { name: 'Trip Color Palette', icon: Compass, path: '/trip-color-palette' },
        { name: 'Customizable Interface', icon: Compass, path: '/customizable-interface' },
        { name: 'Travel D N A', icon: Compass, path: '/travel-dna' },
        { name: 'Choose Your Adventure', icon: Compass, path: '/choose-your-adventure' },
        { name: 'Dream Journal', icon: Compass, path: '/dream-journal' },
        { name: 'Odyssey Relay', icon: Compass, path: '/odyssey-relay' },
        { name: 'Group Vibe Calibration', icon: Compass, path: '/group-vibe-calibration' },
        { name: 'Echoes Of Past Travelers', icon: Compass, path: '/echoes-of-past-travelers' },
        { name: 'Aetheria Ambassador Program', icon: Compass, path: '/ambassador-program' },
        { name: 'Travelers Guilds', icon: Compass, path: '/travelers-guilds' },
        { name: 'Spontaneous Meetups', icon: Compass, path: '/spontaneous-meetups' },
        { name: 'Chrono Quests', icon: Compass, path: '/chrono-quests' },
        { name: 'Digital Souvenir Forging', icon: Compass, path: '/digital-souvenir-forging' },
        { name: 'World Grid Unveiling', icon: Compass, path: '/world-grid-unveiling' },
        { name: 'Derive Mode', icon: Compass, path: '/derive-mode' },
        { name: 'Escape The City', icon: Compass, path: '/escape-the-city' },
        { name: 'Get Me Home', icon: Compass, path: '/get-me-home' },
        { name: 'Crowd Density Predictor', icon: Compass, path: '/crowd-density' },
        { name: 'Chronosync', icon: Compass, path: '/chronosync' },
        { name: 'Intelligent Souvenir Shipper', icon: Compass, path: '/souvenir-shipper' },
        { name: 'Last Mile Transit Solver', icon: Compass, path: '/last-mile' },
        { name: 'Digital Nomad Hub', icon: Compass, path: '/digital-nomad-hub' },
        { name: 'Rental Synthesizer', icon: Compass, path: '/rental-synthesizer' },
        { name: 'Automated Check In', icon: Compass, path: '/automated-check-in' },
        { name: 'Follow Me Escort', icon: Compass, path: '/follow-me' },
        { name: 'Privacy Scrubber', icon: Compass, path: '/privacy-scrubber' },
        { name: 'Aura Shield', icon: Compass, path: '/aura-shield' },
        { name: 'Water Refill Station Finder', icon: Compass, path: '/water-refill' },
        { name: 'Conservation Circle', icon: Compass, path: '/conservation-circle' },
        { name: 'Wildlife Sighting Ethos', icon: Compass, path: '/wildlife-sighting' },
        { name: 'Collaborative Journal', icon: Compass, path: '/collaborative-journal' },
        { name: 'Then And Now Photo Mixer', icon: Compass, path: '/then-and-now' },
        { name: 'Vibe Based Photo Filters', icon: Compass, path: '/vibe-filters' },
        { name: 'Interactive Travel Maps', icon: Compass, path: '/interactive-maps' },
        { name: 'A I Story Scout', icon: Compass, path: '/story-scout' },
        { name: 'Sensory Journal', icon: Compass, path: '/sensory-journal' },
        { name: 'Historical Dialogue Bot', icon: Compass, path: '/historical-bot' },
        { name: 'Silent Observer Mode', icon: Compass, path: '/silent-observer' },
        { name: 'Drone Rental', icon: Compass, path: '/drone-service' },
        { name: 'Memory Palace', icon: Compass, path: '/memory-palace' },
        { name: 'Aetheria D A O', icon: Compass, path: '/aetheria-dao' },
        { name: 'Sentient A I Companion', icon: Compass, path: '/sentient-companion' },
        { name: 'Haptic Controller', icon: Compass, path: '/haptic-controller' },
        { name: 'Travel Anthem', icon: Compass, path: '/travel-anthem' },
        { name: 'Custom Tour Builder', icon: Compass, path: '/build-tour' },
        { name: 'Do Not Disturb Signs', icon: Compass, path: '/dnd-signs' },
        { name: 'Fake Phone Call', icon: Compass, path: '/fake-call' },
        { name: 'Solo Traveler Check In', icon: Compass, path: '/solo-check-in' },
        { name: 'First Aid Guide', icon: Compass, path: '/first-aid' },
        { name: 'Medication Reminder', icon: Compass, path: '/medication-reminder' },
        { name: 'Trusted Traveler Network', icon: Compass, path: '/trusted-traveler' },
        { name: 'Recycling Guide', icon: Compass, path: '/recycling-guide' },
        { name: 'A I Vlog Generator', icon: Compass, path: '/vlog-generator' },
        { name: 'Trip Movie Trailer', icon: Compass, path: '/movie-trailer' },
        { name: 'Collaborative Scrapbook', icon: Compass, path: '/collaborative-scrapbook' },
        { name: 'Print Travel Story', icon: Compass, path: '/print-story' },
        { name: 'Travel Poem Generator', icon: Compass, path: '/travel-poem' },
        { name: 'Memory Mapper', icon: Compass, path: '/map-memories' },
        { name: 'Geotagged Audio Notes', icon: Compass, path: '/audio-notes' },
        { name: 'Travel Legacy Builder', icon: Compass, path: '/travel-legacy' },
        { name: 'Emotional Tone Tracker', icon: Compass, path: '/emotional-tone' },
        { name: 'Trip Scent Visualizer', icon: Compass, path: '/trip-scent' },
        { name: 'Travel Tattoo Design', icon: Compass, path: '/travel-tattoo' },
        { name: 'Travel Horoscope', icon: Compass, path: '/travel-horoscope' },
        { name: 'Telepathic Communication', icon: Compass, path: '/telepathic-comm' },
        { name: 'Esim Provider Info', icon: Compass, path: '/esim-providers' },
        { name: 'Wifi Hotspot Map', icon: Compass, path: '/wifi-hotspot' },
        { name: 'Power Outlet Info', icon: Compass, path: '/power-outlet' },
        { name: 'Tipping Guide', icon: Compass, path: '/tipping-guide' },
        { name: 'Packing Cubes Organizer', icon: Compass, path: '/packing-cubes' },
        { name: 'Robot Butler Assistant', icon: Compass, path: '/robot-butler' },
        { name: 'Cooking Class Finder', icon: Compass, path: '/cooking-class' },
        { name: 'Vintage Store Guide', icon: Compass, path: '/vintage-store' },
        { name: 'Custom Made Clothing', icon: Compass, path: '/custom-clothes' },
        { name: 'Souvenir Shipping Svc', icon: Compass, path: '/souvenir-shipping-v2' },
        { name: 'Personal Shopper Assistant', icon: Compass, path: '/personal-shopper' },
        { name: 'Fashionista Photo Challenge', icon: Compass, path: '/fashionista-challenge' },
        { name: 'Ethical Brand Guide', icon: Compass, path: '/ethical-brands' },
        { name: 'Antique Store Finder', icon: Compass, path: '/antique-store' },
        { name: 'Bookstore Finder', icon: Compass, path: '/bookstore-finder' },
        { name: 'Color Analysis Tool', icon: Compass, path: '/color-analysis' },
        { name: 'Whats In My Bag Organizer', icon: Compass, path: '/whats-in-my-bag' },
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
