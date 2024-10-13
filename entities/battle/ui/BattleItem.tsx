'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { BattleItem } from '../model';
import { Clock } from '@/shared/icons';

import { Button } from '@/shared/ui/Button';
import { Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';
import { AvatarGroup } from '@/shared/ui/AvatarGroup';

type Props = {
    data: BattleItem;
};

const BattleItem: React.FC<Props> = ({ data }) => {
    const { createdAt, isPrivate, playersCount, updatedAt, users, id } = data || {};

    return (
        <div className={cn(base.item3, styles.battleItem)}>
            <Text variant='h4' fontWeight={600}>Битва #{id}</Text>

            <div className={base.baseWrapperGap8} style={{ margin: '1.2rem 0' }}>
                <Preloader page small offIndent animationDuration={0.7} />

                <Text variant="text2" color="main" center>
                    Ожидание участников
                </Text>
            </div>

            <div className={base.titleInner}>
                <div className={styles.battleItemUsers}>
                    <AvatarGroup
                        elements={users.map((data) => ({
                            avatar: data.avatar,
                            nickname: data.nickname,
                        }))}
                    />

                    <Text variant="text2" fontWeight={600}>
                        {users.length} / {playersCount}
                    </Text>
                </div>

                <div className={styles.battleItemTime}>
                    <Clock />
                    03:20
                </div>
            </div>

            <Button variant="light" href={`/battle/${id}`}>
                Присоединиться
            </Button>
        </div>
    );
};

export default BattleItem;
