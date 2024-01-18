'use client';

import React from 'react';

import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';
import { ChangePassword, VerifyChangePassword } from '@/entities/user';

const useChangePassword = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const { alertNotify } = useAlert();
    const { request } = useRequest();

    const changePassword = async (data: ChangePassword, successCallback: () => void = () => {}) => {
        try {
            setIsLoading(true);
            const response = await request({
                url: '/user/send-change-password-code',
                isAuth: true,
                data,
                method: 'POST',
            });

            alertNotify('Подтверждение', 'Вам выслан код подтверждения, пожалуйста, введите его', 'info');
            successCallback();
        } catch (err) {

            alertNotify('Ошибка', 'Произошла ошибка, попробуйте позже', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const verifyChangePassword = async (data: VerifyChangePassword, successCallback: () => void = () => {}) => {
        try {
            setIsLoading(true);
            const response = await request({
                url: '/user/verify-change-password-code',
                isAuth: true,
                data,
                method: 'PATCH',
            });

            alertNotify('Успешно', 'Пароль изменен', 'success');
            successCallback();
        } catch (err) {
            alertNotify('Ошибка', 'Произошла ошибка, попробуйте позже', 'error');
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
