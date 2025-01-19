'use client';

import React, { HTMLAttributes } from 'react';
import cn from 'classnames';
import { Checkbox, Tooltip } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { TypingUsers } from '@/app/(withSidebarPages)/messenger/[[...id]]/page';
import type { ChatItem } from '@/entities/messenger';
import { Block, Check, Delete, DotsHorizontal, DoubleCheck, Enter, Mute, Pin } from '@/shared/icons';
import { getFormattedDate } from '@/shared/utils/getFormattedDate';
import { useChat, useMessenger } from '@/features/messenger';
import useShortInfo from '@/features/user/data/useShortInfo';

import { Badge } from '../Badge';
import { IconButton } from '../Button';
import { ConfirmModal } from '../Modal';

type Props = {
    data: ChatItem;
    mute?: boolean;
    typingInfo?: TypingUsers;
    active?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const DialogItem: React.FC<Props> = ({ data, active = false, mute = false, typingInfo, ...props }) => {
    const { id: dialogId } = useParams();

    const { id, isGroup, isLeft, isAdmin, latestMessage, picture, chat, isKicked, unreadMessagesCount } = data || {};
    const { createdAt, updatedAt, isEdited, message, sender, type, isRead, files } = latestMessage || {};
    const { nickname, avatar, id: senderId } = sender || {};

    const [clearHistoryConfirm, setClearHistoryConfirm] = React.useState(false);
    const [leaveFromChatConfirm, setLeaveFromChatConfirm] = React.useState(false);

    const [deleteHistoryCheckbox, setDeleteHistoryCheckbox] = React.useState(false);

    const queryClient = useQueryClient();
    const router = useRouter();

    const revalidateChat = () => {
        queryClient.invalidateQueries({ queryKey: ['messenger_dialog_by_id', dialogId] });
        queryClient.invalidateQueries({ queryKey: ['messenger_dialogs'] });
        queryClient.invalidateQueries({ queryKey: ['unread_chats_count'] });
    };

    const { clearChatHistory } = useMessenger();
    const { leaveFromChat, returnInChat } = useChat();
    const { getShortInfo } = useShortInfo();

    const { data: user } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
    });

    const { id: userId } = user?.user || {};

    const leaveFromChatHandler = async () => {
        await leaveFromChat(id, deleteHistoryCheckbox, () => {
            revalidateChat();

            if (deleteHistoryCheckbox) {
                router.push('/messenger');
            }
        });
    };

    return (
        <>
            <div
                className={cn(styles.dialogItem, {
                    [styles.active]: active,
                })}
                {...props}
            >
                <Badge
                    isUserAvatar={!isGroup}
                    image={picture}
                    text={chat}
                    style={{ width: 48, height: 48 }}
                    indicator={unreadMessagesCount <= 999 ? unreadMessagesCount : '999+'}
                />

                <div className={styles.dialogItemTextInner}>
                    <div className={base.titleInner}>
                        <div className={base.titleWrapper}>
                            <p className={styles.dialogItemName}>{chat}</p>

                            {mute && <Mute className={styles.dialogItemMute} />}
                        </div>

                        <div className={base.titleWrapper}>
                            {createdAt && (
                                <p className={styles.dialogItemDate}>{getFormattedDate(createdAt, 'short')}</p>
                            )}

                            {isRead !== null && (
                                <div className={styles.messangerDialogItemStatus}>
                                    {isRead ? <DoubleCheck /> : <Check />}
                                    {/* <Clock /> */}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={base.titleInnerNowrap}>
                        <div className={styles.dialogItemMessageInner}>
                            {!typingInfo && senderId && userId === senderId && (
                                <Badge isUserAvatar size="small" image={avatar} text={nickname} />
                            )}

                            {typingInfo ? (
                                <p className={styles.messangerDialogTypingText}>
                                    {typingInfo?.users.map((user) => user.nickname).join(' и ')} печатает...
                                </p>
                            ) : (
                                <p className={styles.dialogItemMessage}>
                                    {message} <span>{!!files.length && `${files.length} фото`}</span>
                                </p>
                            )}
                        </div>

                        <div className={styles.dialogItemMoreInner} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.dialogItemMore}>
                                <DotsHorizontal />
                            </button>

                            <div className={styles.dialogItemActions}>
                                {/* <Tooltip destroyTooltipOnHide title="Закрепить">
                                    <IconButton small variant="light">
                                        <Pin />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip destroyTooltipOnHide title="В архив">
                                    <IconButton small variant="light">
                                        <Archive />
                                    </IconButton>
                                </Tooltip> */}

                                <Tooltip destroyTooltipOnHide title="Очистить историю сообщений">
                                    <IconButton small variant="danger" onClick={() => setClearHistoryConfirm(true)}>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>

                                {isGroup ? (
                                    !isKicked &&
                                    (isLeft ? (
                                        <Tooltip destroyTooltipOnHide title="Вернуться в чат">
                                            <IconButton
                                                small
                                                onClick={() =>
                                                    returnInChat(id, () => {
                                                        revalidateChat();
                                                        router.push(`/messenger/${id}`);
                                                    })
                                                }
                                            >
                                                <Enter />
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip destroyTooltipOnHide title="Выйти из чата">
                                            <IconButton
                                                small
                                                variant="danger"
                                                onClick={() => setLeaveFromChatConfirm(true)}
                                            >
                                                <Enter />
                                            </IconButton>
                                        </Tooltip>
                                    ))
                                ) : (
                                    // <Tooltip destroyTooltipOnHide title="Заблокировать">
                                    //     <IconButton small variant="danger">
                                    //         <Block />
                                    //     </IconButton>
                                    // </Tooltip>
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmModal
                text="Вы действительно хотите удалить историю сообщений?"
                value={clearHistoryConfirm}
                setValue={setClearHistoryConfirm}
                confirmText="Удалить"
                callback={() =>
                    clearChatHistory(id, () => {
                        revalidateChat();
                        router.push('/messenger');
                    })
                }
            />

            <ConfirmModal
                text="Вы действительно хотите покинуть чат?"
                value={leaveFromChatConfirm}
                setValue={setLeaveFromChatConfirm}
                confirmText="Покинуть"
                callback={leaveFromChatHandler}
            >
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '1.2rem 0' }}>
                    <Checkbox
                        checked={deleteHistoryCheckbox}
                        onChange={(e) => setDeleteHistoryCheckbox(e.target.checked)}
                    >
                        Также удалить чат
                    </Checkbox>
                </div>
            </ConfirmModal>
        </>
    );
};

export default DialogItem;
