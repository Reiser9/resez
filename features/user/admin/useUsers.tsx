'use client';

import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import { UserAdmin, UsersAdmin } from '@/entities/user/model';

const useNotify = () => {
    const [usersIsLoading, setUsersIsLoading] = React.useState<number[]>([]);

    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPaginationUsers = async ({ pageParam }: { pageParam: number }): Promise<UsersAdmin | void> => {
        const limit = 6;
        const response = await request<UsersAdmin>({
            url: `/admin/user?offset=${pageParam * 6}&limit=${limit}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response, () => getPaginationUsers({ pageParam }));
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const blockUser = async (id: number, successCallback = () => {}): Promise<void> => {
        setUsersIsLoading((prev) => [...prev, id]);

        const response = await request<UserAdmin>({
            url: `/admin/user/${id}/block`,
            isAuth: true,
            method: 'PATCH',
        });

        setUsersIsLoading((prev) => prev.filter((item) => item !== id));

        if (catchRequestError(response)) {
            return errorController(response, () => blockUser(id, successCallback));
        }

        alertNotify('Успешно', 'Пользователь заблокирован', 'success');
        successCallback();
    };

    const unblockUser = async (id: number, successCallback = () => {}): Promise<void> => {
        setUsersIsLoading((prev) => [...prev, id]);

        const response = await request<UserAdmin>({
            url: `/admin/user/${id}/unblock`,
            isAuth: true,
            method: 'PATCH',
        });

        setUsersIsLoading((prev) => prev.filter((item) => item !== id));

        if (catchRequestError(response)) {
            return errorController(response, () => unblockUser(id, successCallback));
        }

        alertNotify('Успешно', 'Пользователь разблокирован', 'success');
        successCallback();
    };

    return {
        usersIsLoading,
        getPaginationUsers,
        blockUser,
        unblockUser,
    };
};

export default useNotify;
