import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import type { Session, Sessions } from '@/entities/user/session';
import useAlert from '@/shared/hooks/useAlert';

const useSessions = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [sessionsIsLoading, setSessionsIsLoading] = React.useState<number[]>([]);

    const { request } = useRequest();
    const { alertNotify } = useAlert();

    const getSessions = async () => {
        const response = await request<Sessions>({ url: '/session', isAuth: true });

        return response.data;
    };

    const getPaginationSessions = async ({ pageParam }: { pageParam: number }) => {
        const limit = pageParam === 0 ? 5 : 6;
        const response = await request<Sessions>({
            url: `/session?offset=${pageParam * 5}&limit=${limit}`,
            isAuth: true,
        });

        return response.data;
    };

    const endAllSessions = async (successCallback = () => {}) => {
        try {
            setIsLoading(true);
            const response = await request<Session>({ url: '/session/end-all', isAuth: true, method: 'PATCH' });

            successCallback();

            alertNotify('Успешно', 'Все сессии, кроме текущей, завершены', 'success');
        } catch {
            alertNotify('Ошибка', 'Не удалось завершить сессии, попробуйте позже', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const endSessionById = async (id: number, successCallback = () => {}) => {
        try {
            setSessionsIsLoading((prev) => [...prev, id]);
            const response = await request<Session>({ url: `/session/end/${id}`, isAuth: true, method: 'PATCH' });

            alertNotify('Успешно', 'Сессия завершена', 'success');
            successCallback();
        } catch {
        } finally {
            setSessionsIsLoading((prev) => prev.filter((item) => item !== id));
        }
    };

    return {
        isLoading,
        sessionsIsLoading,
        getSessions,
        getPaginationSessions,
        endAllSessions,
        endSessionById,
    };
};

export default useSessions;
