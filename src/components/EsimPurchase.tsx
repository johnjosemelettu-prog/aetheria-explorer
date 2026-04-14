import React, { useState } from 'react';
import EsimPaymentModal from './EsimPaymentModal';

const EsimPurchase: React.FC = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: 'Global Roaming', price: 45 });
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = () => {
    setShowPaymentModal(true);
  };

  const handleConfirmPurchase = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(false);
      alert('eSIM purchased successfully! Ready for activation.');
    }, 2000);
  };

  return (
    <div>
      <button onClick={handlePurchase}>Purchase eSIM</button>
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
