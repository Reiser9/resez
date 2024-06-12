'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import { ArrowBottom } from '@/shared/icons';

type Props = {
    title: string;
    defaultOpen?: boolean;
    theme?: 'white';
    children: React.ReactNode;
};

const Spoiler: React.FC<Props> = ({ title, defaultOpen = true, theme = '', children }) => {
    const [isShow, setIsShow] = React.useState(defaultOpen);

    return (
        <div className={styles.spoilerWrapper}>
            <button
                className={cn(styles.spoilerButton, styles[theme], {
                    [styles.spoilerShow]: isShow,
                })}
                onClick={() => setIsShow((prev) => !prev)}
            >
                <span className={styles.spoilerText}>{title}</span>

                <ArrowBottom />
            </button>

            {isShow && children}
        </div>
    );
};

export default Spoiler;
