
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { CheckSquare, Square, Wind, Droplets, Trash2 } from 'lucide-react';

const EcoWarriorQuests = () => {
  const [quests, setQuests] = useState<any[]>([]);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuests = async () => {
      setLoading(true);
      try {
        const ecoQuests = await AI.getEcoWarriorQuests();
        setQuests(ecoQuests);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchQuests();
  }, []);

  const toggleQuest = (questId: string) => {
    setCompletedQuests(prev => 
        prev.includes(questId) 
            ? prev.filter(id => id !== questId)
            : [...prev, questId]
    );
  };

  const getIcon = (category: string) => {
      switch(category) {
          case 'Conservation': return <Wind className="w-8 h-8 text-blue-400" />
          case 'Community': return <Droplets className="w-8 h-8 text-green-400" />
          case 'Cleanup': return <Trash2 className="w-8 h-8 text-red-400" />
          default: return <Square className="w-8 h-8 text-gray-400" />
      }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900"><p className="text-white">Loading Quests...</p></div>;
  }

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-3 text-center text-green-300">Eco-Warrior Quests</h1>
            <p className="text-center text-gray-400 mb-10">Engage in positive environmental actions and make a real difference during your travels.</p>

            <div className="space-y-6">
                {quests.map((quest, index) => (
                    <motion.div
                        key={quest.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className={`rounded-xl shadow-lg transition-all ${completedQuests.includes(quest.id) ? 'bg-green-900/50 border-green-500' : 'bg-gray-800 border-gray-700'} border`}
                    >
                        <div className="p-6 flex items-center gap-6">
                            <div className="flex-shrink-0">
                                {getIcon(quest.category)}
                            </div>
                            <div className="flex-grow">
                                <h3 className={`text-xl font-bold ${completedQuests.includes(quest.id) ? 'line-through text-gray-500' : 'text-white'}`}>{quest.title}</h3>
                                <p className="text-gray-400 mt-1">{quest.description}</p>
                                <div className="flex items-center gap-4 mt-3 text-sm">
                                    <span className="text-yellow-400 font-semibold">+{quest.reward_points} points</span>
                                    <span className="text-blue-400">{quest.location}</span>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => toggleQuest(quest.id)}
                                    className="w-12 h-12 rounded-full"
                                >
                                    {completedQuests.includes(quest.id) ? <CheckSquare className="w-8 h-8 text-green-400"/> : <Square className="w-8 h-8 text-gray-500"/>}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    </div>
  );
};

export default EcoWarriorQuests;
