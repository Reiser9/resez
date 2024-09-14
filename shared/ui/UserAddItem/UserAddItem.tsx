'use client';

import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import type { UserSearch } from '@/entities/user';
import { Check } from '@/shared/icons';

import { Badge } from '../Badge';
import { Text } from '../Text';

type Props = {
    data: UserSearch;
    active?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const UserAddItem: React.FC<Props> = ({ data, active = false, ...props }) => {
    const { id, nickname, avatar } = data || {};

    return (
        <div className={styles.messangerNewChatUserItem} {...props}>
            <div className={styles.messangerNewChatUserItemWrapper}>
                <Badge isUserAvatar text={nickname} image={avatar} />

                <div className={styles.messangerNewChatUserItemInfo}>
                    {/* <Text className={styles.messangerNewChatUserItemName}>{name}</Text> */}

                    <Text className={styles.messangerNewChatUserItemNickname} variant="text2">
                        {nickname}
                    </Text>
                </div>
            </div>

            <div
                className={cn(styles.messangerNewChatUserItemIndicator, {
                    [styles.active]: active,
                })}
            >
                <Check />
            </div>
        </div>
    );
};

export default UserAddItem;
