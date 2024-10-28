import React from 'react';

import styles from './index.module.scss';

import type { LevelInfo } from '@/entities/user/model';

import { Text } from '@/shared/ui/Text';
import { LvlProgressBar } from '@/shared/ui/LvlProgressBar';

type Props = {
    levelInfo?: LevelInfo;
};

const LvlBlock: React.FC<Props> = ({ levelInfo }) => {
    const { xp, limit, level } = levelInfo || {};

    return (
        <div className={styles.userInfoItem}>
            <Text variant="h4" fontWeight={600}>
                Уровень
            </Text>

            <LvlProgressBar level={level || 0} xp={xp || 0} limit={limit || 0} />
        </div>
    );
};

export default LvlBlock;
