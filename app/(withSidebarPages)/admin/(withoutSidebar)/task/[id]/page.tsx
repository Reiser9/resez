'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { useTask } from '@/features/task';
import { Preloader } from '@/shared/ui/Preloader';
import { TextPoint } from '@/shared/ui/TextPoint';
import { Text } from '@/shared/ui/Text';
import { InfoSidebar } from '@/shared/ui/InfoSidebar';
import TaskTestItem from '@/entities/task/ui/TaskTestItem';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useUserPermissions } from '@/features/user';

const TaskPage = () => {
    const { id } = useParams();

    const [infoMenu, setInfoMenu] = React.useState(false);

    const { getTaskById } = useTask();
    const { getUserPermissions } = useUserPermissions();

    const { data, isLoading, error } = useQuery({
        queryKey: ['task_by_id', id],
        queryFn: () => getTaskById(String(id), true),
        enabled: !!id,
    });

    const {
        data: permissions,
        isLoading: permissionsIsLoading,
        error: permissionsError,
    } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const { subject, subjectTask, subTheme } = data || {};

    if (isLoading || permissionsIsLoading) {
        return <Preloader page />;
    }

    return (
        <div className={styles.taskInner}>
            <div className={base.taskContent}>
                {!!data && (
                    <TaskTestItem
                        data={data}
                        edit={checkPermission(permissions || [], [PERMISSIONS.UPDATE_TASKS])}
                        remove={checkPermission(permissions || [], [PERMISSIONS.DELETE_TASKS])}
                        verify={checkPermission(permissions || [], [PERMISSIONS.VERIFY_TASKS])}
                    />
                )}
            </div>

            <InfoSidebar value={infoMenu} setValue={setInfoMenu}>
                <TextPoint title="Предмет:">
                    <Text variant="h4">{subject?.subject || '-'}</Text>
                </TextPoint>

                {subjectTask?.number && (
                    <TextPoint title="Номер задания:">
                        <Text variant="h4">{subjectTask.number}</Text>
                    </TextPoint>
                )}

                {subjectTask?.theme && (
                    <TextPoint title="Тема:">
                        <Text variant="h4">{subjectTask.theme}</Text>
                    </TextPoint>
                )}

                {subTheme?.subTheme && (
                    <TextPoint title="Подтема:">
                        <Text variant="h4">{subTheme.subTheme}</Text>
                    </TextPoint>
                )}
            </InfoSidebar>
        </div>
    );
};

export default TaskPage;
