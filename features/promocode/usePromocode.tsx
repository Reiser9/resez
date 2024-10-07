'use client';

import type { PagginationPromocodes, Promocode, PromocodeActivationUsers, PromocodeReward } from '@/entities/promocode';
import { buildQueryString } from '@/shared/utils/buildQueryString';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';

const usePromocode = () => {
    const { request, errorController, catchRequestError } = useRequest();
    const { alertNotify } = useAlert();

    const getPagginationPromocodes = async (page: number, active?: string) => {
        const limit = 9;
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
            return response.data.reward;
        }
    };

    const deactivatePromocode = async (id: string | number, successCallback = () => {}) => {
        const response = await request<{ reward: PromocodeReward }>({
            url: `/admin/promo-code/${id}/finish`,
            method: 'DELETE',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Промокод деактивирован', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    const getPromocodeById = async (id: string | number, successCallback = () => {}) => {
        const response = await request<{ promocode: Promocode }>({
            url: `/admin/promo-code/${id}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data.promocode;
        }
    };

    const getUsersActivatedPromocodeById = async (id: string | number, successCallback = () => {}) => {
        const response = await request<PromocodeActivationUsers>({
            url: `/admin/promo-code/${id}/user`,
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
        getPagginationPromocodes,
        createPromocode,
        activatePromocode,
        deactivatePromocode,
        getPromocodeById,
        getUsersActivatedPromocodeById,
    };
};

export default usePromocode;
