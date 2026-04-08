import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, doc, onSnapshot, query, Query } from 'firebase/firestore';

export function useListen<T>(collectionName: string, docId?: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!collectionName) return;

    setLoading(true);
    let unsubscribe: () => void;

    if (docId) {
      const docRef = doc(db, collectionName, docId);
      unsubscribe = onSnapshot(docRef, (doc) => {
        const docData = doc.exists() ? { id: doc.id, ...doc.data() } as T : null;
        setData(docData);
        setLoading(false);
      });
    } else {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef);
      unsubscribe = onSnapshot(q, (snapshot) => {
        const collectionData = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as T)
        );
        setData(collectionData as any);
        setLoading(false);
      });
    }

    return () => unsubscribe();
  }, [collectionName, docId]);

  return { data, loading };
}
