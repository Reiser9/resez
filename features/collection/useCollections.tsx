'use client';

import React from 'react';

import type {
    Collection,
    CollectionChoice,
    CollectionSettings,
    CollectionValidation,
    CollectionWrite,
    Collections,
    MatchItem,
    Pair,
    PairDTO,
    PairsCollectionById,
    ScoreItem,
    ScoreItemLocal,
} from '@/entities/collection';
import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import { buildQueryString } from '@/shared/utils/buildQueryString';

const useCollections = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [collectionIsLoading, setCollectionIsLoading] = React.useState(false);
    const [collectionsIsLoading, setCollectionsIsLoading] = React.useState<string[]>([]);

    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPaginationCollections = async (page: number, search: string) => {
        const limit = 9;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
            search,
        });

        const response = await request<Collections>({
            url: `/memory-ms/collection?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getLikedPaginationCollections = async (page: number, search: string) => {
        const limit = 9;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
            search,
        });

        const response = await request<Collections>({
            url: `/memory-ms/collection/liked?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getCollectionById = async (collectionId: string | number, failedCallback = () => {}) => {
        const response = await request<{ collection: Collection & { pairs: Pair[] } }>({
            url: `/memory-ms/collection/${collectionId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response, 'Коллекция не найдена', failedCallback);
        }

        if ('data' in response) {
            return response.data.collection;
        }
    };

    const getPairsCollectionById = async (page: number, id: string | number, search: string) => {
        const limit = 10;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
            search,
        });

        const response = await request<PairsCollectionById>({
            url: `/memory-ms/collection/${id}/pairs?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const deleteCollectionById = async (collectionId: string, successCallback = () => {}) => {
        setCollectionsIsLoading((prev) => [...prev, collectionId]);
        const response = await request<{ collection: Collection }>({
            url: `/memory-ms/collection/${collectionId}`,
            isAuth: true,
            method: 'DELETE',
        });
        setCollectionsIsLoading((prev) => prev.filter((item) => item !== collectionId));

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
        const response = await request<{ file: { url: string } }>({
            url: `/api/upload`,
            isAuth: true,
            method: 'POST',
            data,
            headers: {
                'Content-type': 'multipart/form-data',
            },
            baseURL: process.env.NEXT_PUBLIC_FILE_URL, // TODO СДЕЛАТЬ ЕДИНЫМ ЗАПРОСОМ
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
        const response = await request<Collection>({
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
        collectionId: number,
        collection: string,
        description: string,
        isPrivate: boolean,
        pairs: PairDTO[],
        successCallback = () => {},
    ) => {
        const response = await request<Collection>({
            url: `/memory-ms/collection/${collectionId}`,
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

    // Получить пары коллекции при игре в карточки (сделать с учетом пагинации)
    const getPairsCollection = async (collectionId: string | number) => {
        const response = await request<{ cards: Pair[] }>({
            url: `/memory-ms/collection/${collectionId}/cards?limit=500`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getTestCollection = async (collectionId: string | number) => {
        const response = await request<{ test: (CollectionChoice | CollectionWrite | CollectionValidation)[] }>({
            url: `/memory-ms/collection/${collectionId}/test`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getMatchesCollection = async (collectionId: string | number) => {
        const response = await request<{ matches: MatchItem[] }>({
            url: `/memory-ms/collection/${collectionId}/match`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.matches;
        }
    };

    const sendMatchScore = async (time: number, collectionId: number | string) => {
        const response = await request<{ score: ScoreItemLocal; scores: ScoreItem[] }>({
            url: `/memory-ms/match-score`,
            isAuth: true,
            method: 'POST',
            data: {
                time,
                collectionId,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const likeCollection = async (collectionId: string | number, successCallback = () => {}) => {
        const response = await request({
            url: `/memory-ms/like/${collectionId}`,
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

    const getUserCollectionsByNickname = async (offset: number, nickname: string, search: string) => {
        const limit = 9;
        const response = await request<Collections>({
            url: `/memory-ms/collection/user/${nickname}?offset=${offset * limit}&limit=${limit}&search=${search}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    return {
        isLoading,
        collectionIsLoading,
        collectionsIsLoading,
        getPaginationCollections,
        getLikedPaginationCollections,
        getCollectionById,
        getPairsCollectionById,
        getPairsCollection,
        deleteCollectionById,
        uploadImage,
        createCollection,
        updateCollection,
        getCollectionSettings,
        updateSettings,
        getTestCollection,
        getMatchesCollection,
        sendMatchScore,
        likeCollection,
        getPopularCollections,
        getUserCollectionsByNickname,
    };
};

export default useCollections;
