'use client';

import React from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross, Plus } from '@/shared/icons';
import { useSubjects } from '@/features/subjects';
import SubjectItemSkeleton from '@/shared/ui/Skeleton/SubjectItemSceleton';
import SubjectItem from '@/entities/subject/ui/SubjectItem';
import { Tooltip } from 'antd';

const AdminSubjects = () => {
    const permissions = useAppSelector((state) => state.user.user?.permissions);

    const queryClient = useQueryClient();
    const { getPagginationSubjects } = useSubjects();

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['subjects'] });
    };

    const { data, isPending, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['subjects'],
        queryFn: (param) => getPagginationSubjects({ pageParam: param.pageParam }),
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
                        Предметы{' '}
                        {!error && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0]?.totalCount})`}
                    </Text>

                    <ReloadButton onClick={resetRequest} disabled={isPending} />
                </div>

                {checkPermission(permissions, [PERMISSIONS.CREATE_SUBJECTS]) && (
                    <Tooltip title="Создать">
                        <IconButton small variant="light" href="subjects/create" circle>
                            <Plus />
                        </IconButton>
                    </Tooltip>
                )}
            </div>

            {isPending ? (
                <div className={base.contentItems}>
                    {[...Array(3)].map((_, id) => (
                        <SubjectItemSkeleton key={id} />
                    ))}
                </div>
            ) : error ? (
                <NotContent text="Ошибка при загрузке предметов" icon={<Cross />} danger />
            ) : data.pages[0]?.totalCount ? (
                <div className={cn(base.baseWrapperGap16, base.aic)}>
                    <div className={base.contentItems}>
                        {data?.pages.map((subject) =>
                            subject?.subjects.map((data) => (
                                <SubjectItem
                                    key={data.id}
                                    data={data}
                                    // loading={subjectIsLoading.includes(data.id)}
                                    edit={checkPermission(permissions, [PERMISSIONS.UPDATE_SUBJECTS])}
                                    remove={checkPermission(permissions, [PERMISSIONS.DELETE_SUBJECTS])}
                                    publish={checkPermission(permissions, [PERMISSIONS.UPDATE_SUBJECTS])}
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
                <NotContent text="Предметов не найдено" />
            )}
        </div>
    );
};

export default AdminSubjects;
