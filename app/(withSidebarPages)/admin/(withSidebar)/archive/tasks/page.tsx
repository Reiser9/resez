'use client';

import React from 'react';
import cn from 'classnames';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { useArchive, useUserPermissions } from '@/features/user';
import { Cross } from '@/shared/icons';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { TaskItem } from '@/entities/task/ui';

import { NotContent } from '@/shared/ui/NotContent';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { TaskItemSkeleton } from '@/shared/ui/Skeleton';

const AdminArchiveTasks = () => {
    const { getUserPermissions } = useUserPermissions();

    const { data: permissions } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const queryClient = useQueryClient();
    const { getArhiveTasks, restoreArchiveTask } = useArchive();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['archive_tasks'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['archive_tasks'] });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['archive_tasks'],
        queryFn: (param) => getArhiveTasks(param.pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
    });

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <Text variant="h3">
                    Задания{' '}
                    {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0]?.totalCount})`}
                </Text>

                <ReloadButton onClick={resetRequest} disabled={isPending} />
            </div>

            {isPending ? (
                <div className={base.contentItems}>
                    {[...Array(3)].map((_, id) => (
                        <TaskItemSkeleton key={id} />
                    ))}
                </div>
            ) : isError ? (
                <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
            ) : data.pages[0]?.totalCount ? (
                <div className={cn(base.baseWrapperGap16, base.aic)}>
                    <div className={base.contentItems}>
                        {data?.pages.map((task) =>
                            task?.tasks.map((data) => (
                                <TaskItem
                                    key={data.id}
                                    data={data}
                                    href={`/admin/task/${data.id}`}
                                    edit={checkPermission(permissions || [], [PERMISSIONS.UPDATE_SUBJECTS])}
                                    remove={checkPermission(permissions || [], [PERMISSIONS.DELETE_SUBJECTS])}
                                    restoreCallback={() => restoreArchiveTask(data.id, revalidateRequest)}
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
    );
};

export default AdminArchiveTasks;
