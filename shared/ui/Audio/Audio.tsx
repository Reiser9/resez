'use client';

import React from 'react';

import styles from './index.module.scss';

import { Pause, Play } from '@/shared/icons';
import { Text } from '../Text';

type Props = {
    audio: string;
};

const Audio: React.FC<Props> = ({ audio }) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isEnded, setIsEnded] = React.useState(true);
    const [progress, setProgress] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState('00:00');
    const [duration, setDuration] = React.useState('');

    const audioRef = React.useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        document.querySelectorAll('audio').forEach((audio) => {
            audio.pause();
        });

        if (audioRef.current) {
            audioRef.current.volume = 0.3;
        }

        if (!isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            const progress = (currentTime / duration) * 100;

            const mins = Math.floor(currentTime / 60);
            const secs = Number((currentTime % 60).toFixed());
            const tempTime = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;

            setCurrentTime(tempTime);
            setProgress(progress);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            const currentTime = audioRef.current.duration;
            const mins = Math.floor(currentTime / 60);
            const secs = Number((currentTime % 60).toFixed());
            const tempTime = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;

            setDuration(tempTime);
        }
    };

    const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (audioRef.current) {
            e.stopPropagation();
            const rect = e.currentTarget.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const width = rect.width;
            const duration = audioRef.current.duration;
            const newTime = (offsetX / width) * duration;
            audioRef.current.currentTime = newTime;
        }
    };

    React.useEffect(() => {
        if (audioRef.current) {
            const handlePlaying = () => {
                setIsPlaying(true);
                setIsEnded(false);
            };

            const handleEnded = () => {
                setIsPlaying(false);
                setIsEnded(true);
                setCurrentTime('00:00');
                setProgress(0);
            };

            const handlePause = () => {
                setIsPlaying(false);
            };

            const audioElement = audioRef.current;

            audioElement.addEventListener('playing', handlePlaying);
            audioElement.addEventListener('ended', handleEnded);
            audioElement.addEventListener('pause', handlePause);

            return () => {
                if (audioElement) {
                    audioElement.removeEventListener('playing', handlePlaying);
                    audioElement.removeEventListener('ended', handleEnded);
                    audioElement.removeEventListener('pause', handlePause);
                }
            };
        }
    }, []);

    return (
        <div className={styles.voice} onClick={togglePlay}>
            <button className={styles.voicePlay}>{isPlaying ? <Pause /> : <Play />}</button>

            <div className={styles.voiceLine} onClick={handleTimelineClick}>
                <div className={styles.voiceProgress} style={{ width: `${progress}%` }}></div>
            </div>

            <Text variant="text2">{isPlaying || !isEnded ? currentTime : duration}</Text>

            <audio
                src={audio}
                preload="auto"
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
        </div>
    );
};

export default Audio;
