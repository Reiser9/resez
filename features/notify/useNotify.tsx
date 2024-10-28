'use client';

import React from 'react';

import type { Notifies, Notify, NotifyType } from '@/entities/notify';
import { buildQueryString } from '@/shared/utils/buildQueryString';
import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';

const useNotify = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [notifyIsLoading, setNotifyIsLoading] = React.useState<number[]>([]);

    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPaginationNotifies = async (page: number, unread = false) => {
        const limit = 10;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
            unread: unread ? unread : '',
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
        author: string,
        userIDs: number[] | string[],
        date: string,
        content: string,
        type: string | null,
        successCallback = () => {},
    ) => {
        const titleTrim = title?.trim();
        const authorTrim = author?.trim();

        if (!titleTrim) {
            return alertNotify('Предупреждение', 'Заголовок не может быть пустым', 'warn');
        }

        let notifyData: {
            title: string;
            content: string;
            users: number[] | string[];
            author: string;
            date?: string;
            notifyTypeId?: number | string;
        } = {
            title,
            content,
            users: userIDs || [],
            author: authorTrim,
            ...(date && { date }),
            ...(type && { notifyTypeId: type }),
        };

        const response = await request({
            url: '/admin/notify',
            method: 'POST',
            isAuth: true,
            data: notifyData,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Уведомление отправлено', 'success');
        successCallback();
    };

    const getUnreadNotifies = async (successCallback = () => {}) => {
        const response = await request<{ count: number }>({
            url: '/notify/unread-count',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data.count;
        }
    };

    const getNotifyTypes = async () => {
        const response = await request<{ types: NotifyType[] }>({
            url: '/admin/notify-type',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.types;
        }
    };

    return {
        isLoading,
        notifyIsLoading,
        getPaginationNotifies,
        readAllNotifies,
        readNotifyById,
        sendNotify,
        getUnreadNotifies,
        getNotifyTypes,
    };
};

export default useNotify;
