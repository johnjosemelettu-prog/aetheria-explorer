import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Scan, UtensilsCrossed, History, Globe2, ChefHat, Loader2, PlayCircle } from 'lucide-react';
import * as AI from '../services/gemini';
import { useTranslation } from "react-i18next";

const CulinaryTimeMachine = () => {
    const { t } = useTranslation();
  const [scanning, setScanning] = useState(false);
  const [data, setData] = useState<any>(null);

  const scanDish = async () => {
    setScanning(true);
    setData(null);
    try {
      const result = await AI.analyzeCulinaryHistory("image_data.jpg");
      setData(result);
    } catch (err) {
      console.error(err);
    }
    setScanning(false);
  };

  return (
    <div className="min-h-screen bg-orange-950 text-orange-50 p-8 rounded-lg overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-orange-900 rounded-full mb-6 border border-orange-800 shadow-xl">
            <UtensilsCrossed className="w-10 h-10 text-orange-400" />
          </div>
          <h1 className="text-4xl font-extrabold mb-4 text-white">{t('auto.auto_culinary_time_machin_893')}</h1>
          <p className="text-orange-300 text-lg max-w-2xl mx-auto">
            {t('auto.auto_scan_a_traditional_d_892')}
                                </p>
        </div>

        <div className="flex justify-center mb-12">
          <Button 
            onClick={scanDish} 
            disabled={scanning}
            className="py-8 px-10 text-xl font-bold bg-orange-600 hover:bg-orange-500 text-white rounded-full shadow-[0_0_40px_rgba(234,88,12,0.3)]"
          >
            {scanning ? <Loader2 className="w-8 h-8 animate-spin" /> : <><Scan className="w-6 h-6 mr-3" /> {t('auto.auto_scan_active_dish_891')}</>}
          </Button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-orange-900/40 p-6 rounded-2xl border border-orange-800 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black text-white">{data.dishName}</h2>
                  <p className="text-orange-400 font-bold tracking-widest uppercase text-sm mt-1 flex items-center">
                    <History className="w-4 h-4 mr-2" /> {t('auto.auto_origins__890')} {data.era}
                  </p>
                </div>
                <Button variant="outline" className="border-orange-700 bg-orange-950 text-orange-300 hover:bg-orange-900 hover:text-white">
                  <PlayCircle className="w-5 h-5 mr-2" /> {t('auto.auto_play_ar_deconstructi_889')}
                                                  </Button>
              </div>

              <Card className="bg-orange-900/20 border-orange-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center text-orange-300">
                    <Globe2 className="w-5 h-5 mr-2" /> {t('auto.auto_geopolitical_context_888')}
                                                        </h3>
                  <p className="text-orange-200 leading-relaxed">
                    {data.geoPoliticalContext}
                  </p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-2">{t('auto.auto_ancestral_ingredient_887')}</h3>
                  {data.deconstructedIngredients.map((ing: any, idx: number) => (
                    <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                      <Card className="bg-orange-900/30 border-orange-800/50">
                        <CardContent className="p-4">
                          <p className="font-bold text-white text-lg">{ing.name}</p>
                          <p className="text-xs font-bold text-orange-400 uppercase my-1">{t('auto.auto_origin__886')} {ing.origin}</p>
                          <p className="text-orange-200 text-sm mt-2">{ing.historicalUsage}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-2">{t('auto.auto_hidden_vendor_match_885')}</h3>
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
                    <Card className="bg-gradient-to-br from-orange-900 to-red-950 border-orange-700 h-full relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 bg-orange-500/20 rounded-bl-lg">
                        <ChefHat className="w-5 h-5 text-orange-300" />
                      </div>
                      <CardContent className="p-6">
                        <h4 className="text-xl font-bold text-white mb-1">{data.hiddenVendor.name}</h4>
                        <span className="inline-block px-2 py-1 bg-red-950 text-red-300 text-xs font-bold rounded-md mb-4">{data.hiddenVendor.distance} {t('auto.auto_away_884')}</span>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-orange-400 uppercase font-bold">{t('auto.auto_technique_preserved_883')}</p>
                            <p className="text-sm text-orange-100">{data.hiddenVendor.technique}</p>
                          </div>
                          <div>
                            <p className="text-xs text-orange-400 uppercase font-bold">{t('auto.auto_vibe_882')}</p>
                            <p className="text-sm text-orange-100">{data.hiddenVendor.vibe}</p>
                          </div>
                        </div>

                        <Button className="w-full mt-6 bg-white text-orange-900 hover:bg-orange-100 font-bold">
                          {t('auto.auto_navigate_via_silent__881')}
                                                                          </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CulinaryTimeMachine;
