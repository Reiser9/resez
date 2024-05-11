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
        setIsLoading(true);
        const response = await request<RecoverySendCode>({
            url: '/auth/send-recovery-password-code',
            isAuth: true,
            method: 'POST',
            data,
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Для восстановления пароля вам отправлен код подтверждения', 'success');
    };

    const verifyCode = async (data: RecoveryVerifyCode, successCallback = () => {}): Promise<void> => {
        setIsLoading(true);
        const response = await request<RecoveryVerifyCode>({
            url: '/auth/verify-recovery-password-code',
            isAuth: true,
            method: 'POST',
            data,
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Придумайте новый пароль', 'success');
    };

    const changePassword = async (data: RecoveryChangePassword, successCallback = () => {}): Promise<void> => {
        setIsLoading(true);
        const response = await request<RecoveryChangePassword>({
            url: '/auth/recovery-password',
            isAuth: true,
            method: 'PATCH',
            data,
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Пароль изменен', 'success');
    };

    return {
        isLoading,
        sendCode,
        verifyCode,
        changePassword,
    };
};

export default useRecovery;
