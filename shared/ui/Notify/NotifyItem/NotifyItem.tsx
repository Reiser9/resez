'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import typography from '@/shared/styles/typography.module.scss';
import styles from './index.module.scss';

import type { Notify } from '@/entities/notify';
import { formatDate } from '../../../utils/formatDate';
import { getNotifyType } from '@/shared/utils/getNotifyType';

import { Button } from '../../Button';
import { Modal } from '../../Modal';
import { Text } from '../../Text';
import { DynamicSkeleton } from '../../Skeleton';

const CustomHtmlParser = dynamic(() => import('../../CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

type Props = {
    data?: Notify;
    loading?: boolean;
    unread?: boolean;
    callback?: () => void;
};

const NotifyItem: React.FC<Props> = ({ data, loading = false, unread = false, callback = () => {} }) => {
    const queryClient = useQueryClient();

    const { title, content, type, date, isRead, author } = data || {};

    const [modal, setModal] = React.useState(false);
    const notifyType = getNotifyType(type);

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['notify'] });
        queryClient.invalidateQueries({ queryKey: ['notify_count'] });
    };

    const readNotify = () => {
        setModal(true);

        if (!isRead) {
            callback();
        }
    };

    return (
        <>
            <div
                className={cn(base.item2, styles.notifyItem, {
                    [styles.readed]: isRead,
                })}
            >
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

                {content && (
                    <div className={cn(typography.text, styles.notifyItemTextContent, base.format)}>
                        <CustomHtmlParser html={content} />
                    </div>
                )}

                <div className={styles.notifyItemButtonInner}>
                    <div className={styles.notifyItemButtonWrap}>
                        <Button
                            auto
                            variant="light"
                            onClick={readNotify}
                            className={styles.notifyItemButtonMore}
                            disabled={loading}
                        >
                            Подробнее
                        </Button>
                    </div>
                </div>
            </div>

            <Modal
                value={modal}
                setValue={setModal}
                onClose={unread ? () => setTimeout(revalidateRequest, 200) : () => {}}
                title={title}
                subtitle={formatDate(date)}
            >
                <div className={base.format}>
                    <CustomHtmlParser html={content} />

                    {notifyType?.name === 'session' && (
                        <Text className={styles.notifySessionLink}>
                            <Link href="/profile/safety/sessions" className={styles.notifyItemLink}>
                                Нажмите
                            </Link>
                            , чтобы посмотреть всю историю активности
                        </Text>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default NotifyItem;
