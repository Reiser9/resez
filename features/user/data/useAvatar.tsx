'use client';

import React from 'react';

import type { User } from '@/entities/user';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';

const useAvatar = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();
    const dispatch = useAppDispatch();

    const updateAvatar = async (data: FormData, successCallback = () => {}) => {
        setIsLoading(true);
        const response = await request<{ user: User }>({
            url: '/user/avatar',
            isAuth: true,
            method: 'POST',
            data,
            headers: {
                'Content-type': 'multipart/form-data',
            },
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Изображение загружено', 'success');
    };

    const deleteAvatar = async (successCallback = () => {}) => {
        setIsLoading(true);
        const response = await request<{ user: User }>({
            url: '/user/avatar',
            isAuth: true,
            method: 'DELETE',
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Аватарка удалена', 'success');
    };

    return {
        isLoading,
        updateAvatar,
        deleteAvatar,
    };
};

export default useAvatar;
