'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { Tooltip } from 'antd';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { TaskSnippetDTO } from '../model';
import { Delete, DotsHorizontal, Edit } from '@/shared/icons';
import { getFormattedDate } from '@/shared/utils/getFormattedDate';

import { Text } from '@/shared/ui/Text';
import { Badge } from '@/shared/ui/Badge';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { IconButton } from '@/shared/ui/Button';
import { TextPoint } from '@/shared/ui/TextPoint';
import { ConfirmModal } from '@/shared/ui/Modal';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';

type Props = {
    data: TaskSnippetDTO;
    edit?: boolean;
    remove?: boolean;
    removeCallback?: () => void;
};

const CustomHtmlParser = dynamic(() => import('@/shared/ui/CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

const TaskSnippetItem: React.FC<Props> = ({ data, edit = false, remove = false, removeCallback = () => {} }) => {
    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    const { title, subject, content, user, createdAt, updatedAt, id } = data || {};
    const { nickname, avatar } = user || {};

    return (
        <>
            <div className={styles.taskSnippetItem}>
                <div className={base.baseWrapperGap12}>
                    <div className={cn(base.titleInnerNowrap, base.aifs)}>
                        <Text variant="h4">{title}</Text>

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
                                {edit && (
                                    <MenuLink href={`/admin/task-snippets/edit/${id}`}>
                                        <Edit />
                                        Редактировать
                                    </MenuLink>
                                )}

                                {remove && (
                                    <MenuLink
                                        danger
                                        onClick={() => {
                                            setActionMenu(false);
                                            setConfirmDelete(true);
                                        }}
                                    >
                                        <Delete />
                                        Удалить
                                    </MenuLink>
                                )}
                            </HoverMenu>
                        )}
                    </div>

                    <TextPoint title="Предмет:" text={subject} />

                    <div className={base.titleInner}>
                        <Link prefetch={false} href={`/user/${nickname}`} className={base.titleWrapper}>
                            <Badge isUserAvatar text={nickname} image={avatar} />

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
                        </div>
                    </div>
                </div>

                {content && (
                    <div className={cn(base.format, styles.taskItemContent)}>
                        <CustomHtmlParser html={content} />
                    </div>
                )}
            </div>

            {remove && (
                <ConfirmModal
                    text="Вы действительно хотите удалить вставку задания?"
                    value={confirmDelete}
                    setValue={setConfirmDelete}
                    callback={removeCallback}
                />
            )}
        </>
    );
};

export default TaskSnippetItem;
