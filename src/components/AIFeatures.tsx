import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as AI from '@/services/gemini';
import { Itinerary, UserProfile } from '../types';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AIFeatureShowcaseProps {
  itinerary: Itinerary;
}

const AIFeatureShowcase: React.FC<AIFeatureShowcaseProps> = ({ itinerary }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [serendipity, setSerendipity] = useState<any>(null);
  const [cognitiveLoad, setCognitiveLoad] = useState<any>(null);
  const [whatIf, setWhatIf] = useState<any>(null);
  const [emotionalAnalysis, setEmotionalAnalysis] = useState<any>(null);
  const [mentorAdvice, setMentorAdvice] = useState<any>(null);
  const [foodPassport, setFoodPassport] = useState<any>(null);
  const [abTest, setAbTest] = useState<any>(null);
  const [challenges, setChallenges] = useState<any>(null);
  const [dreamConcept, setDreamConcept] = useState<any>(null);
  const [habitItinerary, setHabitItinerary] = useState<any>(null);
  const [arTimeLapse, setArTimeLapse] = useState<any>(null);
  const [vrScout, setVrScout] = useState<any>(null);
  const [arTransit, setArTransit] = useState<any>(null);
  const [arSkyGazer, setArSkyGazer] = useState<any>(null);
  const [arStory, setArStory] = useState<any>(null);
  const [localHero, setLocalHero] = useState<any>(null);
  const [groupVibe, setGroupVibe] = useState<any>(null);
  const [ambassadorStatus, setAmbassadorStatus] = useState<any>(null);
  const [guilds, setGuilds] = useState<any>(null);
  const [globalGift, setGlobalGift] = useState<any>(null);
  const [chronoQuest, setChronoQuest] = useState<any>(null);
  const [factionWar, setFactionWar] = useState<any>(null);
  const [achievementTree, setAchievementTree] = useState<any>(null);
  const [bountyBoard, setBountyBoard] = useState<any>(null);
  const [derive, setDerive] = useState<any>(null);
  const [escapeTheCity, setEscapeTheCity] = useState<any>(null);
  const [cultureCollector, setCultureCollector] = useState<any>(null);
  const [chronosync, setChronosync] = useState<any>(null);
  const [souvenirShipper, setSouvenirShipper] = useState<any>(null);

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      getDoc(userRef).then(snap => {
        if (snap.exists()) {
          setUserProfile(snap.data() as UserProfile);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (!itinerary || !user || !userProfile) return;

    const destination = itinerary.destination;
    const vibe = itinerary.vibe || userProfile?.vibe || 'explorer';
    const userTraits = [vibe, userProfile?.preferences?.language || 'en'];

    AI.injectSerendipity(itinerary).then(setSerendipity);
    AI.balanceCognitiveLoad(itinerary).then(setCognitiveLoad);
    AI.planWhatIfScenario(itinerary, "What if I only have one day?").then(setWhatIf);
    AI.analyzeEmotionalSpectrum(vibe).then(setEmotionalAnalysis);
    AI.getTravelMentorAdvice(userTraits).then(setMentorAdvice);
    AI.generateFoodPassport(userProfile.foodPreferences || ["local cuisine"]).then(setFoodPassport);
    AI.proposeItineraryAlternatives(itinerary).then(setAbTest);
    AI.generateTravelChallenges([vibe]).then(setChallenges);
    AI.generateTravelConcept(`A trip to ${destination} with a ${vibe} vibe.`).then(setDreamConcept);
    AI.integrateHabits(itinerary, userProfile?.preferences?.habits || ["morning yoga"]).then(setHabitItinerary);
    AI.getARTimelapse(destination).then(setArTimeLapse);
    AI.getVRScout(destination).then(setVrScout);
    AI.getARTransit(destination).then(setArTransit);
    AI.getARSkyGazer().then(setArSkyGazer);
    AI.getARStory(destination).then(setArStory);
    AI.connectWithLocalHero(destination).then(setLocalHero);
    AI.calibrateGroupVibe(itinerary.invitedUsers ? userTraits : [vibe]).then(setGroupVibe);
    AI.getAmbassadorProgramStatus(user.uid).then(setAmbassadorStatus);
    AI.getTravelersGuilds(vibe).then(setGuilds);
    AI.sendGlobalGift("user456", {name: "Espresso", type: "coffee"}).then(setGlobalGift); // Example gift
    AI.generateChronoQuest(destination).then(setChronoQuest);
    AI.getFactionWarStatus().then(setFactionWar);
    AI.getAchievementTree(user.uid).then(setAchievementTree);
    AI.getBountyBoard(destination).then(setBountyBoard);
    AI.getDeriveModeInstructions(destination).then(setDerive);
    AI.startEscapeTheCity(destination).then(setEscapeTheCity);
    AI.getCultureCollectorMissions(destination).then(setCultureCollector);
    AI.getChronosyncPlan(userProfile?.preferences?.timezone || "UTC").then(setChronosync);
    AI.shipSouvenirs([{name: "Vase", weight: 1.2}], userProfile?.displayName || "user").then(setSouvenirShipper);

  }, [itinerary, user, userProfile]);

  const renderCard = (title: string, data: any) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="bg-gray-800 p-6 rounded-lg"
    >
      <h3 className="font-bold text-lg mb-2 text-primary">{title}</h3>
      {data ? 
        <pre className="text-xs text-gray-400 whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre> 
        : <p className="text-gray-500">Loading...</p>
      }
    </motion.div>
  );

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">AI Feature Showcase</h1>
       {itinerary ?
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
          {renderCard("AR Public Transit X-Ray", arTransit)}
          {renderCard("Sky Gazer AR", arSkyGazer)}
          {renderCard("Interactive AR Storytelling", arStory)}
          {renderCard("Local Hero Connect", localHero)}
          {renderCard("Group Vibe Calibration", groupVibe)}
          {renderCard("Aetheria Ambassador Program", ambassadorStatus)}
          {renderCard("Traveler's Guilds", guilds)}
          {renderCard("Global Gift Network", globalGift)}
          {renderCard("Chrono-Quests", chronoQuest)}
          {renderCard("Faction Wars", factionWar)}
          {renderCard("Achievement Trees", achievementTree)}
          {renderCard("Bounty Board", bountyBoard)}
          {renderCard("'Dérive' Mode", derive)}
          {renderCard("Escape the City", escapeTheCity)}
          {renderCard("Culture Collector", cultureCollector)}
          {renderCard("Chronosync", chronosync)}
          {renderCard("Intelligent Souvenir Shipper", souvenirShipper)}
        </div>
        : <p className='text-center text-gray-500'>Create an Itinerary to see AI Features.</p>}
    </div>
  );
};

export default AIFeatureShowcase;
