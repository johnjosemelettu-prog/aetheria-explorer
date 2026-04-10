
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { Water, Droplet } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WaterRefillStationFinder = () => {
  const { t } = useTranslation();
  const [stations, setStations] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error getting user location:", error);
        // Default to a central location if permission is denied
        setUserLocation([51.505, -0.09]);
      }
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      const fetchStations = async () => {
        setLoading(true);
        try {
          const waterStations = await AI.getWaterRefillStations(userLocation[0], userLocation[1]);
          setStations(waterStations);
        } catch (err) {
          console.error(err);
        }
        setLoading(false);
      };

      fetchStations();
    }
  }, [userLocation]);


  if (loading || !userLocation) {
    return <div className="flex justify-center items-center min-h-screen bg-blue-900/50"><p className="text-white">{t('waterRefillStationFinder.loading')}</p></div>;
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="p-4 bg-gray-800 text-white z-10 shadow-lg">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Droplet /> {t('waterRefillStationFinder.title')}</h1>
        <p className="text-sm text-gray-400">{t('waterRefillStationFinder.description')}</p>
      </div>
      <div className="flex-grow z-0">
        <Map center={userLocation} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {stations.map(station => (
            <Marker key={station.id} position={[station.lat, station.lng]}>
            </Marker>
          ))}

          {/* User Marker */}
          <Marker position={userLocation}>
          </Marker>
        </Map>
      </div>
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 w-full max-w-sm px-4">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 text-center shadow-2xl">
          <h2 className="font-bold text-lg mb-2">{t('waterRefillStationFinder.stationsFound', { count: stations.length })}</h2>
          <Button>
            <Water className="mr-2 h-4 w-4"/>
            {t('waterRefillStationFinder.suggestStation')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WaterRefillStationFinder;
