'use client';

import React from 'react';

import axiosInstance from '@/api/axios';
import { getAccessToken } from '@/shared/utils/getAccessToken';

const useVerificationCode = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const accessToken = getAccessToken();

    const sendVerificationCode = async (successCallback: () => void = () => {}) => {
        setIsLoading(true);

        const data = await axiosInstance.get('/auth/send-verification-code', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        setIsLoading(false);

        successCallback();
    };

    return { isLoading, sendVerificationCode };
};

export default useVerificationCode;
