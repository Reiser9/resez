'use client';

import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import cn from 'classnames';

import styles from './index.module.scss';

export type IconButtonProps = {
    variant?: 'default' | 'light' | 'danger' | 'warn' | 'success';
    disabled?: boolean;
    full?: boolean;
    small?: boolean;
    circle?: boolean;
    href?: string;
    className?: string;
    children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> &
    AnchorHTMLAttributes<HTMLAnchorElement>;

const IconButton: React.FC<IconButtonProps> = ({
    variant = 'default',
    disabled = false,
    full = false,
    small = false,
    circle = false,
    href = '',
    className,
    children,
    ...props
}) => {
    return (
        <>
            {disabled ? (
                <button
                    className={cn(styles.iconButton, className, styles[variant], styles.disabled, {
                        [styles.small]: small,
                        [styles.full]: full,
                        [styles.circle]: circle,
                    })}
                    {...props}
                >
                    {children}
                </button>
            ) : href ? (
                <Link
                    href={href}
                    className={cn(styles.iconButton, className, styles[variant], {
                        [styles.small]: small,
                        [styles.full]: full,
                        [styles.circle]: circle,
                    })}
                    {...props}
                >
                    {children}
                </Link>
            ) : (
                <button
                    className={cn(styles.iconButton, className, styles[variant], {
                        [styles.small]: small,
                        [styles.full]: full,
                        [styles.circle]: circle,
                    })}
                    {...props}
                >
                    {children}
                </button>
            )}
        </>
    );
};

export default IconButton;
