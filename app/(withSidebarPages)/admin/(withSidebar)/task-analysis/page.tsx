'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { Cross, Filter, Plus } from '@/shared/icons';
import { useTaskAnalysis } from '@/features/task-analysis';
import { useUserPermissions } from '@/features/user';
import { TaskAnalysisItem } from '@/entities/task-analysis/ui';

import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { TaskItemSkeleton } from '@/shared/ui/Skeleton';

const AdminTaskAnalisys = () => {
    const queryClient = useQueryClient();
    const { getPagginationTasksAnalysis, togglePublish, archiveTaskAnalysis } = useTaskAnalysis();
    const { getUserPermissions } = useUserPermissions();

    const { data: permissions } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const revalidateRequest = () => {
        queryClient.invalidateQueries({
            queryKey: ['admin_tasks_analysis'],
        });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['admin_tasks_analysis'] });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['admin_tasks_analysis'],
        queryFn: (pageParam) => getPagginationTasksAnalysis(pageParam.pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages?.length : undefined;

            return nextPage;
        },
    });

    return (
        <PrivateWrapper permissions={[PERMISSIONS.ANALYSIS_TASKS]}>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <Text variant="h3">
                            Разбор заданий{' '}
                            {!isError &&
                                !isPending &&
                                !!data?.pages[0]?.totalCount &&
                                `(${data?.pages[0]?.totalCount})`}
                        </Text>

                        <ReloadButton onClick={resetRequest} disabled={isPending} />
                    </div>

                    <div className={base.titleWrapper}>
                        {/* <IconButton small variant="light" onClick={() => setTasksFilter(true)}>
                            <Filter />
                        </IconButton> */}

                        <Tooltip destroyTooltipOnHide title="Создать">
                            <IconButton small variant="light" href="/admin/task-analysis/create" circle>
                                <Plus />
                            </IconButton>
                        </Tooltip>
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
                                task?.tasksAnalysis.map((data) => (
                                    <TaskAnalysisItem
                                        key={data.id}
                                        data={data}
                                        edit={checkPermission(permissions || [], [PERMISSIONS.ANALYSIS_TASKS])}
                                        remove={checkPermission(permissions || [], [PERMISSIONS.ANALYSIS_TASKS])}
                                        verify={checkPermission(permissions || [], [PERMISSIONS.ANALYSIS_TASKS])}
                                        toggleVerify={() => togglePublish(data.id, revalidateRequest)}
                                        archiveCallback={() => archiveTaskAnalysis(data.id, revalidateRequest)}
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
                    <NotContent text="Разборов заданий не найдено" />
                )}
            </div>

            {/* <TasksFilter
                filterOpen={tasksFilter}
                setFilterOpen={setTasksFilter}
                subjectId={subjectId}
                themeId={subjectTaskId}
                subThemeId={subThemeId}
                userId={userId}
                isVerified={isVerified}
            /> */}
        </PrivateWrapper>
    );
};

export default AdminTaskAnalisys;
