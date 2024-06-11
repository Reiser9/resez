<<<<<<< HEAD
import React from 'react';
import Skeleton from 'react-loading-skeleton';

import styles from './index.module.scss';

const Scroll = () => {
    return (
        <div className={styles.scrollContent}>
            {[...Array(4)].map((_, id) => <Skeleton key={id} containerClassName={styles.scrollItem} className={styles.skeletonContent} />)}
        </div>
    )
}

=======
import React from 'react';
import Skeleton from 'react-loading-skeleton';

import styles from './index.module.scss';

const Scroll = () => {
    return (
        <div className={styles.scrollContent}>
            {[...Array(4)].map((_, id) => <Skeleton key={id} containerClassName={styles.scrollItem} className={styles.skeletonContent} />)}
        </div>
    )
}

>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
export default Scroll;