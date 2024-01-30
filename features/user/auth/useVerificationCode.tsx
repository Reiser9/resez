'use client';

import React from 'react';

import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initVerificationCodeData } from '@/store/slices/user';
import { VerificationCodeData } from '@/entities/user';
import useRequest from '@/shared/hooks/useRequest';

const useVerificationCode = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { request, catchRequestError, errorController } = useRequest();

    const sendVerificationCode = async (successCallback: () => void = () => {}): Promise<void> => {
        setIsLoading(true);
        const response = await request<{ verificationCodeData: VerificationCodeData }>({
            url: '/auth/send-verification-code',
            isAuth: true,
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            dispatch(initVerificationCodeData(response.data.verificationCodeData));
        }

        successCallback();
    };

    return { isLoading, sendVerificationCode };
};

export default useVerificationCode;
