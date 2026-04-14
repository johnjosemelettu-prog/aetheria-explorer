import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Scan, Power, Info, Settings, Battery, Wifi, Cpu, ChevronLeft } from 'lucide-react';

interface XRLayoutProps {
  children: React.ReactNode;
  mode?: 'AR' | 'VR';
  title: string;
  description?: string;
  overlayIcon?: React.ReactNode;
}

export default function XRLayout({ children, mode = 'AR', title, description, overlayIcon }: XRLayoutProps) {
  const [active, setActive] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(87);
  const [time, setTime] = useState("");

  useEffect(() => {
    setActive(true);
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden bg-black font-mono text-xs ${mode === 'VR' ? 'perspective-1000' : ''}`}>
      {/* Background Simulation - Just dark/blur for our web frame */}
      <div className="absolute inset-0 bg-gray-900 overflow-hidden">
        {mode === 'AR' && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Main Content Area */}
      <div className="relative h-full w-full">
        {children}
      </div>

      {/* HUD Overlays */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pointer-events-none absolute inset-0 border-[1px] border-primary/30 m-4 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(var(--primary),0.2)_inset]"
          >
            {/* Camera Corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/80 m-4 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/80 m-4 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/80 m-4 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/80 m-4 rounded-br-xl" />

            {/* Top Bar HUD */}
            <div className="absolute top-0 inset-x-0 h-12 flex justify-between items-center px-8 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex flex-col text-primary/80">
                <span className="font-bold tracking-widest">{title.toUpperCase()}</span>
                <span className="text-[10px] opacity-70">LAT 48.8584 N / LNG 2.2945 E</span>
              </div>
              
              <div className="flex gap-4 items-center text-primary/80">
                <span className="bg-primary/20 px-2 py-0.5 rounded text-[10px] font-bold border border-primary/40 animate-pulse">
                  {mode} ACTIVE
                </span>
                <Wifi className="w-4 h-4" />
                <div className="flex items-center gap-1">
                  {batteryLevel}% <Battery className="w-4 h-4" />
                </div>
                <span>{time}</span>
              </div>
            </div>

            {/* Center Reticle (AR only) */}
            {mode === 'AR' && (
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <div className="w-8 h-px bg-primary/80" />
                <div className="h-8 w-px bg-primary/80 mx-2" />
                <div className="w-8 h-px bg-primary/80" />
              </div>
            )}

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />

            {/* Title / Description Info box */}
            {(title || description) && (
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="max-w-md bg-black/60 backdrop-blur-md p-4 rounded-xl border border-primary/20 flex flex-col gap-2 pointer-events-auto shadow-2xl">
                  {overlayIcon && <div className="text-primary mb-1">{overlayIcon}</div>}
                  <h2 className="text-xl font-display font-medium text-white">{title}</h2>
                  {description && <p className="text-primary/70 text-sm leading-relaxed">{description}</p>}
                </div>

                {/* Controls mock */}
                <div className="flex gap-2 pointer-events-auto">
                  <button className="w-12 h-12 bg-black/60 backdrop-blur-md border border-primary/30 rounded-full flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 bg-black/60 backdrop-blur-md border border-primary/30 rounded-full flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                    <Scan className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
