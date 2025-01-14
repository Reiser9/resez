'use client';

import type {
    AvatarDecorationAdmin,
    AvatarDecorationProfileAndStore,
    AvatarDecorationPagginationAdmin,
    AvatarDecorationPagginationProfileAndStore,
} from '@/entities/store';
import type { ProfileInfo } from '@/entities/user';
import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import { buildQueryString } from '@/shared/utils/buildQueryString';

const useAvatar = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPaginationAvatars = async (page: number) => {
        const limit = 9;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
        });

        const response = await request<AvatarDecorationPagginationAdmin>({
            url: `/admin/store/avatar-decoration?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getPaginationStoreAvatars = async (page: number) => {
        const limit = 9;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
        });

        const response = await request<AvatarDecorationPagginationProfileAndStore>({
            url: `/store/avatar-decoration?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getPaginationProfileAvatars = async (page: number) => {
        const limit = 9;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
        });

        const response = await request<AvatarDecorationPagginationProfileAndStore>({
            url: `/user/avatar-decoration?${queryString}`,
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
        const response = await request<{ product: AvatarDecorationAdmin }>({
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
        const response = await request<{ product: AvatarDecorationAdmin }>({
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

    const addAvatarDecorationToProfile = async (id: number, successCallback = () => {}) => {
        const response = await request<{ product: AvatarDecorationProfileAndStore }>({
            url: `/store/avatar-decoration/${id}/add`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Украшение аватара куплено', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    const applyAvatarDecoration = async (id: number, successCallback = () => {}) => {
        const response = await request<{ user: ProfileInfo }>({
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

    const resetAvatarDecoration = async (successCallback = () => {}) => {
        const response = await request<{ user: ProfileInfo }>({
            url: '/user/avatar-decoration/',
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

    const deleteAvatar = async (avatarId: number, successCallback = () => {}) => {
        const response = await request({
            url: `/admin/store/avatar-decoration/${avatarId}`,
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

    const getAvatarById = async (avatarId: number | string) => {
        const response = await request<{ product: AvatarDecorationProfileAndStore }>({
            url: `/store/avatar-decoration/${avatarId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.product;
        }
    };

    return {
        getPaginationAvatars,
        getPaginationStoreAvatars,
        getPaginationProfileAvatars,
        createAvatar,
        togglePublishAvatar,
        addAvatarDecorationToProfile,
        applyAvatarDecoration,
        resetAvatarDecoration,
        deleteAvatar,
        getAvatarById,
    };
};

export default useAvatar;
