import { useState, useEffect, useCallback } from 'react';
import { db } from '../lib/firebase';
import { collection, doc, getDoc, getDocs, query, Query } from 'firebase/firestore';

export function useRead<T>(collectionName: string, docId?: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!collectionName) return;

    setLoading(true);
    setError(null);

    try {
      if (docId) {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
        const docData = docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as T : null;
        setData(docData);
      } else {
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef);
        const snapshot = await getDocs(q);
        const collectionData = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as T)
        );
        setData(collectionData as any);
      }
    } catch (err) {
      setError(err as Error);
    }

    setLoading(false);
  }, [collectionName, docId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
