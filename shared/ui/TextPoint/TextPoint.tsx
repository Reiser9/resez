'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import { Text } from '../Text';

type Props = {
    title: string;
    text?: string | number;
    blur?: boolean;
    className?: string;
    children?: React.ReactNode;
};

const TextPoint: React.FC<Props> = ({ title, text, blur = false, className, children }) => {
    return (
        <div
            className={cn(styles.userPoint, className)}
        >
            <Text variant="text2" className={styles.userPointTitle}>
                {title}
            </Text>

            <div
                className={cn(styles.userPointContent, {
                    [styles.blur]: blur,
                })}
            >
                {text && <Text>{blur ? '#######' : text}</Text>}

                {children}
            </div>
        </div>
    );
};

export default TextPoint;
