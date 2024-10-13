'use client';

import { BattleItem } from '@/entities/battle';
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

    const getPublicBattles = async () => {
        const response = await request<BattleItem[]>({
            url: `/battle-ms/battle`,
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
        createBattle,
        getPublicBattles,
    };
};

export default useBattle;
