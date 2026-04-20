
import React, { useState, useEffect, Suspense } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import Navbar from './components/Navbar';
import PremiumGate from './components/PremiumGate';
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
import TravelInsurance from './components/TravelInsurance';
import Translator from './components/Translator';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Contact from './components/Contact';
import { UserProfile as UserProfileType } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import i18n from './lib/i18n';
import Vibe from './components/Vibe';
import LandmarkLens from './components/LandmarkLens';
import CreateItinerary from './components/CreateItinerary';
import RealtimeItinerary from './components/RealtimeItinerary';
import UserProfile from './components/UserProfile';
import SplashScreen from './components/SplashScreen';
import { cn } from './lib/utils';

// Missing 100 features
import SerendipityEngine from './components/SerendipityEngine';
import CognitiveLoadBalancer from './components/CognitiveLoadBalancer';
import WhatIfScenarioPlanner from './components/WhatIfScenarioPlanner';
import AITravelMentor from './components/AITravelMentor';
import FlavorSeeker from './components/FlavorSeeker';
import DynamicItineraryABTesting from './components/DynamicItineraryABTesting';
import PersonalizedChallengeGenerator from './components/PersonalizedChallengeGenerator';
import DreamWeaver from './components/DreamWeaver';
import HabitIntegration from './components/HabitIntegration';
import ARTimeLapseView from './components/ARTimeLapseView';
import ARMenuVisualizer from './components/ARMenuVisualizer';
import GeocachedARArtGallery from './components/GeocachedARArtGallery';
import ARPublicTransitXRay from './components/ARPublicTransitXRay';
import SkyGazerAR from './components/SkyGazerAR';
import InteractiveARStorytelling from './components/InteractiveARStorytelling';
import PaintTheTownAR from './components/PaintTheTownAR';
import ArchitectureDeconstructor from './components/ArchitectureDeconstructor';
import ARLanguageHelper from './components/ARLanguageHelper';
import ARHistoricalReenactments from './components/ARHistoricalReenactments';
import ARGhostTours from './components/ARGhostTours';
import ARAncientRuins from './components/ARAncientRuins';
import ARCelebrityTourGuide from './components/ARCelebrityTourGuide';
import ARLocalWildlife from './components/ARLocalWildlife';
import ARFoodDeconstruction from './components/ARFoodDeconstruction';
import ARSouvenirTryOn from './components/ARSouvenirTryOn';
import VRPreTrip from './components/VRPreTrip';
import VRImmobileTravel from './components/VRImmobileTravel';
import ARPersonalizedGraffiti from './components/ARPersonalizedGraffiti';
import VRMeditation from './components/VRMeditation';
import ARHotelArtGallery from './components/ARHotelArtGallery';
import ARFitnessTrails from './components/ARFitnessTrails';
import ARPlantFlora from './components/ARPlantFlora';
import VRExtremeSports from './components/VRExtremeSports';
import ARHauntedPlaces from './components/ARHauntedPlaces';
import ARMythicalCreatures from './components/ARMythicalCreatures';
import ARDIYSouvenir from './components/ARDIYSouvenir';
import VRCulturalEtiquette from './components/VRCulturalEtiquette';
import ARWeatherDome from './components/ARWeatherDome';
import ARMusicalStreets from './components/ARMusicalStreets';
import ARDishSizeVisualizer from './components/ARDishSizeVisualizer';
import TravelerDuels from './components/TravelerDuels';
import CityCaptureTheFlag from './components/CityCaptureTheFlag';
import LocalFoodBingo from './components/LocalFoodBingo';
import ExplorationAchievements from './components/ExplorationAchievements';
import SpontaneousAdventures from './components/SpontaneousAdventures';
import GlobalTreasureHunt from './components/GlobalTreasureHunt';
import GoodSamaritanQuests from './components/GoodSamaritanQuests';
import PhotoOfTheDay from './components/PhotoOfTheDay';
import ItineraryTrading from './components/ItineraryTrading';
import LocalKnowledgeLeaderboard from './components/LocalKnowledgeLeaderboard';
import LanguageExchangeMatch from './components/LanguageExchangeMatch';
import TravelersStockMarket from './components/TravelersStockMarket';
import SecretHandshakes from './components/SecretHandshakes';
import DigitalPassport from './components/DigitalPassport';
import TravelCharades from './components/TravelCharades';
import CollaborativeTravelDiary from './components/CollaborativeTravelDiary';
import PayItForwardChain from './components/PayItForwardChain';
import CityChallenges from './components/CityChallenges';
import MysteryPenPal from './components/MysteryPenPal';
import LocalExpertVerification from './components/LocalExpertVerification';
import TravelersPotluck from './components/TravelersPotluck';
import GuessTheLocation from './components/GuessTheLocation';
import TravelStoryContest from './components/TravelStoryContest';
import TimeCapsuleMessages from './components/TimeCapsuleMessages';
import LocalSlangChallenge from './components/LocalSlangChallenge';
import SkillBartering from './components/SkillBartering';
import UrbanExplorationLeaderboard from './components/UrbanExplorationLeaderboard';
import TravelersRadio from './components/TravelersRadio';
import MemeMyTrip from './components/MemeMyTrip';
import BioFeedbackItinerary from './components/BioFeedbackItinerary';
import SocialBatteryMode from './components/SocialBatteryMode';
import DigitalDetoxMode from './components/DigitalDetoxMode';
import TripColorPalette from './components/TripColorPalette';
import SouvenirRecommendations from './components/SouvenirRecommendations';
import CustomizableInterface from './components/CustomizableInterface';
import TravelDNA from './components/TravelDNA';
import ChooseYourAdventure from './components/ChooseYourAdventure';
import AIPersonalizedPostcards from './components/AIPersonalizedPostcards';
import DreamJournal from './components/DreamJournal';
import LocalHeroConnect from './components/LocalHeroConnect';
import OdysseyRelay from './components/OdysseyRelay';
import SkillExchangeHub from './components/SkillExchangeHub';
import GroupVibeCalibration from './components/GroupVibeCalibration';
import EchoesOfPastTravelers from './components/EchoesOfPastTravelers';
import SharedExpenseSynthesizer from './components/SharedExpenseSynthesizer';
import AetheriaAmbassadorProgram from './components/AetheriaAmbassadorProgram';
import TravelersGuilds from './components/TravelersGuilds';
import GlobalGiftNetwork from './components/GlobalGiftNetwork';
import SpontaneousMeetups from './components/SpontaneousMeetups';
import ChronoQuests from './components/ChronoQuests';
import FactionWars from './components/FactionWars';
import DigitalSouvenirForging from './components/DigitalSouvenirForging';
import WorldGridUnveiling from './components/WorldGridUnveiling';
import AchievementTrees from './components/AchievementTrees';
import BountyBoard from './components/BountyBoard';
import DeriveMode from './components/DeriveMode';
import LocalLegendVerification from './components/LocalLegendVerification';
import EscapeTheCity from './components/EscapeTheCity';
import CultureCollector from './components/CultureCollector';
import GetMeHome from './components/GetMeHome';
import CrowdDensityPredictor from './components/CrowdDensityPredictor';
import Chronosync from './components/Chronosync';
import IntelligentSouvenirShipper from './components/IntelligentSouvenirShipper';
import LastMileTransitSolver from './components/LastMileTransitSolver';
import DigitalNomadHub from './components/DigitalNomadHub';
import PredictiveCurrencyExchange from './components/PredictiveCurrencyExchange';
import UniversalTicketAggregator from './components/UniversalTicketAggregator';
import WaitOrGoAdvisor from './components/WaitOrGoAdvisor';
import RentalSynthesizer from './components/RentalSynthesizer';
import SafetySwarm from './components/SafetySwarm';
import AutomatedCheckIn from './components/AutomatedCheckIn';
import ScamAlertRadar from './components/ScamAlertRadar';
import VirtualEmbassy from './components/VirtualEmbassy';
import TrustedRouteCorridors from './components/TrustedRouteCorridors';
import FollowMeEscort from './components/FollowMeEscort';
import AllergenAlertSystem from './components/AllergenAlertSystem';
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
import ThenAndNowPhotoMixer from './components/ThenAndNowPhotoMixer';
import AITravelBlogger from './components/AITravelBlogger';
import AetheriaRadioHost from './components/AetheriaRadioHost';
import VibeBasedPhotoFilters from './components/VibeBasedPhotoFilters';
import InteractiveTravelMaps from './components/InteractiveTravelMaps';
import TravelComicStripCreator from './components/TravelComicStripCreator';
import ThreeDPhotoSculptures from './components/3DPhotoSculptures';
import AIStoryScout from './components/AIStoryScout';
import SensoryJournal from './components/SensoryJournal';
import LiveLikeALocalSimulation from './components/LiveLikeALocalSimulation';
import CulturalEtiquetteGuide from './components/CulturalEtiquetteGuide';
import MythFolkloreHotspots from './components/MythFolkloreHotspots';
import StreetArtSagas from './components/StreetArtSagas';
import LocalMusicScene from './components/LocalMusicScene';
import LostInTranslationGame from './components/LostInTranslationGame';
import FestivalForecaster from './components/FestivalForecaster';
import ArtisanCraftFinder from './components/ArtisanCraftFinder';
import HistoricalDialogueBot from './components/HistoricalDialogueBot';
import SilentObserverMode from './components/SilentObserverMode';
import AncestryTrail from './components/AncestryTrail';
import DroneRental from './components/DroneRental';
import TranslationEarbuds from './components/TranslationEarbuds';
import MemoryPalace from './components/MemoryPalace';
import AetheriaDAO from './components/AetheriaDAO';
import SentientAICompanion from './components/SentientAICompanion';
import HapticController from './components/HapticController';
import WeatherAdaptiveController from './components/WeatherAdaptiveController';
import BioDataMonitor from './components/BioDataMonitor';
import QuantumSouvenir from './components/QuantumSouvenir';

