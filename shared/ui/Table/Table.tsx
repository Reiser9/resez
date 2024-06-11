<<<<<<< HEAD
'use client';

import React from 'react';

import styles from './index.module.scss';

type Props = {
    children: React.ReactNode;
};

const Table: React.FC<Props> = ({ children }) => {
    return (
        <div className={styles.pointTableInner}>
            <div className={styles.pointTable}>{children}</div>
        </div>
    );
};

export default Table;
=======
'use client';

import React from 'react';

import styles from './index.module.scss';

type Props = {
    children: React.ReactNode;
};

const Table: React.FC<Props> = ({ children }) => {
    return (
        <div className={styles.pointTableInner}>
            <div className={styles.pointTable}>{children}</div>
        </div>
    );
};

export default Table;
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
