
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { Camera, Leaf, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WildlifeSightingEthos = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState<string | null>(null);
  const [identificationResult, setIdentificationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleIdentification = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const result = await AI.identifyWildlife(image);
      setIdentificationResult(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-green-50 min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-green-800">{t('wildlifeSightingEthos.title')}</h1>
        <p className="text-center text-green-700 mb-8">{t('wildlifeSightingEthos.description')}</p>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="mb-6">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="wildlife-photo" />
            <label htmlFor="wildlife-photo" className="cursor-pointer">
              <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                {image ? (
                  <img src={image} alt="Wildlife Sighting" className="max-h-full rounded-lg" />
                ) : (
                  <div className="text-gray-400">
                    <Camera size={48} className="mx-auto"/>
                    <p>{t('wildlifeSightingEthos.uploadPrompt')}</p>
                  </div>
                )}
              </div>
            </label>
          </div>

          <Button onClick={handleIdentification} disabled={!image || loading} size="lg">
            <Leaf className="mr-2 h-5 w-5"/>
            {loading ? t('wildlifeSightingEthos.identifying') : t('wildlifeSightingEthos.identify')}
          </Button>

          {identificationResult && (
            <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="mt-8 text-left">
              <h2 className="text-2xl font-bold mb-4">{t('wildlifeSightingEthos.identificationResult')}</h2>
              <p className="text-xl mb-4"><strong>{identificationResult.name}</strong></p>

              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
                <div className="flex">
                  <div className="py-1"><AlertTriangle className="h-6 w-6 text-yellow-500 mr-4"/></div>
                  <div>
                    <p className="font-bold">{t('wildlifeSightingEthos.ethicalGuidelines.title')}</p>
                    <ul className="list-disc list-inside mt-2">
                      {identificationResult.ethical_guidelines.map((guideline: string, index: number) => (
                        <li key={index}>{guideline}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default WildlifeSightingEthos;
