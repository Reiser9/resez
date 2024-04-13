'use client';

import React, { FormEvent } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import { Clip, Microphone, Send } from '@/shared/icons';
import { IconButton } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useDialogs } from '@/features/messenger';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
    dialogId: string | undefined;
    scrollDialogToBottom: () => void;
};

export const MessengerDialogSendForm: React.FC<Props> = ({ dialogId, scrollDialogToBottom }) => {
    const [message, setMessage] = React.useState('');

    const { sendMessageInChat } = useDialogs();
    const queryClient = useQueryClient();

    const revalidateChat = async () => {
        await queryClient.invalidateQueries({ queryKey: ['messenger_dialogs_by_id'] });
        await queryClient.invalidateQueries({ queryKey: ['messenger_dialogs'] });

        scrollDialogToBottom();
    };

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!message || !message.trim() || !dialogId) {
            return;
        }

        sendMessageInChat(String(dialogId), message, () => {
            setMessage('');
            revalidateChat();
        });
    };

    return (
        <form className={styles.messangerDialogSendInner} onSubmit={sendMessage}>
            <IconButton>
                <Clip />
            </IconButton>

            <Input value={message} setValue={setMessage} placeholder="Напишите сообщение" />

            <IconButton className={styles.sendButton}>
                <Microphone
                    className={cn(styles.iconButton, {
                        [styles.fade]: !message,
                    })}
                />

                <Send
                    className={cn(styles.iconButton, {
                        [styles.fade]: message,
                    })}
                />
            </IconButton>
        </form>
    );
};
