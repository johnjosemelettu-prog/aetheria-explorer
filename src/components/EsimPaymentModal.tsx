import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Zap, X, Loader2 } from 'lucide-react';

interface EsimPaymentModalProps {
  onClose: () => void;
  onConfirm: () => void;
  price: number;
  country: string;
  isProcessing: boolean;
}

const EsimPaymentModal: React.FC<EsimPaymentModalProps> = ({
  onClose,
  onConfirm,
  price,
  country,
  isProcessing,
}) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/90 backdrop-blur-xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md glass rounded-[40px] p-10 border border-white/10 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center">
                <Zap className="text-secondary w-6 h-6" />
                </div>
                <h2 className="text-3xl font-display font-bold tracking-tighter">Confirm Purchase</h2>
            </div>
            <button onClick={onClose} className="p-3 glass-hover rounded-2xl">
                <X className="w-6 h-6 text-foreground/50" />
            </button>
        </div>

        <div className="space-y-8">
            <p className="text-center text-foreground/70">You are purchasing an eSIM for <strong>{country}</strong>.</p>
            <div className="p-6 rounded-3xl bg-secondary/10 border border-secondary/20">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">Price</span>
                    <span className="text-2xl font-display font-bold text-secondary">${price}</span>
                </div>
            </div>
            <button
                onClick={onConfirm}
                disabled={isProcessing}
                className="w-full py-5 bg-secondary text-white rounded-3xl font-bold shadow-2xl shadow-secondary/30 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
                {isProcessing ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                    'Confirm & Pay'
                )}
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EsimPaymentModal;
