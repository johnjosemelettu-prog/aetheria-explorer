import React from 'react';
import { useRead } from '../hooks/useRead';
import { UserProfile as UserProfileType } from '../types';
import { useTranslation } from 'react-i18next';

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const { data: userProfile, loading, error } = useRead<UserProfileType>('users', userId);
  const { t } = useTranslation();

  if (loading) {
    return <div>{t('Loading Profile...')}</div>;
  }

  if (error) {
    return <div>{t('Error:')} {error.message}</div>;
  }

  if (!userProfile) {
    return <div>{t('User not found.')}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{userProfile.displayName}</h1>
      <p>{userProfile.email}</p>
      <p>{userProfile.bio}</p>
    </div>
  );
};

export default UserProfile;
