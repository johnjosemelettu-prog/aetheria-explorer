import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X } from 'lucide-react';

interface ScanAndPayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScanAndPayModal: React.FC<ScanAndPayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
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
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                  <Camera className="text-primary w-6 h-6" />
                </div>
                <h2 className="text-3xl font-display font-bold tracking-tighter">Scan & Pay</h2>
              </div>
              <button onClick={onClose} className="p-3 glass-hover rounded-2xl">
                <X className="w-6 h-6 text-foreground/50" />
              </button>
            </div>
            <div className="aspect-square bg-white/5 rounded-3xl flex items-center justify-center">
              <p className="text-foreground/50">Camera feed would be here</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ScanAndPayModal;
