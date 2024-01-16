'use client';

import React from 'react';

import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initSessionId, initUser, setIsAuth, setUserData } from '@/store/slices/user';
import { UserShortInfo } from '@/entities/user';
import { setAppIsLoading, setAuthIsLoading } from '@/store/slices/app';
import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';

const useCheckAuth = () => {
    const dispatch = useAppDispatch();
    const { request, clearLocalData, getHealthServer } = useRequest();
    const { alertNotify } = useAlert();

    const checkAuth = async () => {
        try {
            await getHealthServer();
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                return clearLocalData();
            }

            dispatch(setAuthIsLoading(true));
            const refresh = await request<{ accessToken: string }>({ url: '/auth/refresh' });

            if (!refresh.data.accessToken) {
                dispatch(setUserData());
                localStorage.removeItem('accessToken');
                return;
            }

            localStorage.setItem('accessToken', refresh.data.accessToken);

            const data = await request<UserShortInfo>({ url: '/user/short-info', isAuth: true });

            dispatch(setIsAuth(true));
            dispatch(initUser(data.data.user));
            dispatch(initSessionId(data.data.sessionId));
        } catch (error) {
            alertNotify('Ошибка', 'Произошла ошибка, попробуйте позже', 'error');
        } finally {
            dispatch(setAppIsLoading(false));
            dispatch(setAuthIsLoading(false));
        }
    };

    React.useEffect(() => {
        checkAuth();
    }, []);
};

export default useCheckAuth;
