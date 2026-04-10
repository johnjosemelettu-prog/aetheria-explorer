
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';
import { Link, Dna } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AncestryTrail = () => {
  const { t } = useTranslation();
  const [ancestryData, setAncestryData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an OAuth flow.
      // We simulate a successful connection and then fetch the data.
      await new Promise(resolve => setTimeout(resolve, 1500));
      setConnected(true);
      const data = await AI.getAncestryTrail('mock_user_dna_id');
      setAncestryData(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
        <div className="text-center">
            <Dna className="mx-auto text-purple-600 mb-4" size={48}/>
            <h1 className="text-4xl font-bold mb-4 text-slate-800">{t('ancestryTrail.title')}</h1>
            <p className="text-slate-700 mb-8 max-w-2xl mx-auto">{t('ancestryTrail.description')}</p>
        </div>

        {!ancestryData && (
            <motion.div 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-12 text-center"
            >
                <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('ancestryTrail.connectTitle')}</h2>
                <p className="text-slate-600 mb-6">{t('ancestryTrail.connectDescription')}</p>
                <Button onClick={handleConnect} disabled={loading} size="lg">
                    <Link className="mr-2 h-5 w-5" />
                    {loading ? t('ancestryTrail.connecting') : t('ancestryTrail.connectButton')}
                </Button>
            </motion.div>
        )}

        {loading && !ancestryData && (
            <div className="text-center mt-8"><p>{t('ancestryTrail.loading')}</p></div>
        )}

        {ancestryData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold text-purple-700 mb-2">{ancestryData.title}</h2>
                <p className="text-slate-600">{ancestryData.summary}</p>
            </div>

            <div className="space-y-8">
              {ancestryData.regions.map((region: any) => (
                <motion.div key={region.name} initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.2}} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-slate-800">{region.name}</h3>
                        <div className="text-lg font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">{region.percentage}%</div>
                    </div>
                  <p className="text-slate-600 mb-6">{region.narrative}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {region.pointsOfInterest.map((poi:any) => (
                          <div key={poi.id} className="border rounded-lg overflow-hidden">
                              <img src={poi.imageUrl} alt={poi.name} className="w-full h-40 object-cover"/>
                              <div className="p-4">
                                  <h4 className="font-bold text-slate-700">{poi.name}</h4>
                                  <p className="text-sm text-slate-500 mt-1">{poi.description}</p>
                              </div>
                          </div>
                      ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AncestryTrail;
