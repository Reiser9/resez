'use client';

import React from 'react';

import { useAppDispatch } from '@/shared/hooks/useRedux';
import useRequest from '@/shared/hooks/useRequest';
import { Settings } from '@/entities/user';
import { setUserSettings } from '@/store/slices/user';

const useSettings = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const dispatch = useAppDispatch();
    const { request, catchRequestError, errorController } = useRequest();

    const updateSettings = async (data: Settings) => {
        setIsLoading(true);
        const response = await request<{ settings: Settings }>({
            url: '/user/settings',
            isAuth: true,
            method: 'PATCH',
            data,
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            dispatch(setUserSettings(response.data.settings));
        }
    };

    return {
        isLoading,
        updateSettings,
    };
};

export default useSettings;
