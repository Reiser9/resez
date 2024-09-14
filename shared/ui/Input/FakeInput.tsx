'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';

import styles from './index.module.scss';
import typography from '@/shared/styles/typography.module.scss';

import { Info } from '@/shared/icons';

import { Text } from '../Text';

type Props = {
    value?: string;
    title?: string;
    disabled?: boolean;
    trackLength?: boolean;
    lengthLimit?: number;
    wrapperClass?: string;
    isError?: boolean;
    errorMessage?: string;
    infoText?: string;
    commentText?: string;
    color?: 'default' | 'white';
    className?: string;
    children?: React.ReactNode;
};

const FakeInput: React.FC<Props> = ({
    value,
    title,
    disabled,
    trackLength,
    lengthLimit = 9999,
    wrapperClass,
    isError,
    errorMessage,
    infoText,
    commentText,
    color = 'default',
    className,
    children,
}) => {
    return (
        <div className={cn(styles.inputWrapper, wrapperClass)}>
            {(title || trackLength) && (
                <div className={styles.inputTitleWrapper}>
                    {title && <Text variant="text3">{title}</Text>}
                    {trackLength && (
                        <p
                            className={cn(typography.text3, styles.limitText, {
                                [styles.limit]: (value?.length || 0) >= lengthLimit,
                            })}
                        >
                            {value?.length || 0}
                            {lengthLimit ? ` / ${lengthLimit}` : ''}
                        </p>
                    )}
                </div>
            )}

            <div className={styles.inputInner}>
                <div
                    className={cn(styles.input, styles[color], className, {
                        [styles.password]: infoText,
                        [styles.disabled]: disabled,
                        [styles.error]: isError,
                    })}
                >
                    {value}
                </div>

                {infoText && (
                    <Tooltip title={infoText} placement="topRight">
                        <div className={styles.infoIcon}>
                            <Info />
                        </div>
                    </Tooltip>
                )}

                {children && children}
            </div>

            {isError && errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

            {commentText && <p className={styles.commentText}>{commentText}</p>}
        </div>
    );
};

export default FakeInput;
