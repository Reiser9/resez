'use client';

import React from 'react';
import { Switch } from 'antd';
import cn from 'classnames';

import styles from './index.module.scss';

import { Settings } from '@/entities/user';

type Props = {
    title?: string;
    text?: string;
    checked: boolean;
    name: string;
    fullWidth?: boolean;
    loading?: boolean;
    callback?: (data: Settings) => Promise<void>;
    setValue?: (value: boolean) => void;
};

const SettingsItem: React.FC<Props> = ({
    title,
    text,
    checked,
    name,
    loading = false,
    fullWidth = false,
    callback,
    setValue,
    ...props
}) => {
    const callbackHandler = () => {
        if (!loading) {
            const data = {
                [name]: !checked,
            };

            callback && callback(data);
            setValue && setValue(!checked);
        }
    };

    return (
        <div
            className={cn(styles.settingsBlock, {
                [styles.fullWidth]: fullWidth,
            })}
            {...props}
        >
            <div className={styles.settingsBlockWrapper} onClick={callbackHandler}>
                <p className={styles.settingsBlockName}>{title}</p>

                <Switch
                    size="small"
                    checked={checked}
                    loading={loading}
                    onChange={setValue ? (value) => setValue(value) : undefined}
                />
            </div>

            <p className={styles.settingsBlockDescription}>{text}</p>
        </div>
    );
};

export default SettingsItem;
