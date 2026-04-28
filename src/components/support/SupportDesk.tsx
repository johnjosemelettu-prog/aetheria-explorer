import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones, Search, Filter, Clock, CheckCircle2, AlertCircle,
  MessageSquare, User, X, Send, ChevronRight, Tag, Inbox,
  BarChart2, RefreshCw, ArrowUpRight, Circle, XCircle, Loader2,
  StickyNote, Star, LogOut
} from 'lucide-react';
import {
  collection, query, orderBy, onSnapshot, doc,
  updateDoc, addDoc, serverTimestamp, Timestamp
} from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { signOut } from 'firebase/auth';

// ─── Types ─────────────────────────────────────────────────────────────────

type TicketStatus = 'open' | 'in_progress' | 'closed';
type Priority = 'low' | 'medium' | 'high' | 'urgent';
type Category = 'Technical' | 'Billing' | 'Booking' | 'Partnership' | 'Safety' | 'General';

interface Reply {
  id: string;
  authorName: string;
  authorRole: 'user' | 'agent';
  message: string;
  createdAt: string;
}

interface Ticket {
  id: string;
  userEmail: string;
  userName: string;
  subject: string;
  category: Category;
  message: string;
  status: TicketStatus;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
  replies: Reply[];
  agentNote?: string;
}

// ─── Mock seed data (used when Firestore is empty / offline) ────────────────

