'use client';

import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';

const usePromocode = () => {
    const { request, errorController, catchRequestError } = useRequest();
    const { alertNotify } = useAlert();

    const createPromocode = async (
        code: string,
        expiredDate?: string,
        limit?: number | string,
        xp?: number | string,
        coins?: number | string,
        successCallback = () => {},
    ) => {
        const response = await request({
            url: '/admin/promo-code',
            method: 'POST',
            isAuth: true,
            data: {
                code,
                ...(expiredDate && { expiredDate }),
                ...(limit && { limit }),
                ...(xp && { xp }),
                ...(coins && { coins }),
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data;
        }
    };

    const activatePromocode = async (code: string, successCallback = () => {}) => {
        const response = await request({
            url: '/promo-code',
            method: 'POST',
            isAuth: true,
            data: {
                code,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Промокод активирован', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    return {
        createPromocode,
        activatePromocode,
    };
};

export default usePromocode;
