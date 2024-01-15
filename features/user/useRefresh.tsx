'use client';

import React from 'react';

import useRequest from '@/shared/hooks/useRequest';

const useRefresh = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const { request } = useRequest();

    const getRefresh = async () => {
        try {
            setIsLoading(true);
            const data = await request<{ accessToken: string }>({ url: '/auth/refresh', isAuth: true });
            setIsLoading(false);

            localStorage.setItem('accessToken', data.data.accessToken);
            return data.data.accessToken;
        } catch (error) {
            console.log('Ошибка', error);
        }
    };

    return { isLoading, getRefresh };
};

export default useRefresh;
