'use client'

import useRequest from '@/shared/hooks/useRequest';

const useAchievement = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getSecretAchievement = async () => {
        const response = await request({
            url: "/achievement/secret",
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }
    }

    return {
        getSecretAchievement
    };
};

export default useAchievement;
