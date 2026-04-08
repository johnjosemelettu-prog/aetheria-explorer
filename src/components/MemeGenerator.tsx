import { useTranslation } from 'react-i18next';

export const MemeGenerator = () => {
  const { t } = useTranslation();

  return (
    <div className="meme-generator">
      <p>{t('Meme Generator Feature Coming Soon!')}</p>
    </div>
  );
};