// Features 101-150
import PersonalizedMeditation from './components/PersonalizedMeditation';
import TravelAnthem from './components/TravelAnthem';
import LocalNewsFeed from './components/LocalNewsFeed';
import CustomTourBuilder from './components/CustomTourBuilder';
import AncestorConnect from './components/AncestorConnect';
import TravelBudgetTracker from './components/TravelBudgetTracker';
import SpiritAnimal from './components/SpiritAnimal';
import DoNotDisturbSigns from './components/DoNotDisturbSigns';
import CustomTravelAlerts from './components/CustomTravelAlerts';
import EatPrayLoveJourney from './components/EatPrayLoveJourney';
import NeighborhoodSafetyScore from './components/NeighborhoodSafetyScore';
import EmergencyContactAccess from './components/EmergencyContactAccess';
import FakePhoneCall from './components/FakePhoneCall';
import LiveLocationShare from './components/LiveLocationShare';
import LocalEmergencyServices from './components/LocalEmergencyServices';
import AllergyCardTranslator from './components/AllergyCardTranslator';
import FindADoctor from './components/FindADoctor';
import ScamAlertDatabase from './components/ScamAlertDatabase';
import SoloTravelerCheckIn from './components/SoloTravelerCheckIn';
import WaterQualityAlerts from './components/WaterQualityAlerts';
import AirQualityAlerts from './components/AirQualityAlerts';
import PoliticalUnrestAlerts from './components/PoliticalUnrestAlerts';
import NaturalDisasterWarnings from './components/NaturalDisasterWarnings';
import DigitalEmbassyNetwork from './components/DigitalEmbassyNetwork';
import LostAndFoundNetwork from './components/LostAndFoundNetwork';
import SafeNightRoutes from './components/SafeNightRoutes';
import TravelInsuranceComparison from './components/TravelInsuranceComparison';
import FirstAidGuide from './components/FirstAidGuide';
import MedicationReminder from './components/MedicationReminder';
import TrustedTravelerNetwork from './components/TrustedTravelerNetwork';
import CarbonFootprintTracker from './components/CarbonFootprintTracker';
import EcoTravelChallenges from './components/EcoTravelChallenges';
import SustainableBusinessDirectory from './components/SustainableBusinessDirectory';
import CarbonOffsetter from './components/CarbonOffsetter';
import LeaveNoTraceGuide from './components/LeaveNoTraceGuide';
import LocalProduceFinder from './components/LocalProduceFinder';
import VolunteerOpportunities from './components/VolunteerOpportunities';
import RouteRefillFinder from './components/RouteRefillFinder';
import TransportCO2Comparison from './components/TransportCO2Comparison';
import ShopLocalChallenges from './components/ShopLocalChallenges';
import EcoWarriorLeaderboard from './components/EcoWarriorLeaderboard';
import AnimalFriendlyTourism from './components/AnimalFriendlyTourism';
import RecyclingGuide from './components/RecyclingGuide';
import LocalArtisansMarketplace from './components/LocalArtisansMarketplace';
import ForageableFoodMap from './components/ForageableFoodMap';
import GreenAccommodationRatings from './components/GreenAccommodationRatings';
import SustainableSouvenirGuide from './components/SustainableSouvenirGuide';
import SecondHandStoreMap from './components/SecondHandStoreMap';
import PlantATree from './components/PlantATree';
import CommunityTourismDirectory from './components/CommunityTourismDirectory';

