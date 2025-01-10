import React from 'react';

import styles from './index.module.scss';

import { Text } from '../Text';

type Props = {
    label: string;
    icon: React.ReactNode;
};

const NotifyTypeOption: React.FC<Props> = ({ label, icon }) => {
    return (
        <div className={styles.notifyTypeOption}>
            <Text>{label}</Text>

            <div className={styles.notifyTypeOptionIcon}>
                {icon}
            </div>
        </div>
    );
};

export default NotifyTypeOption;
