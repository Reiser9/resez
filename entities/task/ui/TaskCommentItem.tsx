'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import styles from './index.module.scss';

import type { TaskCommentWithReplies } from '../model';
import { getFormattedDate } from '@/shared/utils/getFormattedDate';

import { Badge } from '@/shared/ui/Badge';
import { Text } from '@/shared/ui/Text';

type Props = {
    data: TaskCommentWithReplies;
    replyComment: (value: number, nickname: string) => void;
    myId?: number;
    edit?: boolean;
    editCommentCallback?: (text: string, id: number) => void;
    remove?: boolean;
    removeCallback?: (id: number) => void;
};

const TaskCommentItem: React.FC<Props> = ({
    data,
    replyComment,
    myId,
    edit = false,
    editCommentCallback = () => {},
    remove = false,
    removeCallback = () => {},
}) => {
    const { id, content, replies, repliesCount, updatedAt, createdAt, user } = data || {};
    const { avatar, nickname, id: userId } = user || {};

    return (
        <div className={styles.taskCommentItem}>
            <Link prefetch={false} href={`/user/${nickname}`} className={styles.taskCommentItemAvatar}>
                <Badge text={nickname} image={avatar} isUserAvatar />
            </Link>

            <div className={styles.taskCommentItemContent}>
                <Link prefetch={false} href={`/user/${nickname}`} className={styles.taskCommentNickname}>
                    {nickname}
                </Link>

                <Text>{content}</Text>

                <div className={styles.taskCommentItemBottom}>
                    <Text variant="text2" fontWeight={600}>
                        {getFormattedDate(createdAt)}
                    </Text>

                    <button className={styles.taskCommentItemReply} onClick={() => replyComment(id, nickname)}>
                        Ответить
                    </button>

                    {edit && (
                        <button
                            className={styles.taskCommentItemReply}
                            onClick={() => editCommentCallback(content, id)}
                        >
                            Редактировать
                        </button>
                    )}

                    {remove && (
                        <button
                            className={cn(styles.taskCommentItemReply, styles.error)}
                            onClick={() => removeCallback(id)}
                        >
                            Удалить
                        </button>
                    )}
                </div>

                {replies?.map((data) => {
                    const { content, createdAt, updatedAt, id, user } = data || {};
                    const { avatar, nickname, id: userId } = user || {};

                    return (
                        <div key={data.id} className={styles.taskReplyCommentItem}>
                            <Link prefetch={false} href={`/user/${nickname}`} className={styles.taskCommentItemAvatar}>
                                <Badge text={nickname} image={avatar} isUserAvatar />
                            </Link>

                            <div className={styles.taskCommentItemContent}>
                                <Link prefetch={false} href={`/user/${nickname}`}>
                                    {nickname}
                                </Link>

                                <Text>{content}</Text>

                                <div className={styles.taskCommentItemBottom}>
                                    <Text variant="text2" fontWeight={600}>
                                        {getFormattedDate(createdAt)}
                                    </Text>

                                    <button
                                        className={styles.taskCommentItemReply}
                                        onClick={() => replyComment(id, nickname)}
                                    >
                                        Ответить
                                    </button>

                                    {myId == userId && (
                                        <button
                                            className={styles.taskCommentItemReply}
                                            onClick={() => editCommentCallback(content, id)}
                                        >
                                            Редактировать
                                        </button>
                                    )}

                                    {myId == userId && (
                                        <button
                                            className={cn(styles.taskCommentItemReply, styles.error)}
                                            onClick={() => removeCallback(id)}
                                        >
                                            Удалить
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TaskCommentItem;
