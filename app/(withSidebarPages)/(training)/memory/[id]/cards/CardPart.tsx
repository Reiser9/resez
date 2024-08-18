'use client';

import React, { HTMLAttributes, MouseEvent } from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';

import styles from './index.module.scss';

import { Pause, Volume } from '@/shared/icons';
import useSpeakText from '@/shared/hooks/useSpeakText';

type Props = {
    text: string;
    image: string;
} & HTMLAttributes<HTMLDivElement>;

const CardPart: React.FC<Props> = ({ text, image, ...props }) => {
    const { isSpeaking, speakText, clearSpeak, speakIsSupport } = useSpeakText();

    const speakTextHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (isSpeaking) {
            return clearSpeak();
        }

        speakText(text);
    };

    return (
        <div {...props}>
            {speakIsSupport() && text && (
                <button className={styles.cardVolume} onClick={speakTextHandler}>
                    {isSpeaking ? <Pause /> : <Volume />}
                </button>
            )}

            {image && <div className={styles.cardImage}>
                <Image src={image} alt="Image" fill />
            </div>}

            {text && <div className={styles.cardText}>{parse(text)}</div>}
        </div>
    );
};

export default CardPart;
