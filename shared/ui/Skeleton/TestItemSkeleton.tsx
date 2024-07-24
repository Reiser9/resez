import React from 'react';
import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

const TestItemSkeleton = () => {
    return <Skeleton containerClassName={cn(base.item3, styles.testItem)} className={styles.skeletonContent} />;
};

export default TestItemSkeleton;
