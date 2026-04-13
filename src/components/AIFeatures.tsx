
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as AI from '@/services/gemini';

const AIFeatureShowcase = () => {
  const [itinerary, setItinerary] = useState<any>(null);
  const [serendipity, setSerendipity] = useState<any>(null);
  const [cognitiveLoad, setCognitiveLoad] = useState<any>(null);
  const [whatIf, setWhatIf] = useState<any>(null);
  const [mood, setMood] = useState("stressed");
  const [emotionalAnalysis, setEmotionalAnalysis] = useState<any>(null);
  const [mentorAdvice, setMentorAdvice] = useState<any>(null);
  const [foodPassport, setFoodPassport] = useState<any>(null);
  const [abTest, setAbTest] = useState<any>(null);
  const [challenges, setChallenges] = useState<any>(null);
  const [dreamConcept, setDreamConcept] = useState<any>(null);
  const [habitItinerary, setHabitItinerary] = useState<any>(null);
  const [arTimeLapse, setArTimeLapse] = useState<any>(null);
  const [vrScout, setVrScout] = useState<any>(null);
  const [arMenu, setArMenu] = useState<any>(null);
  const [arGallery, setArGallery] = useState<any>(null);
  const [arTransit, setArTransit] = useState<any>(null);
  const [arSkyGazer, setArSkyGazer] = useState<any>(null);
  const [arStory, setArStory] = useState<any>(null);
  const [arPaint, setArPaint] = useState<any>(null);
  const [arArchitecture, setArArchitecture] = useState<any>(null);
  const [arLanguage, setArLanguage] = useState<any>(null);
  const [localHero, setLocalHero] = useState<any>(null);
  const [odysseyRelay, setOdysseyRelay] = useState<any>(null);
  const [skillExchange, setSkillExchange] = useState<any>(null);
  const [groupVibe, setGroupVibe] = useState<any>(null);
  const [heatmap, setHeatmap] = useState<any>(null);
  const [sharedExpenses, setSharedExpenses] = useState<any>(null);
  const [ambassadorStatus, setAmbassadorStatus] = useState<any>(null);
  const [guilds, setGuilds] = useState<any>(null);
  const [globalGift, setGlobalGift] = useState<any>(null);
  const [meetups, setMeetups] = useState<any>(null);
  const [chronoQuest, setChronoQuest] = useState<any>(null);
  const [factionWar, setFactionWar] = useState<any>(null);
  const [forgedSouvenir, setForgedSouvenir] = useState<any>(null);
  const [worldGrid, setWorldGrid] = useState<any>(null);
  const [achievementTree, setAchievementTree] = useState<any>(null);
  const [bountyBoard, setBountyBoard] = useState<any>(null);
  const [derive, setDerive] = useState<any>(null);
  const [legendVerification, setLegendVerification] = useState<any>(null);
  const [escapeTheCity, setEscapeTheCity] = useState<any>(null);
  const [cultureCollector, setCultureCollector] = useState<any>(null);
  const [getMeHome, setGetMeHome] = useState<any>(null);
  const [crowdDensity, setCrowdDensity] = useState<any>(null);
  const [chronosync, setChronosync] = useState<any>(null);
  const [souvenirShipper, setSouvenirShipper] = useState<any>(null);
  const [lastMile, setLastMile] = useState<any>(null);

  useEffect(() => {
    // Mock data for the showcase
    const mockItinerary = {
      title: "3 Day Trip to Paris",
      itinerary: [
        { day: 1, theme: "Arrival & Landmarks", activities: [ { title: "Check-in" }, { title: "Eiffel Tower" }, { title: "Louvre Museum" }, { title: "Seine River Cruise" } ] }
      ]
    };
    setItinerary(mockItinerary);
    
    AI.injectSerendipity(mockItinerary).then(setSerendipity);
    AI.balanceCognitiveLoad(mockItinerary).then(setCognitiveLoad);
    AI.planWhatIfScenario(mockItinerary, "add 2 more days").then(setWhatIf);
    AI.analyzeEmotionalSpectrum(mood).then(setEmotionalAnalysis);
    AI.getTravelMentorAdvice(["introvert", "foodie"]).then(setMentorAdvice);
    AI.generateFoodPassport(["sushi", "pizza"]).then(setFoodPassport);
    AI.proposeItineraryAlternatives(mockItinerary).then(setAbTest);
    AI.generateTravelChallenges(["adventurous"]).then(setChallenges);
    AI.generateTravelConcept("I want to feel adventurous").then(setDreamConcept);
    AI.integrateHabits(mockItinerary, ["morning coffee", "afternoon run"]).then(setHabitItinerary);
    AI.getARTimelapse("Colosseum").then(setArTimeLapse);
    AI.getVRScout("Ritz Paris").then(setVrScout);
    AI.getARMenu("menu.jpg").then(setArMenu);
    AI.getARArtGallery({lat: 48.8584, lng: 2.2945}).then(setArGallery);
    AI.getARTransit("Châtelet - Les Halles").then(setArTransit);
    AI.getARSkyGazer().then(setArSkyGazer);
    AI.getARStory("Florence").then(setArStory);
    AI.paintTheTown({lat: 48.8584, lng: 2.2945}, "graffiti.png").then(setArPaint);
    AI.deconstructArchitecture("notre-dame.jpg").then(setArArchitecture);
    AI.getARLanguageHelper("apple.jpg").then(setArLanguage);
    AI.connectWithLocalHero("Rome").then(setLocalHero);
    AI.leaveOdysseyRelayMessage({lat: 41.9028, lng: 12.4964}, "Don't miss the gelato here!").then(setOdysseyRelay);
    AI.findSkillExchange("Barcelona").then(setSkillExchange);
    AI.calibrateGroupVibe(["foodie", "history buff", "adventurer"]).then(setGroupVibe);
    AI.getTravelerHeatmap("Kyoto").then(setHeatmap);
    const mockExpenses = [
        { paidBy: 'Alice', amount: 50, splitAmong: ['Alice', 'Bob', 'Charlie'] },
        { paidBy: 'Bob', amount: 20, splitAmong: ['Bob', 'Charlie'] }
    ];
    AI.synthesizeSharedExpenses(mockExpenses).then(setSharedExpenses);
    AI.getAmbassadorProgramStatus("user123").then(setAmbassadorStatus);
    AI.getTravelersGuilds("food").then(setGuilds);
    AI.sendGlobalGift("user456", {name: "Espresso", type: "coffee"}).then(setGlobalGift);
    AI.findSpontaneousMeetups({lat: 40.7128, lng: -74.0060}, ["tech", "art"]).then(setMeetups);
    AI.generateChronoQuest("Paris").then(setChronoQuest);
    AI.getFactionWarStatus().then(setFactionWar);
    const mockSouvenirItems = [ { id: "leaf_123" }, { id: "sound_456" } ];
    AI.forgeDigitalSouvenir(mockSouvenirItems).then(setForgedSouvenir);
    AI.unveilWorldGrid({lat: 35.6895, lng: 139.6917}).then(setWorldGrid);
    AI.getAchievementTree("user123").then(setAchievementTree);
    AI.getBountyBoard("Florence").then(setBountyBoard);
    AI.getDeriveModeInstructions("Paris").then(setDerive);
    AI.verifyLocalLegend("legend_ghost_opera", "photo.jpg").then(setLegendVerification);
    AI.startEscapeTheCity("Venice").then(setEscapeTheCity);
    AI.getCultureCollectorMissions("Tokyo").then(setCultureCollector);
    AI.getMeHome({lat: 48.8584, lng: 2.2945}, {lat: 48.86, lng: 2.35}).then(setGetMeHome);
    AI.getCrowdDensity("Louvre Museum").then(setCrowdDensity);
    AI.getChronosyncPlan("Asia/Tokyo").then(setChronosync);
    AI.shipSouvenirs([{name: "Vase", weight: 1.2}, {name: "Scarf", weight: 0.3}], "123 Main St, Anytown, USA").then(setSouvenirShipper);
    AI.getLastMileSolution({lat: 48.8584, lng: 2.2945}, {lat: 48.86, lng: 2.35}).then(setLastMile);

  }, []);

  const renderCard = (title: string, data: any) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="bg-gray-800 p-6 rounded-lg"
    >
      <h3 className="font-bold text-lg mb-2 text-primary">{title}</h3>
      <pre className="text-xs text-gray-400 whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
    </motion.div>
  );

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">AI Feature Showcase</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {renderCard("Serendipity Engine", serendipity)}
        {renderCard("Cognitive Load Balancer", cognitiveLoad)}
        {renderCard("\'What If\' Scenario Planner", whatIf)}
        {renderCard("Emotional Spectrum Analysis", emotionalAnalysis)}
        {renderCard("AI Travel Mentor", mentorAdvice)}
        {renderCard("Flavor Seeker", foodPassport)}
        {renderCard("Dynamic Itinerary A/B Testing", abTest)}
        {renderCard("Personalized Challenge Generator", challenges)}
        {renderCard("Dream Weaver", dreamConcept)}
        {renderCard("Habit Integration", habitItinerary)}
        {renderCard("AR Time-Lapse View", arTimeLapse)}
        {renderCard("VR Pre-Travel Scout", vrScout)}
        {renderCard("AR Menu Visualizer", arMenu)}
        {renderCard("Geocached AR Art Gallery", arGallery)}
        {renderCard("AR Public Transit X-Ray", arTransit)}
        {renderCard("Sky Gazer AR", arSkyGazer)}
        {renderCard("Interactive AR Storytelling", arStory)}
        {renderCard("\"Paint the Town\" AR", arPaint)}
        {renderCard("Architecture Deconstructor", arArchitecture)}
        {renderCard("AR Language Helper", arLanguage)}
        {renderCard("Local Hero Connect", localHero)}
        {renderCard("Odyssey Relay", odysseyRelay)}
        {renderCard("Skill Exchange Hub", skillExchange)}
        {renderCard("Group Vibe Calibration", groupVibe)}
        {renderCard("Echoes of Past Travelers", heatmap)}
        {renderCard("Shared Expense Synthesizer", sharedExpenses)}
        {renderCard("Aetheria Ambassador Program", ambassadorStatus)}
        {renderCard("Traveler's Guilds", guilds)}
        {renderCard("Global Gift Network", globalGift)}
        {renderCard("Spontaneous Meetups", meetups)}
        {renderCard("Chrono-Quests", chronoQuest)}
        {renderCard("Faction Wars", factionWar)}
        {renderCard("Digital Souvenir Forging", forgedSouvenir)}
        {renderCard("World Grid Unveiling", worldGrid)}
        {renderCard("Achievement Trees", achievementTree)}
        {renderCard("Bounty Board", bountyBoard)}
        {renderCard("'Dérive' Mode", derive)}
        {renderCard("Local Legend Verification", legendVerification)}
        {renderCard("Escape the City", escapeTheCity)}
        {renderCard("Culture Collector", cultureCollector)}
        {renderCard("Get Me Home", getMeHome)}
        {renderCard("Crowd Density Predictor", crowdDensity)}
        {renderCard("Chronosync", chronosync)}
        {renderCard("Intelligent Souvenir Shipper", souvenirShipper)}
        {renderCard("Last-Mile Transit Solver", lastMile)}
      </div>
    </div>
  );
};

export default AIFeatureShowcase;
