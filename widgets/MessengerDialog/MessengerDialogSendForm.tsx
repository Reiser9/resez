'use client';

import React, { FormEvent } from 'react';
import cn from 'classnames';
import { useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';

import type { Message } from '@/entities/messenger';
import { Clip, Cross, Microphone, Send, Warn } from '@/shared/icons';
import { useMessenger } from '@/features/messenger';

import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { IconButton } from '@/shared/ui/Button';

type Props = {
    dialogId: string | undefined;
    scrollDialogToBottom: () => void;
    replyMessage: Message | null;
    setReplyMessage: (value: Message | null) => void;
    isEditedMessage: boolean;
    setIsEditedMessage: (value: boolean) => void;
    editMessage?: Message;
    isKicked?: boolean;
};

export const MessengerDialogSendForm: React.FC<Props> = ({
    dialogId,
    scrollDialogToBottom,
    replyMessage,
    setReplyMessage,
    isEditedMessage,
    setIsEditedMessage,
    editMessage,
    isKicked = false,
}) => {
    const [message, setMessage] = React.useState('');
    const [sendingMessage, setSendingMessage] = React.useState(false);

    const queryClient = useQueryClient();

    const sendMessageInputRef = React.useRef<HTMLInputElement>(null);

    const { sendMessageInChat, editMessage: editMessageHandler } = useMessenger();

    const revalidateChat = async () => {
        await queryClient.invalidateQueries({ queryKey: ['messenger_dialogs_by_id'] });
        await queryClient.invalidateQueries({ queryKey: ['messenger_dialogs'] });

        scrollDialogToBottom();
    };

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!message || !message.trim() || !dialogId || sendingMessage) {
            return;
        }

        if (isEditedMessage && editMessage?.id) {
            if (editMessage?.message !== message.replace(/\s+/g, ' ')) {
                await editMessageHandler(editMessage?.id, message.replace(/\s+/g, ' '), revalidateChat);
            }

            setMessage('');
            return setIsEditedMessage(false);
        }

        setSendingMessage(true);
        await sendMessageInChat(String(dialogId), message.replace(/\s+/g, ' '), () => {
            setMessage('');
            revalidateChat();
        });
        setSendingMessage(false);
    };

    React.useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key.length === 1) {
                sendMessageInputRef.current?.focus();
            }
        };

        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

    React.useEffect(() => {
        if (isEditedMessage) {
            setReplyMessage(null);
            if (editMessage?.message) {
                setMessage(editMessage?.message);
                sendMessageInputRef.current?.focus();
            }
        } else {
            setMessage('');
        }
    }, [isEditedMessage, editMessage?.message]);

    React.useEffect(() => {
        if (replyMessage) {
            setMessage('');
            setIsEditedMessage(false);
        }
    }, [replyMessage]);

    return (
        <div className={styles.messangerDialogSendInner}>
            {isKicked ? (
                <div className={styles.messangerDialogSendKick}>
                    <Warn />

                    <Text variant="text">Вас исключили из чата</Text>
                </div>
            ) : (
                <>
                    {replyMessage ? (
                        <div className={styles.messangerDialogReply}>
                            <div className={styles.messangerDialogReplyInfo}>
                                <Text>{replyMessage.sender.nickname}</Text>
                                <Text
                                    variant="text2"
                                    className={styles.messangerDialogReplyMessageWrapper}
                                    textClassName={styles.messangerDialogReplyMessage}
                                >
                                    {replyMessage.message}
                                </Text>
                            </div>

                            <IconButton
                                small
                                circle
                                variant="light"
                                onClick={() => setReplyMessage(null)}
                                style={{ width: 30, height: 30 }}
                            >
                                <Cross />
                            </IconButton>
                        </div>
                    ) : (
                        isEditedMessage && (
                            <div className={styles.messangerDialogReply}>
                                <div className={styles.messangerDialogReplyInfo}>
                                    <Text>Редактирование сообщения</Text>
                                </div>

                                <IconButton
                                    small
                                    circle
                                    variant="light"
                                    onClick={() => setIsEditedMessage(false)}
                                    style={{ width: 30, height: 30 }}
                                >
                                    <Cross />
                                </IconButton>
                            </div>
                        )
                    )}

                    <form className={styles.messangerDialogSendWrapper} onSubmit={sendMessage}>
                        {/* <IconButton>
                        <Clip />
                    </IconButton> */}

                        <Input
                            ref={sendMessageInputRef}
                            value={message}
                            setValue={setMessage}
                            placeholder="Напишите сообщение"
                        />

                        <IconButton className={styles.sendButton} disabled={sendingMessage}>
                            {/* <Microphone
                            className={cn(styles.iconButton, {
                                [styles.fade]: !message,
                            })}
                        />

                        <Send
                            className={cn(styles.iconButton, {
                                [styles.fade]: message,
                            })}
                        /> */}

                            <Send className={cn(styles.iconButton, styles.fade)} />
                        </IconButton>
                    </form>
                </>
            )}
        </div>
    );
};
