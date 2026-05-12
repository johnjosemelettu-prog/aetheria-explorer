
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as AI from '@/services/gemini';
import { Itinerary, UserProfile } from '../types';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useTranslation } from "react-i18next";

interface GenZFeaturesProps {
  itinerary: Itinerary;
}

const GenZFeatures: React.FC<GenZFeaturesProps> = ({ itinerary }) => {
    const { t } = useTranslation();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [socialMedia, setSocialMedia] = useState<any>(null);
  const [gamified, setGamified] = useState<any>(null);
  const [arFilters, setArFilters] = useState<any>(null);
  const [ecoFriendly, setEcoFriendly] = useState<any>(null);
  const [spontaneous, setSpontaneous] = useState<any>(null);

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

    AI.generateSocialMediaContent(itinerary).then(setSocialMedia);
    AI.gamifyExploration(destination).then(setGamified);
    AI.createARFilters(destination).then(setArFilters);
    AI.suggestEcoFriendlyOptions(itinerary).then(setEcoFriendly);
    AI.planSpontaneousTrip(userProfile).then(setSpontaneous);

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
        : <p className="text-gray-500">{t('auto.auto_loading____193')}</p>
      }
    </motion.div>
  );

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">{t('auto.auto_gen_z_features_194')}</h1>
       {itinerary ?
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderCard("AI-Powered Social Media Content Generation", socialMedia)}
          {renderCard("Gamified Exploration & Scavenger Hunts", gamified)}
          {renderCard("AR Filters & Photo-Ops", arFilters)}
          {renderCard("Sustainable & Eco-Friendly Travel Options", ecoFriendly)}
          {renderCard("Personalized & Spontaneous Trip Planning", spontaneous)}
        </div>
        : <p className='text-center text-gray-500'>{t('auto.auto_create_an_itinerary__191')}</p>}
    </div>
  );
};

export default GenZFeatures;
