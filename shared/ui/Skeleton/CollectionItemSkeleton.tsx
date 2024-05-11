import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

const CollectionItemSkeleton = () => {
    return <Skeleton containerClassName={cn(styles.collectionItem, base.item3)} className={styles.skeletonContent} />;
};

export default CollectionItemSkeleton;
