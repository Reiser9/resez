'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';

import type { Message } from '@/entities/messenger';
import { MessengerSidebar } from '@/widgets/MessengerSidebar';
import { MessengerDialog } from '@/widgets/MessengerDialog';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { setCurrentDialogId } from '@/store/slices/messenger';
import { useProfileData } from '@/features/user';
import { MessengerEmptyData } from '@/shared/icons';
import { socket } from '@/api/socket';

import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Preloader } from '@/shared/ui/Preloader';

export type TypingUsers = { chatId: number | string; users: { id: number; nickname: string }[] };

const MessengerPage = () => {
    const { id } = useParams();

    const [typingUsersInfo, setTypingUsersInfo] = React.useState<TypingUsers[]>([]);

    const { getProfileData } = useProfileData();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const queryClient = useQueryClient();

    const revalidateChats = async () => {
        queryClient.invalidateQueries({ queryKey: ['messenger_dialogs'] });
        queryClient.invalidateQueries({ queryKey: ['dialog_messanges_by_id'] });
    };

    const { data, isLoading } = useQuery({
        queryKey: ['profile_data'],
        queryFn: () => getProfileData(),
    });
    const { firstName, lastName } = data || {};

    React.useEffect(() => {
        if (!id || !/^\d+$/.test(String(id))) {
            return router.replace('/messenger');
        }

        dispatch(setCurrentDialogId(String(id)));

        return () => {
            dispatch(setCurrentDialogId(null));
        };
    }, [id]);

    React.useEffect(() => {
        socket.on(
            'typing',
            (user: {
                chatId: number | string;
                user: {
                    id: number;
                    nickname: string;
                };
                isTyping: boolean;
            }) => {
                const { chatId, isTyping, user: userInfo } = user || {};

                const currentChatId = typingUsersInfo.find((item) => item.chatId === chatId);

                if (isTyping) {
                    if (!currentChatId) {
                        setTypingUsersInfo((prev) => [
                            ...prev,
                            {
                                chatId,
                                users: [userInfo],
                            },
                        ]);
                    } else {
                        setTypingUsersInfo((prev) =>
                            prev.map((item) =>
                                item.chatId === chatId
                                    ? {
                                          ...item,
                                          users: [...item.users, userInfo],
                                      }
                                    : item,
                            ),
                        );
                    }
                } else {
                    if (currentChatId) {
                        setTypingUsersInfo(
                            (prev) =>
                                prev
                                    .map((item) =>
                                        item.chatId === chatId
                                            ? {
                                                  ...item,
                                                  users: item.users.filter((user) => user.id !== userInfo.id),
                                              }
                                            : item,
                                    )
                                    .filter((item) => item.users.length > 0),
                        );
                    }
                }
            },
        );

        return () => {
            socket.off('typing');
        };
    }, [typingUsersInfo]);

    React.useEffect(() => {
        socket.on("messages-reading", (messageId: number) => {
            revalidateChats();
        });

        socket.on("messages-updating", (message: Message) => {
            revalidateChats();
        });

        socket.on("messages-deleting", (messageIds: number[]) => {
            revalidateChats();
        });

        return () => {
            socket.off('messages-reading');
            socket.off('messages-updating');
            socket.off('messages-deleting');
        };
    }, []);

    if (isLoading) {
        return <Preloader page />;
    }

    return (
        <>
            {firstName && lastName ? (
                <div className={styles.messanger}>
                    <MessengerDialog typingUsersInfo={typingUsersInfo} />

                    <MessengerSidebar typingUsersInfo={typingUsersInfo} />
                </div>
            ) : (
                <div className={styles.messangerNotData}>
                    <MessengerEmptyData className={styles.messangerNotDataIcon} />

                    <Text variant="h3" fontWeight={600} className={styles.messangerNotDataTitle}>
                        Добро пожаловать в месседжер <span>ResEz</span>
                    </Text>

                    <div className={styles.messangerNotDataPoint}>
                        <Text>Перед началом пользования, нужно заполнить свои данные</Text>
                    </div>

                    <Button href="/profile/data" auto variant="light">
                        Заполнить
                    </Button>
                </div>
            )}
        </>
    );
};

export default MessengerPage;
