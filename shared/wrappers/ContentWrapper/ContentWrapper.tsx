import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

type Props = {
    type?: 'default' | 'full';
    children: React.ReactNode;
};

const ContentWrapper: React.FC<Props> = ({ type = 'default', children }) => {
    return (
        <div className={styles.contentBackground}>
            <div className={cn(styles.content, styles[type])}>{children}</div>
        </div>
    );
};

export default ContentWrapper;
