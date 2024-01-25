'use client';

import React from 'react';

import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';
import { RecoveryChangePassword, RecoverySendCode, RecoveryVerifyCode } from '@/entities/user';

const useRecovery = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const { alertNotify } = useAlert();
    const { request, catchRequestError, errorController } = useRequest();

    const sendCode = async (data: RecoverySendCode, successCallback = () => {}): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await request<RecoverySendCode>({
                url: '/auth/send-recovery-password-code',
                isAuth: true,
                method: 'POST',
                data,
            });

            if (catchRequestError(response)) {
                return errorController(response, () => sendCode(data, successCallback));
            }

            successCallback();
            alertNotify('Успешно', 'Для восстановления пароля вам отправлен код подтверждения', 'success');
        } catch {
            // Error..
        } finally {
            setIsLoading(false);
        }
    };

    const verifyCode = async (data: RecoveryVerifyCode, successCallback = () => {}): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await request<RecoveryVerifyCode>({
                url: '/auth/verify-recovery-password-code',
                isAuth: true,
                method: 'POST',
                data,
            });

            if (catchRequestError(response)) {
                return errorController(response, () => verifyCode(data, successCallback));
            }

            successCallback();
            alertNotify('Успешно', 'Придумайте новый пароль', 'success');
        } catch {
            // Error..
        } finally {
            setIsLoading(false);
        }
    };

    const changePassword = async (data: RecoveryChangePassword, successCallback = () => {}): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await request<RecoveryChangePassword>({
                url: '/auth/recovery-password',
                isAuth: true,
                method: 'PATCH',
                data,
            });

            if (catchRequestError(response)) {
                return errorController(response, () => changePassword(data, successCallback));
            }

            successCallback();
            alertNotify('Успешно', 'Пароль изменен', 'success');
        } catch {
            // Error..
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
