'use client';

import React from 'react';

import type { Sessions } from '@/entities/user';
import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import { buildQueryString } from '@/shared/utils/buildQueryString';

const useSessions = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [sessionsIsLoading, setSessionsIsLoading] = React.useState<number[]>([]);

    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getSessions = async () => {
        const response = await request<Sessions>({ url: '/session', isAuth: true });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getPaginationSessions = async (page: number) => {
        const limit = page === 0 ? 8 : 9;
        const offset = page * limit === 0 ? 0 : page * limit - 1;
        const queryString = buildQueryString({
            offset: offset,
            limit,
        });

        const response = await request<Sessions>({
            url: `/session?${queryString}`,
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
        const response = await request<Sessions>({
            url: '/session/end-all',
            isAuth: true,
            method: 'PATCH',
            callback: () => endAllSessions(successCallback),
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Все сессии, кроме текущей, завершены', 'success');
        successCallback();
    };

    const endSessionById = async (id: number, successCallback = () => {}) => {
        setSessionsIsLoading((prev) => [...prev, id]);
        const response = await request({
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
