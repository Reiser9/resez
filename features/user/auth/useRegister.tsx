'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import type { RegisterData, RegisterResponse } from '@/entities/user/model';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initVerificationCodeData, setIsAuth } from '@/store/slices/user';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';

const useRegister = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { alertNotify } = useAlert();
    const { request, catchRequestError, errorController } = useRequest();

    const register = async (data: RegisterData) => {
        setIsLoading(true);
        const response = await request<RegisterResponse>({ url: '/auth/register', method: 'POST', data });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            dispatch(setIsAuth(true));
            dispatch(initVerificationCodeData(response.data.verificationCodeData));
            localStorage.setItem('accessToken', response.data.accessToken);
        }

        alertNotify('Успешно', 'Вы зарегистрировались', 'success');

        router.push('/');
    };

    return {
        isLoading,
        register,
    };
};

export default useRegister;
