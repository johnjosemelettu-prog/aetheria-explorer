import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { PremiumPass } from '../types';
import { User } from 'firebase/auth';

export const usePremiumStatus = () => {
  const [hasPremiumSub, setHasPremiumSub] = useState(false);
  const [hasActivePass, setHasActivePass] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(() => auth.currentUser);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      setHasPremiumSub(false);
      setHasActivePass(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    let subsLoaded = false;
    let passesLoaded = false;
    const checkLoading = () => {
      if (subsLoaded && passesLoaded) setLoading(false);
    };

    // Check for active premium subscription
    const subsQuery = query(
      collection(db, 'subscriptions'),
      where('userId', '==', user.uid),
      where('status', '==', 'active'),
      where('tier', '==', 'premium')
    );
    const unsubscribeSubs = onSnapshot(subsQuery, (snapshot) => {
      setHasPremiumSub(!snapshot.empty);
      subsLoaded = true;
      checkLoading();
    });

    // Check for active premium pass from a booking
    const passQuery = query(
      collection(db, 'premiumPasses'),
      where('userId', '==', user.uid),
      where('status', '==', 'active')
    );
    const unsubscribePasses = onSnapshot(passQuery, (snapshot) => {
      let activePassFound = false;
      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          const pass = doc.data() as PremiumPass;
          if (pass.expiresAt && new Date(pass.expiresAt).getTime() > new Date().getTime()) {
            activePassFound = true;
          }
        });
      }
      setHasActivePass(activePassFound);
      passesLoaded = true;
      checkLoading();
    });

    return () => {
      unsubscribeSubs();
      unsubscribePasses();
    };
  }, [user]);

  return { isPremium: hasPremiumSub || hasActivePass, loading };
};
