'use client';

import React from 'react';

import type { Settings } from '@/entities/user';
import useRequest from '@/shared/hooks/useRequest';

const useSettings = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const { request, catchRequestError, errorController } = useRequest();

    const updateSettings = async (data: Settings, successCallback = () => {}) => {
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

        successCallback();

        if ('data' in response) {
            return response.data.settings;
        }
    };

    return {
        isLoading,
        updateSettings,
    };
};

export default useSettings;
