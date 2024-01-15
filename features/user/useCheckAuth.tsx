'use client';

import React from 'react';

import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initSessionId, initUser, setIsAuth } from '@/store/slices/user';
import useRequest from '@/shared/hooks/useRequest';
import { UserShortInfo } from '@/entities/user';
import { setAppIsLoading } from '@/store/slices/app';

const useCheckAuth = () => {
    const dispatch = useAppDispatch();
    const { request, clearLocalData } = useRequest();

    const checkAuth = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                return clearLocalData();
            }

            dispatch(setAppIsLoading(true));
            const refresh = await request<{ accessToken: string }>({ url: '/auth/refresh' });
            console.log(refresh);

            localStorage.setItem('accessToken', refresh.data.accessToken);

            const data = await request<UserShortInfo>({ url: '/user/short-info', isAuth: true });
            console.log(data);

            dispatch(setIsAuth(true));
            dispatch(initUser(data.data.user));
            dispatch(initSessionId(data.data.sessionId));
        } catch (error) {
            console.log('Ошибка', error);
        } finally {
            dispatch(setAppIsLoading(false));
        }
    };

    React.useEffect(() => {
        console.log("Ку");
        checkAuth();
    }, []);
};

export default useCheckAuth;
