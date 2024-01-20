"use client";

import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import { Notifies, Notify } from '@/entities/notify';
import useAlert from '@/shared/hooks/useAlert';

const useNotify = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [notifyIsLoading, setNotifyIsLoading] = React.useState<number[]>([]);

    const { request } = useRequest();
    const { alertNotify } = useAlert();

    const getPaginationNotifies = async ({ pageParam }: { pageParam: number }, unread = false) => {
        const limit = 6;
        const response = await request<Notifies>({
            url: `/notify?offset=${pageParam * 6}&limit=${limit}&unread=${unread}`,
            isAuth: true,
        });

        return response.data;
    };

    const readAllNotifies = async (successCallback = () => {}) => {
        try {
            setIsLoading(true);
            await request<Notify>({ url: '/notify/read-all', isAuth: true, method: 'PATCH' });

            successCallback();

            alertNotify('Успешно', 'Уведомления прочитаны', 'success');
        } catch {
            alertNotify('Ошибка', 'Не удалось прочитать уведомления, попробуйте позже', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const readNotifyById = async (id: number, successCallback = () => {}) => {
        try {
            setNotifyIsLoading((prev) => [...prev, id]);
            await request<Notify>({ url: `/notify/read/${id}`, isAuth: true, method: 'PATCH' });

            successCallback();
        } catch {
            console.log('Ошибка прочтения сообщения');
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
