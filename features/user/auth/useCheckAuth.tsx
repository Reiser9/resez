'use client';

import React from 'react';

import type { UserShortInfo } from '@/entities/user';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { setIsAuth } from '@/store/slices/user';
import { setAppIsLoading, setAuthIsLoading } from '@/store/slices/app';
import useRequest from '@/shared/hooks/useRequest';
import useClearLocalData from '@/shared/hooks/useClearLocalData';

const useCheckAuth = () => {
    const dispatch = useAppDispatch();
    const { request, getHealthServer, catchRequestError, errorController } = useRequest();
    const { clearLocalData } = useClearLocalData();

    const checkAuth = async () => {
        await getHealthServer();
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            dispatch(setAppIsLoading(false));
            return clearLocalData();
        }

        dispatch(setAppIsLoading(true));
        dispatch(setAuthIsLoading(true));

        const data = await request<UserShortInfo>({ url: '/user/short-info', isAuth: true });

        dispatch(setAppIsLoading(false));
        dispatch(setAuthIsLoading(false));

        if (catchRequestError(data)) {
            return errorController(data, '', clearLocalData);
        }

        if ('data' in data) {
            dispatch(setIsAuth(true));
        }
    };

    React.useEffect(() => {
        checkAuth();
    }, []);
};

export default useCheckAuth;
