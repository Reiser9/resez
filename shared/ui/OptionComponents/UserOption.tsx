import React from 'react';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Badge } from '../Badge';
import { Text } from '../Text';

type Props = {
    avatar: string;
    nickname: string;
    id: number | string;
};

const UserOption: React.FC<Props> = ({ avatar, nickname, id }) => {
    return (
        <div className={styles.userSelectOption}>
            <div className={base.titleWrapper}>
                <Badge image={avatar} text={nickname} size="small" />

                <Text variant="text2">{nickname}</Text>
            </div>

            <Text variant="text2" fontWeight={600}>
                {id}
            </Text>
        </div>
    );
};

export default UserOption;
