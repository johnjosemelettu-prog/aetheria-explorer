
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import SubscriptionPaymentModal from './SubscriptionPaymentModal';

const SubscriptionCheckout: React.FC = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: 'Pro Plan', price: 20 });

  const handleSuccessfulCheckout = () => {
    setShowPaymentModal(false);
    alert('Subscription successful!');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 glass rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Star /> Subscription</h2>
      <div className="mb-4">
        <p><strong>Plan:</strong> {selectedPlan.name}</p>
        <p><strong>Price:</strong> ${selectedPlan.price}/month</p>
      </div>
      <button onClick={() => setShowPaymentModal(true)} className="w-full bg-primary text-white py-3 rounded-lg font-bold">Subscribe Now</button>
      {showPaymentModal && (
        <SubscriptionPaymentModal 
            plan={selectedPlan} 
            onClose={() => setShowPaymentModal(false)} 
            onSuccessfulCheckout={handleSuccessfulCheckout} 
        />
      )}
    </div>
  );
};

export default SubscriptionCheckout;
