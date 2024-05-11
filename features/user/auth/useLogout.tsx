'use client';

import React from 'react';

import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';

const useLogout = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const { alertNotify } = useAlert();
    const { request, catchRequestError, errorController, clearLocalData } = useRequest();

    const logout = async (successCallback: () => void = () => {}): Promise<void> => {
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
