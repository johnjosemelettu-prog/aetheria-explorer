
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { FashionItem } from './DigitalTailor'; // Assuming FashionItem is exported from DigitalTailor
import { X } from 'lucide-react';
import { useTranslation } from "react-i18next";

const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

interface DigitalTailorPaymentModalProps {
  item: FashionItem;
  type: 'buy' | 'rent';
  onClose: () => void;
  onSuccessfulCheckout: () => void;
}

const DigitalTailorPaymentModal: React.FC<DigitalTailorPaymentModalProps> = ({ item, type, onClose, onSuccessfulCheckout }) => {
    const { t } = useTranslation();
  const amount = type === 'buy' ? item.price : item.price * 0.2;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{type === 'buy' ? 'Purchase' : 'Rent'} {t('auto.auto_item_1035')}</h2>
          <button onClick={onClose}><X /></button>
        </div>
        <div>
            <p><strong>{t('auto.auto_item__1034')}</strong> {item.name}</p>
            <p><strong>{t('auto.auto_price__1033')}</strong> ${amount.toFixed(2)}</p>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={amount} onSuccessfulCheckout={onSuccessfulCheckout} />
        </Elements>
      </div>
    </div>
  );
};

export default DigitalTailorPaymentModal;
