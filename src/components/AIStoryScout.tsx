
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { BookOpen, Search, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AIStoryScout = () => {
  const { t } = useTranslation();
  const [itineraryId, setItineraryId] = useState<string>('');
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFindStory = async () => {
    if (!itineraryId.trim()) return;
    setLoading(true);
    try {
      const result = await AI.findStoryInTrip(itineraryId);
      setStory(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-purple-50 min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-purple-800">{t('AIStoryScout.title')}</h1>
        <p className="text-center text-purple-700 mb-8">{t('AIStoryScout.description')}</p>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="mb-6">
              <label htmlFor="itinerary-id" className="block text-lg font-medium mb-2">{t('AIStoryScout.itineraryIdLabel')}</label>
              <input 
                type="text" 
                id="itinerary-id" 
                className="w-full max-w-sm mx-auto p-3 border rounded-lg"
                placeholder={t('AIStoryScout.itineraryIdPlaceholder')} 
                value={itineraryId}
                onChange={(e) => setItineraryId(e.target.value)}
                />
          </div>

          <Button onClick={handleFindStory} disabled={!itineraryId || loading} size="lg">
            <Search className="mr-2 h-5 w-5"/>
            {loading ? t('AIStoryScout.searching') : t('AIStoryScout.search')}
          </Button>

          {story && (
            <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="mt-8 text-left">
              <h2 className="text-2xl font-bold mb-4 flex items-center"><Sparkles className="text-yellow-500 mr-2"/> {t('AIStoryScout.storyFoundTitle')}</h2>
              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">{story.title}</h3>
                <p className="italic text-gray-600 mb-4">{story.tagline}</p>
                
                <h4 className="font-bold mb-2">{t('AIStoryScout.narrativeStructure')}</h4>
                <ul className="space-y-3">
                    {story.structure.map((part: any, index: number) => (
                        <li key={index} className="border-l-2 border-purple-300 pl-4 py-1">
                            <p className="font-semibold">{part.act}: {part.title}</p>
                            <p className="text-sm text-gray-700">{part.description}</p>
                        </li>
                    ))}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AIStoryScout;
