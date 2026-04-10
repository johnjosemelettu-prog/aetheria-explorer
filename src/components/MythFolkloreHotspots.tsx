
import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Book, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MythFolkloreHotspots = () => {
    const { t } = useTranslation();
    const [mapData, setMapData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedHotspot, setSelectedHotspot] = useState<any>(null);

    useEffect(() => {
        const fetchHotspots = async () => {
            setLoading(true);
            try {
                const data = await AI.getMythFolkloreHotspots();
                setMapData(data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchHotspots();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><p>{t('mythFolkloreHotspots.loading')}</p></div>;
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
                mapStyle="mapbox://styles/mapbox/dark-v10"
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            >
                {mapData.hotspots.map((spot: any) => (
                    <Marker key={spot.id} longitude={spot.longitude} latitude={spot.latitude} onClick={() => setSelectedHotspot(spot)}>
                        <MapPin className="text-yellow-400 w-8 h-8 cursor-pointer" />
                    </Marker>
                ))}

                {selectedHotspot && (
                    <Popup
                        longitude={selectedHotspot.longitude}
                        latitude={selectedHotspot.latitude}
                        onClose={() => setSelectedHotspot(null)}
                        anchor="left"
                        className="font-sans"
                    >
                        <div className="w-64 p-2 bg-gray-800 text-white">
                            <h3 className="text-lg font-bold mb-2">{selectedHotspot.title}</h3>
                            <p className="text-sm">{selectedHotspot.story}</p>
                        </div>
                    </Popup>
                )}
            </Map>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="absolute top-4 left-4 bg-gray-900/80 p-4 rounded-lg text-white max-w-sm">
                <h1 className="text-2xl font-bold flex items-center"><Book className="mr-2" />{t('mythFolkloreHotspots.title')}</h1>
                <p className="text-sm mt-2">{t('mythFolkloreHotspots.description')}</p>
            </motion.div>
        </div>
    );
};

export default MythFolkloreHotspots;
