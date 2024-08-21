'use client';

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { SettingsItem } from '@/shared/ui/SettingsItem';
import { useSettings } from '@/features/user';

import { Text } from '@/shared/ui/Text';
import { Preloader } from '@/shared/ui/Preloader';

const ProfileSettings = () => {
    // Мб иначе сделать настройки, как дойдешь до этого - разберись
    const queryClient = useQueryClient();
    const { isLoading, updateSettings, getSettings } = useSettings();

    const invalidateQuery = () => {
        queryClient.invalidateQueries({ queryKey: ['user_settings'] });
    };

    const { data, isLoading: settingsIsLoading } = useQuery({
        queryKey: ['user_settings'],
        queryFn: () => getSettings(),
    });

    const { isHideAvatars, isPrivateAccount } = data || {};

    return (
        <div className={base.baseWrapperGap16}>
            <div className={styles.settingsItem}>
                <Text variant="h3">Основные</Text>

                {settingsIsLoading ? (
                    <Preloader small page />
                ) : (
                    <div className={styles.settingsItemContent}>
                        <SettingsItem
                            title="Приватный профиль"
                            text="Данные вашего профиля буду скрыты, они будут видны только друзьям"
                            checked={!!isPrivateAccount}
                            name="isPrivateAccount"
                            callback={(data) => updateSettings(data, invalidateQuery)}
                            loading={isLoading}
                        />

                        <SettingsItem
                            title="Скрыть аватарки пользователей"
                            text="Скрывает отображение аватарок других пользователей. Полезно для слабого интернета"
                            checked={!!isHideAvatars}
                            name="isHideAvatars"
                            callback={(data) => updateSettings(data, invalidateQuery)}
                            loading={isLoading}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileSettings;
