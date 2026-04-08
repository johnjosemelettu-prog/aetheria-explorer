import { useTranslation } from 'react-i18next';

export const LandmarkLens = () => {
  const { t } = useTranslation();

  return (
    <div className="landmark-lens">
      <p>{t('Landmark Lens Feature Coming Soon!')}</p>
    </div>
  );
};

export default LandmarkLens;