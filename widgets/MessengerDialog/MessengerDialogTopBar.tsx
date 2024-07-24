'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';
import typography from '@/shared/styles/typography.module.scss';

import { Button, IconButton } from '@/shared/ui/Button';
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
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { Text } from '@/shared/ui/Text';
import { ChatInfo, Message } from '@/entities/messenger/model';
import { ConfirmModal, Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { Badge } from '@/shared/ui/Badge';
import { Preloader } from '@/shared/ui/Preloader';
import { useChat, useMessenger } from '@/features/messenger';
import { Checkbox, Tooltip } from 'antd';
import { copyText } from '@/shared/utils/copyText';
import { File } from '@/shared/ui/File';

type Props = {
    selectedMessegesIDs: Message[];
    setSelectedMessegesIDs: (value: Message[]) => void;
    data?: ChatInfo;
    setReplyMessage: (value: Message | null) => void;
    dataLoading: boolean;
};

export const MessengerDialogTopBar: React.FC<Props> = ({
    selectedMessegesIDs,
    setSelectedMessegesIDs,
    data,
    setReplyMessage,
    dataLoading,
}) => {
    const { id, chat, isGroup, isLeft, isAdmin, picture, membersCount, userId, isKicked, inviteLink } = data || {};

    const [actionMenu, setActionMenu] = React.useState(false);
    const [infoModal, setInfoModal] = React.useState(false);
    const [confirmQuit, setConfirmQuit] = React.useState(false);
    const [confirmDeleteDialog, setConfirmDeleteDialog] = React.useState(false);
    const [deleteHistoryCheckbox, setDeleteHistoryCheckbox] = React.useState(false);

    const [chatAvatar, setChatAvatar] = React.useState<File>();

    const [chatLinkCopied, setChatLinkCopied] = React.useState(false);

    const { deleteUserFromChat, getChatUsers, leaveFromChat, returnInChat, updateChatAvatar, removeChatAvatar } =
        useChat();
    const { clearChatHistory } = useMessenger();
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: chatUsers, isLoading } = useQuery({
        queryKey: ['messanger_chat_users', id],
        queryFn: () => getChatUsers(id),
        enabled: !!id && infoModal,
    });

    const revalidateChat = () => {
        queryClient.invalidateQueries({ queryKey: ['messanger_chat_users'] });
        queryClient.invalidateQueries({ queryKey: ['messenger_dialogs_by_id'] });
        queryClient.invalidateQueries({ queryKey: ['messenger_dialogs'] });
    };

    const deleteUserFromChatHandler = (chatId?: number, userId?: number) => {
        deleteUserFromChat(chatId, userId, revalidateChat);
    };

    const leaveFromChatHandler = async () => {
        if (!id) {
            return;
        }

        await leaveFromChat(id, deleteHistoryCheckbox, () => {
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

        returnInChat(id, revalidateChat);
    };

    const clearChatHistoryHandler = async () => {
        if (!id) {
            return;
        }

        await clearChatHistory(id, () => {
            revalidateChat();
            router.push('/messenger');
        });
    };

    const copyChatLink = () => {
        copyText(`${window.location.host}/i/${inviteLink}`);
        setChatLinkCopied(true);

        setTimeout(() => {
            setChatLinkCopied(false);
        }, 2000);
    };

    const updateChatAvatarHandler = async () => {
        if (!id || !chatAvatar) {
            return;
        }

        let formData = new FormData();
        formData.append('picture', chatAvatar);

        await updateChatAvatar(formData, id, revalidateChat);
    };

    const removeChatAvatarHandler = async () => {
        if (!id) {
            return;
        }

        await removeChatAvatar(id, revalidateChat);
    };

    React.useEffect(() => {
        if (chatAvatar) {
            updateChatAvatarHandler();
        }
    }, [chatAvatar]);

    return (
        <>
            <div className={styles.messangerTopBar}>
                {!dataLoading && (
                    <>
                        <div className={base.titleWrapper} style={{ minWidth: 38 }}>
                            <IconButton
                                className={styles.dialogBack}
                                small
                                variant="light"
                                onClick={() => router.push('/messenger')}
                            >
                                <ArrowLeft />
                            </IconButton>

                            {!!selectedMessegesIDs.length && (
                                <div className={styles.selectedMessages}>
                                    <p className={styles.selectedMessagesText}>
                                        Выделено: {selectedMessegesIDs.length}
                                    </p>

                                    <Cross onClick={() => setSelectedMessegesIDs([])} />
                                </div>
                            )}
                        </div>

                        {!selectedMessegesIDs.length && (
                            <div className={styles.messangerTopBarInfo}>
                                <div className={styles.messangerTopBarWrapper}>
                                    {isGroup ? (
                                        <div className={styles.messangerTopBarName} onClick={() => setInfoModal(true)}>
                                            {chat}
                                        </div>
                                    ) : (
                                        <Link href={`/user/${chat}`} className={typography.h4}>
                                            {chat}
                                        </Link>
                                    )}

                                    {/* <Mute className={styles.messangerTopBarMute} /> */}
                                </div>

                                {!isLeft && !isKicked && (
                                    <div className={styles.messangerTopBarOnline}>
                                        <Text variant="text2" textClassName={styles.lastOnline}>
                                            {isGroup ? `Участников: ${membersCount}` : 'был в сети 5 минут назад'}
                                        </Text>

                                        {!isGroup && <Mobile />}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className={base.titleWrapper}>
                            {!!selectedMessegesIDs.length && (
                                <>
                                    {selectedMessegesIDs.length === 1 && (
                                        <Button
                                            variant="light"
                                            small
                                            onClick={() => {
                                                setReplyMessage(selectedMessegesIDs[0]);
                                                setSelectedMessegesIDs([]);
                                            }}
                                        >
                                            Ответить
                                        </Button>
                                    )}

                                    <Button variant="light" small>
                                        Переслать
                                    </Button>

                                    <IconButton small variant="danger">
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

                                {/* <MenuLink>
                                    <Phone />
                                    Звонок
                                </MenuLink> */}

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
                    </>
                )}
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

                        <Tooltip title={chatLinkCopied ? 'Скопировано' : 'Скопировать'}>
                            <div className={styles.infoModalChatLink} onClick={copyChatLink}>
                                {window.location.host}/i/{inviteLink}
                                <LinkIcon />
                            </div>
                        </Tooltip>

                        <div className={styles.messangerNewChatUsersSearch}>
                            {/* <Button variant="light">
                                <Plus />
                                Добавить участника
                            </Button> */}

                            {/* <div className={styles.messangerNewChatSearch}>
                                <Input placeholder="Поиск" color="white" />
                            </div> */}

                            <div className={styles.messangerUsersList}>
                                {isLoading ? (
                                    <Preloader small page />
                                ) : (
                                    chatUsers?.users?.map((data) => (
                                        <div key={data.id} className={styles.chatUserItem}>
                                            <div className={styles.chatUserItemWrapper}>
                                                <Badge isUserAvatar text={data.nickname} image={data.avatar} />

                                                <Text>{data.nickname}</Text>
                                            </div>

                                            {data.isAdmin && (
                                                <Tooltip title="Создатель чата">
                                                    <IconButton variant="light" circle small>
                                                        <Crown />
                                                    </IconButton>
                                                </Tooltip>
                                            )}

                                            {!data.isAdmin && isAdmin && (
                                                <Tooltip title="Исключить">
                                                    <IconButton
                                                        small
                                                        variant="danger"
                                                        circle
                                                        onClick={() => deleteUserFromChatHandler(id, data.id)}
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
        </>
    );
};
