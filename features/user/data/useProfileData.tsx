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
    const { request } = useRequest();

    const getProfileData = async (successCallback = () => {}) => {
        try {
            setIsLoading(true);
            const data = await request<{ user: ProfileInfo }>({
                url: '/user/profile-info',
                isAuth: true,
            });

            successCallback();
            dispatch(initProfileInfo(data.data.user));
        } catch {
            alertNotify('Ошибка', 'Произошла ошибка, попробуйте позже', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const saveProfileData = async (data: ProfileInfo, successCallback = () => {}) => {
        try {
            setDataIsSaving(true);
            const response = await request<{ user: ProfileInfo }>({
                url: '/user/profile-info',
                isAuth: true,
                method: 'PATCH',
                data,
            });

            successCallback();
            dispatch(initProfileInfo(response.data.user));
            alertNotify('Успешно', 'Данные сохранены', 'success');
        } catch {
            alertNotify('Ошибка', 'Произошла ошибка, попробуйте позже', 'error');
        } finally {
            setDataIsSaving(false);
        }
    };

    return {
        isLoading,
        dataIsSaving,
        getProfileData,
        saveProfileData,
    };
};

export default useProfileData;
