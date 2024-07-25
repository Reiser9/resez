import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

const CatalogItemSkeleton = () => {
    return <Skeleton containerClassName={cn(base.item2, styles.catalogItem)} className={styles.skeletonContent} />;
};

export default CatalogItemSkeleton;
