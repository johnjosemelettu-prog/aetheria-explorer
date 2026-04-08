import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Sparkles, Download, Loader2, X, Wand2 } from 'lucide-react';
import { generateImage } from '../services/gemini';
import { cn } from '../lib/utils';

export default function VisionHub() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('Vision Hub Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="glass p-8 rounded-[32px] overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <ImageIcon className="w-32 h-32" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-accent/20 rounded-2xl flex items-center justify-center">
            <Sparkles className="text-accent w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold">Vision Hub</h2>
            <p className="text-sm text-foreground/50">Synthesize cinematic travel visuals with AI.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe a cinematic travel scene... (e.g., 'A neon-lit street in Tokyo during a rainy night, 8k, cinematic lighting')"
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm min-h-[100px] focus:outline-none focus:border-accent/50 transition-colors resize-none"
            />
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="absolute bottom-4 right-4 p-3 bg-accent text-white rounded-xl shadow-lg shadow-accent/20 hover:scale-110 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
            </button>
          </div>

          <AnimatePresence>
            {generatedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative aspect-video rounded-2xl overflow-hidden glass border border-white/10"
              >
                <img 
                  src={generatedImage} 
                  alt="Generated travel scene" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                  <button 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = generatedImage;
                      link.download = 'aetheria-vision.png';
                      link.click();
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-background rounded-xl font-bold text-xs"
                  >
                    <Download className="w-4 h-4" />
                    Download Synthesis
                  </button>
                </div>
                <button 
                  onClick={() => setGeneratedImage(null)}
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
