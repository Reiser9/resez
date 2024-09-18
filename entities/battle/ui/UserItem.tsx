'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { BattleUserInfo } from '../model';
import { Crown } from '@/shared/icons';

import { Badge } from '@/shared/ui/Badge';
import { Text } from '@/shared/ui/Text';
import { TextPoint } from '@/shared/ui/TextPoint';

type Props = {
    data: BattleUserInfo;
};

const UserItem: React.FC<Props> = ({ data }) => {
    const { id, avatar, nickname, socketId } = data || {};

    return (
        <div className={cn(base.item4, styles.battleUserItem)}>
            <div className={base.titleInnerNowrap}>
                <div className={base.titleWrapper}>
                    <Badge image={avatar} text={nickname} />

                    <Text>{nickname}</Text>
                </div>

                {/* <Tooltip title="Создатель битвы">
                    <div className={styles.battleOwner}>
                        <Crown />
                    </div>
                </Tooltip> */}
            </div>

            <TextPoint title="Статус:">
                <div className={cn(styles.battleStatus, styles.notready)}>Не готов</div>
            </TextPoint>
        </div>
    );
};

export default UserItem;
