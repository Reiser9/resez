'use client';

import { Dayjs } from 'dayjs';

import type {
    ThemeAdmin,
    ThemeProfileAndStore,
    ThemePagginationAdmin,
    ThemePagginationProfileAndStore,
} from '@/entities/store';
import type { ProfileInfo } from '@/entities/user';
import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import { buildQueryString } from '@/shared/utils/buildQueryString';

const useTheme = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPaginationThemes = async (page: number) => {
        const limit = 9;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
        });

        const response = await request<ThemePagginationAdmin>({
            url: `/admin/store/theme?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getPaginationStoreThemes = async (page: number) => {
        const limit = 9;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
        });

        const response = await request<ThemePagginationProfileAndStore>({
            url: `/store/theme?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getPaginationProfileThemes = async (page: number) => {
        const limit = 9;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
        });

        const response = await request<ThemePagginationProfileAndStore>({
            url: `/user/theme?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const createTheme = async (
        title: string,
        primary: string,
        light: string,
        price: string,
        requiredSubscriptionId: number | null,
        requiredAchievementId: number | null,
        seasonStartDate?: Dayjs | null,
        seasonEndDate?: Dayjs | null,
        successCallback = () => {},
    ) => {
        let data = {
            title,
            primary,
            light,
            ...(price && { price }),
            ...(requiredSubscriptionId && { requiredSubscriptionId }),
            ...(requiredAchievementId && { requiredAchievementId }),
            ...(seasonStartDate && { seasonStartDate }),
            ...(seasonEndDate && { seasonEndDate }),
        };

        const response = await request<{ product: ThemeAdmin }>({
            url: '/admin/store/theme',
            isAuth: true,
            method: 'POST',
            data,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Тема создана', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    const togglePublishTheme = async (id: number, successCallback = () => {}) => {
        const response = await request<{ product: ThemeAdmin }>({
            url: `/admin/store/theme/${id}/toggle-publish`,
            isAuth: true,
            method: 'PATCH',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data;
        }
    };

    const addThemeToProfile = async (id: number, successCallback = () => {}) => {
        const response = await request<{ product: ThemeProfileAndStore }>({
            url: `/store/theme/${id}/add`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Тема куплена', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    const applyTheme = async (id: number, successCallback = () => {}) => {
        const response = await request<{ user: ProfileInfo }>({
            url: `/user/theme/${id}`,
            isAuth: true,
            method: 'PATCH',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data;
        }
    };

    const resetTheme = async (successCallback = () => {}) => {
        const response = await request<{ user: ProfileInfo }>({
            url: '/user/theme/',
            isAuth: true,
            method: 'DELETE',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data;
        }
    };

    const deleteTheme = async (themeId: number, successCallback = () => {}) => {
        const response = await request({
            url: `/admin/store/theme/${themeId}`,
            isAuth: true,
            method: 'DELETE',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data;
        }
    };

    return {
        getPaginationThemes,
        getPaginationStoreThemes,
        getPaginationProfileThemes,
        createTheme,
        togglePublishTheme,
        addThemeToProfile,
        applyTheme,
        resetTheme,
        deleteTheme,
    };
};

export default useTheme;
