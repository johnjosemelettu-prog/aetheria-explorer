import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Upload, Cuboid, RefreshCw, Download, Share2 } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function ThreeDPhotoSculptures() {
    const { t } = useTranslation();
  const [photos, setPhotos] = useState<number>(0);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleUpload = () => {
    if (photos < 12) setPhotos(p => p + 1);
  };

  const handleGenerate = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setComplete(true);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12">
          <Cuboid className="w-10 h-10 text-primary -rotate-12" />
        </div>
        <h1 className="text-5xl font-display font-bold mb-4">{t('auto.auto_3d_photo_sculptures_8')}</h1>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          {t('auto.auto_upload_multi_angle_p_7')}
                          </p>
      </div>

      {!complete ? (
        <div className="max-w-2xl mx-auto">
          <div className="glass p-8 rounded-3xl border border-white/10 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl">{t('auto.auto_photo_dataset_6')}</h3>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm">{photos}{t('auto.auto__12_optimal_5')}</span>
            </div>
            
            <div 
              onClick={handleUpload}
              className="w-full h-48 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-white/5 transition-all mb-6"
            >
              <Upload className="w-8 h-8 text-foreground/40 mb-3" />
              <p className="font-bold">{t('auto.auto_click_to_upload_angl_4')}</p>
              <p className="text-sm text-foreground/50">{t('auto.auto_supports_jpg__png__m_3')}</p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-4">
              {Array.from({ length: photos }).map((_, i) => (
                <div key={i} className="w-16 h-16 rounded-xl bg-white/10 shrink-0 animate-pulse flex items-center justify-center">
                   <Camera className="w-4 h-4 text-white/30" />
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={photos < 3 || processing}
            className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {processing ? (
              <><RefreshCw className="w-5 h-5 animate-spin" /> {t('auto.auto_reconstructing_mesh__2')}</>
            ) : (
              <><Box className="w-5 h-5" /> {t('auto.auto_generate_3d_sculptur_1')}</>
            )}
          </button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto">
          <div className="glass p-4 rounded-[40px] border border-white/10 relative">
            <div className="aspect-video bg-black/40 rounded-[32px] flex items-center justify-center relative overflow-hidden border border-white/5">
               {/* Fake 3D Viewer */}
               <motion.div 
                 animate={{ rotateY: 360 }} 
                 transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                 className="w-48 h-48 bg-gradient-to-tr from-primary/80 to-purple-500/80 rounded-xl shadow-[0_0_50px_rgba(var(--primary),0.3)] backdrop-blur-xl"
                 style={{ transformStyle: 'preserve-3d' }}
               />
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                 <button className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition"><Download className="w-5 h-5" /></button>
                 <button className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition"><Share2 className="w-5 h-5" /></button>
               </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Temporary internal component to avoid missing import
const Camera = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);
