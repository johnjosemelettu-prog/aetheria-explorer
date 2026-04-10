
import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { suggestActivityBasedOnBioData } from '../services/gemini';

// Mock function to get health data
const getMockHealthData = async () => {
    // In a real app, this would connect to a health data API (e.g., HealthKit, Google Fit)
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        heartRate: Math.floor(Math.random() * 40) + 60, // 60-100 bpm
        energyLevel: Math.random(), // 0.0 - 1.0
        hydrationLevel: Math.random(), // 0.0 - 1.0
        sleepHours: Math.floor(Math.random() * 5) + 4, // 4-9 hours
    };
};

const BioDataMonitor = () => {
    const [lastSuggestion, setLastSuggestion] = useState<string | null>(null);

    useEffect(() => {
        if (!auth.currentUser) return;

        const monitorBioData = async () => {
            const bioData = await getMockHealthData();
            console.log("Bio-data updated:", bioData);

            const suggestion = await suggestActivityBasedOnBioData(bioData);
            
            if (suggestion && suggestion !== lastSuggestion) {
                if (window.confirm(`Bio-data insight: ${suggestion}. Would you like to adjust your plans?`)) {
                    // In a real app, you would then trigger a function to find and apply a suitable activity.
                    alert("Great! Looking for a suitable activity to add to your itinerary.");
                }
                setLastSuggestion(suggestion);
            }
        };

        const intervalId = setInterval(monitorBioData, 600000); // Check every 10 minutes

        monitorBioData();

        return () => clearInterval(intervalId);
    }, [lastSuggestion]);

    return null;
};

export default BioDataMonitor;
