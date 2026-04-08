import { useTranslation } from 'react-i18next';

export const FlavorDNA = () => {
  const { t } = useTranslation();

  return (
    <div className="flavor-dna">
      <p>{t('Flavor DNA Feature Coming Soon!')}</p>
    </div>
  );
};
