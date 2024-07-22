'use client';

import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ConfirmModal } from '@/shared/ui/Modal';
import { LoaderForItem, Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';
import { IconButton } from '@/shared/ui/Button';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { Archive, Check, Delete, DotsHorizontal, Edit, Restore, Verified } from '@/shared/icons';
import { Tooltip } from 'antd';
import { formatDate } from '@/shared/utils/formatDate';
import { SubjectTask } from '../model';
import dynamic from 'next/dynamic';

const CustomHtmlParser = dynamic(() => import('@/shared/ui/CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <Preloader small page />,
});

type Props = {
    data: SubjectTask;
    edit: boolean;
    remove: boolean;
    archiveCallback?: () => void;
    restoreCallback?: () => void;
};

const TaskItem: React.FC<Props> = ({ data, edit = false, remove = false, archiveCallback, restoreCallback }) => {
    const { id, subject, number, theme, subTheme, isVerified, createdAt, task, userId, isArchived } = data || {};

    const router = useRouter();

    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    return (
        <>
            <div className={styles.taskItem}>
                <div className={base.baseWrapperGap12}>
                    <div className={`${base.titleInnerNowrap} ${base.aifs}`}>
                        <Link href={`/tasks/${id}`} className={styles.taskItemWrapper}>
                            <span className={base.titleWrapper}>
                                <span className={base.circle32}>{number}</span>

                                <Text variant="h4">{subject}</Text>
                            </span>

                            <p className={styles.taskTheme}>{theme}</p>

                            <p className={styles.taskTheme}>{subTheme}</p>
                        </Link>

                        {(edit || remove) && (
                            <HoverMenu
                                button={
                                    <IconButton variant="light" small onClick={() => setActionMenu((prev) => !prev)}>
                                        <DotsHorizontal />
                                    </IconButton>
                                }
                                value={actionMenu}
                                setValue={setActionMenu}
                            >
                                {isArchived && (
                                    <MenuLink onClick={restoreCallback}>
                                        <Restore />
                                        Восстановить
                                    </MenuLink>
                                )}

                                {edit && (
                                    <MenuLink onClick={() => router.push(`/admin/tasks/edit/${id}`)}>
                                        <Edit />
                                        Редактировать
                                    </MenuLink>
                                )}

                                {remove && !isArchived && (
                                    <MenuLink danger onClick={() => setConfirmDelete(true)}>
                                        <Archive />В архив
                                    </MenuLink>
                                )}
                            </HoverMenu>
                        )}
                    </div>

                    <div className={base.titleInner}>
                        <div className={base.titleWrapper}>
                            {/* <div className={base.circle40}>
                                {avatar && (!isShowAvatars || userId === authorId) ? (
                                    <img src={avatar} alt="avatar" className={base.circleAvatar} />
                                ) : (
                                    nickname && nickname[0]
                                )}
                            </div>

                            <p className={typography.text}>{nickname}</p> */}
                            {userId}
                        </div>

                        <div className={base.titleWrapper}>
                            <Text variant="text2" className={styles.taskItemDate}>
                                {formatDate(createdAt)}
                            </Text>

                            {isVerified && (
                                <Tooltip title="Проверено">
                                    <Verified className={styles.taskVerified} />
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </div>

                {task && (
                    <div className={base.format}>
                        <CustomHtmlParser html={task} />
                    </div>
                )}

                {/* {loading && <LoaderForItem />} */}
            </div>

            <ConfirmModal
                text="Вы действительно хотите удалить задание?"
                value={confirmDelete}
                setValue={setConfirmDelete}
                callback={archiveCallback}
            />
        </>
    );
};

export default TaskItem;
