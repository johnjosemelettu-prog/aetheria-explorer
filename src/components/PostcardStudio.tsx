import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon, Send, Loader2 } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function PostcardStudio() {
    const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim() || !recipient.trim()) return;
    setIsSending(true);
    // Simulate sending postcard
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSending(false);
    setMessage('');
    setRecipient('');
    alert('Postcard sent virtually!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
            <ImageIcon className="text-primary w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold">{t('auto.auto_postcard_studio_2054')}</h1>
            <p className="text-foreground/50">{t('auto.auto_create_and_send_cust_2053')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass p-8 rounded-[32px] space-y-6">
            <div>
              <label className="block text-sm font-bold text-foreground/70 mb-2">{t('auto.auto_recipient_email_2052')}</label>
              <input
                type="email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder={t('auto.auto_friend_example_com_2051')}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground/70 mb-2">{t('auto.auto_message_2050')}</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('auto.auto_wish_you_were_here___2049')}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm min-h-[150px] focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!message.trim() || !recipient.trim() || isSending}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {t('auto.auto_send_postcard_2048')}
                                      </button>
          </div>

          <div className="glass p-8 rounded-[32px] flex items-center justify-center min-h-[300px] border-dashed border-2 border-white/5">
             <div className="text-center text-foreground/40">
               <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
               <p>{t('auto.auto_postcard_preview_wil_2047')}</p>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
