'use client';

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { socket } from '@/api/socket';

import type { Message } from '@/entities/messenger';
import type { Notify } from '@/entities/notify';
import type { LevelInfo } from '@/entities/user';
import type { Achievement } from '@/entities/achievement';
import { useAppSelector } from './useRedux';
import useAlert from './useAlert';
import useShortInfo from '@/features/user/data/useShortInfo';
import useClearLocalData from './useClearLocalData';
import { refreshToken } from '@/shared/utils/refreshToken';

const useSocket = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const currentDialogId = useAppSelector((state) => state.messenger.currentDialogId);
    const { alertNotify } = useAlert();
    const { clearLocalData } = useClearLocalData();

    const queryClient = useQueryClient();

    const { getShortInfo } = useShortInfo();

    const { data: userProfile } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
        enabled: isAuth,
    });

    const { user, sessionId } = userProfile || {};

    const currentDialogIdRef = React.useRef(currentDialogId);
    const currentUserIdRef = React.useRef(user?.id);
    const queryRef = React.useRef(queryClient);

    React.useEffect(() => {
        queryRef.current = queryClient;
    }, [queryClient]);

    React.useEffect(() => {
        if (!user?.id || !sessionId || !isAuth) {
            return;
        }

        socket.emit('join', user.id, sessionId);
    }, [isAuth, user?.id, sessionId]);

    React.useEffect(() => {
        currentDialogIdRef.current = currentDialogId;
    }, [currentDialogId]);

    React.useEffect(() => {
        if (user && user.id) {
            currentUserIdRef.current = user.id;
        }
    }, [user]);

    React.useEffect(() => {
        socket.connect();

        socket.on('notification', (data: { notify: Notify }) => {
            queryRef.current.invalidateQueries({ queryKey: ['notify'] });
            queryRef.current.invalidateQueries({ queryKey: ['notify_count'] });
            alertNotify('Новое уведомление', 'Нажмите, чтобы посмотреть', 'info', '/notify', 4000);
        });

        socket.on('end-session', () => {
            clearLocalData();
            alertNotify('Сессия завершена', 'Кто-то завершил вашу сессию', 'error');
        });

        socket.on('blocked', async (data: { reason: string }) => {
            alertNotify(
                'Ваш аккаунт заблокирован',
                'По всем вопросам можете обращаться в группу в вк',
                'warn',
                '',
                5000,
            );
            queryRef.current.invalidateQueries({ queryKey: ['short_info'] });
        });

        socket.on('unblocked', async () => {
            queryRef.current.invalidateQueries({ queryKey: ['short_info'] });
        });

        socket.on('message', (message: Message) => {
            queryRef.current.invalidateQueries({ queryKey: ['messenger_dialogs_by_id'] });
            queryRef.current.invalidateQueries({ queryKey: ['messenger_dialogs'] });

            if (
                currentUserIdRef.current &&
                currentUserIdRef.current !== message?.sender?.id &&
                Number(currentDialogIdRef.current) != message.chatId &&
                message.type !== 'Системное'
            ) {
                alertNotify(message.sender.nickname, message.message, 'info', `/messenger/${message.chatId}`, 10000);
            }
        });

        socket.on('refresh', (action: string) => {
            queryRef.current.invalidateQueries({ queryKey: ['user_permissions'] });
            refreshToken();

            if(action === "role"){
                alertNotify('Информация', 'Ваши права доступа изменены', 'info', '', 4000);
            }
            else if(action === "subscription"){
                alertNotify('Информация', 'Ваша подписка изменена', 'info', '', 4000);
            }
        });

        socket.on('achievement', (data: { userId: number; achievement: Achievement }) => {
            alertNotify(
                'Информация',
                `Получено достижение: ${data.achievement}`,
                'info',
                '/profile/achievements',
                4000,
            );
            queryRef.current.invalidateQueries({ queryKey: ['short_info'] });
        });

        socket.on('new-level', (data: LevelInfo) => {
            alertNotify('Информация', `Получен новый уровень: ${data.level}`, 'info', '', 4000);
            queryRef.current.invalidateQueries({ queryKey: ['short_info'] });
        });

        return () => {
            socket.off('notification');
            socket.off('end-session');
            socket.off('blocked');
            socket.off('unblocked');
            socket.off('message');
            socket.off('role-updated');
            socket.off('achievement');
            socket.off('new-level');
        };
    }, []);
};

export default useSocket;
