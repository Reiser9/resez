import React from 'react';
import Skeleton from 'react-loading-skeleton';

import styles from './index.module.scss';

const ScrollSkeleton = () => {
    return (
        <div className={styles.scrollContent}>
            {[...Array(4)].map((_, id) => <Skeleton key={id} containerClassName={styles.scrollItem} className={styles.skeletonContent} />)}
        </div>
    )
}

export default ScrollSkeleton;