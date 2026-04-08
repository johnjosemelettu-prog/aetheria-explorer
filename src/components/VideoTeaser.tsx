import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Film, Sparkles, Loader2 } from 'lucide-react';

export default function VideoTeaser() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    // Simulate video generation
    await new Promise(resolve => setTimeout(resolve, 5000));
    // Replace with actual video URL from a service
    setVideoUrl('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4');
    setIsGenerating(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
            <Film className="text-primary w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold">Video Teaser</h1>
            <p className="text-foreground/50">Create cinematic teasers of your trips with AI.</p>
          </div>
        </div>

        <div className="glass p-8 rounded-[32px] space-y-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your trip highlights... (e.g., 'A week in Bali: surfing in Uluwatu, sunrise at Mount Batur, and exploring Ubud's rice terraces')"
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm min-h-[100px] focus:outline-none focus:border-primary/50 transition-colors resize-none"
          />
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Generate Teaser
          </button>
        </div>

        {videoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <video src={videoUrl} controls className="w-full rounded-2xl" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
