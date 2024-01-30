'use client';

import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import type { Session, Sessions } from '@/entities/user/session';

const useSessions = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [sessionsIsLoading, setSessionsIsLoading] = React.useState<number[]>([]);

    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getSessions = async (): Promise<Sessions | void> => {
        const response = await request<Sessions>({ url: '/session', isAuth: true });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getPaginationSessions = async ({ pageParam }: { pageParam: number }): Promise<Sessions | void> => {
        const limit = pageParam === 0 ? 5 : 6;
        const offset = pageParam * limit === 0 ? 0 : pageParam * limit - 1;
        const response = await request<Sessions>({
            url: `/session?offset=${offset}&limit=${limit}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const endAllSessions = async (successCallback = () => {}): Promise<void> => {
        setIsLoading(true);
        const response = await request<Session>({
            url: '/session/end-all',
            isAuth: true,
            method: 'PATCH',
            callback: () => endAllSessions(successCallback),
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Все сессии, кроме текущей, завершены', 'success');
    };

    const endSessionById = async (id: number, successCallback = () => {}): Promise<void> => {
        setSessionsIsLoading((prev) => [...prev, id]);
        const response = await request<Session>({
            url: `/session/end/${id}`,
            isAuth: true,
            method: 'PATCH',
        });
        setSessionsIsLoading((prev) => prev.filter((item) => item !== id));

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Сессия завершена', 'success');
        successCallback();
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
