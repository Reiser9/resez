'use client';

import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ConfirmModal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { IconButton } from '@/shared/ui/Button';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { Archive, Check, DotsHorizontal, Edit, Notebook, Restore, Verified } from '@/shared/icons';
import { Tooltip } from 'antd';
import { formatDate } from '@/shared/utils/formatDate';
import { SubjectTask } from '../model';
import { Badge } from '@/shared/ui/Badge';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';

const CustomHtmlParser = dynamic(() => import('@/shared/ui/CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

type Props = {
    data: SubjectTask;
    edit: boolean;
    remove: boolean;
    archiveCallback?: () => void;
    restoreCallback?: () => void;
    toggleVerify?: () => void;
};

const TaskItem: React.FC<Props> = ({
    data,
    edit = false,
    remove = false,
    archiveCallback,
    restoreCallback,
    toggleVerify,
}) => {
    const { id, subject, number, theme, subTheme, isVerified, createdAt, task, user, isArchived } = data || {};
    const { avatar, nickname, id: userId } = user;

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

                                <MenuLink
                                    onClick={() => {
                                        toggleVerify && toggleVerify();
                                        setActionMenu(false);
                                    }}
                                >
                                    {isVerified ? (
                                        <>
                                            <Notebook />В черновик
                                        </>
                                    ) : (
                                        <>
                                            <Check />
                                            Верифицировать
                                        </>
                                    )}
                                </MenuLink>

                                {edit && (
                                    <MenuLink onClick={() => router.push(`/admin/tasks/edit/${id}`)}>
                                        <Edit />
                                        Редактировать
                                    </MenuLink>
                                )}

                                {remove && !isArchived && (
                                    <MenuLink
                                        danger
                                        onClick={() => {
                                            setActionMenu(false);
                                            setConfirmDelete(true);
                                        }}
                                    >
                                        <Archive />В архив
                                    </MenuLink>
                                )}
                            </HoverMenu>
                        )}
                    </div>

                    <div className={base.titleInner}>
                        <div className={base.titleWrapper}>
                            <Badge text={nickname} image={avatar} />

                            <Text>{nickname}</Text>
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
                    <div className={cn(base.format, styles.taskItemContent)}>
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
