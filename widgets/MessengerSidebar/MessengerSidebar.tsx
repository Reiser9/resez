'use client';

import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { Tooltip } from 'antd';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { TypingUsers } from '@/app/(withSidebarPages)/messenger/[[...id]]/page';
import { Cross, Photo, Plus, Search, User } from '@/shared/icons';
import { useChat, useMessenger } from '@/features/messenger';
import { useSearchUser } from '@/features/user';
import { setDialogsScrollPosition } from '@/store/slices/messenger';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useRedux';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

import { UserAddItem } from '@/shared/ui/UserAddItem';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Preloader } from '@/shared/ui/Preloader';
import { File } from '@/shared/ui/File';
import { Modal } from '@/shared/ui/Modal';
import { NotContent } from '@/shared/ui/NotContent';
import { DialogItem } from '@/shared/ui/DialogItem';

type Props = {
    typingUsersInfo: TypingUsers[];
};

const MessengerSidebar: React.FC<Props> = ({ typingUsersInfo }) => {
    const { id } = useParams();

    const [newChatModal, setNewChatModal] = React.useState(false);
    const [newChatIsLoading, setNewChatIsLoading] = React.useState(false);

    const [chatName, setChatName] = React.useState('');
    const [chatAvatar, setChatAvatar] = React.useState<File | null>(null);
    const [chatAvatarPreview, setChatAvatarPreview] = React.useState<string | ArrayBuffer | null>(null);
    const [chatUsers, setChatUsers] = React.useState<number[]>([]);

    const chatListRef = React.useRef<HTMLDivElement>(null);

    const dialogsScrollPosition = useAppSelector((state) => state.messenger.dialogsScrollPosition);
    const dispatch = useAppDispatch();
    const { getDialogs } = useMessenger();
    const { createChat } = useChat();
    const { getPaginationUsers } = useSearchUser();

    const { data, endPage, isError, isFetchingNextPage, isPending } = useInfiniteScroll({
        queryKey: ['messenger_dialogs'],
        queryFn: (pageParam) => getDialogs(pageParam),
    });

    const {
        data: usersData,
        isLoading: usersIsLoading,
        isError: usersError,
    } = useQuery({ queryKey: ['new_chat_users'], queryFn: getPaginationUsers, enabled: newChatModal });

    const router = useRouter();
    const queryClient = useQueryClient();

    const revalidateChats = async () => {
        await queryClient.invalidateQueries({ queryKey: ['messenger_dialogs'] });
        await queryClient.invalidateQueries({ queryKey: ['unread_chats_count'] });
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
            formData.append('users', data.toString());
        });

        setNewChatIsLoading(true);
        const newChat = await createChat(formData, () => {
            setNewChatModal(false);
            revalidateChats();
        });
        setNewChatIsLoading(false);

        if (newChat) {
            router.push(`/messenger/${newChat.chat.id}`);
        }
    };

    const setScrollDialogs = () => {
        const currentElement = chatListRef.current;

        if (currentElement) {
            dispatch(setDialogsScrollPosition(currentElement.scrollTop));
        }
    };

    React.useEffect(() => {
        const currentElement = chatListRef.current;

        if (currentElement) {
            currentElement.scrollTop = dialogsScrollPosition;
        }
    }, [id]);

    return (
        <>
            <div
                className={cn(styles.messangerSidebar, {
                    [styles.hide]: !!id,
                })}
            >
                <div className={styles.searchInputInner}>
                    <input type="text" className={styles.searchInput} placeholder="Поиск" />

                    <Search className={styles.searchInputIcon} />

                    <Tooltip destroyTooltipOnHide title="Создать группу">
                        <button className={styles.searchInputButton} onClick={() => setNewChatModal(true)}>
                            <Plus />
                        </button>
                    </Tooltip>
                </div>

                <div className={styles.messangerSidebarDialogsContent} ref={chatListRef}>
                    {isPending ? (
                        <Preloader page small />
                    ) : isError ? (
                        <NotContent text="Ошибка при загрузке диалогов" icon={<Cross />} danger />
                    ) : data?.pages[0]?.totalCount ? (
                        <div className={cn(base.baseWrapperGap16, base.aic)}>
                            <div className={base.contentItems}>
                                {data?.pages.map((dialog) =>
                                    dialog?.chats.map((data) => (
                                        <DialogItem
                                            key={data.id}
                                            data={data}
                                            active={id == String(data.id)}
                                            typingInfo={typingUsersInfo.find((item) => item.chatId == data.id)}
                                            onClick={() => {
                                                setScrollDialogs();
                                                router.push(`/messenger/${data.id}`);
                                            }}
                                        />
                                    )),
                                )}
                            </div>

                            {isFetchingNextPage && <Preloader offIndent small page />}

                            {!isFetchingNextPage && <div ref={endPage}></div>}
                        </div>
                    ) : (
                        <NotContent text="Диалогов не найдено" />
                    )}
                </div>
            </div>

            <Modal value={newChatModal} setValue={setNewChatModal} title="Создать группу" size="small">
                <div className={styles.messangerNewChat}>
                    <div className={styles.messangerNewChatInfo}>
                        <File setFile={setChatAvatar} setImgPreview={setChatAvatarPreview} id="groupAvatar" />

                        <div className={styles.messangerChatAvatarWrapper}>
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

                            {chatAvatarPreview && (
                                <button
                                    className={styles.messangerChatAvatarDelete}
                                    onClick={() => {
                                        setChatAvatarPreview(null);
                                        setChatAvatar(null);
                                    }}
                                >
                                    <Cross />
                                </button>
                            )}
                        </div>

                        <Input value={chatName} setValue={setChatName} placeholder="Название" lengthLimit={75} />
                    </div>

                    <div className={styles.messangerNewChatUsers}>
                        <div className={styles.messangerNewChatUsersInfo}>
                            <p className={styles.messangerNewChatUsersTitle}>Пользователи:</p>

                            <p className={styles.messangerNewChatUsersCount}>{chatUsers?.length}</p>
                        </div>

                        {/* Доработать как нибудь, показав выбранных участников сразу */}
                        <div className={styles.messangerNewChatUsersAdded}>
                            {chatUsers?.length ? (
                                chatUsers.map((data, id) => <div key={id}>{data}</div>)
                            ) : (
                                <div className={styles.messangerNewChatUsersAddedText}>Выберите собеседников</div>
                            )}
                        </div>

                        <div className={styles.messangerNewChatUsersSearch}>
                            {!usersError && (
                                <div className={styles.messangerNewChatSearch}>
                                    <Input placeholder="Поиск" className={styles.messangerNewChatSearchInput} />
                                </div>
                            )}

                            {usersIsLoading ? (
                                <Preloader small page />
                            ) : usersError ? (
                                <NotContent text="Ошибка загрузки пользователей" icon={<Cross />} danger />
                            ) : (
                                usersData?.users.map((data) => (
                                    <UserAddItem
                                        key={data.id}
                                        data={data}
                                        active={chatUsers.includes(data.id)}
                                        onClick={() => addUserInChat(data.id)}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    <Button onClick={createChatHandler} auto disabled={!chatName} loading={newChatIsLoading}>
                        Создать чат
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default MessengerSidebar;
