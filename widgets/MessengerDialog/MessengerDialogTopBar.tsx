'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';
import typography from '@/shared/styles/typography.module.scss';

import { Button, IconButton } from '@/shared/ui/Button';
import { ArrowLeft, Block, Cross, Delete, DotsHorizontal, Mobile, Mute, Phone, Plus, User } from '@/shared/icons';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { Text } from '@/shared/ui/Text';
import { ChatInfo } from '@/entities/messenger/model';
import { ConfirmModal, Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { Badge } from '@/shared/ui/Badge';

type Props = {
    selectedMessegesIDs: number[];
    setSelectedMessegesIDs: (value: number[]) => void;
    data?: ChatInfo;
};

export const MessengerDialogTopBar: React.FC<Props> = ({ selectedMessegesIDs, setSelectedMessegesIDs, data }) => {
    const { id, chat, isGroup, picture, membersCount } = data || {};

    const [actionMenu, setActionMenu] = React.useState(false);
    const [infoModal, setInfoModal] = React.useState(false);
    const [confirmQuit, setConfirmQuit] = React.useState(false);
    const [confirmDeleteDialog, setConfirmDeleteDialog] = React.useState(false);

    const router = useRouter();

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

                    {!!selectedMessegesIDs.length && (
                        <div className={styles.selectedMessages}>
                            <p className={styles.selectedMessagesText}>Выделено: {selectedMessegesIDs.length}</p>

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
                                <Link href={`/user/${id}`} className={typography.h4}>
                                    {chat}
                                </Link>
                            )}

                            {/* <Mute className={styles.messangerTopBarMute} /> */}
                        </div>

                        <div className={styles.messangerTopBarOnline}>
                            <Text variant="text2" textClassName={styles.lastOnline}>
                                {isGroup ? `Участников: ${membersCount}` : 'был в сети 5 минут назад'}
                            </Text>

                            {!isGroup && <Mobile />}
                        </div>
                    </div>
                )}

                <div className={base.titleWrapper}>
                    {!!selectedMessegesIDs.length && (
                        <>
                            <Button variant="light" small>
                                Ответить
                            </Button>

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
                                <MenuLink onClick={() => setInfoModal(true)}>
                                    <User />
                                    Группа
                                </MenuLink>

                                <MenuLink
                                    danger
                                    onClick={() => {
                                        setConfirmQuit(true);
                                    }}
                                >
                                    <Cross />
                                    Выйти из чата
                                </MenuLink>
                            </>
                        )}

                        {!isGroup && (
                            <>
                                <MenuLink onClick={() => router.push(`/user/${id}`)}>
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
                                setConfirmDeleteDialog(true);
                            }}
                        >
                            <Delete />
                            Удалить чат
                        </MenuLink>
                    </HoverMenu>
                </div>
            </div>

            <Modal title="Информация" value={infoModal} setValue={setInfoModal} size="small">
                <div className={styles.infoModalContent}>
                    <div className={styles.infoModalInfo}>
                        <Badge text="Чат где я один" image={picture} size="big" />

                        <p className={styles.infoModalInfoName}>Тест</p>

                        <p className={styles.infoModalInfoUserCount}>Участников: 6</p>
                    </div>

                    <div className={styles.messangerNewChatUsersSearch}>
                        <Button variant="light">
                            <Plus />
                            Добавить участника
                        </Button>

                        <div className={styles.messangerNewChatSearch}>
                            <Input placeholder="Поиск" className={styles.messangerNewChatSearchInput} />
                        </div>

                        <div className={styles.messangerUsersList}></div>

                        <Button color="danger" variant="light">
                            Выйти из чата
                        </Button>
                    </div>
                </div>
            </Modal>

            <ConfirmModal
                text="Вы действительно хотите выйти из чата?"
                value={confirmQuit}
                setValue={setConfirmQuit}
                confirmText="Выйти"
                rejectText="Остаться"
            />

            <ConfirmModal
                text="Вы действительно хотите удалить чат?"
                value={confirmDeleteDialog}
                setValue={setConfirmDeleteDialog}
                confirmText="Удалить"
            />
        </>
    );
};
