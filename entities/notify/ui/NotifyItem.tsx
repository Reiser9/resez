'use client';

import React from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';
import typography from '@/shared/styles/typography.module.scss';

import type { NotifySendDTO } from '../model';
import { getNotifyType } from '@/shared/utils/getNotifyType';
import { formatDate } from '@/shared/utils/formatDate';

import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';

type Props = {
    data: NotifySendDTO;
};

const CustomHtmlParser = dynamic(() => import('@/shared/ui/CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

const NotifyItem: React.FC<Props> = ({ data }) => {
    const { id, author, content, date, isEdited, title, type, updatedAt, user } = data || {};
    const { avatar, nickname } = user || {};

    const notifyType = getNotifyType(type);

    return (
        <div className={cn(base.item2, styles.notifyItem)}>
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
                    <Button auto variant="light" className={styles.notifyItemButtonMore} href={`/admin/notifies/${id}`}>
                        Подробнее
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotifyItem;
