'use client';

import React from 'react';

import { User } from '@/entities/user';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initUser } from '@/store/slices/user';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';

const useAvatar = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const { request } = useRequest();
    const { alertNotify } = useAlert();
    const dispatch = useAppDispatch();

    const updateAvatar = async (formData: FormData, successCallback = () => {}) => {
        try {
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

            successCallback();
            dispatch(initUser(response.data.user));
            alertNotify('Успешно', 'Изображение загружено', 'success');
        } catch {
            alertNotify('Ошибка', 'Произошла ошибка, попробуйте позже', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteAvatar = async (successCallback = () => {}) => {
        try {
            setIsLoading(true);
            const response = await request<{ user: User }>({
                url: '/user/avatar',
                isAuth: true,
                method: 'DELETE',
            });

            successCallback();
            dispatch(initUser(response.data.user));
            alertNotify('Успешно', 'Аватарка удалена', 'success');
        } catch {
            alertNotify('Ошибка', 'Произошла ошибка, попробуйте позже', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        updateAvatar,
        deleteAvatar,
    };
};

export default useAvatar;
