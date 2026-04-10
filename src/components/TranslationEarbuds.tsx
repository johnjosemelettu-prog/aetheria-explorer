
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as AI from '../services/gemini';
import { Mic, MicOff, Languages, Ear, EarOff, Wifi, WifiOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const TranslationEarbuds = () => {
  const { t } = useTranslation();
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('ja');
  const [latestTranslation, setLatestTranslation] = useState<any>(null);
  const [conversation, setConversation] = useState<any[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const listeningIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleConnect = () => setIsConnected(!isConnected);

  const handleToggleListening = () => {
    if (!isConnected) return;
    setIsListening(!isListening);
  };

  useEffect(() => {
    if (isListening) {
      startRecording();
    } else {
      stopRecording();
    }
    return () => stopRecording();
  }, [isListening]);

  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = async (event) => {
          if (event.data.size > 0) {
            const result = await AI.getLiveTranslation(event.data, targetLanguage);
            const newEntry = { ...result, id: Date.now(), from: 'other' };
            setLatestTranslation(newEntry);
            setConversation(prev => [newEntry, ...prev]);
          }
        };
        // Simulate continuous listening by capturing short audio chunks
        listeningIntervalRef.current = setInterval(() => {
            mediaRecorderRef.current?.stop();
            mediaRecorderRef.current?.start();
        }, 3000); // Process audio every 3 seconds
        mediaRecorderRef.current.start();

      } catch (err) {
        console.error("Error accessing microphone:", err);
        setIsListening(false);
      }
    }
  };

  const stopRecording = () => {
    if (listeningIntervalRef.current) {
        clearInterval(listeningIntervalRef.current);
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="p-8 bg-black text-white min-h-screen flex items-center justify-center font-mono">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
            <Languages className="mx-auto text-cyan-400 mb-4" size={48} />
            <h1 className="text-4xl font-bold mb-2">{t('translationEarbuds.title')}</h1>
            <p className="text-slate-400">{t('translationEarbuds.description')}</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                <div className="flex items-center gap-2">
                    {isConnected ? <Wifi className="text-green-500"/> : <WifiOff className="text-red-500"/>}
                    <span className={`font-semibold ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                        {isConnected ? t('translationEarbuds.connected') : t('translationEarbuds.disconnected')}
                    </span>
                </div>
                <button onClick={handleConnect} className={`px-4 py-2 rounded-lg text-sm font-bold ${isConnected ? 'bg-red-600' : 'bg-green-600'}`}>
                    {isConnected ? t('translationEarbuds.disconnect') : t('translationEarbuds.connect')}
                </button>
            </div>

            <div className="mt-6 flex items-center gap-4">
                <Select onValueChange={setTargetLanguage} defaultValue={targetLanguage} disabled={!isConnected}>
                    <SelectTrigger className="w-full bg-gray-800 border-gray-600 ring-offset-black focus:ring-cyan-500">
                        <SelectValue placeholder={t('translationEarbuds.selectLanguage')} />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border-gray-600">
                        <SelectItem value="ja">{t('translationEarbuds.languages.japanese')}</SelectItem>
                        <SelectItem value="fr">{t('translationEarbuds.languages.french')}</SelectItem>
                        <SelectItem value="es">{t('translationEarbuds.languages.spanish')}</SelectItem>
                    </SelectContent>
                </Select>

                <button onClick={handleToggleListening} disabled={!isConnected} className={`p-4 rounded-full transition-colors ${isListening ? 'bg-cyan-500' : 'bg-gray-700 hover:bg-gray-600'}`}>
                    {isListening ? <Mic/> : <MicOff/>}
                </button>
            </div>

            <div className="mt-6 h-64 bg-black/30 rounded-lg p-4 flex flex-col-reverse overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
                <AnimatePresence initial={false}>
                {conversation.map((item) => (
                    <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="mb-3 pb-3 border-b border-gray-800"
                    >
                        <p className="text-cyan-300 text-lg">{item.translatedText}</p>
                        <p className="text-gray-500 text-xs">{`[${t('translationEarbuds.original')}: ${item.originalText}]`}</p>
                    </motion.div>
                ))}
                </AnimatePresence>
                {!isListening && conversation.length === 0 && <p className="text-center text-gray-500 self-center">{t('translationEarbuds.startListening')}</p>}
                 {isListening && conversation.length === 0 && <p className="text-center text-cyan-400 self-center">{t('translationEarbuds.listening')}</p>}
            </div>

        </div>
      </div>
    </div>
  );
};

export default TranslationEarbuds;
