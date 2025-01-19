'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Checkbox, Tooltip } from 'antd';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';
import typography from '@/shared/styles/typography.module.scss';

import type { Message } from '@/entities/messenger/model';
import {
    ArrowLeft,
    Block,
    Cross,
    Crown,
    Delete,
    DotsHorizontal,
    Mobile,
    Mute,
    Phone,
    Plus,
    User,
    Link as LinkIcon,
    Enter,
    Pencil,
} from '@/shared/icons';
import { useChat, useMessenger } from '@/features/messenger';
import { copyText } from '@/shared/utils/copyText';
import { getFormattedDate } from '@/shared/utils/getFormattedDate';

// import { Input } from '@/shared/ui/Input';
import { File } from '@/shared/ui/File';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { Text } from '@/shared/ui/Text';
import { Button, IconButton } from '@/shared/ui/Button';
import { Preloader } from '@/shared/ui/Preloader';
import { Badge } from '@/shared/ui/Badge';
import { ConfirmModal, Modal } from '@/shared/ui/Modal';
import { CopyLink } from '@/shared/ui/CopyLink';
import { Input } from '@/shared/ui/Input';
import { NotContent } from '@/shared/ui/NotContent';

type Props = {
    selectedMesseges: Message[];
    setSelectedMesseges: (value: Message[]) => void;
    setReplyMessage: (value: Message | null) => void;
};

