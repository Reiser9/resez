'use client';

import React from 'react';
import cn from 'classnames';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';

import type { Message as MessageType } from '@/entities/messenger';
import { Cross, Message, Send } from '@/shared/icons';
import { formatDate } from '@/shared/utils/formatDate';
import { useMessenger } from '@/features/messenger';
import { MessengerDialogTopBar } from './MessengerDialogTopBar';
import { MessengerDialogSendForm } from './MessengerDialogSendForm';
import useShortInfo from '@/features/user/data/useShortInfo';
import { socket } from '@/api/socket';

import { DialogMessageItem } from '@/shared/ui/DialogMessageItem';
import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';

type Props = {
    dialogId: string | undefined;
};

export const MessengerDialog: React.FC<Props> = ({ dialogId }) => {
    const [selectedMessegesIDs, setSelectedMessegesIDs] = React.useState<MessageType[]>([]);
    const [replyMessage, setReplyMessage] = React.useState<MessageType | null>(null);

    const [isEditedMessage, setIsEditedMessage] = React.useState(false);
    const [editMessage, setEditMessage] = React.useState<MessageType>();
    const [typingUsers, setTypingUsers] = React.useState<{ id: number; nickname: string }[]>([]);
    const [typingChatId, setTypingChatId] = React.useState<string | number | null>(null);

    const router = useRouter();
    const queryClient = useQueryClient();

    const messagerDialogRef = React.useRef<null | HTMLDivElement>(null);
    const currentMessagesRef = React.useRef<MessageType>();
    let currentDate: null | string;

    const { getChatById, readMessages } = useMessenger();
    const { getShortInfo } = useShortInfo();

    const revalidateChat = async () => {
        queryClient.invalidateQueries({ queryKey: ['messenger_dialogs'] });
        queryClient.invalidateQueries({ queryKey: ['unread_chats_count'] });
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['messenger_dialogs_by_id', dialogId],
        queryFn: () => getChatById(String(dialogId), () => router.push('/messenger')),
        enabled: !!dialogId,
    });

    const { data: user } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
    });

    const { id: myId } = user?.user || {};

    const selectMessage = (message: MessageType) => {
        setSelectedMessegesIDs((prev) => {
            if (prev.includes(message)) {
                return prev.filter((messageId) => messageId !== message);
            } else {
                return [...prev, message];
            }
        });
    };

    const scrollBottom = () => {
        if (messagerDialogRef.current) {
            messagerDialogRef.current.scrollTo({
                top: messagerDialogRef.current.scrollHeight,
            });
        }
    };

    const readMessagesHandler = async (messageId: number) => {
        await readMessages(messageId, revalidateChat);
    };

    React.useEffect(() => {
        if (!isEditedMessage) {
            const filteredArray = data?.messages.filter((item) => item.sender?.id === myId);
            const lastItemWithDesired = filteredArray?.pop();
            currentMessagesRef.current = lastItemWithDesired;
            setEditMessage(lastItemWithDesired);
        }
    }, [data?.messages, isEditedMessage]);

    React.useEffect(() => {
        if (dialogId && messagerDialogRef.current) {
            scrollBottom();
        }
    }, [dialogId, messagerDialogRef.current, data?.messages]);

    React.useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp' && currentMessagesRef.current) {
                setIsEditedMessage(true);
            }

            if (event.key === 'Escape') {
                setIsEditedMessage(false);
                setReplyMessage(null);
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    React.useEffect(() => {
        if (data && data.messages?.length) {
            readMessagesHandler(data.messages[data.messages.length - 1].id);
        }
    }, [data]);

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

                setTypingChatId(chatId);
                if (isTyping) {
                    setTypingUsers((prev) => [...prev, userInfo]);
                } else {
                    setTypingUsers((prev) => prev.filter((user) => user.id !== userInfo.id));
                }
            },
        );

        return () => {
            socket.off('typing');
        };
    }, []);

    return (
        <div
            className={cn(styles.messangerContent, {
                [styles.show]: !!dialogId,
            })}
        >
            {dialogId ? (
                <>
                    {!isError && (
                        <MessengerDialogTopBar
                            data={data?.chat}
                            selectedMessegesIDs={selectedMessegesIDs}
                            setSelectedMessegesIDs={setSelectedMessegesIDs}
                            setReplyMessage={setReplyMessage}
                            dataLoading={isLoading}
                        />
                    )}

                    <div className={styles.messangerDialog} ref={messagerDialogRef}>
                        {isLoading ? (
                            <Preloader page small />
                        ) : isError ? (
                            <NotContent icon={<Cross />} danger text="При загрузке чата произошла ошибка." />
                        ) : data?.messages?.length ? (
                            <>
                                {data.messages.map((data, id) => {
                                    const messageDate = new Date(data.createdAt);
                                    const messageDateString = messageDate.toLocaleDateString('ru-RU', {
                                        day: 'numeric',
                                        month: 'long',
                                    });

                                    let messageElement = (
                                        <div
                                            key={id}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 2,
                                                alignItems: 'flex-start',
                                            }}
                                        >
                                            {currentDate !== messageDateString && (
                                                <div className={styles.messangerDialogDateInner}>
                                                    <p className={styles.messangerDialogDate}>
                                                        {formatDate(data.createdAt, 'D MMMM')}
                                                    </p>
                                                </div>
                                            )}

                                            <DialogMessageItem
                                                data={data}
                                                selectMessage={selectMessage}
                                                isSelected={selectedMessegesIDs.includes(data)}
                                                onDoubleClick={() => setReplyMessage(data)}
                                                setEditMessage={setEditMessage}
                                                setIsEditedMessage={setIsEditedMessage}
                                            />
                                        </div>
                                    );

                                    currentDate = messageDateString;

                                    return messageElement;
                                })}

                                <div className={styles.messangerDialogTyping}>
                                    {!!typingUsers.length && dialogId === typingChatId && (
                                        <p className={styles.messangerDialogTypingText}>
                                            {typingUsers.map((user) => user.nickname).join(' и ')} печатает...
                                        </p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <NotContent icon={<Message />} text="В данном чате еще нет сообщений." />
                        )}
                    </div>

                    {!isError && (
                        <MessengerDialogSendForm
                            dialogId={dialogId}
                            scrollDialogToBottom={scrollBottom}
                            replyMessage={replyMessage}
                            setReplyMessage={setReplyMessage}
                            isEditedMessage={isEditedMessage}
                            setIsEditedMessage={setIsEditedMessage}
                            editMessage={editMessage}
                            isKicked={data?.chat.isKicked}
                        />
                    )}
                </>
            ) : (
                <NotContent icon={<Send />} text="Для начала общения выберите чат" />
            )}
        </div>
    );
};
