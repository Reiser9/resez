'use client';

import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import type { EditRoleDTO, Role, RoleCreateDTO, RoleDTO, Roles } from '@/entities/role';

const useRoles = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [roleIsLoading, setRoleIsLoading] = React.useState<boolean>(false);
    const [rolesIsLoading, setRolesIsLoading] = React.useState<number[]>([]);

    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPaginationRoles = async (
        { pageParam }: { pageParam: number },
        revalidate = () => {},
    ): Promise<Roles | void> => {
        const limit = 8;
        const response = await request<Roles>({
            url: `/admin/role?offset=${pageParam * limit}&limit=${limit}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response, revalidate);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getCurrentRole = async (id: string | number): Promise<EditRoleDTO | void> => {
        setRoleIsLoading(true);
        const response = await request<EditRoleDTO>({
            url: `/admin/role/${id}`,
            isAuth: true,
            method: 'GET',
        });
        setRoleIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response, () => getCurrentRole(id));
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const createRole = async (data: RoleCreateDTO, successCallback = () => {}): Promise<void> => {
        setIsLoading(true);
        const response = await request<RoleDTO>({
            url: '/admin/role',
            isAuth: true,
            method: 'POST',
            data,
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response, () => createRole(data, successCallback));
        }

        successCallback();
        alertNotify('Успешно', 'Роль создана', 'success');
    };

    const editRole = async (id: string | number, data: RoleCreateDTO, successCallback = () => {}): Promise<void> => {
        setIsLoading(true);
        const response = await request<RoleDTO>({
            url: `/admin/role/${id}`,
            isAuth: true,
            method: 'PATCH',
            data,
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response, () => editRole(id, data, successCallback));
        }

        successCallback();
        alertNotify('Успешно', 'Роль изменена', 'success');
    };

    const deleteRole = async (id: number, successCallback = () => {}): Promise<void> => {
        setRolesIsLoading((prev) => [...prev, id]);
        const response = await request<RoleDTO>({
            url: `/admin/role/${id}/archive`,
            isAuth: true,
            method: 'DELETE',
        });
        setRolesIsLoading((prev) => prev.filter((item) => item !== id));

        if (catchRequestError(response)) {
            return errorController(response, () => deleteRole(id, successCallback));
        }

        alertNotify('Успешно', 'Роль удалена', 'success');
        successCallback();
    };

    return {
        isLoading,
        roleIsLoading,
        rolesIsLoading,
        getPaginationRoles,
        getCurrentRole,
        createRole,
        editRole,
        deleteRole,
    };
};

export default useRoles;
