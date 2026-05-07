import React from 'react';
import { useTranslation } from "react-i18next";

const SplashScreen: React.FC = () => {
    const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <h1 className="text-4xl font-bold text-white">{t('auto.auto_aetheria_explorer_2448')}</h1>
    </div>
  );
};

export default SplashScreen;
