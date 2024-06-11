<<<<<<< HEAD
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
=======
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
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
