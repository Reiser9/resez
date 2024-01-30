'use client';

import React from 'react';

import { User } from '@/entities/user';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initUser } from '@/store/slices/user';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';

const useAvatar = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();
    const dispatch = useAppDispatch();

    const updateAvatar = async (formData: FormData, successCallback = () => {}): Promise<void> => {
        setIsLoading(true);
        const response = await request<{ user: User }>({
            url: '/user/avatar',
            isAuth: true,
            method: 'POST',
            data: formData,
            headers: {
                'Content-type': 'multipart/form-data',
            },
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            dispatch(initUser(response.data.user));
        }

        successCallback();
        alertNotify('Успешно', 'Изображение загружено', 'success');
    };

    const deleteAvatar = async (successCallback = () => {}): Promise<void> => {
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

        if ('data' in response) {
            dispatch(initUser(response.data.user));
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
