'use client';

import React from 'react';

import { useAppDispatch } from '@/shared/hooks/useRedux';
import { setUserData } from '@/store/slices/user';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';

const useLogout = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { alertNotify } = useAlert();
    const { request } = useRequest();

    const logout = async (successCallback: () => void = () => {}) => {
        try {
            setIsLoading(true);
            await request({ url: '/auth/logout', isAuth: true });
            setIsLoading(false);

            alertNotify('Успешно', 'Вы вышли с аккаунта', 'success');

            dispatch(setUserData());
            localStorage.removeItem("accessToken");
            successCallback();
        } catch (error) {
            console.log('Ошибка', error);
        }
    };

    return { isLoading, logout };
};

export default useLogout;
