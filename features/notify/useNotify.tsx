'use client';

import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import { Notifies, Notify } from '@/entities/notify';
import useAlert from '@/shared/hooks/useAlert';
import { buildQueryString } from '@/shared/utils/buildQueryString';

const useNotify = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [notifyIsLoading, setNotifyIsLoading] = React.useState<number[]>([]);

    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPaginationNotifies = async (page: number, unread = false) => {
        const limit = 9;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
            unread,
        });

        const response = await request<Notifies>({
            url: `/notify?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const readAllNotifies = async (successCallback = () => {}) => {
        setIsLoading(true);
        const response = await request<Notify>({
            url: '/notify/read-all',
            isAuth: true,
            method: 'PATCH',
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Уведомления прочитаны', 'success');
    };

    const readNotifyById = async (id: number, successCallback = () => {}) => {
        setNotifyIsLoading((prev) => [...prev, id]);
        const response = await request<Notify>({
            url: `/notify/read/${id}`,
            isAuth: true,
            method: 'PATCH',
        });
        setNotifyIsLoading((prev) => prev.filter((item) => item !== id));

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
    };

    const sendNotify = async (
        title: string,
        sender: string,
        userIDs: number[] | string[],
        date: string,
        content: string,
        type = 1,
        successCallback = () => {},
    ) => {
        const titleTrim = title?.trim();
        const senderTrim = sender?.trim();

        if (!titleTrim) {
            return alertNotify('Предупреждение', 'Заголовок не может быть пустым', 'warn');
        }

        setIsLoading(true);

        const response = await request({
            url: 'admin/notify',
            method: 'POST',
            isAuth: true,
            data: {
                title,
                // sender: senderTrim,
                // userIDs: userIDs || [],
                // date,
                content,
                notifyTypeId: type,
            },
        });

        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Уведомление отправлено', 'success');
        successCallback();
    };

    return {
        isLoading,
        notifyIsLoading,
        getPaginationNotifies,
        readAllNotifies,
        readNotifyById,
        sendNotify,
    };
};

export default useNotify;
