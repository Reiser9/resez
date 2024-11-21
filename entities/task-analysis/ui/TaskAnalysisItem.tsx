'use client';

import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Tooltip } from 'antd';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { TaskAnalysis } from '../model';
import { Check, Delete, DotsHorizontal, Edit, Notebook, Restore, Verified } from '@/shared/icons';
import { getFormattedDate } from '@/shared/utils/getFormattedDate';

import { ConfirmModal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { IconButton } from '@/shared/ui/Button';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { Badge } from '@/shared/ui/Badge';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';

const CustomHtmlParser = dynamic(() => import('@/shared/ui/CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

type Props = {
    data: TaskAnalysis;
    edit?: boolean;
    remove?: boolean;
    verify?: boolean;
    toggleVerify?: () => void;
};

const TaskAnalysisItem: React.FC<Props> = ({
    data,
    edit = false,
    remove = false,
    verify = false,
    toggleVerify = () => {},
}) => {
    const { id, content, createdAt, updatedAt, isPublished, user, subject, subjectTask } = data || {};
    const { number, theme } = subjectTask || {};
    const { subject: subjectName, slug } = subject || {};
    const { avatar, nickname } = user || {};

    const [actionMenu, setActionMenu] = React.useState(false);
    // const [confirmDelete, setConfirmDelete] = React.useState(false);

    return (
        <>
            <div className={styles.taskItem}>
                <div className={base.baseWrapperGap12}>
                    <div className={cn(base.titleInnerNowrap, base.aifs)}>
                        <Link
                            prefetch={false}
                            href={`/useful/tasks/${slug}/${number}`}
                            className={styles.taskItemWrapper}
                        >
                            <span className={base.titleWrapper}>
                                <span className={base.circle32}>{number ?? '?'}</span>

                                {subject && <Text variant="h4">{subjectName}</Text>}
                            </span>

                            {theme && <p className={styles.taskTheme}>{theme}</p>}
                        </Link>

                        {edit && (
                            <HoverMenu
                                button={
                                    <IconButton variant="light" small onClick={() => setActionMenu((prev) => !prev)}>
                                        <DotsHorizontal />
                                    </IconButton>
                                }
                                value={actionMenu}
                                setValue={setActionMenu}
                            >
                                {verify && (
                                    <MenuLink
                                        onClick={() => {
                                            toggleVerify && toggleVerify();
                                            setActionMenu(false);
                                        }}
                                    >
                                        {isPublished ? (
                                            <>
                                                <Notebook />В черновик
                                            </>
                                        ) : (
                                            <>
                                                <Check />
                                                Опубликовать
                                            </>
                                        )}
                                    </MenuLink>
                                )}

                                {edit && (
                                    <MenuLink href={`/admin/task-analysis/edit/${id}`}>
                                        <Edit />
                                        Редактировать
                                    </MenuLink>
                                )}

                                {remove && (
                                    <MenuLink danger>
                                        <Delete />
                                        Удалить
                                    </MenuLink>
                                )}
                            </HoverMenu>
                        )}
                    </div>

                    <div className={base.titleInner}>
                        <Link prefetch={false} href={`/user/${nickname}`} className={base.titleWrapper}>
                            <Badge text={nickname} image={avatar} />

                            <Text>{nickname}</Text>
                        </Link>

                        <div className={base.titleWrapper}>
                            <Tooltip destroyTooltipOnHide title="Дата создания">
                                <Text variant="text2" className={styles.taskItemDate}>
                                    {getFormattedDate(createdAt)}
                                </Text>
                            </Tooltip>

                            {updatedAt && (
                                <Tooltip
                                    destroyTooltipOnHide
                                    title={`Последнее изменение: ${getFormattedDate(updatedAt)}`}
                                >
                                    <Edit className={styles.taskVerified} />
                                </Tooltip>
                            )}

                            {!isPublished && (
                                <Tooltip destroyTooltipOnHide title="Черновик">
                                    <Notebook className={styles.taskVerified} />
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </div>

                {content && (
                    <div className={cn(base.format, styles.taskItemContent)}>
                        <CustomHtmlParser html={content} />
                    </div>
                )}
            </div>

            {/* {remove && (
                <ConfirmModal
                    text="Вы действительно хотите архивировать задание? Задание больше не будет доступно пользователям"
                    value={confirmDelete}
                    setValue={setConfirmDelete}
                    callback={archiveCallback}
                />
            )} */}
        </>
    );
};

export default TaskAnalysisItem;
