'use client';

import React from 'react';
import cn from 'classnames';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';

import useArchive from '@/features/user/admin/useArchive';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross, Restore } from '@/shared/icons';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import TaskItem from '@/entities/task/ui/TaskItem';
import { TaskItemSkeleton } from '@/shared/ui/Skeleton';

const AdminArchiveTasks = () => {
    const permissions = useAppSelector((state) => state.user.user?.permissions);

    const queryClient = useQueryClient();
    const { getArhiveTasks, restoreArchiveTask } = useArchive();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['archive_tasks'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['archive_tasks'] });
    };

    const { data, isPending, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['archive_tasks'],
        queryFn: getArhiveTasks,
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

                <Tooltip title="Восстановить все">
                    <IconButton small variant="light">
                        <Restore />
                    </IconButton>
                </Tooltip>
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
                                    restoreCallback={() => restoreArchiveTask(data.id, revalidateRequest)}
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

export default AdminArchiveTasks;