export const MessengerDialogTopBar: React.FC<Props> = ({ selectedMesseges, setSelectedMesseges, setReplyMessage }) => {
    const { id } = useParams();

    const [actionMenu, setActionMenu] = React.useState(false);
    const [infoModal, setInfoModal] = React.useState(false);
    const [confirmQuit, setConfirmQuit] = React.useState(false);
    const [confirmDeleteDialog, setConfirmDeleteDialog] = React.useState(false);
    const [deleteHistoryCheckbox, setDeleteHistoryCheckbox] = React.useState(false);

    const [confirmDeleteMessages, setConfirmDeleteMessages] = React.useState(false);
    const [deleteMessageForAll, setDeleteMessageForAll] = React.useState(false);

    const [chatAvatar, setChatAvatar] = React.useState<File>();

    const queryClient = useQueryClient();
    const router = useRouter();

    const { deleteUserFromChat, getChatUsers, leaveFromChat, returnInChat, updateChatAvatar, removeChatAvatar } =
        useChat();
    const { clearChatHistory, deleteMessageById, getChatInfoById } = useMessenger();

    const { data: chatUsers, isPending: chatUsersIsLoading } = useQuery({
        queryKey: ['messanger_chat_users', id],
        queryFn: () => getChatUsers(String(id)),
        enabled: !!id && infoModal,
    });

    const { data, isPending, isError } = useQuery({
        queryKey: ['dialog_info_by_id', id],
        queryFn: () => getChatInfoById(String(id)),
        enabled: !!id,
    });

    const { chat, isGroup, isLeft, isAdmin, picture, membersCount, userId, isKicked, inviteLink, activity } =
        data || {};
    const { isOnline, lastSeen } = activity || {};

    const revalidateChat = () => {
        queryClient.invalidateQueries({ queryKey: ['messanger_chat_users'] });
        queryClient.invalidateQueries({ queryKey: ['dialog_messanges_by_id'] });
        queryClient.invalidateQueries({ queryKey: ['messenger_dialogs'] });
    };

    const deleteUserFromChatHandler = (chatId: number | string, userId?: number) => {
        deleteUserFromChat(chatId, userId, revalidateChat);
    };

    const deleteMessagesHandler = () => {
        const selectedIds = selectedMesseges.map((data) => data.id);

        deleteMessageById(selectedIds, deleteMessageForAll, () => {
            setSelectedMesseges([]);
            setDeleteMessageForAll(false);
            revalidateChat();
        });
    };

    const leaveFromChatHandler = async () => {
        if (!id) {
            return;
        }

        await leaveFromChat(String(id), deleteHistoryCheckbox, () => {
            revalidateChat();

            if (deleteHistoryCheckbox) {
                router.push('/messenger');
            }
        });
    };

    const enterToChat = () => {
        if (!id) {
            return;
        }

        returnInChat(String(id), revalidateChat);
    };

    const clearChatHistoryHandler = async () => {
        if (!id) {
            return;
        }

        await clearChatHistory(String(id), () => {
            revalidateChat();
            router.push('/messenger');
        });
    };

    const updateChatAvatarHandler = async () => {
        if (!id || !chatAvatar) {
            return;
        }

        let formData = new FormData();
        formData.append('picture', chatAvatar);

        await updateChatAvatar(formData, String(id), revalidateChat);
    };

    const removeChatAvatarHandler = async () => {
        if (!id) {
            return;
        }

        await removeChatAvatar(String(id), revalidateChat);
    };

    React.useEffect(() => {
        if (chatAvatar) {
            updateChatAvatarHandler();
        }
    }, [chatAvatar]);

    if (isPending) {
        return (
            <div className={styles.messangerTopBar}>
                <Preloader offIndent small page />
            </div>
        );
    }

    if(isError){
        return;
    }

    return (
        <>
            <div className={styles.messangerTopBar}>
                <div className={base.titleWrapper} style={{ minWidth: 38 }}>
                    <IconButton
                        className={styles.dialogBack}
                        small
                        variant="light"
                        onClick={() => router.push('/messenger')}
                    >
                        <ArrowLeft />
                    </IconButton>

                    {!!selectedMesseges.length && (
                        <div className={styles.selectedMessages}>
                            <p className={styles.selectedMessagesText}>Выделено: {selectedMesseges.length}</p>

                            <Cross onClick={() => setSelectedMesseges([])} />
                        </div>
                    )}
                </div>

                {!selectedMesseges.length && (
                    <div className={styles.messangerTopBarInfoWrapper}>
                        <Badge image={picture} text={chat} />

                        <div className={styles.messangerTopBarInfo}>
                            <div className={styles.messangerTopBarWrapper}>
                                {isGroup ? (
                                    <div className={styles.messangerTopBarName} onClick={() => setInfoModal(true)}>
                                        {chat}
                                    </div>
                                ) : (
                                    <Link prefetch={false} href={`/user/${chat}`} className={typography.h4}>
                                        {chat}
                                    </Link>
                                )}

                                {/* <Mute className={styles.messangerTopBarMute} /> */}
                            </div>

                            {!isLeft && !isKicked && (
                                <div className={styles.messangerTopBarOnline}>
                                    <Text variant="text2" textClassName={styles.lastOnline}>
                                        {isGroup
                                            ? `Участников: ${membersCount}`
                                            : `${
                                                  isOnline
                                                      ? 'Онлайн'
                                                      : lastSeen
                                                      ? `Был(а) ${getFormattedDate(lastSeen)}`
                                                      : 'Был(а) очень давно'
                                              }`}
                                    </Text>

                                    {!isGroup && <Mobile />}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className={base.titleWrapper}>
                    {!!selectedMesseges.length && (
                        <>
                            {selectedMesseges.length === 1 && (
                                <Button
                                    variant="light"
                                    small
                                    onClick={() => {
                                        setReplyMessage(selectedMesseges[0]);
                                        setSelectedMesseges([]);
                                    }}
                                >
                                    Ответить
                                </Button>
                            )}

                            <Button variant="light" small>
                                Переслать
                            </Button>

                            <IconButton small variant="danger" onClick={() => setConfirmDeleteMessages(true)}>
                                <Delete />
                            </IconButton>
                        </>
                    )}

                    <HoverMenu
                        button={
                            <IconButton small variant="light" onClick={() => setActionMenu((prev) => !prev)}>
                                <DotsHorizontal />
                            </IconButton>
                        }
                        value={actionMenu}
                        setValue={setActionMenu}
                    >
                        {isGroup && (
                            <>
                                {!isLeft && !isKicked && (
                                    <MenuLink
                                        onClick={() => {
                                            setActionMenu(false);
                                            setInfoModal(true);
                                        }}
                                    >
                                        <User />
                                        Группа
                                    </MenuLink>
                                )}

                                {isLeft ? (
                                    <MenuLink onClick={enterToChat}>
                                        <Enter />
                                        Вернуться в чат
                                    </MenuLink>
                                ) : (
                                    !isKicked && (
                                        <MenuLink
                                            danger
                                            onClick={() => {
                                                setActionMenu(false);
                                                setConfirmQuit(true);
                                            }}
                                        >
                                            <Cross />
                                            Выйти из чата
                                        </MenuLink>
                                    )
                                )}
                            </>
                        )}

                        {!isGroup && (
                            <>
                                <MenuLink onClick={() => router.push(`/user/${chat}`)}>
                                    <User />
                                    Профиль
                                </MenuLink>

                                <MenuLink danger>
                                    <Block />
                                    Заблокировать
                                </MenuLink>
                            </>
                        )}

                        <MenuLink>
                            <Phone />
                            Звонок
                        </MenuLink>

                        <MenuLink
                            danger
                            onClick={() => {
                                setActionMenu(false);
                                setConfirmDeleteDialog(true);
                            }}
                        >
                            <Delete />
                            Удалить чат
                        </MenuLink>
                    </HoverMenu>
                </div>
            </div>

            {!isLeft && !isKicked && (
                <Modal title="Информация" value={infoModal} setValue={setInfoModal} size="small">
                    <div className={styles.infoModalContent}>
                        <div className={styles.infoModalInfo}>
                            <div className={styles.infoModalAvatarInner}>
                                <Badge text={chat} image={picture} size="big" />
                                <File setFile={setChatAvatar} id="chatChangeAvatar" />

                                <div className={styles.infoModalAvatarActions}>
                                    <label htmlFor="chatChangeAvatar" className={styles.infoModalAvatarAction}>
                                        <Pencil />
                                    </label>

                                    {picture && (
                                        <button
                                            className={cn(styles.infoModalAvatarAction, styles.danger)}
                                            onClick={removeChatAvatarHandler}
                                        >
                                            <Cross />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <p className={styles.infoModalInfoName}>{chat}</p>

                            <p className={styles.infoModalInfoUserCount}>Участников: {membersCount}</p>
                        </div>

                        {inviteLink && <CopyLink link={inviteLink} />}

                        <div className={styles.messangerNewChatUsersSearch}>
                            <Button variant="light">
                                <Plus />
                                Добавить участника
                            </Button>

                            <div className={styles.messangerNewChatSearch}>
                                <Input placeholder="Поиск" color="white" />
                            </div>

                            <div className={styles.messangerUsersList}>
                                {chatUsersIsLoading ? (
                                    <Preloader small page />
                                ) : (
                                    chatUsers?.users?.map((data) => (
                                        <div key={data.id} className={styles.chatUserItem}>
                                            <div className={styles.chatUserItemWrapper}>
                                                <Badge isUserAvatar text={data.nickname} image={data.avatar} />

                                                <div className={base.baseWrapperGap4}>
                                                    <Text>{data.nickname}</Text>

                                                    <Text variant="text2" fontWeight={500}>
                                                        {data.activity.isOnline
                                                            ? 'Онлайн'
                                                            : data.activity.lastSeen
                                                            ? `Был(а) в сети ${getFormattedDate(
                                                                  data.activity.lastSeen,
                                                                  'short',
                                                              )}`
                                                            : 'Был(а) в сети очень давно'}
                                                    </Text>
                                                </div>
                                            </div>

                                            {data.isAdmin && (
                                                <Tooltip destroyTooltipOnHide title="Создатель чата">
                                                    <IconButton variant="light" circle small>
                                                        <Crown />
                                                    </IconButton>
                                                </Tooltip>
                                            )}

                                            {!data.isAdmin && isAdmin && (
                                                <Tooltip destroyTooltipOnHide title="Исключить">
                                                    <IconButton
                                                        small
                                                        variant="danger"
                                                        circle
                                                        onClick={() => deleteUserFromChatHandler(String(id), data.id)}
                                                    >
                                                        <Cross />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <Button
                            color="danger"
                            variant="light"
                            onClick={() => {
                                setInfoModal(false);
                                setConfirmQuit(true);
                            }}
                        >
                            Выйти из чата
                        </Button>
                    </div>
                </Modal>
            )}

            <ConfirmModal
                text="Вы действительно хотите удалить историю сообщений?"
                value={confirmDeleteDialog}
                setValue={setConfirmDeleteDialog}
                confirmText="Удалить"
                callback={clearChatHistoryHandler}
            />

            <ConfirmModal
                text="Вы действительно хотите покинуть чат?"
                value={confirmQuit}
                setValue={setConfirmQuit}
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

            <ConfirmModal
                text={`Вы действительно хотите удалить ${selectedMesseges.length > 1 ? 'сообщения' : 'сообщение'}?`}
                value={confirmDeleteMessages}
                setValue={setConfirmDeleteMessages}
                confirmText="Удалить"
                callback={deleteMessagesHandler}
            >
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '1.2rem 0' }}>
                    <Checkbox checked={deleteMessageForAll} onChange={(e) => setDeleteMessageForAll(e.target.checked)}>
                        Удалить для всех
                    </Checkbox>
                </div>
            </ConfirmModal>
        </>
    );
};
