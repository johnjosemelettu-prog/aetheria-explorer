
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { X } from 'lucide-react';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

interface EsimPaymentModalProps {
  plan: { name: string; price: number };
  onClose: () => void;
  onSuccessfulCheckout: () => void;
}

const EsimPaymentModal: React.FC<EsimPaymentModalProps> = ({ plan, onClose, onSuccessfulCheckout }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">eSIM Activation</h2>
          <button onClick={onClose}><X /></button>
        </div>
        <div>
            <p><strong>Plan:</strong> {plan.name}</p>
            <p><strong>Price:</strong> ${plan.price}</p>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={plan.price} onSuccessfulCheckout={onSuccessfulCheckout} />
        </Elements>
      </div>
    </div>
  );
};

export default EsimPaymentModal;
