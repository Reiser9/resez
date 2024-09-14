'use client';

import type { Theme, ThemePaggination } from '@/entities/store';
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

        const response = await request<ThemePaggination>({
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

    const getPaginationStoreThemes = async ({ pageParam }: { pageParam: number }) => {
        const limit = 9;
        const response = await request<ThemePaggination>({
            url: `/store/theme?offset=${pageParam * limit}&limit=${limit}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getPaginationProfileThemes = async ({ pageParam }: { pageParam: number }) => {
        const limit = 9;
        const response = await request<ThemePaggination>({
            url: `/user/theme?offset=${pageParam * limit}&limit=${limit}`,
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
        price: string | number,
        successCallback = () => {},
    ) => {
        const response = await request<{ product: Theme }>({
            url: '/admin/store/theme',
            isAuth: true,
            method: 'POST',
            data: {
                title,
                primary,
                light,
                ...(price && { price }),
            },
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
        const response = await request<{ product: Theme }>({
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
        const response = await request<{ product: Theme }>({
            url: `/store/theme/${id}/add`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data;
        }
    };

    const applyTheme = async (id: number, successCallback = () => {}) => {
        const response = await request<{ user: Theme }>({
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

    return {
        getPaginationThemes,
        getPaginationStoreThemes,
        getPaginationProfileThemes,
        createTheme,
        togglePublishTheme,
        addThemeToProfile,
        applyTheme,
    };
};

export default useTheme;
