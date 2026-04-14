import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const usePremiumStatus = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      setIsPremium(false);
      setLoading(false);
      return;
    }

    let isSubPremium = false;
    let isPassPremium = false;

    const subQ = query(
      collection(db, 'subscriptions'),
      where('userId', '==', auth.currentUser.uid),
      where('status', '==', 'active')
    );

    const passQ = query(
      collection(db, 'premium_passes'),
      where('userId', '==', auth.currentUser.uid),
      where('status', '==', 'active')
    );

    const unsubSub = onSnapshot(subQ, (snapshot) => {
      isSubPremium = !snapshot.empty;
      setIsPremium(isSubPremium || isPassPremium);
      setLoading(false);
    });

    const unsubPass = onSnapshot(passQ, (snapshot) => {
      const now = new Date().toISOString();
      const hasValidPass = snapshot.docs.some(doc => doc.data().expiresAt > now);
      isPassPremium = hasValidPass;
      setIsPremium(isSubPremium || isPassPremium);
      setLoading(false);
    });

    return () => {
      unsubSub();
      unsubPass();
    };
  }, []);

  return { isPremium, loading };
};
