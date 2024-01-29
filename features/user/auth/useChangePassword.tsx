'use client';

import React from 'react';

import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';
import { ChangePassword, VerifyChangePassword } from '@/entities/user';

const useChangePassword = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const { alertNotify } = useAlert();
    const { request, catchRequestError, errorController } = useRequest();

    const changePassword = async (data: ChangePassword, successCallback: () => void = () => {}): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await request({
                url: '/user/send-change-password-code',
                isAuth: true,
                data,
                method: 'POST',
            });

            if (catchRequestError(response)) {
                return errorController(response);
            }

            alertNotify('Подтверждение', 'Вам выслан код подтверждения, пожалуйста, введите его', 'info');
            successCallback();
        } catch (err) {
            // Error..
        } finally {
            setIsLoading(false);
        }
    };

    const verifyChangePassword = async (
        data: VerifyChangePassword,
        successCallback: () => void = () => {},
    ): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await request({
                url: '/user/verify-change-password-code',
                isAuth: true,
                data,
                method: 'PATCH',
            });

            if (catchRequestError(response)) {
                return errorController(response);
            }

            alertNotify('Успешно', 'Пароль изменен', 'success');
            successCallback();
        } catch (err) {
            // Error..
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        changePassword,
        verifyChangePassword,
    };
};

export default useChangePassword;
