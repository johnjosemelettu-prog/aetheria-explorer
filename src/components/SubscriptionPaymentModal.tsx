
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { X } from 'lucide-react';
import { useTranslation } from "react-i18next";

const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

interface SubscriptionPaymentModalProps {
  plan: { name: string; price: number };
  onClose: () => void;
  onSuccessfulCheckout: () => void;
}

const SubscriptionPaymentModal: React.FC<SubscriptionPaymentModalProps> = ({ plan, onClose, onSuccessfulCheckout }) => {
    const { t } = useTranslation();
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{t('auto.auto_subscription_checkou_2502')}</h2>
          <button onClick={onClose}><X /></button>
        </div>
        <div>
            <p><strong>{t('auto.auto_plan__2501')}</strong> {plan.name}</p>
            <p><strong>{t('auto.auto_price__2500')}</strong> ${plan.price}{t('auto.auto__month_2499')}</p>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={plan.price} onSuccessfulCheckout={onSuccessfulCheckout} />
        </Elements>
      </div>
    </div>
  );
};

export default SubscriptionPaymentModal;
