'use client';

import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import type { Permissions } from '@/entities/role';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initRoles } from '@/store/slices/role';

const usePermissions = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const { request, catchRequestError, errorController } = useRequest();
    const dispatch = useAppDispatch();

    const getAllPermissions = async () => {
        setIsLoading(true);
        const response = await request<{ permissions: Permissions[] }>({
            url: '/admin/permission',
            isAuth: true,
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
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
