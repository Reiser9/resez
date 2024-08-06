'use client';

import useRequest from '@/shared/hooks/useRequest';
import { AdminStats } from '@/entities/admin';

const useStats = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getAdminStats = async () => {
        const response = await request<{ stats: AdminStats }>({
            url: '/admin/user/stats',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.stats;
        }
    };

    return {
        getAdminStats,
    };
};

export default useStats;
