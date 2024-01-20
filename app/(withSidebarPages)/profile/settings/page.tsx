"use client";

import React from 'react';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Text } from '@/shared/ui/Text';
import { SettingsItem } from '@/shared/ui/SettingsItem';

const ProfileSettings = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <div className={styles.settingsItem}>
                <Text variant="h3">Основные</Text>

                <div className={styles.settingsItemContent}>
                    <SettingsItem
                        title="Приватный профиль"
                        text="Данные вашего профиля буду скрыты, они будут видны только друзьям"
                        checked={false}
                        // callback={() => updateSettings(!isPrivateAccount, isShowAvatars)}
                        // loading={isLoading}
                    />

                    <SettingsItem
                        title="Скрыть аватарки пользователей"
                        text="Скрывает отображение аватарок других пользователей. Полезно для слабого интернета"
                        checked={true}
                        // callback={() => updateSettings(isPrivateAccount, !isShowAvatars)}
                        // loading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
