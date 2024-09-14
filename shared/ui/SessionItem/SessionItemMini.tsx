'use client';

import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import type { Session } from '@/entities/user/session';
import { getDeviceByName } from '@/shared/utils/getDeviceByName';
import { getFormattedDate } from '@/shared/utils/getFormattedDate';

import { Text } from '../Text';

type Props = {
    current?: boolean;
    data: Session | undefined;
} & HTMLAttributes<HTMLDivElement>;

const SessionItemCompact: React.FC<Props> = ({ current = false, data, ...props }) => {
    const { isActive, browser, date, deviceType } = data || {};

    return (
        <div
            className={cn(styles.sessionItemCompact, {
                [styles.disabled]: !isActive,
            })}
            {...props}
        >
            <div className={styles.sessionItemContent}>
                <div className={styles.sessionItemCompactIcon}>{getDeviceByName(deviceType)?.icon}</div>

                <div className={styles.sessionItemWrapper}>
                    <Text>Браузер {browser ? browser : 'неопределен'}</Text>

                    {date && (
                        <Text variant="text2" className={styles.sessionItemDate}>
                            {getFormattedDate(date)}
                        </Text>
                    )}
                </div>
            </div>

            {isActive || current ? (
                <Text variant="text2" className={styles.sessionActive}>
                    Активный
                </Text>
            ) : (
                <Text variant="text2" className={styles.sessionActive}>
                    Завершен
                </Text>
            )}
        </div>
    );
};

export default SessionItemCompact;