// Features 151-200
import LiveLikeLocalDay from './components/LiveLikeLocalDay';
import HomeCookedMeal from './components/HomeCookedMeal';
import LocalSkillSwap from './components/LocalSkillSwap';
import SecretLocalSpots from './components/SecretLocalSpots';
import LocalDialectTutor from './components/LocalDialectTutor';
import LocalWeddingCrusher from './components/LocalWeddingCrusher';
import LocalInterview from './components/LocalInterview';
import LocalEtiquetteQuiz from './components/LocalEtiquetteQuiz';
import DayInTheLifeAR from './components/DayInTheLifeAR';
import LocalCauseSupport from './components/LocalCauseSupport';
import FindLocalBand from './components/FindLocalBand';
import LearnLocalCraft from './components/LearnLocalCraft';
import LocalSuperstitions from './components/LocalSuperstitions';
import CoffeeWithLocal from './components/CoffeeWithLocal';
import LocalSportsFinder from './components/LocalSportsFinder';
import LocalAuthorReader from './components/LocalAuthorReader';
import LocalFilmWatcher from './components/LocalFilmWatcher';
import StreetFoodSafety from './components/StreetFoodSafety';
import UndergroundArtScene from './components/UndergroundArtScene';
import LocalHumorExplained from './components/LocalHumorExplained';
import AIVlogGenerator from './components/AIVlogGenerator';
import TripMovieTrailer from './components/TripMovieTrailer';
import DigitalTimeCapsuleFeature from './components/DigitalTimeCapsuleFeature';
import CollaborativeScrapbook from './components/CollaborativeScrapbook';
import SensoryDiaryFeature from './components/SensoryDiaryFeature';
import PrintTravelStory from './components/PrintTravelStory';
import ThreePrintedSouvenirs from './components/ThreePrintedSouvenirs';
import TravelPoemGenerator from './components/TravelPoemGenerator';
import MemoryMapper from './components/MemoryMapper';
import TripShareOnline from './components/TripShareOnline';
import ThenAndNowBlenderFeature from './components/ThenAndNowBlenderFeature';
import TravelComicCreatorFeature from './components/TravelComicCreatorFeature';
import TravelSoundtrackGen from './components/TravelSoundtrackGen';
import AnimatedGifMaker from './components/AnimatedGifMaker';
import GeotaggedAudioNotes from './components/GeotaggedAudioNotes';
import TravelLegacyBuilder from './components/TravelLegacyBuilder';
import EmotionalToneTracker from './components/EmotionalToneTracker';
import TripScentVisualizer from './components/TripScentVisualizer';
import TravelTattooDesign from './components/TravelTattooDesign';
import TravelHoroscope from './components/TravelHoroscope';
import QuantumSouvenirFeature from './components/QuantumSouvenirFeature';
import ChronoQuestGame from './components/ChronoQuestGame';
import HistoricalAuraReading from './components/HistoricalAuraReading';
import InterdimensionalPortal from './components/InterdimensionalPortal';
import SentientCompanionFeature from './components/SentientCompanionFeature';
import MemoryMarketplaceFeature from './components/MemoryMarketplaceFeature';
import HolographicJournal from './components/HolographicJournal';
import TelepathicCommunication from './components/TelepathicCommunication';
import AugmentedTasteAR from './components/AugmentedTasteAR';
import DreamWeavingFeature from './components/DreamWeavingFeature';

// Features 201-250
import PersonalForceFieldAR from './components/PersonalForceFieldAR';
import BioluminescentFashion from './components/BioluminescentFashion';
import AlienArcheologyGame from './components/AlienArcheologyGame';
import RobotButlerAssistant from './components/RobotButlerAssistant';
import InvisibilityCloakAR from './components/InvisibilityCloakAR';
import CyberneticEyeAR from './components/CyberneticEyeAR';
import PsychicRecommendations from './components/PsychicRecommendations';
import AntiGravityBootsAR from './components/AntiGravityBootsAR';
import AnimalTranslator from './components/AnimalTranslator';
import TimeDilationFieldAR from './components/TimeDilationFieldAR';
import MysteryMealExperience from './components/MysteryMealExperience';
import ChefsTableBooking from './components/ChefsTableBooking';
import CocktailCompanion from './components/CocktailCompanion';
import WineTastingAssistant from './components/WineTastingAssistant';
import StreetFoodTourGen from './components/StreetFoodTourGen';
import CookingClassFinder from './components/CookingClassFinder';
import FarmToTableExperience from './components/FarmToTableExperience';
import FoodPhotoContest from './components/FoodPhotoContest';
import EdibleInsectChallenge from './components/EdibleInsectChallenge';
import CoffeeConnoisseurGuide from './components/CoffeeConnoisseurGuide';
import TeaCeremonyFinder from './components/TeaCeremonyFinder';
import BreweryDistilleryTour from './components/BreweryDistilleryTour';
import LocalMarketTreasureHunt from './components/LocalMarketTreasureHunt';
import VeganRestaurantFinder from './components/VeganRestaurantFinder';
import GlutenFreeGuide from './components/GlutenFreeGuide';
import FoodHistoryGuide from './components/FoodHistoryGuide';
import RecipeCollector from './components/RecipeCollector';
import EatWithLocalFeature from './components/EatWithLocalFeature';
import FoodBloggerMode from './components/FoodBloggerMode';
import CalorieNutritionTracker from './components/CalorieNutritionTracker';
import LocalDesignerSpotlight from './components/LocalDesignerSpotlight';
import VintageStoreGuide from './components/VintageStoreGuide';
import CustomMadeClothing from './components/CustomMadeClothing';
import BargainHunterMode from './components/BargainHunterMode';
import SouvenirShippingSvc from './components/SouvenirShippingSvc';
import PersonalShopperAssistant from './components/PersonalShopperAssistant';
import FashionistaPhotoChallenge from './components/FashionistaPhotoChallenge';
import TryOnClothesAR from './components/TryOnClothesAR';
import WhatToWearPredictor from './components/WhatToWearPredictor';
import EthicalBrandGuide from './components/EthicalBrandGuide';
import LocalFleaMarketGuide from './components/LocalFleaMarketGuide';
import AntiqueStoreFinder from './components/AntiqueStoreFinder';
import ArtisanCraftMarketplace2 from './components/ArtisanCraftMarketplace2';
import BookstoreFinder from './components/BookstoreFinder';
import TaxFreeShoppingGuide from './components/TaxFreeShoppingGuide';
import SizeConversionChart from './components/SizeConversionChart';
import ColorAnalysisTool from './components/ColorAnalysisTool';
import FashionHistoryAR from './components/FashionHistoryAR';
import LocalBeautyProducts from './components/LocalBeautyProducts';
import WhatsInMyBagOrganizer from './components/WhatsInMyBagOrganizer';

