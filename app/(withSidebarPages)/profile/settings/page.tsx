'use client';

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { SettingsItem } from '@/shared/ui/SettingsItem';
import { useSettings } from '@/features/user';
import useShortInfo from '@/features/user/data/useShortInfo';

import { Text } from '@/shared/ui/Text';

const ProfileSettings = () => {
    // Мб иначе сделать настройки, как дойдешь до этого - разберись
    const queryClient = useQueryClient();
    const { isLoading, updateSettings } = useSettings();
    const { getShortInfo } = useShortInfo();

    const invalidateQuery = () => {
        queryClient.invalidateQueries({ queryKey: ['short_info'] });
    };

    const { data: user, isLoading: userIsLoading } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
    });

    const { settings } = user?.user || {};
    const { isHideAvatars, isPrivateAccount } = settings || {};

    return (
        <div className={base.baseWrapperGap16}>
            <div className={styles.settingsItem}>
                <Text variant="h3">Основные</Text>

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
            </div>
        </div>
    );
};

export default ProfileSettings;
