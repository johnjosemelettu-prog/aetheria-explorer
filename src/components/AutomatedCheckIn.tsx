
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useTranslation } from "react-i18next";

const AutomatedCheckIn = () => {
    const { t } = useTranslation();
  const [timer, setTimer] = useState(60); // in minutes
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      // In a real app, this would trigger a notification to emergency contacts
      alert("Check-in missed! An alert has been sent to your emergency contacts.");
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setTimeLeft(timer * 60);
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-center text-primary">{t('auto.auto_automated_check_in_589')}</h1>
      <p className="text-center text-gray-400 mb-8 max-w-md">{t('auto.auto_for_solo_ventures__i_588')}</p>
      
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        {!isActive ? (
          <>
            <label className="block text-lg font-medium mb-2">{t('auto.auto_set_check_in_timer___587')}</label>
            <Input 
              type="number"
              value={timer}
              onChange={(e) => setTimer(parseInt(e.target.value))}
              className="w-32 mx-auto mb-6"
            />
            <Button onClick={handleStart} className="w-full">{t('auto.auto_start_timer_586')}</Button>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-7xl font-bold font-mono mb-6"
            >
                {formatTime(timeLeft)}
            </motion.div>
            <Button onClick={handleReset} variant="destructive" className="w-full">{t('auto.auto_i_m_safe__cancel_tim_585')}</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutomatedCheckIn;
