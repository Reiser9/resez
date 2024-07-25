import Skeleton from 'react-loading-skeleton';

import styles from './index.module.scss';

const DynamicSkeleton = () => {
    return <Skeleton containerClassName={styles.dynamicItem} className={styles.skeletonContent} />;
};

export default DynamicSkeleton;
