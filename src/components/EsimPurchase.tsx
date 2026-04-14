import React, { useState } from 'react';
import EsimPaymentModal from './EsimPaymentModal';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc, runTransaction } from 'firebase/firestore';

const EsimPurchase: React.FC = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: 'Global Roaming', price: 45, dataLimit: 20 });
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = () => {
    if (!auth.currentUser) {
      alert('Please sign in to purchase an eSIM.');
      return;
    }
    setShowPaymentModal(true);
  };

  const handleConfirmPurchase = async () => {
    if (!auth.currentUser) return;
    setIsProcessing(true);

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      
      await runTransaction(db, async (transaction) => {
        const userSnap = await transaction.get(userRef);
        if (!userSnap.exists()) {
          throw "User does not exist!";
        }

        const currentBalance = userSnap.data().walletBalance || 0;
        const cost = selectedPlan.price;

        if (currentBalance < cost) {
          throw 'Insufficient funds in Smart Wallet. Please top up to purchase.';
        }

        // 1. Update wallet balance
        transaction.update(userRef, { walletBalance: currentBalance - cost });

        // 2. Create a transaction record
        const transactionRef = collection(db, 'transactions');
        addDoc(transactionRef, {
            userId: auth.currentUser.uid,
            amount: cost,
            type: 'debit',
            description: `eSIM Purchase: ${selectedPlan.name}`,
            category: 'esim',
            timestamp: serverTimestamp(),
            status: 'completed'
        });
        
        // 3. Add the new eSIM to the user's profile
        const esimRef = collection(db, 'esims');
        addDoc(esimRef, {
            userId: auth.currentUser.uid,
            country: selectedPlan.name,
            dataLimit: selectedPlan.dataLimit,
            dataUsed: 0,
            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'active',
            createdAt: serverTimestamp()
        });
      });

      alert('eSIM purchased successfully! Ready for activation.');
      setShowPaymentModal(false);

    } catch (error: any) {
      console.error('eSIM Purchase failed:', error);
      alert(`Purchase failed: ${error.toString()}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <button onClick={handlePurchase} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:scale-105 transition-transform">
        Purchase eSIM
      </button>
      
      {showPaymentModal && (
        <EsimPaymentModal
          country={selectedPlan.name}
          price={selectedPlan.price}
          onClose={() => setShowPaymentModal(false)}
          onConfirm={handleConfirmPurchase}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
};

export default EsimPurchase;
