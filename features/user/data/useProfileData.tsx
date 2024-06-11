'use client';

import React from 'react';

import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';
import { ProfileInfo, UserProfile } from '@/entities/user';
import { initProfileInfo } from '@/store/slices/user';
import { useAppDispatch } from '@/shared/hooks/useRedux';

const useProfileData = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [dataIsSaving, setDataIsSaving] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
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

        if ('data' in response) {
            dispatch(initProfileInfo(response.data.user));
        }

        successCallback();
    };

    const saveProfileData = async (data: ProfileInfo, successCallback = () => {}) => {
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
    }

    return {
        isLoading,
        dataIsSaving,
        getProfileData,
        saveProfileData,
        getUserProfile
    };
};

export default useProfileData;
