import { useTranslation } from 'react-i18next';
import { usePremiumStatus } from '../hooks/usePremiumStatus';

export const SubscriptionManager = () => {
  const { t } = useTranslation();
  const isPremium = usePremiumStatus();

  return (
    <div className="subscription-manager">
      <h2>{t('Subscription Status')}</h2>
      <p>{isPremium ? t('You are a premium user.') : t('You are on the free plan.')}</p>
      {/* Add subscription management UI here */}
    </div>
  );
};

export default SubscriptionManager;