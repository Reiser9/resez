'use client';

import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import { Notifies, Notify } from '@/entities/notify';
import useAlert from '@/shared/hooks/useAlert';

const useNotify = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [notifyIsLoading, setNotifyIsLoading] = React.useState<number[]>([]);

    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPaginationNotifies = async (
        { pageParam }: { pageParam: number },
        unread = false,
    ): Promise<Notifies | void> => {
        const limit = 6;
        const response = await request<Notifies>({
            url: `/notify?offset=${pageParam * 6}&limit=${limit}&unread=${unread}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response, () => getPaginationNotifies({ pageParam }));
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const readAllNotifies = async (successCallback = () => {}): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await request<Notify>({
                url: '/notify/read-all',
                isAuth: true,
                method: 'PATCH',
            });

            if (catchRequestError(response)) {
                return errorController(response, () => readAllNotifies(successCallback));
            }

            successCallback();
            alertNotify('Успешно', 'Уведомления прочитаны', 'success');
        } catch {
            // Error..
        } finally {
            setIsLoading(false);
        }
    };

    const readNotifyById = async (id: number, successCallback = () => {}): Promise<void> => {
        try {
            setNotifyIsLoading((prev) => [...prev, id]);
            const response = await request<Notify>({
                url: `/notify/read/${id}`,
                isAuth: true,
                method: 'PATCH',
            });

            if (catchRequestError(response)) {
                return errorController(response, () => readNotifyById(id, successCallback));
            }

            successCallback();
        } catch {
            // Error..
        } finally {
            setNotifyIsLoading((prev) => prev.filter((item) => item !== id));
        }
    };

    return {
        isLoading,
        notifyIsLoading,
        getPaginationNotifies,
        readAllNotifies,
        readNotifyById,
    };
};

export default useNotify;
