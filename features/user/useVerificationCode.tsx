'use client';

import React from 'react';

import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initVerificationCodeData } from '@/store/slices/user';
import { VerificationCodeData } from '@/entities/user';
import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';

const useVerificationCode = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { request } = useRequest();
    const { alertNotify } = useAlert();

    const sendVerificationCode = async (successCallback: () => void = () => {}) => {
        try {
            setIsLoading(true);
            const data = await request<{ verificationCodeData: VerificationCodeData }>({
                url: '/auth/send-verification-code',
                isAuth: true,
            });

            dispatch(initVerificationCodeData(data.data.verificationCodeData));
            successCallback();
        } catch (error) {
            alertNotify('Ошибка', 'Произошла ошибка, попробуйте позже', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, sendVerificationCode };
};

export default useVerificationCode;
