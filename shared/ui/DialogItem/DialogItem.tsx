<<<<<<< HEAD
'use client';

import React, { HTMLAttributes } from 'react';
import cn from 'classnames';
import { Checkbox, Tooltip } from 'antd';
import { useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Block, Delete, DotsHorizontal, Enter, Mute, Pin } from '@/shared/icons';
import { IconButton } from '../Button';
import { ChatItem } from '@/entities/messenger';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { getFormattedDate } from '@/shared/utils/getFormattedDate';
import { Badge } from '../Badge';
import { useChat, useMessenger } from '@/features/messenger';
import { ConfirmModal } from '../Modal';
import { useRouter } from 'next/navigation';

type Props = {
    data: ChatItem;
    mute?: boolean;
    active?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const DialogItem: React.FC<Props> = ({ data, active = false, mute = false, ...props }) => {
    const { id, isGroup, isLeft, isAdmin, lastMessage, picture, chat, isKicked } = data || {};
    const { createdAt, updatedAt, isEdited, message, sender, type, readCount } = lastMessage || {};
    const { nickname, avatar, id: senderId } = sender || {};

    const [clearHistoryConfirm, setClearHistoryConfirm] = React.useState(false);
    const [leaveFromChatConfirm, setLeaveFromChatConfirm] = React.useState(false);

    const [deleteHistoryCheckbox, setDeleteHistoryCheckbox] = React.useState(false);

    const queryClient = useQueryClient();
    const router = useRouter();

    const revalidateChat = () => {
        queryClient.invalidateQueries({ queryKey: ['messenger_dialogs_by_id'] });
        queryClient.invalidateQueries({ queryKey: ['messenger_dialogs'] });
    };

    const userId = useAppSelector((state) => state.user.user?.id);

    const { clearChatHistory } = useMessenger();
    const { leaveFromChat, returnInChat } = useChat();

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
                    indicator={readCount <= 999 ? readCount : '999+'}
                />

                <div className={styles.dialogItemTextInner}>
                    <div className={base.titleInner}>
                        <div className={base.titleWrapper}>
                            <p className={styles.dialogItemName}>{chat}</p>

                            {mute && <Mute className={styles.dialogItemMute} />}
                        </div>

                        {createdAt && <p className={styles.dialogItemDate}>{getFormattedDate(createdAt, 'short')}</p>}
                    </div>

                    <div className={base.titleInnerNowrap}>
                        <div className={styles.dialogItemMessageInner}>
                            {senderId && userId === senderId && (
                                <Badge isUserAvatar size="small" image={avatar} text={nickname} />
                            )}

                            {message && <p className={styles.dialogItemMessage}>{message}</p>}
                        </div>

                        <div className={styles.dialogItemMoreInner} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.dialogItemMore}>
                                <DotsHorizontal />
                            </button>

                            <div className={styles.dialogItemActions}>
                                {/* <Tooltip title="Закрепить">
                                    <IconButton small variant="light">
                                        <Pin />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="В архив">
                                    <IconButton small variant="light">
                                        <Archive />
                                    </IconButton>
                                </Tooltip> */}

                                <Tooltip title="Очистить историю сообщений">
                                    <IconButton small variant="danger" onClick={() => setClearHistoryConfirm(true)}>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>

                                {isGroup ? (
                                    !isKicked &&
                                    (isLeft ? (
                                        <Tooltip title="Вернуться в чат">
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
                                        <Tooltip title="Выйти из чата">
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
                                    <Tooltip title="Заблокировать">
                                        <IconButton small variant="danger">
                                            <Block />
                                        </IconButton>
                                    </Tooltip>
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
=======
'use client';

import React, { HTMLAttributes } from 'react';
import cn from 'classnames';
import { Checkbox, Tooltip } from 'antd';
import { useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Block, Delete, DotsHorizontal, Enter, Mute, Pin } from '@/shared/icons';
import { IconButton } from '../Button';
import { ChatItem } from '@/entities/messenger';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { getFormattedDate } from '@/shared/utils/getFormattedDate';
import { Badge } from '../Badge';
import { useChat, useMessenger } from '@/features/messenger';
import { ConfirmModal } from '../Modal';
import { useRouter } from 'next/navigation';

type Props = {
    data: ChatItem;
    mute?: boolean;
    active?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const DialogItem: React.FC<Props> = ({ data, active = false, mute = false, ...props }) => {
    const { id, isGroup, isLeft, isAdmin, lastMessage, picture, chat, isKicked } = data || {};
    const { createdAt, updatedAt, isEdited, message, sender, type, readCount } = lastMessage || {};
    const { nickname, avatar, id: senderId } = sender || {};

    const [clearHistoryConfirm, setClearHistoryConfirm] = React.useState(false);
    const [leaveFromChatConfirm, setLeaveFromChatConfirm] = React.useState(false);

    const [deleteHistoryCheckbox, setDeleteHistoryCheckbox] = React.useState(false);

    const queryClient = useQueryClient();
    const router = useRouter();

    const revalidateChat = () => {
        queryClient.invalidateQueries({ queryKey: ['messenger_dialogs_by_id'] });
        queryClient.invalidateQueries({ queryKey: ['messenger_dialogs'] });
    };

    const userId = useAppSelector((state) => state.user.user?.id);

    const { clearChatHistory } = useMessenger();
    const { leaveFromChat, returnInChat } = useChat();

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
                    indicator={readCount <= 999 ? readCount : '999+'}
                />

                <div className={styles.dialogItemTextInner}>
                    <div className={base.titleInner}>
                        <div className={base.titleWrapper}>
                            <p className={styles.dialogItemName}>{chat}</p>

                            {mute && <Mute className={styles.dialogItemMute} />}
                        </div>

                        {createdAt && <p className={styles.dialogItemDate}>{getFormattedDate(createdAt, 'short')}</p>}
                    </div>

                    <div className={base.titleInnerNowrap}>
                        <div className={styles.dialogItemMessageInner}>
                            {senderId && userId === senderId && (
                                <Badge isUserAvatar size="small" image={avatar} text={nickname} />
                            )}

                            {message && <p className={styles.dialogItemMessage}>{message}</p>}
                        </div>

                        <div className={styles.dialogItemMoreInner} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.dialogItemMore}>
                                <DotsHorizontal />
                            </button>

                            <div className={styles.dialogItemActions}>
                                {/* <Tooltip title="Закрепить">
                                    <IconButton small variant="light">
                                        <Pin />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="В архив">
                                    <IconButton small variant="light">
                                        <Archive />
                                    </IconButton>
                                </Tooltip> */}

                                <Tooltip title="Очистить историю сообщений">
                                    <IconButton small variant="danger" onClick={() => setClearHistoryConfirm(true)}>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>

                                {isGroup ? (
                                    !isKicked &&
                                    (isLeft ? (
                                        <Tooltip title="Вернуться в чат">
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
                                        <Tooltip title="Выйти из чата">
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
                                    <Tooltip title="Заблокировать">
                                        <IconButton small variant="danger">
                                            <Block />
                                        </IconButton>
                                    </Tooltip>
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
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
