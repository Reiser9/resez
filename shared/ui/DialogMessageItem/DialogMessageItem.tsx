'use client';

import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Audio } from '../Audio';
import { Text } from '../Text';
import { Message } from '@/entities/messenger';
import { formatDate } from '@/shared/utils/formatDate';
import { Badge } from '../Badge';
import Link from 'next/link';
import { Tooltip } from 'antd';

type Props = {
    data: Message;
    audio?: string;
    selectMessage: (value: number) => void;
    isSelected?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const DialogMessageItem: React.FC<Props> = ({ data, audio, selectMessage, isSelected = false, ...props }) => {
    const { id, createdAt, updatedAt, isEdited, message, sender, type } = data || {};
    const { avatar, nickname, id: userId } = sender || {};

    return (
        <div
            className={cn(styles.messangerDialogItem, {
                [styles.selected]: isSelected,
            })}
            onClick={() => selectMessage(id)}
            {...props}
        >
            {type === "Системное"
            ? <div className={styles.messangerDialogItemEvent}>
                <Text variant='text2'>{message}</Text>
            </div>
            : <>
                <Link href={`/user/${userId}`} onClick={e => e.stopPropagation()}>
                    <Badge text={nickname} image={avatar} />
                </Link>

                <div className={base.baseWrapperGap0}>
                    <div className={base.titleInner}>
                        <Link href={`/user/${userId}`} className={styles.messangerDialogItemName} onClick={e => e.stopPropagation()}>{nickname}</Link>

                        <p className={styles.messangerDialogItemTime}>{formatDate(createdAt, 'HH:mm')}</p>
                    </div>

                    {message && <Text className={styles.messangerDialogItemMessage}>{message} {isEdited && <Tooltip title={`Изменено ${formatDate(updatedAt)}`}><span>(ред.)</span></Tooltip>}</Text>}

                    {audio && <Audio audio={audio} />}
                </div>
            </>}
        </div>
    );
};

export default DialogMessageItem;
