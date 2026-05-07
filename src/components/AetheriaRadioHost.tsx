
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { useRead } from '../hooks/useRead';
import { useWrite } from '../hooks/useWrite';
import { useTranslation } from "react-i18next";

interface RadioData {
    id?: string;
    name?: string;
    dj?: string;
    currentTrack?: string;
    playlist?: string[];
}

const AetheriaRadioHost: React.FC = () => {
    const { t } = useTranslation();
    const [stationName, setStationName] = useState('');
    const [djName, setDjName] = useState('');
    const [currentTrack, setCurrentTrack] = useState('');
    const [playlist, setPlaylist] = useState<string[]>([]);
    const [newTrack, setNewTrack] = useState('');

    const { data: radioData, loading: radioLoading } = useRead<RadioData>('radio/station');
    const { write } = useWrite<RadioData>('radio/station');

    useEffect(() => {
        if (radioData) {
            setStationName(radioData.name || 'Aetheria Radio');
            setDjName(radioData.dj || 'AI DJ');
            setCurrentTrack(radioData.currentTrack || 'None');
            setPlaylist(radioData.playlist || []);
        }
    }, [radioData]);

    const handleUpdate = () => {
        write('update', { name: stationName, dj: djName });
    };

    const handlePlayNext = () => {
        if (playlist.length > 0) {
            const [nextTrack, ...rest] = playlist;
            setCurrentTrack(nextTrack);
            setPlaylist(rest);
            write('update', { currentTrack: nextTrack, playlist: rest });
        }
    };

    const handleAddTrack = () => {
        if (newTrack) {
            const updatedPlaylist = [...playlist, newTrack];
            setPlaylist(updatedPlaylist);
            write('update', { playlist: updatedPlaylist });
            setNewTrack('');
        }
    };
    
    if (radioLoading) {
        return <div>{t('auto.auto_loading____178')}</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('auto.auto_aetheria_radio_host_177')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Input value={stationName} onChange={(e) => setStationName(e.target.value)} placeholder={t('auto.auto_station_name_176')} />
                    <Input value={djName} onChange={(e) => setDjName(e.target.value)} placeholder={t('auto.auto_dj_name_175')} />
                    <Button onClick={handleUpdate}>{t('auto.auto_update_174')}</Button>
                </div>

                <div>
                    <p>{t('auto.auto_current_track__173')} {currentTrack}</p>
                </div>
                
                <div>
                    <Button onClick={handlePlayNext} disabled={playlist.length === 0}>{t('auto.auto_play_next_172')}</Button>
                </div>

                <div className="flex items-center space-x-2">
                    <Input value={newTrack} onChange={(e) => setNewTrack(e.target.value)} placeholder={t('auto.auto_new_track_url_171')} />
                    <Button onClick={handleAddTrack}>{t('auto.auto_add_track_170')}</Button>
                </div>

                <div>
                    <h3 className="font-bold">{t('auto.auto_playlist_169')}</h3>
                    <ul>
                        {playlist.map((track, index) => (
                            <li key={index}>{track}</li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
};

export default AetheriaRadioHost;
