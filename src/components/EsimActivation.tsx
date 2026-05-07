
import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import EsimPaymentModal from './EsimPaymentModal';
import { useTranslation } from "react-i18next";

const EsimActivation: React.FC = () => {
    const { t } = useTranslation();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: 'Global Roaming', price: 45 });

  const handleSuccessfulCheckout = () => {
    setShowPaymentModal(false);
    alert('eSIM activated successfully!');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 glass rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Globe /> {t('auto.auto_esim_activation_1188')}</h2>
      <div className="mb-4">
        <p><strong>{t('auto.auto_plan__1187')}</strong> {selectedPlan.name}</p>
        <p><strong>{t('auto.auto_price__1186')}</strong> ${selectedPlan.price}</p>
      </div>
      <button onClick={() => setShowPaymentModal(true)} className="w-full bg-primary text-white py-3 rounded-lg font-bold">{t('auto.auto_activate_now_1185')}</button>
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

export default EsimActivation;
