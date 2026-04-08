import { useTranslation } from 'react-i18next';

export const VibeTrends = () => {
  const { t } = useTranslation();

  return (
    <div className="vibe-trends">
      <p>{t('Vibe Trends Feature Coming Soon!')}</p>
    </div>
  );
};

export default VibeTrends;