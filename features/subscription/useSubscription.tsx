'use client';

import { Dayjs } from 'dayjs';

import type { Subscription } from '@/entities/subscription';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';

const useSubscription = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getSubscriptions = async () => {
        const response = await request<{ subscriptions: Subscription[] }>({
            url: '/subscription',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.subscriptions;
        }
    };

    const buySubscription = async (subscriptionId: number | string, successCallback = () => {}) => {
        const response = await request({
            url: `/subscription/buy/${subscriptionId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Подписка куплена', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    const assignSubscription = async (
        subscriptionId: number | string,
        userId: number | string,
        expiredDate: Dayjs | null | undefined,
        isPermanent: boolean,
        successCallback = () => {},
    ) => {
        const response = await request({
            url: '/admin/subscription/assign',
            isAuth: true,
            method: 'POST',
            data: {
                subscriptionId,
                userId,
                ...(expiredDate && { expiredDate }),
                isPermanent,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Подписка выдана', 'success');
    };

    return {
        getSubscriptions,
        buySubscription,
        assignSubscription,
    };
};

export default useSubscription;