const MOCK_TICKETS: Ticket[] = [
  {
    id: 'TKT-1001', userEmail: 'alice@example.com', userName: 'Alice Chen',
    subject: 'AR Wayfinding not loading in Kyoto', category: 'Technical',
    message: 'The AR camera view just shows a black screen after the latest update. I\'m on iPhone 15 Pro, iOS 17.4.',
    status: 'open', priority: 'high',
    createdAt: '2026-04-28T06:12:00Z', updatedAt: '2026-04-28T06:12:00Z',
    replies: [],
  },
  {
    id: 'TKT-1002', userEmail: 'bob@travel.io', userName: 'Bob Martinez',
    subject: 'Charged twice for eSIM activation', category: 'Billing',
    message: 'My card was charged $4.99 twice on April 27th for the same eSIM plan. Transaction IDs: TXN-9901 and TXN-9902.',
    status: 'in_progress', priority: 'urgent',
    createdAt: '2026-04-27T14:33:00Z', updatedAt: '2026-04-28T08:00:00Z',
    replies: [
      { id: 'r1', authorName: 'Agent Sarah', authorRole: 'agent', message: 'Hi Bob, I\'ve escalated this to billing. You\'ll see the refund within 3-5 business days.', createdAt: '2026-04-28T08:00:00Z' }
    ],
  },
  {
    id: 'TKT-1003', userEmail: 'diana@nomad.co', userName: 'Diana Park',
    subject: 'AI itinerary keeps resetting', category: 'Technical',
    message: 'Every time I save my 7-day Tokyo itinerary it disappears the next day. Very frustrating!',
    status: 'open', priority: 'medium',
    createdAt: '2026-04-28T09:45:00Z', updatedAt: '2026-04-28T09:45:00Z',
    replies: [],
  },
  {
    id: 'TKT-1004', userEmail: 'sam@explore.net', userName: 'Sam Wilson',
    subject: 'How to cancel Aetheria+ subscription', category: 'Billing',
    message: 'I cannot find the cancel subscription button in settings. Where is it?',
    status: 'closed', priority: 'low',
    createdAt: '2026-04-26T11:00:00Z', updatedAt: '2026-04-27T09:15:00Z',
    replies: [
      { id: 'r2', authorName: 'Agent James', authorRole: 'agent', message: 'Hi Sam! Go to Profile → Subscription → Manage Plan → Cancel. Let me know if you need further help!', createdAt: '2026-04-26T12:00:00Z' }
    ],
  },
  {
    id: 'TKT-1005', userEmail: 'eve@world.travel', userName: 'Eve Johnson',
    subject: 'Scam Alert flagged my favourite restaurant incorrectly', category: 'General',
    message: 'The Scam Alert feature marked Kyoto Kaiseki as a scam. I have been going there for 10 years!',
    status: 'open', priority: 'medium',
    createdAt: '2026-04-28T10:20:00Z', updatedAt: '2026-04-28T10:20:00Z',
    replies: [],
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

const statusConfig: Record<TicketStatus, { label: string; color: string; icon: React.ElementType }> = {
  open:        { label: 'Open',        color: 'bg-blue-500/20 text-blue-400',   icon: Circle },
  in_progress: { label: 'In Progress', color: 'bg-yellow-500/20 text-yellow-400', icon: RefreshCw },
  closed:      { label: 'Closed',      color: 'bg-green-500/20 text-green-400', icon: CheckCircle2 },
};

const priorityConfig: Record<Priority, { color: string }> = {
  low:    { color: 'bg-gray-500/20 text-gray-400' },
  medium: { color: 'bg-blue-500/20 text-blue-400' },
  high:   { color: 'bg-orange-500/20 text-orange-400' },
  urgent: { color: 'bg-red-500/20 text-red-400' },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ─── Ticket Detail Panel ────────────────────────────────────────────────────

function TicketDetail({ ticket, onClose, onUpdate }: {
  ticket: Ticket;
  onClose: () => void;
  onUpdate: (id: string, changes: Partial<Ticket>) => void;
}) {
  const [reply, setReply] = useState('');
  const [note, setNote] = useState(ticket.agentNote ?? '');
  const [sending, setSending] = useState(false);
  const agent = auth.currentUser;

  const sendReply = async () => {
    if (!reply.trim()) return;
    setSending(true);
    const newReply: Reply = {
      id: `r${Date.now()}`,
      authorName: agent?.displayName ?? agent?.email ?? 'Agent',
      authorRole: 'agent',
      message: reply,
      createdAt: new Date().toISOString(),
    };
    const updated = { replies: [...ticket.replies, newReply], updatedAt: new Date().toISOString(), status: 'in_progress' as TicketStatus };
    onUpdate(ticket.id, updated);
    setReply('');
    setSending(false);
  };

  const changeStatus = (status: TicketStatus) => {
    onUpdate(ticket.id, { status, updatedAt: new Date().toISOString() });
  };

  const saveNote = () => {
    onUpdate(ticket.id, { agentNote: note });
  };

  const SC = statusConfig[ticket.status];
  const PC = priorityConfig[ticket.priority];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
      className="flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between p-6 border-b border-white/10">
        <div className="flex-1 min-w-0 pr-4">
          <p className="text-xs font-mono text-foreground/30 mb-1">{ticket.id}</p>
          <h2 className="text-lg font-bold leading-tight">{ticket.subject}</h2>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${SC.color}`}>
              <SC.icon className="w-3 h-3" />{SC.label}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${PC.color}`}>{ticket.priority}</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-foreground/60">{ticket.category}</span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors shrink-0">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User info */}
      <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="font-semibold text-sm">{ticket.userName}</p>
            <p className="text-xs text-foreground/40">{ticket.userEmail} · {timeAgo(ticket.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Message thread */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Original message */}
        <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-foreground/40">ORIGINAL MESSAGE</span>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">{ticket.message}</p>
        </div>

        {/* Replies */}
        {ticket.replies.map((r) => (
          <div key={r.id} className={`rounded-2xl p-4 border ${r.authorRole === 'agent' ? 'bg-accent/10 border-accent/20 ml-4' : 'bg-white/[0.03] border-white/5 mr-4'}`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold">{r.authorName}</p>
              <p className="text-xs text-foreground/30">{timeAgo(r.createdAt)}</p>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{r.message}</p>
          </div>
        ))}
      </div>

      {/* Reply box */}
      {ticket.status !== 'closed' && (
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <textarea
              value={reply}
              onChange={e => setReply(e.target.value)}
              rows={2}
              placeholder="Type a reply to the customer…"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-accent/60 resize-none placeholder:text-foreground/30"
            />
            <button
              onClick={sendReply}
              disabled={sending || !reply.trim()}
              className="px-4 py-3 bg-accent hover:bg-accent/90 text-white rounded-xl transition-colors disabled:opacity-40 self-end"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Agent note */}
      <div className="px-4 pb-3 border-t border-white/5">
        <div className="flex items-center gap-2 mt-3 mb-2">
          <StickyNote className="w-3.5 h-3.5 text-yellow-400" />
          <span className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">Internal Note</span>
        </div>
        <div className="flex gap-2">
          <input value={note} onChange={e => setNote(e.target.value)}
            placeholder="Add a private note (not visible to user)…"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-yellow-500/40 placeholder:text-foreground/30" />
          <button onClick={saveNote} className="px-3 py-2 text-xs font-semibold bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-xl transition-colors">Save</button>
        </div>
      </div>

      {/* Status actions */}
      <div className="p-4 border-t border-white/10 flex flex-wrap gap-2">
        {ticket.status !== 'in_progress' && (
          <button onClick={() => changeStatus('in_progress')}
            className="flex-1 py-2.5 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" />Mark In Progress
          </button>
        )}
        {ticket.status !== 'closed' && (
          <button onClick={() => changeStatus('closed')}
            className="flex-1 py-2.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />Close Ticket
          </button>
        )}
        {ticket.status === 'closed' && (
          <button onClick={() => changeStatus('open')}
            className="flex-1 py-2.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2">
            <ArrowUpRight className="w-4 h-4" />Reopen Ticket
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main SupportDesk ───────────────────────────────────────────────────────

export default function SupportDesk() {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [filter, setFilter] = useState<'all' | TicketStatus>('all');
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');

  // Try to load real Firestore tickets; fall back to mock data
  useEffect(() => {
    try {
      const q = query(collection(db, 'supportTickets'), orderBy('createdAt', 'desc'));
      const unsub = onSnapshot(q, snap => {
        if (!snap.empty) {
          const fetched: Ticket[] = snap.docs.map(d => ({
            id: d.id,
            ...(d.data() as Omit<Ticket, 'id'>),
          }));
          setTickets(fetched);
        }
      }, () => { /* silently use mock data on permission error */ });
      return unsub;
    } catch { /* use mock data */ }
  }, []);

  const updateTicket = async (id: string, changes: Partial<Ticket>) => {
    setTickets(ts => ts.map(t => t.id === id ? { ...t, ...changes } : t));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, ...changes } : null);
    try {
      await updateDoc(doc(db, 'supportTickets', id), { ...changes, updatedAt: serverTimestamp() });
    } catch { /* mock update only */ }
  };

  const filtered = tickets.filter(t => {
    const matchStatus = filter === 'all' || t.status === filter;
    const matchPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    const matchSearch = !search || t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.userName.toLowerCase().includes(search.toLowerCase()) ||
      t.userEmail.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchPriority && matchSearch;
  });

  const counts = {
    open: tickets.filter(t => t.status === 'open').length,
    in_progress: tickets.filter(t => t.status === 'in_progress').length,
    closed: tickets.filter(t => t.status === 'closed').length,
    urgent: tickets.filter(t => t.priority === 'urgent').length,
  };

  const handleLogout = async () => {
    sessionStorage.removeItem('supportAuthed');
    await signOut(auth);
    window.history.pushState({}, '', '/support-login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center">
            <Headphones className="text-accent w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold">Support Desk</h1>
            <p className="text-foreground/50 text-sm">
              {auth.currentUser?.email} · {counts.open} open · {counts.urgent} urgent
            </p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 glass border border-white/10 rounded-xl text-sm text-foreground/50 hover:text-white hover:bg-white/10 transition-all">
          <LogOut className="w-4 h-4" />Sign Out
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Open', value: counts.open, icon: Circle, color: 'text-blue-400', bg: 'bg-blue-500/10', key: 'open' },
          { label: 'In Progress', value: counts.in_progress, icon: RefreshCw, color: 'text-yellow-400', bg: 'bg-yellow-500/10', key: 'in_progress' },
          { label: 'Closed Today', value: counts.closed, icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10', key: 'closed' },
          { label: 'Urgent', value: counts.urgent, icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10', key: 'urgent' },
        ].map(s => (
          <button key={s.key}
            onClick={() => setFilter(s.key === 'urgent' ? 'all' : s.key as any)}
            className={`glass rounded-2xl p-4 text-left border border-white/10 hover:bg-white/5 transition-all ${filter === s.key ? 'ring-1 ring-accent/50' : ''}`}>
            <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-foreground/40 mt-0.5">{s.label}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ticket List */}
        <div className={`${selected ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search tickets…"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-accent/50" />
            </div>
            <div className="flex gap-2">
              {(['all', 'open', 'in_progress', 'closed'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${filter === f ? 'bg-accent/20 text-accent' : 'text-foreground/40 hover:text-white hover:bg-white/5'}`}>
                  {f === 'all' ? 'All' : f === 'in_progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value as any)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-accent/50 cursor-pointer text-foreground/60">
              <option value="all">All Priorities</option>
              <option value="urgent">🔴 Urgent</option>
              <option value="high">🟠 High</option>
              <option value="medium">🔵 Medium</option>
              <option value="low">⚪ Low</option>
            </select>
          </div>

          {/* List */}
          <div className="space-y-2">
            {filtered.length === 0 && (
              <div className="text-center py-16 text-foreground/30">
                <Inbox className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p>No tickets match your filters.</p>
              </div>
            )}
            {filtered.map(t => {
              const SC = statusConfig[t.status];
              const PC = priorityConfig[t.priority];
              return (
                <button key={t.id} onClick={() => setSelected(t)}
                  className={`w-full glass rounded-2xl p-4 text-left border transition-all hover:bg-white/5 ${selected?.id === t.id ? 'border-accent/50 bg-accent/5' : 'border-white/10'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${t.status === 'open' ? 'bg-blue-500/20' : t.status === 'in_progress' ? 'bg-yellow-500/20' : 'bg-green-500/20'}`}>
                      <User className={`w-4 h-4 ${t.status === 'open' ? 'text-blue-400' : t.status === 'in_progress' ? 'text-yellow-400' : 'text-green-400'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-sm truncate">{t.subject}</p>
                        <p className="text-xs text-foreground/30 shrink-0">{timeAgo(t.createdAt)}</p>
                      </div>
                      <p className="text-xs text-foreground/50 mt-0.5">{t.userName} · {t.userEmail}</p>
                      <p className="text-xs text-foreground/40 mt-1 truncate">{t.message}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${SC.color}`}>
                          <SC.icon className="w-2.5 h-2.5" />{SC.label}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${PC.color}`}>{t.priority}</span>
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/10 text-foreground/50">{t.category}</span>
                        {t.replies.length > 0 && (
                          <span className="flex items-center gap-1 text-[10px] text-foreground/30">
                            <MessageSquare className="w-2.5 h-2.5" />{t.replies.length}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-foreground/20 shrink-0 self-center" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ticket Detail */}
        <AnimatePresence>
          {selected && (
            <div className="lg:col-span-7 glass rounded-2xl border border-white/10 overflow-hidden flex flex-col max-h-[80vh] sticky top-24">
              <TicketDetail
                ticket={selected}
                onClose={() => setSelected(null)}
                onUpdate={updateTicket}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
