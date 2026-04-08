import { useState, useCallback } from 'react';
import { db } from '../lib/firebase';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';

export type WriteType = 'add' | 'update' | 'delete' | 'batch';

export interface BatchOperation {
  type: 'update' | 'delete' | 'add';
  collectionName: string;
  docId?: string;
  data?: any;
}

export const useWrite = <T extends { id?: string }>(collectionName: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const write = useCallback(
    async (type: WriteType, data: T, docId?: string, batchOperations?: BatchOperation[]) => {
      setLoading(true);
      setError(null);
      try {
        let res: any;
        const collectionRef = collection(db, collectionName);

        const dataWithTimestamp = {
          ...data,
          updatedAt: serverTimestamp(),
        };

        switch (type) {
          case 'add':
            res = await addDoc(collectionRef, {
                ...data,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            break;
          case 'update':
            if (!docId) throw new Error('docId is required for update');
            const docRef = doc(db, collectionName, docId);
            await updateDoc(docRef, dataWithTimestamp);
            res = { id: docId };
            break;
          case 'delete':
            if (!docId) throw new Error('docId is required for delete');
            await deleteDoc(doc(db, collectionName, docId));
            break;
          case 'batch':
            if (!batchOperations) throw new Error('batchOperations is required for batch write');
            const batch = writeBatch(db);
            batchOperations.forEach((op) => {
              const opRef = op.docId ? doc(db, op.collectionName, op.docId) : doc(collection(db, op.collectionName));
              switch (op.type) {
                case 'add':
                  batch.set(opRef, { ...op.data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
                  break;
                case 'update':
                  batch.update(opRef, { ...op.data, updatedAt: serverTimestamp() });
                  break;
                case 'delete':
                  batch.delete(opRef);
                  break;
              }
            });
            await batch.commit();
            break;
          default:
            throw new Error(`Unsupported write type: ${type}`);
        }

        setLoading(false);
        return res;
      } catch (e: any) {
        setError(e);
        setLoading(false);
        throw e;
      }
    },
    [collectionName]
  );

  return { write, loading, error };
};
