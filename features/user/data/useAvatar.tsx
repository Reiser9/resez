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

            if (catchRequestError(response)) {
                return errorController(response, () => updateAvatar(formData, successCallback));
            }

            if ('data' in response) {
                dispatch(initUser(response.data.user));
            }

            successCallback();
            alertNotify('Успешно', 'Изображение загружено', 'success');
        } catch {
            // Error..
        } finally {
            setIsLoading(false);
        }
    };

    const deleteAvatar = async (successCallback = () => {}): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await request<{ user: User }>({
                url: '/user/avatar',
                isAuth: true,
                method: 'DELETE',
            });

            if (catchRequestError(response)) {
                return errorController(response, () => deleteAvatar(successCallback));
            }

            if ('data' in response) {
                dispatch(initUser(response.data.user));
            }

            successCallback();
            alertNotify('Успешно', 'Аватарка удалена', 'success');
        } catch {
            // Error..
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
