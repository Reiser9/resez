import React from 'react';

import styles from '@/shared/styles/auth.module.scss';

const AuthFormsWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.content}>
            <div className={styles.contentInner}>{children}</div>
        </div>
    );
};

export default AuthFormsWrapper;
