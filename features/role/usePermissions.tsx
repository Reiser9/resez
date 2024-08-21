'use client';

import type { Permissions } from '@/entities/role';
import useRequest from '@/shared/hooks/useRequest';

const usePermissions = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getAllPermissions = async () => {
        const response = await request<{ permissions: Permissions[] }>({
            url: '/admin/permission',
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
        getAllPermissions,
    };
};

export default usePermissions;
