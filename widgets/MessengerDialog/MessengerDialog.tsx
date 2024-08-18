'use client';

import React from 'react';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';

import type { Message as MessageType } from '@/entities/messenger';
import { Cross, Message, Send } from '@/shared/icons';
import { formatDate } from '@/shared/utils/formatDate';
import { useMessenger } from '@/features/messenger';
import { MessengerDialogTopBar } from './MessengerDialogTopBar';
import { MessengerDialogSendForm } from './MessengerDialogSendForm';
import { useAppSelector } from '@/shared/hooks/useRedux';

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
    
    const router = useRouter();

    const messagerDialogRef = React.useRef<null | HTMLDivElement>(null);
    const currentMessagesRef = React.useRef<MessageType>();
    let currentDate: null | string;

    const { getChatById } = useMessenger();
    const myId = useAppSelector(state => state.user.user?.id);

    const { data, isLoading, error } = useQuery({
        queryKey: ['messenger_dialogs_by_id', dialogId],
        queryFn: () => getChatById(String(dialogId), () => router.push("/messenger")),
        enabled: !!dialogId,
    });

    
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

    React.useEffect(() => {
        if(!isEditedMessage){
            const filteredArray = data?.messages.filter(item => item.sender?.id === myId);
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
            if (event.key === "ArrowUp" && currentMessagesRef.current) {
                setIsEditedMessage(true);
            }

            if (event.key === "Escape") {
                setIsEditedMessage(false);
                setReplyMessage(null);
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
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
                    {!error && <MessengerDialogTopBar
                        data={data?.chat}
                        selectedMessegesIDs={selectedMessegesIDs}
                        setSelectedMessegesIDs={setSelectedMessegesIDs}
                        setReplyMessage={setReplyMessage}
                        dataLoading={isLoading}
                    />}

                    <div className={styles.messangerDialog} ref={messagerDialogRef}>
                        {isLoading ? (
                            <Preloader page small />
                        ) : error ? (
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
                                                // isSelected={selectedMessegesIDs.includes(data)}
                                                // onDoubleClick={() => setReplyMessage(data)}
                                                setEditMessage={setEditMessage}
                                                setIsEditedMessage={setIsEditedMessage}
                                            />
                                        </div>
                                    );

                                    currentDate = messageDateString;

                                    return messageElement;
                                })}
                            </>
                        ) : (
                            <NotContent icon={<Message />} text="В данном чате еще нет сообщений." />
                        )}
                    </div>

                    {!error && <MessengerDialogSendForm
                        dialogId={dialogId}
                        scrollDialogToBottom={scrollBottom}
                        replyMessage={replyMessage}
                        setReplyMessage={setReplyMessage}
                        isEditedMessage={isEditedMessage}
                        setIsEditedMessage={setIsEditedMessage}
                        editMessage={editMessage}
                        isKicked={data?.chat.isKicked}
                    />}
                </>
            ) : (
                <NotContent icon={<Send />} text="Для начала общения выберите чат" />
            )}
        </div>
    );
};
