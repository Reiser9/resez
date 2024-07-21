import React from 'react';
import Skeleton from 'react-loading-skeleton';

import styles from './index.module.scss';

const TaskItemSkeleton = () => {
    return <Skeleton containerClassName={styles.taskItem} className={styles.skeletonContent} />;
};

export default TaskItemSkeleton;
