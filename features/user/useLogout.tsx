'use client';

import React from 'react';

import axiosInstance from '@/api/axios';
import { getAccessToken } from '@/shared/utils/getAccessToken';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initSessionId, initUser, initVerificationCodeData, setIsAuth } from '@/store/slices/user';
import useAlert from '@/shared/hooks/useAlert';

const useLogout = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { alertNotify } = useAlert();
    const accessToken = getAccessToken();

    const logout = async (successCallback: () => void = () => {}) => {
        setIsLoading(true);

        const data = await axiosInstance.get('/auth/logout', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        setIsLoading(false);

        alertNotify("Успешно", "Вы вышли с аккаунта", "success");
        
        dispatch(setIsAuth(false));
        dispatch(initVerificationCodeData(data.data.verificationCodeData));
        dispatch(initUser(null));
        dispatch(initVerificationCodeData(null));
        dispatch(initSessionId(null));
        successCallback();
    };

    return { isLoading, logout };
};

export default useLogout;
