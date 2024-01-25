import React from 'react';
import Skeleton from 'react-loading-skeleton';

import styles from './index.module.scss';

const UserAdminItemSkeleton = () => {
    return <Skeleton containerClassName={styles.userAdminItem} className={styles.skeletonContent} />;
};

export default UserAdminItemSkeleton;
