import { useTranslation } from 'react-i18next';

export const VibeRecommender = () => {
  const { t } = useTranslation();

  return (
    <div className="vibe-recommender">
      <p>{t('Vibe Recommender Feature Coming Soon!')}</p>
    </div>
  );
};
