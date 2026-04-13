import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Sparkles, Send, Loader2, X, Globe, Wand2 } from 'lucide-react';
import { translateText } from '@/services/gemini';
import { cn } from '@/lib/utils';

export default function LinguisticSynthesis() {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('Japanese');
  const [isTranslating, setIsTranslating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const languages = ['Japanese', 'French', 'German', 'Spanish', 'Korean', 'Italian', 'Chinese'];

  const handleTranslate = async () => {
    if (!text.trim() || isTranslating) return;
    setIsTranslating(true);
    try {
      const translated = await translateText(text, targetLanguage);
      setResult(translated.translatedText);
    } catch (error) {
      console.error('Linguistic Synthesis Error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <section className="glass p-8 rounded-[32px] overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Languages className="w-32 h-32" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center">
            <Globe className="text-primary w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold">Linguistic Synthesis</h2>
            <p className="text-sm text-foreground/50">Real-time AI translation for global explorers.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm min-h-[120px] focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>
            <div className="relative">
              <div className={cn(
                "w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm min-h-[120px] text-foreground/80",
                !result && "text-foreground/30 italic"
              )}>
                {isTranslating ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Synthesizing translation...
                  </div>
                ) : result || "Translation result will appear here..."}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full sm:w-auto bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none"
            >
              {languages.map(lang => (
                <option key={lang} value={lang} className="bg-background">{lang}</option>
              ))}
            </select>
            <button
              onClick={handleTranslate}
              disabled={!text.trim() || isTranslating}
              className="w-full sm:flex-1 py-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              Synthesize Translation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
