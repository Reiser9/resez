import React from 'react';
import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

const TestHistoryItemSkeleton = () => {
    return <Skeleton containerClassName={cn(base.item3, styles.taskHistoryItem)} className={styles.skeletonContent} />;
};

export default TestHistoryItemSkeleton;
