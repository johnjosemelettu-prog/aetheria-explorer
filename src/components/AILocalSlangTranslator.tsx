import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Volume2, Sparkles, Loader2, MessageSquare, Copy, Check, MapPin } from 'lucide-react';
import { useTranslation } from "react-i18next";

const destinations = [
  { id: 'london', name: 'London, UK', flag: '🇬🇧', example: 'That\'s brilliant' },
  { id: 'tokyo', name: 'Tokyo, Japan', flag: '🇯🇵', example: 'Sugoi!' },
  { id: 'new_york', name: 'New York, USA', flag: '🇺🇸', example: 'Deadass' },
  { id: 'paris', name: 'Paris, France', flag: '🇫🇷', example: 'C\'est lourd' },
];

const mockTranslations: Record<string, Record<string, any>> = {
  london: {
    slang: "Mate, that's absolutely mental! Proper chuffed for ya.",
    literal: "Friend, that is very crazy! I am very happy for you.",
    context: "Use this when a friend tells you good news or an unbelievable story.",
  },
  tokyo: {
    slang: "Maji de?! Yabai ne!",
    literal: "Seriously?! That's crazy/awesome!",
    context: "A casual reaction to surprising or impressive news.",
  },
  new_york: {
    slang: "Deadass? That's wild, bro.",
    literal: "Are you serious? That's crazy.",
    context: "Used to confirm if someone is telling the truth or expressing disbelief.",
  },
  paris: {
    slang: "C'est ouf ton truc, un truc de dingue !",
    literal: "Your thing is crazy, a crazy thing!",
    context: "Reacting to something unbelievable or very cool.",
  }
};

const AILocalSlangTranslator = () => {
    const { t } = useTranslation();
  const [selectedDest, setSelectedDest] = useState(destinations[0]);
  const [inputText, setInputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    setResult(null);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    // Get mock result or fallback
    const translation = mockTranslations[selectedDest.id] || mockTranslations['london'];
    setResult(translation);
    setIsTranslating(false);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.slang);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/20 text-primary mb-6 border border-primary/30 shadow-[0_0_30px_rgba(var(--primary),0.3)]">
            <Languages className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black mb-4 tracking-tighter">
            {t('auto.auto_speak_like_a_228')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t('auto.auto_local_227')}</span>
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light">
            {t('auto.auto_ditch_the_tourist_ph_226')}
                                </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Input Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-7 space-y-6"
          >
            <div className="glass p-6 md:p-8 rounded-[32px] border border-white/10 relative overflow-hidden">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                {t('auto.auto_select_destination_225')}
                                            </h2>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {destinations.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => setSelectedDest(dest)}
                    className={`px-5 py-3 rounded-2xl flex items-center gap-3 transition-all duration-300 font-medium ${
                      selectedDest.id === dest.id 
                        ? 'bg-primary text-white shadow-[0_0_20px_rgba(var(--primary),0.4)] scale-105' 
                        : 'bg-white/5 text-foreground/70 hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    <span className="text-xl">{dest.flag}</span>
                    {dest.name}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-foreground/80 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  {t('auto.auto_what_do_you_want_to__224')}
                                                  </label>
                <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`e.g. "That is very surprising news!"`}
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/5 focus:ring-1 focus:ring-primary/50 transition-all resize-none text-lg"
                />
              </div>

              <button 
                onClick={handleTranslate}
                disabled={isTranslating || !inputText.trim()}
                className="w-full mt-6 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(var(--primary),0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isTranslating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t('auto.auto_analyzing_cultural_c_223')}
                                                        </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    {t('auto.auto_translate_to_slang_222')}
                                                            </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-5"
          >
            <div className="glass p-6 md:p-8 rounded-[32px] border border-white/10 h-full flex flex-col relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3 relative z-10">
                <Sparkles className="w-5 h-5 text-accent" />
                {t('auto.auto_local_translation_221')}
                                            </h2>

              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1 flex flex-col space-y-6 relative z-10"
                  >
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 relative">
                      <p className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-2">
                        "{result.slang}"
                      </p>
                      
                      <div className="flex items-center gap-2 mt-4">
                        <button 
                          onClick={handleCopy}
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-foreground/60 hover:text-white"
                          title={t('auto.auto_copy_to_clipboard_220')}
                        >
                          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-foreground/60 hover:text-white flex items-center gap-2 text-sm font-medium">
                          <Volume2 className="w-4 h-4" />
                          {t('auto.auto_listen_219')}
                                                                          </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-mono uppercase tracking-widest text-accent/80 block mb-1">{t('auto.auto_literal_meaning_218')}</span>
                        <p className="text-foreground/80">{result.literal}</p>
                      </div>
                      <div className="h-px w-full bg-white/10" />
                      <div>
                        <span className="text-xs font-mono uppercase tracking-widest text-accent/80 block mb-1">{t('auto.auto_when_to_use_it_217')}</span>
                        <p className="text-foreground/80 text-sm">{result.context}</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center opacity-40 relative z-10 py-12"
                  >
                    <Languages className="w-16 h-16 mb-4 opacity-50" />
                    <p>{t('auto.auto_select_a_destination_216')}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AILocalSlangTranslator;
