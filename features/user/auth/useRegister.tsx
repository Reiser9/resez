'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initSessionId, initUser, initVerificationCodeData, setIsAuth } from '@/store/slices/user';
import useAlert from '@/shared/hooks/useAlert';
import type { RegisterData, RegisterResponse } from '@/entities/user/model';
import useRequest from '@/shared/hooks/useRequest';

const useRegister = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { alertNotify } = useAlert();
    const { request } = useRequest();

    const register = async (data: RegisterData) => {
        try {
            setIsLoading(true);
            const response = await request<RegisterResponse>({ url: '/auth/register', method: 'POST', data });

            dispatch(setIsAuth(true));
            dispatch(initUser(response.data.user));
            dispatch(initSessionId(response.data.sessionId));
            dispatch(initVerificationCodeData(response.data.verificationCodeData));

            alertNotify('Успешно', 'Вы зарегистрировались', 'success');

            localStorage.setItem('accessToken', response.data.accessToken);
            router.push('/');
        } catch {
            alertNotify('Ошибка', 'Произошла ошибка, попробуйте позже', 'error');
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
