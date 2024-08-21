'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useTask } from '@/features/task';
import TaskTestItem from '@/entities/task/ui/TaskTestItem';

import { Preloader } from '@/shared/ui/Preloader';
import { TextPoint } from '@/shared/ui/TextPoint';
import { Text } from '@/shared/ui/Text';
import { InfoSidebar } from '@/shared/ui/InfoSidebar';
import { useUserPermissions } from '@/features/user';
import { useAppSelector } from '@/shared/hooks/useRedux';

const TaskPage = () => {
    const { id } = useParams();

    const [infoMenu, setInfoMenu] = React.useState(false);

    const isAuth = useAppSelector((state) => state.user.isAuth);
    const { getTaskById } = useTask();
    const { getUserPermissions } = useUserPermissions();

    const {
        data: permissions,
        isLoading: permissionsIsLoading,
        isError: permissionsError,
    } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
        enabled: isAuth,
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ['task_by_id', id],
        queryFn: () => getTaskById(String(id)),
        enabled: !!id,
    });

    const { subject, subjectTask, subTheme } = data || {};

    if (isLoading) {
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
                    <Text variant="h4">{subject?.subject || 0}</Text>
                </TextPoint>

                <TextPoint title="Номер задания:">
                    <Text variant="h4">{subjectTask?.number || 0}</Text>
                </TextPoint>

                <TextPoint title="Тема:">
                    <Text variant="h4">{subjectTask?.theme || 0}</Text>
                </TextPoint>

                <TextPoint title="Подтема:">
                    <Text variant="h4">{subTheme?.subTheme || 0}</Text>
                </TextPoint>
            </InfoSidebar>
        </div>
    );
};

export default TaskPage;
