
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/firebase';
import { doc, getDoc, runTransaction } from 'firebase/firestore';
import { X } from 'lucide-react';

interface PaymentModalProps {
  product: Product;
  onClose: () => void;
}

const exchangeRates: { [key: string]: number } = {
  USD: 1,
  EUR: 0.92,
  JPY: 157.72,
  GBP: 0.79,
  AUD: 1.51,
};

const PaymentModal: React.FC<PaymentModalProps> = ({ product, onClose }) => {
  const user = useAuth();
  const [wallet, setWallet] = useState<{ balance: number; currency: string } | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchWallet = async () => {
      if (!user) return;
      const walletRef = doc(db, 'wallets', user.uid);
      const walletSnap = await getDoc(walletRef);
      if (walletSnap.exists()) {
        const walletData = walletSnap.data() as { balance: number; currency: string };
        setWallet(walletData);
        const rate = exchangeRates[walletData.currency] || 1;
        setConvertedAmount(product.price * rate);
      } else {
        setStatus('No wallet found.');
      }
    };
    fetchWallet();
  }, [user, product.price]);

  const handlePayment = async () => {
    if (!user || !wallet || convertedAmount === null) {
      setStatus('Error: Missing user, wallet, or amount.');
      return;
    }

    if (wallet.balance < convertedAmount) {
      setStatus('Insufficient funds.');
      return;
    }

    try {
      await runTransaction(db, async (transaction) => {
        const walletRef = doc(db, 'wallets', user.uid);
        const walletDoc = await transaction.get(walletRef);
        if (!walletDoc.exists()) {
          throw new Error('Wallet does not exist!');
        }

        const newBalance = walletDoc.data().balance - convertedAmount;
        transaction.update(walletRef, { balance: newBalance });

        const orderRef = doc(db, 'orders', `${user.uid}-${Date.now()}`);
        transaction.set(orderRef, {
          userId: user.uid,
          productId: product.id,
          amount: convertedAmount,
          currency: wallet.currency,
          date: new Date(),
        });
      });

      setStatus('Payment successful!');
      setTimeout(onClose, 2000);
    } catch (error) {
      setStatus(`Payment failed: ${error}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Pay with Wallet</h2>
          <button onClick={onClose}><X /></button>
        </div>
        {wallet && convertedAmount !== null ? (
          <div>
            <p className="mb-2">Product: {product.name}</p>
            <p className="mb-2">Price: ${product.price.toFixed(2)} USD</p>
            <p className="mb-4">Your wallet: {wallet.balance.toFixed(2)} {wallet.currency}</p>
            <p className="text-lg font-bold mb-4">
              Converted: {convertedAmount.toFixed(2)} {wallet.currency}
            </p>
            <button
              onClick={handlePayment}
              className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold"
            >
              Confirm Payment
            </button>
          </div>
        ) : (
          <p>Loading wallet...</p>
        )}
        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </div>
  );
};

export default PaymentModal;
