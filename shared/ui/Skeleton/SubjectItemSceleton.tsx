import React from 'react';
import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

const SubjectItemSkeleton = () => {
    return <Skeleton containerClassName={cn(base.item3, styles.subjectItem)} className={styles.skeletonContent} />;
};

export default SubjectItemSkeleton;
