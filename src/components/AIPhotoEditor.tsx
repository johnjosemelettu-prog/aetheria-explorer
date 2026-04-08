import { useTranslation } from 'react-i18next';

export const AIPhotoEditor = () => {
  const { t } = useTranslation();

  return (
    <div className="ai-photo-editor">
      <p>{t('AI Photo Editor Feature Coming Soon!')}</p>
    </div>
  );
};
