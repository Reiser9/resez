'use client';

import React from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';
import typography from '@/shared/styles/typography.module.scss';

import type { NotifySendDTO } from '../model';
import { getNotifyType } from '@/shared/utils/getNotifyType';
import { formatDate } from '@/shared/utils/formatDate';
import { Delete, DotsHorizontal, Edit, Send } from '@/shared/icons';
import { useNotify } from '@/features/notify';

import { Text } from '@/shared/ui/Text';
import { Button, IconButton } from '@/shared/ui/Button';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';

type Props = {
    data: NotifySendDTO;
};

const CustomHtmlParser = dynamic(() => import('@/shared/ui/CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

const NotifyItem: React.FC<Props> = ({ data }) => {
    const [actionMenu, setActionMenu] = React.useState(false);

    const { id, author, content, date, isEdited, title, type, updatedAt, user, isDelayed } = data || {};
    const { avatar, nickname } = user || {};

    const notifyType = getNotifyType(type);

    const queryClient = useQueryClient();
    const { sendDelayedNotificationNowById } = useNotify();

    const revalidateNotifyById = () => {
        queryClient.invalidateQueries({ queryKey: ['admin_notifies_delayed'] });
    };

    const sendNowDelayedNotifyMutation = useMutation({
        mutationFn: () => sendDelayedNotificationNowById(String(id), revalidateNotifyById),
    });

    return (
        <div className={cn(base.item2, styles.notifyItem)}>
            <div className={base.titleInnerNowrap}>
                <span className={styles.notifyItemWrapper}>
                    {type && (
                        <span
                            className={cn(styles.notifyItemIconInner, {
                                [styles.session]: notifyType?.name === 'session',
                            })}
                        >
                            {notifyType?.icon}
                        </span>
                    )}

                    <span className={styles.notifyItemTitleInner}>
                        {author && (
                            <Text variant="text2" className={styles.notifyItemFrom}>
                                <span>От:</span> {author}
                            </Text>
                        )}

                        {title && (
                            <Text variant="h4" className={styles.notifyItemTitle}>
                                {title}
                            </Text>
                        )}

                        {date && (
                            <Text variant="text2" className={styles.notifyItemDate}>
                                {formatDate(date)}
                            </Text>
                        )}
                    </span>
                </span>

                <HoverMenu
                    button={
                        <IconButton variant="light" small onClick={() => setActionMenu(true)}>
                            <DotsHorizontal />
                        </IconButton>
                    }
                    value={actionMenu}
                    setValue={setActionMenu}
                >
                    {isDelayed && (
                        <MenuLink
                            disabled={sendNowDelayedNotifyMutation.isPending}
                            onClick={() => sendNowDelayedNotifyMutation.mutate()}
                        >
                            <Send />
                            Отправить сейчас
                        </MenuLink>
                    )}

                    <MenuLink href={`/training/memory/edit/${id}`} disabled>
                        <Edit />
                        Редактировать
                    </MenuLink>

                    <MenuLink danger disabled>
                        <Delete />
                        Удалить
                    </MenuLink>
                </HoverMenu>
            </div>

            {content && (
                <div className={cn(typography.text, styles.notifyItemTextContent, base.format)}>
                    <CustomHtmlParser html={content} />
                </div>
            )}

            <div className={styles.notifyItemButtonInner}>
                <div className={styles.notifyItemButtonWrap}>
                    <Button auto variant="light" className={styles.notifyItemButtonMore} href={`/admin/notifies/${id}`}>
                        Подробнее
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotifyItem;
