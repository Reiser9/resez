'use client';

import type { LogById, Logs } from '@/entities/log';
import { buildQueryString } from '@/shared/utils/buildQueryString';
import useRequest from '@/shared/hooks/useRequest';

const useLogs = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getPagginationLogs = async (page: number) => {
        const limit = 12;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
        });

        const response = await request<Logs>({
            url: `/education-ms/admin/log?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getLogById = async (id: number | string) => {
        const response = await request<{ log: LogById }>({
            url: `/education-ms/admin/log/${id}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.log;
        }
    };

    return {
        getPagginationLogs,
        getLogById,
    };
};

export default useLogs;
