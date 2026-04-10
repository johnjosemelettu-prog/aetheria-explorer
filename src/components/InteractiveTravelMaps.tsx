
import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { Pin, Plus, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const InteractiveTravelMaps = () => {
    const { t } = useTranslation();
    const [mapData, setMapData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [newPin, setNewPin] = useState<any>(null);

    useEffect(() => {
        const fetchMapData = async () => {
            setLoading(true);
            try {
                const data = await AI.getInteractiveMap();
                setMapData(data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchMapData();
    }, []);

    const handleAddPin = (e: any) => {
        const [longitude, latitude] = e.lngLat;
        setNewPin({ longitude, latitude });
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen bg-gray-100"><p>{t('interactiveTravelMaps.loading')}</p></div>;
    }

    return (
        <div className="h-screen w-screen relative">
            <Map
                initialViewState={{
                    longitude: mapData.center.longitude,
                    latitude: mapData.center.latitude,
                    zoom: mapData.zoom
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
                onDblClick={handleAddPin}
            >
                {mapData.pins.map((pin: any) => (
                    <Marker key={pin.id} longitude={pin.longitude} latitude={pin.latitude}>
                        <Pin className="text-red-500 w-8 h-8" />
                    </Marker>
                ))}

                {newPin && (
                    <Popup longitude={newPin.longitude} latitude={newPin.latitude}
                        anchor="bottom"
                        onClose={() => setNewPin(null)}
                    >
                        <div className="p-2">
                            <h3 className="font-bold mb-2">{t('interactiveTravelMaps.newPinTitle')}</h3>
                            <textarea className="w-full p-2 border rounded" placeholder={t('interactiveTravelMaps.newPinPlaceholder')}></textarea>
                            <Button size="sm" className="mt-2">{t('interactiveTravelMaps.savePin')}</Button>
                        </div>
                    </Popup>
                )}
            </Map>

            <motion.div 
                initial={{y: -100}} animate={{y: 0}}
                className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg flex flex-col items-center gap-4"
            >
                <h1 className="text-2xl font-bold">{mapData.title}</h1>
                <div className="flex gap-4">
                    <Button><Plus className="mr-2" />{t('interactiveTravelMaps.addPin')}</Button>
                    <Button variant="secondary"><Share2 className="mr-2" />{t('interactiveTravelMaps.shareMap')}</Button>
                </div>
            </motion.div>
        </div>
    );
};

export default InteractiveTravelMaps;
