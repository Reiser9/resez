'use client';

import React from 'react';

import type { AdminUserSessions, UserAdmin, UserAdminProfile, UsersAdmin, UsersShortAdmin } from '@/entities/user';
import type { Collections } from '@/entities/collection';
import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import { buildQueryString } from '@/shared/utils/buildQueryString';

const useUsers = () => {
    const [usersIsLoading, setUsersIsLoading] = React.useState<number[]>([]);

    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPaginationUsers = async (
        page: number,
        online?: string,
        blocked?: string,
        verified?: string,
        hasRole?: string,
        role?: string,
        search = '',
    ) => {
        const limit = 9;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
            online,
            blocked,
            verified,
            has_role: hasRole,
            role,
            search,
        });

        const response = await request<UsersAdmin>({
            url: `/admin/user?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getPaginationUsersShort = async (page: number, search = '', ids?: string[]) => {
        const limit = 5;
        const queryString = buildQueryString({
            short: true,
            offset: page * limit,
            limit,
            search,
            ids,
        });

        const response = await request<UsersShortAdmin>({
            url: `/admin/user?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const blockUser = async (id: number, reason?: string, successCallback = () => {}) => {
        setUsersIsLoading((prev) => [...prev, id]);
        const response = await request<UserAdmin>({
            url: `/admin/user/${id}/block`,
            isAuth: true,
            method: 'PATCH',
            data: {
                reason,
            },
        });
        setUsersIsLoading((prev) => prev.filter((item) => item !== id));

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Пользователь заблокирован', 'success');
        successCallback();
    };

    const unblockUser = async (id: number, successCallback = () => {}) => {
        setUsersIsLoading((prev) => [...prev, id]);
        const response = await request<UserAdmin>({
            url: `/admin/user/${id}/unblock`,
            isAuth: true,
            method: 'PATCH',
        });
        setUsersIsLoading((prev) => prev.filter((item) => item !== id));

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Пользователь разблокирован', 'success');
        successCallback();
    };

    const changeUserBalance = async (userId: number, amount: number, successCallback = () => {}) => {
        const response = await request<UserAdmin>({
            url: `/admin/user/${userId}/add-coins`,
            isAuth: true,
            method: 'PATCH',
            data: {
                amount,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Баланс изменен', 'success');
        successCallback();
    };

    const getUserInfoById = async (userId: number | string) => {
        const response = await request<{ user: UserAdminProfile }>({
            url: `/admin/user/${userId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.user;
        }
    };

    const getUserSessions = async (page: number, userId: number | string) => {
        const limit = 9;
        const offset = page * limit;
        const queryString = buildQueryString({
            offset: offset,
            limit,
        });

        const response = await request<AdminUserSessions>({
            url: `/admin/user/${userId}/session?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getUserCollections = async (page: number, userId: number | string, search = '') => {
        const limit = 9;
        const offset = page * limit;
        const queryString = buildQueryString({
            offset: offset,
            limit,
            search,
        });

        const response = await request<Collections>({
            url: `/memory-ms/admin/user/${userId}/collection?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    return {
        usersIsLoading,
        getPaginationUsers,
        getPaginationUsersShort,
        blockUser,
        unblockUser,
        changeUserBalance,
        getUserInfoById,
        getUserSessions,
        getUserCollections,
    };
};

export default useUsers;
