import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import type { Session, Sessions } from '@/entities/user/session';
import useAlert from '@/shared/hooks/useAlert';

const useSessions = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const { request } = useRequest();
    const { alertNotify } = useAlert();

    const getSessions = async () => {
        const response = await request<Sessions>({ url: '/session', isAuth: true });

        return response;
    };

    const endAllSessions = async (successCallback = () => {}) => {
        try {
            setIsLoading(true);
            const response = await request<Session>({ url: '/session/end-all', isAuth: true, method: 'PATCH' });

            successCallback();
        } catch {
            alertNotify('Ошибка', 'Не удалось завершить сессии, попробуйте позже', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        getSessions,
        endAllSessions,
    };
};

export default useSessions;
