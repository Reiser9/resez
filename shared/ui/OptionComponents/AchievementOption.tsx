import React from 'react';
import Image from 'next/image';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Text } from '../Text';

type Props = {
    icon: string;
    label: string;
    desc: string;
};

const AchievementOption: React.FC<Props> = ({ icon, label, desc }) => {
    return (
        <div className={styles.achievementOption}>
            <div className={styles.achievementOptionIcon}>
                <Image src={icon} alt={label} fill />
            </div>

            <div className={base.baseWrapperGap0}>
                <Text fontWeight={600} variant="text2">
                    {label}
                </Text>

                <Text variant="text2">{desc}</Text>
            </div>
        </div>
    );
};

export default AchievementOption;
