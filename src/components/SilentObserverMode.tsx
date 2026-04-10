
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Play, Pause, Square, Headphones, Wind } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const SilentObserverMode = () => {
  const { t } = useTranslation();
  const [viewpoint, setViewpoint] = useState('arashiyama_bamboo_grove');
  const [meditation, setMeditation] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const fetchMeditation = async (vp: string) => {
    setLoading(true);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    try {
      const result = await AI.getSilentObserverMeditation(vp);
      setMeditation(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMeditation(viewpoint);
  }, [viewpoint]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleStop = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const handleEnd = () => setIsPlaying(false);

    audio?.addEventListener('timeupdate', updateProgress);
    audio?.addEventListener('ended', handleEnd);
    return () => {
      audio?.removeEventListener('timeupdate', updateProgress);
      audio?.removeEventListener('ended', handleEnd);
    };
  }, [isPlaying]);

  return (
    <div className="p-8 bg-slate-900 text-white min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md w-full text-center">
        
        <Headphones className="mx-auto text-sky-400 mb-4" size={48} />
        <h1 className="text-4xl font-bold mb-2">{t('silentObserver.title')}</h1>
        <p className="text-slate-400 mb-8">{t('silentObserver.description')}</p>

        <div className="bg-slate-800 rounded-xl shadow-lg p-6">
            <div className="mb-6">
                <Select onValueChange={setViewpoint} value={viewpoint}>
                    <SelectTrigger className="w-full bg-slate-700 border-slate-600 ring-offset-slate-900 focus:ring-sky-500">
                        <SelectValue placeholder={t('silentObserver.selectPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 text-white border-slate-600">
                        <SelectItem value="arashiyama_bamboo_grove">{t('silentObserver.location.arashiyama')}</SelectItem>
                        <SelectItem value="fushimi_inari_shrine">{t('silentObserver.location.fushimiInari')}</SelectItem>
                        <SelectItem value="kinkaku_ji_temple">{t('silentObserver.location.kinkakuJi')}</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {loading && <p>{t('silentObserver.loading')}</p>}

            {meditation && !loading && (
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                  <div className="flex items-center justify-center space-x-2 text-amber-400 mb-4">
                    <Wind size={16}/>
                    <p className="font-semibold">{meditation.title}</p>
                  </div>
                  <p className="text-slate-300 text-sm mb-6">{meditation.narrative}</p>

                  <audio ref={audioRef} src={meditation.audioUrl} />

                  <div className="w-full bg-slate-700 rounded-full h-1.5 mb-4">
                      <div className="bg-sky-400 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>

                  <div className="flex justify-center space-x-4">
                      <button onClick={handlePlayPause} className="p-4 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors">
                          {isPlaying ? <Pause/> : <Play/>}
                      </button>
                      <button onClick={handleStop} className="p-4 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors">
                          <Square/>
                      </button>
                  </div>
                </motion.div>
            )}
        </div>
      </motion.div>
    </div>
  );
};

export default SilentObserverMode;
