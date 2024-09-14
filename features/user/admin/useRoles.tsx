'use client';

import type { RoleDTO, RolesByUserId } from '@/entities/role';
import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import { buildQueryString } from '@/shared/utils/buildQueryString';

const useRoles = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPaginationRolesByUserId = async (page: number, userId: number | string) => {
        const limit = 9;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
        });

        const response = await request<RolesByUserId>({
            url: `/admin/user/${userId}/role?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const toggleRole = async (userId: string | number, roleId: string | number, successCallback = () => {}) => {
        const response = await request<RoleDTO>({
            url: `/admin/role/toggle`,
            isAuth: true,
            method: 'POST',
            data: {
                userId,
                roleId,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Операция выполнена', 'success');
        successCallback();
    };

    return {
        getPaginationRolesByUserId,
        toggleRole,
    };
};

export default useRoles;
