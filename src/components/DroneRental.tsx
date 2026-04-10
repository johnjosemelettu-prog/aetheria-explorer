
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';
import { MapPin, Clock, DollarSign, BatteryCharging, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Slider } from './ui/slider';

const DroneRental = () => {
  const { t } = useTranslation();
  const [duration, setDuration] = useState(15);
  const [rental, setRental] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRentDrone = async () => {
    setLoading(true);
    setRental(null);
    try {
      const result = await AI.rentDrone('Fushimi Inari Shrine', duration);
      setRental(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-slate-800 text-white min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
        <div className="text-center">
            <Video className="mx-auto text-red-500 mb-4" size={48}/>
            <h1 className="text-4xl font-bold mb-4">{t('droneRental.title')}</h1>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">{t('droneRental.description')}</p>
        </div>

        <div className="bg-slate-900 rounded-xl shadow-2xl p-8">
            {!rental ? (
                <>
                    <div className="mb-6">
                        <label className="font-bold text-lg mb-2 block">{t('droneRental.setDuration')}</label>
                        <div className="flex items-center gap-4">
                            <Slider
                                value={[duration]}
                                onValueChange={(value) => setDuration(value[0])}
                                max={60}
                                step={5}
                                className="w-full"
                            />
                            <span className="font-bold text-red-400 w-24 text-center">{duration} {t('droneRental.minutes')}</span>
                        </div>
                    </div>
                    <Button onClick={handleRentDrone} disabled={loading} size="lg" className="w-full bg-red-600 hover:bg-red-700">
                        {loading ? t('droneRental.searching') : t('droneRental.rentButton')}
                    </Button>
                </>
            ) : (
                <motion.div initial={{ opacity: 0}} animate={{ opacity: 1}}>
                    <h2 className="text-2xl font-bold text-center text-green-400 mb-4">{t('droneRental.successTitle')}</h2>
                    <p className="text-center text-slate-300 mb-6">{rental.message}</p>
                    <div className="bg-slate-800 rounded-lg p-4 space-y-3 text-sm">
                        <div className="flex justify-between"><span>{t('droneRental.status')}</span><span className="font-mono text-green-400">{rental.status}</span></div>
                        <div className="flex justify-between"><span>{t('droneRental.droneId')}</span><span className="font-mono">{rental.droneId}</span></div>
                        <div className="flex justify-between"><span>{t('droneRental.model')}</span><span className="font-mono">{rental.model}</span></div>
                        <div className="flex justify-between"><span>{t('droneRental.rentalPeriod')}</span><span className="font-mono">{rental.rentalPeriod} {t('droneRental.minutes')}</span></div>
                        <div className="flex justify-between border-t border-slate-700 pt-3 mt-3">
                            <span className="font-bold">{t('droneRental.estimatedCost')}</span>
                            <span className="font-bold text-red-400 font-mono">${rental.estimatedCost.toFixed(2)}</span>
                        </div>
                    </div>
                     <div className="mt-6">
                        <h3 className="font-bold text-lg mb-2">{t('droneRental.flightPreview')}</h3>
                        <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                            {/* In a real app, this would be a video player component */}
                            <video src={rental.flightPathPreviewUrl} controls autoPlay muted className="w-full rounded-lg" />
                        </div>
                    </div>
                    <Button onClick={() => setRental(null)} variant="outline" className="w-full mt-8">
                        {t('droneRental.newRental')}
                    </Button>
                </motion.div>
            )}
        </div>
      </motion.div>
    </div>
  );
};

export default DroneRental;
