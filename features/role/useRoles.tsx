'use client';

import React from 'react';

import type { EditRoleDTO, RoleCreateDTO, RoleDTO, Roles } from '@/entities/role';
import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import { buildQueryString } from '@/shared/utils/buildQueryString';

const useRoles = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [roleIsLoading, setRoleIsLoading] = React.useState(false);
    const [rolesIsLoading, setRolesIsLoading] = React.useState<string[]>([]);

    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPaginationRoles = async (page: number, search = '') => {
        const limit = 12;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
            search,
        });

        const response = await request<Roles>({
            url: `/admin/role?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getCurrentRole = async (id: string | number) => {
        setRoleIsLoading(true);
        const response = await request<EditRoleDTO>({
            url: `/admin/role/${id}`,
            isAuth: true,
            method: 'GET',
        });
        setRoleIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const createRole = async (data: RoleCreateDTO, successCallback = () => {}) => {
        const { role, permissions } = data;

        if (!role) {
            return alertNotify('Предупреждение', 'Название роли должно быть заполнено', 'warn');
        } else if (permissions.length === 0) {
            return alertNotify('Предупреждение', 'У роли должна быть хотя бы одна привилегия', 'warn');
        }

        setIsLoading(true);
        const response = await request<RoleDTO>({
            url: '/admin/role',
            isAuth: true,
            method: 'POST',
            data,
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Роль создана', 'success');
    };

    const editRole = async (id: string | number, data: RoleCreateDTO, successCallback = () => {}) => {
        setIsLoading(true);
        const response = await request<RoleDTO>({
            url: `/admin/role/${id}`,
            isAuth: true,
            method: 'PATCH',
            data,
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Роль изменена', 'success');
    };

    const deleteRole = async (id: string, successCallback = () => {}) => {
        setRolesIsLoading((prev) => [...prev, id]);
        const response = await request<RoleDTO>({
            url: `/admin/role/${id}/archive`,
            isAuth: true,
            method: 'DELETE',
        });
        setRolesIsLoading((prev) => prev.filter((item) => item !== id));

        if (catchRequestError(response)) {
            return errorController(response);
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
