'use client';

import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import type {
    Collection,
    CollectionChoice,
    CollectionSettings,
    CollectionSingle,
    CollectionValidation,
    CollectionWrite,
    Collections,
    MatchItem,
    Pair,
    PairDTO,
} from '@/entities/collection';

const useCollections = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [collectionIsLoading, setCollectionIsLoading] = React.useState<boolean>(false);
    const [collectionsIsLoading, setCollectionsIsLoading] = React.useState<string[]>([]);

    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPaginationCollections = async ({ pageParam }: { pageParam: number }, search: string) => {
        const limit = 9;
        const response = await request<Collections>({
            url: `/memory-ms/collection?offset=${pageParam * limit}&limit=${limit}&search=${search}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getLikedPaginationCollections = async ({ pageParam }: { pageParam: number }, search: string) => {
        const limit = 9;
        const response = await request<Collections>({
            url: `/memory-ms/collection/liked?offset=${pageParam * limit}&limit=${limit}&search=${search}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getCollectionById = async (id: string | number, failedCallback = () => {}) => {
        const response = await request<CollectionSingle>({
            url: `/memory-ms/collection/${id}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response, 'Коллекция не найдена', failedCallback);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const deleteCollectionById = async (id: string, successCallback = () => {}) => {
        setCollectionsIsLoading((prev) => [...prev, id]);
        const response = await request<{ collection: Collection }>({
            url: `/memory-ms/collection/${id}`,
            isAuth: true,
            method: 'DELETE',
        });
        setCollectionsIsLoading((prev) => prev.filter((item) => item !== id));

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Коллекция удалена');
        successCallback();

        if ('data' in response) {
            return response.data;
        }
    };

    const uploadImage = async (data: FormData) => {
        const response = await request<{ url: string }>({
            url: `/memory-ms/upload`,
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

        if ('data' in response) {
            return response.data;
        }
    };

    const createCollection = async (
        collection: string,
        description: string,
        isPrivate: boolean,
        pairs: PairDTO[],
        successCallback = () => {},
    ) => {
        const response = await request<CollectionSingle>({
            url: `/memory-ms/collection`,
            isAuth: true,
            method: 'POST',
            data: {
                collection,
                description,
                isPrivate,
                pairs,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Коллекция создана');
        successCallback();

        if ('data' in response) {
            return response.data;
        }
    };

    const updateCollection = async (
        id: number,
        collection: string,
        description: string,
        isPrivate: boolean,
        pairs: PairDTO[],
        successCallback = () => {},
    ) => {
        const response = await request<CollectionSingle>({
            url: `/memory-ms/collection/${id}`,
            isAuth: true,
            method: 'PATCH',
            data: {
                collection,
                description,
                isPrivate,
                pairs,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Коллекция изменена');
        successCallback();

        if ('data' in response) {
            return response.data;
        }
    };

    const getCollectionSettings = async () => {
        const response = await request<{ settings: CollectionSettings }>({
            url: `/memory-ms/settings`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const updateSettings = async (data: CollectionSettings, successCallback = () => {}) => {
        setIsLoading(true);
        const response = await request<{ settings: CollectionSettings }>({
            url: `/memory-ms/settings`,
            isAuth: true,
            method: 'PATCH',
            data,
        });
        setIsLoading(false);

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Настройки сохранены');
    };

    const getPairsCollection = async (id: string | number) => {
        const response = await request<{ cards: Pair[] }>({
            url: `/memory-ms/collection/${id}/cards?limit=500`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getTestCollection = async (id: string | number) => {
        const response = await request<{ test: (CollectionChoice | CollectionWrite | CollectionValidation)[] }>({
            url: `/memory-ms/collection/${id}/test`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getMatchesCollection = async (id: string | number) => {
        const response = await request<{ matches: MatchItem[] }>({
            url: `/memory-ms/collection/${id}/match`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const likeCollection = async (id: string | number, successCallback = () => {}) => {
        const response = await request({
            url: `/memory-ms/like/${id}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
    };

    const getPopularCollections = async () => {
        const response = await request<{ collections: Collection[] }>({
            url: `/memory-ms/collection/popular`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.collections;
        }
    };

    return {
        isLoading,
        collectionIsLoading,
        collectionsIsLoading,
        getPaginationCollections,
        getLikedPaginationCollections,
        getCollectionById,
        getPairsCollection,
        deleteCollectionById,
        uploadImage,
        createCollection,
        updateCollection,
        getCollectionSettings,
        updateSettings,
        getTestCollection,
        getMatchesCollection,
        likeCollection,
        getPopularCollections,
    };
};

export default useCollections;
