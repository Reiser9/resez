'use client';

import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import type { Permissions, Role, RoleCreateDTO, RoleDTO, Roles } from '@/entities/role';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initRoles } from '@/store/slices/role';

const usePermissions = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [rolesIsLoading, setRolesIsLoading] = React.useState<number[]>([]);

    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();
    const dispatch = useAppDispatch();

    const getAllPermissions = async () => {
        setIsLoading(true);
        const response = await request<{ permissions: Permissions[] }>({
            url: '/admin/permission',
            isAuth: true,
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response, getAllPermissions);
        }

        if ('data' in response) {
            dispatch(initRoles(response.data.permissions));
        }
    };

    return {
        isLoading,
        getAllPermissions,
    };
};

export default usePermissions;
