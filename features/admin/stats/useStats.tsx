'use client';

import type { AdminStats } from '@/entities/admin';
import useRequest from '@/shared/hooks/useRequest';

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
