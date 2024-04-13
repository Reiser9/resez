'use client';

import React from 'react';
import cn from 'classnames';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import styles from './index.module.scss';

import { Check, Cross, Photo, Plus, Search, User } from '@/shared/icons';
import DialogItem from '@/shared/ui/DialogItem/DialogItem';
import { useDialogs } from '@/features/messenger';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { File } from '@/shared/ui/File';
import { Button } from '@/shared/ui/Button';
import useSearchUser from '@/features/user/search/useSearchUser';
import { Badge } from '@/shared/ui/Badge';
import { Text } from '@/shared/ui/Text';
import { UserAddItem } from '@/shared/ui/UserAddItem';

type Props = {
    dialogId: string | undefined;
};

const MessengerSidebar: React.FC<Props> = ({ dialogId }) => {
    const [newChatModal, setNewChatModal] = React.useState(false);

    const [chatName, setChatName] = React.useState('');
    const [chatAvatar, setChatAvatar] = React.useState<File>();
    const [chatAvatarPreview, setChatAvatarPreview] = React.useState<string | ArrayBuffer | null>(null);
    const [chatUsers, setChatUsers] = React.useState<number[]>([]);

    const { getDialogs, createChat } = useDialogs();
    const { getPaginationUsers } = useSearchUser();
    const { data, isLoading, error } = useQuery({ queryKey: ['messenger_dialogs'], queryFn: getDialogs });
    const {
        data: usersData,
        isLoading: usersIsLoading,
        error: usersError,
    } = useQuery({ queryKey: ['new_chat_users'], queryFn: getPaginationUsers });

    const router = useRouter();
    const queryClient = useQueryClient();

    const revalidateChats = async () => {
        await queryClient.invalidateQueries({ queryKey: ['messenger_dialogs'] });
    };

    const addUserInChat = (id: number) => {
        setChatUsers((prev) => {
            if (prev.includes(id)) {
                return prev.filter((userId) => userId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const createChatHandler = async () => {
        if (!chatName) {
            return;
        }

        let formData = new FormData();

        formData.append('chat', chatName);

        if (chatAvatar) {
            formData.append('picture', chatAvatar);
        }

        chatUsers.forEach((data) => {
            formData.append('users[]', data.toString());
        });

        const newChat = await createChat(formData, () => {
            setNewChatModal(false);
            revalidateChats();
        });

        if (newChat) {
            router.push(`/messenger/${newChat.chat.id}`);
        }
    };

    return (
        <>
            <div
                className={cn(styles.messangerSidebar, {
                    [styles.hide]: !!dialogId,
                })}
            >
                <div className={styles.searchInputInner}>
                    <input type="text" className={styles.searchInput} placeholder="Поиск" />

                    <Search className={styles.searchInputIcon} />

                    <Tooltip title="Создать группу">
                        <button className={styles.searchInputButton} onClick={() => setNewChatModal(true)}>
                            <Plus />
                        </button>
                    </Tooltip>
                </div>

                <div className={styles.messangerSidebarDialogsContent}>
                    {isLoading ? (
                        <Preloader page small />
                    ) : error ? (
                        <NotContent small danger icon={<Cross />} text="Произошла ошибка при загрузке диалогов" />
                    ) : data?.chats.length ? (
                        data?.chats.map((data, key) => (
                            <DialogItem
                                key={key}
                                data={data}
                                active={dialogId == String(data.id)}
                                onClick={() => {
                                    router.push(`/messenger/${data.id}`);
                                }}
                            />
                        ))
                    ) : (
                        <NotContent small icon={<User />} text="Диалогов не найдено" />
                    )}
                </div>
            </div>

            <Modal value={newChatModal} setValue={setNewChatModal} title="Создать группу" size="small">
                <div className={styles.messangerNewChat}>
                    <div className={styles.messangerNewChatInfo}>
                        <File setFile={setChatAvatar} setImgPreview={setChatAvatarPreview} id="groupAvatar" />

                        <label htmlFor="groupAvatar" className={styles.messangerChatAvatar}>
                            {chatAvatarPreview ? (
                                <Image
                                    src={chatAvatarPreview.toString()}
                                    alt="chat image preview"
                                    fill
                                    className={styles.messangerChatAvatarPreview}
                                />
                            ) : (
                                <Photo />
                            )}
                        </label>

                        <Input value={chatName} setValue={setChatName} placeholder="Название" />
                    </div>

                    <div className={styles.messangerNewChatUsers}>
                        <div className={styles.messangerNewChatUsersInfo}>
                            <p className={styles.messangerNewChatUsersTitle}>Пользователи:</p>

                            <p className={styles.messangerNewChatUsersCount}>{chatUsers.length}</p>
                        </div>

                        {/* Доработать как нибудь, показав выбранных участников сразу */}
                        {/* <div className={styles.messangerNewChatUsersAdded}>
                            {chatUsers.length
                            ? chatUsers.map((data, id) => <div key={id}>
                                {data}
                            </div>)
                            : <div className={styles.messangerNewChatUsersAddedText}>Выберите собеседников</div>}
                        </div> */}

                        <div className={styles.messangerNewChatUsersSearch}>
                            <div className={styles.messangerNewChatSearch}>
                                <Input placeholder="Поиск" className={styles.messangerNewChatSearchInput} />
                            </div>

                            {usersData?.users.map((data) => (
                                <UserAddItem
                                    key={data.id}
                                    data={data}
                                    active={chatUsers.includes(data.id)}
                                    onClick={() => addUserInChat(data.id)}
                                />
                            ))}
                        </div>
                    </div>

                    <Button onClick={createChatHandler} auto disabled={!chatName}>
                        Создать чат
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default MessengerSidebar;
