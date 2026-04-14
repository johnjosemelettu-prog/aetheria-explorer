
import React, { useState } from 'react';
import EsimPaymentModal from './EsimPaymentModal';

const EsimPurchase: React.FC = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: 'Global Roaming', price: 45 });

  const handlePurchase = () => {
    setShowPaymentModal(true);
  };

  const handleSuccessfulCheckout = () => {
    setShowPaymentModal(false);
    // Add logic to provision the eSIM after successful purchase
    alert('eSIM purchased successfully! Ready for activation.');
  };

  return (
    <div>
      <button onClick={handlePurchase}>Purchase eSIM</button>
      {showPaymentModal && (
        <EsimPaymentModal 
          plan={selectedPlan} 
          onClose={() => setShowPaymentModal(false)} 
          onSuccessfulCheckout={handleSuccessfulCheckout} 
        />
      )}
    </div>
  );
};

export default EsimPurchase;
