'use client';

import React from 'react';

import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initVerificationCodeData } from '@/store/slices/user';
import useRequest from '@/shared/hooks/useRequest';
import { VerificationCodeData } from '@/entities/user';

const useVerificationCode = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { request } = useRequest();

    const sendVerificationCode = async (successCallback: () => void = () => {}) => {
        try {
            setIsLoading(true);
            const data = await request<{ verificationCodeData: VerificationCodeData }>({
                url: '/auth/send-verification-code',
                isAuth: true,
            });
            setIsLoading(false);

            dispatch(initVerificationCodeData(data.data.verificationCodeData));
            successCallback();
        } catch (error) {
            console.log('Ошибка', error);
        }
    };

    return { isLoading, sendVerificationCode };
};

export default useVerificationCode;
