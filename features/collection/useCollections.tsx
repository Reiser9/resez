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

    // Получить коллекции с пагинацией
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

    // Получить понравившиеся коллекции с пагинацией
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

    // Получение информации о коллекции по id
    const getCollectionById = async (id: string | number, failedCallback = () => {}) => {
        const response = await request<{ collection: Collection & { pairs: Pair[] } }>({
            url: `/memory-ms/collection/${id}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response, 'Коллекция не найдена', failedCallback);
        }

        if ('data' in response) {
            return response.data.collection;
        }
    };

    // Получение пар для коллекции на странице коллекций по id коллекции
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

    // Удалить коллекцию по id
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

    // Загрузить изображение при создании коллекции
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

    // Создать коллекцию
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

    // Редактировать коллекцию
    const updateCollection = async (
        id: number,
        collection: string,
        description: string,
        isPrivate: boolean,
        pairs: PairDTO[],
        successCallback = () => {},
    ) => {
        const response = await request<Collection>({
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

    // Получить настройки коллекции
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

    // Обновить настройки коллекции
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

    // Получить коллекцию вопросов для теста
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

    // Получить коллекцию вопросов для совпадений
    const getMatchesCollection = async (id: string | number) => {
        const response = await request<{ matches: MatchItem[] }>({
            url: `/memory-ms/collection/${id}/match`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.matches;
        }
    };

    // Поставить лайк коллекции
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

    // Получить популярные коллекции
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

    // Получить коллекции пользователя по никнейму
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
        likeCollection,
        getPopularCollections,
        getUserCollectionsByNickname,
    };
};

export default useCollections;
