'use client';

import React from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { socket } from '@/api/socket';

// import { incrementUreadNotifyCount, setUserBlocked, updatePermissions } from '../redux/slices/user';
// import { addNotifyInStart } from '../redux/slices/notify';

import { useAppDispatch, useAppSelector } from './useRedux';
import useNotify from './useAlert';
import useRequest from './useRequest';
import { setUserBlockReason, setUserBlocked } from '@/store/slices/user';
import { Message } from '@/entities/messenger';

const useSocket = () => {
    const { isAuth, user, sessionId } = useAppSelector((state) => state.user);
    const currentDialogId = useAppSelector((state) => state.messenger.currentDialogId);
    const dispatch = useAppDispatch();
    const { alertNotify } = useNotify();
    const { clearLocalData } = useRequest();

    const queryClient = useQueryClient();

    const currentDialogIdRef = React.useRef(currentDialogId);
    const currentUserIdRef = React.useRef(user?.id);

    React.useEffect(() => {
        currentDialogIdRef.current = currentDialogId;
    }, [currentDialogId]);

    const revalidateChatById = () => {
        queryClient.invalidateQueries({ queryKey: ['messenger_dialogs_by_id'] });
        queryClient.invalidateQueries({ queryKey: ['messenger_dialogs'] });
    };

    React.useEffect(() => {
        if (!user?.id || !sessionId || !isAuth) {
            return;
        }

        socket.emit('join', user?.id, sessionId);
    }, [isAuth, user, sessionId]);

    React.useEffect(() => {
        socket.connect();

        // socket.on("notify", data => {
        //     dispatch(addNotifyInStart(data.notify));
        //     dispatch(incrementUreadNotifyCount());
        //     alertNotify("Информация", "Новое уведомление", "info", "/notifies", 4000);
        // });

        socket.on('end-session', () => {
            clearLocalData();
            alertNotify('Сессия завершена', 'Кто-то завершил вашу сессию', 'error');
        });

        socket.on('blocked', (data: { reason: string }) => {
            alertNotify(
                'Ваш аккаунт заблокирован',
                'По всем вопросам можете обращаться в группу в вк',
                'warn',
                '',
                5000,
            );
            dispatch(setUserBlocked(true));
            dispatch(setUserBlockReason(data.reason));
        });

        socket.on('unblocked', () => {
            dispatch(setUserBlocked(false));
        });

        socket.on('message', (message: Message) => {
            revalidateChatById();
            console.log(currentUserIdRef.current); // Разобраться почему currentUserIdRef = undefined

            if (
                currentUserIdRef.current &&
                currentUserIdRef.current !== message.sender.id &&
                Number(currentDialogIdRef.current) != message.chatId &&
                message.type !== 'Системное'
            ) {
                alertNotify(message.sender.nickname, message.message, 'success', `/messenger/${message.chatId}`, 10000);
            }
        });

        // socket.on("new-permissions", (data) => {
        //     dispatch(updatePermissions(data.permissions));
        //     alertNotify("Ваша роль обновлена", "Кто-то изменил вашу роль", "info", "", 4000);
        // });

        return () => {
            // socket.off("notify");
            socket.off('end-session');
            socket.off('blocked');
            socket.off('unblocked');
            socket.off('message');
            // socket.off("new-permissions");
        };
    }, []);
};

export default useSocket;
