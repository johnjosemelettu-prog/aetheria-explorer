
import React from 'react';
import QuantumSouvenir from '../components/QuantumSouvenir';

const QuantumSouvenirPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h1 className="text-4xl font-bold tracking-tight text-center mb-12">Quantum Entanglement Souvenirs</h1>
            <p className="text-center text-lg text-gray-400 mb-16">A digital souvenir that is "entangled" with its real-world location. When the weather changes at the real location, the digital souvenir changes too, no matter where you are.</p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
                <QuantumSouvenir 
                    souvenirId="paris001"
                    baseImageUrl="/souvenirs/eiffel-tower.webp"
                    location="Paris, France"
                />
                 <QuantumSouvenir 
                    souvenirId="kyoto001"
                    baseImageUrl="/souvenirs/kyoto-pagoda.webp"
                    location="Kyoto, Japan"
                />
            </div>
        </div>
    );
};

export default QuantumSouvenirPage;
