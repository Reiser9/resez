'use client';

import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import type { Avatars, ProductDTO } from '@/entities/store';

const useAvatar = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPaginationAvatars = async ({ pageParam }: { pageParam: number }) => {
        const limit = 9;
        const response = await request<Avatars>({
            url: `/admin/store/avatar-decoration?offset=${pageParam * limit}&limit=${limit}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getPaginationStoreAvatars = async ({ pageParam }: { pageParam: number }) => {
        const limit = 9;
        const response = await request<Avatars>({
            url: `/store/avatar-decoration?offset=${pageParam * limit}&limit=${limit}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getPaginationProfileAvatars = async ({ pageParam }: { pageParam: number }) => {
        const limit = 9;
        const response = await request<Avatars>({
            url: `/user/avatar-decoration?offset=${pageParam * limit}&limit=${limit}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const createAvatar = async (data: FormData, successCallback = () => {}) => {
        const response = await request<{ product: ProductDTO }>({
            url: '/admin/store/avatar-decoration',
            isAuth: true,
            method: 'POST',
            data,
            headers: {
                'Content-type': 'multipart/form-data',
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Украшение аватара создано', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    const togglePublishAvatar = async (id: number, successCallback = () => {}) => {
        const response = await request<{ product: ProductDTO }>({
            url: `/admin/store/avatar-decoration/${id}/toggle-publish`,
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

    const addProductToProfile = async (id: number, successCallback = () => {}) => {
        const response = await request<{ product: ProductDTO }>({
            url: `/store/avatar-decoration/${id}/add`,
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

    const applyProduct = async (id: number, successCallback = () => {}) => {
        const response = await request<{ user: ProductDTO }>({
            url: `/user/avatar-decoration/${id}`,
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
        getPaginationAvatars,
        getPaginationStoreAvatars,
        getPaginationProfileAvatars,
        createAvatar,
        togglePublishAvatar,
        addProductToProfile,
        applyProduct,
    };
};

export default useAvatar;
