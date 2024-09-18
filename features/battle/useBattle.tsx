'use client';

import useRequest from '@/shared/hooks/useRequest';

const useBattle = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const createBattle = async (playersCount: number | string, isPrivate: boolean, successCallback = () => {}) => {
        const response = await request<{
            playersCount: number;
            isPrivate: boolean;
            creatorId: number;
            id: number;
        }>({
            url: `/battle-ms/battle`,
            isAuth: true,
            method: 'POST',
            data: {
                playersCount,
                isPrivate,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data.id;
        }
    };

    return {
        createBattle,
    };
};

export default useBattle;
