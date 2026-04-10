
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';
import { BrainCircuit, Loader, ChevronRight, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// A mock for a 3D component viewer
const Mock3DViewer = ({ model, children }: { model: string, children?: React.ReactNode }) => (
  <div className="w-full h-full bg-gray-900/50 rounded-2xl border border-blue-400/30 flex flex-col justify-between p-4" style={{ backgroundImage: `url('/${model.split('/')[2].replace('.glb', '.webp')}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      {children}
  </div>
);

const MemoryPalace = () => {
  const { t } = useTranslation();
  const [palace, setPalace] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentRoom, setCurrentRoom] = useState<any | null>(null);

  useEffect(() => {
    const fetchPalace = async () => {
      try {
        const data = await AI.getMemoryPalace('user123');
        setPalace(data);
        setCurrentRoom(data.rooms[0]);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchPalace();
  }, []);

  const navigateToRoom = (roomId: string) => {
    const room = palace.rooms.find((r: any) => r.id === roomId);
    if (room) {
        setCurrentRoom(room);
    }
  }

  if (loading) {
    return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white"><Loader className="animate-spin mb-4"/>{t('memoryPalace.loading')}</div>;
  }

  if (!palace || !currentRoom) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">{t('memoryPalace.error')}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4 bg-black/30 p-6 rounded-2xl border border-gray-700/50">
            <div className="flex items-center gap-3 mb-6">
                <BrainCircuit className="text-blue-400" size={32} />
                <h1 className="text-2xl font-bold">{t('memoryPalace.title')}</h1>
            </div>
            <nav className="space-y-2">
                {palace.rooms.map((room:any, index: number) => (
                    <button 
                        key={room.id} 
                        onClick={() => navigateToRoom(room.id)}
                        className={`w-full text-left p-3 rounded-lg flex justify-between items-center transition-colors ${currentRoom.id === room.id ? 'bg-blue-500/30' : 'hover:bg-gray-700/50'}`}>
                        <span>{room.theme}</span>
                        <ChevronRight size={16}/>
                    </button>
                ))}
            </nav>
        </aside>

        <main className="flex-1 h-[70vh] lg:h-auto">
            <Mock3DViewer model={currentRoom.architecture.modelUrl}>
                <AnimatePresence>
                {
                    currentRoom.artifacts.map((artifact: any, index: number) => (
                        <motion.div 
                            key={artifact.id}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className="absolute border border-white/20 bg-black/40 backdrop-blur-md p-3 rounded-lg shadow-lg"
                            style={{
                                left: `${20 + index * 25}%`,
                                top: `${30 + (index % 2) * 20}%`,
                            }}
                        >
                            <p className="text-sm">{artifact.narrative || artifact.content}</p>
                            {artifact.type === 'photo' && <img src={artifact.content} alt={artifact.narrative} className="mt-2 rounded w-32 h-auto"/>}
                            {artifact.type === '3d_model' && <div className="mt-2 w-32 h-24 bg-blue-900/50 rounded flex items-center justify-center text-xs">{t('memoryPalace.model')}</div>}
                        </motion.div>
                    ))
                }
                </AnimatePresence>
                <div className="relative z-10 self-end w-full">
                    <h2 className="text-3xl font-bold text-shadow-lg">{currentRoom.theme}</h2>
                    <p className="text-sm text-gray-300 text-shadow">{t('memoryPalace.ambience')}: {currentRoom.architecture.style}</p>
                </div>
            </Mock3DViewer>
        </main>
    </div>
  );
};

export default MemoryPalace; 
