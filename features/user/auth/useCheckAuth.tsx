'use client';

import React from 'react';

import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initSessionId, initUser, setIsAuth } from '@/store/slices/user';
import { UserShortInfo } from '@/entities/user';
import { setAppIsLoading, setAuthIsLoading } from '@/store/slices/app';
import useRequest from '@/shared/hooks/useRequest';

const useCheckAuth = () => {
    const dispatch = useAppDispatch();
    const { request, clearLocalData, getHealthServer, catchRequestError, errorController } = useRequest();

    // Refactoring
    const checkAuth = async (): Promise<void> => {
        try {
            await getHealthServer();
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                return clearLocalData();
            }

            dispatch(setAuthIsLoading(true));
            const refresh = await request<{ accessToken: string }>({ url: '/auth/refresh' });

            if (catchRequestError(refresh)) {
                return errorController(refresh, checkAuth, '', clearLocalData);
            }

            if ('data' in refresh) {
                localStorage.setItem('accessToken', refresh.data.accessToken);
            }

            const data = await request<UserShortInfo>({ url: '/user/short-info', isAuth: true });

            if (catchRequestError(data)) {
                return errorController(data, checkAuth, '', clearLocalData);
            }

            if ('data' in data) {
                dispatch(setIsAuth(true));
                dispatch(initUser(data.data.user));
                dispatch(initSessionId(data.data.sessionId));
            }
        } catch (error) {
            // Error..
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
