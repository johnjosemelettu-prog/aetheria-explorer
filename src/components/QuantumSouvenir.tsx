
import React, { useState, useEffect } from 'react';
import { fetchEntangledData } from '../services/gemini';

interface QuantumSouvenirProps {
    souvenirId: string;
    baseImageUrl: string;
    location: string; // e.g. "Paris, France"
}

const QuantumSouvenir: React.FC<QuantumSouvenirProps> = ({ souvenirId, baseImageUrl, location }) => {
    const [entangledState, setEntangledState] = useState<any>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    useEffect(() => {
        const updateSouvenir = async () => {
            const data = await fetchEntangledData(location);
            setEntangledState(data);
            setLastUpdate(new Date());
        };

        const intervalId = setInterval(updateSouvenir, 300000); // Update every 5 minutes

        updateSouvenir();

        return () => clearInterval(intervalId);
    }, [location]);

    const getWeatherOverlay = () => {
        if (!entangledState) return null;

        switch (entangledState.weather) {
            case 'Rain':
                return <div className="absolute inset-0 bg-blue-500/20 backdrop-filter backdrop-blur-sm" />;
            case 'Snow':
                return <div className="absolute inset-0 bg-white/30 backdrop-filter backdrop-blur-sm" />;
            case 'Sunny':
                return <div className="absolute inset-0 bg-yellow-300/10" />;
            default:
                return null;
        }
    };

    return (
        <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-lg m-4 border border-white/10">
            <img src={baseImageUrl} alt="Quantum Souvenir" className="w-full h-full object-cover" />
            {getWeatherOverlay()}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-md">
                <h3 className="text-white font-bold">Digital Souvenir</h3>
                <p className="text-gray-300 text-sm">Entangled with {location}</p>
                {entangledState && (
                    <p className="text-gray-400 text-xs mt-2">_Real-time weather: {entangledState.weather}_</p>
                )}
                 {lastUpdate && (
                    <p className="text-gray-500 text-xs mt-1">_Last updated: {lastUpdate.toLocaleTimeString()}_</p>
                )}
            </div>
        </div>
    );
};

export default QuantumSouvenir;
