import React, { useState, useEffect } from 'react';
import UserManagement from './UserManagement';
import { Shield, Trophy, Users, ShieldAlert, PieChart, Sparkles, AlertTriangle, Briefcase, DollarSign, Flag, Settings, Megaphone, CheckCircle, XCircle, RefreshCw, ToggleLeft, ToggleRight, Send, Plus, Copy, Eye, EyeOff, Building2, Globe, Phone, Mail, Lock, Loader2, UserPlus, ChevronDown, ChevronUp, CheckSquare, Headphones } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, collection, getDocs, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

// --- Sub-panels ---

const BountyBoard = () => {
  const bounties = [
    { id: 'B001', title: 'Map 50 hidden cafés in Tokyo', reward: '500 XP', status: 'Active', claims: 12 },
    { id: 'B002', title: 'Translate 100 menu items in Vietnam', reward: '300 XP', status: 'Active', claims: 7 },
    { id: 'B003', title: 'Document 30 street art pieces in Berlin', reward: '400 XP', status: 'Completed', claims: 30 },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">Bounty Board Management</h2>
        <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl">+ New Bounty</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10 text-foreground/40 text-xs uppercase tracking-widest">
            <th className="text-left px-4 py-3">ID</th><th className="text-left px-4 py-3">Title</th><th className="text-left px-4 py-3">Reward</th><th className="text-left px-4 py-3">Claims</th><th className="text-left px-4 py-3">Status</th>
          </tr></thead>
          <tbody>{bounties.map(b => (
            <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.03]">
              <td className="px-4 py-3 font-mono text-xs text-foreground/50">{b.id}</td>
              <td className="px-4 py-3">{b.title}</td>
              <td className="px-4 py-3 text-primary font-semibold">{b.reward}</td>
              <td className="px-4 py-3">{b.claims}</td>
              <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${b.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-foreground/40'}`}>{b.status}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
};

const LocalHeroes = () => {
  const heroes = [
    { name: 'Aiko Tanaka', city: 'Kyoto', speciality: 'Tea Ceremonies', rating: 4.9, verified: true },
    { name: 'Carlos Mendez', city: 'Mexico City', speciality: 'Street Food Tours', rating: 4.8, verified: true },
    { name: 'Priya Sharma', city: 'Mumbai', speciality: 'Textile Markets', rating: 4.7, verified: false },
  ];
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold mb-4">Local Hero Verification</h2>
      {heroes.map((h, i) => (
        <div key={i} className="glass rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">{h.name} <span className="text-foreground/40 text-sm">— {h.city}</span></p>
            <p className="text-sm text-foreground/50">{h.speciality} · ⭐ {h.rating}</p>
          </div>
          <div className="flex items-center gap-2">
            {h.verified ? <span className="flex items-center gap-1 text-green-400 text-xs font-semibold"><CheckCircle className="w-4 h-4"/>Verified</span>
              : <button className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg">Verify</button>}
          </div>
        </div>
      ))}
    </div>
  );
};

const TravelersGuilds = () => {
  const guilds = [
    { name: 'The Cartographers', members: 1240, score: 10500, active: true },
    { name: 'The Gastronomes', members: 980, score: 9800, active: true },
    { name: 'The Historians', members: 760, score: 9750, active: true },
    { name: 'Night Owls', members: 340, score: 4200, active: false },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Traveler's Guilds</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {guilds.map((g, i) => (
          <div key={i} className="glass rounded-xl p-4">
            <div className="flex justify-between items-start">
              <p className="font-semibold">{g.name}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${g.active ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-foreground/40'}`}>{g.active ? 'Active' : 'Inactive'}</span>
            </div>
            <p className="text-sm text-foreground/50 mt-1">{g.members} members · {g.score.toLocaleString()} pts</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ScamAlerts = () => {
  const alerts = [
    { id: 'SA-001', type: 'Fake Tour Operator', location: 'Rome, Italy', severity: 'High', reports: 23 },
    { id: 'SA-002', type: 'ATM Skimming Device', location: 'Bangkok, Thailand', severity: 'Critical', reports: 47 },
    { id: 'SA-003', type: 'Overpriced Taxi', location: 'Paris, France', severity: 'Medium', reports: 8 },
  ];
  const sev: Record<string, string> = { Critical: 'bg-red-500/20 text-red-400', High: 'bg-orange-500/20 text-orange-400', Medium: 'bg-yellow-500/20 text-yellow-400' };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Scam Alert Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10 text-foreground/40 text-xs uppercase tracking-widest">
            <th className="text-left px-4 py-3">ID</th><th className="text-left px-4 py-3">Type</th><th className="text-left px-4 py-3">Location</th><th className="text-left px-4 py-3">Severity</th><th className="text-left px-4 py-3">Reports</th><th className="text-left px-4 py-3">Action</th>
          </tr></thead>
          <tbody>{alerts.map(a => (
            <tr key={a.id} className="border-b border-white/5 hover:bg-white/[0.03]">
              <td className="px-4 py-3 font-mono text-xs text-foreground/50">{a.id}</td>
              <td className="px-4 py-3">{a.type}</td>
              <td className="px-4 py-3 text-foreground/60">{a.location}</td>
              <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${sev[a.severity]}`}>{a.severity}</span></td>
              <td className="px-4 py-3">{a.reports}</td>
              <td className="px-4 py-3 flex gap-2">
                <button className="p-1 hover:text-green-400 transition-colors"><CheckCircle className="w-4 h-4"/></button>
                <button className="p-1 hover:text-red-400 transition-colors"><XCircle className="w-4 h-4"/></button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
};

const Analytics = () => {
  const stats = [
    { label: 'Total Users', value: '24,831', delta: '+12%' },
    { label: 'Active Sessions', value: '1,204', delta: '+5%' },
    { label: 'AI Calls Today', value: '48,920', delta: '+23%' },
    { label: 'Revenue (MTD)', value: '$18,440', delta: '+8%' },
    { label: 'Avg Session', value: '14.2 min', delta: '-2%' },
    { label: 'New Signups Today', value: '342', delta: '+31%' },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Platform Analytics</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="glass rounded-xl p-4">
            <p className="text-foreground/50 text-xs uppercase tracking-widest">{s.label}</p>
            <p className="text-2xl font-bold mt-1">{s.value}</p>
            <p className={`text-xs mt-1 font-semibold ${s.delta.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{s.delta} vs last week</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AIPerformance = () => {
  const models = [
    { name: 'Itinerary Generator', calls: 12840, avgMs: 2400, successRate: 98.2 },
    { name: 'Translation Engine', calls: 9320, avgMs: 340, successRate: 99.8 },
    { name: 'Scam Detector', calls: 4210, avgMs: 890, successRate: 97.1 },
    { name: 'Mood Synthesis', calls: 3100, avgMs: 1200, successRate: 96.5 },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">AI Model Performance</h2>
      <div className="space-y-3">
        {models.map((m, i) => (
          <div key={i} className="glass rounded-xl p-4">
            <div className="flex justify-between mb-2">
              <p className="font-semibold">{m.name}</p>
              <span className="text-green-400 text-sm font-semibold">{m.successRate}% success</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 mb-2">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: `${m.successRate}%` }} />
            </div>
            <p className="text-xs text-foreground/40">{m.calls.toLocaleString()} calls · Avg {m.avgMs}ms</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SystemLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'system_logs'), orderBy('timestamp', 'desc'), limit(100));
    
    // Subscribe to real-time logs
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedLogs = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Handle Firestore Timestamps correctly
          ts: data.timestamp?.toDate ? data.timestamp.toDate().toLocaleString() : new Date().toLocaleString()
        };
      });
      
      // Provide robust fallback mock data if the collection is empty so the UI isn't blank
      if (fetchedLogs.length === 0) {
        setLogs([
          { id: 'mock1', ts: new Date().toLocaleString(), level: 'ERROR', msg: 'Firebase auth quota exceeded for project' },
          { id: 'mock2', ts: new Date(Date.now() - 50000).toLocaleString(), level: 'WARN', msg: 'AI response latency spike: 4800ms on /itinerary endpoint' },
          { id: 'mock3', ts: new Date(Date.now() - 100000).toLocaleString(), level: 'INFO', msg: 'Scheduled user backup completed successfully' },
          { id: 'mock4', ts: new Date(Date.now() - 350000).toLocaleString(), level: 'INFO', msg: 'New partner account created: kyoto_tours_01' },
          { id: 'mock5', ts: new Date(Date.now() - 800000).toLocaleString(), level: 'ERROR', msg: 'Payment gateway timeout for txn TXN-8847' },
        ]);
      } else {
        setLogs(fetchedLogs);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching logs: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const lvl: Record<string, string> = { ERROR: 'text-red-400', WARN: 'text-yellow-400', INFO: 'text-blue-400' };

  const filteredLogs = logs.filter(l => {
    if (filter !== 'ALL' && l.level !== filter) return false;
    if (search && !l.msg.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Activity & Error Logs</h2>
        <div className="flex gap-2">
          <span className="text-xs bg-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span> Live Monitoring
          </span>
        </div>
      </div>

      <div className="flex gap-4 items-center bg-white/[0.02] p-3 rounded-xl border border-white/5">
        <input 
          type="text" 
          placeholder="Search logs by keyword..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary/60 flex-1 transition-colors"
        />
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-sm outline-none cursor-pointer focus:border-primary/60 transition-colors"
        >
          <option value="ALL">All Levels</option>
          <option value="INFO">INFO (Activity)</option>
          <option value="WARN">WARN (Warnings)</option>
          <option value="ERROR">ERROR (Failures)</option>
        </select>
      </div>

      <div className="space-y-2 font-mono text-xs overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
        {loading && logs.length === 0 ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-foreground/40 bg-white/[0.02] rounded-xl border border-white/5 border-dashed">
            <p>No logs found matching your criteria.</p>
          </div>
        ) : (
          filteredLogs.map((l) => (
            <div 
              key={l.id} 
              className="glass rounded-lg p-3 flex gap-4 hover:bg-white/[0.04] transition-colors border-l-2" 
              style={{ borderLeftColor: l.level === 'ERROR' ? '#f87171' : l.level === 'WARN' ? '#facc15' : '#60a5fa' }}
            >
              <span className="text-foreground/40 shrink-0 w-[140px] border-r border-white/10 pr-2">{l.ts}</span>
              <span className={`font-bold shrink-0 w-12 ${lvl[l.level] || 'text-white'}`}>{l.level}</span>
              <span className="text-foreground/80 break-words">{l.msg}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const BUSINESS_TYPES = ['Tour Operator','Accommodation','Restaurant / Food','Transport','Retail / Souvenirs','Wellness & Spa','Culture & Entertainment','Other'];

const generatePassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const PartnerManagement = () => {
  const [view, setView] = useState<'list' | 'enroll'>('list');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [enrolled, setEnrolled] = useState<{ email: string; password: string; name: string } | null>(null);
  const [showPwd, setShowPwd] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // Form fields
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');

  const [partners, setPartners] = useState([
    { id:'p1', name:'Kyoto Tourism Board', type:'Tour Operator', email:'kyoto@tourism.jp', contact:'Hana Sato', status:'Active', city:'Kyoto', country:'Japan', enrolled:'2026-01-15' },
    { id:'p2', name:'TokyoStay Hotels', type:'Accommodation', email:'ops@tokyostay.co.jp', contact:'Ken Mori', status:'Active', city:'Tokyo', country:'Japan', enrolled:'2026-02-03' },
    { id:'p3', name:'NomadGear Co.', type:'Retail / Souvenirs', email:'hello@nomadgear.com', contact:'Lisa Park', status:'Pending', city:'Seoul', country:'South Korea', enrolled:'2026-04-20' },
  ]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const resetForm = () => {
    setBusinessName(''); setBusinessType(''); setContactName('');
    setEmail(''); setPhone(''); setWebsite('');
    setCountry(''); setCity(''); setNotes('');
    setError(''); setEnrolled(null);
  };

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!businessName || !businessType || !email || !contactName) {
      setError('Please fill in all required fields.'); return;
    }
    const tempPassword = generatePassword();
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, tempPassword);
      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid,
        email,
        displayName: businessName,
        role: 'partner',
        businessType,
        contactName,
        phone,
        website,
        country,
        city,
        notes,
        status: 'Active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setPartners(prev => [{ id: cred.user.uid, name: businessName, type: businessType, email, contact: contactName, status: 'Active', city, country, enrolled: new Date().toISOString().slice(0,10) }, ...prev]);
      setEnrolled({ email, password: tempPassword, name: businessName });
    } catch (err: any) {
      const msgs: Record<string,string> = {
        'auth/email-already-in-use': 'A partner account with this email already exists.',
        'auth/invalid-email': 'Invalid email address.',
        'auth/weak-password': 'Password too weak (auto-generated passwords should not trigger this).',
      };
      setError(msgs[err.code] ?? err.message ?? 'Enrollment failed.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/60 transition-all placeholder:text-foreground/30';
  const labelClass = 'text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-1 block';

  if (enrolled) return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-400"/>
        </div>
        <h2 className="text-2xl font-bold">Partner Enrolled!</h2>
        <p className="text-foreground/50 mt-2">Account created for <strong className="text-white">{enrolled.name}</strong>. Share these credentials securely.</p>
      </div>
      <div className="glass rounded-2xl p-6 space-y-4 border border-white/10">
        <p className="text-sm font-semibold text-foreground/40 uppercase tracking-widest">Login Credentials</p>
        <div>
          <label className={labelClass}>Email / Username</label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono">{enrolled.email}</div>
            <button onClick={() => copyToClipboard(enrolled.email, 'email')} className="p-2.5 glass rounded-xl hover:bg-white/10 transition-colors">
              {copied === 'email' ? <CheckSquare className="w-4 h-4 text-green-400"/> : <Copy className="w-4 h-4"/>}
            </button>
          </div>
        </div>
        <div>
          <label className={labelClass}>Temporary Password</label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono tracking-widest">
              {showPwd ? enrolled.password : '•'.repeat(enrolled.password.length)}
            </div>
            <button onClick={() => setShowPwd(!showPwd)} className="p-2.5 glass rounded-xl hover:bg-white/10 transition-colors">
              {showPwd ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
            </button>
            <button onClick={() => copyToClipboard(enrolled.password, 'pwd')} className="p-2.5 glass rounded-xl hover:bg-white/10 transition-colors">
              {copied === 'pwd' ? <CheckSquare className="w-4 h-4 text-green-400"/> : <Copy className="w-4 h-4"/>}
            </button>
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-xs text-yellow-300">
          ⚠️ This password is shown only once. Share it with the partner securely and ask them to change it on first login.
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={() => { resetForm(); setView('list'); }} className="flex-1 py-3 glass border border-white/10 font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm">Back to List</button>
          <button onClick={() => { setEnrolled(null); resetForm(); }} className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors text-sm">Enroll Another</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Partner Management</h2>
          <p className="text-sm text-foreground/40 mt-1">{partners.length} enrolled partners</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setView('list')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${view==='list' ? 'bg-white/10 text-white' : 'text-foreground/40 hover:text-white'}`}>Partner List</button>
          <button onClick={() => { setView('enroll'); resetForm(); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors">
            <UserPlus className="w-4 h-4"/>Enroll Partner
          </button>
        </div>
      </div>

      {view === 'list' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/10 text-foreground/40 text-xs uppercase tracking-widest">
              <th className="text-left px-4 py-3">Business</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Contact</th>
              <th className="text-left px-4 py-3">Location</th>
              <th className="text-left px-4 py-3">Enrolled</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr></thead>
            <tbody>{partners.map((p) => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-foreground/40">{p.email}</p>
                </td>
                <td className="px-4 py-3 text-foreground/60 text-xs">{p.type}</td>
                <td className="px-4 py-3 text-foreground/60">{p.contact}</td>
                <td className="px-4 py-3 text-foreground/60 text-xs">{p.city}{p.country ? `, ${p.country}` : ''}</td>
                <td className="px-4 py-3 text-foreground/40 text-xs">{p.enrolled}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.status==='Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{p.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-xs text-primary hover:underline">Manage</button>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {view === 'enroll' && (
        <form onSubmit={handleEnroll} className="max-w-2xl space-y-5">
          <p className="text-sm text-foreground/50">Fill in the partner details. A Firebase account will be created and temporary credentials generated.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelClass}>Business Name *</label>
              <div className="relative"><Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30"/>
                <input value={businessName} onChange={e=>setBusinessName(e.target.value)} placeholder="Kyoto Tourism Board" className={inputClass + ' pl-10'}/>
              </div>
            </div>
            <div>
              <label className={labelClass}>Business Type *</label>
              <select value={businessType} onChange={e=>setBusinessType(e.target.value)} className={inputClass + ' cursor-pointer'}>
                <option value="" disabled>Select type…</option>
                {BUSINESS_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Primary Contact Name *</label>
              <div className="relative"><Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30"/>
                <input value={contactName} onChange={e=>setContactName(e.target.value)} placeholder="Jane Smith" className={inputClass + ' pl-10'}/>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Partner Email * (used for login)</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30"/>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="partner@business.com" className={inputClass + ' pl-10'}/>
              </div>
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30"/>
                <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className={inputClass + ' pl-10'}/>
              </div>
            </div>
            <div>
              <label className={labelClass}>Website</label>
              <div className="relative"><Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30"/>
                <input value={website} onChange={e=>setWebsite(e.target.value)} placeholder="https://business.com" className={inputClass + ' pl-10'}/>
              </div>
            </div>
            <div>
              <label className={labelClass}>City</label>
              <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Tokyo" className={inputClass}/>
            </div>
            <div>
              <label className={labelClass}>Country</label>
              <input value={country} onChange={e=>setCountry(e.target.value)} placeholder="Japan" className={inputClass}/>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Internal Notes</label>
              <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} placeholder="Commission rate, contract number, special terms…" className={inputClass + ' resize-none'}/>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex items-start gap-3">
            <Lock className="w-4 h-4 text-primary shrink-0 mt-0.5"/>
            <p className="text-xs text-foreground/50">A secure temporary password will be auto-generated and shown once after enrollment. The partner should change it on first login via the Partner Hub settings.</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-xl px-3 py-2">
              <XCircle className="w-4 h-4 shrink-0"/>{error}
            </div>
          )}

          <div className="flex gap-3">
            <button type="button" onClick={() => setView('list')} className="flex-1 py-3 glass border border-white/10 font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <><UserPlus className="w-4 h-4"/><span>Enroll & Generate Credentials</span></>}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const Transactions = () => {
  const txns = [
    { id: 'TXN-9901', user: 'nina@example.com', amount: '$29.99', type: 'Premium Sub', status: 'Success', date: '2026-04-28' },
    { id: 'TXN-9900', user: 'bob@example.com', amount: '$4.99', type: 'eSIM', status: 'Success', date: '2026-04-28' },
    { id: 'TXN-8847', user: 'alice@example.com', amount: '$59.00', type: 'Store', status: 'Failed', date: '2026-04-27' },
  ];
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Transaction Ledger</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/10 text-foreground/40 text-xs uppercase tracking-widest">
            <th className="text-left px-4 py-3">ID</th><th className="text-left px-4 py-3">User</th><th className="text-left px-4 py-3">Amount</th><th className="text-left px-4 py-3">Type</th><th className="text-left px-4 py-3">Status</th><th className="text-left px-4 py-3">Date</th>
          </tr></thead>
          <tbody>{txns.map((t, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.03]">
              <td className="px-4 py-3 font-mono text-xs text-foreground/50">{t.id}</td>
              <td className="px-4 py-3 text-foreground/70">{t.user}</td>
              <td className="px-4 py-3 font-semibold">{t.amount}</td>
              <td className="px-4 py-3 text-foreground/60">{t.type}</td>
              <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${t.status === 'Success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{t.status}</span></td>
              <td className="px-4 py-3 text-foreground/40">{t.date}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
};

const FeatureFlags = () => {
  const [flags, setFlags] = useState([
    { key: 'ar_wayfinding', label: 'AR Wayfinding', enabled: true },
    { key: 'ai_itinerary_v2', label: 'AI Itinerary V2', enabled: true },
    { key: 'faction_wars', label: 'Faction Wars', enabled: false },
    { key: 'dao_voting', label: 'DAO Voting', enabled: false },
    { key: 'live_translation', label: 'Live Translation', enabled: true },
  ]);
  const toggle = (key: string) => setFlags(f => f.map(fl => fl.key === key ? { ...fl, enabled: !fl.enabled } : fl));
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Feature Flags</h2>
      <div className="space-y-2">
        {flags.map(f => (
          <div key={f.key} className="glass rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{f.label}</p>
              <p className="text-xs text-foreground/40 font-mono">{f.key}</p>
            </div>
            <button onClick={() => toggle(f.key)} className={`transition-colors ${f.enabled ? 'text-green-400' : 'text-foreground/30'}`}>
              {f.enabled ? <ToggleRight className="w-8 h-8"/> : <ToggleLeft className="w-8 h-8"/>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const AIConfiguration = () => {
  const [temp, setTemp] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [model, setModel] = useState('gemini-2.0-flash');
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">AI Configuration</h2>
      <div className="space-y-6 max-w-lg">
        <div className="glass rounded-xl p-4">
          <label className="text-sm font-semibold text-foreground/60 uppercase tracking-widest">Model</label>
          <select value={model} onChange={e => setModel(e.target.value)} className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-primary">
            <option value="gemini-2.0-flash">gemini-2.0-flash</option>
            <option value="gemini-2.0-pro">gemini-2.0-pro</option>
            <option value="gemini-1.5-pro">gemini-1.5-pro</option>
          </select>
        </div>
        <div className="glass rounded-xl p-4">
          <label className="text-sm font-semibold text-foreground/60 uppercase tracking-widest">Temperature: {temp}</label>
          <input type="range" min="0" max="1" step="0.05" value={temp} onChange={e => setTemp(+e.target.value)} className="w-full mt-2 accent-primary"/>
        </div>
        <div className="glass rounded-xl p-4">
          <label className="text-sm font-semibold text-foreground/60 uppercase tracking-widest">Max Tokens: {maxTokens}</label>
          <input type="range" min="256" max="8192" step="256" value={maxTokens} onChange={e => setMaxTokens(+e.target.value)} className="w-full mt-2 accent-primary"/>
        </div>
        <button className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
          <Settings className="w-4 h-4"/> Save Configuration
        </button>
      </div>
    </div>
  );
};

const Announcements = () => {
  const [msg, setMsg] = useState('');
  const [audience, setAudience] = useState('all');
  const sent = [
    { text: 'New AR Wayfinding feature is live!', audience: 'all', date: '2026-04-25', views: 18400 },
    { text: 'Partner dashboard updated with new analytics', audience: 'partners', date: '2026-04-20', views: 342 },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Announcements</h2>
      <div className="glass rounded-xl p-4 space-y-3">
        <p className="text-sm font-semibold text-foreground/60 uppercase tracking-widest">New Announcement</p>
        <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={3} placeholder="Write your announcement..." className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-primary resize-none"/>
        <div className="flex gap-3 items-center">
          <select value={audience} onChange={e => setAudience(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg p-2 text-sm outline-none flex-1">
            <option value="all">All Users</option>
            <option value="explorers">Explorers</option>
            <option value="partners">Partners</option>
            <option value="admins">Admins</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors">
            <Send className="w-4 h-4"/> Send
          </button>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground/40 uppercase tracking-widest mb-3">Sent</p>
        {sent.map((s, i) => (
          <div key={i} className="glass rounded-xl p-4 mb-2">
            <p className="font-medium text-sm">{s.text}</p>
            <p className="text-xs text-foreground/40 mt-1">{s.audience} · {s.date} · {s.views.toLocaleString()} views</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Support Agent Management ---
const DEPARTMENTS = ['General Support', 'Billing & Payments', 'Technical Issues', 'Partner Support', 'Safety & Emergency', 'VIP Concierge'];

const SupportAgentManagement = () => {
  const [view, setView] = useState<'list' | 'enroll'>('list');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [enrolled, setEnrolled] = useState<{ email: string; password: string; name: string } | null>(null);
  const [showPwd, setShowPwd] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  const [agents, setAgents] = useState([
    { id:'a1', name:'Sarah Mitchell', email:'sarah.mitchell@aetheria-support.com', dept:'General Support', status:'Active', tickets:142, enrolled:'2026-01-10' },
    { id:'a2', name:'James Park', email:'james.park@aetheria-support.com', dept:'Billing & Payments', status:'Active', tickets:98, enrolled:'2026-02-14' },
    { id:'a3', name:'Priya Sharma', email:'priya.sharma@aetheria-support.com', dept:'Technical Issues', status:'Active', tickets:211, enrolled:'2026-03-01' },
  ]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const resetForm = () => {
    setFirstName(''); setLastName(''); setEmail('');
    setDepartment(''); setPhone(''); setEmployeeId('');
    setError(''); setEnrolled(null);
  };

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!firstName || !lastName || !email || !department) {
      setError('Please fill in all required fields.'); return;
    }
    const tempPassword = generatePassword();
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, tempPassword);
      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid,
        email,
        displayName: `${firstName} ${lastName}`,
        role: 'support',
        department,
        phone,
        employeeId,
        status: 'Active',
        ticketsResolved: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      const fullName = `${firstName} ${lastName}`;
      setAgents(prev => [{ id: cred.user.uid, name: fullName, email, dept: department, status: 'Active', tickets: 0, enrolled: new Date().toISOString().slice(0,10) }, ...prev]);
      setEnrolled({ email, password: tempPassword, name: fullName });
    } catch (err: any) {
      const msgs: Record<string,string> = {
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/invalid-email': 'Invalid email address.',
      };
      setError(msgs[err.code] ?? err.message ?? 'Enrollment failed.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent/60 transition-all placeholder:text-foreground/30';
  const labelClass = 'text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-1 block';

  if (enrolled) return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-400"/>
        </div>
        <h2 className="text-2xl font-bold">Agent Enrolled!</h2>
        <p className="text-foreground/50 mt-2">Account created for <strong className="text-white">{enrolled.name}</strong>. Share these credentials securely.</p>
      </div>
      <div className="glass rounded-2xl p-6 space-y-4 border border-white/10">
        <p className="text-sm font-semibold text-foreground/40 uppercase tracking-widest">Login Credentials</p>
        <div>
          <label className={labelClass}>Email / Username</label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono">{enrolled.email}</div>
            <button onClick={() => copyToClipboard(enrolled.email, 'email')} className="p-2.5 glass rounded-xl hover:bg-white/10 transition-colors">
              {copied === 'email' ? <CheckSquare className="w-4 h-4 text-green-400"/> : <Copy className="w-4 h-4"/>}
            </button>
          </div>
        </div>
        <div>
          <label className={labelClass}>Temporary Password</label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono tracking-widest">
              {showPwd ? enrolled.password : '•'.repeat(enrolled.password.length)}
            </div>
            <button onClick={() => setShowPwd(!showPwd)} className="p-2.5 glass rounded-xl hover:bg-white/10 transition-colors">
              {showPwd ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
            </button>
            <button onClick={() => copyToClipboard(enrolled.password, 'pwd')} className="p-2.5 glass rounded-xl hover:bg-white/10 transition-colors">
              {copied === 'pwd' ? <CheckSquare className="w-4 h-4 text-green-400"/> : <Copy className="w-4 h-4"/>}
            </button>
          </div>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-xs text-foreground/50">
          <strong className="text-white">Login URL:</strong> <span className="font-mono">/support-login</span>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-xs text-yellow-300">
          ⚠️ This password is shown only once. Share it securely and ask the agent to change it on first login.
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={() => { resetForm(); setView('list'); }} className="flex-1 py-3 glass border border-white/10 font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm">Back to List</button>
          <button onClick={() => { setEnrolled(null); resetForm(); }} className="flex-1 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-colors text-sm">Enroll Another</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Support Agent Management</h2>
          <p className="text-sm text-foreground/40 mt-1">{agents.length} active agents</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setView('list')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${view==='list' ? 'bg-white/10 text-white' : 'text-foreground/40 hover:text-white'}`}>Agent List</button>
          <button onClick={() => { setView('enroll'); resetForm(); }} className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent/90 transition-colors">
            <UserPlus className="w-4 h-4"/>Enroll Agent
          </button>
        </div>
      </div>

      {view === 'list' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/10 text-foreground/40 text-xs uppercase tracking-widest">
              <th className="text-left px-4 py-3">Agent</th>
              <th className="text-left px-4 py-3">Department</th>
              <th className="text-left px-4 py-3">Tickets Resolved</th>
              <th className="text-left px-4 py-3">Enrolled</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr></thead>
            <tbody>{agents.map(a => (
              <tr key={a.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium">{a.name}</p>
                  <p className="text-xs text-foreground/40">{a.email}</p>
                </td>
                <td className="px-4 py-3 text-foreground/60 text-xs">{a.dept}</td>
                <td className="px-4 py-3 text-foreground/60">{a.tickets}</td>
                <td className="px-4 py-3 text-foreground/40 text-xs">{a.enrolled}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${a.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{a.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-xs text-accent hover:underline">Manage</button>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {view === 'enroll' && (
        <form onSubmit={handleEnroll} className="max-w-2xl space-y-5">
          <p className="text-sm text-foreground/50">Fill in the agent details. A Firebase account will be created with <code className="bg-white/10 px-1 rounded">role: support</code> and temporary credentials generated.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>First Name *</label>
              <input value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="Sarah" className={inputClass}/>
            </div>
            <div>
              <label className={labelClass}>Last Name *</label>
              <input value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="Mitchell" className={inputClass}/>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Agent Email * (used for login)</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30"/>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="agent@aetheria-support.com" className={inputClass + ' pl-10'}/>
              </div>
            </div>
            <div>
              <label className={labelClass}>Department *</label>
              <select value={department} onChange={e=>setDepartment(e.target.value)} className={inputClass + ' cursor-pointer'}>
                <option value="" disabled>Select department…</option>
                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30"/>
                <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className={inputClass + ' pl-10'}/>
              </div>
            </div>
            <div>
              <label className={labelClass}>Employee ID</label>
              <input value={employeeId} onChange={e=>setEmployeeId(e.target.value)} placeholder="EMP-0042" className={inputClass}/>
            </div>
          </div>
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-start gap-3">
            <Headphones className="w-4 h-4 text-accent shrink-0 mt-0.5"/>
            <p className="text-xs text-foreground/50">The agent will receive <code className="bg-white/10 px-1 rounded">role: support</code> in Firestore, granting access only to the Support Desk at <code className="bg-white/10 px-1 rounded">/support-login</code>. A secure temporary password is auto-generated and shown once.</p>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-xl px-3 py-2">
              <XCircle className="w-4 h-4 shrink-0"/>{error}
            </div>
          )}
          <div className="flex gap-3">
            <button type="button" onClick={() => setView('list')} className="flex-1 py-3 glass border border-white/10 font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 py-3 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <><UserPlus className="w-4 h-4"/><span>Enroll & Generate Credentials</span></>}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

// --- Main AdminConsole ---
const AdminConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'bounty', name: 'Bounty Board', icon: Trophy },
    { id: 'heroes', name: 'Local Heroes', icon: Shield },
    { id: 'guilds', name: "Traveler's Guilds", icon: Users },
    { id: 'scams', name: 'Scam Alerts', icon: ShieldAlert },
    { id: 'analytics', name: 'Analytics', icon: PieChart },
    { id: 'ai-review', name: 'AI Performance', icon: Sparkles },
    { id: 'logs', name: 'Activity & Error Logs', icon: AlertTriangle },
    { id: 'partners', name: 'Partner Management', icon: Briefcase },
    { id: 'support-agents', name: 'Support Agents', icon: Headphones },
    { id: 'transactions', name: 'Transactions', icon: DollarSign },
    { id: 'feature-flags', name: 'Feature Flags', icon: Flag },
    { id: 'ai-config', name: 'AI Configuration', icon: Settings },
    { id: 'announcements', name: 'Announcements', icon: Megaphone },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'users': return <UserManagement />;
      case 'bounty': return <BountyBoard />;
      case 'heroes': return <LocalHeroes />;
      case 'guilds': return <TravelersGuilds />;
      case 'scams': return <ScamAlerts />;
      case 'analytics': return <Analytics />;
      case 'ai-review': return <AIPerformance />;
      case 'logs': return <SystemLogs />;
      case 'partners': return <PartnerManagement />;
      case 'support-agents': return <SupportAgentManagement />;
      case 'transactions': return <Transactions />;
      case 'feature-flags': return <FeatureFlags />;
      case 'ai-config': return <AIConfiguration />;
      case 'announcements': return <Announcements />;
      default: return null;
    }
  };

  return (
    <div className="p-4 sm:p-8 min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Admin Console</h1>
            <p className="text-foreground/40 text-sm">Aetheria Platform Management</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 shrink-0">
            <nav className="glass rounded-2xl p-3 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible sticky top-20">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all shrink-0 ${
                    activeTab === tab.id ? 'bg-primary/10 text-primary' : 'text-foreground/60 hover:bg-white/5 hover:text-white'
                  }`}>
                  <tab.icon className="w-4 h-4 shrink-0"/>
                  <span className="truncate">{tab.name}</span>
                </button>
              ))}
            </nav>
          </aside>
          <main className="flex-1 glass rounded-2xl p-6">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminConsole;
