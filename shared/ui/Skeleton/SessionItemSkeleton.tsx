import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

const SessionItemSkeleton = () => {
    return <Skeleton containerClassName={cn(styles.sessionItem, base.item3)} className={styles.skeletonContent} />;
};

export default SessionItemSkeleton;
