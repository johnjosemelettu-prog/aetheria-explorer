import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Map as MapIcon, 
  Wallet, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X,
  Shield,
  Store as StoreIcon,
  Globe,
  Sparkles,
  Crown
} from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile } from '../types';
import { cn } from '../lib/utils';
import AuthModal from './AuthModal';
import { usePremiumStatus } from '../hooks/usePremiumStatus';
import CartIcon from './CartIcon';
import Cart from './Cart';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isPremium = usePremiumStatus();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          const newProfile: UserProfile = {
            uid: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || 'Explorer',
            photoURL: currentUser.photoURL || undefined,
            bio: '',
            location: '',
            role: 'explorer',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          await setDoc(docRef, {
            ...newProfile,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
          setProfile(newProfile);
        }
      } else {
        setProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    signOut(auth);
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Explore', icon: Compass, path: '/' },
    { name: 'AI Itinerary', icon: Sparkles, path: '/ai-itinerary' },
    { name: 'Digital Tailor', icon: StoreIcon, path: '/digital-tailor' },
    { name: 'Vibe Market', icon: Wallet, path: '/vibe-market' },
    { name: 'Global eSIM', icon: Globe, path: '/esim' },
    { name: 'Store', icon: StoreIcon, path: '/store' },
  ];

  if (profile?.role === 'admin') {
    navItems.push({ name: 'Admin', icon: Shield, path: '/admin' });
  }
  if (profile?.role === 'partner') {
    navItems.push({ name: 'Partner', icon: StoreIcon, path: '/vendor/dashboard' });
  }

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Compass className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-display font-bold tracking-tighter">AETHERIA</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <CartIcon onClick={() => setIsCartOpen(true)} />
                {isPremium ? (
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-bold text-sm">
                    <Crown className="w-4 h-4" />
                    <span>Premium</span>
                  </button>
                ) : (
                  <button onClick={() => navigate('/premium')} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-bold text-sm">
                    <span>Go Premium</span>
                  </button>
                )}
                <button 
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 hover:border-primary/50 transition-colors"
                >
                  <img
                    src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`}
                    alt="Profile"
                    className="w-6 h-6 rounded-full"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-sm font-bold flex items-center gap-1.5">
                    {profile?.displayName || user.displayName || 'Explorer'}
                    {isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full glass-hover text-foreground/70 hover:text-accent"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/20"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
             {user && <CartIcon onClick={() => setIsCartOpen(true)} />}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg glass-hover"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl glass-hover text-foreground/70"
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-white/5">
                {user ? (
                    <div className="space-y-2">
                         <button 
                            onClick={() => navigate('/profile')}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl glass-hover text-foreground/70"
                            > 
                                <img
                                    src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`}
                                    alt="Profile"
                                    className="w-6 h-6 rounded-full"
                                    referrerPolicy="no-referrer"
                                />
                                <span className="text-sm font-bold flex items-center gap-1.5">
                                    {profile?.displayName || user.displayName || 'Explorer'}
                                    {isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
                                </span>
                        </button>
                        {!isPremium &&  <button onClick={() => {navigate('/premium'); setIsMenuOpen(false);}} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/20 text-primary font-bold">
                           <Crown className="w-5 h-5" />
                           Go Premium
                       </button>}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl glass-hover text-accent"
                        >
                            <LogOut className="w-5 h-5" />
                            Sign Out
                        </button>
                  </div>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="w-full py-3 bg-primary text-white rounded-xl font-semibold"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </nav>
    <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
