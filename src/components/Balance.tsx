
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRead } from '../hooks/useRead';

interface UserProfile {
    balance: number;
}

const Balance: React.FC = () => {
    const user = useAuth();
    const { data: userProfile, loading } = useRead<UserProfile>('users', user?.uid);

    if (loading) {
        return <div>Loading balance...</div>;
    }

    return (
        <div>
            <h3 className="font-bold">Your Balance:</h3>
            <p>{userProfile?.balance ?? 0}</p>
        </div>
    );
};

export default Balance;
