import Skeleton from 'react-loading-skeleton';

import styles from './index.module.scss';

const SessionItemMiniSkeleton = () => {
    return <Skeleton containerClassName={styles.sessionItemCompact} className={styles.skeletonContent} />;
};

export default SessionItemMiniSkeleton;
