"use client";

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import { Text } from '../Text';

type Props = {
    title: string;
    text: string;
    blur?: boolean;
    className?: string;
    children?: React.ReactNode
}

const TextPoint: React.FC<Props> = ({
    title,
    text,
    blur = false,
    className,
    children
}) => {
    return (
        <div className={cn(styles.userPoint, className, {
            [styles.blur]: blur
        })}>
            <Text variant="text2" className={styles.userPointTitle}>{title}</Text>

            {text && <Text>{blur ? "#######" : text}</Text>}

            {children}
        </div>
    )
}

export default TextPoint;