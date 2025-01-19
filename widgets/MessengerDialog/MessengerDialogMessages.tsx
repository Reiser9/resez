'use client';

import React from 'react';
import cn from 'classnames';
import { useParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { Message as MessageType } from '@/entities/messenger';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';
import { Cross, Message } from '@/shared/icons';
import { DialogMessageItem } from '@/shared/ui/DialogMessageItem';
import { useMessenger } from '@/features/messenger';
import { useShortInfo } from '@/features/user';
import { formatDate } from '@/shared/utils/formatDate';

import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

type Props = {
    selectedMesseges: MessageType[];
    setSelectedMesseges: React.Dispatch<React.SetStateAction<MessageType[]>>;
    setReplyMessage: React.Dispatch<React.SetStateAction<MessageType | null>>;
    isEditedMessage: boolean;
    setIsEditedMessage: (value: boolean) => void;
    setEditMessage: React.Dispatch<React.SetStateAction<MessageType | undefined>>;
    scrollDialogToBottom: () => void;
    messagerDialogRef: React.MutableRefObject<HTMLDivElement | null>;
};

export const MessengerDialogMessages: React.FC<Props> = ({
    selectedMesseges,
    setSelectedMesseges,
    setReplyMessage,
    isEditedMessage,
    setIsEditedMessage,
    setEditMessage,
    scrollDialogToBottom,
    messagerDialogRef,
}) => {
    const { id: dialogId } = useParams();

    const [firstRenderMessages, setFirstRenderMessages] = React.useState(true);
    const [scrollPosition, setScrollPosition] = React.useState(0);

    const currentMessagesRef = React.useRef<MessageType>();

    const { getPaginationMessages, readAllMessagesByChatId } = useMessenger();
    const { getShortInfo } = useShortInfo();

    const queryClient = useQueryClient();

    const revalidateChats = async () => {
        queryClient.invalidateQueries({ queryKey: ['messenger_dialogs'] });
        queryClient.invalidateQueries({ queryKey: ['unread_chats_count'] });
    };

    let currentDate: null | string;

    const { data: user } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
    });

    const { id: myId } = user?.user || {};

    const { data, endPage, isError, isFetchingNextPage, isPending } = useInfiniteScroll({
        queryKey: ['dialog_messanges_by_id', String(dialogId)],
        queryFn: (pageParam) => getPaginationMessages(pageParam, String(dialogId)),
        enabled: !!dialogId,
    });

    const selectMessage = (message: MessageType) => {
        setSelectedMesseges((prev) => {
            if (prev.includes(message)) {
                return prev.filter((messageId) => messageId !== message);
            } else {
                return [...prev, message];
            }
        });
    };

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
        if (!isEditedMessage && data) {
            const pages = data?.pages;
            const messages = pages[pages.length - 1];

            const filteredArray = messages?.messages.filter((item) => item.sender?.id === myId);

            if (!filteredArray) return;

            const lastItemWithDesired = filteredArray.pop();
            currentMessagesRef.current = lastItemWithDesired;
            setEditMessage(lastItemWithDesired);
        }
    }, [data, isEditedMessage]);

    React.useEffect(() => {
        if (dialogId) {
            readAllMessagesByChatId(String(dialogId), revalidateChats);
            setScrollPosition(0);
        }
    }, [dialogId]);

    React.useEffect(() => {
        if (data && messagerDialogRef.current && !firstRenderMessages) {
            const blockScrollTop =
                messagerDialogRef.current?.scrollTop > 25 ? messagerDialogRef.current?.scrollTop + 25 : 0;

            messagerDialogRef.current.scrollTop =
                messagerDialogRef.current?.scrollHeight - scrollPosition + blockScrollTop;
        }

        if (data && firstRenderMessages) {
            scrollDialogToBottom();
            setFirstRenderMessages(false);
        }
    }, [data]);

    React.useEffect(() => {
        if (isFetchingNextPage) {
            setScrollPosition(messagerDialogRef.current?.scrollHeight || 0);
        }
    }, [isFetchingNextPage, messagerDialogRef]);

    return (
        <>
            {isPending ? (
                <Preloader page small />
            ) : isError ? (
                <NotContent text="При загрузке чата произошла ошибка" icon={<Cross />} danger />
            ) : data?.pages[0]?.totalCount ? (
                <>
                    <div className={cn(base.baseWrapperGap16, base.aic)}>
                        {isFetchingNextPage && <Preloader offIndent small page />}

                        {!isFetchingNextPage && <div ref={endPage}></div>}

                        <div className={base.contentItems}>
                            {[...data?.pages].reverse().map((dialog) =>
                                dialog?.messages.map((data) => {
                                    const messageDate = new Date(data.createdAt);
                                    const messageDateString = messageDate.toLocaleDateString('ru-RU', {
                                        day: 'numeric',
                                        month: 'long',
                                    });

                                    let messageElement = (
                                        <div
                                            key={data.id}
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
                                                isSelected={selectedMesseges.includes(data)}
                                                onDoubleClick={() => setReplyMessage(data)}
                                                setEditMessage={setEditMessage}
                                                setIsEditedMessage={setIsEditedMessage}
                                            />
                                        </div>
                                    );

                                    currentDate = messageDateString;

                                    return messageElement;
                                }),
                            )}
                        </div>
                    </div>

                    {/* <div className={styles.messangerDialogTyping}>
                        {!!typingUsers?.length && dialogId === typingChatId && (
                            <p className={styles.messangerDialogTypingText}>
                                {typingUsers.map((user) => user.nickname).join(' и ')} печатает...
                            </p>
                        )}
                    </div> */}
                </>
            ) : (
                <NotContent icon={<Message />} text="В данном чате еще нет сообщений" />
            )}
        </>
    );
};
