
import { useState, useEffect } from 'react';
import { doc, updateDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { adaptItineraryToWeather, synthesizeWeather } from '../services/gemini';
import { Itinerary } from '../types';

const WeatherAdaptiveController = () => {
    const [activeItinerary, setActiveItinerary] = useState<Itinerary | null>(null);
    const [itineraryId, setItineraryId] = useState<string | null>(null);
    const [lastWeather, setLastWeather] = useState<any>(null);

    useEffect(() => {
        const findActiveItinerary = async () => {
            if (!auth.currentUser) return;

            const itinerariesRef = collection(db, 'itineraries');
            const q = query(
                itinerariesRef,
                where('userId', '==', auth.currentUser.uid),
                orderBy('createdAt', 'desc'),
                limit(1)
            );

            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                const itineraryData = doc.data() as Itinerary;
                // Simple check to see if the itinerary is current
                const endDate = new Date(itineraryData.endDate);
                if(endDate >= new Date()){
                    setActiveItinerary(itineraryData);
                    setItineraryId(doc.id);
                }
            }
        };
        findActiveItinerary();
    }, []);

    useEffect(() => {
        if (!activeItinerary || !itineraryId) return;

        const checkWeather = async () => {
            console.log(`Checking weather for ${activeItinerary.destination}...`);
            const newWeather = await synthesizeWeather(activeItinerary.destination);

            if (lastWeather && newWeather.conditions !== lastWeather.conditions) {
                console.log(`Significant weather change detected: ${lastWeather.conditions} -> ${newWeather.conditions}`);
                
                if (window.confirm(`Weather in ${activeItinerary.destination} has changed to ${newWeather.conditions}. Shall I adapt your itinerary?`)) {
                    const adaptedItinerary = await adaptItineraryToWeather(activeItinerary, newWeather);
                    
                    const itineraryRef = doc(db, 'itineraries', itineraryId);
                    await updateDoc(itineraryRef, adaptedItinerary as Partial<Itinerary>);

                    setActiveItinerary(adaptedItinerary);
                    alert("Your itinerary has been updated!");
                }
            }
            
            setLastWeather(newWeather);
        };

        const intervalId = setInterval(checkWeather, 300000); // Check every 5 minutes

        checkWeather();

        return () => clearInterval(intervalId);
    }, [activeItinerary, itineraryId, lastWeather]);


    return null;
}

export default WeatherAdaptiveController;
