'use client';

import React from 'react';

import type { ProfileInfo, ProfileInfoDTO, UserProfile } from '@/entities/user';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';

const useProfileData = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [dataIsSaving, setDataIsSaving] = React.useState(false);

    const { alertNotify } = useAlert();
    const { request, catchRequestError, errorController } = useRequest();

    const getProfileData = async (successCallback = () => {}) => {
        setIsLoading(true);
        const response = await request<{ user: ProfileInfo }>({
            url: '/user/profile-info',
            isAuth: true,
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data.user;
        }
    };

    const saveProfileData = async (data: ProfileInfoDTO, successCallback = () => {}) => {
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

        successCallback();
        alertNotify('Успешно', 'Данные сохранены', 'success');
    };

    const getUserProfile = async (userId: string | number, successCallback = () => {}) => {
        const response = await request<{ user: UserProfile }>({
            url: `/user/${userId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data.user;
        }
    };

    return {
        isLoading,
        dataIsSaving,
        getProfileData,
        saveProfileData,
        getUserProfile,
    };
};

export default useProfileData;
