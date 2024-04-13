'use client';

import React from 'react';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';

import { Cross, Message, Send } from '@/shared/icons';
import { DialogMessageItem } from '@/shared/ui/DialogMessageItem';
import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';
import { formatDate } from '@/shared/utils/formatDate';
import { useDialogs } from '@/features/messenger';
import { MessengerDialogTopBar } from './MessengerDialogTopBar';
import { MessengerDialogSendForm } from './MessengerDialogSendForm';

type Props = {
    dialogId: string | undefined;
};

export const MessengerDialog: React.FC<Props> = ({ dialogId }) => {
    const messagerDialogRef = React.useRef<null | HTMLDivElement>(null);

    const [selectedMessegesIDs, setSelectedMessegesIDs] = React.useState<number[]>([]);

    let currentDate: null | string;

    const { getChatById } = useDialogs();

    const { data, isLoading, error } = useQuery({
        queryKey: ['messenger_dialogs_by_id', dialogId],
        queryFn: () => getChatById(String(dialogId)),
        enabled: !!dialogId,
    });

    const selectMessage = (id: number) => {
        setSelectedMessegesIDs((prev) => {
            if (prev.includes(id)) {
                return prev.filter((messageId) => messageId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const scrollBottom = () => {
        if(messagerDialogRef.current){
            messagerDialogRef.current.scrollTo({
                top: messagerDialogRef.current.scrollHeight
            });
        }
    }

    React.useEffect(() => {
        if(dialogId && messagerDialogRef.current){
            scrollBottom();
        }
    }, [dialogId, messagerDialogRef.current, data?.messages]);

    return (
        <div
            className={cn(styles.messangerContent, {
                [styles.show]: !!dialogId,
            })}
        >
            {dialogId ? (
                <>
                    <MessengerDialogTopBar
                        data={data?.chat}
                        selectedMessegesIDs={selectedMessegesIDs}
                        setSelectedMessegesIDs={setSelectedMessegesIDs}
                    />

                    <div className={styles.messangerDialog} ref={messagerDialogRef}>
                        {isLoading ? (
                            <Preloader page small />
                        ) : error ? (
                            <NotContent small icon={<Cross />} danger text="При загрузке сообщения произошла ошибка." />
                        ) : data?.messages?.length ? (
                            <>
                                {data.messages.map((data, id) => {
                                    const messageDate = new Date(data.createdAt);
                                    const messageDateString = messageDate.toLocaleDateString('ru-RU', {
                                        day: 'numeric',
                                        month: 'long',
                                    });

                                    let messageElement = (
                                        <div key={id} style={{width: "100%", display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-start"}}>
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
                                                isSelected={selectedMessegesIDs.includes(data.id)}
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

                    <MessengerDialogSendForm dialogId={dialogId} scrollDialogToBottom={scrollBottom} />
                </>
            ) : (
                <NotContent icon={<Send />} text="Для начала общения выберите чат" />
            )}
        </div>
    );
};
