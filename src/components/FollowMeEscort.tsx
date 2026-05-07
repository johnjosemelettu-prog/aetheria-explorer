
import React, { useState } from 'react';
import { Button } from './ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

const FollowMeEscort = () => {
    const { t } = useTranslation();
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
            
            <h1 className="text-4xl font-bold mb-3 text-primary">{t('auto.auto__follow_me__digital__1303')}</h1>
            <p className="text-gray-400 mb-8">{t('auto.auto_share_a_temporary_li_1302')}</p>
            
            {!link ? (
                <Button onClick={generateLink} size="lg" className="w-full">{t('auto.auto_generate_live_link_1301')}</Button>
            ) : (
                <AnimatePresence>
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}>
                        <p className="text-gray-300 mb-4">{t('auto.auto_here_is_your_live_tr_1300')}</p>
                        <div className="bg-gray-700 p-4 rounded-lg flex items-center justify-between">
                            <span className="text-sm text-yellow-300 truncate">{link}</span>
                            <Button onClick={copyLink} variant="secondary" size="sm">
                                {isCopied ? "Copied!" : "Copy"}
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">{t('auto.auto_this_link_is_tempora_1299')}</p>
                        
                        <Button onClick={() => setLink('')} variant="link" className="mt-4 text-gray-400">{t('auto.auto_create_a_new_link_1298')}</Button>
                    </motion.div>
                </AnimatePresence>
            )}
        </motion.div>
    </div>
  );
};

export default FollowMeEscort;
