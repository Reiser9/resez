'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAppDispatch, useAppSelector } from './useRedux';
import { socket } from '@/api/socket';
import { setUserData } from '@/store/slices/user';
import { useShortInfo } from '@/features/user';

const useClearLocalData = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const { getShortInfo } = useShortInfo();
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const { data: userInfo } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
        enabled: isAuth,
    });

    const { sessionId, user } = userInfo || {};

    const clearLocalData = () => {
        if (user && sessionId) {
            socket.emit('leave', user.id, sessionId);
        }

        localStorage.removeItem('accessToken');

        dispatch(setUserData());
        queryClient.removeQueries({ queryKey: ['user_permissions'] });
        queryClient.removeQueries({ queryKey: ['short_info'] });
    };

    return {
        clearLocalData,
    };
};

export default useClearLocalData;
