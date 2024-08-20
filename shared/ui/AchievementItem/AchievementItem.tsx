'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';

import styles from './index.module.scss';

import { Info } from '@/shared/icons';

import { Text } from '../Text';

type Props = {
    done?: boolean;
    title: string;
    description: string;
    progress: number;
    endValue: number;
    reward: string;
    icon: React.ReactNode;
};

const AchievementItem: React.FC<Props> = ({ done = false, title, description, progress, endValue, reward, icon }) => {
    return (
        <div
            className={cn(styles.achievementItem, {
                [styles.done]: done,
            })}
        >
            <div className={styles.achievementItemWrapper}>
                <div className={styles.achievementItemTitleInner}>
                    <div className={styles.achievementItemMedalInner}>{icon}</div>

                    <Text variant="h4">{title}</Text>
                </div>

                <Tooltip
                    title={
                        <>
                            <p>Награды:</p>
                            {reward}
                        </>
                    }
                >
                    <div className={styles.achievementItemInfo}>
                        <Info />
                    </div>
                </Tooltip>
            </div>

            <Text variant="text2" className={styles.achievementItemDescription}>
                {description}
            </Text>

            <div className={styles.achievementItemProgress}>
                <div className={styles.achievementItemProgressLine}>
                    <div
                        className={styles.achievementItemProgressBar}
                        style={{ width: `${(progress / endValue) * 100}%` }}
                    ></div>
                </div>

                <div className={styles.achievementItemProgressValues}>
                    <Text variant="text3" className={styles.achievementItemProgressValue}>
                        {progress} / {endValue}
                    </Text>
                </div>
            </div>
        </div>
    );
};

export default AchievementItem;
