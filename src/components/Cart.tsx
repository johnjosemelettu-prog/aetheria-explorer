import React from 'react';
import { useCart } from '../hooks/useCart';
import { useTranslation } from 'react-i18next';
import { X, Trash2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { items, removeFromCart, clearCart } = useCart();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  const handleSuccessfulCheckout = () => {
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-background w-full max-w-md h-full p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display font-bold">{t('Your Cart')}</h2>
          <button onClick={onClose}><X className="w-6 h-6" /></button>
        </div>

        {items.length === 0 ? (
          <div className="flex-grow flex items-center justify-center text-center">
            <p className="text-foreground/60">{t('Your cart is empty.')}</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto -mr-6 pr-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 mb-4">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-grow">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-foreground/60">${item.price} x {item.quantity}</p>
                </div>
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)}><Trash2 className="w-4 h-4 text-red-500" /></button>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="border-t border-white/10 pt-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-bold">{t('Subtotal')}</p>
              <p className="text-lg font-bold">${subtotal.toFixed(2)}</p>
            </div>
            <Elements stripe={stripePromise}>
              <CheckoutForm amount={subtotal} onSuccessfulCheckout={handleSuccessfulCheckout} />
            </Elements>
             <button onClick={clearCart} className="w-full mt-2 text-sm text-foreground/50 hover:text-red-500">{t('Clear Cart')}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
