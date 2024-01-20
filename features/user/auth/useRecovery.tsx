'use client';

import React from 'react';

import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';
import { RecoveryChangePassword, RecoverySendCode, RecoveryVerifyCode } from '@/entities/user';

const useRecovery = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const { alertNotify } = useAlert();
    const { request } = useRequest();

    const sendCode = async (data: RecoverySendCode, successCallback = () => {}) => {
        try {
            setIsLoading(true);
            await request<RecoverySendCode>({
                url: '/auth/send-recovery-password-code',
                isAuth: true,
                method: 'POST',
                data,
            });

            successCallback();

            alertNotify('Успешно', 'Для восстановления пароля вам отправлен код подтверждения', 'success');
        } catch {
            alertNotify('Ошибка', 'Произошла ошибка, попробуйте позже', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const verifyCode = async (data: RecoveryVerifyCode, successCallback = () => {}) => {
        try {
            setIsLoading(true);
            await request<RecoveryVerifyCode>({
                url: '/auth/verify-recovery-password-code',
                isAuth: true,
                method: 'POST',
                data,
            });

            successCallback();

            alertNotify('Успешно', 'Придумайте новый пароль', 'success');
        } catch {
            alertNotify('Ошибка', 'Произошла ошибка, попробуйте позже', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const changePassword = async (data: RecoveryChangePassword, successCallback = () => {}) => {
        try {
            setIsLoading(true);
            await request<RecoveryChangePassword>({
                url: '/auth/recovery-password',
                isAuth: true,
                method: 'PATCH',
                data,
            });

            successCallback();

            alertNotify('Успешно', 'Пароль изменен', 'success');
        } catch {
            alertNotify('Ошибка', 'Произошла ошибка, попробуйте позже', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        sendCode,
        verifyCode,
        changePassword,
    };
};

export default useRecovery;
