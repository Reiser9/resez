'use client';

import useRequest from '@/shared/hooks/useRequest';
import type { UserShortInfo } from '@/entities/user';

const useShortInfo = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getShortInfo = async () => {
        const response = await request<UserShortInfo>({
            url: '/user/short-info',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    return {
        getShortInfo,
    };
};

export default useShortInfo;
