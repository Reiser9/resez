import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import { Text } from '../Text';
import { formatDate } from '@/shared/utils/formatDate';
import { getDeviceByName } from '@/shared/utils/getDeviceByName';
import type { Session } from '@/entities/user/session';

// import { formatDate } from '../../utils/formatDate';
// import { getDeviceByName } from '../../utils/getDeviceByName';

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
                            {formatDate(date)}
                        </Text>
                    )}
                </div>
            </div>

            {current && (
                <Text variant="text2" className={styles.sessionActive}>
                    Активный
                </Text>
            )}

            {!isActive && (
                <Text variant="text2" className={styles.sessionActive}>
                    Завершен
                </Text>
            )}
        </div>
    );
};

export default SessionItemCompact;
