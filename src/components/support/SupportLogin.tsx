import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones, Mail, Lock, ArrowRight, Loader2,
  AlertCircle, KeyRound, CheckCircle
} from 'lucide-react';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, microsoftProvider } from '../../lib/firebase';
import { useTranslation } from "react-i18next";

interface SupportLoginProps {
  onLogin: () => void;
}

type Tab = 'signin' | 'forgot';

const features = [
  'Live Support Ticket Queue',
  'Real-time User Message Threads',
  'Priority & Category Filtering',
  'One-click Ticket Resolution',
  'Internal Agent Notes',
  'Performance Metrics Dashboard',
];

export default function SupportLogin({ onLogin }: SupportLoginProps) {
    const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const clearMessages = () => setError('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      // Verify role is support or admin
      const userDoc = await getDoc(doc(db, 'users', cred.user.uid));
      const role = userDoc.data()?.role;
      if (role !== 'support' && role !== 'admin') {
        await auth.signOut();
        setError('Access denied. This portal is for support agents only.');
        setLoading(false);
        return;
      }
      sessionStorage.setItem('supportAuthed', '1');
      onLogin();
    } catch (err: any) {
      const msgs: Record<string, string> = {
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/too-many-requests': 'Too many attempts. Please wait a moment.',
      };
      setError(msgs[err.code] ?? err.message ?? 'Sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    clearMessages();
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, microsoftProvider);
      const userDoc = await getDoc(doc(db, 'users', cred.user.uid));
      const role = userDoc.data()?.role;
      if (role !== 'support' && role !== 'admin') {
        await auth.signOut();
        setError('Access denied. This portal is for support agents only.');
        setLoading(false);
        return;
      }
      sessionStorage.setItem('supportAuthed', '1');
      onLogin();
    } catch (err: any) {
      setError(err.message ?? 'Microsoft sign in failed.');
      setLoading(false);
    }
  };


  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    if (!forgotEmail) { setError('Please enter your email.'); return; }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, forgotEmail);
      setForgotSent(true);
    } catch (err: any) {
      setError(err.message ?? 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-accent/60 focus:bg-white/[0.08] transition-all placeholder:text-foreground/30";

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent/20 via-background to-primary/10 flex-col justify-between p-12 border-r border-white/5">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt={t('auto.auto_aetheria_3218')} className="w-9 h-9" onError={e => (e.currentTarget.style.display='none')} />
          <span className="text-xl font-display font-bold tracking-tighter">{t('auto.auto_aetheria_3217')}</span>
        </div>
        <div>
          <div className="w-16 h-16 bg-accent/20 rounded-3xl flex items-center justify-center mb-8">
            <Headphones className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-4xl font-display font-bold mb-4 leading-tight">
            {t('auto.auto_support_agent_3216')}<br />{t('auto.auto_command_centre_3215')}
                                </h2>
          <p className="text-foreground/50 mb-10 text-lg leading-relaxed">
            {t('auto.auto_resolve_traveller_is_3214')}
                                </p>
          <ul className="space-y-3">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-foreground/70">
                <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-foreground/20 text-xs">{t('auto.auto___2026_aetheria_expl_3213')}</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Headphones className="w-6 h-6 text-accent" />
            <span className="text-lg font-display font-bold tracking-tighter">{t('auto.auto_support_agent_portal_3212')}</span>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-1 p-1 bg-white/5 rounded-2xl mb-8 border border-white/10">
            {(['signin', 'forgot'] as Tab[]).map(t => (
              <button key={t} onClick={() => { setTab(t); clearMessages(); setForgotSent(false); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === t ? 'bg-accent text-white shadow-lg' : 'text-foreground/50 hover:text-white'}`}>
                {t === 'signin' ? 'Agent Sign In' : 'Reset Password'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === 'signin' && (
              <motion.form key="signin"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-1 block">{t('auto.auto_agent_email_3211')}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder={t('auto.auto_agent_aetheria_suppo_3210')} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-1 block">{t('auto.auto_password_3209')}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••" className={inputClass} />
                  </div>
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-xl px-3 py-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />{error}
                  </div>
                )}
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>{t('auto.auto_access_support_desk_3208')}</span><ArrowRight className="w-4 h-4" /></>}
                </button>
                
                <div className="relative flex items-center gap-3 py-2">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-xs text-foreground/30 uppercase tracking-widest">{t('auto.auto_or_3207')}</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <button type="button" onClick={handleMicrosoftSignIn} disabled={loading}
                  className="w-full py-3 glass border border-white/10 hover:bg-white/10 font-semibold rounded-xl transition-all flex items-center justify-center gap-3 text-sm disabled:opacity-60">
                  <svg className="w-4 h-4" viewBox="0 0 21 21">
                    <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                    <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                    <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                    <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
                  </svg>
                  {t('auto.auto_continue_with_micros_3206')}
                                                  </button>
                <p className="text-center text-xs text-foreground/30 pt-1">
                  {t('auto.auto_forgot_password__3205')}{' '}
                  <button type="button" onClick={() => setTab('forgot')} className="text-accent hover:underline font-semibold">{t('auto.auto_reset_it_3204')}</button>
                </p>
              </motion.form>
            )}

            {tab === 'forgot' && (
              <motion.div key="forgot"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {forgotSent ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t('auto.auto_reset_email_sent_3203')}</h3>
                    <p className="text-foreground/50 text-sm mb-6">{t('auto.auto_check_your_inbox_at_3202')} <strong className="text-white">{forgotEmail}</strong>.</p>
                    <button onClick={() => { setTab('signin'); setForgotSent(false); }}
                      className="text-accent hover:underline text-sm font-semibold">{t('auto.auto_back_to_sign_in_3201')}</button>
                  </div>
                ) : (
                  <form onSubmit={handleForgot} className="space-y-4">
                    <div className="text-center mb-6">
                      <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <KeyRound className="w-7 h-7 text-accent" />
                      </div>
                      <p className="text-foreground/50 text-sm">{t('auto.auto_enter_your_agent_ema_3200')}</p>
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <input type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                        placeholder={t('auto.auto_agent_aetheria_suppo_3199')} className={inputClass} />
                    </div>
                    {error && (
                      <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-xl px-3 py-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />{error}
                      </div>
                    )}
                    <button type="submit" disabled={loading}
                      className="w-full py-3.5 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Reset Link'}
                    </button>
                    <p className="text-center text-xs">
                      <button type="button" onClick={() => setTab('signin')} className="text-accent hover:underline font-semibold">{t('auto.auto_back_to_sign_in_3198')}</button>
                    </p>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
