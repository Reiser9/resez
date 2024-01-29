import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

const RoleItemSkeleton = () => {
    return <Skeleton containerClassName={cn(base.item4, styles.roleItem)} className={styles.skeletonContent} />;
};

export default RoleItemSkeleton;
