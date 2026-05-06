import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Store, Lock, Mail, User, ArrowRight, Loader2,
  Building2, Globe, Phone, CheckCircle, AlertCircle, KeyRound
} from 'lucide-react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider, microsoftProvider } from '../../lib/firebase';

interface PartnerLoginProps {
  onLogin: () => void;
}

type Tab = 'signin' | 'register' | 'forgot';

const features = [
  'Booking & Fulfillment Center',
  'Real-time Revenue Analytics',
  'Vibe Trend Insights',
  'AI Performance Monitoring',
  'Community Broadcast Tools',
  'Service Listing Management',
];

const PartnerLogin: React.FC<PartnerLoginProps> = ({ onLogin }) => {
  const [tab, setTab] = useState<Tab>('signin');

  // Sign In state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register state
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  // Forgot state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearMessages = () => { setError(''); setSuccess(''); };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      
      const userDocRef = doc(db, 'users', cred.user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await auth.signOut();
        setError('Partner profile not found.'); return;
      }
      const data = userDoc.data();
      if (data.role !== 'partner') {
        await auth.signOut();
        setError('Unauthorized account type.'); return;
      }
      if (data.status !== 'Active') {
        await auth.signOut();
        setError('Your account is pending approval by an administrator.'); return;
      }

      sessionStorage.setItem('partnerAuthed', '1');
      onLogin();
    } catch (err: any) {
      const msg: Record<string, string> = {
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/too-many-requests': 'Too many attempts. Please wait.',
      };
      setError(msg[err.code] ?? err.message ?? 'Sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    clearMessages();
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      
      const userDocRef = doc(db, 'users', cred.user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await auth.signOut();
        setError('No partner profile found for this Google account.'); return;
      }
      const data = userDoc.data();
      if (data.role !== 'partner') {
        await auth.signOut();
        setError('Unauthorized account type.'); return;
      }
      if (data.status !== 'Active') {
        await auth.signOut();
        setError('Your account is pending approval by an administrator.'); return;
      }

      sessionStorage.setItem('partnerAuthed', '1');
      onLogin();
    } catch (err: any) {
      setError(err.message ?? 'Google sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    clearMessages();
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, microsoftProvider);
      
      const userDocRef = doc(db, 'users', cred.user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await auth.signOut();
        setError('No partner profile found for this Microsoft account.'); return;
      }
      const data = userDoc.data();
      if (data.role !== 'partner') {
        await auth.signOut();
        setError('Unauthorized account type.'); return;
      }
      if (data.status !== 'Active') {
        await auth.signOut();
        setError('Your account is pending approval by an administrator.'); return;
      }

      sessionStorage.setItem('partnerAuthed', '1');
      onLogin();
    } catch (err: any) {
      setError(err.message ?? 'Microsoft sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    if (!regEmail || !regPassword || !businessName || !businessType) {
      setError('Please fill in all required fields.'); return;
    }
    if (regPassword !== regConfirm) { setError('Passwords do not match.'); return; }
    if (regPassword.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid,
        email: regEmail,
        displayName: businessName,
        role: 'partner',
        businessType,
        phone,
        website,
        status: 'Pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      await auth.signOut();
      setSuccess('Registration successful! Please wait for an admin to approve your account.');
      setTab('signin');
      setEmail(regEmail);
    } catch (err: any) {
      const msg: Record<string, string> = {
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/invalid-email': 'Invalid email address.',
        'auth/weak-password': 'Password is too weak.',
      };
      setError(msg[err.code] ?? err.message ?? 'Registration failed.');
    } finally {
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

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-secondary/70 focus:bg-white/[0.08] transition-all placeholder:text-foreground/30";
  const labelClass = "text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-1 block";

  return (
    <div className="min-h-screen flex">
      {/* Left Panel – Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary/20 via-background to-primary/10 flex-col justify-between p-12 border-r border-white/5">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Aetheria" className="w-9 h-9" />
          <span className="text-xl font-display font-bold tracking-tighter">AETHERIA</span>
        </div>

        <div>
          <div className="w-16 h-16 bg-secondary/20 rounded-3xl flex items-center justify-center mb-8">
            <Store className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="text-4xl font-display font-bold mb-4 leading-tight">
            Grow your travel<br />business with Aetheria
          </h2>
          <p className="text-foreground/50 mb-10 text-lg leading-relaxed">
            Join thousands of partners delivering unforgettable experiences to millions of explorers worldwide.
          </p>
          <ul className="space-y-3">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-foreground/70">
                <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-foreground/20 text-xs">© 2026 Aetheria Explorer. All rights reserved.</p>
      </div>

      {/* Right Panel – Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <img src="/logo.png" alt="Aetheria" className="w-8 h-8" />
            <span className="text-lg font-display font-bold tracking-tighter">AETHERIA Partner Hub</span>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-1 p-1 bg-white/5 rounded-2xl mb-8 border border-white/10">
            {(['signin', 'register', 'forgot'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); clearMessages(); setForgotSent(false); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  tab === t ? 'bg-secondary text-white shadow-lg' : 'text-foreground/50 hover:text-white'
                }`}
              >
                {t === 'signin' ? 'Sign In' : t === 'register' ? 'Register' : 'Reset Password'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* ─── SIGN IN ─── */}
            {tab === 'signin' && (
              <motion.form
                key="signin"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSignIn} className="space-y-4"
              >
                <div>
                  <label className={labelClass}>Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="partner@business.com" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Password</label>
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
                {success && (
                  <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 rounded-xl px-3 py-2">
                    <CheckCircle className="w-4 h-4 shrink-0" />{success}
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full py-3.5 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>}
                </button>

                <div className="relative flex items-center gap-3 py-2">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-xs text-foreground/30 uppercase tracking-widest">or</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <div className="flex flex-col gap-2">
                  <button type="button" onClick={handleGoogleSignIn} disabled={loading}
                    className="w-full py-3 glass border border-white/10 hover:bg-white/10 font-semibold rounded-xl transition-all flex items-center justify-center gap-3 text-sm disabled:opacity-60">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>
                  <button type="button" onClick={handleMicrosoftSignIn} disabled={loading}
                    className="w-full py-3 glass border border-white/10 hover:bg-white/10 font-semibold rounded-xl transition-all flex items-center justify-center gap-3 text-sm disabled:opacity-60">
                    <svg className="w-4 h-4" viewBox="0 0 21 21">
                      <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
                      <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
                      <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
                      <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
                    </svg>
                    Continue with Microsoft
                  </button>
                </div>

                <p className="text-center text-xs text-foreground/30 pt-2">
                  Don't have a partner account?{' '}
                  <button type="button" onClick={() => setTab('register')} className="text-secondary hover:underline font-semibold">Register here</button>
                </p>
              </motion.form>
            )}

            {/* ─── REGISTER ─── */}
            {tab === 'register' && (
              <motion.form
                key="register"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                onSubmit={handleRegister} className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className={labelClass}>Business Name *</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <input value={businessName} onChange={e => setBusinessName(e.target.value)}
                        placeholder="Kyoto Tourism Co." className={inputClass} />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className={labelClass}>Business Type *</label>
                    <div className="relative">
                      <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <select value={businessType} onChange={e => setBusinessType(e.target.value)}
                        className={inputClass + " appearance-none cursor-pointer"}>
                        <option value="" disabled>Select type…</option>
                        <option>Tour Operator</option>
                        <option>Accommodation</option>
                        <option>Restaurant / Food</option>
                        <option>Transport</option>
                        <option>Retail / Souvenirs</option>
                        <option>Wellness & Spa</option>
                        <option>Culture & Entertainment</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <input value={phone} onChange={e => setPhone(e.target.value)}
                        placeholder="+1 555 000" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <input value={website} onChange={e => setWebsite(e.target.value)}
                        placeholder="https://…" className={inputClass} />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className={labelClass}>Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)}
                        placeholder="partner@business.com" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <input type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)}
                        placeholder="Min 8 chars" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Confirm *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <input type="password" value={regConfirm} onChange={e => setRegConfirm(e.target.value)}
                        placeholder="Repeat password" className={inputClass} />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-xl px-3 py-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />{error}
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full py-3.5 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Create Partner Account</span><ArrowRight className="w-4 h-4" /></>}
                </button>

                <p className="text-center text-xs text-foreground/30">
                  Already have an account?{' '}
                  <button type="button" onClick={() => setTab('signin')} className="text-secondary hover:underline font-semibold">Sign in</button>
                </p>
              </motion.form>
            )}

            {/* ─── FORGOT PASSWORD ─── */}
            {tab === 'forgot' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              >
                {forgotSent ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Reset Email Sent</h3>
                    <p className="text-foreground/50 text-sm mb-6">Check your inbox at <strong className="text-white">{forgotEmail}</strong> for a password reset link.</p>
                    <button onClick={() => { setTab('signin'); setForgotSent(false); }}
                      className="text-secondary hover:underline text-sm font-semibold">Back to Sign In</button>
                  </div>
                ) : (
                  <form onSubmit={handleForgot} className="space-y-4">
                    <div className="text-center mb-6">
                      <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <KeyRound className="w-7 h-7 text-secondary" />
                      </div>
                      <p className="text-foreground/50 text-sm">Enter your partner email and we'll send a reset link.</p>
                    </div>
                    <div>
                      <label className={labelClass}>Partner Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                        <input type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                          placeholder="partner@business.com" className={inputClass} />
                      </div>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-xl px-3 py-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />{error}
                      </div>
                    )}

                    <button type="submit" disabled={loading}
                      className="w-full py-3.5 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Reset Link'}
                    </button>
                    <p className="text-center text-xs text-foreground/30">
                      <button type="button" onClick={() => setTab('signin')} className="text-secondary hover:underline font-semibold">Back to Sign In</button>
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
};

export default PartnerLogin;