// Features 251-300
import SmartLuggageIntegration from './components/SmartLuggageIntegration';
import VisaPassportReminders from './components/VisaPassportReminders';
import FlightDelayPredictor from './components/FlightDelayPredictor';
import SeatRecommender from './components/SeatRecommender';
import PublicTransportPass from './components/PublicTransportPass';
import BikeScooterRental from './components/BikeScooterRental';
import TravelerCarpooling from './components/TravelerCarpooling';
import FerryBoatBooking from './components/FerryBoatBooking';
import ScenicRoutePlanner from './components/ScenicRoutePlanner';
import LayoverAdventureGen from './components/LayoverAdventureGen';
import LostLuggageAssistant from './components/LostLuggageAssistant';
import CurrencyExchangeTracker from './components/CurrencyExchangeTracker';
import ATMBankFinder from './components/ATMBankFinder';
import EsimProviderInfo from './components/EsimProviderInfo';
import WifiHotspotMap from './components/WifiHotspotMap';
import PowerOutletInfo from './components/PowerOutletInfo';
import DrivingLawsTips from './components/DrivingLawsTips';
import TippingGuide from './components/TippingGuide';
import PackingCubesOrganizer from './components/PackingCubesOrganizer';
import TravelDocScanner from './components/TravelDocScanner';
import FindAGym from './components/FindAGym';
import RunningHikingTrails from './components/RunningHikingTrails';
import TravelerMeditation from './components/TravelerMeditation';
import HealthyEatingGuide from './components/HealthyEatingGuide';
import TravelSleepTracker from './components/TravelSleepTracker';
import DigitalDetoxChallenges from './components/DigitalDetoxChallenges';
import MentalHealthSupport from './components/MentalHealthSupport';
import SpaWellnessBooking from './components/SpaWellnessBooking';
import SunscreenReminder from './components/SunscreenReminder';
import HydrationReminder from './components/HydrationReminder';
import TravelFriendlyWorkouts from './components/TravelFriendlyWorkouts';
import FindQuietPlace from './components/FindQuietPlace';
import NatureSoundsDestination from './components/NatureSoundsDestination';
import StressLevelMonitor from './components/StressLevelMonitor';
import MindfulWalking from './components/MindfulWalking';
import DigitalNomadHealthInc from './components/DigitalNomadHealthInc';
import EmergencyPhrases from './components/EmergencyPhrases';
import VaccinationRequirements from './components/VaccinationRequirements';
import DiarrheaPrevention from './components/DiarrheaPrevention';
import FindTherapist from './components/FindTherapist';
import FindRooftopBar from './components/FindRooftopBar';
import LiveMusicFinder from './components/LiveMusicFinder';
import ClubbingGuide from './components/ClubbingGuide';
import ComedyClubNights from './components/ComedyClubNights';
import TheaterBooking from './components/TheaterBooking';
import CinemaLanguage from './components/CinemaLanguage';
import KaraokeBarFinder from './components/KaraokeBarFinder';
import SpeakeasyGuide from './components/SpeakeasyGuide';
import NightMarketExplorer from './components/NightMarketExplorer';
import StargazingSpots from './components/StargazingSpots';

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

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const isLandingPage = !user && currentPath === '/';

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
      case '/itineraries': return <ItinerariesPage />;
      case '/create-itinerary': return <CreateItinerary />;
      case '/wallet': return <WalletPage />;
      case '/esim': return <ESimPage />;
      case '/profile': return <ProfilePage />;
      case '/ai-itinerary': return <AIItinerary />;
      case '/digital-tailor': return <DigitalTailor />;
      case '/vibe-market': return <VibeMarket />;
      case '/journal': return <Journal />;
      case '/budget-synthesis': return <BudgetSynthesis />;
      case '/store': return <Store />;
      case '/marketplace': return <Marketplace />;
      case '/pathfinder': return <Pathfinder />;
      case '/guide': return <Guide />;
      case '/ar-wayfinding': return <ARWayfinding />;
      case '/local-legends': return <LocalLegends />;
      case '/audio-guide': return <AudioGuide />;
      case '/heritage-mirror': return <HeritageMirror />;
      case '/mood-synthesis': return <MoodSynthesis />;
      case '/video-teaser': return <VideoTeaser />;
      case '/postcard-studio': return <PostcardStudio />;
      case '/vibe': return <Vibe />;
      case '/landmark-lens': return <LandmarkLens />;
      case '/booking': return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"><BookingHub /></div>;
      case '/travel-insurance': return <TravelInsurance />;
      case '/translator': return <Translator />;
      case '/privacy-policy': return <PrivacyPolicy />;
      case '/terms-of-service': return <TermsOfService />;
      case '/contact': return <Contact />;
      case '/serendipity-engine': return <SerendipityEngine />;
      case '/cognitive-load-balancer': return <CognitiveLoadBalancer />;
      case '/scenario-planner': return <WhatIfScenarioPlanner />;
      case '/ai-travel-mentor': return <AITravelMentor />;
      case '/flavor-seeker': return <FlavorSeeker />;
      case '/ab-testing': return <DynamicItineraryABTesting />;
      case '/challenge-generator': return <PersonalizedChallengeGenerator />;
      case '/dream-weaver': return <DreamWeaver />;
      case '/habit-integration': return <HabitIntegration />;
      case '/ar-time-lapse': return <ARTimeLapseView />;
      case '/ar-menu': return <ARMenuVisualizer />;
      case '/ar-art-gallery': return <GeocachedARArtGallery />;
      case '/ar-transit': return <ARPublicTransitXRay />;
      case '/sky-gazer': return <SkyGazerAR />;
      case '/ar-storytelling': return <InteractiveARStorytelling />;
      case '/paint-the-town': return <PaintTheTownAR />;
      case '/architecture-deconstructor': return <ArchitectureDeconstructor />;
      case '/ar-language-helper': return <ARLanguageHelper />;
      case '/ar-historical': return <ARHistoricalReenactments />;
      case '/ar-ghost-tours': return <ARGhostTours />;
      case '/ar-ancient-ruins': return <ARAncientRuins />;
      case '/ar-celebrity-guide': return <ARCelebrityTourGuide />;
      case '/ar-wildlife': return <ARLocalWildlife />;
      case '/ar-food-deconstruction': return <ARFoodDeconstruction />;
      case '/ar-souvenir-tryon': return <ARSouvenirTryOn />;
      case '/vr-pre-trip': return <VRPreTrip />;
      case '/vr-immobile': return <VRImmobileTravel />;
      case '/ar-personalized-graffiti': return <ARPersonalizedGraffiti />;
      case '/vr-meditation': return <VRMeditation />;
      case '/ar-hotel-gallery': return <ARHotelArtGallery />;
      case '/ar-fitness-trails': return <ARFitnessTrails />;
      case '/ar-plant-flora': return <ARPlantFlora />;
      case '/vr-extreme-sports': return <VRExtremeSports />;
      case '/ar-haunted-places': return <ARHauntedPlaces />;
      case '/ar-mythical-creatures': return <ARMythicalCreatures />;
      case '/ar-diy-souvenir': return <ARDIYSouvenir />;
      case '/vr-cultural-etiquette': return <VRCulturalEtiquette />;
      case '/ar-weather-dome': return <ARWeatherDome />;
      case '/ar-musical-streets': return <ARMusicalStreets />;
      case '/ar-dish-size': return <ARDishSizeVisualizer />;
      case '/traveler-duels': return <TravelerDuels />;
      case '/capture-the-flag': return <CityCaptureTheFlag />;
      case '/local-food-bingo': return <LocalFoodBingo />;
      case '/exploration-achievements': return <ExplorationAchievements />;
      case '/spontaneous-adventures': return <SpontaneousAdventures />;
      case '/global-treasure-hunt': return <GlobalTreasureHunt />;
      case '/good-samaritan': return <GoodSamaritanQuests />;
      case '/photo-of-the-day': return <PhotoOfTheDay />;
      case '/itinerary-trading': return <ItineraryTrading />;
      case '/local-knowledge': return <LocalKnowledgeLeaderboard />;
      case '/language-exchange': return <LanguageExchangeMatch />;
      case '/travelers-stock-market': return <TravelersStockMarket />;
      case '/secret-handshakes': return <SecretHandshakes />;
      case '/digital-passport': return <DigitalPassport />;
      case '/travel-charades': return <TravelCharades />;
      case '/collaborative-diary': return <CollaborativeTravelDiary />;
      case '/pay-it-forward': return <PayItForwardChain />;
      case '/city-challenges': return <CityChallenges />;
      case '/mystery-pen-pal': return <MysteryPenPal />;
      case '/local-expert-verification': return <LocalExpertVerification />;
      case '/travelers-potluck': return <TravelersPotluck />;
      case '/guess-the-location': return <GuessTheLocation />;
      case '/travel-story-contest': return <TravelStoryContest />;
      case '/time-capsule': return <TimeCapsuleMessages />;
      case '/local-slang': return <LocalSlangChallenge />;
      case '/skill-bartering': return <SkillBartering />;
      case '/urban-exploration': return <UrbanExplorationLeaderboard />;
      case '/travelers-radio': return <TravelersRadio />;
      case '/meme-my-trip': return <MemeMyTrip />;
      case '/bio-feedback': return <BioFeedbackItinerary />;
      case '/social-battery': return <SocialBatteryMode />;
      case '/digital-detox': return <DigitalDetoxMode />;
      case '/trip-color-palette': return <TripColorPalette />;
      case '/souvenir-recommendations': return <SouvenirRecommendations />;
      case '/customizable-interface': return <CustomizableInterface />;
      case '/travel-dna': return <TravelDNA />;
      case '/choose-your-adventure': return <ChooseYourAdventure />;
      case '/ai-postcards': return <AIPersonalizedPostcards />;
      case '/dream-journal': return <DreamJournal />;
      case '/local-hero-connect': return <LocalHeroConnect />;
      case '/odyssey-relay': return <OdysseyRelay />;
      case '/skill-exchange-hub': return <SkillExchangeHub />;
      case '/group-vibe-calibration': return <GroupVibeCalibration />;
      case '/echoes-of-past-travelers': return <EchoesOfPastTravelers />;
      case '/shared-expense': return <SharedExpenseSynthesizer />;
      case '/ambassador-program': return <AetheriaAmbassadorProgram />;
      case '/travelers-guilds': return <TravelersGuilds />;
      case '/global-gift-network': return <GlobalGiftNetwork />;
      case '/spontaneous-meetups': return <SpontaneousMeetups />;
      case '/chrono-quests': return <ChronoQuests />;
      case '/faction-wars': return <FactionWars />;
      case '/digital-souvenir-forging': return <DigitalSouvenirForging />;
      case '/world-grid-unveiling': return <WorldGridUnveiling />;
      case '/achievement-trees': return <AchievementTrees />;
      case '/bounty-board': return <BountyBoard />;
      case '/derive-mode': return <DeriveMode />;
      case '/local-legend-verification': return <LocalLegendVerification />;
      case '/escape-the-city': return <EscapeTheCity />;
      case '/culture-collector': return <CultureCollector />;
      case '/get-me-home': return <GetMeHome />;
      case '/crowd-density': return <CrowdDensityPredictor />;
      case '/chronosync': return <Chronosync />;
      case '/souvenir-shipper': return <IntelligentSouvenirShipper />;
      case '/last-mile': return <LastMileTransitSolver />;
      case '/digital-nomad-hub': return <DigitalNomadHub />;
      case '/currency-exchange': return <PredictiveCurrencyExchange />;
      case '/ticket-aggregator': return <UniversalTicketAggregator />;
      case '/wait-or-go': return <WaitOrGoAdvisor />;
      case '/rental-synthesizer': return <RentalSynthesizer />;
      case '/safety-swarm': return <SafetySwarm />;
      case '/automated-check-in': return <AutomatedCheckIn />;
      case '/scam-radar': return <ScamAlertRadar />;
      case '/virtual-embassy': return <VirtualEmbassy />;
      case '/trusted-routes': return <TrustedRouteCorridors />;
      case '/follow-me': return <FollowMeEscort />;
      case '/allergen-alert': return <AllergenAlertSystem />;
      case '/privacy-scrubber': return <PrivacyScrubber />;
      case '/aura-shield': return <AuraShield />;
      case '/emergency-dialogue': return <EmergencyServicesDialogue />;
      case '/carbon-synthesis': return <CarbonFootprintSynthesis />;
      case '/eco-warrior-quests': return <EcoWarriorQuests />;
      case '/sustainable-partners': return <SustainablePartnerSpotlight />;
      case '/positive-trace': return <LeavePositiveTrace />;
      case '/reforestation-rewards': return <ReforestationRewards />;
      case '/water-refill': return <WaterRefillStationFinder />;
      case '/local-produce-challenge': return <LocalProduceChallenge />;
      case '/green-transit-score': return <GreenTransitScore />;
      case '/conservation-circle': return <ConservationCircle />;
      case '/wildlife-sighting': return <WildlifeSightingEthos />;
      case '/collaborative-journal': return <CollaborativeJournal />;
      case '/then-and-now': return <ThenAndNowPhotoMixer />;
      case '/ai-blogger': return <AITravelBlogger />;
      case '/radio-host': return <AetheriaRadioHost />;
      case '/vibe-filters': return <VibeBasedPhotoFilters />;
      case '/interactive-maps': return <InteractiveTravelMaps />;
      case '/comic-creator': return <TravelComicStripCreator />;
      case '/3d-sculptures': return <ThreeDPhotoSculptures />;
      case '/story-scout': return <AIStoryScout />;
      case '/sensory-journal': return <SensoryJournal />;
      case '/live-like-a-local': return <LiveLikeALocalSimulation />;
      case '/cultural-etiquette': return <CulturalEtiquetteGuide />;
      case '/myth-folklore': return <MythFolkloreHotspots />;
      case '/street-art-sagas': return <StreetArtSagas />;
      case '/local-music': return <LocalMusicScene />;
      case '/lost-in-translation': return <LostInTranslationGame />;
      case '/festival-forecaster': return <FestivalForecaster />;
      case '/artisan-finder': return <ArtisanCraftFinder />;
      case '/historical-bot': return <HistoricalDialogueBot />;
      case '/silent-observer': return <SilentObserverMode />;
      case '/ancestry-trail': return <AncestryTrail />;
      case '/drone-service': return <DroneRental />;
      case '/translation-earbuds': return <TranslationEarbuds />;
      case '/memory-palace': return <MemoryPalace />;
      case '/aetheria-dao': return <AetheriaDAO />;
      case '/sentient-companion': return <SentientAICompanion />;
      case '/haptic-controller': return <HapticController />;
      case '/weather-adaptive': return <WeatherAdaptiveController />;
      case '/bio-data': return <BioDataMonitor />;
      case '/quantum-souvenirs': return <QuantumSouvenir souvenirId="qs-paris-01" baseImageUrl="/placeholder-souvenir.webp" location="Paris, France" />;
      case '/personalized-meditation': return <PersonalizedMeditation />;
      case '/travel-anthem': return <TravelAnthem />;
      case '/local-news': return <LocalNewsFeed />;
      case '/build-tour': return <CustomTourBuilder />;
      case '/ancestor-connect': return <AncestorConnect />;
      case '/budget-tracker': return <TravelBudgetTracker />;
      case '/spirit-animal': return <SpiritAnimal />;
      case '/dnd-signs': return <DoNotDisturbSigns />;
      case '/travel-alerts': return <CustomTravelAlerts />;
      case '/eat-pray-love': return <EatPrayLoveJourney />;
      case '/safety-score': return <NeighborhoodSafetyScore />;
      case '/emergency-contact': return <EmergencyContactAccess />;
      case '/fake-call': return <FakePhoneCall />;
      case '/share-location': return <LiveLocationShare />;
      case '/local-emergency': return <LocalEmergencyServices />;
      case '/allergy-card': return <AllergyCardTranslator />;
      case '/find-doctor': return <FindADoctor />;
      case '/scam-database': return <ScamAlertDatabase />;
      case '/solo-check-in': return <SoloTravelerCheckIn />;
      case '/water-quality': return <WaterQualityAlerts />;
      case '/air-quality': return <AirQualityAlerts />;
      case '/political-unrest': return <PoliticalUnrestAlerts />;
      case '/disaster-warnings': return <NaturalDisasterWarnings />;
      case '/digital-embassy-network': return <DigitalEmbassyNetwork />;
      case '/lost-and-found': return <LostAndFoundNetwork />;
      case '/safe-routes': return <SafeNightRoutes />;
      case '/insurance-comparison': return <TravelInsuranceComparison />;
      case '/first-aid': return <FirstAidGuide />;
      case '/medication-reminder': return <MedicationReminder />;
      case '/trusted-traveler': return <TrustedTravelerNetwork />;
      case '/carbon-tracker': return <CarbonFootprintTracker />;
      case '/eco-challenges': return <EcoTravelChallenges />;
      case '/sustainable-directory': return <SustainableBusinessDirectory />;
      case '/carbon-offset': return <CarbonOffsetter />;
      case '/leave-no-trace': return <LeaveNoTraceGuide />;
      case '/produce-finder': return <LocalProduceFinder />;
      case '/volunteer-opportunities': return <VolunteerOpportunities />;
      case '/refill-finder': return <RouteRefillFinder />;
      case '/transport-co2': return <TransportCO2Comparison />;
      case '/shop-local': return <ShopLocalChallenges />;
      case '/eco-leaderboard': return <EcoWarriorLeaderboard />;
      case '/animal-friendly': return <AnimalFriendlyTourism />;
      case '/recycling-guide': return <RecyclingGuide />;
      case '/artisan-marketplace': return <LocalArtisansMarketplace />;
      case '/forage-map': return <ForageableFoodMap />;
      case '/green-ratings': return <GreenAccommodationRatings />;
      case '/sustainable-souvenirs': return <SustainableSouvenirGuide />;
      case '/second-hand-map': return <SecondHandStoreMap />;
      case '/plant-tree': return <PlantATree />;
      case '/community-tourism': return <CommunityTourismDirectory />;
      case '/live-like-local': return <LiveLikeLocalDay />;
      case '/home-cooked-meal': return <HomeCookedMeal />;
      case '/skill-swap': return <LocalSkillSwap />;
      case '/secret-spots': return <SecretLocalSpots />;
      case '/local-dialect': return <LocalDialectTutor />;
      case '/local-wedding': return <LocalWeddingCrusher />;
      case '/interview-local': return <LocalInterview />;
      case '/local-etiquette': return <LocalEtiquetteQuiz />;
      case '/day-in-life-ar': return <DayInTheLifeAR />;
      case '/support-cause': return <LocalCauseSupport />;
      case '/local-band': return <FindLocalBand />;
      case '/local-craft': return <LearnLocalCraft />;
      case '/local-superstitions': return <LocalSuperstitions />;
      case '/coffee-local': return <CoffeeWithLocal />;
      case '/local-sports': return <LocalSportsFinder />;
      case '/local-author': return <LocalAuthorReader />;
      case '/local-film': return <LocalFilmWatcher />;
      case '/street-food-safety': return <StreetFoodSafety />;
      case '/art-scene': return <UndergroundArtScene />;
      case '/local-humor': return <LocalHumorExplained />;
      case '/vlog-generator': return <AIVlogGenerator />;
      case '/movie-trailer': return <TripMovieTrailer />;
      case '/digital-time-capsule': return <DigitalTimeCapsuleFeature />;
      case '/collaborative-scrapbook': return <CollaborativeScrapbook />;
      case '/sensory-diary-v2': return <SensoryDiaryFeature />;
      case '/print-story': return <PrintTravelStory />;
      case '/3d-souvenirs': return <ThreePrintedSouvenirs />;
      case '/travel-poem': return <TravelPoemGenerator />;
      case '/map-memories': return <MemoryMapper />;
      case '/share-trip': return <TripShareOnline />;
      case '/then-now-blender': return <ThenAndNowBlenderFeature />;
      case '/comic-creator-v2': return <TravelComicCreatorFeature />;
      case '/travel-soundtrack': return <TravelSoundtrackGen />;
      case '/gif-maker': return <AnimatedGifMaker />;
      case '/audio-notes': return <GeotaggedAudioNotes />;
      case '/travel-legacy': return <TravelLegacyBuilder />;
      case '/emotional-tone': return <EmotionalToneTracker />;
      case '/trip-scent': return <TripScentVisualizer />;
      case '/travel-tattoo': return <TravelTattooDesign />;
      case '/travel-horoscope': return <TravelHoroscope />;
      case '/quantum-souvenir-v2': return <QuantumSouvenirFeature />;
      case '/chrono-quest-v2': return <ChronoQuestGame />;
      case '/aura-reading': return <HistoricalAuraReading />;
      case '/interdimensional': return <InterdimensionalPortal />;
      case '/sentient-companion-v2': return <SentientCompanionFeature />;
      case '/memory-marketplace': return <MemoryMarketplaceFeature />;
      case '/holographic-journal': return <HolographicJournal />;
      case '/telepathic-comm': return <TelepathicCommunication />;
      case '/augmented-taste': return <AugmentedTasteAR />;
      case '/dream-weaving-v2': return <DreamWeavingFeature />;
      case '/smart-luggage': return <SmartLuggageIntegration />;
      case '/visa-passport': return <VisaPassportReminders />;
      case '/flight-delay': return <FlightDelayPredictor />;
      case '/seat-recommender': return <SeatRecommender />;
      case '/public-transport': return <PublicTransportPass />;
      case '/bike-rental': return <BikeScooterRental />;
      case '/traveler-carpool': return <TravelerCarpooling />;
      case '/ferry-booking': return <FerryBoatBooking />;
      case '/scenic-route': return <ScenicRoutePlanner />;
      case '/layover-adventure': return <LayoverAdventureGen />;
      case '/lost-luggage': return <LostLuggageAssistant />;
      case '/currency-tracker': return <CurrencyExchangeTracker />;
      case '/atm-finder': return <ATMBankFinder />;
      case '/esim-providers': return <EsimProviderInfo />;
      case '/wifi-hotspot': return <WifiHotspotMap />;
      case '/power-outlet': return <PowerOutletInfo />;
      case '/driving-laws': return <DrivingLawsTips />;
      case '/tipping-guide': return <TippingGuide />;
      case '/packing-cubes': return <PackingCubesOrganizer />;
      case '/doc-scanner': return <TravelDocScanner />;
      case '/find-gym': return <FindAGym />;
      case '/running-trails': return <RunningHikingTrails />;
      case '/traveler-meditation': return <TravelerMeditation />;
      case '/healthy-eating': return <HealthyEatingGuide />;
      case '/travel-sleep': return <TravelSleepTracker />;
      case '/digital-detox-challenges': return <DigitalDetoxChallenges />;
      case '/mental-health': return <MentalHealthSupport />;
      case '/spa-wellness': return <SpaWellnessBooking />;
      case '/sunscreen': return <SunscreenReminder />;
      case '/hydration': return <HydrationReminder />;
      case '/travel-workouts': return <TravelFriendlyWorkouts />;
      case '/quiet-place': return <FindQuietPlace />;
      case '/nature-sounds': return <NatureSoundsDestination />;
      case '/stress-monitor': return <StressLevelMonitor />;
      case '/mindful-walking': return <MindfulWalking />;
      case '/nomad-insurance': return <DigitalNomadHealthInc />;
      case '/emergency-phrases': return <EmergencyPhrases />;
      case '/vaccination': return <VaccinationRequirements />;
      case '/diarrhea-prevention': return <DiarrheaPrevention />;
      case '/find-therapist': return <FindTherapist />;
      case '/rooftop-bar': return <FindRooftopBar />;
      case '/live-music': return <LiveMusicFinder />;
      case '/clubbing-guide': return <ClubbingGuide />;
      case '/comedy-club': return <ComedyClubNights />;
      case '/theater-booking': return <TheaterBooking />;
      case '/cinema-language': return <CinemaLanguage />;
      case '/karaoke-finder': return <KaraokeBarFinder />;
      case '/speakeasy-guide': return <SpeakeasyGuide />;
      case '/night-market': return <NightMarketExplorer />;
      case '/stargazing-spots': return <StargazingSpots />;
      case '/force-field-ar': return <PersonalForceFieldAR />;
      case '/bio-fashion': return <BioluminescentFashion />;
      case '/alien-archeology': return <AlienArcheologyGame />;
      case '/robot-butler': return <RobotButlerAssistant />;
      case '/invisibility-cloak': return <InvisibilityCloakAR />;
      case '/cybernetic-eye': return <CyberneticEyeAR />;
      case '/psychic-recommendations': return <PsychicRecommendations />;
      case '/anti-gravity-boots': return <AntiGravityBootsAR />;
      case '/animal-translator': return <AnimalTranslator />;
      case '/time-dilation-ar': return <TimeDilationFieldAR />;
      case '/mystery-meal': return <MysteryMealExperience />;
      case '/chefs-table': return <ChefsTableBooking />;
      case '/cocktail-companion': return <CocktailCompanion />;
      case '/wine-tasting': return <WineTastingAssistant />;
      case '/street-food-tour': return <StreetFoodTourGen />;
      case '/cooking-class': return <CookingClassFinder />;
      case '/farm-to-table': return <FarmToTableExperience />;
      case '/food-photo-contest': return <FoodPhotoContest />;
      case '/insect-challenge': return <EdibleInsectChallenge />;
      case '/coffee-connoisseur': return <CoffeeConnoisseurGuide />;
      case '/tea-ceremony': return <TeaCeremonyFinder />;
      case '/brewery-tour': return <BreweryDistilleryTour />;
      case '/market-treasure-hunt': return <LocalMarketTreasureHunt />;
      case '/vegan-finder': return <VeganRestaurantFinder />;
      case '/gluten-free': return <GlutenFreeGuide />;
      case '/food-history': return <FoodHistoryGuide />;
      case '/recipe-collector': return <RecipeCollector />;
      case '/eat-with-local-v2': return <EatWithLocalFeature />;
      case '/food-blogger': return <FoodBloggerMode />;
      case '/calorie-tracker': return <CalorieNutritionTracker />;
      case '/local-designer': return <LocalDesignerSpotlight />;
      case '/vintage-store': return <VintageStoreGuide />;
      case '/custom-clothes': return <CustomMadeClothing />;
      case '/bargain-hunter': return <BargainHunterMode />;
      case '/souvenir-shipping-v2': return <SouvenirShippingSvc />;
      case '/personal-shopper': return <PersonalShopperAssistant />;
      case '/fashionista-challenge': return <FashionistaPhotoChallenge />;
      case '/try-on-ar': return <TryOnClothesAR />;
      case '/what-to-wear': return <WhatToWearPredictor />;
      case '/ethical-brands': return <EthicalBrandGuide />;
      case '/flea-market': return <LocalFleaMarketGuide />;
      case '/antique-store': return <AntiqueStoreFinder />;
      case '/artisan-craft-v2': return <ArtisanCraftMarketplace2 />;
      case '/bookstore-finder': return <BookstoreFinder />;
      case '/tax-free': return <TaxFreeShoppingGuide />;
      case '/size-conversion': return <SizeConversionChart />;
      case '/color-analysis': return <ColorAnalysisTool />;
      case '/fashion-history': return <FashionHistoryAR />;
      case '/local-beauty': return <LocalBeautyProducts />;
      case '/whats-in-my-bag': return <WhatsInMyBagOrganizer />;
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
        {!isLandingPage && <Navbar user={user} />}
        
        <div className={cn(!isLandingPage && "lg:pl-[280px]", "transition-all duration-300")}>
          <main>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPath + (user?.uid || 'guest')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {(() => {
                  const PRO_ROUTES = [
                    '/ai-itinerary', '/serendipity-engine', '/cognitive-load-balancer', '/scenario-planner',
                    '/mood-synthesis', '/ar-wayfinding', '/landmark-lens', '/vision-hub', '/ar-menu',
                    '/paint-the-town', '/memory-palace', '/sky-gazer', '/ar-time-lapse'
                  ];
                  
                  const content = renderContent();
                  
                  if (PRO_ROUTES.includes(currentPath)) {
                    return <PremiumGate featureName="This Advanced Feature">{content}</PremiumGate>;
                  }
                  
                  return content;
                })()}
              </motion.div>
            </AnimatePresence>
          </main>

          <RuthAssistant user={user} profile={profile} />

          {/* Footer */}
          <footer className="border-t border-white/5 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                  <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary rounded-sm" />
                  </div>
                  <span className="font-display font-bold tracking-tighter">AETHERIA</span>
                </div>
                <div className="flex gap-8 text-sm text-foreground/40">
                  <button onClick={() => navigate('/privacy-policy')} className="hover:text-primary transition-colors">Privacy Policy</button>
                  <button onClick={() => navigate('/terms-of-service')} className="hover:text-primary transition-colors">Terms of Service</button>
                  <button onClick={() => navigate('/contact')} className="hover:text-primary transition-colors">Contact</button>
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
