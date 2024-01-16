'use client';

import React from 'react';

import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initSessionId, initUser, setIsAuth, setUserData } from '@/store/slices/user';
import { UserShortInfo } from '@/entities/user';
import { setAppIsLoading } from '@/store/slices/app';
import useRequest from '@/shared/hooks/useRequest';

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

            if(!refresh.data.accessToken){
                dispatch(setUserData());
                localStorage.removeItem("accessToken");
                return;
            }

            localStorage.setItem('accessToken', refresh.data.accessToken);

            const data = await request<UserShortInfo>({ url: '/user/short-info', isAuth: true });

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
        checkAuth();
    }, []);
};

export default useCheckAuth;
