
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Shield, ShieldOff } from 'lucide-react';

const AuraShield = () => {
  const [isArmed, setIsArmed] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isArmed) {
      // Mock proximity alerts
      interval = setInterval(() => {
        if (Math.random() < 0.2) { // 20% chance of alert per second
          const newAlert = `Proximity alert triggered at ${new Date().toLocaleTimeString()}`;
          setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
          
          // Haptic feedback
          if ('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200]); // Vibrate pattern
          }
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isArmed]);

  const toggleShield = () => {
    setIsArmed(!isArmed);
    if(isArmed) {
        setAlerts([]); // Clear alerts when disarming
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md text-center"
        >
            <h1 className="text-4xl font-bold mb-3 text-primary">Aura Shield</h1>
            <p className="text-gray-400 mb-8">Proactive safety for crowded places. Get haptic feedback alerts when someone gets too close to your belongings.</p>

            <motion.div whileHover={{ scale: 1.05 }} className="mb-8">
                <Button onClick={toggleShield} size="lg" className={`w-64 h-20 text-2xl transition-all duration-300 ${isArmed ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                    {isArmed ? <Shield size={32} className="mr-2"/> : <ShieldOff size={32} className="mr-2"/>}
                    {isArmed ? 'Armed' : 'Disarmed'}
                </Button>
            </motion.div>

            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Alert Log</h2>
                {alerts.length > 0 ? (
                    <ul className="space-y-2 text-left">
                        {alerts.map((alert, index) => (
                            <motion.li 
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-sm text-yellow-400 bg-yellow-900/30 p-2 rounded"
                            >
                                {alert}
                            </motion.li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No alerts yet. Arm the shield in a crowded area.</p>
                )}
            </div>
        </motion.div>
    </div>
  );
};

export default AuraShield;
