
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';

const AutomatedCheckIn = () => {
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
      <h1 className="text-4xl font-bold mb-4 text-center text-primary">Automated Check-in</h1>
      <p className="text-center text-gray-400 mb-8 max-w-md">For solo ventures. If you don't check in before the timer runs out, we'll alert your emergency contacts.</p>
      
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        {!isActive ? (
          <>
            <label className="block text-lg font-medium mb-2">Set Check-in Timer (minutes)</label>
            <Input 
              type="number"
              value={timer}
              onChange={(e) => setTimer(parseInt(e.target.value))}
              className="w-32 mx-auto mb-6"
            />
            <Button onClick={handleStart} className="w-full">Start Timer</Button>
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
            <Button onClick={handleReset} variant="destructive" className="w-full">I'm Safe (Cancel Timer)</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutomatedCheckIn;
