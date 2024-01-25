import React from 'react';

import styles from './index.module.scss';

import { Preloader } from '.';

const LoaderForItem = () => {
    return (
        <div className={styles.loaderItem}>
            <Preloader small />
        </div>
    );
};

export default LoaderForItem;
