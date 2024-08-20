'use client';

import type { Permission } from '@/entities/user';
import useRequest from '@/shared/hooks/useRequest';

const useUserPermissions = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getUserPermissions = async () => {
        const response = await request<{ permissions: Permission[] }>({
            url: '/user/permission',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.permissions;
        }
    };

    return {
        getUserPermissions,
    };
};

export default useUserPermissions;
