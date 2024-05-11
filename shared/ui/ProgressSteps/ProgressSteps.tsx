'use client';

import React from 'react';

import styles from './index.module.scss';

type Props = {
    current?: string | number;
    all?: string | number;
};

const ProgressSteps: React.FC<Props> = ({ current, all }) => {
    return (
        <div className={styles.progressInner}>
            {current} / {all}
        </div>
    );
};

export default ProgressSteps;
