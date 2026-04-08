import { useTranslation } from 'react-i18next';

export const SynthesisIntel = () => {
  const { t } = useTranslation();

  return (
    <div className="synthesis-intel">
      <p>{t('Synthesis Intel Feature Coming Soon!')}</p>
    </div>
  );
};
