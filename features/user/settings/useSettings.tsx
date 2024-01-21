'use client';

import React from 'react';

import useAlert from '@/shared/hooks/useAlert';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import useRequest from '@/shared/hooks/useRequest';
import { Settings } from '@/entities/user';
import { setUserSettings } from '@/store/slices/user';

const useSettings = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { request } = useRequest();
    const { alertNotify } = useAlert();

    const updateSettings = async (data: Settings) => {
        try {
            setIsLoading(true);
            const response = await request<{ settings: Settings }>({
                url: '/user/settings',
                isAuth: true,
                method: 'PATCH',
                data,
            });

            dispatch(setUserSettings(response.data.settings));
        } catch {
            alertNotify('Ошибка', 'Произошла ошибка, попробуйте позже', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        updateSettings,
    };
};

export default useSettings;
