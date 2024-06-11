'use client';

import React from 'react';

import useAlert from '@/shared/hooks/useAlert';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initSessionId, initUser, initVerificationCodeData, setIsAuth } from '@/store/slices/user';
import useRequest from '@/shared/hooks/useRequest';
import type { LoginData, LoginResponse, LoginWithQRData } from '@/entities/user';

const useLogin = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { alertNotify } = useAlert();
    const { request, catchRequestError, errorController } = useRequest();

    const login = async (data?: LoginData | LoginWithQRData, callUrl = '/', withQr = false): Promise<void> => {
        setIsLoading(true);

        if (withQr) {
            var response = await request<LoginResponse>({
                url: `auth/login/${(data as LoginWithQRData).code}`,
                method: 'POST',
            });
        } else {
            var response = await request<LoginResponse>({
                url: 'auth/login',
                method: 'POST',
                data,
            });
        }

        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            dispatch(setIsAuth(true));
            dispatch(initUser(response.data.user));
            dispatch(initSessionId(response.data.sessionId));

            if (response.data.verificationCodeData) {
                dispatch(initVerificationCodeData(response.data.verificationCodeData));
            }

            localStorage.setItem('accessToken', response.data.accessToken);
        }

        alertNotify('Успешно', 'Вы авторизовались', 'success');
    };

    return {
        isLoading,
        login,
    };
};

export default useLogin;
