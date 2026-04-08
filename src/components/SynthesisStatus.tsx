import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Zap,
  Image as ImageIcon,
  Video,
  Languages,
  Leaf,
  Map as MapIcon
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { cn } from '../lib/utils';

interface SynthesisLog {
  id: string;
  userId: string;
  type: 'itinerary' | 'image' | 'video' | 'translation' | 'carbon' | 'layover';
  status: 'pending' | 'completed' | 'failed';
  description: string;
  timestamp: any;
}

export default function SynthesisStatus() {
  const [logs, setLogs] = useState<SynthesisLog[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'synthesis_logs'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('timestamp', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SynthesisLog));
      setLogs(data);
    });

    return () => unsubscribe();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'itinerary': return MapIcon;
      case 'image': return ImageIcon;
      case 'video': return Video;
      case 'translation': return Languages;
      case 'carbon': return Leaf;
      case 'layover': return Zap;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'pending': return 'text-secondary animate-pulse';
      case 'failed': return 'text-accent';
      default: return 'text-foreground/40';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle2;
      case 'pending': return Clock;
      case 'failed': return AlertCircle;
      default: return Activity;
    }
  };

  if (logs.length === 0) return null;

  return (
    <div className="fixed bottom-8 left-8 z-40">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn(
          "glass rounded-3xl border border-white/10 shadow-2xl transition-all duration-500 overflow-hidden",
          isExpanded ? "w-80" : "w-16 h-16"
        )}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-16 h-16 flex items-center justify-center glass-hover rounded-3xl transition-colors"
        >
          <Activity className={cn("w-6 h-6", logs.some(l => l.status === 'pending') ? "text-secondary animate-pulse" : "text-primary")} />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 pt-0"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest opacity-50">Synthesis Status</h3>
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              </div>

              <div className="space-y-4">
                {logs.map((log) => {
                  const Icon = getIcon(log.type);
                  const StatusIcon = getStatusIcon(log.status);
                  return (
                    <div key={log.id} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                          <Icon className="w-4 h-4 text-foreground/40" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">{log.description}</p>
                          <p className="text-[10px] text-foreground/30 uppercase tracking-tighter">
                            {log.type} synthesis
                          </p>
                        </div>
                      </div>
                      <StatusIcon className={cn("w-4 h-4", getStatusColor(log.status))} />
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest opacity-30">
                  <span>Orchestration Active</span>
                  <span>v2.5.0</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
