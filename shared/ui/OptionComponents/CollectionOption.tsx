import React from 'react';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Text } from '../Text';

type Props = {
    name: string;
    pairs: number | string;
};

const CollectionOption: React.FC<Props> = ({ name, pairs }) => {
    return (
        <div className={styles.userSelectOption}>
            <div className={base.titleWrapper}>
                <Text variant="text2">{name}</Text>
            </div>

            <Text variant="text2" fontWeight={600}>
                Пар: {pairs}
            </Text>
        </div>
    );
};

export default CollectionOption;
