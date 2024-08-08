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
    edit?: boolean;
    remove?: boolean;
    verify?: boolean;
    href?: string;
    archiveCallback?: () => void;
    restoreCallback?: () => void;
    toggleVerify?: () => void;
    matchPercent?: number;
};

const TaskItem: React.FC<Props> = ({
    data,
    edit = false,
    remove = false,
    verify = false,
    href,
    archiveCallback,
    restoreCallback,
    toggleVerify,
    matchPercent,
}) => {
    const { id, subject, number, theme, subTheme, isVerified, createdAt, task, user, isArchived, source } = data || {};
    const { avatar, nickname, id: userId } = user;

    const router = useRouter();

    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    return (
        <>
            <div className={styles.taskItem}>
                <div className={base.baseWrapperGap12}>
                    <div className={cn(base.titleInnerNowrap, base.aifs)}>
                        <Link href={href ? href : `/task/${id}`} className={styles.taskItemWrapper}>
                            <span className={base.titleWrapper}>
                                <span className={base.circle32}>{number ?? '?'}</span>

                                {subject && <Text variant="h4">{subject}</Text>}
                            </span>

                            {theme && <p className={styles.taskTheme}>{theme}</p>}

                            {subTheme && <p className={styles.taskTheme}>{subTheme}</p>}
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

                                {verify && (
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
                                )}

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

                {source && <Text fontWeight={600}>Источник: {source}</Text>}

                {matchPercent && (
                    <div className={styles.taskItemMatch}>
                        <Text variant="text2" fontWeight={600}>
                            {matchPercent}%
                        </Text>

                        <div className={styles.taskItemMatchProgress}>
                            <div
                                className={cn(styles.taskItemMatchProgressLine, {
                                    [styles.green]: matchPercent <= 30,
                                    [styles.orange]: matchPercent < 90 && matchPercent > 30,
                                    [styles.red]: matchPercent >= 90,
                                })}
                                style={{ width: `${matchPercent}%` }}
                            ></div>
                        </div>
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
