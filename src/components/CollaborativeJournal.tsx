
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { Book, Mic, Camera, Send, User, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CollaborativeJournal = () => {
  const { t } = useTranslation();
  const [journal, setJournal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newEntry, setNewEntry] = useState({ text: '', photo: null, voiceNote: null });

  useEffect(() => {
    const fetchJournal = async () => {
      setLoading(true);
      try {
        const journalData = await AI.getCollaborativeJournal();
        setJournal(journalData);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchJournal();
  }, []);

  const handleAddEntry = () => {
    // This would involve backend logic to add the entry to the shared journal
    console.log('Adding new entry:', newEntry);
    setNewEntry({ text: '', photo: null, voiceNote: null });
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-indigo-100"><p>{t('collaborativeJournal.loading')}</p></div>;
  }

  return (
    <div className="p-4 md:p-8 bg-indigo-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-indigo-800">{journal.title}</h1>
            <div className="flex justify-center items-center text-indigo-600">
                <Users className="mr-2" />
                <p>{t('collaborativeJournal.sharedWith')} {journal.members.join(', ')}</p>
            </div>
        </div>

        {/* New Entry Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">{t('collaborativeJournal.addEntry')}</h2>
            <textarea 
                className="w-full p-3 border rounded-lg mb-4" 
                rows={4} 
                placeholder={t('collaborativeJournal.entryPlaceholder')}
                value={newEntry.text}
                onChange={e => setNewEntry({ ...newEntry, text: e.target.value })}
                />
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Button variant="outline" size="icon"><Camera /></Button>
                    <Button variant="outline" size="icon"><Mic /></Button>
                </div>
                <Button onClick={handleAddEntry} className="bg-indigo-600 hover:bg-indigo-700">
                    <Send className="mr-2 h-4 w-4" /> {t('collaborativeJournal.submitEntry')}
                </Button>
            </div>
        </div>

        {/* Journal Entries */}
        <div className="space-y-8">
          {journal.entries.map((entry:any, index:number) => (
            <motion.div 
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: index * 0.1}}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 flex-shrink-0"></div>
                    <div>
                        <p className="font-bold text-indigo-800">{entry.author}</p>
                        <p className="text-sm text-gray-500">{new Date(entry.timestamp).toLocaleString()}</p>
                    </div>
                </div>
                {entry.text && <p className="text-gray-700 mb-4">{entry.text}</p>}
                {entry.photo && <img src={entry.photo} alt="Journal entry" className="rounded-lg mb-4" />}
                {entry.voiceNote && (
                  <audio controls src={entry.voiceNote} className="w-full">
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollaborativeJournal;
