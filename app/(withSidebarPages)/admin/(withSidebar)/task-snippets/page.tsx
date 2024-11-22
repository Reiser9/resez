'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { Cross, Filter, Plus } from '@/shared/icons';
import { useTaskSnippet } from '@/features/task-snippet';
import { useUserPermissions } from '@/features/user';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { TaskSnippetItem } from '@/entities/task-snippet/ui';
import SnippetsFilter from './SnippetsFilter';

import { Text } from '@/shared/ui/Text';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';

const AdminTaskSnippets = () => {
    const [filter, setFilter] = React.useState(false);

    const searchParams = useSearchParams();
    const subjectId = searchParams.get('subject_id');

    const queryClient = useQueryClient();
    const { getPagginationTasksSnippets, deleteSnippetById } = useTaskSnippet();
    const { getUserPermissions } = useUserPermissions();

    const { data: permissions } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const revalidateRequest = () => {
        queryClient.invalidateQueries({
            queryKey: ['admin_task_snippets', subjectId],
        });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['admin_task_snippets', subjectId] });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['admin_task_snippets', subjectId],
        queryFn: (pageParam) => getPagginationTasksSnippets(pageParam.pageParam, subjectId || ''),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages?.length : undefined;

            return nextPage;
        },
    });

    return (
        <PrivateWrapper permissions={[PERMISSIONS.TASKS]}>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <Text variant="h3">
                            Вставки{' '}
                            {!isError &&
                                !isPending &&
                                !!data?.pages[0]?.totalCount &&
                                `(${data?.pages[0]?.totalCount})`}
                        </Text>

                        <ReloadButton onClick={resetRequest} disabled={isPending} />
                    </div>

                    <div className={base.titleWrapper}>
                        <IconButton small variant="light" onClick={() => setFilter(true)}>
                            <Filter />
                        </IconButton>

                        <Tooltip destroyTooltipOnHide title="Создать">
                            <IconButton small variant="light" href="/admin/task-snippets/create" circle>
                                <Plus />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                {isPending ? (
                    <Preloader page small />
                ) : isError ? (
                    <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                ) : data?.pages[0]?.totalCount ? (
                    <div className={cn(base.baseWrapperGap16, base.aic)}>
                        <div className={base.contentItems}>
                            {data?.pages.map((task) =>
                                task?.snippets.map((data) => (
                                    <TaskSnippetItem
                                        key={data.id}
                                        data={data}
                                        edit={checkPermission(permissions || [], [PERMISSIONS.TASKS])}
                                        remove={checkPermission(permissions || [], [PERMISSIONS.TASKS])}
                                        removeCallback={() => deleteSnippetById(data.id, revalidateRequest)}
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
                    <NotContent text="Вставок заданий не найдено" />
                )}
            </div>

            <SnippetsFilter filterOpen={filter} setFilterOpen={setFilter} subjectId={subjectId} />
        </PrivateWrapper>
    );
};

export default AdminTaskSnippets;
