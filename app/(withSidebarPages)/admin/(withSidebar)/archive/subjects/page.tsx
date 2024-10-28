'use client';

import React from 'react';
import cn from 'classnames';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Cross } from '@/shared/icons';
import { SubjectItem } from '@/entities/subject/ui';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useArchive, useUserPermissions } from '@/features/user';

import { NotContent } from '@/shared/ui/NotContent';
import { SubjectItemSkeleton } from '@/shared/ui/Skeleton';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

const AdminArchiveSubjects = () => {
    const { getUserPermissions } = useUserPermissions();

    const {
        data: permissions,
        isLoading: permissionsIsLoading,
        isError: permissionsError,
    } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const queryClient = useQueryClient();
    const { getArhiveSubjects } = useArchive();

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['archive_subjects'] });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['archive_subjects'],
        queryFn: (param) => getArhiveSubjects(param.pageParam),
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
                    Предметы{' '}
                    {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0]?.totalCount})`}
                </Text>

                <ReloadButton onClick={resetRequest} disabled={isPending} />
            </div>

            {isPending ? (
                <div className={base.contentItems}>
                    {[...Array(3)].map((_, id) => (
                        <SubjectItemSkeleton key={id} />
                    ))}
                </div>
            ) : isError ? (
                <NotContent text="Ошибка при загрузке предметов" icon={<Cross />} danger />
            ) : data.pages[0]?.totalCount ? (
                <div className={cn(base.baseWrapperGap16, base.aic)}>
                    <div className={base.contentItems}>
                        {data?.pages.map((subject) =>
                            subject?.subjects.map((data) => (
                                <SubjectItem
                                    key={data.id}
                                    data={data}
                                    edit={checkPermission(permissions || [], [PERMISSIONS.UPDATE_SUBJECTS])}
                                    remove={checkPermission(permissions || [], [PERMISSIONS.DELETE_SUBJECTS])}
                                    restore
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
                <NotContent text="Предметов не найдено" />
            )}
        </div>
    );
};

export default AdminArchiveSubjects;
