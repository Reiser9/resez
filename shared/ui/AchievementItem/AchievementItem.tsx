'use client';

import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { Tooltip } from 'antd';

import styles from './index.module.scss';

import type { Achievement } from '@/entities/achievement';
import { formatDate } from '@/shared/utils/formatDate';
import { Info } from '@/shared/icons';

import { Text } from '../Text';
import { Badge } from '../Badge';

type Props = {
    data: Achievement;
};

const AchievementItem: React.FC<Props> = ({ data }) => {
    const { achievement, coins, xp, type, description, icon, isCollected, createdAt, id, progress, targetValue } =
        data || {};

    return (
        <div
            className={cn(styles.achievementItem, {
                [styles.done]: isCollected,
            })}
        >
            <div className={styles.achievementItemWrapper}>
                <div className={styles.achievementItemTitleInner}>
                    <div className={styles.achievementItemIcon}>
                        {icon ? <Image src={icon} alt={achievement} fill /> : <Badge text="?" />}
                    </div>

                    <Text variant="h4">{achievement ?? '?????'}</Text>
                </div>

                {(xp || coins) && (
                    <Tooltip
                        title={
                            <>
                                <p>Награды:</p>
                                {xp && `Опыт: ${xp}`} {coins && `ResCoins: ${coins}`}
                            </>
                        }
                    >
                        <div className={styles.achievementItemInfo}>
                            <Info />
                        </div>
                    </Tooltip>
                )}
            </div>

            <Text variant="text2" className={styles.achievementItemDescription}>
                {description ?? '?????'}
            </Text>

            {!isCollected ? (
                <div className={styles.achievementItemProgress}>
                    <div className={styles.achievementItemProgressLine}>
                        <div
                            className={styles.achievementItemProgressBar}
                            style={{ width: `${(progress / targetValue) * 100}%` }}
                        ></div>
                    </div>

                    <div className={styles.achievementItemProgressValues}>
                        <Text variant="text3" className={styles.achievementItemProgressValue}>
                            {progress} / {targetValue}
                        </Text>
                    </div>
                </div>
            ) : (
                <Text variant="text2" fontWeight={600}>
                    Выполнено: {formatDate(createdAt)}
                </Text>
            )}
        </div>
    );
};

export default AchievementItem;
