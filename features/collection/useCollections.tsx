'use client';

import React from 'react';

import useRequest from '@/shared/hooks/useRequest';
import useAlert from '@/shared/hooks/useAlert';
import type { Collections } from '@/entities/collection';

const useCollections = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [collectionIsLoading, setRoleIsLoading] = React.useState<boolean>(false);
    const [collectionsIsLoading, setRolesIsLoading] = React.useState<string[]>([]);

    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPaginationCollections = async ({ pageParam }: { pageParam: number }): Promise<Collections | void> => {
        const limit = 6;
        const response = await request<Collections>({
            url: `/collection?offset=${pageParam * limit}&limit=${limit}`,
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
        getPaginationCollections
    };
};

export default useCollections;
