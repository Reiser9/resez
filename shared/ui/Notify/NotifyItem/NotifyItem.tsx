"use client";

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';
import typography from '@/shared/styles/typography.module.scss';
import styles from './index.module.scss';

import { formatDate } from '../../../utils/formatDate';

import { CustomHtmlParser } from '../../CustomHtmlParser';
import { Button } from '../../Button';
import { Modal } from '../../Modal';
import { Text } from '../../Text';
import { getNotifyType } from '@/shared/utils/getNotifyType';
import { Notify } from '@/entities/notify';

type Props = {
    data?: Notify;
    loading?: boolean;
    callback?: () => void;
};

const NotifyItem: React.FC<Props> = ({ data, loading = false, callback = () => {} }) => {
    const { title, content, type, date, isRead, sender } = data || {};

    const [modal, setModal] = React.useState<boolean>(false);
    const notifyType = getNotifyType(type);

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
                        {sender && (
                            <Text variant="text2" className={styles.notifyItemFrom}>
                                <span>От:</span> {sender}
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
                        {/* <CustomHtmlParser html={content} /> */}
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

            <Modal value={modal} setValue={setModal} title={title} subtitle={formatDate(date)}>
                <div className={base.format}>
                    {/* <CustomHtmlParser html={content} /> */}

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
