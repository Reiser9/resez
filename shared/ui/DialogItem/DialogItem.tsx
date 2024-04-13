"use client";

import React, { HTMLAttributes } from 'react';
import { Tooltip } from 'antd';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Archive, Delete, DotsHorizontal, Enter, Mute, Pin } from '@/shared/icons';
import { IconButton } from '../Button';
import { ChatItem } from '@/entities/messenger';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { getFormattedDate } from '@/shared/utils/getFormattedDate';
import { Badge } from '../Badge';

type Props = {
    data: ChatItem;
    mute?: boolean;
    active?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const DialogItem: React.FC<Props> = ({ data, active = false, mute = false, ...props }) => {    
    const { id, isGroup, lastMessage, picture, chat } = data || {};
    const { createdAt, updatedAt, isEdited, message, sender, type } = lastMessage || {};
    const { nickname, avatar, id: senderId } = sender || {};

    const userId = useAppSelector(state => state.user.user?.id)

    return (
        <div className={cn(styles.dialogItem, {
            [styles.active]: active
        })} {...props}>
            <Badge image={picture} text={chat} style={{width: 48, height: 48}} />

            <div className={styles.dialogItemTextInner}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <p className={styles.dialogItemName}>{chat}</p>

                        {mute && <Mute className={styles.dialogItemMute} />}
                    </div>

                    {createdAt && <p className={styles.dialogItemDate}>{getFormattedDate(createdAt, 'short')}</p>}
                </div>

                <div className={base.titleInnerNowrap}>
                    <div className={styles.dialogItemMessageInner}>
                        {senderId && userId === senderId && <Badge size='small' image={avatar} text={nickname} />}

                        {message && <p className={styles.dialogItemMessage}>{message}</p>}
                    </div>

                    <div className={styles.dialogItemMoreInner} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.dialogItemMore}>
                            <DotsHorizontal />
                        </button>

                        <div className={styles.dialogItemActions}>
                            <Tooltip title="Закрепить">
                                <IconButton small variant="light">
                                    <Pin />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="В архив">
                                <IconButton small variant="light">
                                    <Archive />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Очистить историю сообщений">
                                <IconButton small variant="danger">
                                    <Delete />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Выйти из беседы">
                                <IconButton small variant="danger">
                                    <Enter />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DialogItem;
