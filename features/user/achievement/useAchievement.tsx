'use client';

import { AchievementCategory } from '@/entities/achievement';
import useRequest from '@/shared/hooks/useRequest';

const useAchievement = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getAchievements = async () => {
        const response = await request<{ achievements: AchievementCategory[] }>({
            url: '/user/achievement',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.achievements;
        }
    };

    const getSecretAchievement = async () => {
        const response = await request({
            url: '/achievement/secret',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }
    };

    return {
        getAchievements,
        getSecretAchievement,
    };
};

export default useAchievement;
