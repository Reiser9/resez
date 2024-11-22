'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { CreatedSubject } from '@/entities/subject';
import type { SubjectTaskById } from '@/entities/task';
import { useLogs } from '@/features/log';
import { Cross } from '@/shared/icons';
import { formatDate } from '@/shared/utils/formatDate';
import { SubjectView } from '@/entities/subject/ui';
import { LOG_TYPES } from '@/shared/consts/LOG_TYPES';
import { TaskView } from '@/entities/task/ui';

import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { BackButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Badge } from '@/shared/ui/Badge';
import { Spoiler } from '@/shared/ui/Spoiler';

const AdminLogById = () => {
    const { id } = useParams();

    const { getLogById } = useLogs();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['log_by_id', id],
        queryFn: () => getLogById(String(id)),
        enabled: !!id,
    });

    const { user, type, createdAt, currentEntity, oldEntity } = data || {};
    const { nickname, avatar, id: userId } = user || {};

    if (isLoading) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent danger icon={<Cross />} text="Произошла ошибка при загрузке данных" />;
    }

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleWrapper}>
                <BackButton />

                <Text variant="h3">Логирование</Text>
            </div>

            <div className={base.baseWrapperGap4}>
                <Text variant="text2" color="grey">
                    Пользователь:
                </Text>

                <Link prefetch={false} href={`/admin/users/${userId}`} className={base.titleWrapper}>
                    <Badge image={avatar} text={nickname} isUserAvatar />

                    <Text>{nickname}</Text>
                </Link>
            </div>

            <div className={base.baseWrapperGap4}>
                <Text variant="text2" color="grey">
                    Дата логирования:
                </Text>

                <Text>{formatDate(createdAt)}</Text>
            </div>

            <div className={base.baseWrapperGap4}>
                <Text variant="text2" color="grey">
                    Тип:
                </Text>

                <Text>{type}</Text>
            </div>

            <div className={styles.logContent}>
                {oldEntity && (
                    <Spoiler title="До">
                        <div className={styles.logItem}>
                            {(type === LOG_TYPES.CREATE_SUBJECT ||
                                type === LOG_TYPES.EDIT_SUBJECT ||
                                type === LOG_TYPES.ARCHIVE_SUBJECT) && (
                                <SubjectView subject={oldEntity as CreatedSubject} />
                            )}

                            {(type === LOG_TYPES.CREATE_TASK ||
                                type === LOG_TYPES.EDIT_TASK ||
                                type === LOG_TYPES.ARCHIVE_TASK) && <TaskView task={oldEntity as SubjectTaskById} />}
                        </div>
                    </Spoiler>
                )}

                <Spoiler title={oldEntity ? 'После' : 'Созданный объект'}>
                    <div className={styles.logItem}>
                        {(type === LOG_TYPES.CREATE_SUBJECT ||
                            type === LOG_TYPES.EDIT_SUBJECT ||
                            type === LOG_TYPES.ARCHIVE_SUBJECT) && (
                            <SubjectView subject={currentEntity as CreatedSubject} />
                        )}

                        {(type === LOG_TYPES.CREATE_TASK ||
                            type === LOG_TYPES.EDIT_TASK ||
                            type === LOG_TYPES.ARCHIVE_TASK) && <TaskView task={currentEntity as SubjectTaskById} />}
                    </div>
                </Spoiler>
            </div>
        </div>
    );
};

export default AdminLogById;
