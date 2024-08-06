'use client';

import useRequest from '@/shared/hooks/useRequest';
import type { UsersSearch } from '@/entities/user';

const useSearchUser = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getPaginationUsers = async () => {
        const limit = 9;
        // const queryString = buildQueryString({
        //     offset: page * limit,
        //     limit,
        // });

        const response = await request<UsersSearch>({
            url: `/user?search=&limit=20`,
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
        getPaginationUsers,
    };
};

export default useSearchUser;
