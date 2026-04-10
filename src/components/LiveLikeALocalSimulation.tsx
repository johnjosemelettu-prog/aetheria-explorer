
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { User, Play, CheckSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LiveLikeALocalSimulation = () => {
  const { t } = useTranslation();
  const [persona, setPersona] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [tasksCompleted, setTasksCompleted] = useState<number[]>([]);

  const handleStartChallenge = async () => {
    setLoading(true);
    try {
      const result = await AI.startLocalSimulationChallenge();
      setPersona(result);
      setTasksCompleted([]);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleTaskToggle = (taskId: number) => {
    setTasksCompleted(prev => 
        prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  return (
    <div className="p-8 bg-orange-50 min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-orange-800">{t('liveLikeALocal.title')}</h1>
        <p className="text-center text-orange-700 mb-8">{t('liveLikeALocal.description')}</p>

        {!persona ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">{t('liveLikeALocal.startTitle')}</h2>
                <p className="text-gray-600 mb-6">{t('liveLikeALocal.startDescription')}</p>
                <Button onClick={handleStartChallenge} disabled={loading} size="lg">
                    <Play className="mr-2 h-5 w-5"/>
                    {loading ? t('liveLikeALocal.starting') : t('liveLikeALocal.start')}
                </Button>
            </div>
        ) : (
            <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-2 text-center">{t('liveLikeALocal.yourPersona')}</h2>
                <div className="text-center bg-orange-100 p-4 rounded-lg mb-6">
                    <User className="mx-auto h-12 w-12 text-orange-600 mb-2" />
                    <p className="text-xl font-semibold">You are a {persona.name}</p>
                    <p className="text-gray-600">{persona.description}</p>
                </div>

                <h3 className="text-2xl font-bold mb-4">{t('liveLikeALocal.yourTasks')}</h3>
                <ul className="space-y-4">
                    {persona.tasks.map((task: any) => (
                        <li key={task.id} 
                            className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${tasksCompleted.includes(task.id) ? 'bg-green-100 text-gray-500 line-through' : 'bg-gray-50'}`}
                            onClick={() => handleTaskToggle(task.id)}
                        >
                            <CheckSquare className={`mr-4 h-6 w-6 ${tasksCompleted.includes(task.id) ? 'text-green-500' : 'text-gray-300'}`} />
                            <p>{task.description}</p>
                        </li>
                    ))}
                </ul>
                <div className="mt-8 text-center">
                  <Button variant="outline" onClick={handleStartChallenge}>{t('liveLikeALocal.newPersona')}</Button>
                </div>
            </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LiveLikeALocalSimulation;
