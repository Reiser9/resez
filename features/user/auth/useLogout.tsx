'use client';

import React from 'react';

import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';
import useClearLocalData from '@/shared/hooks/useClearLocalData';

const useLogout = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const { alertNotify } = useAlert();
    const { request, catchRequestError, errorController } = useRequest();
    const { clearLocalData } = useClearLocalData();

    const logout = async (successCallback = () => {}) => {
        setIsLoading(true);
        const response = await request({
            url: '/auth/logout',
            isAuth: true,
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Вы вышли с аккаунта', 'success');

        clearLocalData();
        successCallback();
    };

    return { isLoading, logout };
};

export default useLogout;
