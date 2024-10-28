'use client';

import type { AchievementCategory, AchievementCategoryShort } from '@/entities/achievement';
import useRequest from '@/shared/hooks/useRequest';

const useAchievement = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getAchievements = async () => {
        const response = await request<{ achievements: AchievementCategoryShort[] }>({
            url: '/admin/achievement',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.achievements;
        }
    };

    const getProfileAchievements = async () => {
        const response = await request<{ achievements: AchievementCategory[]; totalCount: number }>({
            url: '/user/achievement',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const completeSecretAchievement = async () => {
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
        getProfileAchievements,
        completeSecretAchievement,
    };
};

export default useAchievement;
