import { useTranslation } from 'react-i18next';

export const Vibe = () => {
  const { t } = useTranslation();

  return (
    <div className="vibe">
      <p>{t('Vibe Feature Coming Soon!')}</p>
    </div>
  );
};

export default Vibe;