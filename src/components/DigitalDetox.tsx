import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DigitalDetox = () => {
  const [detoxMode, setDetoxMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (detoxMode && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setDetoxMode(false);
    }
  }, [detoxMode, timeLeft]);

  const startDetox = (duration: number) => {
    setTimeLeft(duration);
    setDetoxMode(true);
    // In a real app, this would suppress notifications.
    // For now, we'll just simulate it.
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-6">Digital Detox</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mb-8" />
        <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
          A mode that temporarily limits notifications and encourages you to disconnect.
        </p>
      </motion.div>

      {detoxMode ? (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-800 p-8 rounded-lg shadow-lg text-center"
        >
            <h2 className="text-3xl font-display font-medium mb-4">You are in Digital Detox Mode</h2>
            <p className="text-7xl font-bold font-mono my-8">{formatTime(timeLeft)}</p>
            <p className="text-zinc-400">Notifications are silenced. Enjoy the peace.</p>
        </motion.div>
      ) : (
        <div className="bg-zinc-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-display font-medium mb-6">Start a Detox Session</h2>
          <p className="text-zinc-400 mb-6">Choose a duration to limit distractions and reconnect with your surroundings.</p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => startDetox(15 * 60)} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-md">
              15 Minutes
            </button>
            <button onClick={() => startDetox(30 * 60)} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-md">
              30 Minutes
            </button>
            <button onClick={() => startDetox(60 * 60)} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-md">
              1 Hour
            </button>
          </div>
        </div>
      )}

      {/* Data Security Section */}
      <div className="mt-12 p-6 bg-zinc-900/50 border border-zinc-700/50 rounded-lg">
        <h4 className="font-bold text-zinc-100 text-lg">Your Privacy in Digital Detox</h4>
        <p className="text-zinc-400 text-sm mt-2">
          Digital Detox mode is designed for your peace of mind. We are committed to being transparent about how this feature works with your data, in line with our <a href="/privacy-policy" className="underline text-pink-400 hover:text-pink-300">Privacy Policy</a>.
        </p>
        <ul className="list-disc pl-5 text-zinc-400 text-sm mt-3 space-y-2">
          <li><strong>No New Data Collected:</strong> This feature does not collect or store any new personal data. Your activity within Digital Detox mode is temporary and private to your device.</li>
          <li><strong>Data Security:</strong> While this feature is active, all existing data security measures outlined in our Privacy Policy continue to protect your account and personal information.</li>
          <li><strong>Your Legal Rights:</strong> Your rights regarding your personal data are not affected by using Digital Detox mode. You can review and manage your data and preferences at any time.</li>
        </ul>
      </div>

    </div>
  );
};

export default DigitalDetox;