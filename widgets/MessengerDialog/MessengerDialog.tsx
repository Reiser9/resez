'use client';

import React from 'react';
import cn from 'classnames';
import { useParams } from 'next/navigation';

import styles from './index.module.scss';

import type { Message as MessageType } from '@/entities/messenger';
import type { TypingUsers } from '@/app/(withSidebarPages)/messenger/[[...id]]/page';
import { Send } from '@/shared/icons';
import { MessengerDialogTopBar } from './MessengerDialogTopBar';
import { MessengerDialogSendForm } from './MessengerDialogSendForm';
import { MessengerDialogMessages } from './MessengerDialogMessages';

import { NotContent } from '@/shared/ui/NotContent';

type Props = {
    typingUsersInfo: TypingUsers[];
};

export const MessengerDialog: React.FC<Props> = ({ typingUsersInfo }) => {
    const { id: dialogId } = useParams();

    const [selectedMesseges, setSelectedMesseges] = React.useState<MessageType[]>([]);
    const [replyMessage, setReplyMessage] = React.useState<MessageType | null>(null);

    const [isEditedMessage, setIsEditedMessage] = React.useState(false);
    const [editMessage, setEditMessage] = React.useState<MessageType>();

    const messagerDialogRef = React.useRef<null | HTMLDivElement>(null);
    const bottomDialogRef = React.useRef<null | HTMLDivElement>(null);

    const scrollBottom = () => {
        if (messagerDialogRef.current) {
            messagerDialogRef.current.scrollTo({
                top: messagerDialogRef.current.scrollHeight,
            });
        }
    };

    return (
        <div
            className={cn(styles.messangerContent, {
                [styles.show]: !!dialogId,
            })}
        >
            {dialogId ? (
                <>
                    <MessengerDialogTopBar
                        selectedMesseges={selectedMesseges}
                        setSelectedMesseges={setSelectedMesseges}
                        setReplyMessage={setReplyMessage}
                    />

                    <div className={styles.messangerDialog} ref={messagerDialogRef}>
                        <MessengerDialogMessages
                            selectedMesseges={selectedMesseges}
                            setSelectedMesseges={setSelectedMesseges}
                            setReplyMessage={setReplyMessage}
                            isEditedMessage={isEditedMessage}
                            setIsEditedMessage={setIsEditedMessage}
                            setEditMessage={setEditMessage}
                            scrollDialogToBottom={scrollBottom}
                            messagerDialogRef={messagerDialogRef}
                        />

                        <div ref={bottomDialogRef}></div>
                    </div>

                    <MessengerDialogSendForm
                        scrollDialogToBottom={scrollBottom}
                        replyMessage={replyMessage}
                        setReplyMessage={setReplyMessage}
                        isEditedMessage={isEditedMessage}
                        setIsEditedMessage={setIsEditedMessage}
                        editMessage={editMessage}
                        messagerDialogRef={messagerDialogRef}
                        bottomDialogRef={bottomDialogRef}
                    />
                </>
            ) : (
                <NotContent icon={<Send />} text="Для начала общения выберите чат" />
            )}
        </div>
    );
};
