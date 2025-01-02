'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';
import typography from '@/shared/styles/typography.module.scss';

import { Cross, DotsHorizontal, Edit, Send } from '@/shared/icons';
import { useNotify } from '@/features/notify';

import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { BackButton, IconButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';
import { TextPoint } from '@/shared/ui/TextPoint';
import { formatDate } from '@/shared/utils/formatDate';
import Link from 'next/link';
import { Badge } from '@/shared/ui/Badge';
import { getNotifyType } from '@/shared/utils/getNotifyType';

const CustomHtmlParser = dynamic(() => import('@/shared/ui/CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

const NotifyAdminById = () => {
    const { id } = useParams();

    const [actionMenu, setActionMenu] = React.useState(false);

    const queryClient = useQueryClient();
    const { getNotificationById, sendDelayedNotificationNowById } = useNotify();

    const revalidateNotifyById = () => {
        queryClient.invalidateQueries({ queryKey: ['notification_admin_by_id', id] });
    };

    const {
        data,
        isLoading: notificationIsLoading,
        isError,
    } = useQuery({
        queryKey: ['notification_admin_by_id', id],

        queryFn: () => getNotificationById(String(id)),
        enabled: !!id,
    });

    const sendNowDelayedNotifyMutation = useMutation({
        mutationFn: () => sendDelayedNotificationNowById(String(id), revalidateNotifyById),
    });

    const { author, content, date, isEdited, title, type, updatedAt, user, isDelayed } = data || {};
    const { id: userId, avatar, nickname } = user || {};

    if (notificationIsLoading) {
        return <Preloader page small />;
    }

    if (isError) {
        return <NotContent icon={<Cross />} text="Произошла ошибка при загрузке данных" danger />;
    }

    return (
        <>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <BackButton />

                    <Text variant="h4">{title}</Text>
                </div>

                <HoverMenu
                    value={actionMenu}
                    setValue={setActionMenu}
                    button={
                        <IconButton variant="light" small onClick={() => setActionMenu((prev) => !prev)}>
                            <DotsHorizontal />
                        </IconButton>
                    }
                >
                    <MenuLink href={`/admin/notifies/edit/${id}`} disabled>
                        <Edit />
                        Редактировать
                    </MenuLink>

                    {isDelayed && (
                        <MenuLink
                            disabled={sendNowDelayedNotifyMutation.isPending}
                            onClick={() => sendNowDelayedNotifyMutation.mutate()}
                        >
                            <Send />
                            Отправить сейчас
                        </MenuLink>
                    )}
                </HoverMenu>
            </div>

            <div className={base.contentItems}>
                {author && (
                    <div className={base.item4}>
                        <TextPoint title="Автор" text={author} />
                    </div>
                )}

                {date && (
                    <div className={base.item4}>
                        <TextPoint title="Дата отправки" text={formatDate(date)} />
                    </div>
                )}

                {updatedAt && (
                    <div className={base.item4}>
                        <TextPoint title="Обновлено" text={formatDate(updatedAt)} />
                    </div>
                )}

                <div className={base.item4}>
                    <TextPoint title="Редактировалось" text={isEdited ? 'Да' : 'Нет'} />
                </div>

                <div className={base.item4}>
                    <TextPoint title="Отложенное" text={isDelayed ? 'Да' : 'Нет'} />
                </div>

                <div className={base.item4}>
                    <TextPoint title="Пользователь">
                        <Link prefetch={false} href={`/admin/users/${userId}`} className={base.titleWrapper}>
                            <Badge image={avatar} text={nickname} isUserAvatar />

                            <Text>{nickname}</Text>
                        </Link>
                    </TextPoint>
                </div>

                {type && (
                    <div className={base.item4}>
                        <TextPoint title="Тип">
                            <div className={styles.notifyIcon}>{getNotifyType(type).icon}</div>
                        </TextPoint>
                    </div>
                )}
            </div>

            {content && (
                <div className={base.baseWrapperGap4}>
                    <Text variant="text2" color="grey">
                        Контент уведомления
                    </Text>

                    <div className={cn(typography.text, styles.notifyItemTextContent, base.format)}>
                        <CustomHtmlParser html={content} />
                    </div>
                </div>
            )}
        </>
    );
};

export default NotifyAdminById;
