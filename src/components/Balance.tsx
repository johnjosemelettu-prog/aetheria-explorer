
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRead } from '../hooks/useRead';
import { useTranslation } from "react-i18next";

interface UserProfile {
    balance: number;
}

const Balance: React.FC = () => {
    const { t } = useTranslation();
    const user = useAuth();
    const { data: userProfile, loading } = useRead<UserProfile>('users', user?.uid);

    if (loading) {
        return <div>{t('auto.auto_loading_balance____591')}</div>;
    }

    return (
        <div>
            <h3 className="font-bold">{t('auto.auto_your_balance__590')}</h3>
            <p>{userProfile?.balance ?? 0}</p>
        </div>
    );
};

export default Balance;
