import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth'; // Assuming you have a useAuth hook
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, Timestamp, doc, updateDoc } from 'firebase/firestore';

export const usePremiumPass = (bookingId: string | null) => {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useAuth(); // Your custom hook to get the current user

  useEffect(() => {
    if (!user || !bookingId) {
      setIsPremium(false);
      setLoading(false);
      return;
    }

    const checkPremiumStatus = async () => {
      try {
        setLoading(true);
        const passesRef = collection(db, 'premium_passes');
        const q = query(
          passesRef,
          where('userId', '==', user.uid),
          where('bookingId', '==', bookingId),
          where('status', '==', 'active')
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const passDoc = querySnapshot.docs[0];
          const pass = passDoc.data();
          const now = Timestamp.now();
          if (pass.expiresAt && pass.expiresAt > now) {
            setIsPremium(true);
          } else {
            // Handle expired passes, e.g., update their status
            const passDocRef = doc(db, 'premium_passes', passDoc.id);
            await updateDoc(passDocRef, { status: 'expired' });
            setIsPremium(false);
          }
        } else {
          setIsPremium(false);
        }
      } catch (error) {
        console.error("Error checking premium status:", error);
        setIsPremium(false);
      } finally {
        setLoading(false);
      }
    };

    checkPremiumStatus();
  }, [user, bookingId]);

  return { isPremium, loading };
};
