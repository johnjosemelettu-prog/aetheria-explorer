
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

const WalletTopUp: React.FC = () => {
  const [amount, setAmount] = useState(50);
  const [showCheckout, setShowCheckout] = useState(false);
  const user = useAuth();

  const handleSuccessfulCheckout = async () => {
    if (!user) return;

    const walletRef = doc(db, 'wallets', user.uid);
    await updateDoc(walletRef, { balance: increment(amount) });

    setShowCheckout(false);
    alert('Top-up successful!');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 glass rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Wallet Top-up</h2>
      {!showCheckout ? (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Amount (USD)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <button onClick={() => setShowCheckout(true)} className="w-full bg-primary text-white py-3 rounded-lg font-bold">Proceed to Payment</button>
        </>
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={amount} onSuccessfulCheckout={handleSuccessfulCheckout} />
        </Elements>
      )}
    </div>
  );
};

export default WalletTopUp;
