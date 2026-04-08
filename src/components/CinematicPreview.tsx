import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Sparkles, Play, Loader2, X, Film, Wand2 } from 'lucide-react';
import { generateVideo } from '../services/gemini';
import { cn } from '../lib/utils';

export default function CinematicPreview() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setStatus('Initializing Veo 3.1 Synthesis...');
    
    try {
      // Simulate status updates for better UX
      const statusUpdates = [
        'Analyzing cinematic composition...',
        'Synthesizing temporal frames...',
        'Applying neural lighting...',
        'Finalizing video stream...'
      ];
      
      let i = 0;
      const interval = setInterval(() => {
        if (i < statusUpdates.length) {
          setStatus(statusUpdates[i]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 3000);

      const url = await generateVideo(prompt);
      setVideoUrl(url);
      clearInterval(interval);
    } catch (error) {
      console.error('Cinematic Preview Error:', error);
      setStatus('Synthesis failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="glass p-8 rounded-[32px] overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Film className="w-32 h-32" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-secondary/20 rounded-2xl flex items-center justify-center">
            <Video className="text-secondary w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold">Cinematic Preview</h2>
            <p className="text-sm text-foreground/50">Synthesize 720p travel previews with Veo 3.1.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe a cinematic scene... (e.g., 'A drone shot of a futuristic city in the clouds at sunset')"
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm min-h-[100px] focus:outline-none focus:border-secondary/50 transition-colors resize-none"
            />
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="absolute bottom-4 right-4 p-3 bg-secondary text-white rounded-xl shadow-lg shadow-secondary/20 hover:scale-110 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
            </button>
          </div>

          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-10 glass rounded-2xl border-dashed border-2 border-white/5">
              <Loader2 className="w-10 h-10 text-secondary animate-spin mb-4" />
              <p className="text-sm font-bold text-foreground/50 animate-pulse">{status}</p>
            </div>
          )}

          <AnimatePresence>
            {videoUrl && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative aspect-video rounded-2xl overflow-hidden glass border border-white/10"
              >
                <video 
                  src={videoUrl} 
                  controls 
                  autoPlay
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setVideoUrl(null)}
                  className="absolute top-2 right-2 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
