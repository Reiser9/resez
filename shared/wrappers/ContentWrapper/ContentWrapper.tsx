'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import { useScrollContext } from '@/shared/context/ScrollProvider';

type Props = {
    type?: 'default' | 'full';
    children: React.ReactNode;
};

const ContentWrapper: React.FC<Props> = ({ type = 'default', children }) => {
    const { scrollBlock } = useScrollContext();

    return (
        <div className={styles.contentBackground} ref={scrollBlock}>
            <div className={cn(styles.content, styles[type])}>{children}</div>
        </div>
    );
};

export default ContentWrapper;
