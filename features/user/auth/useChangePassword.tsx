'use client';

import React from 'react';

import type { ChangePassword, VerifyChangePassword } from '@/entities/user';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';

const useChangePassword = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const { alertNotify } = useAlert();
    const { request, catchRequestError, errorController } = useRequest();

    const changePassword = async (data: ChangePassword, successCallback = () => {}) => {
        setIsLoading(true);
        const response = await request({
            url: '/user/send-change-password-code',
            isAuth: true,
            data,
            method: 'POST',
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Подтверждение', 'Вам выслан код подтверждения, пожалуйста, введите его', 'info');
        successCallback();
    };

    const verifyChangePassword = async (data: VerifyChangePassword, successCallback = () => {}) => {
        setIsLoading(true);
        const response = await request({
            url: '/user/verify-change-password-code',
            isAuth: true,
            data,
            method: 'PATCH',
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Пароль изменен', 'success');
        successCallback();
    };

    return {
        isLoading,
        changePassword,
        verifyChangePassword,
    };
};

export default useChangePassword;
