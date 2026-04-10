
import React, { useState } from 'react';
import { Button } from './ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const FollowMeEscort = () => {
  const [link, setLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const generateLink = () => {
    // In a real app, this would generate a unique, temporary URL
    // and might involve saving the user's current route to a database.
    const newLink = `${window.location.origin}/track/` + Math.random().toString(36).substring(7);
    setLink(newLink);
    setIsCopied(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center">
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-gray-800 rounded-lg shadow-2xl p-8 text-center">
            
            <h1 className="text-4xl font-bold mb-3 text-primary">"Follow Me" Digital Escort</h1>
            <p className="text-gray-400 mb-8">Share a temporary live link of your journey with a friend so they can track your progress in real-time.</p>
            
            {!link ? (
                <Button onClick={generateLink} size="lg" className="w-full">Generate Live Link</Button>
            ) : (
                <AnimatePresence>
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}>
                        <p className="text-gray-300 mb-4">Here is your live tracking link:</p>
                        <div className="bg-gray-700 p-4 rounded-lg flex items-center justify-between">
                            <span className="text-sm text-yellow-300 truncate">{link}</span>
                            <Button onClick={copyLink} variant="secondary" size="sm">
                                {isCopied ? "Copied!" : "Copy"}
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">This link is temporary and will expire automatically.</p>
                        
                        <Button onClick={() => setLink('')} variant="link" className="mt-4 text-gray-400">Create a new link</Button>
                    </motion.div>
                </AnimatePresence>
            )}
        </motion.div>
    </div>
  );
};

export default FollowMeEscort;
