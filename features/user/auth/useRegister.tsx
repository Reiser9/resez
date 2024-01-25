'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initSessionId, initUser, initVerificationCodeData, setIsAuth } from '@/store/slices/user';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';
import type { RegisterData, RegisterResponse } from '@/entities/user/model';

const useRegister = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { alertNotify } = useAlert();
    const { request, catchRequestError, errorController } = useRequest();

    const register = async (data: RegisterData): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await request<RegisterResponse>({ url: '/auth/register', method: 'POST', data });

            if (catchRequestError(response)) {
                return errorController(response);
            }

            if ('data' in response) {
                dispatch(setIsAuth(true));
                dispatch(initUser(response.data.user));
                dispatch(initSessionId(response.data.sessionId));
                dispatch(initVerificationCodeData(response.data.verificationCodeData));
                localStorage.setItem('accessToken', response.data.accessToken);
            }

            alertNotify('Успешно', 'Вы зарегистрировались', 'success');

            router.push('/');
        } catch {
            // Error..
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        register,
    };
};

export default useRegister;
