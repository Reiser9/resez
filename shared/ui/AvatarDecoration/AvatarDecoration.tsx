'use client';

import React from 'react';
import Image from 'next/image';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import styles from './index.module.scss';

import { fetchAnimationData } from '@/shared/utils/fetchAnimationData';

type Props = {
    contentType?: string;
    contentUrl?: string;
    title?: string;
    options?: {
        width: number;
        height: number;
        y: string;
        x: string;
    };
    hoverAnimation?: boolean;
};

const AvatarDecoration: React.FC<Props> = ({ contentType, contentUrl, title, options, hoverAnimation = false }) => {
    const { width, height, x, y } = options || {};

    const [animationData, setAnimationData] = React.useState<any | null>(null);

    const playerRef = React.useRef<LottieRefCurrentProps>(null);
    const [isHovered, setIsHovered] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [animationLoaded, setAnimationLoaded] = React.useState(false);

    const handleMouseEnter = () => {
        if (!hoverAnimation) return;

        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        if (!hoverAnimation) return;

        setIsHovered(false);
    };

    const handleComplete = () => {
        if (!hoverAnimation) return;

        if (playerRef.current) {
            playerRef.current.goToAndStop(0, true);
        }
        setIsPlaying(false);
    };

    React.useEffect(() => {
        if (contentUrl && contentType === 'animation') {
            fetchAnimationData(contentUrl).then((data) => setAnimationData(data));
        }
    }, [contentUrl, contentType]);

    React.useEffect(() => {
        if (animationLoaded && isHovered && playerRef.current && !isPlaying) {
            setIsPlaying(true);
            playerRef.current.goToAndStop(0, true);
            playerRef.current.play();
        }
    }, [isHovered, animationData, isPlaying, animationLoaded]);

    return (
        <div
            className={styles.avatarDecorationWrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ pointerEvents: hoverAnimation ? 'all' : 'none' }}
        >
            {contentType === 'animation' ? (
                <Lottie
                    animationData={animationData}
                    className={styles.avatarDecoration}
                    style={{ width: width, top: y, left: x }}
                    onComplete={handleComplete}
                    autoplay={hoverAnimation ? false : true}
                    loop={hoverAnimation ? false : true}
                    lottieRef={playerRef}
                    onDOMLoaded={() => setAnimationLoaded(true)}
                />
            ) : (
                contentUrl &&
                title && (
                    <Image
                        src={contentUrl}
                        alt={title}
                        width={width || 0}
                        height={height || 0}
                        style={{ top: y, left: x }}
                        className={styles.avatarDecoration}
                    />
                )
            )}
        </div>
    );
};

export default AvatarDecoration;
