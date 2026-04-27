import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Image as ImageIcon, Sparkles, Download, CheckCircle2, CloudFog, Sun, Moon } from 'lucide-react';

export default function AIPhotoEditor() {
  const [activeTool, setActiveTool] = useState('magic');
  const [processing, setProcessing] = useState(false);

  const tools = [
    { id: 'magic', name: 'Auto Enhance', icon: Wand2 },
    { id: 'sky', name: 'Sky Swap', icon: CloudFog },
    { id: 'remove', name: 'Erase Tourist', icon: ImageIcon },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-display font-bold mb-4 flex items-center gap-4">
            <Sparkles className="w-10 h-10 text-violet-400" />
            AI Editor
          </h1>
          <p className="text-foreground/60 text-lg max-w-xl">
            Clean up distractions, change the time of day, and perfect your travel photos instantly.
          </p>
        </div>
        <button className="px-6 py-3 bg-violet-500 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-violet-600 transition-colors shadow-[0_0_20px_rgba(139,92,246,0.3)]">
          <Download className="w-5 h-5" /> Export Hi-Res
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8 h-[600px]">
        {/* Toolbar */}
        <div className="lg:col-span-1 glass rounded-3xl border border-white/10 p-6 flex flex-col gap-4">
          <h3 className="font-bold text-sm uppercase tracking-widest text-foreground/50 mb-2">Tools</h3>
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`p-4 rounded-2xl flex items-center gap-3 transition-all font-bold ${activeTool === tool.id ? 'bg-violet-500/20 text-violet-400 border border-violet-500/50' : 'bg-white/5 border border-white/5 hover:bg-white/10'}`}
            >
              <tool.icon className="w-5 h-5" /> {tool.name}
            </button>
          ))}

          {activeTool === 'sky' && (
             <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-4 mt-4 border-t border-white/10 flex gap-2">
               <button className="flex-1 py-2 bg-white/5 rounded-lg flex justify-center hover:bg-white/10"><Sun className="w-5 h-5 text-yellow-400"/></button>
               <button className="flex-1 py-2 bg-white/5 rounded-lg flex justify-center hover:bg-white/10"><CloudFog className="w-5 h-5 text-gray-400"/></button>
               <button className="flex-1 py-2 bg-white/5 rounded-lg flex justify-center hover:bg-white/10"><Moon className="w-5 h-5 text-indigo-400"/></button>
             </motion.div>
          )}

          <div className="mt-auto">
            <button 
              onClick={() => { setProcessing(true); setTimeout(() => setProcessing(false), 2000); }}
              className="w-full py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              Apply Changes
            </button>
          </div>
        </div>

        {/* Main Canvas */}
        <div className="lg:col-span-3 glass rounded-3xl border border-white/10 overflow-hidden relative flex items-center justify-center bg-black/40">
           
           <img 
             src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80" 
             alt="Editor Canvas" 
             className={`w-full h-full object-cover transition-all duration-1000 ${processing ? 'blur-sm scale-105' : 'blur-0 scale-100'}`}
           />

           {processing && (
             <div className="absolute inset-0 flex items-center justify-center bg-black/40">
               <div className="text-center">
                 <Wand2 className="w-12 h-12 text-violet-400 animate-spin mx-auto mb-4" />
                 <p className="font-bold text-violet-300">Processing Pixels...</p>
               </div>
             </div>
           )}

           {!processing && <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 text-xs font-bold text-foreground/50">
             Original
           </div>}
        </div>
      </div>
    </div>
  );
}
