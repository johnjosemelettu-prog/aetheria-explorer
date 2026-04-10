
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { Camera, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const StreetArtSagas = () => {
  const { t } = useTranslation();
  const [artImage, setArtImage] = useState<string | null>(null);
  const [saga, setSaga] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setArtImage(URL.createObjectURL(file));
      // Reset saga on new image
      setSaga(null); 
    }
  };

  const handleFindSaga = async () => {
    if (!artImage) return;
    setLoading(true);
    try {
      const result = await AI.findStreetArtSaga(artImage);
      setSaga(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-slate-800">{t('streetArtSagas.title')}</h1>
        <p className="text-center text-slate-700 mb-8">{t('streetArtSagas.description')}</p>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="mb-6">
                <label htmlFor="art-upload" className="cursor-pointer block w-full border-2 border-dashed border-gray-300 rounded-lg p-10 hover:bg-gray-50">
                    {artImage ? (
                        <img src={artImage} alt="Street Art" className="mx-auto max-h-60 rounded-lg"/>
                    ) : (
                        <div className="flex flex-col items-center text-gray-400">
                            <Camera size={48} />
                            <span className="mt-2 font-semibold">{t('streetArtSagas.uploadLabel')}</span>
                        </div>
                    )}
                    <input type="file" id="art-upload" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
            </div>

            <Button onClick={handleFindSaga} disabled={!artImage || loading} size="lg">
                <Search className="mr-2 h-5 w-5"/>
                {loading ? t('streetArtSagas.searching') : t('streetArtSagas.findSaga')}
            </Button>

            {saga && (
                <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="mt-8 text-left">
                    <h2 className="text-2xl font-bold mb-4">{t('streetArtSagas.artist')}: {saga.artistName}</h2>
                    <p className="text-gray-600 mb-6">{saga.bio}</p>

                    <h3 className="text-xl font-semibold mb-4">{t('streetArtSagas.otherWorks')}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {saga.otherWorks.map((work: any) => (
                            <div key={work.id} className="rounded-lg overflow-hidden shadow-md">
                                <img src={work.imageUrl} alt={work.title} className="w-full h-32 object-cover" />
                                <div className="p-2 bg-white">
                                    <p className="font-semibold text-sm">{work.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
      </motion.div>
    </div>
  );
};

export default StreetArtSagas;
