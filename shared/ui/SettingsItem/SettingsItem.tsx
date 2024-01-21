'use client';

import React from 'react';
import { Switch } from 'antd';

import styles from './index.module.scss';

import { Settings } from '@/entities/user';

type Props = {
    title?: string;
    text?: string;
    checked: boolean;
    name: string;
    loading?: boolean;
    callback?: (data: Settings) => Promise<void>;
};

const SettingsItem: React.FC<Props> = ({
    title,
    text,
    checked,
    name,
    loading = false,
    callback = () => {},
    ...props
}) => {
    const callbackHandler = () => {
        if (!loading) {
            const data = {
                [name]: !checked,
            };

            callback(data);
        }
    };

    return (
        <div className={styles.settingsBlock} {...props}>
            <div className={styles.settingsBlockWrapper} onClick={callbackHandler}>
                <p className={styles.settingsBlockName}>{title}</p>

                <Switch size="small" checked={checked} loading={loading} />
            </div>

            <p className={styles.settingsBlockDescription}>{text}</p>
        </div>
    );
};

export default SettingsItem;
