'use client';

import React from 'react';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { Tooltip } from 'antd';
import { Cross, Plus } from '@/shared/icons';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { NotContent } from '@/shared/ui/NotContent';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useTask } from '@/features/task';
import TaskItem from '@/entities/task/ui/TaskItem';
import { TaskItemSkeleton } from '@/shared/ui/Skeleton';

const AdminTests = () => {
    const permissions = useAppSelector((state) => state.user.user?.permissions);

    const queryClient = useQueryClient();
    const { getPagginationTasks, archiveTask } = useTask();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['tasks'] });
    };

    const { data, isPending, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['tasks'],
        queryFn: getPagginationTasks,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
    });

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <Text variant="h3">
                        Задания{' '}
                        {!error && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0]?.totalCount})`}
                    </Text>

                    <ReloadButton onClick={resetRequest} disabled={isPending} />
                </div>

                {checkPermission(permissions, [PERMISSIONS.CREATE_TASKS]) && (
                    <Tooltip title="Создать">
                        <IconButton small variant="light" href="/admin/tasks/create" circle>
                            <Plus />
                        </IconButton>
                    </Tooltip>
                )}
            </div>

            {isPending ? (
                <div className={base.contentItems}>
                    {[...Array(3)].map((_, id) => (
                        <TaskItemSkeleton key={id} />
                    ))}
                </div>
            ) : error ? (
                <NotContent text="Ошибка при загрузке заданий" icon={<Cross />} danger />
            ) : data.pages[0]?.totalCount ? (
                <div className={cn(base.baseWrapperGap16, base.aic)}>
                    <div className={base.contentItems}>
                        {data?.pages.map((task) =>
                            task?.tasks.map((data) => (
                                <TaskItem
                                    key={data.id}
                                    data={data}
                                    // loading={subjectIsLoading.includes(data.id)}
                                    edit={checkPermission(permissions, [PERMISSIONS.UPDATE_SUBJECTS])}
                                    remove={checkPermission(permissions, [PERMISSIONS.DELETE_SUBJECTS])}
                                    archiveCallback={() => archiveTask(data.id, revalidateRequest)}
                                />
                            )),
                        )}
                    </div>

                    {hasNextPage && (
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
    );
};

export default AdminTests;
