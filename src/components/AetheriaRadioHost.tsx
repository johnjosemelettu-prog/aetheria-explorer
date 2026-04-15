
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { useRead } from '../hooks/useRead';
import { useWrite } from '../hooks/useWrite';

interface RadioData {
    id?: string;
    name?: string;
    dj?: string;
    currentTrack?: string;
    playlist?: string[];
}

const AetheriaRadioHost: React.FC = () => {
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
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Aetheria Radio Host</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Input value={stationName} onChange={(e) => setStationName(e.target.value)} placeholder="Station Name" />
                    <Input value={djName} onChange={(e) => setDjName(e.target.value)} placeholder="DJ Name" />
                    <Button onClick={handleUpdate}>Update</Button>
                </div>

                <div>
                    <p>Current Track: {currentTrack}</p>
                </div>
                
                <div>
                    <Button onClick={handlePlayNext} disabled={playlist.length === 0}>Play Next</Button>
                </div>

                <div className="flex items-center space-x-2">
                    <Input value={newTrack} onChange={(e) => setNewTrack(e.target.value)} placeholder="New Track URL" />
                    <Button onClick={handleAddTrack}>Add Track</Button>
                </div>

                <div>
                    <h3 className="font-bold">Playlist</h3>
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
