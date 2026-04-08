import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Activity, 
  Users, 
  DollarSign, 
  AlertTriangle,
  BarChart,
  Settings,
  Search,
  ShieldCheck,
  UserPlus
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, onSnapshot, limit, orderBy, where, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function AdminConsole() {
  const [stats, setStats] = useState({
    users: 1240,
    revenue: 45200,
    activeItineraries: 850,
    systemHealth: 98
  });

  const [simulationEmail, setSimulationEmail] = useState('');
  const [simulationRole, setSimulationRole] = useState<'admin' | 'partner' | 'explorer'>('admin');
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState([
    { msg: 'AI Synthesis Engine: Latency spike detected in EU-West', type: 'warning' },
    { msg: 'Global eSIM: New partner integrated (Singtel)', type: 'info' },
    { msg: 'Security: Brute force attempt blocked from 192.168.1.1', type: 'error' },
    { msg: 'Finance: Daily audit completed successfully', type: 'success' }
  ]);

  const handlePromote = async () => {
    if (!simulationEmail) return;
    setIsSimulating(true);
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', simulationEmail));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'users', userDoc.id), {
          role: simulationRole
        });
        setLogs(prev => [{
          msg: `Simulation: User ${simulationEmail} promoted to ${simulationRole}`,
          type: 'info'
        }, ...prev]);
        setSimulationEmail('');
      } else {
        alert('User not found');
      }
    } catch (error) {
      console.error('Promotion error:', error);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center">
          <Shield className="text-accent w-6 h-6" />
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold">Admin Console</h1>
          <p className="text-foreground/50">System diagnostics and global orchestration.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Users', value: stats.users, icon: Users, color: 'text-primary' },
          { label: 'Total Revenue', value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-400' },
          { label: 'Active Journeys', value: stats.activeItineraries, icon: Activity, color: 'text-secondary' },
          { label: 'System Health', value: `${stats.systemHealth}%`, icon: Shield, color: 'text-accent' }
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">{stat.label}</span>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <div className="text-3xl font-display font-bold tracking-tighter">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Simulation Hub */}
          <section className="glass p-8 rounded-3xl border-primary/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="text-primary w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold">Simulation Hub</h2>
                <p className="text-sm text-foreground/50">Promote accounts for multi-role testing.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                value={simulationEmail}
                onChange={(e) => setSimulationEmail(e.target.value)}
                placeholder="User Email..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
              <select 
                value={simulationRole}
                onChange={(e) => setSimulationRole(e.target.value as any)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none"
              >
                <option value="admin" className="bg-background">Admin</option>
                <option value="partner" className="bg-background">Partner</option>
                <option value="explorer" className="bg-background">Explorer</option>
              </select>
              <button 
                onClick={handlePromote}
                disabled={isSimulating || !simulationEmail}
                className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSimulating ? 'Promoting...' : 'Promote'}
              </button>
            </div>
          </section>

          <section className="glass p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-display font-bold">System Logs</h2>
              <button className="text-sm font-bold text-primary">Export Logs</button>
            </div>
            <div className="space-y-4">
              {logs.map((log, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    log.type === 'error' ? "bg-accent" : log.type === 'warning' ? "bg-yellow-500" : "bg-primary"
                  )} />
                  <span className="text-sm font-mono text-foreground/70">{log.msg}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="glass p-8 rounded-3xl">
            <h2 className="text-xl font-display font-bold mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full py-3 glass glass-hover rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                <Settings className="w-4 h-4" />
                Global Config
              </button>
              <button className="w-full py-3 glass glass-hover rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Emergency Shutdown
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// Helper for cn in this file
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
