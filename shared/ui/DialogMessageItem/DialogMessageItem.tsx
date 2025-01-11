'use client';

import React, { HTMLAttributes } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import Image from 'next/image';
import { Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { Message } from '@/entities/messenger';
import { formatDate } from '@/shared/utils/formatDate';
import { Check, Clock, Pencil, DoubleCheck } from '@/shared/icons';
import useShortInfo from '@/features/user/data/useShortInfo';

import { Audio } from '../Audio';
import { Text } from '../Text';
import { Badge } from '../Badge';

type Props = {
    data: Message;
    // audio?: string;
    selectMessage: (value: Message) => void;
    isSelected?: boolean;
    onDoubleClick?: () => void;
    setEditMessage: (value: Message) => void;
    setIsEditedMessage: (value: boolean) => void;
} & HTMLAttributes<HTMLDivElement>;

const DialogMessageItem: React.FC<Props> = ({
    data,
    // audio,
    selectMessage,
    isSelected = false,
    onDoubleClick,
    setEditMessage,
    setIsEditedMessage,
    ...props
}) => {
    const { id, createdAt, updatedAt, isEdited, message, sender, type, files, isRead, readers } = data || {};
    const { avatar, nickname, id: userId } = sender || {};

    const { getShortInfo } = useShortInfo();

    const { data: user } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
    });

    const { id: myId } = user?.user || {};

    return (
        <div
            className={cn(styles.messangerDialogItem, {
                [styles.selected]: isSelected,
                [styles.notReaded]: false,
            })}
            onClick={type && type !== 'System' ? () => selectMessage(data) : () => {}}
            onDoubleClick={type && type !== 'System' ? onDoubleClick : () => {}}
            {...props}
        >
            {type === 'System' ? (
                <div className={styles.messangerDialogItemEvent}>
                    <Text variant="text2">{message}</Text>
                </div>
            ) : (
                <>
                    <Link prefetch={false} href={`/user/${nickname}`} onClick={(e) => e.stopPropagation()}>
                        <Badge isUserAvatar text={nickname} image={avatar} />
                    </Link>

                    <div className={base.baseWrapperGap0}>
                        <div className={base.titleInner}>
                            <Link
                                href={`/user/${nickname}`}
                                prefetch={false}
                                className={styles.messangerDialogItemName}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {nickname}
                            </Link>

                            <div className={styles.messangerDialogItemActionsWrapper}>
                                <div className={styles.messangerDialogItemActions}>
                                    {userId === myId && (
                                        <button
                                            className={styles.messangerDialogItemActionButton}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditMessage(data);
                                                setIsEditedMessage(true);
                                            }}
                                        >
                                            <Pencil />
                                        </button>
                                    )}
                                </div>

                                <p className={styles.messangerDialogItemTime}>{formatDate(createdAt, 'HH:mm')}</p>

                                {userId === myId && (
                                    <div className={styles.messangerDialogItemStatus}>
                                        {isRead ? <DoubleCheck /> : <Check />}
                                        {/* <Clock /> */}
                                    </div>
                                )}
                            </div>
                        </div>

                        {message && (
                            <Text className={styles.messangerDialogItemMessage}>
                                {message}{' '}
                                {isEdited && (
                                    <Tooltip destroyTooltipOnHide title={`Изменено ${formatDate(updatedAt)}`}>
                                        <span>(ред.)</span>
                                    </Tooltip>
                                )}
                            </Text>
                        )}

                        {!!files?.length && (
                            <div className={styles.messangerImages}>
                                {files.map((image, index) => {
                                    if (!image?.url) return;

                                    return (
                                        <div
                                            key={image.id}
                                            className={cn(styles.messangerImage, {
                                                [styles.full]:
                                                    files.length === 1 ||
                                                    (files.length % 2 === 1 && index + 1 === files.length),
                                            })}
                                        >
                                            <Image
                                                src={image.url}
                                                alt={image.name || 'Alt картинки отсутствует'}
                                                fill
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* {audio && <Audio audio={audio} />} */}

                        {/* <div className={styles.messangerReactionItems}>
                            <div className={styles.messangerReactionItem} onClick={e => e.stopPropagation()}>
                                🦍 2
                            </div>

                            <div className={cn(styles.messangerReactionItem, styles.active)} onClick={e => e.stopPropagation()}>
                                👍 1
                            </div>
                        </div> */}
                    </div>
                </>
            )}
        </div>
    );
};

export default DialogMessageItem;
