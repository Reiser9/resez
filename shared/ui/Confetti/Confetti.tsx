'use client';

import React from 'react';
import Confetti from 'react-confetti';

import styles from './index.module.scss';

const ConfettiBlock = () => {
    return (
        <div className={styles.confettiWrapper}>
            <Confetti gravity={0.05} recycle={false} numberOfPieces={600} tweenDuration={20000} />
        </div>
    );
};

export default ConfettiBlock;
