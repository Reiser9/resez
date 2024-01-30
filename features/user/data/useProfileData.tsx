'use client';

import React from 'react';

import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';
import { ProfileInfo } from '@/entities/user';
import { initProfileInfo } from '@/store/slices/user';
import { useAppDispatch } from '@/shared/hooks/useRedux';

const useProfileData = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [dataIsSaving, setDataIsSaving] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { alertNotify } = useAlert();
    const { request, catchRequestError, errorController } = useRequest();

    const getProfileData = async (successCallback = () => {}): Promise<void> => {
        setIsLoading(true);
        const response = await request<{ user: ProfileInfo }>({
            url: '/user/profile-info',
            isAuth: true,
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            dispatch(initProfileInfo(response.data.user));
        }

        successCallback();
    };

    const saveProfileData = async (data: ProfileInfo, successCallback = () => {}): Promise<void> => {
        setDataIsSaving(true);
        const response = await request<{ user: ProfileInfo }>({
            url: '/user/profile-info',
            isAuth: true,
            method: 'PATCH',
            data,
        });
        setDataIsSaving(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            dispatch(initProfileInfo(response.data.user));
        }

        successCallback();
        alertNotify('Успешно', 'Данные сохранены', 'success');
    };

    return {
        isLoading,
        dataIsSaving,
        getProfileData,
        saveProfileData,
    };
};

export default useProfileData;
