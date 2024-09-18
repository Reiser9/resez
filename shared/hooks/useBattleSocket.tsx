'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import io, { Socket } from 'socket.io-client';

import { useAppSelector } from './useRedux';
import useAlert from './useAlert';
import useShortInfo from '@/features/user/data/useShortInfo';

let socketInstance: Socket | null = null;
let socketIsConnected = false;

const useBattleSocket = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const { alertNotify } = useAlert();

    const { getShortInfo } = useShortInfo();

    const { data: userProfile } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
        enabled: isAuth,
    });

    const { user } = userProfile || {};

    const [socket, setSocket] = React.useState<Socket | null>(null);
    const [isConnected, setIsConnected] = React.useState(socketIsConnected);

    React.useEffect(() => {
        if (user?.id && !socketInstance) {
            const battleSocket: Socket = io(
                `${process.env.NEXT_PUBLIC_WS_BATTLE_URL}?user_id=${user.id}` || 'http://localhost:8085',
                {
                    withCredentials: true,
                    forceNew: true,
                    reconnectionAttempts: Infinity,
                    timeout: 10000,
                    transports: ['websocket'],
                },
            );

            socketInstance = battleSocket;
            setSocket(battleSocket);

            if (socketIsConnected) {
                setIsConnected(true);
                return;
            }

            battleSocket.on('connected', () => {
                socketIsConnected = true;
                setIsConnected(true);
            });
        } else if (socketInstance) {
            setSocket(socketInstance);
            setIsConnected(socketIsConnected);
        }
    }, [user?.id]);

    return { socket, isConnected };
};

export default useBattleSocket;
