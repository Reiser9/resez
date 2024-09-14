'use client';

import type { Subscription } from '@/entities/subscription/model';
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

        if ('data' in response) {
            return response.data;
        }
    };

    return {
        getSubscriptions,
        buySubscription,
    };
};

export default useSubscription;
