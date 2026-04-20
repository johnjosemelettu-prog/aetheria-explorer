import React from 'react';
import { usePremiumStatus } from '../hooks/usePremiumStatus';

interface PremiumFeatureWrapperProps {
  children: React.ReactNode;
}

export const PremiumFeatureWrapper: React.FC<PremiumFeatureWrapperProps> = ({ children }) => {
  const { isPremium } = usePremiumStatus();

  if (!isPremium) {
    return (
      <div className="p-4 my-4 text-center bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold">Premium Feature</h2>
        <p>This feature is only available to premium users.</p>
      </div>
    );
  }

  return <>{children}</>;
};
