'use client';

import React from 'react';
import cn from 'classnames';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';

import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { Cross, Filter, Plus } from '@/shared/icons';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { useTask } from '@/features/task';
import TaskItem from '@/entities/task/ui/TaskItem';
import { useUserPermissions } from '@/features/user';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';

import { Text } from '@/shared/ui/Text';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { TaskItemSkeleton } from '@/shared/ui/Skeleton';
import TasksFilter from './TasksFilter';

const AdminTasks = () => {
    const [tasksFilter, setTasksFilter] = React.useState(false);

    const searchParams = useSearchParams();
    const subjectId = searchParams.get('subject_id');
    const subjectTaskId = searchParams.get('subject_task_id');
    const subThemeId = searchParams.get('subTheme_id');
    const isVerified = searchParams.get('is_verified');
    const userId = searchParams.get('user_id');
    const typeId = searchParams.get('type_id');

    const { getUserPermissions } = useUserPermissions();

    const { data: permissions } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const queryClient = useQueryClient();
    const { getPagginationTasks, archiveTask, toggleVerify } = useTask();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({
            queryKey: ['admin_tasks', subjectId, subjectTaskId, subThemeId, userId, isVerified, typeId],
        });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['admin_tasks', subjectId, subjectTaskId, subThemeId, userId, isVerified, typeId] });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['admin_tasks', subjectId, subjectTaskId, subThemeId, userId, isVerified, typeId],
        queryFn: (pageParam) =>
            getPagginationTasks(
                pageParam.pageParam,
                subjectId || '',
                subjectTaskId || '',
                subThemeId || '',
                userId || '',
                isVerified || '',
                typeId || ''
            ),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages?.length : undefined;

            return nextPage;
        },
    });

    const toggleVerifyHandler = (id: number) => {
        toggleVerify(id, revalidateRequest);
    };

    return (
        <PrivateWrapper permissions={[PERMISSIONS.TASKS]}>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <Text variant="h3">
                            Задания{' '}
                            {!isError &&
                                !isPending &&
                                !!data?.pages[0]?.totalCount &&
                                `(${data?.pages[0]?.totalCount})`}
                        </Text>

                        <ReloadButton onClick={resetRequest} disabled={isPending} />
                    </div>

                    <div className={base.titleWrapper}>
                        <IconButton small variant="light" onClick={() => setTasksFilter(true)}>
                            <Filter />
                        </IconButton>

                        {checkPermission(permissions || [], [PERMISSIONS.CREATE_TASKS]) && (
                            <Tooltip destroyTooltipOnHide title="Создать">
                                <IconButton small variant="light" href="/admin/tasks/create" circle>
                                    <Plus />
                                </IconButton>
                            </Tooltip>
                        )}
                    </div>
                </div>

                {isPending ? (
                    <div className={base.contentItems}>
                        {[...Array(3)].map((_, id) => (
                            <TaskItemSkeleton key={id} />
                        ))}
                    </div>
                ) : isError ? (
                    <NotContent text="Ошибка при загрузке заданий" icon={<Cross />} danger />
                ) : data.pages[0]?.totalCount ? (
                    <div className={cn(base.baseWrapperGap16, base.aic)}>
                        <div className={base.contentItems}>
                            {data?.pages.map((task) =>
                                task?.tasks.map((data) => (
                                    <TaskItem
                                        key={data.id}
                                        data={data}
                                        href={`/admin/task/${data.id}`}
                                        edit={checkPermission(permissions || [], [PERMISSIONS.UPDATE_TASKS])}
                                        remove={checkPermission(permissions || [], [PERMISSIONS.DELETE_TASKS])}
                                        archiveCallback={() => archiveTask(data.id, revalidateRequest)}
                                        toggleVerify={() => toggleVerifyHandler(data.id)}
                                        verify={checkPermission(permissions || [], [PERMISSIONS.VERIFY_TASKS])}
                                    />
                                )),
                            )}
                        </div>

                        {!isError && hasNextPage && (
                            <Button
                                auto
                                onClick={fetchNextPage}
                                loading={isFetchingNextPage}
                                className={base.buttonShowMore}
                            >
                                Показать еще
                            </Button>
                        )}
                    </div>
                ) : (
                    <NotContent text="Заданий не найдено" />
                )}
            </div>

            <TasksFilter
                filterOpen={tasksFilter}
                setFilterOpen={setTasksFilter}
                subjectId={subjectId}
                themeId={subjectTaskId}
                subThemeId={subThemeId}
                userId={userId}
                isVerified={isVerified}
                typeId={typeId}
            />
        </PrivateWrapper>
    );
};

export default AdminTasks;
