'use client';

import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Crown } from '@/shared/icons';

import { Text } from '@/shared/ui/Text';
import { Badge } from '@/shared/ui/Badge';
import { ScoreItemLocal } from '@/entities/collection';

type Props = {
    data: ScoreItemLocal;
    current?: boolean;
};

const LeaderboardItem: React.FC<Props> = ({ data, current = false }) => {
    const { place, time, user } = data || {};
    const { avatar, nickname } = user || {};

    return (
        <div
            className={cn(styles.selectionLeaderboardItem, {
                [styles.current]: current,
            })}
        >
            <div className={styles.selectionLeaderboardItemWrapper}>
                <div
                    className={cn(styles.selectionLeaderboardItemNumber, {
                        [styles.leader]: place === 1,
                    })}
                >
                    {place === 1 ? <Crown /> : place}
                </div>

                {user ? (
                    <Link prefetch={false} href={`/user/${nickname}`} className={base.titleWrapper}>
                        <Badge image={avatar} text={nickname} isUserAvatar />

                        <Text>{nickname}</Text>
                    </Link>
                ) : (
                    <div className={base.titleWrapper}>
                        <Badge text="А" />

                        <Text>Анонимный пользователь</Text>
                    </div>
                )}
            </div>

            <Text fontWeight={600}>{time.toFixed(1)} сек.</Text>
        </div>
    );
};

export default LeaderboardItem;
