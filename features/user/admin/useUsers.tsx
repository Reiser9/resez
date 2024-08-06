'use client';

import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import type { UserAdmin, UsersAdmin } from '@/entities/user';
import { buildQueryString } from '@/shared/utils/buildQueryString';

const useNotify = () => {
    const [usersIsLoading, setUsersIsLoading] = React.useState<number[]>([]);

    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPaginationUsers = async (page: number) => {
        const limit = 6;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
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

    return {
        usersIsLoading,
        getPaginationUsers,
        blockUser,
        unblockUser,
        changeUserBalance,
    };
};

export default useNotify;
