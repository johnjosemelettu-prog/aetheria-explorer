import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Subscription } from '../types';

export const usePremiumStatus = () => {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      const q = query(
        collection(db, 'subscriptions'),
        where('userId', '==', auth.currentUser.uid),
        where('status', '==', 'active')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setIsPremium(!snapshot.empty);
      });

      return () => unsubscribe();
    }
  }, []);

  return isPremium;
};
