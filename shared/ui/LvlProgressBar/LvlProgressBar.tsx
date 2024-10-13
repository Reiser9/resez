'use client';

import React from 'react';

import styles from './index.module.scss';

import { Text } from '../Text';

type Props = {
    level: number;
    xp: number;
    limit: number;
};

const LvlProgressBar: React.FC<Props> = ({ level, xp, limit }) => {
    return (
        <div className={styles.userLvlInner}>
            <p className={styles.userLvlPoint}>{level || 1}</p>

            <div className={styles.userLvlProgressTotal}>
                <div
                    className={styles.userLvlProgressLine}
                    style={{ width: `${((xp || 0) / (limit || 1)) * 100}%` }}
                ></div>

                <Text variant="text3" className={styles.userLvlExp}>
                    {xp || 0} / {limit || 0}
                </Text>
            </div>

            <p className={styles.userLvlPoint}>{(level || 1) + 1}</p>
        </div>
    );
};

export default LvlProgressBar;
