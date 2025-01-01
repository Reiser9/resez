'use client';

import {
    ControlBar,
    GridLayout,
    LiveKitRoom,
    ParticipantTile,
    RoomAudioRenderer,
    useTracks,
} from '@livekit/components-react';

import '@livekit/components-styles';

import React from 'react';
import { Track } from 'livekit-client';

import styles from './index.module.scss';

import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

export default function Page() {
    const [room, setRoom] = React.useState('');
    const [name, setName] = React.useState('');
    const [token, setToken] = React.useState('');

    const connectToRoom = async () => {
        try {
            const resp = await fetch(`/api/token?room=${room}&username=${name}`);
            const data = await resp.json();
            setToken(data.token);
        } catch (e) {
            console.error(e);
        }
    };

    if (!token) {
        return (
            <div className={styles.callForm}>
                <div className={styles.callFormContent}>
                    <Text variant="h2">Войти в комнату</Text>

                    <div className={styles.callFormInputs}>
                        <Input value={room} setValue={setRoom} placeholder="Название комнаты" color="white" />
                        <Input
                            value={name}
                            setValue={setName}
                            placeholder="Отображаемое имя пользователя"
                            color="white"
                        />

                        <Button onClick={connectToRoom}>Войти</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <LiveKitRoom
            video={true}
            audio={true}
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            onDisconnected={() => setToken('')}
            data-lk-theme="default"
            style={{ height: '100dvh' }}
        >
            <MyVideoConference />
            <RoomAudioRenderer />
            <ControlBar />
        </LiveKitRoom>
    );
}

function MyVideoConference() {
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false },
    );
    return (
        <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
            <ParticipantTile />
        </GridLayout>
    );
}
