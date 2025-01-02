'use client';

import React from 'react';

import type { AdminNotifiesPaggination, Notifies, Notify, NotifySendDTO, NotifyType } from '@/entities/notify';
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
            url: `/notification-ms/notification?${queryString}`,
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
            url: '/notification-ms/notification/read-all',
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
            url: `/notification-ms/notification/read/${id}`,
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
        sendAt: string,
        content: string,
        type: string,
        successCallback = () => {},
    ) => {
        const titleTrim = title?.trim();
        const authorTrim = author?.trim();

        if (!titleTrim) {
            return alertNotify('Предупреждение', 'Заголовок не может быть пустым', 'warn');
        }

        const response = await request({
            url: '/notification-ms/admin/notification',
            method: 'POST',
            isAuth: true,
            data: {
                title,
                content,
                userIds: userIDs || [],
                ...(authorTrim && { author: authorTrim }),
                type,
                ...(sendAt && { sendAt }),
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Уведомление отправлено', 'success');
        successCallback();
    };

    const getUnreadNotifies = async (successCallback = () => {}) => {
        const response = await request<{ count: number }>({
            url: '/notification-ms/notification/unread-count',
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

    const getPagginationAdminNotifies = async (page: number, delayed?: boolean, senderId?: number) => {
        const limit = 10;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
            delayed,
            senderId,
        });

        const response = await request<AdminNotifiesPaggination>({
            url: `/notification-ms/admin/notification?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getNotificationById = async (notificationId: number | string) => {
        const response = await request<{ notification: NotifySendDTO }>({
            url: `/notification-ms/admin/notification/${notificationId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.notification;
        }
    };

    const updateNotificationById = async (
        notificationId: number,
        title: string,
        author: string,
        userIDs: number[] | string[],
        date: string,
        content: string,
        type: string,
        successCallback = () => {},
    ) => {
        const titleTrim = title?.trim();
        const authorTrim = author?.trim();

        if (!titleTrim) {
            return alertNotify('Предупреждение', 'Заголовок не может быть пустым', 'warn');
        }

        const response = await request<{ notification: NotifySendDTO }>({
            url: `/notification-ms/admin/notification/${notificationId}`,
            isAuth: true,
            method: 'PATCH',
            data: {
                title,
                content,
                userIds: userIDs || [],
                author: authorTrim,
                type,
                ...(date && { date }),
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Уведомление изменено', 'success');

        if ('data' in response) {
            return response.data.notification;
        }
    };

    const removeNotificationById = async (notificationId: number, successCallback = () => {}) => {
        const response = await request({
            url: `/notification-ms/admin/notification/${notificationId}`,
            isAuth: true,
            method: 'DELETE',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Уведомление удалено', 'success');
    };

    const getUserNotificationById = async (notificationId: number) => {
        const response = await request({
            url: `/notification-ms/admin/notification/${notificationId}/user`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const sendDelayedNotificationNowById = async (notificationId: number | string, successCallback = () => {}) => {
        const response = await request({
            url: `/notification-ms/admin/notification/${notificationId}/send-now`,
            isAuth: true,
            method: 'PATCH',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Отложенное уведомление отправлено', 'success');

        if ('data' in response) {
            return response.data;
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
        getPagginationAdminNotifies,
        getNotificationById,
        updateNotificationById,
        removeNotificationById,
        getUserNotificationById,
        sendDelayedNotificationNowById,
    };
};

export default useNotify;
