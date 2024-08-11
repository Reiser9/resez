'use client';

import { buildQueryString } from '@/shared/utils/buildQueryString';
import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import { WarnsPaggination } from '@/entities/admin';

const useWarn = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPagginationWarns = async (page: number) => {
        const limit = 10;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
        });

        const response = await request<WarnsPaggination>({
            url: `/admin/feedback?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const createWarn = async (text: string, successCallback = () => {}) => {
        const response = await request({
            url: '/feedback',
            isAuth: true,
            method: 'POST',
            data: {
                text,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Ваше обращение отправлено', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    const readWarn = async (id: number | string, successCallback = () => {}) => {
        const response = await request({
            url: '/feedback',
            isAuth: true,
            method: 'PATCH',
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
        getPagginationWarns,
        createWarn,
        readWarn
    };
};

export default useWarn;
