'use client';

import useRequest from '@/shared/hooks/useRequest';
import type { Permissions } from '@/entities/role';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initRoles } from '@/store/slices/role';

const usePermissions = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const dispatch = useAppDispatch();

    const getAllPermissions = async () => {
        const response = await request<{ permissions: Permissions[] }>({
            url: '/admin/permission',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            dispatch(initRoles(response.data.permissions));
            return response.data.permissions;
        }
    };

    return {
        getAllPermissions,
    };
};

export default usePermissions;
