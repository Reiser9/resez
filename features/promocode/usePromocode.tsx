'use client';

import type { PagginationPromocodes, Promocode, PromocodeReward } from '@/entities/promocode';
import { buildQueryString } from '@/shared/utils/buildQueryString';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';

const usePromocode = () => {
    const { request, errorController, catchRequestError } = useRequest();
    const { alertNotify } = useAlert();

    const getPagginationPromocodes = async (page: number, active = true) => {
        const limit = 10;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
            active,
        });

        const response = await request<PagginationPromocodes>({
            url: `/admin/promo-code?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const createPromocode = async (
        code: string,
        expiredDate?: string,
        limit?: number | string,
        xp?: number | string,
        coins?: number | string,
        successCallback = () => {},
    ) => {
        const response = await request<{ promoCode: Promocode }>({
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
            return response.data.promoCode;
        }
    };

    const activatePromocode = async (code: string, successCallback = () => {}) => {
        const response = await request<{ reward: PromocodeReward }>({
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
        getPagginationPromocodes,
        createPromocode,
        activatePromocode,
    };
};

export default usePromocode;
