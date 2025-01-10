'use client';

import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import typography from '@/shared/styles/typography.module.scss';

type Props = {
    icon?: React.ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'text' | 'text2' | 'text3';
    textClassName?: string;
    color?: '' | 'success' | 'error' | 'grey' | 'warn' | 'main' | 'white';
    center?: boolean;
    fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Text: React.FC<Props> = ({
    icon,
    variant = 'text',
    textClassName,
    color = '',
    center = false,
    fontWeight,
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(styles.textInner, className, {
                [styles.center]: center,
            })}
            {...props}
        >
            {icon && icon}

            <p className={cn(typography[variant], textClassName, styles[color])} style={{ fontWeight: fontWeight }}>
                {children}
            </p>
        </div>
    );
};

export default Text;
