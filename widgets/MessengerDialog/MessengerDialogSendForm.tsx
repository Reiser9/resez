'use client';

import React, { FormEvent } from 'react';
import cn from 'classnames';
import EmojiPicker, { EmojiStyle, SkinTonePickerLocation } from 'emoji-picker-react';
import { useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';

import type { Message } from '@/entities/messenger';
import type { FileInfo } from '@/entities/file';
import { Clip, Cross, Emoji, Microphone, Send, Warn } from '@/shared/icons';
import { useMessenger } from '@/features/messenger';

import { Text } from '@/shared/ui/Text';
import { IconButton } from '@/shared/ui/Button';
import { useFile } from '@/features/file';
import { File } from '@/shared/ui/File';
import { useThemeContext } from '@/shared/context/ThemeProvider';

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
    const [messageFiles, setMessageFiles] = React.useState<FileInfo[]>([]);
    const [choosedFile, setChoosedFile] = React.useState<File | null>(null);

    const [emojiShow, setEmojiShow] = React.useState(false);
    const emojiRef = React.useRef<HTMLDivElement>(null);

    const queryClient = useQueryClient();

    const sendMessageInputRef = React.useRef<HTMLInputElement>(null);

    const { sendMessageInChat, editMessage: editMessageHandler, readMessages } = useMessenger();
    const { uploadFile } = useFile();

    const revalidateChat = async () => {
        await queryClient.invalidateQueries({ queryKey: ['messenger_dialogs_by_id'] });
        await queryClient.invalidateQueries({ queryKey: ['messenger_dialogs'] });
        await queryClient.invalidateQueries({ queryKey: ['unread_chats_count'] });

        scrollDialogToBottom();
    };

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (((!messageFiles || !messageFiles.length) && (!message || !message.trim())) || !dialogId || sendingMessage) {
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
        await sendMessageInChat(String(dialogId), message.replace(/\s+/g, ' '), messageFiles, () => {
            setMessage('');
            revalidateChat();
        })
            .then((data) => {
                if (!data) return;

                readMessages(data.id);
            })
            .finally(() => {
                setSendingMessage(false);
            });
    };

    React.useEffect(() => {
        if (choosedFile) {
            const formData = new FormData();

            formData.append('file', choosedFile);
            uploadFile(formData).then((result) => {
                if (!result) return;

                setMessageFiles((prev) => [...prev, result.file]);
            });
        }
    }, [choosedFile]);

    React.useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key.length === 1) {
                const inputElement = sendMessageInputRef.current;

                if (inputElement) {
                    inputElement.focus();

                    const length = inputElement.value.length;
                    inputElement.setSelectionRange(length, length);
                }
            }
        };

        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

    React.useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
                setEmojiShow(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
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
                        <File id="messangerImage" onChange={(file: File) => setChoosedFile(file)} />

                        <label htmlFor="messangerImage" className={cn(styles.messangerFormButton, styles.fileButton)}>
                            <span className={styles.messangerImageButton}>
                                <Clip />
                            </span>
                        </label>

                        <input
                            type="text"
                            placeholder="Напишите сообщение"
                            ref={sendMessageInputRef}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className={styles.messangerDialogSendInput}
                        />

                        <div className={styles.messangerFormButtons}>
                            <div style={{ position: 'relative' }} ref={emojiRef}>
                                <div
                                    className={cn(styles.messangerFormButton, styles.emojiButton, {
                                        [styles.active]: emojiShow,
                                    })}
                                    onClick={() => setEmojiShow((prev) => !prev)}
                                >
                                    <Emoji />
                                </div>

                                <div
                                    className={cn(styles.emojiInner, {
                                        [styles.active]: emojiShow,
                                    })}
                                >
                                    <EmojiPicker
                                        emojiStyle={EmojiStyle.NATIVE}
                                        onEmojiClick={(el) => setMessage((prev) => `${prev}${el.emoji}`)}
                                        lazyLoadEmojis
                                        searchPlaceHolder="Поиск.."
                                        skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
                                        searchDisabled
                                    />
                                </div>
                            </div>

                            <button
                                className={cn(styles.messangerFormButton, styles.sendButton, {
                                    [styles.disabled]: !message || sendingMessage,
                                })}
                                onClick={() => setEmojiShow(false)}
                            >
                                <Send className={cn(styles.iconButton, styles.fade)} />
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};
