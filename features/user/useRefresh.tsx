'use client';

import React from 'react';

import axiosInstance from '@/api/axios';
import { getAccessToken } from '@/shared/utils/getAccessToken';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initSessionId, initUser, initVerificationCodeData, setIsAuth } from '@/store/slices/user';

const useRefresh = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    const accessToken = getAccessToken();

    const logout = async () => {
        setIsLoading(true);

        const data = await axiosInstance.get('/auth/refresh', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        setIsLoading(false);

        localStorage.setItem("accessToken", data.data.accessToken);
        
        dispatch(setIsAuth(false));
        dispatch(initVerificationCodeData(data.data.verificationCodeData));
        dispatch(initUser(null));
        dispatch(initVerificationCodeData(null));
        dispatch(initSessionId(null));
    };

    return { isLoading, logout };
};

export default useRefresh;
