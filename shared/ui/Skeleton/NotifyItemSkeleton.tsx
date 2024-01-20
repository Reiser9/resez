import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

const NotifyItemSkeleton = () => {
    return <Skeleton containerClassName={cn(styles.notifyItem, base.item2)} className={styles.skeletonContent} />;
};

export default NotifyItemSkeleton;
