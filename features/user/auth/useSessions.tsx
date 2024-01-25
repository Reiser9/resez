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

    const getPaginationSessions = async (
        { pageParam }: { pageParam: number },
        revalidate = () => {},
    ): Promise<Sessions | void> => {
        const limit = pageParam === 0 ? 5 : 6;
        const response = await request<Sessions>({
            url: `/session?offset=${pageParam * 5}&limit=${limit}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response, revalidate);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const endAllSessions = async (successCallback = () => {}): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await request<Session>({
                url: '/session/end-all',
                isAuth: true,
                method: 'PATCH',
                callback: () => endAllSessions(successCallback),
            });

            if (catchRequestError(response)) {
                return errorController(response, () => endAllSessions(successCallback));
            }

            successCallback();
            alertNotify('Успешно', 'Все сессии, кроме текущей, завершены', 'success');
        } catch {
            // Error..
        } finally {
            setIsLoading(false);
        }
    };

    const endSessionById = async (id: number, successCallback = () => {}): Promise<void> => {
        try {
            setSessionsIsLoading((prev) => [...prev, id]);
            const response = await request<Session>({
                url: `/session/end/${id}`,
                isAuth: true,
                method: 'PATCH',
            });

            if (catchRequestError(response)) {
                return errorController(response, () => endSessionById(id, successCallback));
            }

            alertNotify('Успешно', 'Сессия завершена', 'success');
            successCallback();
        } catch {
            // Error..
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
