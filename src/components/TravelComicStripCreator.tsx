
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { Film, Upload, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TravelComicStripCreator = () => {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState<string[]>([]);
  const [comicStrip, setComicStrip] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newPhotos = files.map(file => URL.createObjectURL(file));
      setPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const handleCreateComic = async () => {
    if (photos.length === 0) return;
    setLoading(true);
    try {
      const result = await AI.createComicStrip(photos);
      setComicStrip(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-yellow-50 min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-yellow-800">{t('travelComicStripCreator.title')}</h1>
        <p className="text-center text-yellow-700 mb-8">{t('travelComicStripCreator.description')}</p>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('travelComicStripCreator.uploadTitle')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {photos.map((photo, index) => (
              <img key={index} src={photo} alt={`Upload ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
            ))}
            <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <label htmlFor="photo-upload" className="cursor-pointer text-gray-400 hover:text-yellow-600">
                <Upload size={32} />
                <input type="file" id="photo-upload" multiple accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
            </div>
          </div>
          <Button onClick={handleCreateComic} disabled={photos.length === 0 || loading} size="lg">
            <Sparkles className="mr-2 h-5 w-5" />
            {loading ? t('travelComicStripCreator.creating') : t('travelComicStripCreator.create')}
          </Button>
        </div>

        {comicStrip && (
          <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="mt-8">
            <h2 className="text-3xl font-bold mb-6 text-center">{t('travelComicStripCreator.resultTitle')}</h2>
            <div className="bg-white rounded-xl shadow-2xl p-4">
                {comicStrip.panels.map((panel: any, index: number) => (
                    <div key={index} className="mb-4">
                        <img src={panel.image} alt={`Comic panel ${index + 1}`} className="rounded-lg w-full" />
                        <div className="p-4">
                            {panel.speechBubble && <p className="italic bg-gray-100 p-3 rounded-lg my-2">"{panel.speechBubble}"</p>}
                            <p className="text-sm text-gray-600">{panel.caption}</p>
                        </div>
                    </div>
                ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TravelComicStripCreator;
