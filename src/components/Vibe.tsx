
import React from 'react';
import { Button } from './ui/button';
import { useAuth } from '../hooks/useAuth';
import { useWrite } from '../hooks/useWrite';
import { useRead } from '../hooks/useRead';

interface VibeData {
    id: string;
    name: string;
    description: string;
    price: number;
}

interface VibeProps {
    vibe: VibeData;
}

interface UserProfile {
    id: string;
    balance: number;
    vibes: string[];
}

interface UserProfileWrite {
    id?: string;
    balance?: number;
    vibes?: string[];
}

const Vibe: React.FC<VibeProps> = ({ vibe }) => {
    const user = useAuth();
    const { write } = useWrite<UserProfileWrite>('users');
    const { data: userProfile, refetch } = useRead<UserProfile>('users', user?.uid);

    const handleBuy = async () => {
        if (!user || !userProfile) return;

        if (userProfile.balance >= vibe.price) {
            const newBalance = userProfile.balance - vibe.price;
            const newVibes = [...(userProfile.vibes || []), vibe.id];

            await write(
                'update',
                { balance: newBalance, vibes: newVibes },
                user.uid
            );
            refetch();
        }
    };

    return (
        <div className="flex items-center justify-between p-2 border-b">
            <div>
                <p className="font-bold">{vibe.name}</p>
                <p>{vibe.description}</p>
                <p>Price: {vibe.price}</p>
            </div>
            <Button onClick={handleBuy} disabled={!user || !userProfile || userProfile.balance < vibe.price}>
                Buy
            </Button>
        </div>
    );
};

export default Vibe;
