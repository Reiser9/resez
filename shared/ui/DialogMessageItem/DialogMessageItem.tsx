'use client';

import React, { HTMLAttributes } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { Message } from '@/entities/messenger';
import { formatDate } from '@/shared/utils/formatDate';
import { Pencil } from '@/shared/icons';
import { useAppSelector } from '@/shared/hooks/useRedux';
import useShortInfo from '@/features/user/data/useShortInfo';

import { Audio } from '../Audio';
import { Text } from '../Text';
import { Badge } from '../Badge';

type Props = {
    data: Message;
    audio?: string;
    selectMessage: (value: Message) => void;
    isSelected?: boolean;
    onDoubleClick?: () => void;
    setEditMessage: (value: Message) => void;
    setIsEditedMessage: (value: boolean) => void;
} & HTMLAttributes<HTMLDivElement>;

const DialogMessageItem: React.FC<Props> = ({
    data,
    audio,
    selectMessage,
    isSelected = false,
    onDoubleClick,
    setEditMessage,
    setIsEditedMessage,
    ...props
}) => {
    const { id, createdAt, updatedAt, isEdited, message, sender, type } = data || {};
    const { avatar, nickname, id: userId } = sender || {};

    const { getShortInfo } = useShortInfo();

    const { data: user, isLoading: userIsLoading } = useQuery({
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
            onClick={type !== 'Системное' ? () => selectMessage(data) : () => {}}
            onDoubleClick={type !== 'Системное' ? onDoubleClick : () => {}}
            {...props}
        >
            {type === 'Системное' ? (
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
                            </div>
                        </div>

                        {message && (
                            <Text className={styles.messangerDialogItemMessage}>
                                {message}{' '}
                                {isEdited && (
                                    <Tooltip title={`Изменено ${formatDate(updatedAt)}`}>
                                        <span>(ред.)</span>
                                    </Tooltip>
                                )}
                            </Text>
                        )}

                        {audio && <Audio audio={audio} />}
                    </div>
                </>
            )}
        </div>
    );
};

export default DialogMessageItem;
