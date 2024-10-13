'use client';

import type { Subscription } from '@/entities/subscription/model';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';
import { Dayjs } from 'dayjs';

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
                expiredDate,
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
